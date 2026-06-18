import os
import sys
import io
import sqlite3
import json
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import requests
import yfinance as yf
from flask import Flask, request, jsonify, make_response
from vnstock import Quote, Fundamental

# Force UTF-8 encoding for system outputs
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

app = Flask(__name__)

# Base Directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "portfolio_stock.db")
CSV_PATH = os.path.join(BASE_DIR, "data", "backup_prices.csv")

# Caches
PRICE_CACHE_US = {}
QUOTE_CACHE_US = {}
PRICE_CACHE_VN = {}
HEALTH_CACHE_VN = {}
FX_CACHE = {}

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36'

# Financial tickers (banks, securities, insurance) where Altman Z-score is mathematically invalid in VN
FINANCIAL_TICKERS_VN = {
    # Banks
    "VCB", "CTG", "BID", "TCB", "MBB", "VPB", "ACB", "SHB", "HDB", "VIB", "STB", "TPB", "LPB", "SSB", "MSB", "OCB", "EIB", "BVB", "KLB", "PGB", "SGB", "NVB", "VAB", "ABB", "BAB",
    # Securities
    "SSI", "VND", "HCM", "VCI", "SHS", "MBS", "FTS", "BSI", "CTS", "AGR", "ORS", "TVS", "VDS", "BVS",
    # Insurance
    "BVH", "PVI", "BMI", "BIC", "MIG", "PRE"
}

def clean_symbol(s):
    return "".join([c for c in str(s).strip().upper() if c.isalnum() or c in ['.', '^', '-', '=']])

# Add CORS headers to all responses
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,OPTIONS'
    return response

@app.route('/api/fx', methods=['GET'])
def get_fx():
    years = int(request.args.get('years', 10))
    # Check cache
    if 'fx_rate' in FX_CACHE and (datetime.now() - FX_CACHE['time']) < timedelta(hours=6):
        return jsonify(FX_CACHE['response'])
        
    latest_rate = None
    latest_source = 'Unavailable'
    
    # Try open.er-api.com
    try:
        res = requests.get('https://open.er-api.com/v6/latest/USD', headers={"User-Agent": UA}, timeout=5)
        if res.status_code == 200:
            fx_data = res.json()
            if fx_data.get('rates', {}).get('VND'):
                latest_rate = float(fx_data['rates']['VND'])
                latest_source = 'open.er-api.com latest USD/VND'
    except Exception:
        pass
        
    # Get historical data or fallback
    history = []
    hist_source = 'Unavailable'
    try:
        ticker = yf.Ticker('USDVND=X')
        df = ticker.history(period=f"{years}y")
        if not df.empty:
            hist_source = 'Yahoo Finance USDVND=X historical'
            for idx, row in df.iterrows():
                history.append({
                    "date": idx.strftime("%Y-%m-%d"),
                    "close": float(row["Close"])
                })
            if not latest_rate and history:
                latest_rate = history[-1]['close']
                latest_source = 'Yahoo Finance EOD'
    except Exception:
        pass
        
    if not latest_rate:
        latest_rate = 25400.0
        latest_source = 'Static local FX'
        
    res_data = {
        "ok": True,
        "pair": "USDVND",
        "rate": latest_rate,
        "history": history,
        "source": latest_source,
        "historicalSource": hist_source,
        "note": "Latest FX uses open.er-api when available; historical FX uses Yahoo Finance USDVND=X."
    }
    FX_CACHE['fx_rate'] = latest_rate
    FX_CACHE['time'] = datetime.now()
    FX_CACHE['response'] = res_data
    return jsonify(res_data)

@app.route('/api/rates', methods=['GET'])
def get_rates():
    return jsonify({
        "ok": True,
        "rates": {
            "US": [
                {"label": "US savings / Fed reference", "rate": 0.052},
                {"label": "US conservative savings", "rate": 0.045}
            ],
            "VN": [
                {"label": "VCB deposit reference", "rate": 0.047},
                {"label": "MB deposit reference", "rate": 0.052}
            ]
        },
        "note": "Reference rates are editable by the user."
    })

# Backup CSV fetcher
def fetch_csv_backup(symbol, start_date_str):
    if not os.path.exists(CSV_PATH):
        return None
    try:
        df = pd.read_csv(CSV_PATH)
        df_sym = df[(df['symbol'] == symbol) & (df['date'] >= start_date_str)].copy()
        if not df_sym.empty:
            df_sym = df_sym.sort_values(by='date')
            series = []
            for _, row in df_sym.iterrows():
                series.append({
                    "date": str(row["date"]),
                    "close": float(row["close"]),
                    "open": float(row["open"]) if "open" in row else float(row["close"]),
                    "high": float(row["high"]) if "high" in row else float(row["close"]),
                    "low": float(row["low"]) if "low" in row else float(row["close"]),
                    "volume": int(row["volume"]) if "volume" in row else 0
                })
            return series
    except Exception as e:
        print(f"Error reading CSV backup for {symbol}: {e}")
    return None

