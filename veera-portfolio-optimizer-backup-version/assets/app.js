window.__veeraMusicAllowed = false;
/* Veera Portfolio Optimizer — Quant/I18N Edition */
const TRADING_DAYS = 252;
const TARGET_MONTE_CARLO = 20000;
const MC_MAX_ATTEMPTS = 900000;
const SEED = 20260612;

const MARKET_CONFIG = {
  US: {
    label: { en:'United States', vi:'Hoa Kỳ' }, localCurrency:'USD', defaultCurrency:'USD', defaultCapital:20000, defaultTickers:['META','AAPL','NVDA','AMZN'], defaultBenchmark:'SPY', defaultRf:0.052,
    benchmarks:[['SPY','SPY — S&P 500 ETF'],['QQQ','QQQ — Nasdaq 100 ETF'],['DIA','DIA — Dow Jones ETF'],['^GSPC','^GSPC — S&P 500 Index']],
    ratePresets:[['0.052','US savings / Fed reference — 5.20%'],['0.045','US conservative savings — 4.50%'],['custom','Custom manual rate']],
    tickers:[['AAPL','Apple Inc.','NASDAQ','Equity'],['AMZN','Amazon.com Inc.','NASDAQ','Equity'],['AMD','Advanced Micro Devices','NASDAQ','Equity'],['AVGO','Broadcom Inc.','NASDAQ','Equity'],['GOOGL','Alphabet Inc. Class A','NASDAQ','Equity'],['META','Meta Platforms','NASDAQ','Equity'],['MSFT','Microsoft Corp.','NASDAQ','Equity'],['NVDA','NVIDIA Corp.','NASDAQ','Equity'],['TSLA','Tesla Inc.','NASDAQ','Equity'],['JPM','JPMorgan Chase','NYSE','Equity'],['BAC','Bank of America','NYSE','Equity'],['V','Visa Inc.','NYSE','Equity'],['MA','Mastercard Inc.','NYSE','Equity'],['KO','Coca-Cola Co.','NYSE','Equity'],['PEP','PepsiCo Inc.','NASDAQ','Equity'],['COST','Costco Wholesale','NASDAQ','Equity'],['WMT','Walmart Inc.','NYSE','Equity'],['UNH','UnitedHealth Group','NYSE','Equity'],['JNJ','Johnson & Johnson','NYSE','Equity'],['XOM','Exxon Mobil','NYSE','Equity'],['CVX','Chevron','NYSE','Equity'],['SPY','SPDR S&P 500 ETF','NYSE Arca','ETF'],['QQQ','Invesco QQQ ETF','NASDAQ','ETF'],['DIA','SPDR Dow Jones ETF','NYSE Arca','ETF'],['GLD','SPDR Gold Shares','NYSE Arca','ETF'],['TLT','iShares 20+ Year Treasury Bond ETF','NASDAQ','ETF']]
  },
  VN: {
    label: { en:'Vietnam', vi:'Việt Nam' }, localCurrency:'VND', defaultCurrency:'VND', defaultCapital:500000000, defaultTickers:['FPT','HPG','VCB'], defaultBenchmark:'VNINDEX', defaultRf:0.047,
    benchmarks:[['VNINDEX','VNINDEX — Vietnam benchmark'],['VN30','VN30 — Large-cap benchmark']],
    ratePresets:[['0.047','VCB deposit reference — 4.70%'],['0.052','MB deposit reference — 5.20%'],['custom','Custom manual rate']],
    tickers:[['FPT','FPT Corporation','HOSE','Equity'],['HPG','Hoa Phat Group','HOSE','Equity'],['VCB','Vietcombank','HOSE','Equity'],['VNM','Vinamilk','HOSE','Equity'],['VIC','Vingroup','HOSE','Equity'],['VHM','Vinhomes','HOSE','Equity'],['TCB','Techcombank','HOSE','Equity'],['MBB','Military Bank','HOSE','Equity'],['ACB','Asia Commercial Bank','HOSE','Equity'],['SHB','Saigon - Hanoi Bank','HOSE','Equity'],['SSI','SSI Securities','HOSE','Equity'],['VND','VNDIRECT Securities','HOSE','Equity'],['CTG','VietinBank','HOSE','Equity'],['BID','BIDV','HOSE','Equity'],['STB','Sacombank','HOSE','Equity'],['HDB','HDBank','HOSE','Equity'],['MWG','Mobile World','HOSE','Equity'],['DGC','Duc Giang Chemicals','HOSE','Equity'],['MSN','Masan Group','HOSE','Equity'],['PVS','PV Technical Services','HNX','Equity'],['SHS','Saigon Hanoi Securities','HNX','Equity'],['CEO','CEO Group','HNX','Equity'],['VPB','VPBank','HOSE','Equity'],['TPB','TPBank','HOSE','Equity'],['EIB','Eximbank','HOSE','Equity'],['MSB','MSB Bank','HOSE','Equity'],['OCB','OCB Bank','HOSE','Equity'],['VIB','VIB Bank','HOSE','Equity'],['LPB','LPBank','HOSE','Equity'],['SSB','SeABank','HOSE','Equity'],['VCI','Vietcap Securities','HOSE','Equity'],['HCM','HSC Securities','HOSE','Equity'],['MBS','MB Securities','HNX','Equity'],['FTS','FPT Securities','HOSE','Equity'],['VIX','VIX Securities','HOSE','Equity'],['BSI','BIDV Securities','HOSE','Equity'],['CTS','Vietinbank Securities','HOSE','Equity'],['HSG','Hoa Sen Group','HOSE','Equity'],['NKG','Nam Kim Steel','HOSE','Equity'],['VRE','Vincom Retail','HOSE','Equity'],['DXG','Dat Xanh Group','HOSE','Equity'],['NLG','Nam Long Group','HOSE','Equity'],['KDH','Khang Dien House','HOSE','Equity'],['PDR','Phat Dat Real Estate','HOSE','Equity'],['DIG','DIC Group','HOSE','Equity'],['KBC','Kinh Bac City','HOSE','Equity'],['VGC','Viglacera','HOSE','Equity'],['TCH','Hoang Huy Group','HOSE','Equity'],['CTR','Viettel Construction','HOSE','Equity'],['ELC','Elcom Technology','HOSE','Equity'],['GAS','PV Gas','HOSE','Equity'],['PLX','Petrolimex','HOSE','Equity'],['POW','PV Power','HOSE','Equity'],['PVD','PV Drilling','HOSE','Equity'],['PVT','PV Trans','HOSE','Equity'],['GEX','GELEX Group','HOSE','Equity'],['SAB','Sabeco','HOSE','Equity'],['REE','REE Corp','HOSE','Equity'],['PNJ','PNJ Jewelry','HOSE','Equity'],['FRT','FPT Retail','HOSE','Equity'],['DGW','Digiworld','HOSE','Equity'],['HAG','Hoang Anh Gia Lai','HOSE','Equity'],['DBC','Dabaco','HOSE','Equity'],['GMD','Gemadept','HOSE','Equity'],['HAH','Hai An Transport','HOSE','Equity'],['VHC','Vinh Hoan','HOSE','Equity'],['ANV','Nam Viet','HOSE','Equity']]
  }
};

const I18N = {
  en: {
    'lang.step':'Language Setup','lang.title':'Select Your Language','lang.subtitle':'Choose the language that gives you the best experience.','lang.english':'English','lang.vietnamese':'Vietnamese','lang.continue':'Continue',
    'quiz.step':'Step 1 / 3','quiz.title':'Investor Personality & Risk Quiz','quiz.subtitle':'Answer the six-question risk appetite questionnaire. The score is calculated using section weights: psychology 30%, loss aversion 40%, and capacity/horizon 30%.','quiz.methodology':'Risk score methodology: Psychological Baseline = 30%, Loss Aversion & Philosophy = 40%, Capacity & Horizon = 30%. Final score is mapped to five investor profiles.','quiz.reset':'Reset Answers','quiz.submit':'Compute Risk Profile',
    'riskResult.step':'Risk Profile Result','riskResult.redo':'Re-do the Test','riskResult.continue':'Continue to Next Step',
    'market.step':'Step 2 / 3','market.title':'Select Market','market.subtitle':'Your market choice controls ticker autocomplete, benchmark options, currency conversion, data source, and bank-rate presets.','market.usName':'United States','market.vnName':'Vietnam','market.enterUS':'Enter US Market →','market.enterVN':'Enter Vietnam Market →',
    'sidebar.product':'Portfolio Optimizer','sidebar.switchMarket':'Switch Market','sidebar.switchLanguage':'Switch Language','nav.configuration':'Configuration','nav.integrity':'Fundamental Integrity','nav.priceCharts':'Price Charts','nav.pipeline':'Math Pipeline','nav.models':'Model Comparison','nav.backtest':'Backtesting','nav.projection':'Wealth Projection','nav.report':'PDF Report',
    'config.step':'Step 3 / 3','config.title':'Portfolio Configuration','config.liveMode':'Live data • auto FX • no fabricated metrics','config.tickerSearch':'Ticker Search','config.manualTickers':'Manual tickers','config.benchmark':'Benchmark','config.modelPolicy':'Optimizer model policy','config.window':'Analysis window','config.maxWeight':'Max weight per asset','config.capital':'Investment capital','config.currency':'Base/display currency','config.fx':'Live USD/VND exchange rate','config.ratePreset':'Bank rate preset','config.bankRate':'Bank / risk-free rate (%)','config.views':'Investor views for Black-Litterman','config.confidence':'View confidence (%)','config.run':'Run Portfolio Optimizer','config.clear':'Clear Tickers','config.ready':'Ready. Add tickers and run the optimizer.','config.groupTickersTitle':'1. Tickers','config.groupTickersCopy':'Choose the assets you want to optimize. Suggestions are optional; manual comma-separated tickers are allowed.','config.groupBenchmarkTitle':'2. Benchmark & analysis window','config.groupBenchmarkCopy':'Pick the comparison index and the lookback period for real historical data.','config.groupMoneyTitle':'3. Capital, currency & rates','config.groupMoneyCopy':'Set capital, display currency, live USD/VND conversion, and bank / risk-free rate. FX is retrieved automatically.','config.groupViewsTitle':'4. Investor views for Black-Litterman','config.groupViewsCopy':'Enter views per ticker below. For example, +0.03 means you expect that ticker to earn 3% more per year; valid values range from -1 to +1. If valid market-cap data and views exist, Black-Litterman will be calculated and shown.',
    'kpi.assets':'Assets','kpi.return':'Expected Return','kpi.vol':'Volatility','kpi.sharpe':'Sharpe Ratio',
    'integrity.kicker':'Fundamental Integrity Layer','integrity.title':'Financial Statement Integrity Check','integrity.badge':'Data not available when open providers do not publish it','integrity.copy':'This layer loads only what open providers actually publish before optimization. Real Altman Z-Score and Beneish M-Score require standardized statements. When the data is missing, Veera shows Data not available instead of inventing a proxy.',
    'price.title':'Single Asset Price Chart','price.copy':'',
    'pipeline.title':'Quant Optimizer Pipeline','pipeline.copy':'Log returns, annualized covariance, MPT Monte Carlo, and Markowitz frontier extraction.','pipeline.step1':'Step 1 — Log Returns & Covariance Matrix','pipeline.step2':'Step 2 — MPT Monte Carlo Weight Simulation','pipeline.step2copy':'Random valid weight vectors are sampled by rejection sampling under the IPS max-weight constraint.','pipeline.step3':'Step 3 — Markowitz Efficient Frontier','pipeline.step3copy':'The frontier is extracted from volatility buckets, keeping the best return in each bucket.',
    'models.title':'Model Comparison & Recommendation','models.copy':'The recommended weights always come from the chosen model policy and must satisfy IPS constraints.','models.weights':'Recommended Weights','models.riskContribution':'Risk Contribution',
    'backtest.title':'Historical Backtesting','backtest.copy':'Backtest uses daily log returns and monthly rebalancing to the recommended weights.',
    'projection.title':'Wealth Projection','projection.copy':'The basic projection compounds the selected portfolio return. The scenario fan uses correlated GBM Monte Carlo to show a possible range of future portfolio values.','projection.deterministic':'Compound Projection vs Bank Deposit','projection.monteCarlo':'Scenario Fan — Correlated Monte Carlo',
    'report.title':'Quant Report','report.copy':'Export a clean PDF summary of the selected market, risk profile, model outputs, backtest, and disclaimers.','report.download':'Download PDF','footer.disclaimer':'Educational quantitative dashboard. Not investment advice.',
    'tip.tickerSearch':'Search by ticker or company name. Autocomplete is market-aware and prevents duplicate tickers.','tip.modelPolicy':'Auto follows the risk profile. Manual selection forces the recommended weights to come from that exact model.','tip.maxWeight':'IPS constraint: every optimizer must keep each asset weight below this cap. If cap × number of assets < 100%, optimization is infeasible.','tip.rf':'Annual risk-free/bank rate. It must share the same annual unit as expected return and volatility.','tip.views':'Optional Black-Litterman views. Format: NVDA:+0.03, AAPL:-0.01. Each view must be between -1 and +1.','tip.confidence':'Confidence controls how strongly your Black-Litterman views pull posterior expected returns away from market-implied returns.','tip.expectedReturn':'Expected Return: μ = mean(daily log returns) × 252. It is historical and not guaranteed.','tip.volatility':'Volatility: σp = √(wᵀΣw), where Σ is the annualized covariance matrix.','tip.sharpe':'Sharpe Ratio = (Portfolio Return − Risk-free Rate) / Volatility. Higher means more return per unit of risk.',
    modelsPolicyAuto:'Auto — use risk profile', minVol:'Minimum Volatility', maxSharpe:'Maximum Sharpe', riskParity:'Risk Parity', cvar:'CVaR Optimized', blackLitterman:'Black-Litterman', highReturn:'Aggressive Growth', equal:'Equal Weight',
    loading:'Loading live data through serverless adapters...', complete:'Analysis complete.', noFake:'No synthetic price data is generated.', apiFail:'Live data request failed. Run with Netlify Functions or check provider availability.',
    headers:{asset:'Asset',price:'Price',source:'Source',quality:'Quality',altman:'Altman Z',beneish:'Beneish M',fcf:'FCF Yield',leverage:'Leverage',explanation:'Explanation',model:'Model',ret:'Expected Return',risk:'Risk',sharpe:'Sharpe',cvar:'CVaR',weights:'Weights',constraint:'IPS Constraint',metric:'Metric',value:'Value',year:'Year',stock:'Stock Portfolio',bank:'Bank Deposit',diff:'Difference', beta:'Beta', alpha:'Jensen Alpha'},
    kpiBaseline:'Equal-Weight Baseline Metrics', kpiOptimized:'Optimized Portfolio Metrics', assetStatsTitle:'Individual Asset Statistics', assetStatsCopy:'Annualized statistics are calculated from each asset’s daily log returns and compared with the benchmark.', chartTicker:'Displayed ticker',
    riskProfiles:{
      conservative:{name:'Conservative Investor',desc:'You have very low risk tolerance and prioritize capital preservation over high returns.',bullets:['Prefers stable outcomes and low volatility.','Avoids large drawdowns whenever possible.','May favor defensive or income-focused allocations.','Needs strong downside-risk control before seeking growth.']},
      moderateConservative:{name:'Moderately Conservative Investor',desc:'You accept limited risk, but safety remains more important than aggressive return.',bullets:['Can tolerate some fluctuations but dislikes deep losses.','Prefers diversified and defensive portfolios.','May accept modest growth with controlled volatility.','Needs clear risk limits and conservative constraints.']},
      balanced:{name:'Balanced Investor',desc:'You accept moderate risk in exchange for reasonable long-term growth.',bullets:['Seeks both stability and return.','Benefits from diversification across assets.','Can handle normal market fluctuations.','Usually fits risk-adjusted models such as Maximum Sharpe.']},
      growth:{name:'Growth-Oriented Investor',desc:'You are comfortable with market fluctuations and focus on long-term capital growth.',bullets:['Can accept short-term losses for higher expected return.','Prefers growth exposure with risk controls.','May tolerate higher volatility than balanced investors.','Still needs diversification and IPS constraints.']},
      aggressive:{name:'Aggressive Investor',desc:'You have high risk tolerance and can accept substantial volatility and drawdowns.',bullets:['Seeks higher expected returns.','Comfortable with high volatility.','Can tolerate larger portfolio drawdowns.','May use Black-Litterman or aggressive growth models when inputs are valid.']}
    }
  },
  vi: {
    'lang.step':'Thiết lập ngôn ngữ','lang.title':'Chọn ngôn ngữ','lang.subtitle':'Chọn ngôn ngữ phù hợp nhất để có trải nghiệm tốt nhất.','lang.english':'Tiếng Anh','lang.vietnamese':'Tiếng Việt','lang.continue':'Tiếp tục',
    'quiz.step':'Bước 1 / 3','quiz.title':'Trắc nghiệm tính cách & khẩu vị rủi ro','quiz.subtitle':'Trả lời 6 câu hỏi về khẩu vị rủi ro. Điểm được tính theo trọng số: tâm lý 30%, phản ứng với thua lỗ 40%, năng lực tài chính và thời hạn đầu tư 30%.','quiz.methodology':'Phương pháp tính điểm: Tâm lý nền tảng = 30%, Phản ứng với thua lỗ & triết lý đầu tư = 40%, Năng lực tài chính & thời hạn đầu tư = 30%. Điểm cuối cùng được phân loại thành 5 hồ sơ nhà đầu tư.','quiz.reset':'Làm lại câu trả lời','quiz.submit':'Tính hồ sơ rủi ro',
    'riskResult.step':'Kết quả hồ sơ rủi ro','riskResult.redo':'Làm lại bài test','riskResult.continue':'Tiếp tục bước kế tiếp',
    'market.step':'Bước 2 / 3','market.title':'Chọn thị trường','market.subtitle':'Thị trường được chọn sẽ quyết định gợi ý mã cổ phiếu, chỉ số tham chiếu, đơn vị tiền tệ, nguồn dữ liệu và lãi suất tham chiếu.','market.usName':'Hoa Kỳ','market.vnName':'Việt Nam','market.enterUS':'Vào thị trường Mỹ →','market.enterVN':'Vào thị trường Việt Nam →',
    'sidebar.product':'Tối ưu danh mục','sidebar.switchMarket':'Đổi thị trường','sidebar.switchLanguage':'Đổi ngôn ngữ','nav.configuration':'Cấu hình','nav.integrity':'Kiểm tra nền tảng','nav.priceCharts':'Biểu đồ giá','nav.pipeline':'Quy trình toán học','nav.models':'So sánh mô hình','nav.backtest':'Kiểm định lịch sử','nav.projection':'Dự phóng tài sản','nav.report':'Báo cáo PDF',
    'config.step':'Bước 3 / 3','config.title':'Cấu hình danh mục đầu tư','config.liveMode':'Dữ liệu thật • tỷ giá tự động','config.tickerSearch':'Tìm mã cổ phiếu','config.manualTickers':'Nhập mã thủ công','config.benchmark':'Chỉ số tham chiếu','config.modelPolicy':'Chính sách chọn mô hình tối ưu','config.window':'Khoảng thời gian phân tích','config.maxWeight':'Tỷ trọng tối đa mỗi mã','config.capital':'Số vốn đầu tư','config.currency':'Đồng tiền cơ sở/hiển thị','config.fx':'Tỷ giá USD/VND live tự động','config.ratePreset':'Lãi suất tham chiếu','config.bankRate':'Lãi suất ngân hàng / phi rủi ro (%)','config.views':'Quan điểm nhà đầu tư cho Black-Litterman','config.confidence':'Mức tin cậy của quan điểm (%)','config.run':'Chạy tối ưu danh mục','config.clear':'Xóa mã đã chọn','config.ready':'Sẵn sàng. Hãy thêm mã cổ phiếu và chạy tối ưu.','config.groupTickersTitle':'1. Mã cổ phiếu','config.groupTickersCopy':'Chọn các mã bạn muốn tối ưu. Gợi ý chỉ để hỗ trợ; bạn vẫn có thể nhập mã thủ công và ngăn cách bằng dấu phẩy.','config.groupBenchmarkTitle':'2. Chỉ số tham chiếu & thời gian phân tích','config.groupBenchmarkCopy':'Chọn chỉ số so sánh và khoảng thời gian lấy dữ liệu lịch sử thật.','config.groupMoneyTitle':'3. Vốn đầu tư, tiền tệ & lãi suất','config.groupMoneyCopy':'Thiết lập số vốn, đồng tiền hiển thị, tỷ giá USD/VND live và lãi suất ngân hàng/phi rủi ro. Tỷ giá được lấy tự động.','config.groupViewsTitle':'4. Quan điểm nhà đầu tư cho Black-Litterman','config.groupViewsCopy':'Nhập quan điểm theo từng mã bên dưới. Ví dụ +0.03 nghĩa là bạn kỳ vọng mã đó cao hơn 3%/năm; giá trị hợp lệ từ -1 đến +1. Nếu đủ dữ liệu vốn hóa và quan điểm hợp lệ, Black-Litterman sẽ được tính và hiển thị.',
    'kpi.assets':'Số mã','kpi.return':'Lợi suất kỳ vọng','kpi.vol':'Độ biến động','kpi.sharpe':'Tỷ lệ Sharpe',
    'integrity.kicker':'Lớp kiểm tra nền tảng tài chính','integrity.title':'Kiểm tra chất lượng báo cáo tài chính','integrity.badge':'Dữ liệu không khả dụng khi nguồn mở không công bố','integrity.copy':'Lớp này chỉ tải những gì nguồn dữ liệu mở thực sự công bố trước khi tối ưu hóa. Altman Z-Score và Beneish M-Score thật cần báo cáo tài chính chuẩn hóa. Nếu thiếu dữ liệu, Veera hiển thị Data not available thay vì tự tạo proxy.',
    'price.title':'Biểu đồ giá từng mã được chọn','price.copy':'',
    'pipeline.title':'Quy trình tối ưu định lượng','pipeline.copy':'Dùng log return, ma trận hiệp biến năm hóa, Monte Carlo theo MPT và trích xuất đường biên Markowitz.','pipeline.step1':'Bước 1 — Log Return & Ma trận hiệp biến','pipeline.step2':'Bước 2 — Mô phỏng Monte Carlo theo tỷ trọng MPT','pipeline.step2copy':'Hệ thống lấy mẫu các vector tỷ trọng hợp lệ bằng rejection sampling dưới ràng buộc tỷ trọng tối đa của IPS.','pipeline.step3':'Bước 3 — Đường biên hiệu quả Markowitz','pipeline.step3copy':'Đường biên được trích xuất từ các bucket độ biến động, giữ danh mục có lợi suất tốt nhất trong mỗi bucket.',
    'models.title':'So sánh mô hình & khuyến nghị','models.copy':'Tỷ trọng khuyến nghị luôn lấy từ đúng mô hình được chọn và phải thỏa mãn ràng buộc IPS.','models.weights':'Tỷ trọng khuyến nghị','models.riskContribution':'Đóng góp rủi ro',
    'backtest.title':'Kiểm định lịch sử','backtest.copy':'Backtest dùng log return hằng ngày và tái cân bằng hằng tháng về tỷ trọng khuyến nghị.',
    'projection.title':'Dự phóng tài sản','projection.copy':'Dự phóng cơ bản dùng lãi kép của danh mục đang xem. Biểu đồ quạt dùng Monte Carlo GBM có tương quan để mô phỏng vùng kết quả có thể xảy ra trong tương lai.','projection.deterministic':'Dự phóng lãi kép so với gửi ngân hàng','projection.monteCarlo':'Biểu đồ quạt kịch bản — Monte Carlo có tương quan',
    'report.title':'Báo cáo định lượng','report.copy':'Xuất báo cáo PDF gồm thị trường, hồ sơ rủi ro, kết quả mô hình, backtest và cảnh báo.','report.download':'Tải PDF','footer.disclaimer':'Dashboard định lượng phục vụ học tập. Không phải lời khuyên đầu tư.',
    'tip.tickerSearch':'Tìm theo mã hoặc tên công ty. Gợi ý mã theo từng thị trường và không cho chọn trùng.','tip.modelPolicy':'Tự động sẽ theo hồ sơ rủi ro. Nếu chọn thủ công, tỷ trọng khuyến nghị sẽ lấy đúng từ mô hình đó.','tip.maxWeight':'Ràng buộc IPS: mọi mô hình phải giữ từng mã dưới mức trần này. Nếu trần × số mã < 100%, bài toán không khả thi.','tip.rf':'Lãi suất ngân hàng/phi rủi ro theo năm. Đơn vị phải khớp với lợi suất kỳ vọng và độ biến động năm hóa.','tip.views':'Quan điểm Black-Litterman tùy chọn. Định dạng: NVDA:+0.03, AAPL:-0.01. Mỗi view phải nằm trong khoảng -1 đến +1.','tip.confidence':'Mức tin cậy quyết định quan điểm của bạn kéo lợi suất hậu nghiệm Black-Litterman mạnh đến đâu so với lợi suất thị trường ngụ ý.','tip.expectedReturn':'Lợi suất kỳ vọng: μ = trung bình log return ngày × 252. Đây là dữ liệu lịch sử, không phải cam kết tương lai.','tip.volatility':'Độ biến động: σp = √(wᵀΣw), trong đó Σ là ma trận hiệp biến năm hóa.','tip.sharpe':'Tỷ lệ Sharpe = (Lợi suất danh mục − Lãi suất phi rủi ro) / Độ biến động. Cao hơn nghĩa là lợi suất trên mỗi đơn vị rủi ro tốt hơn.',
    modelsPolicyAuto:'Tự động — theo hồ sơ rủi ro', minVol:'Độ biến động thấp nhất', maxSharpe:'Sharpe tối đa', riskParity:'Cân bằng đóng góp rủi ro', cvar:'CVaR tối ưu', blackLitterman:'Black-Litterman', highReturn:'Tăng trưởng mạo hiểm', equal:'Chia đều',
    loading:'Đang tải dữ liệu thật qua serverless adapters...', complete:'Phân tích hoàn tất.', noFake:'Hệ thống không tạo dữ liệu giá giả.', apiFail:'Không truy cập được dữ liệu thật. Hãy chạy bằng Netlify Functions hoặc kiểm tra nguồn dữ liệu.',
    headers:{asset:'Mã',price:'Giá',source:'Nguồn',quality:'Chất lượng',altman:'Altman Z',beneish:'Beneish M',fcf:'FCF Yield',leverage:'Đòn bẩy',explanation:'Giải thích',model:'Mô hình',ret:'Lợi suất kỳ vọng',risk:'Rủi ro',sharpe:'Sharpe',cvar:'CVaR',weights:'Tỷ trọng',constraint:'Ràng buộc IPS',metric:'Chỉ số',value:'Giá trị',year:'Năm',stock:'Danh mục cổ phiếu',bank:'Gửi ngân hàng',diff:'Chênh lệch', beta:'Beta', alpha:'Jensen Alpha'},
    kpiBaseline:'Chỉ số danh mục phân bổ đều', kpiOptimized:'Chỉ số danh mục đã tối ưu', assetStatsTitle:'Thống kê từng cổ phiếu riêng lẻ', assetStatsCopy:'Các chỉ số năm hóa được tính từ log return ngày của từng tài sản và so với benchmark.', chartTicker:'Mã đang hiển thị',
    riskProfiles:{
      conservative:{name:'Nhà đầu tư thận trọng',desc:'Bạn có khẩu vị rủi ro rất thấp và ưu tiên bảo toàn vốn hơn lợi nhuận cao.',bullets:['Ưa thích kết quả ổn định và độ biến động thấp.','Tránh các khoản lỗ sâu khi có thể.','Phù hợp hơn với danh mục phòng thủ hoặc tạo thu nhập.','Cần kiểm soát rủi ro giảm giá trước khi tìm kiếm tăng trưởng.']},
      moderateConservative:{name:'Nhà đầu tư hơi thận trọng',desc:'Bạn chấp nhận rủi ro giới hạn, nhưng sự an toàn vẫn quan trọng hơn lợi nhuận cao.',bullets:['Có thể chịu dao động nhẹ nhưng không thích lỗ sâu.','Ưa thích danh mục đa dạng và phòng thủ.','Chấp nhận tăng trưởng vừa phải với biến động được kiểm soát.','Cần ranh giới rủi ro rõ ràng và ràng buộc thận trọng.']},
      balanced:{name:'Nhà đầu tư cân bằng',desc:'Bạn chấp nhận rủi ro vừa phải để đổi lấy tăng trưởng hợp lý trong dài hạn.',bullets:['Tìm kiếm cả ổn định lẫn lợi suất.','Hưởng lợi từ đa dạng hóa giữa các tài sản.','Có thể chịu các dao động bình thường của thị trường.','Thường phù hợp với mô hình tối ưu theo lợi suất/rủi ro như Sharpe tối đa.']},
      growth:{name:'Nhà đầu tư thiên về tăng trưởng',desc:'Bạn thoải mái hơn với biến động thị trường và tập trung vào tăng trưởng vốn dài hạn.',bullets:['Có thể chấp nhận lỗ ngắn hạn để kỳ vọng lợi suất cao hơn.','Ưa thích tài sản tăng trưởng nhưng vẫn cần kiểm soát rủi ro.','Chấp nhận độ biến động cao hơn nhà đầu tư cân bằng.','Vẫn cần đa dạng hóa và ràng buộc IPS.']},
      aggressive:{name:'Nhà đầu tư mạo hiểm',desc:'Bạn có khẩu vị rủi ro cao và có thể chấp nhận biến động lớn cũng như drawdown sâu.',bullets:['Tìm kiếm lợi suất kỳ vọng cao hơn.','Thoải mái với độ biến động lớn.','Có thể chịu sụt giảm danh mục đáng kể.','Có thể dùng Black-Litterman hoặc mô hình tăng trưởng mạo hiểm khi đầu vào hợp lệ.']}
    }
  }
};

