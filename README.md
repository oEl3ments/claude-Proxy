# Search proxy

1. Install Node.js 20 or newer.
2. In this folder run: `npm install`
3. Start it: `npm start`
4. Open http://localhost:8080

Notes:
- Service workers only work on localhost or HTTPS. If you deploy, put it behind HTTPS.
- Change the port with the PORT environment variable.
- Change the search engine by editing SEARCH_URL in public/app.js.
- Ultraviolet versions change often. If npm install or startup errors mention an
  export or import, check the current Ultraviolet-App template from
  titaniumnetwork-dev and match its server.js imports.
