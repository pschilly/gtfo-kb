<p align="center">
<img width="512" height="512" alt="DCS Statistics Dashboard Logo" src="https://globaltaskforceoverlord.org/storage/images/Logo.png" />
</p>

# Global Task Force Overlord - Knowledge Base

This knowledge base is simply that, a collection of information pertaining to the Digital Combat Simulator community Global Task Force Overlord `GTFO`. This information is to be used by tthe members of `GTFO`.

## Deploying To Cloudflare Pages

This project is configured as a static Next.js export for Cloudflare Pages.

Use these Cloudflare Pages build settings:

- Framework preset: `None`
- Build command: `npm run build:pages`
- Build output directory: `out`
- Root directory: (leave empty)

Build locally to verify before deploying:

``` bash
npm install
npm run build:pages
```

The generated static site will be in `out/`, which Cloudflare Pages serves directly.

## Developing

Node.js is required to test changes locally. Run the following commands to start the server:

``` bash
# Verify Node.js is installed
node -v
npm -v

# Start local server
npm install
npm run dev
```