const QUIZ = [
  { id:'q1', section:'s1', text:{en:'When faced with an important financial decision, what is your intuitive approach to uncertainty?',vi:'Khi đối mặt với một quyết định tài chính quan trọng, phản ứng tự nhiên của bạn với sự bất định là gì?'}, opts:[['1',{en:'Avoid it entirely; I prefer guaranteed, predictable outcomes.',vi:'Tránh hoàn toàn; tôi thích kết quả chắc chắn và dễ dự đoán.'}],['2',{en:'Prefer minimal uncertainty; I only take risks if the odds are overwhelmingly in my favor.',vi:'Chỉ chấp nhận rất ít bất định; tôi chỉ mạo hiểm khi xác suất thắng nghiêng hẳn về phía mình.'}],['3',{en:'Moderate balance; I accept calculated risks if the potential return justifies it.',vi:'Cân bằng vừa phải; tôi chấp nhận rủi ro có tính toán nếu lợi suất tiềm năng xứng đáng.'}],['4',{en:'Risk-seeking; I find opportunity in highly volatile situations.',vi:'Ưa rủi ro; tôi nhìn thấy cơ hội trong các tình huống biến động mạnh.'}]]},
  { id:'q2', section:'s1', text:{en:'Imagine you are given a choice between a guaranteed cash payout or a coin flip. Which option do you prefer?',vi:'Nếu được chọn giữa khoản tiền chắc chắn và một trò tung đồng xu, bạn thích phương án nào?'}, opts:[['1',{en:'A guaranteed $1,000.',vi:'Nhận chắc chắn 1.000 USD.'}],['2',{en:'75% chance of winning $1,500 and 25% chance of winning $0.',vi:'75% cơ hội nhận 1.500 USD và 25% khả năng nhận 0 USD.'}],['3',{en:'50% chance of winning $2,500 and 50% chance of winning $0.',vi:'50% cơ hội nhận 2.500 USD và 50% khả năng nhận 0 USD.'}],['4',{en:'25% chance of winning $6,000 and 75% chance of winning $0.',vi:'25% cơ hội nhận 6.000 USD và 75% khả năng nhận 0 USD.'}]]},
  { id:'q3', section:'s2', text:{en:'Suppose a broad equity portfolio drops 20% within three months. What is your immediate reaction?',vi:'Nếu một danh mục cổ phiếu rộng giảm 20% trong vòng ba tháng, phản ứng ngay lập tức của bạn là gì?'}, opts:[['1',{en:'Sell the entire portfolio immediately to protect remaining capital.',vi:'Bán toàn bộ danh mục ngay để bảo vệ phần vốn còn lại.'}],['2',{en:'Sell a portion and move assets into low-risk government bonds.',vi:'Bán một phần và chuyển sang tài sản ít rủi ro hơn như trái phiếu chính phủ.'}],['3',{en:'Do nothing; maintain the portfolio and wait for long-term recovery.',vi:'Không làm gì; giữ danh mục và chờ phục hồi dài hạn.'}],['4',{en:'Buy more shares at the discounted price, capitalizing on volatility.',vi:'Mua thêm ở mức giá thấp hơn để tận dụng biến động thị trường.'}]]},
  { id:'q4', section:'s2', text:{en:'Which statement best describes your investment philosophy regarding risk and return?',vi:'Câu nào mô tả đúng nhất triết lý đầu tư của bạn về rủi ro và lợi suất?'}, opts:[['1',{en:'Preserving nominal capital is my absolute priority, even if returns fail to beat inflation.',vi:'Bảo toàn vốn danh nghĩa là ưu tiên tuyệt đối, kể cả khi lợi suất không thắng lạm phát.'}],['2',{en:'I want steady income with low volatility, accepting minimal capital growth.',vi:'Tôi muốn thu nhập ổn định với biến động thấp, chấp nhận tăng trưởng vốn hạn chế.'}],['3',{en:'I seek a balanced mix of growth and safety, accepting moderate fluctuations.',vi:'Tôi tìm sự cân bằng giữa tăng trưởng và an toàn, chấp nhận dao động vừa phải.'}],['4',{en:'I aim for maximum capital appreciation and accept substantial, prolonged drawdowns.',vi:'Tôi nhắm đến tăng trưởng vốn tối đa và chấp nhận drawdown lớn, kéo dài.'}]]},
  { id:'q5', section:'s3', text:{en:'If your primary income ceased today, how long could your liquid reserves cover baseline expenses?',vi:'Nếu nguồn thu nhập chính dừng lại hôm nay, khoản dự trữ thanh khoản của bạn có thể trang trải chi phí cơ bản trong bao lâu?'}, opts:[['1',{en:'Less than 1 month.',vi:'Dưới 1 tháng.'}],['2',{en:'1 to 3 months.',vi:'Từ 1 đến 3 tháng.'}],['3',{en:'3 to 12 months.',vi:'Từ 3 đến 12 tháng.'}],['4',{en:'More than 12 months.',vi:'Trên 12 tháng.'}]]},
  { id:'q6', section:'s3', text:{en:'What is your intended investment horizon before requiring significant withdrawals?',vi:'Thời hạn đầu tư dự kiến của bạn trước khi cần rút một khoản tiền đáng kể là bao lâu?'}, opts:[['1',{en:'Less than 2 years.',vi:'Dưới 2 năm.'}],['2',{en:'2 to 5 years.',vi:'Từ 2 đến 5 năm.'}],['3',{en:'5 to 10 years.',vi:'Từ 5 đến 10 năm.'}],['4',{en:'Greater than 10 years.',vi:'Trên 10 năm.'}]]}
];

