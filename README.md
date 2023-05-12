# Portfolio Site

Portfolio site build with [nuxt 3](https://v3.nuxtjs.org)

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## API

### tile.png

An endpoint to generate tiles with text and/or emojis. \
To use this endpoint goto [schelpkikker.nl/api/tile.png?content=lorem%20ipsum](https://schelpkikker.nl/api/tile.png?content=lorem%20ipsum) where everything after the `?content=` can be an [uri encoded](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) string
