# @lulzasaur9192/marketplace-search-mcp

MCP server with **22 tools** for marketplace search, price comparison, license verification, and data lookup across 15+ platforms.

## Installation

```bash
npx @lulzasaur9192/marketplace-search-mcp
```

### Claude Desktop / Cursor

Add to your MCP config:

```json
{
  "mcpServers": {
    "marketplace-search": {
      "command": "npx",
      "args": ["-y", "@lulzasaur9192/marketplace-search-mcp"]
    }
  }
}
```

## Tools (22)

### Marketplace Search (13 marketplaces in 1 tool)
- **`marketplace_search`** — Search TCGPlayer, Reverb, Grailed, Redfin, Bonanza, ThriftBooks, AbeBooks, Goodreads, OfferUp, Swappa, StubHub, Craigslist, Poshmark

### Specialized Search
- **`search_imdb`** — Movies/TV with chart browsing (Top 250, Most Popular)
- **`search_houzz`** — Home design professionals by Houzz URL
- **`search_thumbtack`** — Local service professionals with location filter

### License Verification
- **`verify_contractor_license`** — CA, TX, FL, NY contractor licenses
- **`verify_nurse_license`** — FL, NY nurse licenses

### Collectibles & Grading
- **`psa_population_report`** — PSA card certification and population data

### Property & Building
- **`search_nyc_violations`** — NYC DOB building violation records
- **`search_estate_sales`** — Estate sales by location
- **`estate_sale_details`** — Full estate sale details
- **`search_storage`** — Self-storage facilities
- **`storage_facility_details`** — Storage pricing and amenities

### Government & Regulatory
- **`search_fcc`** — FCC ID certification search
- **`fcc_details`** — Full FCC certification info
- **`search_gsa_auctions`** — Government surplus auctions
- **`gsa_auction_details`** — Auction lot details
- **`gsa_auction_stats`** — Market statistics

### Cost Data
- **`childcare_cost`** — Childcare costs by ZIP/county/state
- **`childcare_states`** — All-state childcare comparison
- **`childcare_compare`** — Side-by-side location comparison
- **`home_service_cost`** — Home service cost estimates

### AI Safety
- **`skillguard_verify`** — Verify AI agent skill safety (SAFE/CAUTION/DANGER)

## Optional API Key

Register for higher quotas:

```bash
curl -X POST https://rapidapi-backend-production.up.railway.app/mcp/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com"}'
```

Set `MARKETPLACE_API_KEY` env var for authenticated access.

## Higher Rate Limits

For higher rate limits and dedicated support, subscribe on RapidAPI:

- [TCGPlayer Price Data](https://rapidapi.com/lulzasaur9192/api/tcgplayer-price-data?utm_source=npm&utm_medium=readme&utm_campaign=mcp-tcgplayer)
- [Reverb Music Gear Listings](https://rapidapi.com/lulzasaur9192/api/reverb-music-gear-listings?utm_source=npm&utm_medium=readme&utm_campaign=mcp-reverb)
- [Thumbtack Pro Directory](https://rapidapi.com/lulzasaur9192/api/thumbtack-pro-directory?utm_source=npm&utm_medium=readme&utm_campaign=mcp-thumbtack)

## License

MIT