const state = { lang: localStorage.getItem('veeraLanguage') || 'en', stage:'introStage', market:null, riskScore:null, riskProfileKey:'balanced', riskProfileName:'Balanced Investor', selectedTickers:[], benchmark:'', maxWeight:0.35, bankRate:0.052, inputCapital:20000, capital:20000, currency:'USD', localCurrency:'USD', fxRate:null, fxHistory:[], priceWindow:1, backtestWindow:5, prices:{}, normalizedPrices:{}, quotes:{}, fundamentals:{}, warnings:[], errors:{}, symbols:[], aligned:null, portfolios:[], models:{}, recommendedKey:null, viewModelKey:null, frontier:[], backtest:null, gbm:null, activePriceTicker:null, kpiMode:'baseline' };
const $ = (id) => document.getElementById(id);
function t(key){ return key.split('.').reduce((o,k)=>o&&o[k],I18N[state.lang]) ?? I18N[state.lang][key] ?? I18N.en[key] ?? key; }
function setText(key, value){ const el=$(key); if(el) el.textContent=value; }
const pct=(x,d=2)=>Number.isFinite(x)?`${(x*100).toFixed(d)}%`:'--';
const num=(x,d=4)=>Number.isFinite(x)?Number(x).toFixed(d):'--';
const cleanSymbol=(s)=>String(s||'').trim().toUpperCase().replace(/[^A-Z0-9.^=-]/g,'');
const unique=(arr)=>[...new Set(arr.filter(Boolean))];
const mean=(a)=>a.reduce((s,x)=>s+x,0)/a.length;
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const transpose=(m)=>m[0].map((_,i)=>m.map(r=>r[i]));
const money=(x,cur=state.currency)=>Number.isFinite(x)?new Intl.NumberFormat(cur==='USD'?'en-US':'vi-VN',{style:'currency',currency:cur,maximumFractionDigits:cur==='USD'?2:0}).format(x):'--';
const compact=(x)=>Number.isFinite(x)?new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:2}).format(x):'--';
const plotConfig={responsive:true,displaylogo:false,modeBarButtonsToRemove:['lasso2d','select2d']};
function plotLayout(title=''){return{title:title?{text:title,font:{color:'#E9F2EE',size:15}}:undefined,paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{color:'#E9F2EE',family:'Inter'},margin:{l:58,r:22,t:title?46:18,b:52},xaxis:{gridcolor:'rgba(169,238,235,.10)',zerolinecolor:'rgba(169,238,235,.18)'},yaxis:{gridcolor:'rgba(169,238,235,.10)',zerolinecolor:'rgba(169,238,235,.18)'},legend:{orientation:'h',y:1.14,x:0}}}
function htmlTable(headers, rows){return `<thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;}

window.addEventListener('DOMContentLoaded', init);
function init(){ initVeeraExperience(); applyLanguage(state.lang); renderQuiz(); bindStageEvents(); bindDashboardEvents(); initRevealObserver(); initTooltipOverlay(); updateMascotHint(); }
function runMatrixIntro(){ const canvas=$('matrixCanvas'), skip=$('skipIntroBtn'), ctx=canvas.getContext('2d'), chars='01ΣβαΔ!@#$%^&*+/VEERAQUANT'; let active=true,w,h,cols,drops=[]; const resize=()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight;cols=Math.floor(w/18);drops=Array.from({length:cols},()=>Math.random()*h/18)}; resize(); addEventListener('resize',resize); function draw(){if(!active)return; ctx.fillStyle='rgba(15,34,69,.10)';ctx.fillRect(0,0,w,h);ctx.font='22px VT323';for(let i=0;i<drops.length;i++){ctx.fillStyle=Math.random()>.5?'#5BEBE8':'#A9EEEB';ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*18,drops[i]*18); if(drops[i]*18>h&&Math.random()>.975)drops[i]=0; drops[i]++} requestAnimationFrame(draw)} draw(); const end=()=>{if(!active)return;active=false;canvas.classList.add('hidden');skip.classList.add('hidden');removeEventListener('resize',resize);setTimeout(()=>canvas.remove(),900);scrambleIntroText()}; skip.addEventListener('click',end); setTimeout(end,2500); }
function scrambleIntroText(){ if(matchMedia('(prefers-reduced-motion: reduce)').matches)return; const alphabet='!@#$%^&*+/01ΣβαΔ'; document.querySelectorAll('.scramble').forEach((el,idx)=>{const finalText=el.dataset.text||el.textContent;let frame=0,total=finalText.length+12;const timer=setInterval(()=>{const locked=Math.max(0,frame-8);el.textContent=finalText.split('').map((ch,i)=>ch===' '?' ':i<locked?ch:alphabet[Math.floor(Math.random()*alphabet.length)]).join('');frame++;if(frame>total){clearInterval(timer);el.textContent=finalText}},36+idx*8)})}
function setStage(id){ state.stage=id; document.querySelectorAll('.stage,.dashboard-stage').forEach(el=>el.classList.remove('active-stage')); $(id).classList.add('active-stage'); scrollTo({top:0,behavior:'smooth'}); setTimeout(resizePlots,150); }
function applyLanguage(lang){ state.lang=lang; localStorage.setItem('veeraLanguage',lang); document.documentElement.lang=lang; document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)}); document.querySelectorAll('[data-tip-key]').forEach(el=>{el.dataset.tip=t(el.dataset.tipKey)}); renderQuiz(); updateDynamicLanguage(); document.querySelectorAll('input[name="languageChoice"]').forEach(i=>{i.checked=i.value===lang; i.closest('.language-card')?.classList.toggle('selected',i.checked)}); }
function updateDynamicLanguage(){ if($('tickerSearchInput')) $('tickerSearchInput').placeholder=state.lang==='vi'?'Tìm mã hoặc tên công ty...':'Search ticker or company name...'; if($('chartTickerLabel')) $('chartTickerLabel').textContent=t('chartTicker'); if($('assetStatsTitle')) $('assetStatsTitle').textContent=t('assetStatsTitle'); if($('assetStatsCopy')) $('assetStatsCopy').textContent=t('assetStatsCopy'); if($('viewsInput')) $('viewsInput').placeholder=state.market==='VN'?'Ví dụ: FPT:+0.03, VCB:-0.01':'Example: NVDA:+0.03, AAPL:-0.01'; if(state.market){ renderBenchmarkOptions(); renderRateOptions(); updateSidebarLabels(); updateCurrencyNote(); } if(state.riskScore!==null) renderRiskResult(); if(state.models && Object.keys(state.models).length) renderAll(); }
function bindStageEvents(){ $('experienceBtn').addEventListener('click',()=>setStage('languageStage')); document.querySelectorAll('input[name="languageChoice"]').forEach(i=>i.addEventListener('change',e=>applyLanguage(e.target.value))); $('continueLanguageBtn').addEventListener('click',()=>setStage('quizStage')); $('submitQuizBtn').addEventListener('click',()=>{ if(!validateQuiz()) return; computeRiskProfile(); renderRiskResult(); setStage('riskResultStage'); }); $('resetQuizBtn').addEventListener('click',resetQuiz); $('redoQuizBtn').addEventListener('click',()=>{resetQuiz();setStage('quizStage')}); $('continueToMarketBtn').addEventListener('click',()=>{localStorage.setItem('veeraRiskProfile',JSON.stringify({score:state.riskScore,key:state.riskProfileKey}));setStage('marketStage')}); document.querySelectorAll('.market-card').forEach(card=>card.addEventListener('click',()=>{selectMarket(card.dataset.market);setStage('dashboardStage')})); }
function renderQuiz(){ const root=$('quizContainer'); if(!root) return; root.innerHTML=QUIZ.map((q,idx)=>`<div class="question-card"><h3>${idx+1}. ${q.text[state.lang]}</h3><div class="mcq-grid">${q.opts.map(([value,label])=>`<label class="mcq-option" tabindex="0"><input type="radio" name="${q.id}" value="${value}" data-section="${q.section}" ${value==='3'?'checked':''}/><span>${label[state.lang]}</span></label>`).join('')}</div></div>`).join(''); root.querySelectorAll('.mcq-option').forEach(label=>label.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();label.querySelector('input').checked=true}})); }
function validateQuiz(){ return QUIZ.every(q=>document.querySelector(`input[name="${q.id}"]:checked`)); }
function resetQuiz(){ QUIZ.forEach(q=>{const three=document.querySelector(`input[name="${q.id}"][value="3"]`); if(three) three.checked=true;}); state.riskScore=null; }
function computeRiskProfile(){ const val=(q)=>Number(document.querySelector(`input[name="${q}"]:checked`)?.value||3); const s1=val('q1')+val('q2'), s2=val('q3')+val('q4'), s3=val('q5')+val('q6'); const score=(s1/8)*30+(s2/8)*40+(s3/8)*30; state.riskScore=score; state.riskProfileKey= score<40?'conservative':score<55?'moderateConservative':score<70?'balanced':score<85?'growth':'aggressive'; state.riskProfileName=t('riskProfiles')[state.riskProfileKey].name; }
function renderRiskResult(){ const rp=t('riskProfiles')[state.riskProfileKey]; $('riskResultTitle').textContent=rp.name; $('riskScoreValue').textContent=String(Math.round(state.riskScore)); $('riskResultDescription').textContent=rp.desc; $('riskResultBullets').innerHTML=rp.bullets.map(x=>`<li>${x}</li>`).join(''); updateSidebarLabels(); }

function bindDashboardEvents(){ $('switchMarketBtn').addEventListener('click',()=>setStage('marketStage')); $('switchLanguageBtn').addEventListener('click',()=>setStage('languageStage')); $('runAnalysisBtn').addEventListener('click',runAnalysis); $('clearTickersBtn').addEventListener('click',()=>{state.selectedTickers=[];syncChips()}); $('tickersInput').addEventListener('change',()=>{state.selectedTickers=parseTickers($('tickersInput').value);syncChips()}); $('tickerSearchInput').addEventListener('input',debounce(async e=>renderSuggestions(await searchTickers(e.target.value)),180)); $('ratePresetInput').addEventListener('change',e=>{if(e.target.value!=='custom'){$('bankRateInput').value=(Number(e.target.value)*100).toFixed(2);state.bankRate=Number(e.target.value)}}); $('currencyInput').addEventListener('change',()=>{state.currency=$('currencyInput').value; updateCurrencyNote(); if(state.aligned) runAnalysis();}); const fxInput=$('fxRateInput'); if(fxInput){ fxInput.setAttribute('readonly','readonly'); } $('modelPolicyInput').addEventListener('change',()=>{ if(state.models && Object.keys(state.models).length){ selectRecommendedFromPolicy(); if(!state.viewModelKey || !state.models[state.viewModelKey]) state.viewModelKey=state.recommendedKey; computeBacktest(); computeGBM(); state.kpiMode='optimized'; renderAll(); }}); const selector=$('priceTickerSelector'); if(selector) selector.addEventListener('change',()=>{state.activePriceTicker=selector.value; renderPriceCharts();}); const modelViewer=$('viewModelSelector'); if(modelViewer) modelViewer.addEventListener('change',()=>{ state.viewModelKey=modelViewer.value || state.recommendedKey; computeBacktest(); computeGBM(); renderModels(); renderBacktest(); renderProjection(); renderGBM(); renderReport(); }); document.querySelectorAll('[data-price-window]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-price-window]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');state.priceWindow=Number(btn.dataset.priceWindow); if(state.symbols.length) renderPriceCharts()})); document.querySelectorAll('[data-backtest-window]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-backtest-window]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');state.backtestWindow=Number(btn.dataset.backtestWindow); if(state.backtest) renderBacktest()})); $('downloadPdfBtn').addEventListener('click',downloadPDF); }
function selectMarket(market){ const cfg=MARKET_CONFIG[market]; state.market=market; state.localCurrency=cfg.localCurrency; state.currency=cfg.defaultCurrency; state.inputCapital=cfg.defaultCapital; state.capital=cfg.defaultCapital; state.bankRate=cfg.defaultRf; state.selectedTickers=[...cfg.defaultTickers]; state.benchmark=cfg.defaultBenchmark; $('tickerSearchInput').disabled=false; $('tickersInput').value=state.selectedTickers.join(', '); $('capitalInput').value=String(cfg.defaultCapital); $('currencyInput').value=cfg.defaultCurrency; $('bankRateInput').value=(cfg.defaultRf*100).toFixed(2); $('viewsInput').value=market==='US'?'NVDA:+0.03, AAPL:-0.01':'FPT:+0.03, VCB:-0.01'; $('viewConfidenceInput').value='55'; renderBenchmarkOptions(); renderRateOptions(); renderModelPolicyOptions(); syncChips(); updateSidebarLabels(); updateCurrencyNote(); setStatus(state.lang==='vi'?`Đã chọn thị trường ${cfg.label.vi}. Hãy chạy tối ưu danh mục.`:`Market selected: ${cfg.label.en}. Run the optimizer when ready.`,'ok'); fetchFxRate().catch(()=>{}); }
function updateSidebarLabels(){ if(!state.market) return; $('sidebarMarket').textContent=`${state.lang==='vi'?'Thị trường':'Market'}: ${MARKET_CONFIG[state.market].label[state.lang]}`; $('sidebarRisk').textContent=`${state.lang==='vi'?'Rủi ro':'Risk'}: ${state.riskProfileName||'--'}`; }
function renderBenchmarkOptions(){ if(!state.market) return; $('benchmarkInput').innerHTML=MARKET_CONFIG[state.market].benchmarks.map(([v,l])=>`<option value="${v}" ${state.benchmark===v?'selected':''}>${l}</option>`).join(''); }
function renderRateOptions(){ if(!state.market) return; $('ratePresetInput').innerHTML=MARKET_CONFIG[state.market].ratePresets.map(([v,l])=>`<option value="${v}">${l}</option>`).join(''); }
function renderModelPolicyOptions(){ const current=$('modelPolicyInput')?.value||'auto'; const opts=[['auto',t('modelsPolicyAuto')],['minVol',t('minVol')],['maxSharpe',t('maxSharpe')],['riskParity',t('riskParity')],['cvar',t('cvar')],['blackLitterman',t('blackLitterman')],['highReturn',t('highReturn')],['equal',t('equal')]]; $('modelPolicyInput').innerHTML=opts.map(([v,l])=>`<option value="${v}" ${v===current?'selected':''}>${l}</option>`).join(''); }
function parseTickers(value){ return unique(String(value||'').split(/[\s,;]+/).map(cleanSymbol).filter(Boolean)); }
function syncChips(){ state.selectedTickers=unique(state.selectedTickers.map(cleanSymbol)); $('tickersInput').value=state.selectedTickers.join(', '); $('tickerChips').innerHTML=state.selectedTickers.map(s=>`<span class="chip">${s}<button type="button" aria-label="remove ${s}" onclick="removeTicker('${s}')">×</button></span>`).join(''); }
window.removeTicker=(s)=>{state.selectedTickers=state.selectedTickers.filter(x=>x!==s);syncChips()};
function searchLocalTickers(q){ q=String(q||'').trim().toUpperCase(); if(!q||!state.market) return []; return MARKET_CONFIG[state.market].tickers.filter(([s])=>s.startsWith(q)).map(([symbol,name,exchange,type])=>({symbol,name,exchange,type})).slice(0,12); }
async function searchTickers(q){ const query=String(q||'').trim().toUpperCase(); if(!query||!state.market) return []; if(state.market==='US'){ try{ const d=await apiGet('/.netlify/functions/usData',{action:'search',q:query}); const rows=(d.results||[]).filter(x=>cleanSymbol(x.symbol).startsWith(query)); if(rows.length) return rows.slice(0,12); }catch(e){ console.warn(e.message); } } return searchLocalTickers(query); }
function renderSuggestions(rows){ const box=$('tickerSuggestions'); if(!rows.length){box.classList.add('hidden');return} box.innerHTML=rows.map(r=>{const s=r.symbol||r[0], n=r.name||r[1]||'', ex=r.exchange||r[2]||'', type=r.type||r[3]||''; return `<div class="suggestion-item" data-symbol="${s}"><strong>${s}</strong><small>${n} • ${ex} • ${type}</small></div>`}).join(''); box.classList.remove('hidden'); box.querySelectorAll('.suggestion-item').forEach(el=>el.addEventListener('click',()=>{const s=el.dataset.symbol;if(!state.selectedTickers.includes(s)) state.selectedTickers.push(s); syncChips(); box.classList.add('hidden'); $('tickerSearchInput').value=''})); }
function updateCurrencyNote(){ if(!state.market) return; const local=MARKET_CONFIG[state.market].localCurrency; const raw=Number($('capitalInput')?.value||state.inputCapital); const selected=$('currencyInput')?.value||local; const fx=Number($('fxRateInput')?.value||state.fxRate)||25400; state.fxRate=fx; state.currency=selected; state.inputCapital=raw; state.capital=convertCurrency(raw,selected,local,fx); const note= selected===local ? `${state.lang==='vi'?'Đồng tiền tính toán nội bộ':'Local calculation currency'}: ${local}. ${state.lang==='vi'?'Số vốn':'Capital'} ${money(raw,selected)}.` : `${state.lang==='vi'?'Quy đổi nội bộ':'Internal conversion'}: ${money(raw,selected)} ≈ ${money(state.capital,local)} (${local}) ${state.lang==='vi'?'với tỷ giá USD/VND live':'using live USD/VND'} ${fx}.`; $('currencyNote').textContent=note; }
function convertCurrency(amount,from,to,fx){ if(from===to)return amount; if(from==='USD'&&to==='VND')return amount*fx; if(from==='VND'&&to==='USD')return amount/fx; return amount; }
function setStatus(msg,type=''){ const box=$('statusBox'); box.textContent=msg; box.className=`status-box-panel ${type}`; }
async function apiGet(path, params={}){ const q=new URLSearchParams(params).toString(); const url=`${path}${q?'?'+q:''}`; try{const res=await fetch(url,{cache:'no-store'}); if(!res.ok){let tx=await res.text().catch(()=>String(res.status)); throw new Error(`HTTP ${res.status}: ${tx.slice(0,180)}`)} return await res.json();}catch(e){throw new Error(`${t('apiFail')} (${e.message})`)} }
async function fetchFxRate(){ try{const d=await apiGet('/.netlify/functions/fx',{years:10}); if(d.ok){state.fxRate=Number(d.rate)||state.fxRate; state.fxHistory=d.history||[]; $('fxRateInput').value=String(Math.round(state.fxRate)); updateCurrencyNote();}}catch(e){console.warn(e.message)} }
async function runAnalysis(){ try{ if(!state.market) throw new Error('Market is missing.'); updateCurrencyNote(); state.selectedTickers=parseTickers($('tickersInput').value); state.benchmark=$('benchmarkInput').value; state.maxWeight=Number($('maxWeightInput').value)/100; state.bankRate=Number($('bankRateInput').value)/100; if(state.selectedTickers.length<2) throw new Error(state.lang==='vi'?'Cần ít nhất 2 mã cổ phiếu để tối ưu.':'At least 2 tickers are required.'); if(state.selectedTickers.length*state.maxWeight<0.999) throw new Error(state.lang==='vi'?`Ràng buộc không khả thi: ${state.selectedTickers.length} mã × ${pct(state.maxWeight,0)} < 100%.`:`Infeasible constraint: ${state.selectedTickers.length} assets × ${pct(state.maxWeight,0)} < 100%.`); setStatus(t('loading'),''); const endpoint=state.market==='US'?'/.netlify/functions/usData':'/.netlify/functions/vnData'; await fetchFxRate(); const data=await apiGet(endpoint,{symbols:state.selectedTickers.join(','),benchmark:state.benchmark,years:10}); if(!data.ok){ const detail=data.errors?Object.entries(data.errors).map(([k,v])=>`${k}: ${String(v).slice(0,240)}`).join(' | '):''; throw new Error(data.error || detail || 'Data adapter failed.'); } state.prices=data.prices||{}; state.quotes=data.quotes||{}; state.errors=data.errors||{}; state.warnings=data.warnings||[]; const fund=await apiGet('/.netlify/functions/fundamentals',{symbols:state.selectedTickers.join(','),market:state.market}); state.fundamentals=fund.data||{}; normalizeAndCompute(); optimizeAndRender(); setStatus(`${t('complete')} ${t('noFake')}`,'ok'); }catch(e){console.error(e); setStatus(`${state.lang==='vi'?'Lỗi':'Error'}: ${e.message}`,'err'); } }

function normalizeAndCompute(){ state.symbols=state.selectedTickers.filter(s=>state.prices[s]?.length>50); if(state.symbols.length<2) throw new Error(state.lang==='vi'?'Không đủ chuỗi giá hợp lệ cho ít nhất 2 mã.':'Not enough valid price series for at least 2 assets.'); if(!state.prices[state.benchmark]||state.prices[state.benchmark].length<30) throw new Error(`${state.lang==='vi'?'Chỉ số tham chiếu không có chuỗi giá hợp lệ':'Benchmark has no valid live price series'}: ${state.benchmark}`); state.normalizedPrices={}; const local=MARKET_CONFIG[state.market].localCurrency; const base=state.currency; const needFx=local!==base; if(needFx && (!state.fxHistory||state.fxHistory.length<30)) throw new Error(state.lang==='vi'?'Cần chuỗi tỷ giá lịch sử USD/VND để quy đổi trước khi tính toán.':'Historical USD/VND FX series is required before currency-normalized calculations.'); const allKeys=[...state.symbols,state.benchmark]; for(const s of allKeys){ state.normalizedPrices[s]=convertSeriesToBase(state.prices[s],local,base,state.fxHistory); } const aligned=alignPriceSeries(allKeys,state.normalizedPrices,Number($('yearsInput').value)); if(aligned.matrix.length<60) throw new Error(state.lang==='vi'?'Dữ liệu sau khi đồng bộ ngày quá ngắn để tối ưu hóa.':'Aligned data is too short for robust optimization.'); const logR=logReturns(aligned.matrix); const assetReturns=logR.map(r=>r.slice(0,state.symbols.length)); const benchmarkReturns=logR.map(r=>r[state.symbols.length]); const cols=transpose(assetReturns); const mu=cols.map(c=>mean(c)*TRADING_DAYS); const cov=covarianceMatrix(assetReturns); const corr=correlationMatrix(cov); state.aligned={dates:aligned.dates.slice(1),priceDates:aligned.dates,matrix:aligned.matrix,returns:assetReturns,benchmarkReturns,mu,cov,corr}; if(!state.activePriceTicker || !state.symbols.includes(state.activePriceTicker)) state.activePriceTicker=state.symbols[0]; state.kpiMode='baseline'; }
function fxMap(history){ return new Map((history||[]).map(d=>[d.date,Number(d.close)]).filter(([,v])=>Number.isFinite(v)&&v>0)); }
function convertSeriesToBase(series,local,base,fxHist){ const map=fxMap(fxHist); let lastFx=null; return (series||[]).map(d=>{let price=Number(d.adjClose ?? d.close); if(!Number.isFinite(price)||price<=0)return null; if(local!==base){ let fx=map.get(d.date); if(Number.isFinite(fx)) lastFx=fx; else fx=lastFx; if(!Number.isFinite(fx)) return null; price = local==='USD'&&base==='VND' ? price*fx : local==='VND'&&base==='USD' ? price/fx : price; } return {date:d.date,close:price,rawClose:Number(d.close),adjusted:d.adjusted!==false}; }).filter(Boolean); }
function alignPriceSeries(keys,prices,years){ const maps={}; let allDates=new Set(); const lastDate=new Date(Math.max(...keys.flatMap(k=>(prices[k]||[]).map(d=>new Date(d.date).getTime())))); const cutoff=new Date(lastDate); cutoff.setFullYear(cutoff.getFullYear()-years); for(const k of keys){const rows=(prices[k]||[]).filter(d=>new Date(d.date)>=cutoff).sort((a,b)=>a.date.localeCompare(b.date)); maps[k]=new Map(rows.map(d=>[d.date,d.close])); rows.forEach(d=>allDates.add(d.date));} const dates=[...allDates].sort(); const last={}; const matrix=[]; const outDates=[]; for(const date of dates){const row=[]; let ok=true; for(const k of keys){ if(maps[k].has(date)) last[k]=maps[k].get(date); if(!Number.isFinite(last[k])){ok=false;break} row.push(last[k]); } if(ok){outDates.push(date); matrix.push(row);} } return {dates:outDates,matrix}; }
function logReturns(matrix){ const out=[]; for(let i=1;i<matrix.length;i++){const row=[];for(let j=0;j<matrix[i].length;j++)row.push(Math.log(matrix[i][j]/matrix[i-1][j])); if(row.every(Number.isFinite))out.push(row)} return out; }
function covarianceMatrix(rets){ const cols=transpose(rets), mus=cols.map(mean), n=cols.length, cov=Array.from({length:n},()=>Array(n).fill(0)); for(let i=0;i<n;i++)for(let j=0;j<n;j++){let s=0;for(let t=0;t<rets.length;t++)s+=(rets[t][i]-mus[i])*(rets[t][j]-mus[j]); cov[i][j]=(s/Math.max(1,rets.length-1))*TRADING_DAYS;} return cov; }
function correlationMatrix(cov){const n=cov.length,out=Array.from({length:n},()=>Array(n).fill(0)); for(let i=0;i<n;i++)for(let j=0;j<n;j++){const den=Math.sqrt(Math.max(0,cov[i][i])*Math.max(0,cov[j][j]));out[i][j]=den?cov[i][j]/den:0;} return out;}
function portReturn(w,mu){return dot(w,mu)} function portVar(w,cov){let v=0;for(let i=0;i<w.length;i++)for(let j=0;j<w.length;j++)v+=w[i]*w[j]*cov[i][j];return v} function portRisk(w,cov){return Math.sqrt(Math.max(0,portVar(w,cov)))} function sharpe(ret,risk){return risk>0?(ret-state.bankRate)/risk:-Infinity}
function mulberry32(seed){return function(){let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function randomWeightsRejection(n,cap,rng){ const x=Array.from({length:n},()=>rng()); const sum=x.reduce((a,b)=>a+b,0); const w=x.map(v=>v/sum); return w.every(v=>v<=cap+1e-12)?w:null; }
function computeCVaR(w,rets,alpha=.95){const pr=rets.map(r=>dot(w,r)).sort((a,b)=>a-b); const k=Math.max(1,Math.floor((1-alpha)*pr.length)); return Math.max(0,-mean(pr.slice(0,k))*Math.sqrt(TRADING_DAYS));}
function portfolioStats(w,label,muOverride=null){const mu=muOverride||state.aligned.mu,cov=state.aligned.cov,rets=state.aligned.returns; const ret=portReturn(w,mu), risk=portRisk(w,cov); return {label,key:'',weights:w,return:ret,risk,sharpe:sharpe(ret,risk),cvar:computeCVaR(w,rets),valid:w.every(x=>x>=-1e-8&&x<=state.maxWeight+1e-8)};}
function generateMPTPortfolios(){const n=state.symbols.length,rng=mulberry32(SEED),ports=[]; const add=w=>{if(w&&w.every(x=>x<=state.maxWeight+1e-9))ports.push(portfolioStats(w,'MPT sample'))}; add(Array(n).fill(1/n)); let attempts=0; while(ports.length<TARGET_MONTE_CARLO&&attempts<MC_MAX_ATTEMPTS){attempts++;add(randomWeightsRejection(n,state.maxWeight,rng));} state.portfolios=ports; state.warnings=state.warnings||[]; if(ports.length<TARGET_MONTE_CARLO) state.warnings.push(`Monte Carlo accepted ${ports.length}/${TARGET_MONTE_CARLO} samples after ${attempts} attempts because IPS constraints are tight.`); }
function extractFrontier(){const p=[...state.portfolios].filter(x=>Number.isFinite(x.risk)&&Number.isFinite(x.return)); const minR=Math.min(...p.map(x=>x.risk)), maxR=Math.max(...p.map(x=>x.risk)); const buckets=50, out=[]; for(let b=0;b<buckets;b++){const lo=minR+(maxR-minR)*b/buckets, hi=minR+(maxR-minR)*(b+1)/buckets; const candidates=p.filter(x=>x.risk>=lo&&x.risk<hi); if(candidates.length) out.push(candidates.reduce((a,c)=>c.return>a.return?c:a));} state.frontier=out.sort((a,b)=>a.risk-b.risk); }
function selectModels(){ const p=state.portfolios, n=state.symbols.length; const best=(fn)=>p.reduce((a,b)=>fn(b)>fn(a)?b:a); const min=(fn)=>p.reduce((a,b)=>fn(b)<fn(a)?b:a); const equal=portfolioStats(Array(n).fill(1/n),t('equal')); equal.key='equal'; const minVol={...min(x=>x.risk),label:t('minVol'),key:'minVol'}; const maxSharpe={...best(x=>x.sharpe),label:t('maxSharpe'),key:'maxSharpe'}; const cvar={...min(x=>x.cvar),label:t('cvar'),key:'cvar'}; const highReturn={...best(x=>x.return - 0.12*x.risk),label:t('highReturn'),key:'highReturn'}; const rp=best(x=>-riskParityObjective(x.weights)); rp.label=t('riskParity');rp.key='riskParity'; const bl=blackLittermanModel(); state.models={equal,minVol,maxSharpe,cvar,riskParity:rp,highReturn}; if(bl) state.models.blackLitterman=bl; selectRecommendedFromPolicy(); state.viewModelKey = state.recommendedKey; }
function selectRecommendedFromPolicy(){ const policy=$('modelPolicyInput')?.value||'auto'; if(policy!=='auto'&&state.models[policy]){ state.recommendedKey=policy; return; } if(state.riskProfileKey==='conservative'||state.riskProfileKey==='moderateConservative') state.recommendedKey= state.models.cvar.cvar < state.models.minVol.cvar ? 'cvar':'minVol'; else if(state.riskProfileKey==='balanced') state.recommendedKey='maxSharpe'; else if(state.riskProfileKey==='growth') state.recommendedKey='highReturn'; else state.recommendedKey=state.models.blackLitterman?'blackLitterman':'highReturn'; }
function riskParityObjective(w){const cov=state.aligned.cov, sigma=portRisk(w,cov); if(!sigma)return Infinity; const marginal=cov.map(row=>dot(row,w)); const rc=w.map((x,i)=>x*marginal[i]/sigma); const total=rc.reduce((a,b)=>a+b,0)||1; const target=1/w.length; return rc.reduce((s,x)=>s+(x/total-target)**2,0);}
function parseViews(){const raw=$('viewsInput').value||'', out=[]; raw.split(',').forEach(part=>{const [sym,val]=part.split(':').map(x=>x&&x.trim()); if(!sym||!val)return; const v=Number(val); if(state.symbols.includes(cleanSymbol(sym))&&Number.isFinite(v)&&v>=-1&&v<=1) out.push({symbol:cleanSymbol(sym),view:v});}); return out;}
function blackLittermanModel(){ const caps=state.symbols.map(s=>Number(state.quotes[s]?.marketCap ?? state.fundamentals[s]?.marketCap?.value)||0); if(!caps.some(x=>x>0))return null; const views=parseViews(); if(!views.length)return null; const total=caps.reduce((a,b)=>a+Math.max(0,b),0); const wm=caps.map(x=>Math.max(0,x)/total); const cov=state.aligned.cov,n=state.symbols.length,delta=2.5,tau=.05; const pi=cov.map(row=>delta*dot(row,wm)); const P=views.map(v=>state.symbols.map(s=>s===v.symbol?1:0)); const q=views.map(v=>v.view); const conf=Math.max(.01,Math.min(1,Number($('viewConfidenceInput').value)/100)); const omega=P.map((row,i)=>{const idx=row.findIndex(x=>x===1); return Math.max(1e-6,(1-conf)/conf*Math.abs(cov[idx][idx]||0.04));}); const muBL=blackLittermanPosterior(pi,cov,tau,P,q,omega); const best=state.portfolios.reduce((a,b)=>{const sa=sharpe(portReturn(a.weights,muBL),portRisk(a.weights,cov)); const sb=sharpe(portReturn(b.weights,muBL),portRisk(b.weights,cov)); return sb>sa?b:a;}); const s=portfolioStats(best.weights,t('blackLitterman')); s.key='blackLitterman'; s.posteriorReturn=portReturn(best.weights,muBL); return s; }
function blackLittermanPosterior(pi,cov,tau,P,q,omegaDiag){ const n=pi.length,k=P.length; const tauSigma=cov.map(r=>r.map(x=>x*tau)); const invTau=matInv(tauSigma); const PT=transpose(P); const invOmega=Array.from({length:k},(_,i)=>Array.from({length:k},(_,j)=>i===j?1/omegaDiag[i]:0)); const left=matAdd(invTau, matMul(matMul(PT,invOmega),P)); const right=vecAdd(matVec(invTau,pi), matVec(matMul(PT,invOmega),q)); return matVec(matInv(left),right); }
function matAdd(A,B){return A.map((r,i)=>r.map((x,j)=>x+B[i][j]));} function vecAdd(a,b){return a.map((x,i)=>x+b[i]);} function matMul(A,B){return A.map(r=>B[0].map((_,j)=>r.reduce((s,x,i)=>s+x*B[i][j],0)));} function matVec(A,v){return A.map(r=>dot(r,v));}
function matInv(A){ const n=A.length, M=A.map((r,i)=>[...r.map((x,j)=>x+(i===j?1e-8:0)),...Array.from({length:n},(_,j)=>i===j?1:0)]); for(let i=0;i<n;i++){let pivot=i;for(let r=i+1;r<n;r++)if(Math.abs(M[r][i])>Math.abs(M[pivot][i]))pivot=r; [M[i],M[pivot]]=[M[pivot],M[i]]; let div=M[i][i]||1e-12; for(let j=0;j<2*n;j++)M[i][j]/=div; for(let r=0;r<n;r++)if(r!==i){let f=M[r][i];for(let j=0;j<2*n;j++)M[r][j]-=f*M[i][j];}} return M.map(r=>r.slice(n)); }
function optimizeAndRender(){ generateMPTPortfolios(); extractFrontier(); selectModels(); computeBacktest(); computeGBM(); state.kpiMode='optimized'; renderAll(); }
function renderAll(){ renderModelPolicyOptions(); updateSidebarLabels(); renderKPIs(); renderPriceCharts(); renderAssetStats(); renderIntegrity(); renderPipelineTables(); renderMonteCarlo(); renderFrontier(); renderModels(); renderBacktest(); renderProjection(); renderGBM(); renderReport(); resizePlots(); }
function getActiveModel(){ return state.models[state.viewModelKey] || state.models[state.recommendedKey]; }
function renderKPIs(){ const m=state.kpiMode==='baseline'&&state.models.equal?state.models.equal:state.models[state.recommendedKey]; if(!m)return; $('kpiCount').textContent=String(state.symbols.length); $('kpiReturn').textContent=pct(m.return); $('kpiVol').textContent=pct(m.risk); $('kpiSharpe').textContent=num(m.sharpe,2); const label=$('kpiModeLabel'); if(label) label.textContent=state.kpiMode==='baseline'?t('kpiBaseline'):t('kpiOptimized')+` — ${m.label}`; }
function renderIntegrity(){ const h=t('headers'); const rows=state.symbols.map(s=>{const f=state.fundamentals[s]||{}, q=state.quotes[s]||{}; const badgeLabel=(f.quality||'Data Not Available'); const badge = badgeLabel==='Partial Data' ? `<span class="badge ok">Partial</span>` : `<span class="badge warn">Data not available</span>`; const displayPrice = Number.isFinite(q.price) ? q.price : (f.price && Number.isFinite(f.price.value) ? f.price.value : null); return [s,Number.isFinite(displayPrice)?money(displayPrice,MARKET_CONFIG[state.market].localCurrency):'N/A',f.altmanZ?.value??'N/A',f.beneishM?.value??'N/A',Number.isFinite(f.fcf?.value)?pct(f.fcf.value):'N/A',Number.isFinite(f.leverage?.value)?pct(f.leverage.value):'N/A',badge,(f.altmanZ?.source||'Open data') + ((state.lang==='vi')?' — Xin lỗi vì sự bất tiện.':' — Sorry for the inconvenience.')];}); $('integrityTable').innerHTML=htmlTable([h.asset,h.price,h.altman,h.beneish,h.fcf,h.leverage,h.quality,h.source||'Source'],rows); }
function filterYears(series, years){ if(!Array.isArray(series)||!series.length)return []; const last=new Date(series[series.length-1].date); const cutoff=new Date(last); cutoff.setFullYear(cutoff.getFullYear()-Number(years||1)); return series.filter(d=>new Date(d.date)>=cutoff && Number.isFinite(Number(d.close))); }
function renderPriceCharts(){ const selector=$('priceTickerSelector'); if(selector){ selector.innerHTML=state.symbols.map(s=>`<option value="${s}" ${s===state.activePriceTicker?'selected':''}>${s}</option>`).join(''); } const root=$('individualCharts'); if(!root)return; root.innerHTML=''; const s=state.activePriceTicker||state.symbols[0]; if(!s)return; const rows=filterYears(state.normalizedPrices?.[s],state.priceWindow); const div=document.createElement('div'); div.className='chart-card single-chart-card'; if(rows.length<2){ div.innerHTML=`<h3>${s}</h3><div class="note-box warning">${state.lang==='vi'?'Không đủ dữ liệu giá lịch sử để vẽ biểu đồ.':'Not enough historical price data to render this chart.'}</div>`; root.appendChild(div); return; } div.innerHTML=`<h3>${s}</h3><div id="chart_${s}" class="plot large"></div>`; root.appendChild(div); Plotly.newPlot(`chart_${s}`,[{x:rows.map(d=>d.date),y:rows.map(d=>d.close),type:'scatter',mode:'lines',name:s,line:{width:3,color:'#5BEBE8'},hovertemplate:`%{x}<br>${s}: %{y:,.2f}<extra></extra>`}],{...plotLayout(''),margin:{l:62,r:20,t:12,b:42},yaxis:{...plotLayout().yaxis,tickformat:',.2f'}},plotConfig); }
function renderAssetStats(){ if(!state.aligned)return; const h=t('headers'); const bm=state.aligned.benchmarkReturns; const bmAnn=mean(bm)*TRADING_DAYS; const bmVar=variance(bm); const rows=state.symbols.map((s,i)=>{ const r=state.aligned.returns.map(row=>row[i]); const ret=mean(r)*TRADING_DAYS; const vol=Math.sqrt(variance(r)*TRADING_DAYS); const sr=vol>0?(ret-state.bankRate)/vol:NaN; const beta=bmVar?covXY(r,bm)/bmVar:NaN; const alpha=ret-(state.bankRate+beta*(bmAnn-state.bankRate)); return [s,pct(ret),pct(vol),num(sr,2),num(beta,2),pct(alpha)]; }); const table=$('assetStatsTable'); if(table) table.innerHTML=htmlTable([h.asset,h.ret,h.risk,h.sharpe,h.beta||'Beta',h.alpha||'Jensen Alpha'],rows); }
function renderPipelineTables(){const h=t('headers'), mu=state.aligned.mu,cov=state.aligned.cov; $('expectedReturnTable').innerHTML=htmlTable([h.asset,h.ret,t('kpi.vol')],state.symbols.map((s,i)=>[s,pct(mu[i]),pct(Math.sqrt(cov[i][i]))])); $('covarianceTable').innerHTML=htmlTable([''].concat(state.symbols),state.symbols.map((s,i)=>[s].concat(state.symbols.map((_,j)=>num(cov[i][j],5)))));}
function renderMonteCarlo(){const p=state.portfolios; Plotly.newPlot('monteCarloChart',[{x:p.map(x=>x.risk),y:p.map(x=>x.return),type:'scattergl',mode:'markers',name:'MPT portfolios',marker:{size:4,opacity:.45,color:p.map(x=>x.sharpe),colorscale:'Viridis',colorbar:{title:'Sharpe'}},hovertemplate:'Risk: %{x:.2%}<br>Return: %{y:.2%}<extra></extra>'}],{...plotLayout('Monte Carlo Portfolios'),xaxis:{...plotLayout().xaxis,title:'Annualized Risk',tickformat:'.1%'},yaxis:{...plotLayout().yaxis,title:'Expected Return',tickformat:'.1%'}},plotConfig)}
function renderFrontier(){const traces=[{x:state.portfolios.map(x=>x.risk),y:state.portfolios.map(x=>x.return),type:'scattergl',mode:'markers',name:'Simulated portfolios',marker:{size:3,opacity:.13,color:'#A9EEEB'},hoverinfo:'skip'},{x:state.frontier.map(x=>x.risk),y:state.frontier.map(x=>x.return),type:'scatter',mode:'lines',name:'Efficient Frontier',line:{width:4,color:'#F6D473'},hovertemplate:'Risk: %{x:.2%}<br>Return: %{y:.2%}<extra></extra>'}]; Object.entries(state.models).forEach(([k,m])=>traces.push({x:[m.risk],y:[m.return],type:'scatter',mode:'markers',name:k===state.recommendedKey?'★ '+m.label:m.label,marker:{size:k===state.recommendedKey?15:10,line:{width:1,color:'#E9F2EE'}},hovertemplate:`${m.label}<br>Risk: %{x:.2%}<br>Return: %{y:.2%}<br>${state.symbols.map((s,i)=>`${s}: ${pct(m.weights[i],1)}`).join('<br>')}<extra></extra>`})); Plotly.newPlot('frontierChart',traces,{...plotLayout('Markowitz Efficient Frontier'),margin:{l:62,r:24,t:46,b:80},legend:{orientation:'h',y:-.18,x:0},xaxis:{...plotLayout().xaxis,title:'Annualized Volatility',tickformat:'.1%'},yaxis:{...plotLayout().yaxis,title:'Expected Return',tickformat:'.1%'}},plotConfig); const vals=[]; const c=state.aligned.corr; for(let i=0;i<c.length;i++)for(let j=i+1;j<c.length;j++)vals.push(c[i][j]); const avg=vals.length?mean(vals):0; $('frontierExplanation').textContent=state.lang==='vi'?`Đường biên có thể cong ít nếu số mã ít, tương quan cao hoặc ràng buộc tỷ trọng quá chặt. Tương quan trung bình hiện tại: ${num(avg,2)}.`:`The frontier may look less curved when assets are few, highly correlated, or tightly constrained. Current average pairwise correlation: ${num(avg,2)}.`; }
function renderModels(){ state.kpiMode='optimized'; const h=t('headers'); const rows=Object.entries(state.models).map(([k,m])=>[k===state.recommendedKey?`★ ${m.label}`:m.label,pct(m.return),pct(m.risk),num(m.sharpe,2),pct(m.cvar),state.symbols.map((s,i)=>`${s}: ${pct(m.weights[i],1)}`).join(' • '),m.valid?`<span class="badge ok">OK</span>`:`<span class="badge danger">Fail</span>`]); $('modelComparisonTable').innerHTML=htmlTable([h.model,h.ret,h.risk,h.sharpe,h.cvar,h.weights,h.constraint],rows); const rec=state.models[state.recommendedKey]; const active=getActiveModel()||rec; const policy=$('modelPolicyInput').value; const viewSelector=$('viewModelSelector'); if(viewSelector){ viewSelector.innerHTML=Object.entries(state.models).map(([k,m])=>`<option value="${k}" ${k===active.key?'selected':''}>${m.label}</option>`).join(''); } const label=$('viewModelLabel'); if(label) label.textContent=state.lang==='vi'?'Xem mô hình':'View model'; $('recommendationBox').innerHTML=state.lang==='vi'?`<strong>Mô hình khuyến nghị:</strong> ${rec.label}. Bạn vẫn có thể xem các mô hình khác ở menu “Xem mô hình”.<br><strong>Mô hình đang xem:</strong> ${active.label}.`:`<strong>Recommended model:</strong> ${rec.label}. You can still inspect other models from the “View model” menu.<br><strong>Currently viewed model:</strong> ${active.label}.`; const capMin=1-(state.symbols.length-1)*state.maxWeight; const wbox=$('constraintWarning'); if(capMin>0.20){wbox.classList.remove('hidden'); wbox.textContent=state.lang==='vi'?`Cảnh báo ràng buộc: Với ${state.symbols.length} mã và trần ${pct(state.maxWeight,0)}, mỗi mã gần như bị ép tối thiểu khoảng ${pct(capMin,1)}. Vì vậy tỷ trọng có thể trông giống nhau. Hãy thêm nhiều mã hoặc tăng trần tỷ trọng nếu muốn phân bổ linh hoạt hơn.`:`Constraint warning: With ${state.symbols.length} assets and a ${pct(state.maxWeight,0)} cap, each asset is forced to at least about ${pct(capMin,1)}. Weights may look similar. Add more assets or loosen the cap for more freedom.`;}else wbox.classList.add('hidden'); Plotly.newPlot('weightsChart',[{labels:state.symbols,values:active.weights,type:'pie',hole:.45,marker:{colors:['#59f1f3','#ffd86b','#b78cff','#59d8ff','#ff7fa2','#7cf8ff']},hovertemplate:'%{label}: %{percent}<extra></extra>'}],{...plotLayout(''),margin:{l:10,r:10,t:20,b:20}},plotConfig); const rc=riskContributions(active.weights,state.aligned.cov); Plotly.newPlot('riskContributionChart',[{x:state.symbols,y:rc,type:'bar',marker:{color:'#59f1f3'},hovertemplate:'%{x}: %{y:.2%}<extra></extra>'}],{...plotLayout(''),yaxis:{...plotLayout().yaxis,tickformat:'.0%'}},plotConfig); }
function riskContributions(w,cov){const sigma=portRisk(w,cov), marginal=cov.map(row=>dot(row,w)); const rc=w.map((x,i)=>sigma?x*marginal[i]/sigma:0); const tot=rc.reduce((a,b)=>a+b,0)||1; return rc.map(x=>x/tot);}
function computeBacktest(){ const rec=getActiveModel(); const weights0=[...rec.weights]; const rets=state.aligned.returns, bm=state.aligned.benchmarkReturns, dates=state.aligned.dates; let value=state.capital, eqValue=state.capital, bmValue=state.capital, w=[...weights0]; const curve=[], eqCurve=[], bmCurve=[], portDaily=[]; let currentMonth=null; for(let t=0;t<rets.length;t++){const month=dates[t].slice(0,7); if(month!==currentMonth){w=[...weights0]; currentMonth=month;} const simple=rets[t].map(x=>Math.exp(x)-1); const pSimple=dot(w,simple); value*=1+pSimple; eqValue*=1+mean(simple); bmValue*=Math.exp(bm[t]); portDaily.push(Math.log(1+pSimple)); curve.push({date:dates[t],value}); eqCurve.push({date:dates[t],value:eqValue}); bmCurve.push({date:dates[t],value:bmValue}); const gross=simple.map(x=>1+x); const denom=1+pSimple; w=w.map((wi,i)=>wi*gross[i]/denom); } state.backtest={curve,eqCurve,bmCurve,portDaily,benchmarkDaily:bm,metrics:{portfolio:perfMetrics(curve,portDaily,bm),equal:perfMetrics(eqCurve,null,bm),benchmark:perfMetrics(bmCurve,bm,bm)}}; }
function perfMetrics(curve,daily,bmDaily){const vals=curve.map(d=>d.value); const total=vals.at(-1)/vals[0]-1; const years=curve.length/TRADING_DAYS; const ann=Math.pow(1+total,1/Math.max(years,1e-6))-1; const mdd=maxDrawdown(vals); let beta=NaN, alpha=NaN; if(daily&&bmDaily){const rfDaily=Math.log(1+state.bankRate)/TRADING_DAYS; const x=bmDaily.map(v=>v-rfDaily), y=daily.map(v=>v-rfDaily); beta=covXY(x,y)/variance(x); alpha=(mean(y)-beta*mean(x))*TRADING_DAYS;} return{ending:vals.at(-1),total,ann,mdd,beta,alpha};}
function variance(a){const m=mean(a);return a.reduce((s,x)=>s+(x-m)**2,0)/Math.max(1,a.length-1)} function covXY(a,b){const ma=mean(a),mb=mean(b);return a.reduce((s,x,i)=>s+(x-ma)*(b[i]-mb),0)/Math.max(1,a.length-1)} function maxDrawdown(vals){let peak=vals[0],mdd=0;for(const v of vals){peak=Math.max(peak,v);mdd=Math.min(mdd,v/peak-1)}return mdd}
function renderBacktest(){ const m=state.backtest;if(!m)return; const fw=(rows)=>rows.filter(r=>new Date(r.date)>=cutoffYears(state.backtestWindow)); const c=fw(m.curve),e=fw(m.eqCurve),b=fw(m.bmCurve); Plotly.newPlot('backtestChart',[{x:c.map(d=>d.date),y:c.map(d=>d.value),type:'scatter',mode:'lines',name:getActiveModel().label,line:{width:3,color:'#5BEBE8'}},{x:e.map(d=>d.date),y:e.map(d=>d.value),type:'scatter',mode:'lines',name:t('equal'),line:{width:2,color:'#F6D473'}},{x:b.map(d=>d.date),y:b.map(d=>d.value),type:'scatter',mode:'lines',name:state.benchmark,line:{width:2,color:'#BEB2EE',dash:'dot'}}],{...plotLayout('Backtest'),yaxis:{...plotLayout().yaxis,tickformat:',.0f'}},plotConfig); const h=t('headers'); $('backtestTable').innerHTML=htmlTable([h.metric,'Ending Value','Total Return','Annualized Return','Max Drawdown','Beta','Jensen Alpha'],[['Portfolio',money(m.metrics.portfolio.ending),pct(m.metrics.portfolio.total),pct(m.metrics.portfolio.ann),pct(m.metrics.portfolio.mdd),num(m.metrics.portfolio.beta,2),pct(m.metrics.portfolio.alpha)],['Equal Weight',money(m.metrics.equal.ending),pct(m.metrics.equal.total),pct(m.metrics.equal.ann),pct(m.metrics.equal.mdd),'--','--'],[state.benchmark,money(m.metrics.benchmark.ending),pct(m.metrics.benchmark.total),pct(m.metrics.benchmark.ann),pct(m.metrics.benchmark.mdd),'1.00','0.00%']]); }
function cutoffYears(years){const last=new Date(state.aligned.dates.at(-1));const c=new Date(last);c.setFullYear(c.getFullYear()-years);return c;}
function renderProjection(){ const rec=getActiveModel(),years=[1,2,3],stock=years.map(y=>state.capital*Math.pow(1+rec.return,y)),bank=years.map(y=>state.capital*Math.pow(1+state.bankRate,y)); Plotly.newPlot('projectionChart',[{x:years.map(y=>`Year ${y}`),y:stock,type:'bar',name:t('headers').stock,marker:{color:'#5BEBE8'}},{x:years.map(y=>`Year ${y}`),y:bank,type:'bar',name:t('headers').bank,marker:{color:'#F6D473'}}],{...plotLayout(''),barmode:'group',yaxis:{...plotLayout().yaxis,tickformat:',.0f'}},plotConfig); const h=t('headers'); $('projectionTable').innerHTML=htmlTable([h.year,h.stock,h.bank,h.diff],years.map((y,i)=>[`Year ${y}`,money(stock[i]),money(bank[i]),money(stock[i]-bank[i])])); }
function cholesky(A){const n=A.length,L=Array.from({length:n},()=>Array(n).fill(0)); for(let i=0;i<n;i++)for(let j=0;j<=i;j++){let sum=0;for(let k=0;k<j;k++)sum+=L[i][k]*L[j][k]; if(i===j)L[i][j]=Math.sqrt(Math.max(A[i][i]-sum,1e-10)); else L[i][j]=(A[i][j]-sum)/(L[j][j]||1e-10);}return L;}
function randn(rng){let u=0,v=0;while(u===0)u=rng();while(v===0)v=rng();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
function computeGBM(){ const rec=getActiveModel(), n=state.symbols.length, mu=state.aligned.mu, vol=state.aligned.cov.map((r,i)=>Math.sqrt(Math.max(r[i],0))), L=cholesky(state.aligned.corr), rng=mulberry32(SEED+99), sims=600, days=TRADING_DAYS*3, paths=[]; for(let s=0;s<sims;s++){let prices=Array(n).fill(1), value=state.capital, path=[value]; for(let d=1;d<=days;d++){const raw=Array.from({length:n},()=>randn(rng)); const z=L.map(row=>dot(row,raw)); let ret=0; for(let i=0;i<n;i++){const drift=(mu[i]-0.5*vol[i]*vol[i])/TRADING_DAYS, shock=vol[i]*z[i]/Math.sqrt(TRADING_DAYS); prices[i]*=Math.exp(drift+shock); ret+=rec.weights[i]*(Math.exp(drift+shock)-1);} value*=1+ret; if(d%21===0) path.push(value); } paths.push(path); } const len=paths[0].length; const pcts=[]; for(let i=0;i<len;i++){const col=paths.map(p=>p[i]).sort((a,b)=>a-b); pcts.push({x:i/12,p5:col[Math.floor(.05*sims)],p50:col[Math.floor(.5*sims)],p95:col[Math.floor(.95*sims)]});} state.gbm=pcts; }
function renderGBM(){ const g=state.gbm;if(!g)return; Plotly.newPlot('gbmChart',[{x:g.map(d=>d.x),y:g.map(d=>d.p95),type:'scatter',mode:'lines',name:'95th percentile',line:{width:1,color:'#A9EEEB'}},{x:g.map(d=>d.x),y:g.map(d=>d.p50),type:'scatter',mode:'lines',name:'Median',line:{width:3,color:'#5BEBE8'}},{x:g.map(d=>d.x),y:g.map(d=>d.p5),type:'scatter',mode:'lines',name:'5th percentile',line:{width:1,color:'#FF6B6B'}}],{...plotLayout(''),xaxis:{...plotLayout().xaxis,title:'Years'},yaxis:{...plotLayout().yaxis,tickformat:',.0f'}},plotConfig); $('gbmNote').textContent=state.lang==='vi'?'Biểu đồ này cho bạn thấy một dải kết quả có thể xảy ra cho giá trị danh mục trong 3 năm tới. Veera dùng mô phỏng Monte Carlo theo phương pháp Geometric Brownian Motion có gắn tương quan lịch sử giữa các mã, nên các cú sốc không bị random riêng lẻ từng cổ phiếu. Hiểu đơn giản: đây là quạt kịch bản để bạn thấy vùng tốt – trung bình – xấu của danh mục, chứ không phải một con số chắc chắn.':'This fan chart shows a range of possible portfolio values over the next 3 years. Veera uses a correlated Geometric Brownian Motion Monte Carlo method, so simulated shocks preserve historical co-movement across assets rather than randomizing each asset independently. In simple terms, this is a scenario range for best / median / weak outcomes, not a guaranteed forecast.'; }
function renderReport(){ const rec=getActiveModel(); if(!rec)return; const lines=state.lang==='vi'?[`BÁO CÁO VEERA PORTFOLIO OPTIMIZER`,`Thị trường: ${MARKET_CONFIG[state.market].label.vi}`,`Ngôn ngữ: Tiếng Việt`,`Hồ sơ rủi ro: ${state.riskProfileName} (${Math.round(state.riskScore)}/100)`,`Mã phân tích: ${state.symbols.join(', ')}`,`Chỉ số tham chiếu: ${state.benchmark}`,`Mô hình khuyến nghị: ${rec.label}`,`Lợi suất kỳ vọng: ${pct(rec.return)}`,`Độ biến động: ${pct(rec.risk)}`,`Tỷ lệ Sharpe: ${num(rec.sharpe,2)}`,`Tỷ trọng: ${state.symbols.map((s,i)=>`${s} ${pct(rec.weights[i],1)}`).join(', ')}`,`Backtest max drawdown: ${pct(state.backtest?.metrics?.portfolio?.mdd)}`,`Cảnh báo: Lợi suất kỳ vọng dựa trên dữ liệu lịch sử, không phải cam kết tương lai. Altman/Beneish chỉ hiển thị khi có dữ liệu báo cáo tài chính thật.`]:[`VEERA PORTFOLIO OPTIMIZER REPORT`,`Market: ${MARKET_CONFIG[state.market].label.en}`,`Language: English`,`Risk Profile: ${state.riskProfileName} (${Math.round(state.riskScore)}/100)`,`Tickers: ${state.symbols.join(', ')}`,`Benchmark: ${state.benchmark}`,`Recommended model: ${rec.label}`,`Expected return: ${pct(rec.return)}`,`Volatility: ${pct(rec.risk)}`,`Sharpe Ratio: ${num(rec.sharpe,2)}`,`Weights: ${state.symbols.map((s,i)=>`${s} ${pct(rec.weights[i],1)}`).join(', ')}`,`Backtest max drawdown: ${pct(state.backtest?.metrics?.portfolio?.mdd)}`,`Disclaimer: Expected return is historical, not promised. Altman/Beneish are shown only when real standardized financial statements are available.`]; $('finalReport').textContent=lines.join('\n'); }
async function downloadPDF(){ const {jsPDF}=window.jspdf||{}; if(!jsPDF||!window.html2canvas) return; const doc=new jsPDF({unit:'pt',format:'a4'}); const rec=getActiveModel(); const wrapper=document.createElement('div'); wrapper.style.position='fixed'; wrapper.style.left='-99999px'; wrapper.style.top='0'; wrapper.style.width='794px'; wrapper.style.background='linear-gradient(180deg,#081633 0%,#163467 100%)'; wrapper.style.color='#ffffff'; wrapper.style.fontFamily='Inter, Arial, sans-serif'; wrapper.style.padding='0'; wrapper.innerHTML=`
    <section style="width:794px; min-height:1123px; padding:44px 44px 36px; box-sizing:border-box; background:linear-gradient(180deg,#081633 0%,#183a7c 100%);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;">
        <div>
          <div style="font-size:14px;letter-spacing:0.18em;color:#59f1f3;font-weight:800;text-transform:uppercase;">Veera Portfolio Optimizer</div>
          <h1 style="font-size:34px;line-height:1.1;margin:10px 0 12px;">${state.lang==='vi'?'Báo cáo tối ưu danh mục':'Portfolio Optimization Report'}</h1>
          <p style="margin:0;color:#d9f5ff;line-height:1.6;">${state.lang==='vi'?'Tổng hợp dữ liệu thật, mô hình tối ưu, kiểm định lịch sử và dải kịch bản tương lai.':'Summary of live data, optimizer models, historical backtest, and future scenario ranges.'}</p>
        </div>
        <div style="padding:10px 14px;border-radius:999px;background:rgba(89,241,243,.12);border:1px solid rgba(89,241,243,.45);font-weight:800;color:#d8ffff;">${state.lang==='vi'?'Mô hình đang xem':'Viewing'}: ${rec.label}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:26px;">
        <div style="border:1px solid rgba(124,248,255,.24);border-radius:18px;padding:18px;background:rgba(7,18,43,.22);">
          <h2 style="margin:0 0 10px;font-size:20px;">${state.lang==='vi'?'Tóm tắt đầu vào':'Input Summary'}</h2>
          <ul style="margin:0;padding-left:18px;line-height:1.75;color:#fff;">
            <li>${state.lang==='vi'?'Thị trường':'Market'}: ${MARKET_CONFIG[state.market].label[state.lang]}</li>
            <li>${state.lang==='vi'?'Hồ sơ rủi ro':'Risk profile'}: ${state.riskProfileName} (${Math.round(state.riskScore)}/100)</li>
            <li>${state.lang==='vi'?'Danh sách mã':'Tickers'}: ${state.symbols.join(', ')}</li>
            <li>${state.lang==='vi'?'Benchmark':'Benchmark'}: ${state.benchmark}</li>
            <li>${state.lang==='vi'?'Tỷ giá USD/VND live':'Live USD/VND FX'}: ${num(state.fxRate,0)}</li>
            <li>${state.lang==='vi'?'Lãi suất phi rủi ro':'Risk-free / bank rate'}: ${pct(state.bankRate)}</li>
          </ul>
        </div>
        <div style="border:1px solid rgba(124,248,255,.24);border-radius:18px;padding:18px;background:rgba(7,18,43,.22);">
          <h2 style="margin:0 0 10px;font-size:20px;">${state.lang==='vi'?'Tóm tắt đầu ra':'Output Summary'}</h2>
          <ul style="margin:0;padding-left:18px;line-height:1.75;color:#fff;">
            <li>${state.lang==='vi'?'Mô hình khuyến nghị':'Recommended model'}: ${state.models[state.recommendedKey]?.label || '--'}</li>
            <li>${state.lang==='vi'?'Mô hình đang xem':'Viewing model'}: ${rec.label}</li>
            <li>${state.lang==='vi'?'Lợi suất kỳ vọng':'Expected return'}: ${pct(rec.return)}</li>
            <li>${state.lang==='vi'?'Độ biến động':'Volatility'}: ${pct(rec.risk)}</li>
            <li>Sharpe: ${num(rec.sharpe,2)}</li>
            <li>CVaR: ${pct(rec.cvar)}</li>
          </ul>
        </div>
      </div>
      <div style="margin-top:22px;border:1px solid rgba(124,248,255,.24);border-radius:18px;padding:18px;background:rgba(7,18,43,.22);">
        <h2 style="margin:0 0 12px;font-size:20px;">${state.lang==='vi'?'Tỷ trọng danh mục':'Portfolio Weights'}</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${state.symbols.map((s,i)=>`<div style="display:flex;justify-content:space-between;padding:10px 12px;border-radius:12px;background:rgba(89,241,243,.08)"><strong>${s}</strong><span>${pct(rec.weights[i],1)}</span></div>`).join('')}</div>
      </div>
      <div style="margin-top:22px;border:1px solid rgba(255,216,107,.35);border-radius:18px;padding:18px;background:rgba(255,216,107,.08);color:#fff7d8;line-height:1.65;">
        <strong>${state.lang==='vi'?'Lưu ý quan trọng':'Important disclaimer'}:</strong> ${state.lang==='vi'?'Lợi suất kỳ vọng và dải mô phỏng chỉ dựa trên dữ liệu lịch sử và giả định mô hình. Đây không phải cam kết lợi nhuận tương lai. Các chỉ số Altman Z và Beneish M sẽ để N/A nếu nguồn mở không đủ dữ liệu chuẩn hóa.':'Expected return and scenario ranges are based on historical data and model assumptions. They are not guaranteed future results. Altman Z and Beneish M remain N/A whenever open data is insufficient for standardized calculation.'}
      </div>
    </section>
    <section style="width:794px; min-height:1123px; padding:34px 34px 28px; box-sizing:border-box; background:linear-gradient(180deg,#081633 0%,#183a7c 100%);">
      <h2 style="margin:0 0 16px;font-size:26px;color:#fff;">${state.lang==='vi'?'Biểu đồ phân tích':'Analysis Charts'}</h2>
      <div style="display:grid;gap:16px;">
        <div id="pdfCard1" style="padding:12px;border-radius:18px;background:rgba(7,18,43,.24);border:1px solid rgba(124,248,255,.24);"></div>
        <div id="pdfCard2" style="padding:12px;border-radius:18px;background:rgba(7,18,43,.24);border:1px solid rgba(124,248,255,.24);"></div>
        <div id="pdfCard3" style="padding:12px;border-radius:18px;background:rgba(7,18,43,.24);border:1px solid rgba(124,248,255,.24);"></div>
        <div id="pdfCard4" style="padding:12px;border-radius:18px;background:rgba(7,18,43,.24);border:1px solid rgba(124,248,255,.24);"></div>
      </div>
    </section>`;
  document.body.appendChild(wrapper);
  const cards=[['weightsChart','pdfCard1', state.lang==='vi'?'Tỷ trọng mô hình đang xem':'Viewed Model Weights'],['frontierChart','pdfCard2', state.lang==='vi'?'Biên hiệu quả Markowitz':'Markowitz Efficient Frontier'],['backtestChart','pdfCard3', state.lang==='vi'?'Backtest lịch sử':'Historical Backtest'],['projectionChart','pdfCard4', state.lang==='vi'?'Dự phóng tăng trưởng':'Compound Projection']];
  for(const [chartId, cardId, title] of cards){ const card=wrapper.querySelector('#'+cardId); const chart=$(chartId); card.innerHTML=`<h3 style="margin:0 0 10px;font-size:18px;color:#fff;">${title}</h3>`; if(chart && window.Plotly){ try{ const img=await Plotly.toImage(chart,{format:'png',width:900,height:500,scale:1}); const image=document.createElement('img'); image.src=img; image.style.width='100%'; image.style.display='block'; image.style.borderRadius='12px'; card.appendChild(image); }catch(e){ card.innerHTML += `<p style="color:#d9f5ff;">${state.lang==='vi'?'Không thể trích xuất biểu đồ này.':'Could not export this chart.'}</p>`; } } }
  const sections=[...wrapper.querySelectorAll('section')];
  let first=true;
  for(const sec of sections){ const canvas=await window.html2canvas(sec,{scale:2,useCORS:true,backgroundColor:null}); const img=canvas.toDataURL('image/png'); const pageWidth=595, pageHeight=842; const ratio=Math.min(pageWidth/canvas.width, pageHeight/canvas.height); const w=canvas.width*ratio, h=canvas.height*ratio; if(!first) doc.addPage(); first=false; doc.addImage(img,'PNG',(pageWidth-w)/2,(pageHeight-h)/2,w,h); }
  wrapper.remove();
  doc.save('Veera_Portfolio_Optimizer_Report.pdf');
}
function resizePlots(){ document.querySelectorAll('.js-plotly-plot').forEach(el=>Plotly.Plots.resize(el)); }
function initRevealObserver(){ const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.1}); document.querySelectorAll('.reveal').forEach(el=>obs.observe(el)); }
function debounce(fn,wait){let timer;return(...args)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...args),wait)}}

let activeTipEl=null;
function showFloatingTip(el){ const text=el?.dataset?.tip; if(!text)return; activeTipEl=el; hideFloatingTip(); const tip=document.createElement('div'); tip.className='veera-floating-tip'; tip.id='veeraFloatingTip'; tip.textContent=text; document.body.appendChild(tip); const r=el.getBoundingClientRect(); const tr=tip.getBoundingClientRect(); let left=r.left + r.width/2 - tr.width/2; left=Math.max(14,Math.min(left,window.innerWidth-tr.width-14)); let top=r.bottom+10; if(top+tr.height>window.innerHeight-14) top=r.top-tr.height-10; top=Math.max(14,Math.min(top,window.innerHeight-tr.height-14)); tip.style.left=left+'px'; tip.style.top=top+'px'; }
function hideFloatingTip(){ const old=document.getElementById('veeraFloatingTip'); if(old) old.remove(); }
function initTooltipOverlay(){ if(window.__veeraTooltipBound)return; window.__veeraTooltipBound=true; let current=null; const open=(el)=>{ if(!el) return; current=el; showFloatingTip(el); }; const close=(el)=>{ if(!el || el===current){ current=null; hideFloatingTip(); } }; document.addEventListener('pointerenter',e=>{ const el=e.target.closest?.('.tip'); if(el) open(el); }, true); document.addEventListener('pointerleave',e=>{ const el=e.target.closest?.('.tip'); if(el) close(el); }, true); document.addEventListener('focusin',e=>{ const el=e.target.closest?.('.tip'); if(el) open(el); }); document.addEventListener('focusout',e=>{ const el=e.target.closest?.('.tip'); if(el) close(el); }); document.addEventListener('click',e=>{ const el=e.target.closest?.('.tip'); if(el){ open(el); } else { close(current); } }); window.addEventListener('scroll',()=>{ close(current); },{passive:true}); window.addEventListener('resize',()=>close(current)); }

/* === v4.1 hardening overrides === */
function setProgress(percent,label=''){
  const wrap=$('progressWrap'), bar=$('progressBar'), pc=$('progressPercent'), txt=$('progressLabel');
  if(!wrap||!bar||!pc||!txt) return;
  wrap.classList.remove('hidden');
  const p=Math.max(0,Math.min(100,Number(percent)||0));
  bar.style.width=`${p}%`;
  pc.textContent=`${Math.round(p)}%`;
  txt.textContent=label;
}
function clearProgress(){
  const wrap=$('progressWrap'), bar=$('progressBar'), pc=$('progressPercent'), txt=$('progressLabel');
  if(!wrap||!bar||!pc||!txt) return;
  wrap.classList.add('hidden');
  bar.style.width='0%';
  pc.textContent='0%';
  txt.textContent=state.lang==='vi'?'Đang chuẩn bị...':'Preparing...';
}
function updateBlackLittermanInputNote(){
  const el=$('blInputNote');
  if(!el) return;
  el.textContent=state.lang==='vi'
    ? 'Black-Litterman kết hợp lợi suất cân bằng ngầm định từ danh mục thị trường với quan điểm chủ quan của nhà đầu tư. Chỉ nhập khi bạn thực sự có niềm tin định hướng; nếu để trống, mô hình này sẽ bị bỏ qua một cách minh bạch.'
    : 'Black-Litterman blends market-implied equilibrium returns with your subjective views. Only enter views when you have a real directional conviction; if left blank, the model is skipped transparently.';
}
function modelMethodCopy(key){
  const vi={
    equal:'Chia đều: mỗi mã có tỷ trọng bằng nhau. Dùng làm đường cơ sở để so sánh.',
    minVol:'Minimum Volatility: tìm danh mục có độ biến động năm hóa thấp nhất trong các ràng buộc.',
    maxSharpe:'Maximum Sharpe: tối đa hóa lợi suất vượt trội trên mỗi đơn vị rủi ro.',
    cvar:'CVaR Optimized: ưu tiên giảm tail-risk bằng cách tối ưu tổn thất kỳ vọng ở phần đuôi phân phối.',
    riskParity:'Risk Parity: phân bổ để đóng góp rủi ro giữa các mã cân bằng hơn.',
    highReturn:'Aggressive Growth: nghiêng nhiều hơn về lợi suất kỳ vọng, phù hợp nhà đầu tư rất chịu rủi ro.',
    blackLitterman:'Black-Litterman: bắt đầu từ lợi suất cân bằng ngầm định theo vốn hóa thị trường, sau đó cập nhật bằng investor views và confidence. Đây là cách dùng views một cách chuẩn hóa hơn thay vì cộng tay vào expected return.'
  };
  const en={
    equal:'Equal Weight: each asset receives the same allocation. This is the baseline reference portfolio.',
    minVol:'Minimum Volatility: finds the lowest annualized risk portfolio subject to the IPS constraints.',
    maxSharpe:'Maximum Sharpe: maximizes excess return per unit of risk.',
    cvar:'CVaR Optimized: emphasizes lower tail-risk by minimizing expected shortfall.',
    riskParity:'Risk Parity: allocates weights so risk contribution is more balanced across assets.',
    highReturn:'Aggressive Growth: tilts more heavily toward expected return, suitable for very high risk tolerance.',
    blackLitterman:'Black-Litterman: starts from market-cap-implied equilibrium returns, then updates them with investor views and confidence. This is the disciplined way to incorporate views instead of manually overriding returns.'
  };
  return (state.lang==='vi'?vi:en)[key] || '';
}
async function fetchFxRate(){
  try{
    const d=await apiGet('/.netlify/functions/fx',{years:10});
    if(d.ok){
      state.fxRate=Number(d.rate)||state.fxRate;
      state.fxHistory=d.history||[];
      const fxEl=$('fxRateInput');
      if(fxEl) fxEl.value=String(Math.round(state.fxRate));
      updateCurrencyNote();
    }
  }catch(e){ console.warn('FX fetch failed',e.message); }
}
async function runAnalysis(){
  try{
    if(!state.market) throw new Error(state.lang==='vi'?'Bạn chưa chọn thị trường.':'Please choose a market first.');
    clearProgress();
    setProgress(6,state.lang==='vi'?'Đang kiểm tra đầu vào...':'Checking inputs...');
    updateCurrencyNote();
    updateBlackLittermanInputNote();
    state.selectedTickers=parseTickers($('tickersInput').value);
    state.benchmark=$('benchmarkInput').value;
    state.maxWeight=Number($('maxWeightInput').value)/100;
    state.bankRate=Number($('bankRateInput').value)/100;
    const years=Math.max(1,Math.min(10,Number($('yearsInput').value)||5));
    if(state.selectedTickers.length<2) throw new Error(state.lang==='vi'?'Cần ít nhất 2 mã cổ phiếu để tối ưu.':'At least 2 tickers are required.');
    if(state.selectedTickers.length*state.maxWeight<0.999) throw new Error(state.lang==='vi'?`Ràng buộc không khả thi: ${state.selectedTickers.length} mã × ${pct(state.maxWeight,0)} < 100%.`:`Infeasible constraint: ${state.selectedTickers.length} assets × ${pct(state.maxWeight,0)} < 100%.`);
    setStatus(t('loading'),'');
    setProgress(16,state.lang==='vi'?'Đang lấy tỷ giá live...':'Loading live FX rate...');
    await fetchFxRate();
    const endpoint=state.market==='US'?'/.netlify/functions/usData':'/.netlify/functions/vnData';
    setProgress(34,state.lang==='vi'?'Đang tải dữ liệu giá và benchmark...':'Loading price history and benchmark...');
    const data=await apiGet(endpoint,{symbols:state.selectedTickers.join(','),benchmark:state.benchmark,years});
    if(!data.ok){
      const detail=data.errors?Object.entries(data.errors).map(([k,v])=>`${k}: ${String(v).slice(0,240)}`).join(' | '):'';
      throw new Error(data.error || detail || 'Data adapter failed.');
    }
    setProgress(58,state.lang==='vi'?'Đang tải dữ liệu nền tảng...':'Loading fundamentals...');
    state.prices=data.prices||{};
    state.quotes=data.quotes||{};
    state.errors=data.errors||{};
    state.warnings=data.warnings||[];
    const fund=await apiGet('/.netlify/functions/fundamentals',{symbols:state.selectedTickers.join(','),market:state.market});
    state.fundamentals=fund.data||{};
    setProgress(74,state.lang==='vi'?'Đang chuẩn hóa chuỗi dữ liệu...':'Normalizing data series...');
    normalizeAndCompute();
    state.priceWindow=Math.min(years,5);
    state.backtestWindow=Math.min(years,5);
    document.querySelectorAll('[data-price-window]').forEach(btn=>btn.classList.toggle('active', Number(btn.dataset.priceWindow)===state.priceWindow));
    document.querySelectorAll('[data-backtest-window]').forEach(btn=>btn.classList.toggle('active', Number(btn.dataset.backtestWindow)===state.backtestWindow));
    setProgress(88,state.lang==='vi'?'Đang chạy mô phỏng tối ưu...':'Running optimizer and simulations...');
    optimizeAndRender();
    updateBlackLittermanInputNote();
    setProgress(100,state.lang==='vi'?'Hoàn tất.':'Done.');
    setStatus(`${t('complete')} ${t('noFake')}`,'ok');
    setTimeout(clearProgress,900);
  }catch(e){
    console.error(e);
    setStatus(`${state.lang==='vi'?'Lỗi':'Error'}: ${e.message}`,'err');
    clearProgress();
  }
}
function renderIntegrity(){
  const h=t('headers');
  const na=state.lang==='vi'?'Dữ liệu không khả dụng':'Data not available';
  const sorry=state.lang==='vi'?'Xin lỗi vì sự bất tiện.':'Sorry for the inconvenience.';
  const rows=state.symbols.map(s=>{
    const f=state.fundamentals[s]||{}, q=state.quotes[s]||{};
    const quality=(f.quality||'Data Not Available');
    const badge=quality==='Partial Data' ? `<span class="badge ok">${state.lang==='vi'?'Một phần dữ liệu':'Partial data'}</span>` : `<span class="badge warn">${na}</span>`;
    return [
      s,
      Number.isFinite(q.price)?money(q.price,MARKET_CONFIG[state.market].localCurrency):na,
      f.altmanZ?.value ?? na,
      f.beneishM?.value ?? na,
      Number.isFinite(f.fcf?.value)?pct(f.fcf.value):na,
      Number.isFinite(f.leverage?.value)?num(f.leverage.value,2):na,
      badge,
      (f.altmanZ?.source || f.fcf?.source || 'Open data') + ` — ${sorry}`
    ];
  });
  $('integrityTable').innerHTML=htmlTable([h.asset,h.price,h.altman,h.beneish,h.fcf,h.leverage,h.quality,h.source||'Source'],rows);
}
function renderModels(){
  state.kpiMode='optimized';
  const h=t('headers');
  const rows=Object.entries(state.models).map(([k,m])=>[k===state.recommendedKey?`★ ${m.label}`:m.label,pct(m.return),pct(m.risk),num(m.sharpe,2),pct(m.cvar),state.symbols.map((s,i)=>`${s}: ${pct(m.weights[i],1)}`).join(' • '),m.valid?`<span class="badge ok">OK</span>`:`<span class="badge danger">Fail</span>`]);
  $('modelComparisonTable').innerHTML=htmlTable([h.model,h.ret,h.risk,h.sharpe,h.cvar,h.weights,h.constraint],rows);
  const rec=state.models[state.recommendedKey];
  const active=getActiveModel()||rec;
  const viewSelector=$('viewModelSelector');
  if(viewSelector){ viewSelector.innerHTML=Object.entries(state.models).map(([k,m])=>`<option value="${k}" ${k===active.key?'selected':''}>${m.label}</option>`).join(''); }
  const label=$('viewModelLabel'); if(label) label.textContent=state.lang==='vi'?'Xem mô hình':'View model';
  $('recommendationBox').innerHTML=state.lang==='vi'
    ? `<strong>Mô hình khuyến nghị:</strong> ${rec.label}. Đây là mô hình Veera đề xuất dựa trên policy hiện tại và ràng buộc IPS.<br><strong>Mô hình đang xem:</strong> ${active.label}.`
    : `<strong>Recommended model:</strong> ${rec.label}. This is Veera’s recommended portfolio under the current policy and IPS constraints.<br><strong>Currently viewed model:</strong> ${active.label}.`;
  const note=$('modelMethodNote'); if(note) note.textContent=modelMethodCopy(active.key);
  const capMin=1-(state.symbols.length-1)*state.maxWeight;
  const wbox=$('constraintWarning');
  if(capMin>0.20){
    wbox.classList.remove('hidden');
    wbox.textContent=state.lang==='vi'
      ? `Cảnh báo ràng buộc: Với ${state.symbols.length} mã và trần ${pct(state.maxWeight,0)}, mỗi mã gần như bị ép tối thiểu khoảng ${pct(capMin,1)}. Vì vậy tỷ trọng có thể trông giống nhau. Hãy thêm nhiều mã hoặc tăng trần tỷ trọng nếu muốn phân bổ linh hoạt hơn.`
      : `Constraint warning: With ${state.symbols.length} assets and a ${pct(state.maxWeight,0)} cap, each asset is forced to at least about ${pct(capMin,1)}. Weights may look similar. Add more assets or loosen the cap for more freedom.`;
  }else wbox.classList.add('hidden');
  Plotly.newPlot('weightsChart',[{labels:state.symbols,values:active.weights,type:'pie',hole:.45,marker:{colors:['#59f1f3','#ffd86b','#b78cff','#59d8ff','#ff7fa2','#7cf8ff']},hovertemplate:'%{label}: %{percent}<extra></extra>'}],{...plotLayout(''),margin:{l:10,r:10,t:20,b:20}},plotConfig);
  const rc=riskContributions(active.weights,state.aligned.cov);
  Plotly.newPlot('riskContributionChart',[{x:state.symbols,y:rc,type:'bar',marker:{color:'#59f1f3'},hovertemplate:'%{x}: %{y:.2%}<extra></extra>'}],{...plotLayout(''),yaxis:{...plotLayout().yaxis,tickformat:'.0%'}},plotConfig);
}
function renderGBM(){
  const g=state.gbm;if(!g)return;
  Plotly.newPlot('gbmChart',[
    {x:g.map(d=>d.x),y:g.map(d=>d.p95),type:'scatter',mode:'lines',name:'95th percentile',line:{width:1,color:'#A9EEEB'}},
    {x:g.map(d=>d.x),y:g.map(d=>d.p50),type:'scatter',mode:'lines',name:'Median',line:{width:3,color:'#5BEBE8'}},
    {x:g.map(d=>d.x),y:g.map(d=>d.p5),type:'scatter',mode:'lines',name:'5th percentile',line:{width:1,color:'#FF6B6B'}}
  ],{...plotLayout(''),xaxis:{...plotLayout().xaxis,title:state.lang==='vi'?'Năm':'Years'},yaxis:{...plotLayout().yaxis,tickformat:',.0f'}},plotConfig);
  $('gbmNote').textContent=state.lang==='vi'
    ? 'Phần này dùng để ước lượng vùng kết quả có thể xảy ra của danh mục trong 3 năm tới, sau khi đã chọn mô hình và tỷ trọng. Phương pháp dùng là Monte Carlo theo Geometric Brownian Motion có tương quan: hệ thống học tương quan lịch sử giữa các mã, rồi tạo nhiều kịch bản tốt – trung bình – xấu. Đây là mô phỏng rủi ro/lợi nhuận, không phải cam kết lợi nhuận.'
    : 'This module estimates a possible range of portfolio values over the next 3 years after a model and allocation are selected. It uses correlated Geometric Brownian Motion Monte Carlo: the engine learns historical co-movement across assets, then generates best / median / weak scenario paths. This is a risk-and-return simulation, not a guaranteed forecast.';
}
function renderReport(){
  const rec=getActiveModel(); if(!rec) return;
  const drawdown=pct(state.backtest?.metrics?.portfolio?.mdd);
  const disclaimer=state.lang==='vi'
    ? 'Lợi suất kỳ vọng và mô phỏng dựa trên dữ liệu lịch sử cùng giả định mô hình, không phải cam kết lợi nhuận trong tương lai.'
    : 'Expected returns and simulations are based on historical data and model assumptions, not guaranteed future performance.';
  $('finalReport').innerHTML=`
    <div class="report-grid">
      <div class="report-block">
        <div class="terminal-label" style="font-size:22px">Veera Portfolio Optimizer</div>
        <h3>${state.lang==='vi'?'Tóm tắt điều hành':'Executive summary'}</h3>
        <ul>
          <li><strong>${state.lang==='vi'?'Thị trường':'Market'}:</strong> ${MARKET_CONFIG[state.market].label[state.lang]}</li>
          <li><strong>${state.lang==='vi'?'Hồ sơ rủi ro':'Risk profile'}:</strong> ${state.riskProfileName} (${Math.round(state.riskScore)}/100)</li>
          <li><strong>${state.lang==='vi'?'Mã phân tích':'Tickers'}:</strong> ${state.symbols.join(', ')}</li>
          <li><strong>${state.lang==='vi'?'Benchmark':'Benchmark'}:</strong> ${state.benchmark}</li>
          <li><strong>${state.lang==='vi'?'Mô hình khuyến nghị':'Recommended model'}:</strong> ${state.models[state.recommendedKey]?.label || rec.label}</li>
          <li><strong>${state.lang==='vi'?'Mô hình đang xem':'Viewing model'}:</strong> ${rec.label}</li>
          <li><strong>${state.lang==='vi'?'Tỷ trọng':'Weights'}:</strong> ${state.symbols.map((s,i)=>`${s} ${pct(rec.weights[i],1)}`).join(', ')}</li>
        </ul>
        <div class="report-kpis">
          <div class="report-kpi"><span>${state.lang==='vi'?'Lợi suất kỳ vọng':'Expected return'}</span><strong>${pct(rec.return)}</strong></div>
          <div class="report-kpi"><span>${state.lang==='vi'?'Độ biến động':'Volatility'}</span><strong>${pct(rec.risk)}</strong></div>
          <div class="report-kpi"><span>Sharpe</span><strong>${num(rec.sharpe,2)}</strong></div>
        </div>
      </div>
      <div class="report-block">
        <h4>${state.lang==='vi'?'Kiểm định & cảnh báo':'Backtest & caution'}</h4>
        <ul>
          <li><strong>${state.lang==='vi'?'Backtest max drawdown':'Backtest max drawdown'}:</strong> ${drawdown}</li>
          <li><strong>${state.lang==='vi'?'Lãi suất phi rủi ro':'Risk-free rate'}:</strong> ${pct(state.bankRate)}</li>
          <li><strong>${state.lang==='vi'?'Tiền tệ hiển thị':'Display currency'}:</strong> ${state.currency}</li>
          <li><strong>${state.lang==='vi'?'Tỷ giá USD/VND live':'Live USD/VND FX'}:</strong> ${num(state.fxRate,0)}</li>
        </ul>
        <div class="note-box compact-note" style="margin-top:12px">${disclaimer}</div>
      </div>
    </div>`;
}
async function downloadPDF(){
  const {jsPDF}=window.jspdf||{}; if(!jsPDF||!window.html2canvas) return;
  const doc=new jsPDF({unit:'pt',format:'a4'});
  const wrapper=document.createElement('div');
  wrapper.style.position='fixed'; wrapper.style.left='-99999px'; wrapper.style.top='0'; wrapper.style.width='794px';
  wrapper.style.background='linear-gradient(180deg,#081633 0%,#163467 100%)'; wrapper.style.padding='0';
  const reportHtml=$('finalReport')?.innerHTML || '';
  wrapper.innerHTML=`<section style="width:794px; min-height:1123px; padding:44px; box-sizing:border-box; background:linear-gradient(180deg,#081633 0%,#183a7c 100%); color:#fff; font-family:Inter,Arial,sans-serif;">${reportHtml}</section>`;
  document.body.appendChild(wrapper);
  if(document.fonts && document.fonts.ready){ await document.fonts.ready; }
  const canvas=await html2canvas(wrapper.firstElementChild,{scale:2,backgroundColor:null,useCORS:true});
  const img=canvas.toDataURL('image/png');
  const pageW=doc.internal.pageSize.getWidth(), pageH=doc.internal.pageSize.getHeight();
  doc.setFillColor(8,22,51); doc.rect(0,0,pageW,pageH,'F');
  const ratio=Math.min((pageW-36)/canvas.width,(pageH-36)/canvas.height);
  doc.addImage(img,'PNG',(pageW-canvas.width*ratio)/2,18,canvas.width*ratio,canvas.height*ratio);
  document.body.removeChild(wrapper);
  for(const id of ['weightsChart','frontierChart','backtestChart','projectionChart','gbmChart']){
    const el=$(id); if(!el||!window.Plotly) continue;
    try{
      const imgUrl=await Plotly.toImage(el,{format:'png',width:1000,height:580,scale:1});
      doc.addPage();
      doc.setFillColor(8,22,51); doc.rect(0,0,pageW,pageH,'F');
      doc.addImage(imgUrl,'PNG',24,90,pageW-48,Math.min(420,pageH-140));
    }catch(e){ console.warn('Chart export skipped',id,e); }
  }
  doc.save('Veera_Portfolio_Optimizer_Report.pdf');
}
function initTooltipOverlay(){
  if(window.__veeraTooltipBound) return; window.__veeraTooltipBound=true;
  let current=null;
  const open=(el)=>{ if(!el || !el.classList?.contains('tip')) return; current=el; showFloatingTip(el); };
  const close=()=>{ current=null; hideFloatingTip(); };
  const outsideTip=(target)=>!(target && target.closest && target.closest('.tip'));
  document.addEventListener('pointerover',e=>{ const el=e.target.closest?.('.tip'); if(el) open(el); },true);
  document.addEventListener('pointerout',e=>{ const el=e.target.closest?.('.tip'); if(el && !el.contains(e.relatedTarget)) close(); },true);
  document.addEventListener('focusin',e=>{ const el=e.target.closest?.('.tip'); if(el) open(el); });
  document.addEventListener('focusout',e=>{ const el=e.target.closest?.('.tip'); if(el) close(); });
  // Clicks no longer pin tooltips. A tooltip is visible only while hovering/focusing the ? icon.
  document.addEventListener('click',e=>{ if(outsideTip(e.target)) close(); });
  window.addEventListener('scroll',close,{passive:true});
  window.addEventListener('resize',close);
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
}
const __oldSelectMarket = selectMarket;
selectMarket = function(market){ __oldSelectMarket(market); updateBlackLittermanInputNote(); clearProgress(); };
const __oldUpdateDynamicLanguage = updateDynamicLanguage;
updateDynamicLanguage = function(){ __oldUpdateDynamicLanguage(); updateBlackLittermanInputNote(); const badge=document.querySelector('#integrity .mode-badge'); if(badge) badge.textContent=state.lang==='vi'?'Dữ liệu không khả dụng khi nguồn mở không công bố':'Data not available when open providers do not publish it'; };


/* v6 live-FX-only override: no manual/hard-coded exchange rate is used for currency conversion. */
function updateCurrencyNote(){
  if(!state.market) return;
  const local=MARKET_CONFIG[state.market].localCurrency;
  const raw=Number($('capitalInput')?.value||state.inputCapital);
  const selected=$('currencyInput')?.value||local;
  const fxEl=$('fxRateInput');
  const liveFx=Number.isFinite(Number(state.fxRate)) && Number(state.fxRate)>0 ? Number(state.fxRate) : NaN;
  state.currency=selected; state.inputCapital=raw;
  if(selected===local){
    state.capital=raw;
    $('currencyNote').textContent=`${state.lang==='vi'?'Đồng tiền tính toán nội bộ':'Local calculation currency'}: ${local}. ${state.lang==='vi'?'Số vốn':'Capital'} ${money(raw,selected)}.`;
    return;
  }
  if(!Number.isFinite(liveFx)){
    state.capital=NaN;
    if(fxEl) fxEl.value=state.lang==='vi'?'Đang tải tỷ giá live...':'Loading live FX...';
    $('currencyNote').textContent=state.lang==='vi'
      ? 'Cần tỷ giá USD/VND live để quy đổi. Hệ thống sẽ lấy tỷ giá tự động trước khi tính toán.'
      : 'Live USD/VND FX is required for conversion. The system will retrieve it automatically before calculation.';
    return;
  }
  if(fxEl) fxEl.value=String(Math.round(liveFx));
  state.capital=convertCurrency(raw,selected,local,liveFx);
  $('currencyNote').textContent=`${state.lang==='vi'?'Quy đổi nội bộ':'Internal conversion'}: ${money(raw,selected)} ≈ ${money(state.capital,local)} (${local}) ${state.lang==='vi'?'với tỷ giá USD/VND live':'using live USD/VND'} ${Math.round(liveFx)}.`;
}

/* === v7 mascot launch / music / guidance layer === */
function initVeeraExperience(){
  const matrix=$('matrixCanvas');
  if(matrix) matrix.classList.add('hidden');
  const stage=$('introStage');
  const curtain=$('introVideoCurtain');
  const video=$('introVideo');
  const skip=$('skipIntroBtn');
  const replay=$('replayIntroBtn');
  const music=$('bgMusic');
  const musicBtn=$('musicToggleBtn');
  const reveal=()=>{
    stage?.classList.add('poster-ready');
    if(curtain) curtain.setAttribute('aria-hidden','true');
    if(video){ try{ video.pause(); }catch{} }
    if(skip){ skip.textContent=state.lang==='vi'?'Bỏ qua intro':'Skip Intro'; skip.classList.add('hidden'); }
  };
  const replayIntro=()=>{
    stage?.classList.remove('poster-ready');
    if(skip) skip.classList.remove('hidden');
    if(video){ try{ video.currentTime=0; video.play().catch(()=>{}); }catch{} }
    setTimeout(reveal,8100);
  };
  if(video){
    video.muted=true;
    video.play?.().catch(()=>{});
    video.addEventListener('ended',reveal,{once:false});
  }
  setTimeout(reveal,8200);
  skip?.addEventListener('click',reveal);
  replay?.addEventListener('click',replayIntro);
  if(music){
    music.volume=.28;
    const tryPlay=()=>{ if(window.__veeraMusicAllowed!==true){ try{ music.pause(); }catch{} updateMusicButton(false); return Promise.resolve(false); } return music.play().then(()=>{updateMusicButton(true); return true;}).catch(()=>{updateMusicButton(false); return false;}); };
    tryPlay();
    document.addEventListener('pointerdown',()=>{ if(music.paused && musicBtn?.getAttribute('aria-pressed')!=='false') tryPlay(); },{once:true});
  }
  musicBtn?.addEventListener('click',()=>{
    if(!music) return;
    if(music.paused){ music.play().then(()=>updateMusicButton(true)).catch(()=>updateMusicButton(false)); }
    else{ music.pause(); updateMusicButton(false); }
  });
}
function updateMusicButton(on){
  const btn=$('musicToggleBtn'); if(!btn) return;
  btn.setAttribute('aria-pressed',on?'true':'false');
  btn.textContent=on ? (state.lang==='vi'?'♫ Nhạc bật':'♫ Music On') : (state.lang==='vi'?'♪ Bật nhạc':'♪ Music Off');
}
const __veeraOldSetStageV7 = setStage;
setStage = function(id){
  __veeraOldSetStageV7(id);
  updateMascotHint();
};
const __veeraOldApplyLanguageV7 = applyLanguage;
applyLanguage = function(lang){
  __veeraOldApplyLanguageV7(lang);
  updateMusicButton(!($('bgMusic')?.paused));
  updateMascotHint();
};
function updateMascotHint(){
  const el=$('mascotHint'); if(!el) return;
  const vi=state.lang==='vi';
  const stage=state.stage;
  const hints={
    introStage: vi?'Mình là Veera. Bấm Experience Now để bắt đầu hành trình tối ưu danh mục nhé.':'I am Veera. Press Experience Now to begin your portfolio journey.',
    languageStage: vi?'Chọn ngôn ngữ trước; toàn bộ các lớp sau sẽ theo đúng lựa chọn này.':'Choose a language first; every next layer will follow it.',
    quizStage: vi?'Trả lời 6 câu hỏi để mình hiểu khẩu vị rủi ro của bạn trước khi chọn mô hình.':'Answer six questions so I can map your risk profile before selecting models.',
    riskResultStage: vi?'Đây là hồ sơ rủi ro của bạn. Bạn có thể làm lại hoặc tiếp tục chọn thị trường.':'This is your risk profile. You can retake the test or continue to market selection.',
    marketStage: vi?'Chọn thị trường Mỹ hoặc Việt Nam. Mỗi thị trường sẽ dùng ticker, benchmark và tiền tệ riêng.':'Choose the US or Vietnam market. Each market controls tickers, benchmarks, and currency.',
    dashboardStage: vi?'Nhập mã theo từng bước: ticker, benchmark, tiền tệ/lãi suất, rồi investor views nếu muốn dùng Black-Litterman.':'Work step-by-step: tickers, benchmark, currency/rates, then investor views if you want Black-Litterman.'
  };
  el.textContent=hints[stage] || hints.dashboardStage;
}
const __veeraOldRunAnalysisV7 = runAnalysis;
runAnalysis = async function(){
  updateMascotHint();
  return __veeraOldRunAnalysisV7();
};

/* === v8 requested fixes: intro cleanup, compact music, BL view builder, max-weight floor, friendly data errors, PDF ratio === */
function currentTickerListForConfig(){
  const raw = $('tickersInput')?.value || '';
  const parsed = parseTickers(raw);
  return parsed.length ? parsed : (state.selectedTickers || []);
}
function minWeightCapPct(count){
  if(!count) return 0;
  return Math.ceil((100 / count) * 100) / 100;
}
function updateMaxWeightFeasibility(autoRaise=false){
  const input=$('maxWeightInput'), hint=$('maxWeightHint');
  if(!input) return;
  const n=currentTickerListForConfig().length;
  if(!n){ if(hint) hint.textContent=''; return; }
  const minPct=minWeightCapPct(n);
  input.min=String(minPct);
  const current=Number(input.value);
  if(autoRaise && (!Number.isFinite(current) || current < minPct)) input.value=String(minPct.toFixed(2));
  if(hint){
    hint.textContent = state.lang==='vi'
      ? `Với ${n} mã, tỷ trọng tối đa tối thiểu là ${minPct.toFixed(2)}%; hãy nhập giá trị bằng hoặc hơn.`
      : `With ${n} tickers, the minimum feasible max-weight cap is ${minPct.toFixed(2)}%; enter this value or higher.`;
  }
}
function parseRawViewsToMap(raw){
  const out={};
  String(raw||'').split(',').forEach(part=>{
    const [sym,val]=part.split(':').map(x=>x&&x.trim());
    if(!sym || val===undefined) return;
    const v=Number(val);
    if(Number.isFinite(v) && v>=-1 && v<=1) out[cleanSymbol(sym)]=v;
  });
  return out;
}
function collectBLViewsFromBuilder(){
  const map={};
  document.querySelectorAll('.bl-view-value').forEach(inp=>{
    const sym=cleanSymbol(inp.dataset.symbol||'');
    const txt=String(inp.value||'').trim();
    if(!sym || txt==='') return;
    const v=Number(txt);
    if(Number.isFinite(v) && v>=-1 && v<=1) map[sym]=v;
  });
  state.blViews=map;
  const raw=Object.entries(map).map(([s,v])=>`${s}:${v>=0?'+':''}${Number(v).toFixed(2)}`).join(', ');
  if($('viewsInput')) $('viewsInput').value=raw;
}
function renderBLViewsBuilder(){
  const box=$('blViewsBuilder'), rawInput=$('viewsInput'), hint=$('blViewsHint');
  if(!box || !rawInput) return;
  const tickers=currentTickerListForConfig();
  const existing={...parseRawViewsToMap(rawInput.value), ...(state.blViews||{})};
  if(!tickers.length){ box.innerHTML=''; if(hint) hint.textContent=''; return; }
  box.innerHTML=tickers.map(s=>{
    const val=existing[s];
    return `<label class="bl-view-row"><strong>${s}:</strong><input class="bl-view-value" data-symbol="${s}" type="number" min="-1" max="1" step="0.01" placeholder="+0.03" value="${Number.isFinite(val)?val:''}" /></label>`;
  }).join('');
  box.querySelectorAll('.bl-view-value').forEach(inp=>inp.addEventListener('input',collectBLViewsFromBuilder));
  if(hint){
    hint.textContent=state.lang==='vi'
      ? 'Nhập trong khoảng -1 đến +1. Ví dụ +0.03 = kỳ vọng mã đó cao hơn 3%/năm; để trống nếu không có quan điểm.'
      : 'Enter values from -1 to +1. Example +0.03 = you expect that ticker to outperform by 3% per year; leave blank if you have no view.';
  }
  collectBLViewsFromBuilder();
}
const __v8SyncChipsBase = syncChips;
syncChips = function(){
  __v8SyncChipsBase();
  updateMaxWeightFeasibility(true);
  renderBLViewsBuilder();
};
const __v8SelectMarketBase = selectMarket;
selectMarket = function(market){
  state.blViews={};
  __v8SelectMarketBase(market);
  updateMaxWeightFeasibility(true);
  renderBLViewsBuilder();
};
const __v8UpdateLanguageBase = updateDynamicLanguage;
updateDynamicLanguage = function(){
  __v8UpdateLanguageBase();
  updateMaxWeightFeasibility(false);
  renderBLViewsBuilder();
};
const __v8BindDashboardBase = bindDashboardEvents;
bindDashboardEvents = function(){
  __v8BindDashboardBase();
  const tickers=$('tickersInput'), maxW=$('maxWeightInput');
  if(tickers){
    tickers.addEventListener('input',()=>{ state.selectedTickers=parseTickers(tickers.value); updateMaxWeightFeasibility(false); renderBLViewsBuilder(); });
    tickers.addEventListener('change',()=>{ state.selectedTickers=parseTickers(tickers.value); updateMaxWeightFeasibility(true); renderBLViewsBuilder(); });
  }
  if(maxW){
    maxW.addEventListener('change',()=>updateMaxWeightFeasibility(true));
    maxW.addEventListener('input',()=>updateMaxWeightFeasibility(false));
  }
  $('experienceBtn')?.addEventListener('click',()=>tryStartVeeraMusic());
};
function parseViews(){
  collectBLViewsFromBuilder();
  const raw=$('viewsInput')?.value||'', out=[];
  raw.split(',').forEach(part=>{
    const [sym,val]=part.split(':').map(x=>x&&x.trim());
    if(!sym||val===undefined)return;
    const v=Number(val);
    if(state.symbols.includes(cleanSymbol(sym))&&Number.isFinite(v)&&v>=-1&&v<=1) out.push({symbol:cleanSymbol(sym),view:v});
  });
  return out;
}
function tryStartVeeraMusic(){
  const music=$('bgMusic');
  if(!music) return Promise.resolve(false);
  music.volume=.28; music.muted=false; music.autoplay=false; music.removeAttribute?.('autoplay');
  if(window.__veeraMusicAllowed!==true){ try{ music.pause(); }catch{} updateMusicButton(false); return Promise.resolve(false); }
  return music.play().then(()=>{ updateMusicButton(true); return true; }).catch(()=>{ updateMusicButton(false); return false; });
}
function updateMusicButton(on){
  const btn=$('musicToggleBtn'); if(!btn) return;
  btn.setAttribute('aria-pressed',on?'true':'false');
  btn.textContent='♪';
  btn.title= state.lang==='vi' ? (on?'Tắt nhạc':'Bật nhạc') : (on?'Turn music off':'Turn music on');
  btn.setAttribute('aria-label',btn.title);
}
initVeeraExperience = function(){
  const matrix=$('matrixCanvas'); if(matrix) matrix.classList.add('hidden');
  const stage=$('introStage'), curtain=$('introVideoCurtain'), video=$('introVideo'), skip=$('skipIntroBtn'), music=$('bgMusic'), musicBtn=$('musicToggleBtn');
  const reveal=()=>{
    stage?.classList.add('poster-ready');
    if(curtain) curtain.setAttribute('aria-hidden','true');
    if(video){ try{ video.pause(); }catch{} }
    if(skip){ skip.classList.add('hidden'); }
    tryStartVeeraMusic();
  };
  if(video){ video.muted=true; video.play?.().catch(()=>{}); video.addEventListener('ended',reveal,{once:false}); }
  setTimeout(reveal,8200);
  skip?.addEventListener('click',reveal);
  if(music){ music.volume=.28; updateMusicButton(!music.paused); document.addEventListener('pointerdown',()=>{ if(musicBtn?.getAttribute('aria-pressed')!=='false') tryStartVeeraMusic(); },{once:true}); }
  musicBtn?.addEventListener('click',()=>{ if(!music) return; if(music.paused){ tryStartVeeraMusic(); } else { music.pause(); updateMusicButton(false); } });
};
function friendlyLoadError(symbol, years, detail=''){
  const period = state.lang==='vi' ? `${years} năm` : `${years} year${Number(years)>1?'s':''}`;
  const base = state.lang==='vi'
    ? `Không load được dữ liệu của mã ${symbol} trong giai đoạn ${period}. Hãy chọn mã khác hoặc điều chỉnh thời gian.`
    : `Could not load data for ${symbol} over the ${period} window. Choose another ticker or adjust the analysis window.`;
  return detail ? `${base} ${String(detail).slice(0,180)}` : base;
}
function validateLoadedSeries(data, years){
  const prices=data.prices||{};
  for(const s of state.selectedTickers){
    if(!prices[s] || prices[s].length < 50) throw new Error(friendlyLoadError(s,years,data.errors?.[s]||''));
  }
  if(!prices[state.benchmark] || prices[state.benchmark].length < 30) throw new Error(friendlyLoadError(state.benchmark,years,data.errors?.[state.benchmark]||''));
}
async function runAnalysis(){
  try{
    if(!state.market) throw new Error(state.lang==='vi'?'Bạn chưa chọn thị trường.':'Please choose a market first.');
    clearProgress();
    setProgress(6,state.lang==='vi'?'Đang kiểm tra đầu vào...':'Checking inputs...');
    state.selectedTickers=parseTickers($('tickersInput').value);
    updateMaxWeightFeasibility(true);
    renderBLViewsBuilder();
    updateCurrencyNote();
    updateBlackLittermanInputNote();
    state.benchmark=$('benchmarkInput').value;
    state.maxWeight=Number($('maxWeightInput').value)/100;
    state.bankRate=Number($('bankRateInput').value)/100;
    const years=Math.max(1,Math.min(10,Number($('yearsInput').value)||5));
    if(state.selectedTickers.length<2) throw new Error(state.lang==='vi'?'Cần ít nhất 2 mã cổ phiếu để tối ưu.':'At least 2 tickers are required.');
    const minPct=minWeightCapPct(state.selectedTickers.length);
    if(Number($('maxWeightInput').value) < minPct) throw new Error(state.lang==='vi'?`Tỷ trọng tối đa mỗi mã phải từ ${minPct.toFixed(2)}% trở lên.`:`Max weight per asset must be at least ${minPct.toFixed(2)}%.`);
    setStatus(t('loading'),'');
    setProgress(16,state.lang==='vi'?'Đang lấy tỷ giá live...':'Loading live FX rate...');
    await fetchFxRate();
    const endpoint=state.market==='US'?'/.netlify/functions/usData':'/.netlify/functions/vnData';
    setProgress(34,state.lang==='vi'?'Đang tải dữ liệu giá và benchmark...':'Loading price history and benchmark...');
    const data=await apiGet(endpoint,{symbols:state.selectedTickers.join(','),benchmark:state.benchmark,years});
    if(!data.ok){
      const first=Object.keys(data.errors||{})[0] || state.benchmark || state.selectedTickers[0];
      throw new Error(friendlyLoadError(first,years,data.errors?.[first]||data.error||''));
    }
    validateLoadedSeries(data, years);
    setProgress(58,state.lang==='vi'?'Đang tải dữ liệu nền tảng...':'Loading fundamentals...');
    state.prices=data.prices||{}; state.quotes=data.quotes||{}; state.errors=data.errors||{}; state.warnings=data.warnings||[];
    const fund=await apiGet('/.netlify/functions/fundamentals',{symbols:state.selectedTickers.join(','),market:state.market});
    state.fundamentals=fund.data||{};
    setProgress(74,state.lang==='vi'?'Đang chuẩn hóa chuỗi dữ liệu...':'Normalizing data series...');
    normalizeAndCompute();
    state.priceWindow=Math.min(years,5); state.backtestWindow=Math.min(years,5);
    document.querySelectorAll('[data-price-window]').forEach(btn=>btn.classList.toggle('active', Number(btn.dataset.priceWindow)===state.priceWindow));
    document.querySelectorAll('[data-backtest-window]').forEach(btn=>btn.classList.toggle('active', Number(btn.dataset.backtestWindow)===state.backtestWindow));
    setProgress(88,state.lang==='vi'?'Đang chạy mô phỏng tối ưu...':'Running optimizer and simulations...');
    optimizeAndRender();
    updateBlackLittermanInputNote();
    setProgress(100,state.lang==='vi'?'Hoàn tất.':'Done.');
    setStatus(`${t('complete')} ${t('noFake')}`,'ok');
    setTimeout(clearProgress,900);
  }catch(e){
    console.error(e);
    setStatus(`${state.lang==='vi'?'Lỗi':'Error'}: ${e.message}`,'err');
    clearProgress();
  }
}
function blackLittermanModel(){
  const views=parseViews();
  if(!views.length) return null;
  const caps=state.symbols.map(s=>Number(state.quotes[s]?.marketCap ?? state.fundamentals[s]?.marketCap?.value)||0);
  if(!caps.every(x=>x>0)) return null;
  const total=caps.reduce((a,b)=>a+b,0);
  const wm=caps.map(x=>x/total);
  const cov=state.aligned.cov, delta=2.5, tau=.05;
  const pi=cov.map(row=>delta*dot(row,wm));
  const P=views.map(v=>state.symbols.map(s=>s===v.symbol?1:0));
  const q=views.map(v=>v.view);
  const conf=Math.max(.01,Math.min(1,Number($('viewConfidenceInput').value)/100));
  const omega=P.map(row=>{ const idx=row.findIndex(x=>x===1); return Math.max(1e-6,(1-conf)/conf*Math.abs(cov[idx][idx]||0.04)); });
  const muBL=blackLittermanPosterior(pi,cov,tau,P,q,omega);
  const best=state.portfolios.reduce((a,b)=>{
    const sa=sharpe(portReturn(a.weights,muBL),portRisk(a.weights,cov));
    const sb=sharpe(portReturn(b.weights,muBL),portRisk(b.weights,cov));
    return sb>sa?b:a;
  });
  const s=portfolioStats(best.weights,t('blackLitterman'));
  s.key='blackLitterman'; s.posteriorReturn=portReturn(best.weights,muBL); s.valid=true; s.blValid=true;
  return s;
}
function selectModels(){
  const p=state.portfolios, n=state.symbols.length;
  const best=(fn)=>p.reduce((a,b)=>fn(b)>fn(a)?b:a);
  const min=(fn)=>p.reduce((a,b)=>fn(b)<fn(a)?b:a);
  const equal=portfolioStats(Array(n).fill(1/n),t('equal')); equal.key='equal';
  const minVol={...min(x=>x.risk),label:t('minVol'),key:'minVol'};
  const maxSharpe={...best(x=>x.sharpe),label:t('maxSharpe'),key:'maxSharpe'};
  const cvar={...min(x=>x.cvar),label:t('cvar'),key:'cvar'};
  const highReturn={...best(x=>x.return - 0.12*x.risk),label:t('highReturn'),key:'highReturn'};
  const rp=best(x=>-riskParityObjective(x.weights)); rp.label=t('riskParity'); rp.key='riskParity';
  const bl=blackLittermanModel();
  state.models={equal,minVol,maxSharpe,cvar,riskParity:rp,highReturn};
  if(bl){ state.models.blackLitterman=bl; }
  else{
    state.models.blackLitterman={...equal,label:`${t('blackLitterman')} — ${state.lang==='vi'?'cần views + market cap':'needs views + market caps'}`,key:'blackLitterman',valid:false,blValid:false};
  }
  selectRecommendedFromPolicy();
  state.viewModelKey = state.recommendedKey;
}
function selectRecommendedFromPolicy(){
  const policy=$('modelPolicyInput')?.value||'auto';
  if(policy!=='auto'&&state.models[policy]&&state.models[policy].valid!==false){ state.recommendedKey=policy; return; }
  if(state.riskProfileKey==='conservative'||state.riskProfileKey==='moderateConservative') state.recommendedKey= state.models.cvar.cvar < state.models.minVol.cvar ? 'cvar':'minVol';
  else if(state.riskProfileKey==='balanced') state.recommendedKey='maxSharpe';
  else if(state.riskProfileKey==='growth') state.recommendedKey='highReturn';
  else state.recommendedKey=state.models.blackLitterman?.blValid?'blackLitterman':'highReturn';
}
const __v8RenderModelsBase = renderModels;
renderModels = function(){
  __v8RenderModelsBase();
  const bl=state.models?.blackLitterman;
  const note=$('modelMethodNote');
  if(bl && bl.valid===false && note && (state.viewModelKey==='blackLitterman')){
    note.textContent=state.lang==='vi'
      ? 'Black-Litterman chưa được tính vì thiếu quan điểm hợp lệ hoặc thiếu dữ liệu vốn hóa thị trường. Hãy nhập view cho từng mã và kiểm tra nguồn dữ liệu market cap.'
      : 'Black-Litterman is not calculated yet because valid views or market-cap data are missing. Enter per-ticker views and check market-cap availability.';
  }
};
async function downloadPDF(){
  const {jsPDF}=window.jspdf||{}; if(!jsPDF||!window.html2canvas) return;
  const doc=new jsPDF({unit:'pt',format:'a4'});
  const pageW=doc.internal.pageSize.getWidth(), pageH=doc.internal.pageSize.getHeight();
  const rec=getActiveModel();
  const wrapper=document.createElement('div');
  wrapper.style.position='fixed'; wrapper.style.left='-99999px'; wrapper.style.top='0'; wrapper.style.width='794px';
  wrapper.innerHTML=`<section style="width:794px; min-height:1123px; padding:44px; box-sizing:border-box; background:linear-gradient(180deg,#081633 0%,#183a7c 100%); color:#fff; font-family:Inter,Arial,sans-serif;">
    <div style="font-size:18px;letter-spacing:.16em;color:#59f1f3;font-weight:900;text-transform:uppercase;">Veera Portfolio Optimizer</div>
    <h1 style="font-size:34px;line-height:1.1;margin:14px 0 18px;color:#fff;">${state.lang==='vi'?'Báo cáo tối ưu danh mục':'Portfolio Optimization Report'}</h1>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px;">
      <div style="border:1px solid rgba(124,248,255,.26);border-radius:18px;padding:18px;background:rgba(7,18,43,.25);"><h2 style="margin:0 0 10px;font-size:20px;color:#fff;">${state.lang==='vi'?'Tóm tắt':'Summary'}</h2><ul style="line-height:1.75;margin:0;padding-left:18px;"><li>${state.lang==='vi'?'Thị trường':'Market'}: ${MARKET_CONFIG[state.market].label[state.lang]}</li><li>${state.lang==='vi'?'Hồ sơ rủi ro':'Risk profile'}: ${state.riskProfileName} (${Math.round(state.riskScore)}/100)</li><li>${state.lang==='vi'?'Mã':'Tickers'}: ${state.symbols.join(', ')}</li><li>Benchmark: ${state.benchmark}</li><li>${state.lang==='vi'?'Mô hình đang xem':'Viewing model'}: ${rec.label}</li></ul></div>
      <div style="border:1px solid rgba(124,248,255,.26);border-radius:18px;padding:18px;background:rgba(7,18,43,.25);"><h2 style="margin:0 0 10px;font-size:20px;color:#fff;">${state.lang==='vi'?'Kết quả chính':'Key output'}</h2><ul style="line-height:1.75;margin:0;padding-left:18px;"><li>${state.lang==='vi'?'Lợi suất kỳ vọng':'Expected return'}: ${pct(rec.return)}</li><li>${state.lang==='vi'?'Độ biến động':'Volatility'}: ${pct(rec.risk)}</li><li>Sharpe: ${num(rec.sharpe,2)}</li><li>CVaR: ${pct(rec.cvar)}</li><li>${state.lang==='vi'?'Tỷ giá USD/VND live':'Live USD/VND FX'}: ${num(state.fxRate,0)}</li></ul></div>
    </div>
    <div style="margin-top:22px;border:1px solid rgba(124,248,255,.26);border-radius:18px;padding:18px;background:rgba(7,18,43,.25);"><h2 style="margin:0 0 12px;font-size:20px;color:#fff;">${state.lang==='vi'?'Tỷ trọng':'Weights'}</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${state.symbols.map((s,i)=>`<div style="display:flex;justify-content:space-between;padding:10px 12px;border-radius:12px;background:rgba(89,241,243,.08)"><strong>${s}</strong><span>${pct(rec.weights[i],1)}</span></div>`).join('')}</div></div>
    <div style="margin-top:22px;border:1px solid rgba(255,216,107,.38);border-radius:18px;padding:18px;background:rgba(255,216,107,.08);color:#fff7d8;line-height:1.65;"><strong>${state.lang==='vi'?'Lưu ý':'Disclaimer'}:</strong> ${state.lang==='vi'?'Kết quả dựa trên dữ liệu lịch sử và giả định mô hình; không phải cam kết lợi nhuận tương lai.':'Results are based on historical data and model assumptions; they are not guaranteed future returns.'}</div>
  </section>`;
  document.body.appendChild(wrapper);
  if(document.fonts && document.fonts.ready) await document.fonts.ready;
  const coverCanvas=await html2canvas(wrapper.firstElementChild,{scale:2,backgroundColor:null,useCORS:true});
  const coverImg=coverCanvas.toDataURL('image/png');
  doc.setFillColor(8,22,51); doc.rect(0,0,pageW,pageH,'F');
  let ratio=Math.min((pageW-36)/coverCanvas.width,(pageH-36)/coverCanvas.height);
  doc.addImage(coverImg,'PNG',(pageW-coverCanvas.width*ratio)/2,18,coverCanvas.width*ratio,coverCanvas.height*ratio);
  wrapper.remove();
  for(const id of ['weightsChart','frontierChart','backtestChart','projectionChart','gbmChart']){
    const el=$(id); if(!el||!window.Plotly) continue;
    try{
      const srcW=1200, srcH=720;
      const imgUrl=await Plotly.toImage(el,{format:'png',width:srcW,height:srcH,scale:1});
      doc.addPage(); doc.setFillColor(8,22,51); doc.rect(0,0,pageW,pageH,'F');
      const maxW=pageW-48, maxH=pageH-120; const r=Math.min(maxW/srcW,maxH/srcH);
      doc.addImage(imgUrl,'PNG',(pageW-srcW*r)/2,70,srcW*r,srcH*r);
    }catch(e){ console.warn('Chart export skipped',id,e); }
  }
  doc.save('Veera_Portfolio_Optimizer_Report.pdf');
}


/* === v9 polish hotfix: no intro video, blank quiz/default views, suggestions overlay, smaller tips === */
initVeeraExperience = function(){
  const matrix=$('matrixCanvas'); if(matrix){ matrix.classList.add('hidden'); matrix.style.display='none'; }
  const skip=$('skipIntroBtn'); if(skip) skip.remove();
  const curtain=$('introVideoCurtain'); if(curtain) curtain.remove();
  const video=$('introVideo'); if(video){ try{ video.pause(); video.removeAttribute('src'); video.load?.(); }catch{} }
  const stage=$('introStage'); if(stage) stage.classList.add('poster-ready');
  const music=$('bgMusic'), musicBtn=$('musicToggleBtn');
  if(music){ music.volume=.28; music.muted=false; updateMusicButton(!music.paused); }
  musicBtn?.addEventListener('click',()=>{ if(!music) return; if(music.paused){ tryStartVeeraMusic(); } else { music.pause(); updateMusicButton(false); } });
};

renderQuiz = function(){
  const root=$('quizContainer'); if(!root) return;
  root.innerHTML=QUIZ.map((q,idx)=>`<div class="question-card"><h3>${idx+1}. ${q.text[state.lang]}</h3><div class="mcq-grid">${q.opts.map(([value,label])=>`<label class="mcq-option" tabindex="0"><input type="radio" name="${q.id}" value="${value}" data-section="${q.section}" autocomplete="off"/><span>${label[state.lang]}</span></label>`).join('')}</div></div>`).join('');
  root.querySelectorAll('.mcq-option').forEach(label=>label.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();label.querySelector('input').checked=true;label.querySelector('input').dispatchEvent(new Event('change',{bubbles:true}));}}));
};
resetQuiz = function(){
  QUIZ.forEach(q=>document.querySelectorAll(`input[name="${q.id}"]`).forEach(i=>{i.checked=false;}));
  state.riskScore=null; state.riskProfileKey='balanced'; state.riskProfileName=t('riskProfiles').balanced.name;
};
computeRiskProfile = function(){
  const val=(q)=>Number(document.querySelector(`input[name="${q}"]:checked`)?.value);
  const vals=['q1','q2','q3','q4','q5','q6'].map(val);
  if(vals.some(v=>!Number.isFinite(v))) throw new Error(state.lang==='vi'?'Bạn cần trả lời đủ 6 câu hỏi.':'Please answer all six questions.');
  const s1=vals[0]+vals[1], s2=vals[2]+vals[3], s3=vals[4]+vals[5];
  const score=(s1/8)*30+(s2/8)*40+(s3/8)*30;
  state.riskScore=score;
  state.riskProfileKey= score<40?'conservative':score<55?'moderateConservative':score<70?'balanced':score<85?'growth':'aggressive';
  state.riskProfileName=t('riskProfiles')[state.riskProfileKey].name;
};

// Do not prefill examples in any Black-Litterman field. Keep examples in tooltips/docs only, not input values.
renderBLViewsBuilder = function(){
  const box=$('blViewsBuilder'), rawInput=$('viewsInput'), hint=$('blViewsHint');
  if(!box || !rawInput) return;
  const tickers=currentTickerListForConfig();
  const existing={...(state.blViews||{})};
  if(!tickers.length){ box.innerHTML=''; rawInput.value=''; if(hint) hint.textContent=''; return; }
  box.innerHTML=tickers.map(s=>{
    const val=existing[s];
    return `<label class="bl-view-row"><strong>${s}:</strong><input class="bl-view-value" data-symbol="${s}" type="number" min="-1" max="1" step="0.01" placeholder="" value="${Number.isFinite(val)?val:''}" autocomplete="off" /></label>`;
  }).join('');
  box.querySelectorAll('.bl-view-value').forEach(inp=>inp.addEventListener('input',collectBLViewsFromBuilder));
  if(hint){
    hint.textContent=state.lang==='vi'
      ? 'Tùy chọn. Nhập số từ -1 đến +1 cho mã bạn có quan điểm riêng; để trống nếu không có quan điểm.'
      : 'Optional. Enter a number from -1 to +1 only for tickers where you have a view; leave blank if you have no view.';
  }
  collectBLViewsFromBuilder();
};

const __v9ApplyLanguageBase = applyLanguage;
applyLanguage = function(lang){
  __v9ApplyLanguageBase(lang);
  I18N.en['config.groupViewsCopy']='Optional investor views for Black-Litterman. Enter a number from -1 to +1 per ticker only when you have a real view; leave blank otherwise.';
  I18N.vi['config.groupViewsCopy']='Quan điểm nhà đầu tư cho Black-Litterman là tùy chọn. Chỉ nhập số từ -1 đến +1 cho mã bạn thật sự có quan điểm riêng; không có thì để trống.';
  I18N.en['tip.views']='Optional Black-Litterman views. Enter values between -1 and +1 for each ticker. Blank means no view for that ticker.';
  I18N.vi['tip.views']='Quan điểm Black-Litterman tùy chọn. Nhập giá trị từ -1 đến +1 cho từng mã. Để trống nghĩa là không có quan điểm riêng cho mã đó.';
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
  document.querySelectorAll('[data-tip-key]').forEach(el=>{el.dataset.tip=t(el.dataset.tipKey)});
  if($('viewsInput')) $('viewsInput').placeholder='';
};

const __v9BindStageBase = bindStageEvents;
bindStageEvents = function(){
  __v9BindStageBase();
  $('continueLanguageBtn')?.addEventListener('click',()=>{ resetQuiz(); renderQuiz(); });
  $('redoQuizBtn')?.addEventListener('click',()=>{ resetQuiz(); renderQuiz(); });
};

const __v9SelectMarketBase = selectMarket;
selectMarket = function(market){
  state.blViews={};
  __v9SelectMarketBase(market);
  if($('viewsInput')) $('viewsInput').value='';
  renderBLViewsBuilder();
};

const __v9SyncChipsBase = syncChips;
syncChips = function(){
  __v9SyncChipsBase();
  if($('viewsInput')) $('viewsInput').value='';
  state.blViews={};
  updateMaxWeightFeasibility(true);
  renderBLViewsBuilder();
};

// Make ticker suggestions escape panel stacking. Use fixed positioning while open.
renderSuggestions = function(rows){
  const box=$('tickerSuggestions'); const input=$('tickerSearchInput');
  if(!box || !input) return;
  if(!rows.length){box.classList.add('hidden'); return;}
  const rect=input.getBoundingClientRect();
  box.innerHTML=rows.map(r=>{const s=r.symbol||r[0], n=r.name||r[1]||'', ex=r.exchange||r[2]||'', type=r.type||r[3]||''; return `<div class="suggestion-item" data-symbol="${s}"><strong>${s}</strong><small>${n} • ${ex} • ${type}</small></div>`}).join('');
  box.classList.remove('hidden');
  box.classList.add('suggestions-floating');
  Object.assign(box.style,{position:'fixed',left:`${Math.max(8,rect.left)}px`,top:`${rect.bottom+6}px`,width:`${rect.width}px`,zIndex:'2147483000'});
  box.querySelectorAll('.suggestion-item').forEach(el=>el.addEventListener('click',()=>{const s=el.dataset.symbol;if(!state.selectedTickers.includes(s)) state.selectedTickers.push(s); syncChips(); box.classList.add('hidden'); $('tickerSearchInput').value=''}));
};
window.addEventListener('scroll',()=>{ const box=$('tickerSuggestions'); if(box) box.classList.add('hidden'); }, {passive:true});
window.addEventListener('resize',()=>{ const box=$('tickerSuggestions'); if(box) box.classList.add('hidden'); }, {passive:true});

// Ensure model text stays clean after language update.
I18N.en['pipeline.step2']='Step 2 — MPT Monte Carlo Weight Simulation';
I18N.vi['pipeline.step2']='Bước 2 — Mô phỏng Monte Carlo theo tỷ trọng MPT';

const __v9UpdateDynamicLanguageBase = updateDynamicLanguage;
updateDynamicLanguage = function(){
  __v9UpdateDynamicLanguageBase();
  if($('viewsInput')) $('viewsInput').placeholder='';
  if($('blViewsHint')) $('blViewsHint').textContent = state.lang==='vi'
    ? 'Tùy chọn. Nhập số từ -1 đến +1 cho mã bạn có quan điểm riêng; để trống nếu không có quan điểm.'
    : 'Optional. Enter a number from -1 to +1 only for tickers where you have a view; leave blank if you have no view.';
};

/* === v10 portability + UI final polish === */
(function(){
  // i18n additions
  I18N.en['common.back']='← Back';
  I18N.vi['common.back']='← Quay lại';
  I18N.en['models.copy']='Compare the available optimizers. Black-Litterman is disabled in this build to avoid unstable/invalid outputs.';
  I18N.vi['models.copy']='So sánh các mô hình tối ưu đang khả dụng. Black-Litterman đã được tắt trong bản này để tránh kết quả lỗi hoặc thiếu dữ liệu.';
  I18N.en.riskProfiles.aggressive.bullets = I18N.en.riskProfiles.aggressive.bullets.map(x=>x.replace('May use Black-Litterman or aggressive growth models when inputs are valid.','May use aggressive growth models, while still respecting IPS constraints.'));
  I18N.vi.riskProfiles.aggressive.bullets = I18N.vi.riskProfiles.aggressive.bullets.map(x=>x.replace('Có thể phù hợp với Black-Litterman hoặc mô hình tăng trưởng mạo hiểm nếu đầu vào hợp lệ.','Có thể phù hợp với mô hình tăng trưởng mạo hiểm nhưng vẫn phải giữ ràng buộc IPS.'));

  const endpointAliases = {
    '/.netlify/functions/usData':['/.netlify/functions/usData','/.netlify/functions/us-data','/api/usData','/api/us-data','/api/us'],
    '/.netlify/functions/us-data':['/.netlify/functions/us-data','/.netlify/functions/usData','/api/us-data','/api/usData','/api/us'],
    '/.netlify/functions/vnData':['/.netlify/functions/vnData','/.netlify/functions/vn-data','/api/vnData','/api/vn-data','/api/vn'],
    '/.netlify/functions/vn-data':['/.netlify/functions/vn-data','/.netlify/functions/vnData','/api/vn-data','/api/vnData','/api/vn'],
    '/.netlify/functions/fx':['/.netlify/functions/fx','/api/fx'],
    '/.netlify/functions/fundamentals':['/.netlify/functions/fundamentals','/api/fundamentals'],
    '/.netlify/functions/rates':['/.netlify/functions/rates','/api/rates']
  };
  apiGet = async function(path, params={}){
    const candidates = endpointAliases[path] || [path];
    const q = new URLSearchParams(params).toString();
    const errors=[];
    for(const base of candidates){
      const url=`${base}${q?'?'+q:''}`;
      try{
        const res=await fetch(url,{cache:'no-store'});
        const text=await res.text();
        if(!res.ok || /^\s*</.test(text)) throw new Error(`HTTP ${res.status}: ${text.slice(0,140)}`);
        return JSON.parse(text);
      }catch(e){ errors.push(`${base}: ${e.message}`); }
    }
    throw new Error(`${t('apiFail')} (${errors.join(' | ').slice(0,520)})`);
  };

  // Stage navigation and blank quiz on entry.
  const oldSetStage = setStage;
  setStage = function(id){
    oldSetStage(id);
    if(id==='quizStage'){
      setTimeout(()=>{ renderQuiz(); resetQuiz(); },0);
    }
    hideFloatingTip();
  };
  document.addEventListener('click', e=>{
    const btn=e.target.closest?.('.back-layer-btn');
    if(!btn) return;
    const target=btn.dataset.backTarget;
    if(target) setStage(target);
  });

  // Music: browsers may block autoplay before interaction, so we try immediately and then unlock on the first user gesture.
  const startMusicSoft=()=>{
    const music=$('bgMusic');
    if(!music) return;
    music.volume=.28; music.muted=false; music.autoplay=false; music.removeAttribute?.('autoplay');
    if(window.__veeraMusicAllowed!==true){ try{ music.pause(); }catch{} updateMusicButton(false); return; }
    music.play().then(()=>updateMusicButton(true)).catch(()=>updateMusicButton(false));
  };
  const oldInitVeeraExperience = initVeeraExperience;
  initVeeraExperience = function(){
    oldInitVeeraExperience();
    const stage=$('introStage'); if(stage) stage.classList.add('poster-ready');
    startMusicSoft();
    ['pointerdown','keydown','touchstart','click'].forEach(evt=>document.addEventListener(evt, startMusicSoft, {once:true, passive:true}));
  };

  // Do not preselect quiz answers or persist radio choices.
  renderQuiz = function(){
    const root=$('quizContainer'); if(!root) return;
    root.innerHTML=QUIZ.map((q,idx)=>`<div class="question-card"><h3>${idx+1}. ${q.text[state.lang]}</h3><div class="mcq-grid">${q.opts.map(([value,label])=>`<label class="mcq-option" tabindex="0"><input type="radio" name="${q.id}" value="${value}" data-section="${q.section}" autocomplete="off"/><span>${label[state.lang]}</span></label>`).join('')}</div></div>`).join('');
    root.querySelectorAll('input[type="radio"]').forEach(i=>{ i.checked=false; i.defaultChecked=false; });
    root.querySelectorAll('.mcq-option').forEach(label=>label.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const input=label.querySelector('input');input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));}}));
  };
  resetQuiz = function(){
    document.querySelectorAll('#quizContainer input[type="radio"]').forEach(i=>{ i.checked=false; i.defaultChecked=false; });
    state.riskScore=null;
    state.riskProfileKey='balanced';
    state.riskProfileName=t('riskProfiles').balanced.name;
  };
  computeRiskProfile = function(){
    const val=(q)=>Number(document.querySelector(`input[name="${q}"]:checked`)?.value);
    const vals=['q1','q2','q3','q4','q5','q6'].map(val);
    if(vals.some(v=>!Number.isFinite(v))) throw new Error(state.lang==='vi'?'Bạn cần trả lời đủ 6 câu hỏi.':'Please answer all six questions.');
    const s1=vals[0]+vals[1], s2=vals[2]+vals[3], s3=vals[4]+vals[5];
    const score=(s1/8)*30+(s2/8)*40+(s3/8)*30;
    state.riskScore=score;
    state.riskProfileKey= score<40?'conservative':score<55?'moderateConservative':score<70?'balanced':score<85?'growth':'aggressive';
    state.riskProfileName=t('riskProfiles')[state.riskProfileKey].name;
  };

  // Black-Litterman disabled from selectable/recommended model set.
  renderModelPolicyOptions = function(){
    const current=$('modelPolicyInput')?.value||'auto';
    const opts=[['auto',t('modelsPolicyAuto')],['minVol',t('minVol')],['maxSharpe',t('maxSharpe')],['riskParity',t('riskParity')],['cvar',t('cvar')],['highReturn',t('highReturn')],['equal',t('equal')]];
    if($('modelPolicyInput')) $('modelPolicyInput').innerHTML=opts.map(([v,l])=>`<option value="${v}" ${v===current?'selected':''}>${l}</option>`).join('');
  };
  selectModels = function(){
    const p=state.portfolios, n=state.symbols.length;
    const best=(fn)=>p.reduce((a,b)=>fn(b)>fn(a)?b:a);
    const min=(fn)=>p.reduce((a,b)=>fn(b)<fn(a)?b:a);
    const equal=portfolioStats(Array(n).fill(1/n),t('equal')); equal.key='equal';
    const minVol={...min(x=>x.risk),label:t('minVol'),key:'minVol'};
    const maxSharpe={...best(x=>x.sharpe),label:t('maxSharpe'),key:'maxSharpe'};
    const cvar={...min(x=>x.cvar),label:t('cvar'),key:'cvar'};
    const highReturn={...best(x=>x.return - 0.12*x.risk),label:t('highReturn'),key:'highReturn'};
    const rp=best(x=>-riskParityObjective(x.weights)); rp.label=t('riskParity'); rp.key='riskParity';
    state.models={equal,minVol,maxSharpe,cvar,riskParity:rp,highReturn};
    selectRecommendedFromPolicy();
    state.viewModelKey=state.recommendedKey;
  };
  selectRecommendedFromPolicy = function(){
    const policy=$('modelPolicyInput')?.value||'auto';
    if(policy!=='auto' && state.models[policy]){ state.recommendedKey=policy; return; }
    if(state.riskProfileKey==='conservative'||state.riskProfileKey==='moderateConservative') state.recommendedKey= state.models.cvar.cvar < state.models.minVol.cvar ? 'cvar':'minVol';
    else if(state.riskProfileKey==='balanced') state.recommendedKey='maxSharpe';
    else if(state.riskProfileKey==='growth') state.recommendedKey='highReturn';
    else state.recommendedKey='highReturn';
  };

  // Clean market selection without BL prefilled fields.
  selectMarket = function(market){
    const cfg=MARKET_CONFIG[market];
    state.market=market; state.localCurrency=cfg.localCurrency; state.currency=cfg.defaultCurrency;
    state.inputCapital=cfg.defaultCapital; state.capital=cfg.defaultCapital; state.bankRate=cfg.defaultRf;
    state.selectedTickers=[...cfg.defaultTickers]; state.benchmark=cfg.defaultBenchmark;
    $('tickerSearchInput').disabled=false; $('tickersInput').value=state.selectedTickers.join(', ');
    $('capitalInput').value=String(cfg.defaultCapital); $('currencyInput').value=cfg.defaultCurrency;
    $('bankRateInput').value=(cfg.defaultRf*100).toFixed(2);
    renderBenchmarkOptions(); renderRateOptions(); renderModelPolicyOptions(); syncChips();
    updateSidebarLabels(); updateCurrencyNote();
    setStatus(state.lang==='vi'?`Đã chọn thị trường ${cfg.label.vi}. Hãy chạy tối ưu danh mục.`:`Market selected: ${cfg.label.en}. Run the optimizer when ready.`,'ok');
    fetchFxRate().catch(()=>{});
  };

  // Suggestions stay directly below the typer, while remaining above following panels.
  renderSuggestions = function(rows){
    const box=$('tickerSuggestions'); const input=$('tickerSearchInput'); const parent=input?.closest('.search-box');
    if(!box || !input || !parent) return;
    if(!rows.length){ box.classList.add('hidden'); return; }
    const query=cleanSymbol(input.value);
    const cleanRows=rows.filter(r=>cleanSymbol(r.symbol||r[0]).startsWith(query)).slice(0,12);
    if(!cleanRows.length){ box.classList.add('hidden'); return; }
    box.innerHTML=cleanRows.map(r=>{const s=r.symbol||r[0], n=r.name||r[1]||'', ex=r.exchange||r[2]||'', type=r.type||r[3]||''; return `<div class="suggestion-item" data-symbol="${s}"><strong>${s}</strong><small>${n} • ${ex} • ${type}</small></div>`}).join('');
    const top=input.offsetTop+input.offsetHeight+6;
    Object.assign(box.style,{position:'absolute',left:`${input.offsetLeft}px`,top:`${top}px`,width:`${input.offsetWidth}px`,zIndex:'2147483647'});
    box.classList.remove('hidden'); box.classList.remove('suggestions-floating'); parent.classList.add('suggestions-open');
    box.querySelectorAll('.suggestion-item').forEach(el=>el.addEventListener('click',()=>{const s=el.dataset.symbol;if(!state.selectedTickers.includes(s)) state.selectedTickers.push(s); syncChips(); box.classList.add('hidden'); parent.classList.remove('suggestions-open'); input.value='';}));
  };

  // Broader US search: backend first, then a larger local universe; only prefix matches are shown.
  const EXTRA_US_TICKERS=[
    ['ABNB','Airbnb Inc.','NASDAQ','Equity'],['ADBE','Adobe Inc.','NASDAQ','Equity'],['ADI','Analog Devices','NASDAQ','Equity'],['ADP','Automatic Data Processing','NASDAQ','Equity'],['AEP','American Electric Power','NASDAQ','Equity'],['AIG','American International Group','NYSE','Equity'],['AMAT','Applied Materials','NASDAQ','Equity'],['ANET','Arista Networks','NYSE','Equity'],['APD','Air Products and Chemicals','NYSE','Equity'],['APH','Amphenol','NYSE','Equity'],['APO','Apollo Global Management','NYSE','Equity'],['APP','AppLovin','NASDAQ','Equity'],['ARM','Arm Holdings','NASDAQ','Equity'],['ASML','ASML Holding','NASDAQ','Equity'],['AXP','American Express','NYSE','Equity'],
    ['BA','Boeing','NYSE','Equity'],['BABA','Alibaba','NYSE','Equity'],['BBY','Best Buy','NYSE','Equity'],['BK','Bank of New York Mellon','NYSE','Equity'],['BKNG','Booking Holdings','NASDAQ','Equity'],['BLK','BlackRock','NYSE','Equity'],['BMY','Bristol Myers Squibb','NYSE','Equity'],['BRK-B','Berkshire Hathaway Class B','NYSE','Equity'],
    ['CAT','Caterpillar','NYSE','Equity'],['CMCSA','Comcast','NASDAQ','Equity'],['COIN','Coinbase','NASDAQ','Equity'],['CRM','Salesforce','NYSE','Equity'],['CRWD','CrowdStrike','NASDAQ','Equity'],['CSCO','Cisco','NASDAQ','Equity'],['CVS','CVS Health','NYSE','Equity'],
    ['DIS','Walt Disney','NYSE','Equity'],['DKNG','DraftKings','NASDAQ','Equity'],['DUK','Duke Energy','NYSE','Equity'],
    ['GE','GE Aerospace','NYSE','Equity'],['GM','General Motors','NYSE','Equity'],['GS','Goldman Sachs','NYSE','Equity'],
    ['HD','Home Depot','NYSE','Equity'],['HON','Honeywell','NASDAQ','Equity'],
    ['IBM','IBM','NYSE','Equity'],['INTC','Intel','NASDAQ','Equity'],['INTU','Intuit','NASDAQ','Equity'],
    ['LLY','Eli Lilly','NYSE','Equity'],['LOW','Lowe’s','NYSE','Equity'],['LULU','Lululemon','NASDAQ','Equity'],
    ['MCD','McDonald’s','NYSE','Equity'],['MDT','Medtronic','NYSE','Equity'],['MELI','MercadoLibre','NASDAQ','Equity'],['MRK','Merck','NYSE','Equity'],['MU','Micron','NASDAQ','Equity'],
    ['NEM','Newmont','NYSE','Equity'],['NKE','Nike','NYSE','Equity'],['NFLX','Netflix','NASDAQ','Equity'],['NOW','ServiceNow','NYSE','Equity'],
    ['ORCL','Oracle','NYSE','Equity'],['PANW','Palo Alto Networks','NASDAQ','Equity'],['PFE','Pfizer','NYSE','Equity'],['PLTR','Palantir','NASDAQ','Equity'],['PYPL','PayPal','NASDAQ','Equity'],
    ['SBUX','Starbucks','NASDAQ','Equity'],['SHOP','Shopify','NYSE','Equity'],['SNOW','Snowflake','NYSE','Equity'],['SO','Southern Company','NYSE','Equity'],
    ['T','AT&T','NYSE','Equity'],['TMUS','T-Mobile US','NASDAQ','Equity'],['UBER','Uber Technologies','NYSE','Equity'],['UPS','United Parcel Service','NYSE','Equity'],
    ['WFC','Wells Fargo','NYSE','Equity'],['XYZ','Block Inc.','NYSE','Equity'],['ZS','Zscaler','NASDAQ','Equity']
  ];
  searchLocalTickers = function(q){
    q=String(q||'').trim().toUpperCase(); if(!q||!state.market) return [];
    const base=[...MARKET_CONFIG[state.market].tickers];
    if(state.market==='US') base.push(...EXTRA_US_TICKERS);
    return base.filter(([s])=>cleanSymbol(s).startsWith(q)).map(([symbol,name,exchange,type])=>({symbol,name,exchange,type})).slice(0,14);
  };
  searchTickers = async function(q){
    const query=String(q||'').trim().toUpperCase(); if(!query||!state.market) return [];
    const local=searchLocalTickers(query);
    if(state.market==='US'){
      try{
        const d=await apiGet('/.netlify/functions/usData',{action:'search',q:query});
        const rows=(d.results||[]).filter(x=>cleanSymbol(x.symbol).startsWith(query));
        const seen=new Set();
        return [...rows,...local].filter(r=>{const s=cleanSymbol(r.symbol); if(seen.has(s)) return false; seen.add(s); return true;}).slice(0,14);
      }catch(e){ console.warn(e.message); }
    }
    return local;
  };

  // Use selected analysis window in data retrieval and friendlier error wording.
  runAnalysis = async function(){
    try{
      if(!state.market) throw new Error('Market is missing.');
      updateCurrencyNote();
      state.selectedTickers=parseTickers($('tickersInput').value);
      state.benchmark=$('benchmarkInput').value;
      state.maxWeight=Number($('maxWeightInput').value)/100;
      state.bankRate=Number($('bankRateInput').value)/100;
      const years=Number($('yearsInput').value)||5;
      if(state.selectedTickers.length<2) throw new Error(state.lang==='vi'?'Cần ít nhất 2 mã cổ phiếu để tối ưu.':'At least 2 tickers are required.');
      if(state.selectedTickers.length*state.maxWeight<0.999) throw new Error(state.lang==='vi'?`Ràng buộc không khả thi: ${state.selectedTickers.length} mã × ${pct(state.maxWeight,0)} < 100%.`:`Infeasible constraint: ${state.selectedTickers.length} assets × ${pct(state.maxWeight,0)} < 100%.`);
      setProgress(5,state.lang==='vi'?'Đang chuẩn bị dữ liệu...':'Preparing data...');
      await fetchFxRate(); setProgress(20,state.lang==='vi'?'Đang tải tỷ giá và dữ liệu giá...':'Loading FX and price data...');
      const endpoint=state.market==='US'?'/.netlify/functions/usData':'/.netlify/functions/vnData';
      const data=await apiGet(endpoint,{symbols:state.selectedTickers.join(','),benchmark:state.benchmark,years});
      if(!data.ok){ const detail=data.errors?Object.entries(data.errors).map(([k,v])=>`${k}: ${String(v).slice(0,240)}`).join(' | '):''; throw new Error(data.error || detail || 'Data adapter failed.'); }
      state.prices=data.prices||{}; state.quotes=data.quotes||{}; state.errors=data.errors||{}; state.warnings=data.warnings||[];
      const missing=state.selectedTickers.filter(s=>!state.prices[s] || state.prices[s].length<30);
      if(missing.length) throw new Error(state.lang==='vi'?`Không load được dữ liệu của mã ${missing.join(', ')} trong giai đoạn ${years} năm. Hãy chọn mã khác hoặc điều chỉnh thời gian.`:`Could not load data for ${missing.join(', ')} over ${years} years. Choose another ticker or adjust the analysis window.`);
      if(!state.prices[state.benchmark] || state.prices[state.benchmark].length<30) throw new Error(state.lang==='vi'?`Không load được dữ liệu của benchmark ${state.benchmark} trong giai đoạn ${years} năm. Hãy chọn benchmark khác hoặc điều chỉnh thời gian.`:`Could not load benchmark data for ${state.benchmark} over ${years} years. Choose another benchmark or adjust the window.`);
      setProgress(52,state.lang==='vi'?'Đang tải dữ liệu nền tảng...':'Loading fundamentals...');
      const fund=await apiGet('/.netlify/functions/fundamentals',{symbols:state.selectedTickers.join(','),market:state.market}).catch(()=>({data:{}}));
      state.fundamentals=fund.data||{};
      if (fund.warnings && fund.warnings.length) {
        state.warnings = state.warnings.concat(fund.warnings);
      }
      setProgress(72,state.lang==='vi'?'Đang chuẩn hóa giá và tính ma trận...':'Normalizing prices and computing matrices...');
      normalizeAndCompute();
      setProgress(88,state.lang==='vi'?'Đang chạy mô phỏng Monte Carlo...':'Running Monte Carlo simulation...');
      optimizeAndRender();
      setProgress(100,state.lang==='vi'?'Hoàn tất.':'Complete.');
      let statusMsg = `${t('complete')} ${t('noFake')}`;
      if (state.warnings && state.warnings.length) {
        const priceTickers = [];
        const fundTickers = [];
        const otherWarnings = [];
        state.warnings.forEach(w => {
          const matchPrice = w.match(/dữ liệu backup từ tệp \.csv cho mã ([A-Z0-9.^=-]+)/i);
          const matchFund = w.match(/dữ liệu nền tảng backup từ tệp \.csv cho mã ([A-Z0-9.^=-]+)/i);
          if (matchFund) {
            fundTickers.push(matchFund[1]);
          } else if (matchPrice) {
            priceTickers.push(matchPrice[1]);
          } else {
            if (!w.includes("Vietnam data uses live public adapters")) {
              otherWarnings.push(w);
            }
          }
        });
        
        const uniqPrice = [...new Set(priceTickers)];
        const uniqFund = [...new Set(fundTickers)];
        const summaries = [];
        if (uniqPrice.length) {
          if (state.lang === 'vi') {
            summaries.push(`đã dùng .csv cho giá ${uniqPrice.join(', ')}`);
          } else {
            summaries.push(`used CSV for prices of ${uniqPrice.join(', ')}`);
          }
        }
        if (uniqFund.length) {
          if (state.lang === 'vi') {
            summaries.push(`đã dùng .csv cho nền tảng ${uniqFund.join(', ')}`);
          } else {
            summaries.push(`used CSV for fundamentals of ${uniqFund.join(', ')}`);
          }
        }
        
        const finalWarnings = [...summaries, ...otherWarnings];
        if (finalWarnings.length) {
          statusMsg += ` | ${state.lang === 'vi' ? 'Cảnh báo' : 'Warning'}: ${finalWarnings.join(' | ')}`;
        }
      }
      setStatus(statusMsg,'ok');
      setTimeout(clearProgress,950);
    }catch(e){
      console.error(e);
      clearProgress();
      setStatus(`${state.lang==='vi'?'Lỗi':'Error'}: ${e.message}`,'err');
    }
  };

  // Ensure dynamic language doesn't mention BL inputs that are gone.
  const oldUpdateDynamicLanguageV10 = updateDynamicLanguage;
  updateDynamicLanguage = function(){
    oldUpdateDynamicLanguageV10();
    document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent=t(el.dataset.i18n); });
  };
})();


/* === v11 stability layer: no prefilled answers, portal autocomplete, back buttons, static fallback APIs === */
(function(){
  const V11_VERSION='11.0.0';
  const qs = (sel, root=document) => root.querySelector(sel);

  function ensureBackButtons(){
    const map={languageStage:'introStage',quizStage:'languageStage',riskResultStage:'quizStage',marketStage:'riskResultStage',dashboardStage:'marketStage'};
    Object.entries(map).forEach(([stageId,target])=>{
      const stage=$(stageId); if(!stage || qs('.back-layer-btn',stage)) return;
      const btn=document.createElement('button');
      btn.type='button'; btn.className='back-layer-btn'; btn.dataset.backTarget=target;
      btn.textContent=t('common.back') || (state.lang==='vi'?'← Quay lại':'← Back');
      stage.appendChild(btn);
    });
  }
  const oldApplyLanguageV11 = applyLanguage;
  applyLanguage=function(lang){
    oldApplyLanguageV11(lang);
    ensureBackButtons();
    document.querySelectorAll('.back-layer-btn').forEach(btn=>btn.textContent=t('common.back') || (state.lang==='vi'?'← Quay lại':'← Back'));
    searchTickers=async function(q){
    const query=String(q||'').trim().toUpperCase(); if(!query||!state.market) return [];
    const local=searchLocalTickers(query);
    let remote=[];
    try{
    if(state.market==='US'){
    const d=await apiGet('/api/us-data',{action:'search',q:query});
    if(d && d.results) remote=d.results;
    } else if(state.market==='VN'){
    const d=await apiGet('/api/vn-data',{action:'search',q:query});
    if(d && d.results) remote=d.results;
    }
    }catch(e){
    console.warn("Dynamic search failed, using local suggestions:", e);
    }
    const seen=new Set();
    const combined=[];
    for(const r of [...remote,...local]){
    const s=cleanSymbol(r.symbol||r[0]);
    if(!s||seen.has(s)) continue;
    seen.add(s);
    combined.push(r);
    }
    return combined.slice(0,16);
    };
  };
  const oldSetStageV11 = setStage;
  setStage=function(id){
    oldSetStageV11(id);
    ensureBackButtons();
    if(id==='quizStage'){ setTimeout(()=>{ renderQuiz(); resetQuiz(); },0); }
    closeTickerPortal();
  };
  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('.back-layer-btn');
    if(btn && btn.dataset.backTarget){ e.preventDefault(); setStage(btn.dataset.backTarget); }
  },true);

  // Stronger landing-title gradient in case inherited styles override text fill.
  function forceHeroGradient(){
    const gradient='linear-gradient(135deg,#5BEBE8 0%,#76F2EF 46%,#A9EEEB 100%)';
    document.querySelectorAll('#introStage .ref-mix-title .title-line').forEach(line=>{
      line.style.setProperty('background',gradient,'important');
      line.style.setProperty('background-image',gradient,'important');
      line.style.setProperty('-webkit-background-clip','text','important');
      line.style.setProperty('background-clip','text','important');
      line.style.setProperty('-webkit-text-fill-color','transparent','important');
      line.style.setProperty('color','transparent','important');
    });
  }

  // Audio: try instantly, and guarantee retry on the first real user gesture such as Experience Now.
  function veeraStartMusic(){
    const music=$('bgMusic'); if(!music) return Promise.resolve(false);
    music.volume=.32; music.muted=false; music.autoplay=false; music.removeAttribute?.('autoplay');
    if(window.__veeraMusicAllowed!==true){ try{ music.pause(); }catch{} updateMusicButton(false); return Promise.resolve(false); }
    return music.play().then(()=>{ updateMusicButton(true); return true; }).catch(()=>{ updateMusicButton(false); return false; });
  }
  const oldInitVeeraExperienceV11 = initVeeraExperience;
  initVeeraExperience=function(){
    oldInitVeeraExperienceV11();
    forceHeroGradient();
    veeraStartMusic();
    const unlock=()=>veeraStartMusic();
    ['pointerdown','mousedown','touchstart','keydown','click'].forEach(evt=>document.addEventListener(evt,unlock,{once:true,passive:true,capture:true}));
    $('experienceBtn')?.addEventListener('click',unlock,{capture:true});
  };

  // Always render quiz with no default answer.
  renderQuiz=function(){
    const root=$('quizContainer'); if(!root) return;
    root.innerHTML=QUIZ.map((q,idx)=>`<div class="question-card"><h3>${idx+1}. ${q.text[state.lang]}</h3><div class="mcq-grid">${q.opts.map(([value,label])=>`<label class="mcq-option" tabindex="0"><input type="radio" name="${q.id}" value="${value}" data-section="${q.section}" autocomplete="off"/><span>${label[state.lang]}</span></label>`).join('')}</div></div>`).join('');
    root.querySelectorAll('input[type="radio"]').forEach(i=>{ i.checked=false; i.defaultChecked=false; i.removeAttribute('checked'); });
    root.querySelectorAll('.mcq-option').forEach(label=>label.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); const input=label.querySelector('input'); input.checked=true; input.dispatchEvent(new Event('change',{bubbles:true})); } }));
  };
  resetQuiz=function(){
    document.querySelectorAll('#quizContainer input[type="radio"]').forEach(i=>{ i.checked=false; i.defaultChecked=false; i.removeAttribute('checked'); });
    state.riskScore=null; state.riskProfileKey='balanced'; state.riskProfileName=t('riskProfiles').balanced.name;
  };

  // Stable ticker autocomplete portal. It stays below the input, has a very high z-index, and only closes on outside click/selection/Escape/clear.
  searchLocalTickers=function(q){
    const query=String(q||'').trim().toUpperCase(); if(!query||!state.market) return [];
    const tickers=MARKET_CONFIG[state.market].tickers || [];
    const matches=[];
    for(const [symbol,name,exchange,type] of tickers){
      const sUpper=symbol.toUpperCase();
      const nUpper=name.toUpperCase();
      if(sUpper.startsWith(query)){
        matches.push({symbol,name,exchange,type,rank:1});
      } else if(sUpper.includes(query)){
        matches.push({symbol,name,exchange,type,rank:2});
      } else if(nUpper.includes(query)){
        matches.push({symbol,name,exchange,type,rank:3});
      }
    }
    if(state.market==='US'){
      for(const [symbol,name,exchange,type] of V11_EXTRA_US){
        const sUpper=symbol.toUpperCase();
        const nUpper=name.toUpperCase();
        if(sUpper.startsWith(query)){
          matches.push({symbol,name,exchange,type,rank:1});
        } else if(sUpper.includes(query)){
          matches.push({symbol,name,exchange,type,rank:2});
        } else if(nUpper.includes(query)){
          matches.push({symbol,name,exchange,type,rank:3});
        }
      }
    }
    matches.sort((a,b)=>{
      if(a.rank!==b.rank) return a.rank-b.rank;
      if(a.symbol.length!==b.symbol.length) return a.symbol.length-b.symbol.length;
      return a.symbol.localeCompare(b.symbol);
    });
    const seen=new Set();
    const out=[];
    for(const r of matches){
      const s=cleanSymbol(r.symbol);
      if(seen.has(s)) continue;
      seen.add(s);
      out.push(r);
    }
    return out.slice(0,16);
  };
  searchTickers=async function(q){
    const query=String(q||'').trim().toUpperCase(); if(!query||!state.market) return [];
    const local=searchLocalTickers(query);
    let remote=[];
    try{
      if(state.market==='US'){
        const d=await apiGet('/api/us-data',{action:'search',q:query});
        if(d && d.results) remote=d.results;
      } else if(state.market==='VN'){
        const d=await apiGet('/api/vn-data',{action:'search',q:query});
        if(d && d.results) remote=d.results;
      }
    }catch(e){
      console.warn("Dynamic search failed, using local suggestions:", e);
    }
    const seen=new Set();
    const combined=[];
    for(const r of [...remote,...local]){
      const s=cleanSymbol(r.symbol||r[0]);
      if(!s||seen.has(s)) continue;
      seen.add(s);
      combined.push(r);
    }
    return combined.slice(0,16);
  };

  let suggestTimer=null, suggestSeq=0, lastSuggestRows=[];
  function portal(){
    let p=document.getElementById('veeraTickerSuggestPortal');
    if(!p){
      p=document.createElement('div');
      p.id='veeraTickerSuggestPortal';
      p.className='veera-suggest-portal hidden';
      document.body.appendChild(p);
    }
    return p;
  }
  function positionTickerPortal(){
    const p=portal(), input=$('tickerSearchInput');
    if(!input || p.classList.contains('hidden')) return;
    const rect=input.getBoundingClientRect();
    const gap=7;
    const width=Math.max(280,rect.width);
    const left=Math.min(Math.max(8,rect.left),window.innerWidth-width-8);
    const maxH=Math.max(220,window.innerHeight-rect.bottom-22);
    Object.assign(p.style,{left:`${left}px`,top:`${rect.bottom+gap}px`,width:`${width}px`,maxHeight:`${Math.min(390,maxH)}px`});
  }
  function closeTickerPortal(){ portal().classList.add('hidden'); }
  renderSuggestions=function(rows){
    const input=$('tickerSearchInput'), p=portal();
    if(!input) return;
    const query=cleanSymbol(input.value);
    if(!query){ closeTickerPortal(); return; }
    const cleanRows=(rows||[]).filter(r=>{
const s=cleanSymbol(r.symbol||r[0]);
const n=String(r.name||r[1]||'').trim().toUpperCase();
return s.includes(query) || n.includes(query);
});
    const seen=new Set(), out=[];
    for(const r of cleanRows){
      const s=cleanSymbol(r.symbol||r[0]);
      if(!s || seen.has(s)) continue;
      seen.add(s); out.push(r); if(out.length>=14) break;
    }
    if(!out.length){ closeTickerPortal(); return; }
    lastSuggestRows=out;
    p.innerHTML=out.map(r=>{const s=r.symbol||r[0], n=r.name||r[1]||'', ex=r.exchange||r[2]||'', type=r.type||r[3]||''; return `<div class="suggestion-item" data-symbol="${s}"><strong>${s}</strong><small>${n} • ${ex} • ${type}</small></div>`}).join('');
    p.classList.remove('hidden');
    positionTickerPortal();
    p.querySelectorAll('.suggestion-item').forEach(el=>el.addEventListener('pointerdown',e=>{
      e.preventDefault();
      const s=cleanSymbol(el.dataset.symbol);
      if(s && !state.selectedTickers.includes(s)) state.selectedTickers.push(s);
      syncChips();
      $('tickerSearchInput').value='';
      closeTickerPortal();
    }));
  };
  async function stableSuggest(q, token){
    const query=String(q||'').trim().toUpperCase();
    if(!query){ closeTickerPortal(); return; }
    const rows=await searchTickers(query).catch(()=>searchLocalTickers(query));
    if(token!==suggestSeq) return;
    renderSuggestions(rows);
  }
  function bindStableTickerInput(){
    const input=$('tickerSearchInput'); if(!input || input.dataset.v11Bound) return;
    input.dataset.v11Bound='1';
    input.addEventListener('input',()=>{
      const token=++suggestSeq;
      clearTimeout(suggestTimer);
      suggestTimer=setTimeout(()=>stableSuggest(input.value,token),140);
    },true);
    input.addEventListener('focus',()=>{ if(cleanSymbol(input.value)) renderSuggestions(lastSuggestRows.length?lastSuggestRows:searchLocalTickers(input.value)); });
    input.addEventListener('keydown',e=>{ if(e.key==='Escape') closeTickerPortal(); });
    document.addEventListener('pointerdown',e=>{ if(e.target===input || e.target.closest?.('#veeraTickerSuggestPortal')) return; closeTickerPortal(); },true);
    window.addEventListener('scroll',positionTickerPortal,{passive:true});
    window.addEventListener('resize',positionTickerPortal,{passive:true});
  }
  const oldBindDashboardEventsV11 = bindDashboardEvents;
  bindDashboardEvents=function(){ oldBindDashboardEventsV11(); bindStableTickerInput(); };

  // Better local US universe and symbol aliases. Prefix-only search remains enforced.
  const V11_EXTRA_US=[
    ['GOOG','Alphabet Inc. Class C','NASDAQ','Equity'],['GOOGL','Alphabet Inc. Class A','NASDAQ','Equity'],['GE','GE Aerospace','NYSE','Equity'],['GILD','Gilead Sciences','NASDAQ','Equity'],['GM','General Motors','NYSE','Equity'],['GME','GameStop','NYSE','Equity'],['GNRC','Generac Holdings','NYSE','Equity'],['GPN','Global Payments','NYSE','Equity'],['GS','Goldman Sachs','NYSE','Equity'],['GWW','W.W. Grainger','NYSE','Equity'],
    ['A','Agilent Technologies','NYSE','Equity'],['AA','Alcoa','NYSE','Equity'],['AAP','Advance Auto Parts','NYSE','Equity'],['APX','Appen Ltd ADR/Proxy','US','Equity'],['ABC','AmerisourceBergen / Cencora legacy','NYSE','Equity'],
    ['ON','ON Semiconductor','NASDAQ','Equity'],['OXY','Occidental Petroleum','NYSE','Equity'],['ONON','On Holding','NYSE','Equity']
  ];
  const baseSearchLocalV11 = searchLocalTickers;
  searchLocalTickers=function(q){
    const query=String(q||'').trim().toUpperCase(); if(!query||!state.market) return [];
    const rows=[...baseSearchLocalV11(query)];
    if(state.market==='US') rows.push(...V11_EXTRA_US.filter(([s])=>cleanSymbol(s).startsWith(query)).map(([symbol,name,exchange,type])=>({symbol,name,exchange,type})));
    const seen=new Set();
    return rows.filter(r=>{const s=cleanSymbol(r.symbol); if(!s.startsWith(query)||seen.has(s)) return false; seen.add(s); return true;}).slice(0,16);
  };
  const baseSearchTickersV11 = searchTickers;
  searchTickers=async function(q){
    const query=String(q||'').trim().toUpperCase(); if(!query||!state.market) return [];
    const local=searchLocalTickers(query);
    let remote=[];
    if(state.market==='US'){
      try{ remote=await baseSearchTickersV11(query); }catch(e){ remote=[]; }
    }
    const seen=new Set();
    return [...remote,...local]
      .filter(r=>{const s=cleanSymbol(r.symbol||r[0]); if(!s.startsWith(query)||seen.has(s)) return false; seen.add(s); return true;})
      .slice(0,16);
  };

  // Static-host client fallbacks: GitHub Pages has no serverless, so US price retrieval can use open Stooq CSV directly when CORS allows it.
  function parseCsvLineV11(line){ const out=[]; let cur='', q=false; for(let i=0;i<line.length;i++){ const ch=line[i]; if(ch==='"') q=!q; else if(ch===','&&!q){ out.push(cur); cur=''; } else cur+=ch; } out.push(cur); return out; }
  function stooqSymbolV11(symbol){ const s=cleanSymbol(symbol).replace('^','').replace('-','.'); const known={GSPC:'^spx',DJI:'dji.us',IXIC:'ndq.us',SPY:'spy.us',QQQ:'qqq.us',DIA:'dia.us'}; return known[s] || `${s.toLowerCase()}.us`; }
  function parseStooqCsvV11(symbol,text,years){
    const lines=String(text||'').trim().split(/\r?\n/).filter(Boolean);
    if(lines.length<3 || /^No data/i.test(lines[0])) throw new Error(`No Stooq data for ${symbol}`);
    const headers=parseCsvLineV11(lines[0]).map(x=>x.toLowerCase());
    const dateIdx=headers.indexOf('date'), openIdx=headers.indexOf('open'), highIdx=headers.indexOf('high'), lowIdx=headers.indexOf('low'), closeIdx=headers.indexOf('close'), volIdx=headers.indexOf('volume');
    let rows=lines.slice(1).map(line=>{const c=parseCsvLineV11(line); const close=Number(c[closeIdx]); return c[dateIdx]&&Number.isFinite(close)&&close>0?{date:c[dateIdx],open:Number(c[openIdx])||null,high:Number(c[highIdx])||null,low:Number(c[lowIdx])||null,close,adjClose:close,volume:Number(c[volIdx])||null,adjusted:false}:null;}).filter(Boolean);
    const last=new Date(rows[rows.length-1]?.date||Date.now()); const cutoff=new Date(last); cutoff.setFullYear(cutoff.getFullYear()-Math.max(1,Number(years)||5));
    rows=rows.filter(r=>new Date(r.date)>=cutoff);
    if(rows.length<20) throw new Error(`Too few Stooq rows for ${symbol}`);
    return rows;
  }
  async function clientStooqHistory(symbol,years){
    const url=`https://stooq.com/q/d/l/?s=${encodeURIComponent(stooqSymbolV11(symbol))}&i=d`;
    const res=await fetch(url,{cache:'no-store'}); if(!res.ok) throw new Error(`Stooq HTTP ${res.status}`);
    return parseStooqCsvV11(symbol,await res.text(),years);
  }
  async function clientUsData(params){
    if(params.action==='search') return {ok:true,results:searchLocalTickers(params.q||''),source:'Local ticker universe'};
    const symbols=[...new Set(String(params.symbols||'').split(',').map(cleanSymbol).filter(Boolean))]; const benchmark=cleanSymbol(params.benchmark||'SPY'); const years=Number(params.years)||5;
    const all=[...new Set([...symbols,benchmark])]; const prices={}, errors={}, source={}, quotes={};
    await Promise.all(all.map(async s=>{ try{ prices[s]=await clientStooqHistory(s,years); source[s]='Stooq open CSV client fallback'; quotes[s]={symbol:s,name:s,currency:'USD'}; }catch(e){ errors[s]=e.message; } }));
    return {ok:symbols.every(s=>prices[s]) && Boolean(prices[benchmark]),market:'US',symbols,benchmark,prices,quotes,errors,source,warnings:['Static-host client fallback used. No synthetic prices generated.'],generatedAt:new Date().toISOString()};
  }
  async function clientFxData(){
    const out={ok:false,rate:null,history:[]};
    try{ const r=await fetch('https://open.er-api.com/v6/latest/USD',{cache:'no-store'}); const j=await r.json(); if(j?.rates?.VND){ out.ok=true; out.rate=Number(j.rates.VND); out.source='open.er-api.com client fallback'; } }catch(e){}
    return out;
  }
  const baseApiGetV11 = apiGet;
  apiGet=async function(path,params={}){
    try{ return await baseApiGetV11(path,params); }
    catch(err){
      const isUs=['/.netlify/functions/usData','/.netlify/functions/us-data','/api/usData','/api/us-data','/api/us'].includes(path);
      const isFx=['/.netlify/functions/fx','/api/fx'].includes(path);
      const isRates=['/.netlify/functions/rates','/api/rates'].includes(path);
      const isFund=['/.netlify/functions/fundamentals','/api/fundamentals'].includes(path);
      if(isUs) return clientUsData(params);
      if(isFx) return clientFxData();
      if(isRates) return {ok:true,US:MARKET_CONFIG.US.ratePresets,VN:MARKET_CONFIG.VN.ratePresets,source:'client static defaults'};
      if(isFund) return {ok:true,data:{},warnings:['No open statement API available from static client. Showing Data not available instead of fabricated metrics.']};
      throw err;
    }
  };

  // Initialize v11 DOM helpers after load too, because earlier init may have already fired in some environments.
  window.addEventListener('DOMContentLoaded',()=>{ ensureBackButtons(); forceHeroGradient(); bindStableTickerInput(); setTimeout(()=>{renderQuiz(); resetQuiz();},0); veeraStartMusic(); });
})();


