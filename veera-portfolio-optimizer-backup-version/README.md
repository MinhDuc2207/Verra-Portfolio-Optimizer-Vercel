# Veera Portfolio Optimizer v14 – Poster Neon Title

This build keeps the v12 app logic and updates the hero title to a split poster-style neon pixel gradient: cyan/ice-blue top line and pink/peach/yellow bottom line.

# Veera Portfolio Optimizer — Quant Audit Fixed v6

Single Netlify-ready HTML/CSS/JS project with serverless data adapters.

## What changed in v6

- Tooltip lifecycle fixed: the explanation box appears only while hovering/focusing the `?` icon and closes on pointer leave, scroll, resize, click outside, or Escape.
- Portfolio configuration is rearranged into clear steps: Tickers → Benchmark & window → Capital/currency/rates → Black-Litterman views.
- Live USD/VND FX is retrieved automatically through `/.netlify/functions/fx`; the UI no longer asks users to type a manual FX rate.
- Loading progress bar shows 0–100% while retrieving FX, price history, fundamentals, normalization, and optimization.
- Fundamental Integrity never fabricates Altman/Beneish. Missing open-data fields are shown as Data not available / Dữ liệu không khả dụng with an apology note.
- Black-Litterman uses market-cap weights when available and applies investor views plus confidence to posterior expected returns.
- Model viewer lets users inspect Max Sharpe, Min Volatility, CVaR, Risk Parity, Aggressive Growth, Equal Weight, and Black-Litterman if valid.
- PDF export is image-based to avoid Vietnamese Unicode/font corruption and includes charts when Plotly export is available.
- Bonnie Pixel inspired palette: stronger white text, cyan/magenta/violet/gold gradients, and pixel-style market flags.

## Run locally

Do not double-click `index.html`. Live data requires Netlify Functions.

```bash
npm install -g netlify-cli
netlify dev
```

Open:

```text
http://localhost:8888
```

## Deploy on Netlify

Use these settings:

```text
Build command: leave blank
Publish directory: .
Functions directory: netlify/functions
```

The app uses only live/open providers. No synthetic price series is generated.

## v8 Polish Update
- Removed intro wording, feature pills, and replay intro button.
- Compact music toggle is now a note icon in the bottom-right corner.
- Background music is attempted automatically after the 8-second mascot intro; browsers may still require first user interaction.
- Max-weight input now auto-enforces the minimum feasible cap: 100 / number of tickers.
- Black-Litterman investor views are now entered per ticker and synced internally.
- Friendly data errors now identify the ticker/benchmark and analysis period.
- PDF chart export preserves original chart aspect ratio.


## v14 notes
- Landing now opens directly without the 8-second character intro.
- Hero typography uses a forced neon gradient so “VEERA PORTFOLIO OPTIMIZER” keeps the poster-style color.
- Back buttons are fixed at the bottom-left of each layer.
- Ticker autocomplete uses a body-level portal so it stays directly under the input and above all panels.
- Autocomplete is prefix-only: typing `G` returns symbols beginning with `G`; typing `GO` narrows to `GO...`.
- US live data uses serverless adapters on Netlify/Vercel and a client-side Stooq fallback for static hosts such as GitHub Pages when CORS allows it.
- Browser autoplay policies may block sound before any interaction; the app retries immediately and again on the first click/tap/key press.


## v14 update
- Hero title colors revised to match the supplied reference: crisp cyan-blue top line and pink-peach-yellow bottom line.
- Removed over-blurred/glassy title glow layers.
