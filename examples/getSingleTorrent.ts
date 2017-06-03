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

// gets all recently modified torrents
client.getTorrent("recently-active").then(torrents => {
    console.log(torrents);

    // gets the torrent with the same id as the supplied torrent
    // not usually necessary, since you already have a reference to the torrent
    client.getTorrent(torrents[0]).then(torrent => {
        console.log(torrent);
    });
});

// gets a single torrent with the ID of 1
client.getTorrent(1).then(torrent => console.log(torrent));

// gets all the torrents that match the supplied ids
client.getTorrent([1,2]).then(torrent => console.log(torrent));

// gets the torrent with a matching hashString
client.getTorrent("a8ba3b9c37de1b3").then(torrent => console.log(torrent));

// gets all the torrents that match the supplied hash strings
client.getTorrent(["hash1", "hash2"]).then(torrents => console.log(torrents));