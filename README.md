# Marketplace Search MCP Server

An MCP server that lets AI agents search three major marketplaces:

- **TCGPlayer** — Trading card prices (Magic, Pokémon, Yu-Gi-Oh!, Lorcana)
- **Reverb** — Used & new music gear (guitars, amps, pedals, synths)
- **Thumbtack** — Local service professionals (plumbers, electricians, cleaners)

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

Search trading card prices from TCGPlayer.

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| query     | string | Yes      | Card name or search term             |
| limit     | number | No       | Results to return (1-50, default 20) |

**Example:** `search_tcgplayer({ query: "charizard", limit: 5 })`

Returns: product name, set, rarity, market price, median price, lowest price, total listings, image URL, product URL.

### search_reverb

Search music gear listings from Reverb.com.

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

## Higher Rate Limits

This MCP server is free and open source. For higher rate limits and dedicated support, subscribe to the APIs on RapidAPI:

- [TCGPlayer Price Data](https://rapidapi.com/lulzasaur9192/api/tcgplayer-price-data)
- [Reverb Music Gear Listings](https://rapidapi.com/lulzasaur9192/api/reverb-music-gear-listings)
- [Thumbtack Pro Directory](https://rapidapi.com/lulzasaur9192/api/thumbtack-pro-directory)

## License

MIT
