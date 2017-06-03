import { Client, ClientOptions } from "../src";

// Default options
let options: ClientOptions = {
    port: 9091,
    path: "/transmission/rpc",
    protocol: "http:",
    // username and password sent using HTTP Basic Auth
    // needed only if the transmission server requires authentication
    username: null,
    password: null
}

// Client takes an initial session id and an optional Options object
// if the session id is incorrect, transmission will send a correct one
// and the client will repeat the request with the new id
let client = new Client("Inital Session ID", options);

// Get all torrents that transmission knows about
client.getAllTorrents().then(torrents => {
    console.log(torrents);
});