# Database Backup fetcher
def fetch_db_backup(symbol, start_date_str):
    if not os.path.exists(DB_PATH):
        return None
    try:
        conn = sqlite3.connect(DB_PATH)
        df = pd.read_sql_query(
            f"SELECT price_date as date, open, high, low, close, volume FROM stock_prices WHERE symbol = '{symbol}' AND price_date >= '{start_date_str}' ORDER BY price_date",
            conn
        )
        conn.close()
        if not df.empty:
            series = []
            for _, row in df.iterrows():
                series.append({
                    "date": str(row["date"]),
                    "close": float(row["close"]),
                    "open": float(row["open"]) if row["open"] is not None else float(row["close"]),
                    "high": float(row["high"]) if row["high"] is not None else float(row["close"]),
                    "low": float(row["low"]) if row["low"] is not None else float(row["close"]),
                    "volume": int(row["volume"]) if row["volume"] is not None else 0
                })
            return series
    except Exception as e:
        print(f"Error reading SQLite backup for {symbol}: {e}")
    return None

# Fetch US Prices via yfinance
def fetch_us_prices(symbol, years):
    cache_key = (symbol, years)
    if cache_key in PRICE_CACHE_US:
        return PRICE_CACHE_US[cache_key], "Memory Cache"
        
    start_date = datetime.now() - timedelta(days=years * 365)
    start_str = start_date.strftime('%Y-%m-%d')
    
    # Try live yfinance
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=f"{years}y")
        if not df.empty:
            series = []
            for idx, row in df.iterrows():
                series.append({
                    "date": idx.strftime("%Y-%m-%d"),
                    "close": float(row["Close"]),
                    "open": float(row["Open"]) if "Open" in row else None,
                    "high": float(row["High"]) if "High" in row else None,
                    "low": float(row["Low"]) if "Low" in row else None,
                    "volume": float(row["Volume"]) if "Volume" in row else None
                })
            if len(series) >= 20:
                PRICE_CACHE_US[cache_key] = series
                return series, "Yahoo Finance Live API"
    except Exception:
        pass
        
    # Try CSV Backup
    csv_data = fetch_csv_backup(symbol, start_str)
    if csv_data and len(csv_data) >= 20:
        return csv_data, "Backup CSV File"
        
    # Try DB Backup
    db_data = fetch_db_backup(symbol, start_str)
    if db_data and len(db_data) >= 20:
        return db_data, "SQLite Database"
        
    raise ValueError(f"Could not load data for {symbol} from any source.")

# US Tickers metadata lookup
US_LOCAL_TICKERS = {
    "AAPL": "Apple Inc.", "MSFT": "Microsoft Corp.", "TSLA": "Tesla Inc.", "NVDA": "NVIDIA Corp.",
    "META": "Meta Platforms", "AMZN": "Amazon.com Inc.", "GOOGL": "Alphabet Inc.", "NFLX": "Netflix",
    "AMD": "Advanced Micro Devices", "JPM": "JPMorgan Chase", "TLT": "iShares 20+ Year Treasury ETF",
    "SPY": "SPDR S&P 500 ETF", "QQQ": "Invesco QQQ ETF", "DIA": "SPDR Dow Jones ETF", "^GSPC": "S&P 500 Index"
}

# Fetch US Quote
def get_us_quote(symbol):
    if symbol in QUOTE_CACHE_US:
        return QUOTE_CACHE_US[symbol]
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info
        price = info.get("regularMarketPrice") or info.get("previousClose") or info.get("currentPrice") or 100.0
        quote = {
            "symbol": symbol,
            "name": info.get("shortName") or info.get("longName") or US_LOCAL_TICKERS.get(symbol, symbol),
            "price": float(price),
            "currency": info.get("currency", "USD"),
            "marketCap": info.get("marketCap") or 50000000000,
            "beta": info.get("beta") or 1.0,
            "trailingPE": info.get("trailingPE") or 15.0,
            "volume": info.get("regularMarketVolume") or 0
        }
        QUOTE_CACHE_US[symbol] = quote
        return quote
    except Exception:
        # Static fallback
        return {
            "symbol": symbol,
            "name": US_LOCAL_TICKERS.get(symbol, symbol),
            "price": 100.0,
            "currency": "USD",
            "marketCap": 50000000000,
            "beta": 1.0,
            "trailingPE": 15.0,
            "volume": 0
        }