/* === v17: music must start ONLY from the music icon === */
(function(){
  window.__veeraMusicAllowed = false;
  function setMusicButtonState(on){
    const btn=document.getElementById('musicToggleBtn');
    if(!btn) return;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.textContent='♪';
    btn.title = on ? 'Turn music off' : 'Turn music on';
    btn.setAttribute('aria-label', btn.title);
  }
  function installManualMusicOnly(){
    const music=document.getElementById('bgMusic');
    const oldBtn=document.getElementById('musicToggleBtn');
    if(!music || !oldBtn) return;
    try{ music.pause(); }catch{}
    music.autoplay=false;
    music.removeAttribute('autoplay');
    music.preload='none';
    music.muted=false;
    music.volume=.32;
    window.__veeraMusicAllowed=false;
    setMusicButtonState(false);

    const btn=oldBtn.cloneNode(true);
    oldBtn.replaceWith(btn);
    btn.addEventListener('click', async (event)=>{
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if(music.paused){
        window.__veeraMusicAllowed=true;
        music.muted=false;
        music.volume=.32;
        try{
          await music.play();
          setMusicButtonState(true);
        }catch(_){
          window.__veeraMusicAllowed=false;
          setMusicButtonState(false);
        }
      }else{
        window.__veeraMusicAllowed=false;
        try{ music.pause(); }catch{}
        setMusicButtonState(false);
      }
    }, {capture:true});
  }
  if(document.readyState === 'loading'){
    window.addEventListener('DOMContentLoaded',()=>setTimeout(installManualMusicOnly,0));
  }else{
    setTimeout(installManualMusicOnly,0);
  }
})();


