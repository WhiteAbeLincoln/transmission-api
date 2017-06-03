# transmission-api
High level api for Transmission RPC written in Typescript

Provides a wrapper over the RPC interface of the [Transmission](http://transmissionbt.com) bittorrent client. 

## Usage:

1. `npm install transmission-api`
2. Import the client using `import {Client} from "transmission-api"`
3. Create a new instance of the client class, and go wild!
    `let client = new Client()`

See the examples directory for information

## Building:

1. Clone or download the repository
2. Ensure typescript and gulp are installed
3. Install dev dependencies using `npm install --save-dev`
4. Make changes and build using `gulp build` or `npm run build`