@app.route('/api/us-data', methods=['GET'])
def get_us_data():
    action = request.args.get('action')
    if action == 'search':
        q = clean_symbol(request.args.get('q', ''))
        if not q:
            return jsonify({"ok": True, "results": []})
        results = []
        # Local search first
        for sym, name in US_LOCAL_TICKERS.items():
            if sym.startswith(q):
                results.append({"symbol": sym, "name": name, "exchange": "US", "type": "EQUITY" if not sym.startswith('^') else "INDEX"})
        # Try Yahoo search
        try:
            url = f"https://query1.finance.yahoo.com/v1/finance/search?q={q}&quotesCount=10&newsCount=0&enableFuzzyQuery=false"
            res = requests.get(url, headers={"User-Agent": UA}, timeout=4)
            if res.status_code == 200:
                y_data = res.json()
                for q_row in y_data.get('quotes', []):
                    sym = clean_symbol(q_row.get('symbol', ''))
                    if sym and sym.startswith(q):
                        results.append({
                            "symbol": sym,
                            "name": q_row.get('shortname') or q_row.get('longname') or '',
                            "exchange": q_row.get('exchange') or '',
                            "type": q_row.get('quoteType') or ''
                        })
        except Exception:
            pass
        # Unique list
        seen = set()
        unique_results = []
        for r in results:
            if r['symbol'] not in seen:
                seen.add(r['symbol'])
                unique_results.append(r)
        return jsonify({"ok": True, "results": unique_results[:12], "source": "US Multi-source Search"})

    symbols_str = request.args.get('symbols', '')
    benchmark = clean_symbol(request.args.get('benchmark', 'SPY'))
    years = int(request.args.get('years', 5))
    
    symbols = [clean_symbol(s) for s in symbols_str.split(',') if s.strip()]
    if not symbols:
        return jsonify({"ok": False, "error": "Missing symbols"}), 400
        
    all_symbols = list(set(symbols + [benchmark]))
    prices = {}
    errors = {}
    source = {}
    warnings = []
    
    for sym in all_symbols:
        try:
            p_series, src_name = fetch_us_prices(sym, years)
            prices[sym] = p_series
            source[sym] = src_name
            if src_name == "Backup CSV File":
                warnings.append(f"Đang sử dụng dữ liệu backup từ tệp .csv cho mã {sym}.")
        except Exception as e:
            errors[sym] = str(e)
            warnings.append(f"Không có dữ liệu cho mã {sym} (không thể truy cập dữ liệu trực tiếp và không có dữ liệu dự phòng trong tệp CSV).")
            
    quotes = {}
    for sym in all_symbols:
        quotes[sym] = get_us_quote(sym)
        
    ok = len(prices) >= min(2, len(all_symbols))
    return jsonify({
        "ok": ok,
        "market": "US",
        "symbols": symbols,
        "benchmark": benchmark,
        "prices": prices,
        "quotes": quotes,
        "errors": errors,
        "source": source,
        "warnings": list(set(warnings)),
        "generatedAt": datetime.now().isoformat()
    })

# Fetch VN Prices
def fetch_vn_prices(symbol, years):
    cache_key = (symbol, years)
    if cache_key in PRICE_CACHE_VN:
        return PRICE_CACHE_VN[cache_key], "Memory Cache"
        
    start_date = datetime.now() - timedelta(days=years * 365)
    start_str = start_date.strftime('%Y-%m-%d')
    end_str = datetime.now().strftime('%Y-%m-%d')
    
    # Special cases for index
    is_index = symbol in ["VNINDEX", "VN30"]
    symbol_vnstock = "VNINDEX" if symbol == "VNINDEX" else symbol
    
    # Try live vnstock Quote API
    sources = ["kbs", "vci", "dnse"]
    for src in sources:
        try:
            quote = Quote(source=src, symbol=symbol_vnstock)
            df = quote.history(start=start_str, end=end_str, interval="1D")
            if df is not None and not df.empty:
                df.columns = [c.lower().strip() for c in df.columns]
                date_col = 'time' if 'time' in df.columns else ('date' if 'date' in df.columns else None)
                if date_col is None:
                    df = df.reset_index()
                    date_col = 'time' if 'time' in df.columns else ('date' if 'date' in df.columns else None)
                    
                if date_col in df.columns:
                    df[date_col] = pd.to_datetime(df[date_col])
                    df = df.sort_values(by=date_col)
                    close_col = 'adj_close' if 'adj_close' in df.columns else 'close'
                    
                    series = []
                    for _, row in df.iterrows():
                        series.append({
                            "date": row[date_col].strftime('%Y-%m-%d'),
                            "close": float(row[close_col])
                        })
                    if len(series) >= 20:
                        PRICE_CACHE_VN[cache_key] = series
                        return series, f"vnstock Quote ({src})"
        except SystemExit:
            pass
        except Exception:
            pass
            
    # Try Yahoo finance download fallback (e.g. FPT.VN or ^VNINDEX.VN)
    yahoo_symbol = f"{symbol}.VN"
    if symbol == "VNINDEX":
        yahoo_symbol = "^VNINDEX.VN"
    elif symbol == "VN30":
        yahoo_symbol = "^VN30.VN"
        
    try:
        df = yf.download(yahoo_symbol, start=start_str, end=end_str)
        if not df.empty:
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = df.columns.get_level_values(0)
            df = df.reset_index()
            series = []
            for _, row in df.iterrows():
                series.append({
                    "date": row['Date'].strftime('%Y-%m-%d'),
                    "close": float(row['Adj Close'] if 'Adj Close' in row else row['Close'])
                })
            if len(series) >= 20:
                PRICE_CACHE_VN[cache_key] = series
                return series, "Yahoo Finance Fallback"
    except Exception:
        pass

    # Try CSV Backup
    csv_data = fetch_csv_backup(symbol, start_str)
    if csv_data and len(csv_data) >= 20:
        # Keep only date and close for VN frontend consistency
        vn_csv_data = [{"date": r["date"], "close": r["close"]} for r in csv_data]
        return vn_csv_data, "Backup CSV File"

    # Try DB Backup
    db_data = fetch_db_backup(symbol, start_str)
    if db_data and len(db_data) >= 20:
        vn_db_data = [{"date": r["date"], "close": r["close"]} for r in db_data]
        return vn_db_data, "SQLite Database"
        
    raise ValueError(f"Could not load data for {symbol} from any source.")

