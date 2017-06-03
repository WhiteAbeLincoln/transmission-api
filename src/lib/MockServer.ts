import * as http from "http";
import * as url from "url";
import * as sd from "string_decoder";
import * as EventEmitter from "events";
import { createHash } from "crypto";
import { TransmissionRequest, TransmissionResponse } from "./Communication";
import { ISession } from "./Session";
import { ITorrent } from "./Torrent";

type Callback<T> = (err?: string, args?: T) => void
type MethodDict = { [key: string]: (args: object, cb: Callback<object>) => void }
export type MockServerResponse = { req: TransmissionRequest, res: TransmissionResponse };

export interface MockServerOptions {
    port?: number;
    host?: string;
    path?: string;
}

const defaultSession: ISession = {
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
}

const defaultTorrent: ITorrent = {
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
}

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
}

export class MockServer extends EventEmitter {
    private idCount = 1;
    private server: http.Server;
    private options: MockServerOptions;
    private torrentList: ITorrent[] = [defaultTorrent];
    private session: ISession = defaultSession;
    private sessionStat = defaultSessionStat;
    private methods: MethodDict = {
        "torrent-start": (args, cb) => { cb() },
        "torrent-start-now": (args, cb) => { cb() },
        "torrent-stop": (args, cb) => { cb() },
        "torrent-verify": (args, cb) => { cb() },
        "torrent-reannounce": (args, cb) => { cb() },
        "torrent-set": (args, cb) => { cb() },
        "torrent-get": (args, cb) => { this.getTorrent(args, cb) },
        "torrent-add": (args, cb) => { this.addTorrent(args, cb) },
        "torrent-remove": (args, cb) => { this.removeTorrent(args, cb) },
        "torrent-set-location": (args, cb) => { !args.hasOwnProperty("location") ? cb("no location", null) : cb() },
        "torrent-rename-path": (args, cb) => { this.renameTorrent(args, cb) },
        "session-set": (args, cb) => { cb() },
        "session-get": (args, cb) => { cb(null, this.session) },
        "session-stats": (args, cb) => { cb(null, this.sessionStat) },
        "blocklist-update": (args, cb) => { cb(null, { "blocklist-size": 4 }) },
        "port-test": (args, cb) => { cb(null, { "port-is-open": true }) },
        "session-close": (args, cb) => { cb() },
        "queue-move-top": (args, cb) => { cb() },
        "queue-move-up": (args, cb) => { cb() },
        "queue-move-down": (args, cb) => { cb() },
        "queue-move-bottom": (args, cb) => { cb() },
        "free-space": (args: { path?: string }, cb) => {
            if (!args || !args.path) {
                cb("directory path argument is missing");
                return;
            }
            cb(null, {
                "path": args.path,
                "size-bytes": 8
            });
        },
    }

    constructor(options?: MockServerOptions) {
        super();
        this.options = Object.assign({}, {
            port: 9091,
            path: "/transmission/rpc",
            host: "127.0.0.1"
        }, options);
    }

    emit(event: "data", data: MockServerResponse): boolean {
        return super.emit(event, data);
    }
    on(event: "data", listener: (data: MockServerResponse) => void): this {
        return super.on(event,listener);
    }
    once(event: "data", listener: (data: MockServerResponse) => void): this {
        return super.once(event,listener);
    }
    addListener(event: "data", listener: (data: MockServerResponse) => void): this {
        return super.addListener(event,listener);
    }
    prependListener(event: "data", listener: (data: MockServerResponse) => void): this {
        return super.prependListener(event,listener);
    }
    prependOnceListener(event: "data", listener: (data: MockServerResponse) => void): this {
        return super.prependOnceListener(event,listener);
    }
    removeListener(event: "data", listener: (data: MockServerResponse) => void): this {
        return super.removeListener(event,listener);
    }

    private addTorrent(args: any, cb: Callback<{"torrent-added":{id:number, name:string, hashString:string}}>) {
        const sha1 = createHash('sha1');
        let id = this.idCount++;
        let torrentStub = { id: id, name: "temp-torrent "+id, hashString: (Math.random()*100).toString()};
        sha1.update(JSON.stringify(torrentStub));
        torrentStub.hashString = sha1.digest('hex');
        this.torrentList.push(Object.assign({}, defaultTorrent, torrentStub));
        cb(null, {"torrent-added": torrentStub});
    }