/* === v18: hard override hero title to Experience Now cyan gradient === */
(function(){
  function applyExperienceNowTitleGradient(){
    const gradient='linear-gradient(135deg,#5BEBE8 0%,#76F2EF 46%,#A9EEEB 100%)';
    document.querySelectorAll('#introStage .ref-mix-title .title-line').forEach(line=>{
      line.style.setProperty('background',gradient,'important');
      line.style.setProperty('background-image',gradient,'important');
      line.style.setProperty('background-size','100% 100%','important');
      line.style.setProperty('-webkit-background-clip','text','important');
      line.style.setProperty('background-clip','text','important');
      line.style.setProperty('-webkit-text-fill-color','transparent','important');
      line.style.setProperty('color','transparent','important');
    });
  }
  if(document.readyState === 'loading'){
    window.addEventListener('DOMContentLoaded',()=>setTimeout(applyExperienceNowTitleGradient,0));
  }else{
    setTimeout(applyExperienceNowTitleGradient,0);
  }
})();


/* === v19: hard override title to the provided screenshot gradient === */
(function(){
  function applyScreenshotTitleGradient(){
    const cyan = 'linear-gradient(180deg,#D9FAFF 0%,#C8F4FF 16%,#B7EDFF 34%,#A3E6FA 55%,#8ADAF5 76%,#6FC8EC 100%)';
    const warm = 'linear-gradient(180deg,#F6CEFF 0%,#EAB8F5 17%,#E7A4ED 34%,#F0A6D8 50%,#FFC1AA 68%,#FFDC91 86%,#FFF0B0 100%)';
    const cyanLine = document.querySelector('#introStage .ref-mix-title .title-cyan');
    const warmLine = document.querySelector('#introStage .ref-mix-title .title-warm');

    if(cyanLine){
      cyanLine.style.setProperty('background', cyan, 'important');
      cyanLine.style.setProperty('background-image', cyan, 'important');
      cyanLine.style.setProperty('-webkit-background-clip', 'text', 'important');
      cyanLine.style.setProperty('background-clip', 'text', 'important');
      cyanLine.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
      cyanLine.style.setProperty('color', 'transparent', 'important');
    }
    if(warmLine){
      warmLine.style.setProperty('background', warm, 'important');
      warmLine.style.setProperty('background-image', warm, 'important');
      warmLine.style.setProperty('-webkit-background-clip', 'text', 'important');
      warmLine.style.setProperty('background-clip', 'text', 'important');
      warmLine.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
      warmLine.style.setProperty('color', 'transparent', 'important');
    }
  }

  window.forceHeroGradient = applyScreenshotTitleGradient;

  if(document.readyState === 'loading'){
    window.addEventListener('DOMContentLoaded',()=>setTimeout(applyScreenshotTitleGradient,0));
  }else{
    setTimeout(applyScreenshotTitleGradient,0);
  }
})();