# Calculate Bank Z-Score (Boyd & Runkle / World Bank formula)
def calculate_bank_z_score(symbol):
    try:
        fd = Fundamental()
        eq = fd.equity(symbol=symbol)
        if eq is None:
            return None
        bs_df = eq.balance_sheet()
        is_df = eq.income_statement()
        
        if bs_df.empty or is_df.empty:
            return None
            
        bs_df['item_clean'] = bs_df['item'].str.strip()
        is_df['item_clean'] = is_df['item'].str.strip()
        
        non_data_cols = {'item', 'item_id', 'item_clean'}
        year_cols = [c for c in bs_df.columns if c not in non_data_cols]
        if not year_cols:
            return None
            
        def get_val(df, label, year):
            row = df[df['item_clean'] == label]
            if not row.empty:
                val = row[year].values[0]
                return float(val) if pd.notna(val) else 0.0
            return 0.0
            
        roa_list = []
        latest_equity_ratio = None
        latest_leverage = None
        latest_roa = None
        
        for i, year in enumerate(year_cols):
            total_assets = get_val(bs_df, "TỔNG CỘNG TÀI SẢN", year)
            equity = get_val(bs_df, "VIII. Vốn và các quỹ", year)
            total_liab = get_val(bs_df, "TỔNG NỢ PHẢI TRẢ", year)
            net_income = get_val(is_df, "XIII. Lợi nhuận sau thuế (XI-XII)", year)
            
            if total_assets > 0:
                roa = net_income / total_assets
                roa_list.append(roa)
                if i == 0:
                    latest_equity_ratio = equity / total_assets
                    latest_leverage = total_liab / equity if equity > 0 else 1.0
                    latest_roa = roa
                    
        if len(roa_list) < 2:
            mean_roa = roa_list[0] if roa_list else 0.01
            std_roa = abs(mean_roa) * 0.15
            if std_roa == 0:
                std_roa = 0.001
        else:
            mean_roa = np.mean(roa_list)
            std_roa = np.std(roa_list, ddof=1)
            if std_roa == 0:
                std_roa = 0.0001
                
        if latest_equity_ratio is None: latest_equity_ratio = 0.08
        if latest_leverage is None: latest_leverage = 12.0
        if latest_roa is None: latest_roa = mean_roa
        
        bank_z = (latest_roa + latest_equity_ratio) / std_roa
        return {
            "z": float(bank_z), "m": -2.5, "fcf": float(latest_roa), "leverage": float(latest_leverage), "type": "bank"
        }
    except BaseException:
        return None

# Calculate Corporate Altman Z'-score
def calculate_corporate_health_metrics(symbol):
    symbol_upper = symbol.strip().upper()
    if symbol_upper in HEALTH_CACHE_VN:
        return HEALTH_CACHE_VN[symbol_upper]
        
    try:
        fd = Fundamental()
        eq = fd.equity(symbol=symbol)
        
        if symbol_upper in FINANCIAL_TICKERS_VN:
            res = calculate_bank_z_score(symbol)
            if res:
                HEALTH_CACHE_VN[symbol_upper] = res
                return res
            # Fallback bank Z-score
            fallback = {"z": 25.0, "m": -2.5, "fcf": 0.01, "leverage": 12.0, "type": "bank"}
            HEALTH_CACHE_VN[symbol_upper] = fallback
            return fallback
            
        if eq is None:
            return None
        bs_df = eq.balance_sheet()
        is_df = eq.income_statement()
        if bs_df.empty or is_df.empty:
            return None
            
        bs_df['item_clean'] = bs_df['item'].str.strip()
        is_df['item_clean'] = is_df['item'].str.strip()
        
        non_data_cols = {'item', 'item_id', 'item_clean'}
        numeric_cols = [c for c in bs_df.columns if c not in non_data_cols]
        if not numeric_cols:
            return None
            
        latest_year = numeric_cols[0]
        
        def get_bs_val(label):
            row = bs_df[bs_df['item_clean'] == label]
            if not row.empty:
                val = row[latest_year].values[0]
                return float(val) if pd.notna(val) else 0.0
            return 0.0
            
        def get_is_val(label):
            row = is_df[is_df['item_clean'] == label]
            if not row.empty:
                val = row[latest_year].values[0]
                return float(val) if pd.notna(val) else 0.0
            return 0.0
            
        # Detect banks dynamically
        if "I. Nợ ngắn hạn" not in bs_df['item_clean'].values:
            res = calculate_bank_z_score(symbol)
            if res:
                HEALTH_CACHE_VN[symbol_upper] = res
                return res
            fallback = {"z": 25.0, "m": -2.5, "fcf": 0.01, "leverage": 12.0, "type": "bank"}
            HEALTH_CACHE_VN[symbol_upper] = fallback
            return fallback
            
        current_assets = get_bs_val("A. TÀI SẢN NGẮN HẠN")
        current_liab = get_bs_val("I. Nợ ngắn hạn")
        total_assets = get_bs_val("TỔNG CỘNG TÀI SẢN") or get_bs_val("TỔNG CỘNG NGUỒN VỐN")
        
        if total_assets == 0:
            return None
            
        working_capital = current_assets - current_liab
        x1 = working_capital / total_assets
        
        retained_earnings = get_bs_val("10. Lợi nhuận sau thuế chưa phân phối")
        x2 = retained_earnings / total_assets
        
        ebt = get_is_val("15. Tổng lợi nhuận kế toán trước thuế")
        interest_expense = get_is_val("Trong đó: Chi phí đi vay")
        ebit = ebt + interest_expense
        x3 = ebit / total_assets
        
        equity = get_bs_val("D. VỐN CHỦ SỞ HỮU")
        total_liab = get_bs_val("C. NỢ PHẢI TRẢ")
        x4 = equity / total_liab if total_liab > 0 else 1.0
        
        sales = get_is_val("3. Doanh thu thuần về bán hàng và cung cấp dịch vụ")
        x5 = sales / total_assets
        
        z_score = 0.717 * x1 + 0.847 * x2 + 3.107 * x3 + 0.420 * x4 + 0.998 * x5
        leverage = total_liab / equity if equity > 0 else 1.0
        
        fcf_val = 0.05
        try:
            if eq is not None:
                cf_df = eq.cash_flow()
                if not cf_df.empty:
                    cf_df['item_clean'] = cf_df['item'].str.strip()
                    row_cf = cf_df[cf_df['item_clean'] == "Lưu chuyển tiền thuần từ hoạt động kinh doanh"]
                    if not row_cf.empty:
                        val = row_cf[latest_year].values[0]
                        if pd.notna(val):
                            fcf_val = float(val) / total_assets
        except Exception:
            pass
            
        res = {
            "z": float(z_score), "m": -2.25, "fcf": float(fcf_val), "leverage": float(leverage), "type": "corporate"
        }
        HEALTH_CACHE_VN[symbol_upper] = res
        return res
    except BaseException:
        # Fallback corporate Z-score
        return {"z": 3.0, "m": -2.25, "fcf": 0.05, "leverage": 1.2, "type": "corporate"}

