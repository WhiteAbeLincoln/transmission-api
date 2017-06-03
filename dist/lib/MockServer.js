"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const sd = require("string_decoder");
const EventEmitter = require("events");
const crypto_1 = require("crypto");
const defaultSession = {
    "alt-speed-down": 50,
    "alt-speed-enabled": false,
    "alt-speed-time-begin": 540,
    "alt-speed-time-day": 127,
    "alt-speed-time-enabled": false,
    "alt-speed-time-end": 1020,
    "alt-speed-up": 50,
    "blocklist-enabled": false,
    "blocklist-size": 0,
    "blocklist-url": "http://www.example.com/blocklist",
    "cache-size-mb": 4,
    "config-dir": "/home/example/.config/transmission",
    "dht-enabled": true,
    "download-dir": "/home/example/Downloads",
    "download-dir-free-space": 58787102720,
    "download-queue-enabled": true,
    "download-queue-size": 5,
    "encryption": "preferred",
    "idle-seeding-limit": 30,
    "idle-seeding-limit-enabled": false,
    "incomplete-dir": "/home/example/Downloads",
    "incomplete-dir-enabled": false,
    "lpd-enabled": false,
    "peer-limit-global": 200,
    "peer-limit-per-torrent": 50,
    "peer-port": 51413,
    "peer-port-random-on-start": false,
    "pex-enabled": true,
    "port-forwarding-enabled": true,
    "queue-stalled-enabled": true,
    "queue-stalled-minutes": 30,
    "rename-partial-files": true,
    "rpc-version": 15,
    "rpc-version-minimum": 1,
    "script-torrent-done-enabled": false,
    "script-torrent-done-filename": "/home/example",
    "seed-queue-enabled": false,
    "seed-queue-size": 10,
    "seedRatioLimit": 2,
    "seedRatioLimited": false,
    "speed-limit-down": 100,
    "speed-limit-down-enabled": false,
    "speed-limit-up": 100,
    "speed-limit-up-enabled": false,
    "start-added-torrents": true,
    "trash-original-torrent-files": false,
    "units": {
        "memory-bytes": 1024,
        "memory-units": [
            "KiB",
            "MiB",
            "GiB",
            "TiB"
        ],
        "size-bytes": 1000,
        "size-units": [
            "kB",
            "MB",
            "GB",
            "TB"
        ],
        "speed-bytes": 1000,
        "speed-units": [
            "kB/s",
            "MB/s",
            "GB/s",
            "TB/s"
        ]
    },
    "utp-enabled": true,
    "version": "2.92 (14714)"
};
const defaultTorrent = {
    "activityDate": 1496175090,
    "addedDate": 1496174775,
    "bandwidthPriority": 0,
    "comment": "Ubuntu CD releases.ubuntu.com",
    "corruptEver": 0,
    "creator": "",
    "dateCreated": 1492077327,
    "desiredAvailable": 0,
    "doneDate": 1496174934,
    "downloadDir": "/home/example/Downloads",
    "downloadLimit": 100,
    "downloadLimited": false,
    "downloadedEver": 759079688,
    "error": 0,
    "errorString": "",
    "eta": -1,
    "etaIdle": -1,
    "fileStats": [
        {
            "bytesCompleted": 718274560,
            "priority": 0,
            "wanted": true
        }
    ],
    "files": [
        {
            "bytesCompleted": 718274560,
            "length": 718274560,
            "name": "ubuntu-17.04-server-amd64.iso"
        }
    ],
    "hashString": "8856b93099408ae0ebb8cd7bc7bdb9a7f80ad648",
    "haveUnchecked": 0,
    "haveValid": 718274560,
    "honorsSessionLimits": true,
    "id": 1,
    "isFinished": false,
    "isPrivate": false,
    "isStalled": false,
    "leftUntilDone": 0,
    "magnetLink": "magnet:?xt=urn:btih:8856b93099408ae0ebb8cd7bc7bdb9a7f80ad648&dn=ubuntu-17.04-server-amd64.iso&tr=http%3A%2F%2Ftorrent.ubuntu.com%3A6969%2Fannounce&tr=http%3A%2F%2Fipv6.torrent.ubuntu.com%3A6969%2Fannounce",
    "manualAnnounceTime": -1,
    "maxConnectedPeers": 50,
    "metadataPercentComplete": 1,
    "name": "ubuntu-17.04-server-amd64.iso",
    "peer-limit": 50,
    "peers": [],
    "peersConnected": 0,
    "peersFrom": {
        "fromCache": 0,
        "fromDht": 0,
        "fromIncoming": 0,
        "fromLpd": 0,
        "fromLtep": 0,
        "fromPex": 0,
        "fromTracker": 0
    },
    "peersGettingFromUs": 0,
    "peersSendingToUs": 0,
    "percentDone": 1,
    "pieceCount": 1370,
    "pieceSize": 524288,
    "pieces": "////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wA==",
    "priorities": [
        0
    ],
    "queuePosition": 0,
    "rateDownload": 0,
    "rateUpload": 0,
    "recheckProgress": 0,
    "secondsDownloading": 157,
    "secondsSeeding": 1130,
    "seedIdleLimit": 30,
    "seedIdleMode": 0,
    "seedRatioLimit": 2,
    "seedRatioMode": 0,
    "sizeWhenDone": 718274560,
    "startDate": 1496174783,
    "status": 6,
    "torrentFile": "/home/example/.config/transmission/torrents/ubuntu-17.04-server-amd64.iso.8856b93099408ae0.torrent",
    "totalSize": 718274560,
    "trackerStats": [
        {
            "announce": "http://torrent.ubuntu.com:6969/announce",
            "announceState": 1,
            "downloadCount": -1,
            "hasAnnounced": true,
            "hasScraped": true,
            "host": "http://torrent.ubuntu.com:6969",
            "id": 0,
            "isBackup": false,
            "lastAnnouncePeerCount": 50,
            "lastAnnounceResult": "Success",
            "lastAnnounceStartTime": 1496174934,
            "lastAnnounceSucceeded": true,
            "lastAnnounceTime": 1496174935,
            "lastAnnounceTimedOut": false,
            "lastScrapeResult": "",
            "lastScrapeStartTime": 0,
            "lastScrapeSucceeded": true,
            "lastScrapeTime": 1496174935,
            "lastScrapeTimedOut": 0,
            "leecherCount": 13,
            "nextAnnounceTime": 1496176735,
            "nextScrapeTime": 1496176740,
            "scrape": "http://torrent.ubuntu.com:6969/scrape",
            "scrapeState": 1,
            "seederCount": 931,
            "tier": 0
        },
        {
            "announce": "http://ipv6.torrent.ubuntu.com:6969/announce",
            "announceState": 1,
            "downloadCount": -1,
            "hasAnnounced": true,
            "hasScraped": true,
            "host": "http://ipv6.torrent.ubuntu.com:6969",
            "id": 1,
            "isBackup": false,
            "lastAnnouncePeerCount": 0,
            "lastAnnounceResult": "Could not connect to tracker",
            "lastAnnounceStartTime": 0,
            "lastAnnounceSucceeded": false,
            "lastAnnounceTime": 1496174934,
            "lastAnnounceTimedOut": false,
            "lastScrapeResult": "Could not connect to tracker",
            "lastScrapeStartTime": 0,
            "lastScrapeSucceeded": false,
            "lastScrapeTime": 1496175740,
            "lastScrapeTimedOut": 0,
            "leecherCount": -1,
            "nextAnnounceTime": 1496176789,
            "nextScrapeTime": 1496179370,
            "scrape": "http://ipv6.torrent.ubuntu.com:6969/scrape",
            "scrapeState": 1,
            "seederCount": -1,
            "tier": 1
        }
    ],
    "trackers": [
        {
            "announce": "http://torrent.ubuntu.com:6969/announce",
            "id": 0,
            "scrape": "http://torrent.ubuntu.com:6969/scrape",
            "tier": 0
        },
        {
            "announce": "http://ipv6.torrent.ubuntu.com:6969/announce",
            "id": 1,
            "scrape": "http://ipv6.torrent.ubuntu.com:6969/scrape",
            "tier": 1
        }
    ],
    "uploadLimit": 100,
    "uploadLimited": false,
    "uploadRatio": 0.0149,
    "uploadedEver": 11366950,
    "wanted": [
        1
    ],
    "webseeds": [],
    "webseedsSendingToUs": 0
};
const defaultSessionStat = {
    "activeTorrentCount": 0,
    "cumulative-stats": {
        "downloadedBytes": 74295525899,
        "filesAdded": 118,
        "secondsActive": 71626,
        "sessionCount": 5,
        "uploadedBytes": 36208838130
    },
    "current-stats": {
        "downloadedBytes": 0,
        "filesAdded": 0,
        "secondsActive": 6011,
        "sessionCount": 1,
        "uploadedBytes": 0
    },
    "downloadSpeed": 0,
    "pausedTorrentCount": 1,
    "torrentCount": 1,
    "uploadSpeed": 0
};
class MockServer extends EventEmitter {
    constructor(options) {
        super();
        this.idCount = 1;
        this.torrentList = [defaultTorrent];
        this.session = defaultSession;
        this.sessionStat = defaultSessionStat;
        this.methods = {
            "torrent-start": (args, cb) => { cb(); },
            "torrent-start-now": (args, cb) => { cb(); },
            "torrent-stop": (args, cb) => { cb(); },
            "torrent-verify": (args, cb) => { cb(); },
            "torrent-reannounce": (args, cb) => { cb(); },
            "torrent-set": (args, cb) => { cb(); },
            "torrent-get": (args, cb) => { this.getTorrent(args, cb); },
            "torrent-add": (args, cb) => { this.addTorrent(args, cb); },
            "torrent-remove": (args, cb) => { this.removeTorrent(args, cb); },
            "torrent-set-location": (args, cb) => { !args.hasOwnProperty("location") ? cb("no location", null) : cb(); },
            "torrent-rename-path": (args, cb) => { this.renameTorrent(args, cb); },
            "session-set": (args, cb) => { cb(); },
            "session-get": (args, cb) => { cb(null, this.session); },
            "session-stats": (args, cb) => { cb(null, this.sessionStat); },
            "blocklist-update": (args, cb) => { cb(null, { "blocklist-size": 4 }); },
            "port-test": (args, cb) => { cb(null, { "port-is-open": true }); },
            "session-close": (args, cb) => { cb(); },
            "queue-move-top": (args, cb) => { cb(); },
            "queue-move-up": (args, cb) => { cb(); },
            "queue-move-down": (args, cb) => { cb(); },
            "queue-move-bottom": (args, cb) => { cb(); },
            "free-space": (args, cb) => {
                if (!args || !args.path) {
                    cb("directory path argument is missing");
                    return;
                }
                cb(null, {
                    "path": args.path,
                    "size-bytes": 8
                });
            },
        };
        this.options = Object.assign({}, {
            port: 9091,
            path: "/transmission/rpc",
            host: "127.0.0.1"
        }, options);
    }
    emit(event, data) {
        return super.emit(event, data);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    addListener(event, listener) {
        return super.addListener(event, listener);
    }
    prependListener(event, listener) {
        return super.prependListener(event, listener);
    }
    prependOnceListener(event, listener) {
        return super.prependOnceListener(event, listener);
    }
    removeListener(event, listener) {
        return super.removeListener(event, listener);
    }
    addTorrent(args, cb) {
        const sha1 = crypto_1.createHash('sha1');
        let id = this.idCount++;
        let torrentStub = { id: id, name: "temp-torrent " + id, hashString: (Math.random() * 100).toString() };
        sha1.update(JSON.stringify(torrentStub));
        torrentStub.hashString = sha1.digest('hex');
        this.torrentList.push(Object.assign({}, defaultTorrent, torrentStub));
        cb(null, { "torrent-added": torrentStub });
    }
    removeTorrent(args, cb) {
        if (args.ids && !Array.isArray(args.ids)) {
            args.ids = [args.ids];
        }
        if (args.ids && Array.isArray(args.ids)) {
            if (args.ids.length > 0 && typeof args.ids[0] === "string")
                this.torrentList = this.torrentList.filter(t => !~args.ids.indexOf(t.hashString));
            else if (args.ids.length > 0 && typeof args.ids[0] === "number")
                this.torrentList = this.torrentList.filter(t => !~args.ids.indexOf(t.id));
            else if (args.ids.length == 0)
                this.torrentList = [];
        }
        else {
            this.torrentList = [];
        }
        cb();
    }
    renameTorrent(args, cb) {
        if (!args || !args.ids || Array.isArray(args.ids) && args.ids.length == 0) {
            cb("torrent-rename-path requires 1 torrent");
            return;
        }
        if (args.ids && !Array.isArray(args.ids)) {
            args.ids = [args.ids];
        }
        if (!args.name || !args.path) {
            cb("Invalid argument", { id: args.ids[0], path: "", name: "" });
            return;
        }
        let idx = -1;
        if (Array.isArray(args.ids) && typeof args.ids[0] === "string")
            idx = this.torrentList.findIndex(t => {
                return t.hashString == args.ids[0];
            });
        else if (Array.isArray(args.ids) && typeof args.ids[0] === "number")
            idx = this.torrentList.findIndex(t => {
                return t.id == args.ids[0];
            });
        if (idx != -1)
            this.torrentList[idx].name = args.name;
        cb(null, { id: this.torrentList[idx].id, name: args.name, path: args.path });
    }
    getTorrent(args, cb) {
        let tempTorrents = [];
        let torrents = [];
        if (!args.hasOwnProperty("fields")) {
            cb("no fields specified", { torrents: [] });
            return;
        }
        if (args.ids && !Array.isArray(args.ids)) {
            args.ids = [args.ids];
        }
        if (args.ids && Array.isArray(args.ids)) {
            if (args.ids.length > 0 && typeof args.ids[0] === 'number')
                tempTorrents = this.torrentList.filter(t => ~args.ids.indexOf(t.id));
            else if (args.ids.length > 0 && typeof args.ids[0] === 'string')
                tempTorrents = this.torrentList.filter(t => ~args.ids.indexOf(t.hashString));
            else if (args.ids.length == 0)
                tempTorrents = this.torrentList;
        }
        else {
            tempTorrents = this.torrentList;
        }
        for (let i = 0; i < tempTorrents.length; i++) {
            torrents.push({});
            for (let key in tempTorrents[i]) {
                if (~args.fields.indexOf(key)) {
                    torrents[i][key] = tempTorrents[i][key];
                }
            }
        }
        cb(null, { torrents });
    }
    clear() {
        this.torrentList = [defaultTorrent];
        this.session = defaultSession;
        this.sessionStat = defaultSessionStat;
        this.idCount = 1;
    }
    start() {
        this.server = http.createServer((req, res) => {
            let uri = url.parse(req.url).pathname;
            if (uri !== this.options.path) {
                res.writeHead(404, "Not Found: " + uri, { "Content-Type": "text/html" });
                res.end("<h1>404: Not Found</h1>" + uri);
            }
            else if (req.method !== "POST") {
                res.writeHead(405, "Method not allowed", { "Content-Type": "text/html" });
                res.end("<h1>405: Method not allowed</h1>");
            }
            else {
                let data = "";
                let decoder = new sd.StringDecoder("utf-8");
                req.on("data", chunk => {
                    data += decoder.write(chunk);
                });
                req.on("end", () => {
                    let request = JSON.parse(data);
                    let response = {
                        result: "success",
                        arguments: {}
                    };
                    if (request.tag)
                        response.tag = request.tag;
                    if (!this.methods.hasOwnProperty(request.method)) {
                        response.result = "method not recognized";
                    }
                    else {
                        this.methods[request.method](request.arguments, (err, args) => {
                            if (err)
                                response.result = err;
                            if (args)
                                response.arguments = args;
                            let body = JSON.stringify(response);
                            res.writeHead(200, {
                                "Content-Length": Buffer.byteLength(body),
                                "Content-Type": "application/json"
                            });
                            res.end(body);
                            this.emit('data', { req: request, res: response });
                        });
                    }
                });
            }
        });
        this.server.listen(this.options.port, this.options.host);
    }
    stop() {
        this.server.close();
    }
}
exports.MockServer = MockServer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFZLElBQUksQ0FBQyxHQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFZLElBQUksQ0FBQyxHQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFGLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxFQUFFLEVBQUUsQ0FBQztJQUNULENBQUM7SUFFTyxhQUFhLENBQUMsSUFBNkUsRUFDL0YsRUFBaUU7UUFDakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMs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Q0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUM7Z0JBQ3ZELFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBWSxJQUFJLENBQUMsR0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUM7Z0JBQzVELFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBWSxJQUFJLENBQUMsR0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2dCQUMxQixZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxDQUFDO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0MsUUFBUSxDQUFDLElB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QU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUk7NEJBQ3RELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzs0QkFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNwQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQ0FDZixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQ0FDekMsY0FBYyxFQUFFLGtCQUFrQjs2QkFDckMsQ0FBQyxDQUFDOzRCQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBRWQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBbE9ELGdDQWtPQyIsImZpbGUiOiJsaWIvTW9ja1NlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCAqIGFzIHVybCBmcm9tIFwidXJsXCI7XG5pbXBvcnQgKiBhcyBzZCBmcm9tIFwic3RyaW5nX2RlY29kZXJcIjtcbmltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSBcImNyeXB0b1wiO1xuaW1wb3J0IHsgVHJhbnNtaXNzaW9uUmVxdWVzdCwgVHJhbnNtaXNzaW9uUmVzcG9uc2UgfSBmcm9tIFwiLi9Db21tdW5pY2F0aW9uXCI7XG5pbXBvcnQgeyBJU2Vzc2lvbiB9IGZyb20gXCIuL1Nlc3Npb25cIjtcbmltcG9ydCB7IElUb3JyZW50IH0gZnJvbSBcIi4vVG9ycmVudFwiO1xuXG50eXBlIENhbGxiYWNrPFQ+ID0gKGVycj86IHN0cmluZywgYXJncz86IFQpID0+IHZvaWRcbnR5cGUgTWV0aG9kRGljdCA9IHsgW2tleTogc3RyaW5nXTogKGFyZ3M6IG9iamVjdCwgY2I6IENhbGxiYWNrPG9iamVjdD4pID0+IHZvaWQgfVxuZXhwb3J0IHR5cGUgTW9ja1NlcnZlclJlc3BvbnNlID0geyByZXE6IFRyYW5zbWlzc2lvblJlcXVlc3QsIHJlczogVHJhbnNtaXNzaW9uUmVzcG9uc2UgfTtcblxuZXhwb3J0IGludGVyZmFjZSBNb2NrU2VydmVyT3B0aW9ucyB7XG4gICAgcG9ydD86IG51bWJlcjtcbiAgICBob3N0Pzogc3RyaW5nO1xuICAgIHBhdGg/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGRlZmF1bHRTZXNzaW9uOiBJU2Vzc2lvbiA9IHtcbiAgICBcImFsdC1zcGVlZC1kb3duXCI6IDUwLFxuICAgIFwiYWx0LXNwZWVkLWVuYWJsZWRcIjogZmFsc2UsXG4gICAgXCJhbHQtc3BlZWQtdGltZS1iZWdpblwiOiA1NDAsXG4gICAgXCJhbHQtc3BlZWQtdGltZS1kYXlcIjogMTI3LFxuICAgIFwiYWx0LXNwZWVkLXRpbWUtZW5hYmxlZFwiOiBmYWxzZSxcbiAgICBcImFsdC1zcGVlZC10aW1lLWVuZFwiOiAxMDIwLFxuICAgIFwiYWx0LXNwZWVkLXVwXCI6IDUwLFxuICAgIFwiYmxvY2tsaXN0LWVuYWJsZWRcIjogZmFsc2UsXG4gICAgXCJibG9ja2xpc3Qtc2l6ZVwiOiAwLFxuICAgIFwiYmxvY2tsaXN0LXVybFwiOiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vYmxvY2tsaXN0XCIsXG4gICAgXCJjYWNoZS1zaXplLW1iXCI6IDQsXG4gICAgXCJjb25maWctZGlyXCI6IFwiL2hvbWUvZXhhbXBsZS8uY29uZmlnL3RyYW5zbWlzc2lvblwiLFxuICAgIFwiZGh0LWVuYWJsZWRcIjogdHJ1ZSxcbiAgICBcImRvd25sb2FkLWRpclwiOiBcIi9ob21lL2V4YW1wbGUvRG93bmxvYWRzXCIsXG4gICAgXCJkb3dubG9hZC1kaXItZnJlZS1zcGFjZVwiOiA1ODc4NzEwMjcyMCxcbiAgICBcImRvd25sb2FkLXF1ZXVlLWVuYWJsZWRcIjogdHJ1ZSxcbiAgICBcImRvd25sb2FkLXF1ZXVlLXNpemVcIjogNSxcbiAgICBcImVuY3J5cHRpb25cIjogXCJwcmVmZXJyZWRcIixcbiAgICBcImlkbGUtc2VlZGluZy1saW1pdFwiOiAzMCxcbiAgICBcImlkbGUtc2VlZGluZy1saW1pdC1lbmFibGVkXCI6IGZhbHNlLFxuICAgIFwiaW5jb21wbGV0ZS1kaXJcIjogXCIvaG9tZS9leGFtcGxlL0Rvd25sb2Fkc1wiLFxuICAgIFwiaW5jb21wbGV0ZS1kaXItZW5hYmxlZFwiOiBmYWxzZSxcbiAgICBcImxwZC1lbmFibGVkXCI6IGZhbHNlLFxuICAgIFwicGVlci1saW1pdC1nbG9iYWxcIjogMjAwLFxuICAgIFwicGVlci1saW1pdC1wZXItdG9ycmVudFwiOiA1MCxcbiAgICBcInBlZXItcG9ydFwiOiA1MTQxMyxcbiAgICBcInBlZXItcG9ydC1yYW5kb20tb24tc3RhcnRcIjogZmFsc2UsXG4gICAgXCJwZXgtZW5hYmxlZFwiOiB0cnVlLFxuICAgIFwicG9ydC1mb3J3YXJkaW5nLWVuYWJsZWRcIjogdHJ1ZSxcbiAgICBcInF1ZXVlLXN0YWxsZWQtZW5hYmxlZFwiOiB0cnVlLFxuICAgIFwicXVldWUtc3RhbGxlZC1taW51dGVzXCI6IDMwLFxuICAgIFwicmVuYW1lLXBhcnRpYWwtZmlsZXNcIjogdHJ1ZSxcbiAgICBcInJwYy12ZXJzaW9uXCI6IDE1LFxuICAgIFwicnBjLXZlcnNpb24tbWluaW11bVwiOiAxLFxuICAgIFwic2NyaXB0LXRvcnJlbnQtZG9uZS1lbmFibGVkXCI6IGZhbHNlLFxuICAgIFwic2NyaXB0LXRvcnJlbnQtZG9uZS1maWxlbmFtZVwiOiBcIi9ob21lL2V4YW1wbGVcIixcbiAgICBcInNlZWQtcXVldWUtZW5hYmxlZFwiOiBmYWxzZSxcbiAgICBcInNlZWQtcXVldWUtc2l6ZVwiOiAxMCxcbiAgICBcInNlZWRSYXRpb0xpbWl0XCI6IDIsXG4gICAgXCJzZWVkUmF0aW9MaW1pdGVkXCI6IGZhbHNlLFxuICAgIFwic3BlZWQtbGltaXQtZG93blwiOiAxMDAsXG4gICAgXCJzcGVlZC1saW1pdC1kb3duLWVuYWJsZWRcIjogZmFsc2UsXG4gICAgXCJzcGVlZC1saW1pdC11cFwiOiAxMDAsXG4gICAgXCJzcGVlZC1saW1pdC11cC1lbmFibGVkXCI6IGZhbHNlLFxuICAgIFwic3RhcnQtYWRkZWQtdG9ycmVudHNcIjogdHJ1ZSxcbiAgICBcInRyYXNoLW9yaWdpbmFsLXRvcnJlbnQtZmlsZXNcIjogZmFsc2UsXG4gICAgXCJ1bml0c1wiOiB7XG4gICAgICAgIFwibWVtb3J5LWJ5dGVzXCI6IDEwMjQsXG4gICAgICAgIFwibWVtb3J5LXVuaXRzXCI6IFtcbiAgICAgICAgICAgIFwiS2lCXCIsXG4gICAgICAgICAgICBcIk1pQlwiLFxuICAgICAgICAgICAgXCJHaUJcIixcbiAgICAgICAgICAgIFwiVGlCXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJzaXplLWJ5dGVzXCI6IDEwMDAsXG4gICAgICAgIFwic2l6ZS11bml0c1wiOiBbXG4gICAgICAgICAgICBcImtCXCIsXG4gICAgICAgICAgICBcIk1CXCIsXG4gICAgICAgICAgICBcIkdCXCIsXG4gICAgICAgICAgICBcIlRCXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJzcGVlZC1ieXRlc1wiOiAxMDAwLFxuICAgICAgICBcInNwZWVkLXVuaXRzXCI6IFtcbiAgICAgICAgICAgIFwia0Ivc1wiLFxuICAgICAgICAgICAgXCJNQi9zXCIsXG4gICAgICAgICAgICBcIkdCL3NcIixcbiAgICAgICAgICAgIFwiVEIvc1wiXG4gICAgICAgIF1cbiAgICB9LFxuICAgIFwidXRwLWVuYWJsZWRcIjogdHJ1ZSxcbiAgICBcInZlcnNpb25cIjogXCIyLjkyICgxNDcxNClcIlxufVxuXG5jb25zdCBkZWZhdWx0VG9ycmVudDogSVRvcnJlbnQgPSB7XG4gICAgXCJhY3Rpdml0eURhdGVcIjogMTQ5NjE3NTA5MCxcbiAgICBcImFkZGVkRGF0ZVwiOiAxNDk2MTc0Nzc1LFxuICAgIFwiYmFuZHdpZHRoUHJpb3JpdHlcIjogMCxcbiAgICBcImNvbW1lbnRcIjogXCJVYnVudHUgQ0QgcmVsZWFzZXMudWJ1bnR1LmNvbVwiLFxuICAgIFwiY29ycnVwdEV2ZXJcIjogMCxcbiAgICBcImNyZWF0b3JcIjogXCJcIixcbiAgICBcImRhdGVDcmVhdGVkXCI6IDE0OTIwNzczMjcsXG4gICAgXCJkZXNpcmVkQXZhaWxhYmxlXCI6IDAsXG4gICAgXCJkb25lRGF0ZVwiOiAxNDk2MTc0OTM0LFxuICAgIFwiZG93bmxvYWREaXJcIjogXCIvaG9tZS9leGFtcGxlL0Rvd25sb2Fkc1wiLFxuICAgIFwiZG93bmxvYWRMaW1pdFwiOiAxMDAsXG4gICAgXCJkb3dubG9hZExpbWl0ZWRcIjogZmFsc2UsXG4gICAgXCJkb3dubG9hZGVkRXZlclwiOiA3NTkwNzk2ODgsXG4gICAgXCJlcnJvclwiOiAwLFxuICAgIFwiZXJyb3JTdHJpbmdcIjogXCJcIixcbiAgICBcImV0YVwiOiAtMSxcbiAgICBcImV0YUlkbGVcIjogLTEsXG4gICAgXCJmaWxlU3RhdHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcImJ5dGVzQ29tcGxldGVkXCI6IDcxODI3NDU2MCxcbiAgICAgICAgICAgIFwicHJpb3JpdHlcIjogMCxcbiAgICAgICAgICAgIFwid2FudGVkXCI6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJmaWxlc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiYnl0ZXNDb21wbGV0ZWRcIjogNzE4Mjc0NTYwLFxuICAgICAgICAgICAgXCJsZW5ndGhcIjogNzE4Mjc0NTYwLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwidWJ1bnR1LTE3LjA0LXNlcnZlci1hbWQ2NC5pc29cIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImhhc2hTdHJpbmdcIjogXCI4ODU2YjkzMDk5NDA4YWUwZWJiOGNkN2JjN2JkYjlhN2Y4MGFkNjQ4XCIsXG4gICAgXCJoYXZlVW5jaGVja2VkXCI6IDAsXG4gICAgXCJoYXZlVmFsaWRcIjogNzE4Mjc0NTYwLFxuICAgIFwiaG9ub3JzU2Vzc2lvbkxpbWl0c1wiOiB0cnVlLFxuICAgIFwiaWRcIjogMSxcbiAgICBcImlzRmluaXNoZWRcIjogZmFsc2UsXG4gICAgXCJpc1ByaXZhdGVcIjogZmFsc2UsXG4gICAgXCJpc1N0YWxsZWRcIjogZmFsc2UsXG4gICAgXCJsZWZ0VW50aWxEb25lXCI6IDAsXG4gICAgXCJtYWduZXRMaW5rXCI6IFwibWFnbmV0Oj94dD11cm46YnRpaDo4ODU2YjkzMDk5NDA4YWUwZWJiOGNkN2JjN2JkYjlhN2Y4MGFkNjQ4JmRuPXVidW50dS0xNy4wNC1zZXJ2ZXItYW1kNjQuaXNvJnRyPWh0dHAlM0ElMkYlMkZ0b3JyZW50LnVidW50dS5jb20lM0E2OTY5JTJGYW5ub3VuY2UmdHI9aHR0cCUzQSUyRiUyRmlwdjYudG9ycmVudC51YnVudHUuY29tJTNBNjk2OSUyRmFubm91bmNlXCIsXG4gICAgXCJtYW51YWxBbm5vdW5jZVRpbWVcIjogLTEsXG4gICAgXCJtYXhDb25uZWN0ZWRQZWVyc1wiOiA1MCxcbiAgICBcIm1ldGFkYXRhUGVyY2VudENvbXBsZXRlXCI6IDEsXG4gICAgXCJuYW1lXCI6IFwidWJ1bnR1LTE3LjA0LXNlcnZlci1hbWQ2NC5pc29cIixcbiAgICBcInBlZXItbGltaXRcIjogNTAsXG4gICAgXCJwZWVyc1wiOiBbXSxcbiAgICBcInBlZXJzQ29ubmVjdGVkXCI6IDAsXG4gICAgXCJwZWVyc0Zyb21cIjoge1xuICAgICAgICBcImZyb21DYWNoZVwiOiAwLFxuICAgICAgICBcImZyb21EaHRcIjogMCxcbiAgICAgICAgXCJmcm9tSW5jb21pbmdcIjogMCxcbiAgICAgICAgXCJmcm9tTHBkXCI6IDAsXG4gICAgICAgIFwiZnJvbUx0ZXBcIjogMCxcbiAgICAgICAgXCJmcm9tUGV4XCI6IDAsXG4gICAgICAgIFwiZnJvbVRyYWNrZXJcIjogMFxuICAgIH0sXG4gICAgXCJwZWVyc0dldHRpbmdGcm9tVXNcIjogMCxcbiAgICBcInBlZXJzU2VuZGluZ1RvVXNcIjogMCxcbiAgICBcInBlcmNlbnREb25lXCI6IDEsXG4gICAgXCJwaWVjZUNvdW50XCI6IDEzNzAsXG4gICAgXCJwaWVjZVNpemVcIjogNTI0Mjg4LFxuICAgIFwicGllY2VzXCI6IFwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vd0E9PVwiLFxuICAgIFwicHJpb3JpdGllc1wiOiBbXG4gICAgICAgIDBcbiAgICBdLFxuICAgIFwicXVldWVQb3NpdGlvblwiOiAwLFxuICAgIFwicmF0ZURvd25sb2FkXCI6IDAsXG4gICAgXCJyYXRlVXBsb2FkXCI6IDAsXG4gICAgXCJyZWNoZWNrUHJvZ3Jlc3NcIjogMCxcbiAgICBcInNlY29uZHNEb3dubG9hZGluZ1wiOiAxNTcsXG4gICAgXCJzZWNvbmRzU2VlZGluZ1wiOiAxMTMwLFxuICAgIFwic2VlZElkbGVMaW1pdFwiOiAzMCxcbiAgICBcInNlZWRJZGxlTW9kZVwiOiAwLFxuICAgIFwic2VlZFJhdGlvTGltaXRcIjogMixcbiAgICBcInNlZWRSYXRpb01vZGVcIjogMCxcbiAgICBcInNpemVXaGVuRG9uZVwiOiA3MTgyNzQ1NjAsXG4gICAgXCJzdGFydERhdGVcIjogMTQ5NjE3NDc4MyxcbiAgICBcInN0YXR1c1wiOiA2LFxuICAgIFwidG9ycmVudEZpbGVcIjogXCIvaG9tZS9leGFtcGxlLy5jb25maWcvdHJhbnNtaXNzaW9uL3RvcnJlbnRzL3VidW50dS0xNy4wNC1zZXJ2ZXItYW1kNjQuaXNvLjg4NTZiOTMwOTk0MDhhZTAudG9ycmVudFwiLFxuICAgIFwidG90YWxTaXplXCI6IDcxODI3NDU2MCxcbiAgICBcInRyYWNrZXJTdGF0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiYW5ub3VuY2VcIjogXCJodHRwOi8vdG9ycmVudC51YnVudHUuY29tOjY5NjkvYW5ub3VuY2VcIixcbiAgICAgICAgICAgIFwiYW5ub3VuY2VTdGF0ZVwiOiAxLFxuICAgICAgICAgICAgXCJkb3dubG9hZENvdW50XCI6IC0xLFxuICAgICAgICAgICAgXCJoYXNBbm5vdW5jZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaGFzU2NyYXBlZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJob3N0XCI6IFwiaHR0cDovL3RvcnJlbnQudWJ1bnR1LmNvbTo2OTY5XCIsXG4gICAgICAgICAgICBcImlkXCI6IDAsXG4gICAgICAgICAgICBcImlzQmFja3VwXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsYXN0QW5ub3VuY2VQZWVyQ291bnRcIjogNTAsXG4gICAgICAgICAgICBcImxhc3RBbm5vdW5jZVJlc3VsdFwiOiBcIlN1Y2Nlc3NcIixcbiAgICAgICAgICAgIFwibGFzdEFubm91bmNlU3RhcnRUaW1lXCI6IDE0OTYxNzQ5MzQsXG4gICAgICAgICAgICBcImxhc3RBbm5vdW5jZVN1Y2NlZWRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJsYXN0QW5ub3VuY2VUaW1lXCI6IDE0OTYxNzQ5MzUsXG4gICAgICAgICAgICBcImxhc3RBbm5vdW5jZVRpbWVkT3V0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsYXN0U2NyYXBlUmVzdWx0XCI6IFwiXCIsXG4gICAgICAgICAgICBcImxhc3RTY3JhcGVTdGFydFRpbWVcIjogMCxcbiAgICAgICAgICAgIFwibGFzdFNjcmFwZVN1Y2NlZWRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgXCJsYXN0U2NyYXBlVGltZVwiOiAxNDk2MTc0OTM1LFxuICAgICAgICAgICAgXCJsYXN0U2NyYXBlVGltZWRPdXRcIjogMCxcbiAgICAgICAgICAgIFwibGVlY2hlckNvdW50XCI6IDEzLFxuICAgICAgICAgICAgXCJuZXh0QW5ub3VuY2VUaW1lXCI6IDE0OTYxNzY3MzUsXG4gICAgICAgICAgICBcIm5leHRTY3JhcGVUaW1lXCI6IDE0OTYxNzY3NDAsXG4gICAgICAgICAgICBcInNjcmFwZVwiOiBcImh0dHA6Ly90b3JyZW50LnVidW50dS5jb206Njk2OS9zY3JhcGVcIixcbiAgICAgICAgICAgIFwic2NyYXBlU3RhdGVcIjogMSxcbiAgICAgICAgICAgIFwic2VlZGVyQ291bnRcIjogOTMxLFxuICAgICAgICAgICAgXCJ0aWVyXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJhbm5vdW5jZVwiOiBcImh0dHA6Ly9pcHY2LnRvcnJlbnQudWJ1bnR1LmNvbTo2OTY5L2Fubm91bmNlXCIsXG4gICAgICAgICAgICBcImFubm91bmNlU3RhdGVcIjogMSxcbiAgICAgICAgICAgIFwiZG93bmxvYWRDb3VudFwiOiAtMSxcbiAgICAgICAgICAgIFwiaGFzQW5ub3VuY2VkXCI6IHRydWUsXG4gICAgICAgICAgICBcImhhc1NjcmFwZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaG9zdFwiOiBcImh0dHA6Ly9pcHY2LnRvcnJlbnQudWJ1bnR1LmNvbTo2OTY5XCIsXG4gICAgICAgICAgICBcImlkXCI6IDEsXG4gICAgICAgICAgICBcImlzQmFja3VwXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsYXN0QW5ub3VuY2VQZWVyQ291bnRcIjogMCxcbiAgICAgICAgICAgIFwibGFzdEFubm91bmNlUmVzdWx0XCI6IFwiQ291bGQgbm90IGNvbm5lY3QgdG8gdHJhY2tlclwiLFxuICAgICAgICAgICAgXCJsYXN0QW5ub3VuY2VTdGFydFRpbWVcIjogMCxcbiAgICAgICAgICAgIFwibGFzdEFubm91bmNlU3VjY2VlZGVkXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsYXN0QW5ub3VuY2VUaW1lXCI6IDE0OTYxNzQ5MzQsXG4gICAgICAgICAgICBcImxhc3RBbm5vdW5jZVRpbWVkT3V0XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJsYXN0U2NyYXBlUmVzdWx0XCI6IFwiQ291bGQgbm90IGNvbm5lY3QgdG8gdHJhY2tlclwiLFxuICAgICAgICAgICAgXCJsYXN0U2NyYXBlU3RhcnRUaW1lXCI6IDAsXG4gICAgICAgICAgICBcImxhc3RTY3JhcGVTdWNjZWVkZWRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxhc3RTY3JhcGVUaW1lXCI6IDE0OTYxNzU3NDAsXG4gICAgICAgICAgICBcImxhc3RTY3JhcGVUaW1lZE91dFwiOiAwLFxuICAgICAgICAgICAgXCJsZWVjaGVyQ291bnRcIjogLTEsXG4gICAgICAgICAgICBcIm5leHRBbm5vdW5jZVRpbWVcIjogMTQ5NjE3Njc4OSxcbiAgICAgICAgICAgIFwibmV4dFNjcmFwZVRpbWVcIjogMTQ5NjE3OTM3MCxcbiAgICAgICAgICAgIFwic2NyYXBlXCI6IFwiaHR0cDovL2lwdjYudG9ycmVudC51YnVudHUuY29tOjY5Njkvc2NyYXBlXCIsXG4gICAgICAgICAgICBcInNjcmFwZVN0YXRlXCI6IDEsXG4gICAgICAgICAgICBcInNlZWRlckNvdW50XCI6IC0xLFxuICAgICAgICAgICAgXCJ0aWVyXCI6IDFcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFja2Vyc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiYW5ub3VuY2VcIjogXCJodHRwOi8vdG9ycmVudC51YnVudHUuY29tOjY5NjkvYW5ub3VuY2VcIixcbiAgICAgICAgICAgIFwiaWRcIjogMCxcbiAgICAgICAgICAgIFwic2NyYXBlXCI6IFwiaHR0cDovL3RvcnJlbnQudWJ1bnR1LmNvbTo2OTY5L3NjcmFwZVwiLFxuICAgICAgICAgICAgXCJ0aWVyXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJhbm5vdW5jZVwiOiBcImh0dHA6Ly9pcHY2LnRvcnJlbnQudWJ1bnR1LmNvbTo2OTY5L2Fubm91bmNlXCIsXG4gICAgICAgICAgICBcImlkXCI6IDEsXG4gICAgICAgICAgICBcInNjcmFwZVwiOiBcImh0dHA6Ly9pcHY2LnRvcnJlbnQudWJ1bnR1LmNvbTo2OTY5L3NjcmFwZVwiLFxuICAgICAgICAgICAgXCJ0aWVyXCI6IDFcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJ1cGxvYWRMaW1pdFwiOiAxMDAsXG4gICAgXCJ1cGxvYWRMaW1pdGVkXCI6IGZhbHNlLFxuICAgIFwidXBsb2FkUmF0aW9cIjogMC4wMTQ5LFxuICAgIFwidXBsb2FkZWRFdmVyXCI6IDExMzY2OTUwLFxuICAgIFwid2FudGVkXCI6IFtcbiAgICAgICAgMVxuICAgIF0sXG4gICAgXCJ3ZWJzZWVkc1wiOiBbXSxcbiAgICBcIndlYnNlZWRzU2VuZGluZ1RvVXNcIjogMFxufVxuXG5jb25zdCBkZWZhdWx0U2Vzc2lvblN0YXQgPSB7XG4gICAgXCJhY3RpdmVUb3JyZW50Q291bnRcIjogMCxcbiAgICBcImN1bXVsYXRpdmUtc3RhdHNcIjoge1xuICAgICAgICBcImRvd25sb2FkZWRCeXRlc1wiOiA3NDI5NTUyNTg5OSxcbiAgICAgICAgXCJmaWxlc0FkZGVkXCI6IDExOCxcbiAgICAgICAgXCJzZWNvbmRzQWN0aXZlXCI6IDcxNjI2LFxuICAgICAgICBcInNlc3Npb25Db3VudFwiOiA1LFxuICAgICAgICBcInVwbG9hZGVkQnl0ZXNcIjogMzYyMDg4MzgxMzBcbiAgICB9LFxuICAgIFwiY3VycmVudC1zdGF0c1wiOiB7XG4gICAgICAgIFwiZG93bmxvYWRlZEJ5dGVzXCI6IDAsXG4gICAgICAgIFwiZmlsZXNBZGRlZFwiOiAwLFxuICAgICAgICBcInNlY29uZHNBY3RpdmVcIjogNjAxMSxcbiAgICAgICAgXCJzZXNzaW9uQ291bnRcIjogMSxcbiAgICAgICAgXCJ1cGxvYWRlZEJ5dGVzXCI6IDBcbiAgICB9LFxuICAgIFwiZG93bmxvYWRTcGVlZFwiOiAwLFxuICAgIFwicGF1c2VkVG9ycmVudENvdW50XCI6IDEsXG4gICAgXCJ0b3JyZW50Q291bnRcIjogMSxcbiAgICBcInVwbG9hZFNwZWVkXCI6IDBcbn1cblxuZXhwb3J0IGNsYXNzIE1vY2tTZXJ2ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIHByaXZhdGUgaWRDb3VudCA9IDE7XG4gICAgcHJpdmF0ZSBzZXJ2ZXI6IGh0dHAuU2VydmVyO1xuICAgIHByaXZhdGUgb3B0aW9uczogTW9ja1NlcnZlck9wdGlvbnM7XG4gICAgcHJpdmF0ZSB0b3JyZW50TGlzdDogSVRvcnJlbnRbXSA9IFtkZWZhdWx0VG9ycmVudF07XG4gICAgcHJpdmF0ZSBzZXNzaW9uOiBJU2Vzc2lvbiA9IGRlZmF1bHRTZXNzaW9uO1xuICAgIHByaXZhdGUgc2Vzc2lvblN0YXQgPSBkZWZhdWx0U2Vzc2lvblN0YXQ7XG4gICAgcHJpdmF0ZSBtZXRob2RzOiBNZXRob2REaWN0ID0ge1xuICAgICAgICBcInRvcnJlbnQtc3RhcnRcIjogKGFyZ3MsIGNiKSA9PiB7IGNiKCkgfSxcbiAgICAgICAgXCJ0b3JyZW50LXN0YXJ0LW5vd1wiOiAoYXJncywgY2IpID0+IHsgY2IoKSB9LFxuICAgICAgICBcInRvcnJlbnQtc3RvcFwiOiAoYXJncywgY2IpID0+IHsgY2IoKSB9LFxuICAgICAgICBcInRvcnJlbnQtdmVyaWZ5XCI6IChhcmdzLCBjYikgPT4geyBjYigpIH0sXG4gICAgICAgIFwidG9ycmVudC1yZWFubm91bmNlXCI6IChhcmdzLCBjYikgPT4geyBjYigpIH0sXG4gICAgICAgIFwidG9ycmVudC1zZXRcIjogKGFyZ3MsIGNiKSA9PiB7IGNiKCkgfSxcbiAgICAgICAgXCJ0b3JyZW50LWdldFwiOiAoYXJncywgY2IpID0+IHsgdGhpcy5nZXRUb3JyZW50KGFyZ3MsIGNiKSB9LFxuICAgICAgICBcInRvcnJlbnQtYWRkXCI6IChhcmdzLCBjYikgPT4geyB0aGlzLmFkZFRvcnJlbnQoYXJncywgY2IpIH0sXG4gICAgICAgIFwidG9ycmVudC1yZW1vdmVcIjogKGFyZ3MsIGNiKSA9PiB7IHRoaXMucmVtb3ZlVG9ycmVudChhcmdzLCBjYikgfSxcbiAgICAgICAgXCJ0b3JyZW50LXNldC1sb2NhdGlvblwiOiAoYXJncywgY2IpID0+IHsgIWFyZ3MuaGFzT3duUHJvcGVydHkoXCJsb2NhdGlvblwiKSA/IGNiKFwibm8gbG9jYXRpb25cIiwgbnVsbCkgOiBjYigpIH0sXG4gICAgICAgIFwidG9ycmVudC1yZW5hbWUtcGF0aFwiOiAoYXJncywgY2IpID0+IHsgdGhpcy5yZW5hbWVUb3JyZW50KGFyZ3MsIGNiKSB9LFxuICAgICAgICBcInNlc3Npb24tc2V0XCI6IChhcmdzLCBjYikgPT4geyBjYigpIH0sXG4gICAgICAgIFwic2Vzc2lvbi1nZXRcIjogKGFyZ3MsIGNiKSA9PiB7IGNiKG51bGwsIHRoaXMuc2Vzc2lvbikgfSxcbiAgICAgICAgXCJzZXNzaW9uLXN0YXRzXCI6IChhcmdzLCBjYikgPT4geyBjYihudWxsLCB0aGlzLnNlc3Npb25TdGF0KSB9LFxuICAgICAgICBcImJsb2NrbGlzdC11cGRhdGVcIjogKGFyZ3MsIGNiKSA9PiB7IGNiKG51bGwsIHsgXCJibG9ja2xpc3Qtc2l6ZVwiOiA0IH0pIH0sXG4gICAgICAgIFwicG9ydC10ZXN0XCI6IChhcmdzLCBjYikgPT4geyBjYihudWxsLCB7IFwicG9ydC1pcy1vcGVuXCI6IHRydWUgfSkgfSxcbiAgICAgICAgXCJzZXNzaW9uLWNsb3NlXCI6IChhcmdzLCBjYikgPT4geyBjYigpIH0sXG4gICAgICAgIFwicXVldWUtbW92ZS10b3BcIjogKGFyZ3MsIGNiKSA9PiB7IGNiKCkgfSxcbiAgICAgICAgXCJxdWV1ZS1tb3ZlLXVwXCI6IChhcmdzLCBjYikgPT4geyBjYigpIH0sXG4gICAgICAgIFwicXVldWUtbW92ZS1kb3duXCI6IChhcmdzLCBjYikgPT4geyBjYigpIH0sXG4gICAgICAgIFwicXVldWUtbW92ZS1ib3R0b21cIjogKGFyZ3MsIGNiKSA9PiB7IGNiKCkgfSxcbiAgICAgICAgXCJmcmVlLXNwYWNlXCI6IChhcmdzOiB7IHBhdGg/OiBzdHJpbmcgfSwgY2IpID0+IHtcbiAgICAgICAgICAgIGlmICghYXJncyB8fCAhYXJncy5wYXRoKSB7XG4gICAgICAgICAgICAgICAgY2IoXCJkaXJlY3RvcnkgcGF0aCBhcmd1bWVudCBpcyBtaXNzaW5nXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNiKG51bGwsIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogYXJncy5wYXRoLFxuICAgICAgICAgICAgICAgIFwic2l6ZS1ieXRlc1wiOiA4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTW9ja1NlcnZlck9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgcG9ydDogOTA5MSxcbiAgICAgICAgICAgIHBhdGg6IFwiL3RyYW5zbWlzc2lvbi9ycGNcIixcbiAgICAgICAgICAgIGhvc3Q6IFwiMTI3LjAuMC4xXCJcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZW1pdChldmVudDogXCJkYXRhXCIsIGRhdGE6IE1vY2tTZXJ2ZXJSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3VwZXIuZW1pdChldmVudCwgZGF0YSk7XG4gICAgfVxuICAgIG9uKGV2ZW50OiBcImRhdGFcIiwgbGlzdGVuZXI6IChkYXRhOiBNb2NrU2VydmVyUmVzcG9uc2UpID0+IHZvaWQpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uKGV2ZW50LGxpc3RlbmVyKTtcbiAgICB9XG4gICAgb25jZShldmVudDogXCJkYXRhXCIsIGxpc3RlbmVyOiAoZGF0YTogTW9ja1NlcnZlclJlc3BvbnNlKSA9PiB2b2lkKTogdGhpcyB7XG4gICAgICAgIHJldHVybiBzdXBlci5vbmNlKGV2ZW50LGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIoZXZlbnQ6IFwiZGF0YVwiLCBsaXN0ZW5lcjogKGRhdGE6IE1vY2tTZXJ2ZXJSZXNwb25zZSkgPT4gdm9pZCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkTGlzdGVuZXIoZXZlbnQsbGlzdGVuZXIpO1xuICAgIH1cbiAgICBwcmVwZW5kTGlzdGVuZXIoZXZlbnQ6IFwiZGF0YVwiLCBsaXN0ZW5lcjogKGRhdGE6IE1vY2tTZXJ2ZXJSZXNwb25zZSkgPT4gdm9pZCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gc3VwZXIucHJlcGVuZExpc3RlbmVyKGV2ZW50LGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcHJlcGVuZE9uY2VMaXN0ZW5lcihldmVudDogXCJkYXRhXCIsIGxpc3RlbmVyOiAoZGF0YTogTW9ja1NlcnZlclJlc3BvbnNlKSA9PiB2b2lkKTogdGhpcyB7XG4gICAgICAgIHJldHVybiBzdXBlci5wcmVwZW5kT25jZUxpc3RlbmVyKGV2ZW50LGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIoZXZlbnQ6IFwiZGF0YVwiLCBsaXN0ZW5lcjogKGRhdGE6IE1vY2tTZXJ2ZXJSZXNwb25zZSkgPT4gdm9pZCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gc3VwZXIucmVtb3ZlTGlzdGVuZXIoZXZlbnQsbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9ycmVudChhcmdzOiBhbnksIGNiOiBDYWxsYmFjazx7XCJ0b3JyZW50LWFkZGVkXCI6e2lkOm51bWJlciwgbmFtZTpzdHJpbmcsIGhhc2hTdHJpbmc6c3RyaW5nfX0+KSB7XG4gICAgICAgIGNvbnN0IHNoYTEgPSBjcmVhdGVIYXNoKCdzaGExJyk7XG4gICAgICAgIGxldCBpZCA9IHRoaXMuaWRDb3VudCsrO1xuICAgICAgICBsZXQgdG9ycmVudFN0dWIgPSB7IGlkOiBpZCwgbmFtZTogXCJ0ZW1wLXRvcnJlbnQgXCIraWQsIGhhc2hTdHJpbmc6IChNYXRoLnJhbmRvbSgpKjEwMCkudG9TdHJpbmcoKX07XG4gICAgICAgIHNoYTEudXBkYXRlKEpTT04uc3RyaW5naWZ5KHRvcnJlbnRTdHViKSk7XG4gICAgICAgIHRvcnJlbnRTdHViLmhhc2hTdHJpbmcgPSBzaGExLmRpZ2VzdCgnaGV4Jyk7XG4gICAgICAgIHRoaXMudG9ycmVudExpc3QucHVzaChPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VG9ycmVudCwgdG9ycmVudFN0dWIpKTtcbiAgICAgICAgY2IobnVsbCwge1widG9ycmVudC1hZGRlZFwiOiB0b3JyZW50U3R1Yn0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlVG9ycmVudChhcmdzOntpZHM/OiBzdHJpbmd8c3RyaW5nW118bnVtYmVyfG51bWJlcltdLCBkZWxldGVMb2NhbERhdGE/OmJvb2xlYW59LCBjYjogQ2FsbGJhY2s8bnVsbD4pIHtcbiAgICAgICAgaWYgKGFyZ3MuaWRzICYmICFBcnJheS5pc0FycmF5KGFyZ3MuaWRzKSkge1xuICAgICAgICAgICAgYXJncy5pZHMgPSBbPGFueT5hcmdzLmlkc107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5pZHMgJiYgQXJyYXkuaXNBcnJheShhcmdzLmlkcykpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmlkcy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzLmlkc1swXSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICB0aGlzLnRvcnJlbnRMaXN0ID0gdGhpcy50b3JyZW50TGlzdC5maWx0ZXIodCA9PiAhfig8c3RyaW5nW10+YXJncy5pZHMpLmluZGV4T2YodC5oYXNoU3RyaW5nKSk7XG4gICAgICAgICAgICBlbHNlIGlmIChhcmdzLmlkcy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzLmlkc1swXSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICB0aGlzLnRvcnJlbnRMaXN0ID0gdGhpcy50b3JyZW50TGlzdC5maWx0ZXIodCA9PiAhfig8bnVtYmVyW10+YXJncy5pZHMpLmluZGV4T2YodC5pZCkpO1xuICAgICAgICAgICAgZWxzZSBpZiAoYXJncy5pZHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgdGhpcy50b3JyZW50TGlzdCA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b3JyZW50TGlzdCA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY2IoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmFtZVRvcnJlbnQoYXJnczogeyBpZHM/OiBzdHJpbmd8c3RyaW5nW118bnVtYmVyfG51bWJlcltdLCBwYXRoPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nIH0sXG4gICAgICAgIGNiOiBDYWxsYmFjazx7IHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBpZDogbnVtYmVyIHwgc3RyaW5nIH0+KTogdm9pZCB7XG4gICAgICAgIGlmICghYXJncyB8fCAhYXJncy5pZHMgfHwgQXJyYXkuaXNBcnJheShhcmdzLmlkcykgJiYgYXJncy5pZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNiKFwidG9ycmVudC1yZW5hbWUtcGF0aCByZXF1aXJlcyAxIHRvcnJlbnRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5pZHMgJiYgIUFycmF5LmlzQXJyYXkoYXJncy5pZHMpKSB7XG4gICAgICAgICAgICBhcmdzLmlkcyA9IFs8YW55PmFyZ3MuaWRzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYXJncy5uYW1lIHx8ICFhcmdzLnBhdGgpIHtcbiAgICAgICAgICAgIGNiKFwiSW52YWxpZCBhcmd1bWVudFwiLCB7IGlkOiAoPGFueVtdPmFyZ3MuaWRzKVswXSwgcGF0aDogXCJcIiwgbmFtZTogXCJcIiB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlkeCA9IC0xO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzLmlkcykgJiYgdHlwZW9mIGFyZ3MuaWRzWzBdID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgaWR4ID0gdGhpcy50b3JyZW50TGlzdC5maW5kSW5kZXgodCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQuaGFzaFN0cmluZyA9PSAoPHN0cmluZ1tdPmFyZ3MuaWRzKVswXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZ3MuaWRzKSAmJiB0eXBlb2YgYXJncy5pZHNbMF0gPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICBpZHggPSB0aGlzLnRvcnJlbnRMaXN0LmZpbmRJbmRleCh0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdC5pZCA9PSAoPG51bWJlcltdPmFyZ3MuaWRzKVswXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlkeCAhPSAtMSlcbiAgICAgICAgICAgIHRoaXMudG9ycmVudExpc3RbaWR4XS5uYW1lID0gYXJncy5uYW1lO1xuXG4gICAgICAgIGNiKG51bGwsIHsgaWQ6IHRoaXMudG9ycmVudExpc3RbaWR4XS5pZCwgbmFtZTogYXJncy5uYW1lLCBwYXRoOiBhcmdzLnBhdGggfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUb3JyZW50KGFyZ3M6IHsgaWRzPzogc3RyaW5nfHN0cmluZ1tdfG51bWJlcnxudW1iZXJbXSwgZmllbGRzPzogc3RyaW5nW10gfSwgY2I6IENhbGxiYWNrPHsgdG9ycmVudHM6IElUb3JyZW50W10gfT4pOiB2b2lkIHtcbiAgICAgICAgbGV0IHRlbXBUb3JyZW50czogSVRvcnJlbnRbXSA9IFtdO1xuICAgICAgICBsZXQgdG9ycmVudHM6IElUb3JyZW50W10gPSBbXTtcblxuICAgICAgICBpZiAoIWFyZ3MuaGFzT3duUHJvcGVydHkoXCJmaWVsZHNcIikpIHtcbiAgICAgICAgICAgIGNiKFwibm8gZmllbGRzIHNwZWNpZmllZFwiLCB7IHRvcnJlbnRzOiBbXSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGFyZ3MuaWRzICYmICFBcnJheS5pc0FycmF5KGFyZ3MuaWRzKSkge1xuICAgICAgICAgICAgYXJncy5pZHMgPSBbPGFueT5hcmdzLmlkc107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5pZHMgJiYgQXJyYXkuaXNBcnJheShhcmdzLmlkcykpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmlkcy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzLmlkc1swXSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgdGVtcFRvcnJlbnRzID0gdGhpcy50b3JyZW50TGlzdC5maWx0ZXIodCA9PiB+KDxudW1iZXJbXT5hcmdzLmlkcykuaW5kZXhPZih0LmlkKSk7XG4gICAgICAgICAgICBlbHNlIGlmIChhcmdzLmlkcy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzLmlkc1swXSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdGVtcFRvcnJlbnRzID0gdGhpcy50b3JyZW50TGlzdC5maWx0ZXIodCA9PiB+KDxzdHJpbmdbXT5hcmdzLmlkcykuaW5kZXhPZih0Lmhhc2hTdHJpbmcpKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MuaWRzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgICAgIHRlbXBUb3JyZW50cyA9IHRoaXMudG9ycmVudExpc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZW1wVG9ycmVudHMgPSB0aGlzLnRvcnJlbnRMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wVG9ycmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRvcnJlbnRzLnB1c2goe30pO1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRlbXBUb3JyZW50c1tpXSkge1xuICAgICAgICAgICAgICAgIGlmICh+YXJncy5maWVsZHMuaW5kZXhPZihrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PnRvcnJlbnRzW2ldKVtrZXldID0gKDxhbnk+dGVtcFRvcnJlbnRzW2ldKVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNiKG51bGwsIHsgdG9ycmVudHMgfSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9ycmVudExpc3QgPSBbZGVmYXVsdFRvcnJlbnRdO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBkZWZhdWx0U2Vzc2lvbjtcbiAgICAgICAgdGhpcy5zZXNzaW9uU3RhdCA9IGRlZmF1bHRTZXNzaW9uU3RhdDtcbiAgICAgICAgdGhpcy5pZENvdW50ID0gMTtcbiAgICB9XG5cbiAgICBzdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmkgPSB1cmwucGFyc2UocmVxLnVybCkucGF0aG5hbWU7XG4gICAgICAgICAgICBpZiAodXJpICE9PSB0aGlzLm9wdGlvbnMucGF0aCkge1xuICAgICAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDA0LCBcIk5vdCBGb3VuZDogXCIgKyB1cmksIHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L2h0bWxcIiB9KTtcbiAgICAgICAgICAgICAgICByZXMuZW5kKFwiPGgxPjQwNDogTm90IEZvdW5kPC9oMT5cIiArIHVyaSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcS5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG4gICAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCg0MDUsIFwiTWV0aG9kIG5vdCBhbGxvd2VkXCIsIHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L2h0bWxcIiB9KTtcbiAgICAgICAgICAgICAgICByZXMuZW5kKFwiPGgxPjQwNTogTWV0aG9kIG5vdCBhbGxvd2VkPC9oMT5cIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGE6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgbGV0IGRlY29kZXIgPSBuZXcgc2QuU3RyaW5nRGVjb2RlcihcInV0Zi04XCIpO1xuXG4gICAgICAgICAgICAgICAgcmVxLm9uKFwiZGF0YVwiLCBjaHVuayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgKz0gZGVjb2Rlci53cml0ZSg8QnVmZmVyPmNodW5rKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlcS5vbihcImVuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0OiBUcmFuc21pc3Npb25SZXF1ZXN0ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlOiBUcmFuc21pc3Npb25SZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IHt9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnRhZykgcmVzcG9uc2UudGFnID0gcmVxdWVzdC50YWc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tZXRob2RzLmhhc093blByb3BlcnR5KHJlcXVlc3QubWV0aG9kKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucmVzdWx0ID0gXCJtZXRob2Qgbm90IHJlY29nbml6ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kc1tyZXF1ZXN0Lm1ldGhvZF0ocmVxdWVzdC5hcmd1bWVudHMsIChlcnIsIGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXNwb25zZS5yZXN1bHQgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MpIHJlc3BvbnNlLmFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LUxlbmd0aFwiOiBCdWZmZXIuYnl0ZUxlbmd0aChib2R5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZW5kKGJvZHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdkYXRhJywgeyByZXE6IHJlcXVlc3QsIHJlczogcmVzcG9uc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlcnZlci5saXN0ZW4odGhpcy5vcHRpb25zLnBvcnQsIHRoaXMub3B0aW9ucy5ob3N0KTtcbiAgICB9XG5cbiAgICBzdG9wKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlcnZlci5jbG9zZSgpO1xuICAgIH1cbn0iXX0=
