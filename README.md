# BTC EMA Monitor

Live BTC monitor showing where the latest 5m close sits relative to EMA12 and EMA50 bands (H/C/L lines) across `15m / 1h / 4h / 1d / 1w` timeframes. Refresh aligns to the next 5m candle close + 3s buffer.

## Local

```bash
npm start
# → http://localhost:8080
```

No dependencies. Node 18+ only.

## Railway

Auto-detects Node. Default port from `PORT` env var. Health check at `/health`.

```bash
railway up
```

Or via dashboard: connect this GitHub repo, Railway will use `npm start` automatically.

## How it works

- Browser fetches Binance klines directly (`api.binance.com/api/v3/klines`)
- All EMA computation, classification, and timing happens client-side
- Server only serves the static HTML — no API keys, no backend state
- 5m refresh aligned to UTC 5m boundary + 3s buffer

## Structure

```
index.html      single-file UI + logic
server.js       zero-dep static server
package.json    just for `npm start`
```