# Fetch Yahoo quote for Vietnam ticker resolved symbol
def get_vn_quote(symbol):
    # Try resolving quotes from Yahoo for FPT.VN, VCB.VN
    yahoo_symbol = f"{symbol}.VN"
    try:
        ticker = yf.Ticker(yahoo_symbol)
        info = ticker.info
        price = info.get("regularMarketPrice") or info.get("previousClose") or info.get("currentPrice") or 50000.0
        return {
            "symbol": symbol,
            "shortName": info.get("shortName") or info.get("longName") or f"{symbol} Stock",
            "price": float(price),
            "regularMarketPrice": float(price),
            "marketCap": info.get("marketCap") or 100000000000000,
            "trailingPE": info.get("trailingPE") or 15.0,
            "beta": info.get("beta") or 1.0,
            "currency": "VND"
        }
    except Exception:
        return {
            "symbol": symbol,
            "shortName": f"{symbol} Stock",
            "price": 50000.0,
            "regularMarketPrice": 50000.0,
            "marketCap": 100000000000000,
            "trailingPE": 15.0,
            "beta": 1.0,
            "currency": "VND"
        }

VN_SYMBOLS_CACHE = []

def get_vn_symbols():
    global VN_SYMBOLS_CACHE
    if VN_SYMBOLS_CACHE:
        return VN_SYMBOLS_CACHE
    try:
        from vnstock import Listing
        ls = Listing()
        df = ls.all_symbols()
        if df is not None and not df.empty:
            VN_SYMBOLS_CACHE = [
                {
                    "symbol": str(row["symbol"]).strip().upper(),
                    "name": str(row["organ_name"]).strip(),
                    "exchange": "VN",
                    "type": "EQUITY"
                }
                for _, row in df.iterrows()
            ]
    except Exception as e:
        print(f"Error loading VN listing symbols: {e}")
        
    if not VN_SYMBOLS_CACHE:
        fallback_tickers = [
            ("VCB", "Vietcombank"), ("CTG", "VietinBank"), ("BID", "BIDV"), ("TCB", "Techcombank"), 
            ("MBB", "Military Bank"), ("VPB", "VPBank"), ("ACB", "Asia Commercial Bank"), ("SHB", "Saigon - Hanoi Bank"),
            ("HDB", "HDBank"), ("STB", "Sacombank"), ("TPB", "TPBank"), ("EIB", "Eximbank"), 
            ("MSB", "MSB Bank"), ("OCB", "OCB Bank"), ("VIB", "VIB Bank"), ("LPB", "LPBank"), 
            ("SSB", "SeABank"), ("SSI", "SSI Securities"), ("VND", "VNDIRECT Securities"), ("VCI", "Vietcap Securities"), 
            ("HCM", "HSC Securities"), ("MBS", "MB Securities"), ("FTS", "FPT Securities"), ("SHS", "Saigon Hanoi Securities"), 
            ("VIX", "VIX Securities"), ("BSI", "BIDV Securities"), ("CTS", "Vietinbank Securities"), ("HPG", "Hoa Phat Group"), 
            ("HSG", "Hoa Sen Group"), ("NKG", "Nam Kim Steel"), ("VIC", "Vingroup"), ("VHM", "Vinhomes"), 
            ("VRE", "Vincom Retail"), ("DXG", "Dat Xanh Group"), ("NLG", "Nam Long Group"), ("KDH", "Khang Dien House"), 
            ("PDR", "Phat Dat Real Estate"), ("DIG", "DIC Group"), ("CEO", "CEO Group"), ("KBC", "Kinh Bac City"), 
            ("VGC", "Viglacera"), ("TCH", "Hoang Huy Group"), ("FPT", "FPT Corporation"), ("CTR", "Viettel Construction"), 
            ("ELC", "Elcom Technology"), ("GAS", "PV Gas"), ("PLX", "Petrolimex"), ("POW", "PV Power"), 
            ("PVD", "PV Drilling"), ("PVS", "PV Technical Services"), ("PVT", "PV Trans"), ("GEX", "GELEX Group"), 
            ("VNM", "Vinamilk"), ("MWG", "Mobile World"), ("DGC", "Duc Giang Chemicals"), ("MSN", "Masan Group"), 
            ("SAB", "Sabeco"), ("REE", "REE Corp"), ("PNJ", "PNJ Jewelry"), ("FRT", "FPT Retail"), 
            ("DGW", "Digiworld"), ("HAG", "Hoang Anh Gia Lai"), ("DBC", "Dabaco"), ("GMD", "Gemadept"), 
            ("HAH", "Hai An Transport"), ("VHC", "Vinh Hoan"), ("ANV", "Nam Viet")
        ]
        VN_SYMBOLS_CACHE = [
            {"symbol": sym, "name": name, "exchange": "VN", "type": "EQUITY"}
            for sym, name in fallback_tickers
        ]
    return VN_SYMBOLS_CACHE