    private removeTorrent(args:{ids?: string|string[]|number|number[], deleteLocalData?:boolean}, cb: Callback<null>) {
        if (args.ids && !Array.isArray(args.ids)) {
            args.ids = [<any>args.ids];
        }

        if (args.ids && Array.isArray(args.ids)) {
            if (args.ids.length > 0 && typeof args.ids[0] === "string")
                this.torrentList = this.torrentList.filter(t => !~(<string[]>args.ids).indexOf(t.hashString));
            else if (args.ids.length > 0 && typeof args.ids[0] === "number")
                this.torrentList = this.torrentList.filter(t => !~(<number[]>args.ids).indexOf(t.id));
            else if (args.ids.length == 0)
                this.torrentList = [];
        } else {
            this.torrentList = [];
        }

        cb();
    }

    private renameTorrent(args: { ids?: string|string[]|number|number[], path?: string, name?: string },
        cb: Callback<{ path: string, name: string, id: number | string }>): void {
        if (!args || !args.ids || Array.isArray(args.ids) && args.ids.length == 0) {
            cb("torrent-rename-path requires 1 torrent");
            return;
        }

        if (args.ids && !Array.isArray(args.ids)) {
            args.ids = [<any>args.ids];
        }

        if (!args.name || !args.path) {
            cb("Invalid argument", { id: (<any[]>args.ids)[0], path: "", name: "" })
            return;
        }

        let idx = -1;
        if (Array.isArray(args.ids) && typeof args.ids[0] === "string")
            idx = this.torrentList.findIndex(t => {
                return t.hashString == (<string[]>args.ids)[0];
            });
        else if (Array.isArray(args.ids) && typeof args.ids[0] === "number")
            idx = this.torrentList.findIndex(t => {
                return t.id == (<number[]>args.ids)[0];
            });
        
        if (idx != -1)
            this.torrentList[idx].name = args.name;

        cb(null, { id: this.torrentList[idx].id, name: args.name, path: args.path });
    }

    private getTorrent(args: { ids?: string|string[]|number|number[], fields?: string[] }, cb: Callback<{ torrents: ITorrent[] }>): void {
        let tempTorrents: ITorrent[] = [];
        let torrents: ITorrent[] = [];

        if (!args.hasOwnProperty("fields")) {
            cb("no fields specified", { torrents: [] });
            return;
        }
        
        if (args.ids && !Array.isArray(args.ids)) {
            args.ids = [<any>args.ids];
        }

        if (args.ids && Array.isArray(args.ids)) {
            if (args.ids.length > 0 && typeof args.ids[0] === 'number')
                tempTorrents = this.torrentList.filter(t => ~(<number[]>args.ids).indexOf(t.id));
            else if (args.ids.length > 0 && typeof args.ids[0] === 'string')
                tempTorrents = this.torrentList.filter(t => ~(<string[]>args.ids).indexOf(t.hashString));
            else if (args.ids.length == 0)
                tempTorrents = this.torrentList;
        } else {
            tempTorrents = this.torrentList;
        }

        for (let i = 0; i < tempTorrents.length; i++) {
            torrents.push({});
            for (let key in tempTorrents[i]) {
                if (~args.fields.indexOf(key)) {
                    (<any>torrents[i])[key] = (<any>tempTorrents[i])[key];
                }
            }
        }

        cb(null, { torrents });
    }

    clear(): void {
        this.torrentList = [defaultTorrent];
        this.session = defaultSession;
        this.sessionStat = defaultSessionStat;
        this.idCount = 1;
    }

    start(): void {
        this.server = http.createServer((req, res) => {
            let uri = url.parse(req.url).pathname;
            if (uri !== this.options.path) {
                res.writeHead(404, "Not Found: " + uri, { "Content-Type": "text/html" });
                res.end("<h1>404: Not Found</h1>" + uri);
            } else if (req.method !== "POST") {
                res.writeHead(405, "Method not allowed", { "Content-Type": "text/html" });
                res.end("<h1>405: Method not allowed</h1>")
            } else {
                let data: string = "";
                let decoder = new sd.StringDecoder("utf-8");

                req.on("data", chunk => {
                    data += decoder.write(<Buffer>chunk);
                });

                req.on("end", () => {
                    let request: TransmissionRequest = JSON.parse(data);
                    let response: TransmissionResponse = {
                        result: "success",
                        arguments: {}
                    };
                    if (request.tag) response.tag = request.tag;
                    if (!this.methods.hasOwnProperty(request.method)) {
                        response.result = "method not recognized";
                    } else {
                        this.methods[request.method](request.arguments, (err, args) => {
                            if (err) response.result = err;
                            if (args) response.arguments = args;
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

    stop(): void {
        this.server.close();
    }
}