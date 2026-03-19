# Marketplace Search MCP Server

MCP server for AI agents to search marketplaces, verify professional licenses, and look up collectibles data — all from natural language.

[![npm](https://img.shields.io/npm/v/@lulzasaur9192/marketplace-search-mcp)](https://www.npmjs.com/package/@lulzasaur9192/marketplace-search-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[![Marketplace Search MCP server](https://glama.ai/mcp/servers/lulzasaur9192/marketplace-search-mcp/badges/card.svg)](https://glama.ai/mcp/servers/lulzasaur9192/marketplace-search-mcp)

## Supported Data Sources

| Tool | Source | Data |
|------|--------|------|
| `search_tcgplayer` | TCGPlayer | Trading card prices (Magic, Pokémon, Yu-Gi-Oh!, Lorcana) |
| `search_reverb` | Reverb.com | Used & new music gear (guitars, amps, pedals, synths) |
| `search_thumbtack` | Thumbtack | Local service professionals (plumbers, electricians, etc.) |
| `verify_contractor_license` | State licensing boards | Contractor license verification (CA, TX, FL, NY) |
| `verify_nurse_license` | State nursing boards | Nurse license verification (FL, NY) |
| `psa_population_report` | PSA | Card grading population reports and cert lookups |

## Installation

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

### Cursor / Windsurf / Other MCP Clients

```json
{
  "command": "npx",
  "args": ["-y", "@lulzasaur9192/marketplace-search-mcp"]
}
```

### Smithery

```bash
npx @smithery/cli install @lulzasaur9192/marketplace-search-mcp --client claude
```

## Tools

### search_tcgplayer

Search trading card prices from TCGPlayer — the largest trading card marketplace.

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| query     | string | Yes      | Card name or search term             |
| limit     | number | No       | Results to return (1-50, default 20) |

**Example:** `search_tcgplayer({ query: "charizard", limit: 5 })`

Returns: product name, set, rarity, market price, median price, lowest price, total listings, image URL, product URL.

### search_reverb

Search music gear listings from Reverb.com — the largest marketplace for musical instruments.

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| query     | string | Yes      | Instrument or gear search term       |
| limit     | number | No       | Results to return (1-50, default 20) |

**Example:** `search_reverb({ query: "fender stratocaster", limit: 10 })`

Returns: title, make, model, year, price, condition, shop name, categories, listing URL.

### search_thumbtack

Search local service professionals from Thumbtack.

| Parameter | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| query     | string | Yes      | Service category search term             |
| location  | string | No       | City/state slug (e.g. "austin/tx")       |
| limit     | number | No       | Results to return (1-20, default 20)     |

**Example:** `search_thumbtack({ query: "plumbers", location: "austin/tx", limit: 5 })`

Returns: name, rating, review count, price range, hire count, services, location, profile URL, badge, licensed status.

### verify_contractor_license

Verify a contractor's license across US states. Queries official state licensing board databases.

| Parameter     | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| state         | string | Yes      | State code: CA, TX, FL, or NY              |
| licenseNumber | string | No       | License number to look up                  |
| personName    | string | No       | Person name to search                      |
| businessName  | string | No       | Business name to search                    |

**Example:** `verify_contractor_license({ state: "CA", licenseNumber: "1234567" })`

Returns: license status, expiration date, classifications, bond info, contact details.

### verify_nurse_license

Verify a nurse's license across US states. Queries official state nursing board databases.

| Parameter     | Type   | Required | Description                           |
| ------------- | ------ | -------- | ------------------------------------- |
| state         | string | Yes      | State code: FL or NY                  |
| licenseNumber | string | No       | License number to look up             |
| lastName      | string | No       | Nurse's last name                     |
| firstName     | string | No       | Nurse's first name                    |
| licenseType   | string | No       | License type (e.g. "RN", "LPN")      |

**Example:** `verify_nurse_license({ state: "FL", licenseNumber: "RN1234567" })`

Returns: license status, expiration, qualifications, enforcement actions.

### psa_population_report

Look up PSA card certification details and population reports.

| Parameter  | Type   | Required | Description                          |
| ---------- | ------ | -------- | ------------------------------------ |
| certNumber | string | No       | PSA certification number             |
| specID     | string | No       | PSA spec ID for direct pop lookup    |

**Example:** `psa_population_report({ certNumber: "10000001" })`

Returns: card info (year, brand, subject, grade) and complete grade breakdown from Auth through PSA 10.

## Use Cases

- **Price comparison**: Ask your AI to compare trading card prices across sets or find the cheapest listing for a specific card
- **Gear hunting**: Have your AI search Reverb for specific guitars, amps, or pedals within a budget
- **Hire professionals**: Find and compare local contractors, plumbers, or electricians with ratings and pricing
- **License verification**: Verify contractor or nurse licenses before hiring — checks official state databases
- **Card grading data**: Look up PSA population reports to assess card rarity and value

## Higher Rate Limits

This MCP server is free and open source. For higher rate limits and dedicated support, subscribe to the APIs on RapidAPI:

- [TCGPlayer Price Data](https://rapidapi.com/lulzasaur9192/api/tcgplayer-price-data)
- [Reverb Music Gear Listings](https://rapidapi.com/lulzasaur9192/api/reverb-music-gear-listings)
- [Thumbtack Pro Directory](https://rapidapi.com/lulzasaur9192/api/thumbtack-pro-directory)

## Related Apify Scrapers

These scrapers power this MCP server and are also available individually on the Apify Store:

- [TCGPlayer Scraper](https://apify.com/lulzasaur/tcgplayer-scraper) — Trading card prices and listings
- [Reverb Scraper](https://apify.com/lulzasaur/reverb-scraper) — Music gear marketplace data
- [Thumbtack Scraper](https://apify.com/lulzasaur/thumbtack-scraper) — Local service professional directory
- [Contractor License Scraper](https://apify.com/lulzasaur/contractor-license-scraper) — Multi-state license verification
- [Nurse License Scraper](https://apify.com/lulzasaur/nurse-license-scraper) — Nursing board verification
- [PSA Pop Scraper](https://apify.com/lulzasaur/psa-pop-scraper) — PSA grading population data
- [OfferUp Scraper](https://apify.com/lulzasaur/offerup-scraper) — Local marketplace listings
- [Craigslist Scraper](https://apify.com/lulzasaur/craigslist-scraper) — Classifieds and for-sale posts
- [Poshmark Scraper](https://apify.com/lulzasaur/poshmark-scraper) — Fashion resale marketplace
- [StubHub Scraper](https://apify.com/lulzasaur/stubhub-scraper) — Event ticket prices
- [Swappa Scraper](https://apify.com/lulzasaur/swappa-scraper) — Used electronics marketplace
- [Goodreads Scraper](https://apify.com/lulzasaur/goodreads-scraper) — Book ratings and reviews

## License

MIT