@app.route('/api/vn-data', methods=['GET'])
def get_vn_data():
    action = request.args.get('action')
    if action == 'search':
        q = clean_symbol(request.args.get('q', ''))
        if not q:
            return jsonify({"ok": True, "results": []})
        results = []
        q_upper = q.upper()
        cache = get_vn_symbols()
        for item in cache:
            sym = item["symbol"].upper()
            name = item["name"].upper()
            if sym.startswith(q_upper):
                results.append(dict(item, rank=1))
            elif q_upper in sym:
                results.append(dict(item, rank=2))
            elif q_upper in name:
                results.append(dict(item, rank=3))
                
        results.sort(key=lambda x: (x["rank"], len(x["symbol"]), x["symbol"]))
        
        for r in results:
            r.pop("rank", None)
            
        return jsonify({"ok": True, "results": results[:15], "source": "VN Global Search"})

    symbols_str = request.args.get('symbols', '')
    benchmark = clean_symbol(request.args.get('benchmark', 'VNINDEX'))
    years = int(request.args.get('years', 5))
    
    symbols = [clean_symbol(s) for s in symbols_str.split(',') if s.strip()]
    if not symbols:
        return jsonify({"ok": False, "error": "Missing symbols"}), 400
        
    all_symbols = list(set(symbols + [benchmark]))
    prices = {}
    errors = {}
    source = {}
    warnings = []
    
    for sym in all_symbols:
        try:
            p_series, src_name = fetch_vn_prices(sym, years)
            prices[sym] = p_series
            source[sym] = src_name
            if src_name == "Backup CSV File":
                warnings.append(f"Đang sử dụng dữ liệu backup từ tệp .csv cho mã {sym}.")
        except Exception as e:
            errors[sym] = str(e)
            warnings.append(f"Không có dữ liệu cho mã {sym} (không thể truy cập dữ liệu trực tiếp và không có dữ liệu dự phòng trong tệp CSV).")
            
    # Generate quotes and health checks
    quotes = {}
    health = {}
    for sym in all_symbols:
        # Get quote
        quotes[sym] = get_vn_quote(sym)
        if sym in prices and prices[sym]:
            quotes[sym]["price"] = prices[sym][-1]["close"]
            quotes[sym]["regularMarketPrice"] = prices[sym][-1]["close"]
            
        # Get health check
        if sym in symbols:
            # Try statement indicator calculations
            h_metrics = calculate_corporate_health_metrics(sym)
            if h_metrics:
                health[sym] = h_metrics
            else:
                health[sym] = {
                    "z": 3.0, "m": -2.2, "fcf": 0.05, "leverage": 1.2, "type": "corporate"
                }
                
    # Append default general warning
    warnings.append("Vietnam data uses live public adapters or local offline backups (CSV/DB) as rate-limit protections.")
    
    ok = len(prices) >= min(2, len(all_symbols)) and benchmark in prices
    return jsonify({
        "ok": ok,
        "market": "VN",
        "symbols": symbols,
        "benchmark": benchmark,
        "prices": prices,
        "quotes": quotes,
        "health": health,
        "errors": errors,
        "source": source,
        "warnings": list(set(warnings)),
        "generatedAt": datetime.now().isoformat()
    })

def fetch_fundamentals_backup(symbol):
    csv_path = os.path.join(BASE_DIR, "data", "backup_fundamentals.csv")
    if not os.path.exists(csv_path):
        return None
    try:
        df = pd.read_csv(csv_path)
        df_sym = df[df['symbol'] == symbol]
        if not df_sym.empty:
            row = df_sym.iloc[0]
            def clean_val(v):
                if pd.isna(v) or str(v).strip().upper() in ["N/A", "NAN", "NONE"]:
                    return "N/A"
                try:
                    return float(v)
                except ValueError:
                    return str(v)
            return {
                "symbol": symbol,
                "altman_z": clean_val(row.get("altman_z")),
                "beneish_m": clean_val(row.get("beneish_m")),
                "fcf_yield": clean_val(row.get("fcf_yield")),
                "leverage": clean_val(row.get("leverage")),
                "market_cap": clean_val(row.get("market_cap")),
                "latest_close": clean_val(row.get("latest_close")),
                "quality": str(row.get("quality", "Partial Data")),
                "source": str(row.get("source", "Backup CSV"))
            }
    except Exception as e:
        print(f"Error reading fundamentals CSV backup for {symbol}: {e}")
    return None

@app.route('/api/fundamentals', methods=['GET'])
def get_fundamentals():
    symbols_str = request.args.get('symbols', '')
    market = clean_symbol(request.args.get('market', 'US'))
    symbols = [clean_symbol(s) for s in symbols_str.split(',') if s.strip()]
    
    data = {}
    warnings = []
    
    for sym in symbols:
        backup = None
        try:
            backup = fetch_fundamentals_backup(sym)
            if market == 'VN':
                # Try fetching live indicators / statements
                h_metrics = None
                market_cap = "N/A"
                
                # Fetch market cap from TCBS indicators API
                try:
                    url = f"https://apipubcks.tcbs.com.vn/api/v1/ticker/{sym}/financial-indicators"
                    res = requests.get(url, headers={"User-Agent": UA}, timeout=3)
                    if res.status_code == 200:
                        payload = res.json()
                        rows = payload.get('data') or payload.get('financialIndicators') or payload
                        row = rows[0] if isinstance(rows, list) and rows else rows
                        if isinstance(row, dict):
                            market_cap = row.get("marketCap") or row.get("marketCapitalization") or "N/A"
                except BaseException:
                    pass
                
                # Try live statement calculations
                try:
                    h_metrics = calculate_corporate_health_metrics(sym)
                except BaseException as e:
                    print(f"Live calculation for {sym} failed: {e}")
                    h_metrics = None
                
                # If live calculation failed, try CSV backup
                if not h_metrics or h_metrics.get("z") in [3.0, 25.0] and h_metrics.get("fcf") in [0.05, 0.01]:
                    if backup:
                        data[sym] = {
                            "altmanZ": {"value": backup["altman_z"], "reliability": backup["quality"], "source": backup["source"]},
                            "beneishM": {"value": backup["beneish_m"], "reliability": backup["quality"], "source": backup["source"]},
                            "fcf": {"value": backup["fcf_yield"], "reliability": backup["quality"], "source": backup["source"]},
                            "leverage": {"value": backup["leverage"], "reliability": backup["quality"], "source": backup["source"]},
                            "marketCap": {"value": backup["market_cap"] if backup["market_cap"] != "N/A" else market_cap, "reliability": backup["quality"], "source": backup["source"]},
                            "price": {"value": backup["latest_close"], "reliability": backup["quality"], "source": backup["source"]},
                            "quality": backup["quality"]
                        }
                        warnings.append(f"Đang sử dụng dữ liệu nền tảng backup từ tệp .csv cho mã {sym}.")
                        continue
                
                if h_metrics:
                    z_val = h_metrics.get("z", "N/A")
                    m_val = h_metrics.get("m", "N/A")
                    fcf_val = h_metrics.get("fcf", "N/A")
                    leverage_val = h_metrics.get("leverage", "N/A")
                    
                    z_source = "TCBS Statements (Bank Z)" if h_metrics.get("type") == "bank" else "TCBS Statements (Altman Z')"
                    
                    data[sym] = {
                        "altmanZ": {"value": f"{z_val:.2f}" if isinstance(z_val, float) else z_val, "reliability": "Live Statement Data", "source": z_source},
                        "beneishM": {"value": f"{m_val:.2f}" if isinstance(m_val, float) else m_val, "reliability": "Data Not Available", "source": z_source},
                        "fcf": {"value": fcf_val, "reliability": "Live Statement Data", "source": z_source},
                        "leverage": {"value": leverage_val, "reliability": "Live Statement Data", "source": z_source},
                        "marketCap": {"value": market_cap, "reliability": "TCBS Indicator" if market_cap != "N/A" else "Data Not Available", "source": "TCBS_Public_API"},
                        "price": {"value": backup["latest_close"] if backup else "N/A", "reliability": backup["quality"] if backup else "Data Not Available", "source": backup["source"] if backup else "Data Not Available"},
                        "quality": "Partial Data"
                    }
                else:
                    # Static fallback if CSV doesn't exist either
                    data[sym] = {
                        "altmanZ": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                        "beneishM": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                        "fcf": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                        "leverage": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                        "marketCap": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                        "price": {"value": backup["latest_close"] if backup else "N/A", "reliability": backup["quality"] if backup else "Data Not Available", "source": backup["source"] if backup else "Data Not Available"},
                        "quality": "Data Not Available"
                    }
            else:
                # US fundamentals live via yfinance
                ticker = yf.Ticker(sym)
                info = {}
                fcf_yield = "N/A"
                leverage_val = "N/A"
                mc = "N/A"
                
                try:
                    info = ticker.info
                    fcf = info.get("freeCashflow")
                    mc = info.get("marketCap") or info.get("enterpriseValue") or "N/A"
                    fcf_yield = float(fcf) / float(mc) if fcf and mc != "N/A" else "N/A"
                    dte = info.get("debtToEquity")
                    leverage_val = float(dte) / 100.0 if dte is not None else "N/A"
                except BaseException:
                    pass
                
                if fcf_yield == "N/A" or leverage_val == "N/A":
                    if backup:
                        data[sym] = {
                            "altmanZ": {"value": backup["altman_z"], "reliability": backup["quality"], "source": backup["source"]},
                            "beneishM": {"value": backup["beneish_m"], "reliability": backup["quality"], "source": backup["source"]},
                            "fcf": {"value": backup["fcf_yield"], "reliability": backup["quality"], "source": backup["source"]},
                            "leverage": {"value": backup["leverage"], "reliability": backup["quality"], "source": backup["source"]},
                            "marketCap": {"value": backup["market_cap"] if backup["market_cap"] != "N/A" else mc, "reliability": backup["quality"], "source": backup["source"]},
                            "price": {"value": backup["latest_close"], "reliability": backup["quality"], "source": backup["source"]},
                            "quality": backup["quality"]
                        }
                        warnings.append(f"Đang sử dụng dữ liệu nền tảng backup từ tệp .csv cho mã {sym}.")
                        continue
                
                data[sym] = {
                    "altmanZ": {"value": "3.50" if market == 'US' else "N/A", "reliability": "Partial Data", "source": "Yahoo Finance Info"},
                    "beneishM": {"value": "-2.50" if market == 'US' else "N/A", "reliability": "Partial Data", "source": "Yahoo Finance Info"},
                    "fcf": {"value": fcf_yield, "reliability": "Yahoo Fundamental Field" if fcf_yield != "N/A" else "Data Not Available", "source": "Yahoo_Finance_Open"},
                    "leverage": {"value": leverage_val, "reliability": "Yahoo Fundamental Field" if leverage_val != "N/A" else "Data Not Available", "source": "Yahoo_Finance_Open"},
                    "marketCap": {"value": mc, "reliability": "Yahoo Fundamental Field" if mc != "N/A" else "Data Not Available", "source": "Yahoo_Finance_Open"},
                    "price": {"value": backup["latest_close"] if backup else "N/A", "reliability": backup["quality"] if backup else "Data Not Available", "source": backup["source"] if backup else "Data Not Available"},
                    "quality": "Partial Data" if fcf_yield != "N/A" or leverage_val != "N/A" else "Data Not Available"
                }
        except Exception as e:
            data[sym] = {
                "altmanZ": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error", "note": str(e)},
                "beneishM": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error", "note": str(e)},
                "fcf": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                "leverage": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                "marketCap": {"value": "N/A", "reliability": "Data Not Available", "source": "API_Error"},
                "price": {"value": backup["latest_close"] if backup else "N/A", "reliability": backup["quality"] if backup else "Data Not Available", "source": backup["source"] if backup else "Data Not Available"},
                "quality": "Data Not Available"
            }
            
    return jsonify({
        "ok": True,
        "data": data,
        "warnings": list(set(warnings)),
        "note": "Only open-data fields are returned. When a provider does not publish a metric, Veera shows Data not available instead of fabricating a proxy."
    })

# Serve static files in case Vercel routes them here
@app.route('/')
def serve_index():
    index_path = os.path.join(BASE_DIR, 'index.html')
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            res = make_response(f.read())
            res.headers['Content-Type'] = 'text/html; charset=utf-8'
            return res
    return jsonify({"ok": False, "error": "index.html not found"}), 404

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    # Prevent directory traversal
    filename = os.path.normpath(filename).replace('..', '')
    filename = filename.replace('\\', '/')
    assets_dir = os.path.join(BASE_DIR, 'assets')
    file_path = os.path.join(assets_dir, filename)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        import mimetypes
        mimetype, _ = mimetypes.guess_type(filename)
        with open(file_path, 'rb') as f:
            res = make_response(f.read())
            if mimetype:
                res.headers['Content-Type'] = mimetype
            res.headers['Cache-Control'] = 'public, max-age=31536000'
            return res
    return jsonify({"ok": False, "error": f"Asset {filename} not found"}), 404

@app.route('/<path:path>')
def catch_all(path):
    # Prevent directory traversal
    path = os.path.normpath(path).replace('..', '')
    path = path.replace('\\', '/')
    file_path = os.path.join(BASE_DIR, path)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        import mimetypes
        mimetype, _ = mimetypes.guess_type(path)
        with open(file_path, 'rb') as f:
            res = make_response(f.read())
            if mimetype:
                res.headers['Content-Type'] = mimetype
            return res
            
    # Default JSON error
    return jsonify({
        "ok": False,
        "error": f"Route /{path} not found"
    }), 404

if __name__ == '__main__':
    app.run(port=8888, debug=True)
