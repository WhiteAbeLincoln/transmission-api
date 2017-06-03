import * as http from "http";
import * as sd from "string_decoder";
import * as EventEmitter  from "events";
import * as url from "url";
import * as fs from "fs";
import { TransmissionRequest, TransmissionResponse } from "./Communication";
import { Session, ISession, SessionSetOptions } from "./Session";
import { Torrent, ITorrent, SetTorrentOptions, SetLocationOptions, RenameTorrentResponse, AddTorrentOptions } from "./Torrent"

export interface ClientOptions {
    protocol?: string;
    path?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
}

const defaultOpts: ClientOptions = {
    protocol: "http:",
    host: "127.0.0.1",
    path: "/transmission/rpc",
    port: 9091,
    username: null,
    password: null
}

const defaultFields: string[] = [
    "activityDate", "addedDate", "bandwidthPriority", "comment",
    "corruptEver", "creator", "dateCreated", "desiredAvailable",
    "doneDate", "downloadDir", "downloadedEver", "downloadLimit",
    "downloadLimited", "error", "errorString", "eta",
    "etaIdle", "files", "fileStats", "hashString",
    "haveUnchecked", "haveValid", "honorsSessionLimits",
    "isFinished", "isPrivate", "isStalled", "leftUntilDone",
    "magnetLink", "manualAnnounceTime", "maxConnectedPeers",
    "metadataPercentComplete", "name", "peer-limit", "peers",
    "peersConnected", "peersFrom", "peersGettingFromUs",
    "peersSendingToUs", "percentDone", "pieces", "pieceCount",
    "pieceSize", "priorities", "queuePosition", "rateDownload",
    "rateUpload", "recheckProgress", "secondsDownloading",
    "secondsSeeding", "seedIdleLimit", "seedIdleMode", "seedRatioLimit",
    "seedRatioMode", "sizeWhenDone", "startDate", "status",
    "trackers", "trackerStats", "totalSize", "torrentFile",
    "uploadedEver", "uploadLimit", "uploadLimited", "uploadRatio",
    "wanted", "webseeds", "webseedsSendingToUs"
]

export class Client extends EventEmitter {
    private needsAuth: boolean = false;
    private auth: string;
    private sessionID: string;
    options: ClientOptions;
    constructor(sessionID: string = null, options: ClientOptions = defaultOpts) {
        super();
        this.options = Object.assign({}, defaultOpts, options);
        if (sessionID) this.sessionID = sessionID;
        if (options.username) {
            this.needsAuth = true
            this.auth = options.username + ":" + options.password;
        }
    }

    emit(event: "response", data: TransmissionResponse): boolean
    emit(event: "request", data: TransmissionRequest): boolean
    emit(event: "response"|"request", data:any):boolean { return super.emit(event,data) }
    on(event: "response", listener: (data: TransmissionResponse) => void): this
    on(event: "request", listener: (data: TransmissionRequest) => void): this
    on(event: "response"|"request", listener: (data: any) => void): this { return super.on(event,listener); }
    once(event: "response", listener: (data: TransmissionResponse) => void): this
    once(event: "request", listener: (data: TransmissionRequest) => void): this
    once(event: "response"|"request", listener: (data: any) => void): this { return super.once(event,listener); }
    addListener(event: "response", listener: (data: TransmissionResponse) => void): this
    addListener(event: "request", listener: (data: TransmissionRequest) => void): this
    addListener(event: "response"|"request", listener: (data: any) => void): this { return super.addListener(event,listener); }
    prependListener(event: "response", listener: (data: TransmissionResponse) => void): this
    prependListener(event: "request", listener: (data: TransmissionRequest) => void): this
    prependListener(event: "response"|"request", listener: (data: any) => void): this { return super.prependListener(event,listener); }
    prependOnceListener(event: "response", listener: (data: TransmissionResponse) => void): this
    prependOnceListener(event: "request", listener: (data: TransmissionRequest) => void): this
    prependOnceListener(event: "response"|"request", listener: (data: any) => void): this { return super.prependOnceListener(event,listener); }
    removeListener(event: "response", listener: (data: TransmissionResponse) => void): this
    removeListener(event: "request", listener: (data: TransmissionRequest) => void): this
    removeListener(event: "response"|"request", listener: (data: any) => void): this { return super.removeListener(event,listener); }


    private convertIds(recent: "recently-active"): string
    private convertIds(torrent: Torrent): number
    private convertIds(torrents: Torrent[]): number[]
    private convertIds(id: number): number
    private convertIds(ids: number[]): number[]
    private convertIds(hash: string): string
    private convertIds(hashes: string[]): string[]
    private convertIds(ids: any) {
        if (Array.isArray(ids) && ids.length == 0) {
            ids = null;
        }

        if (ids) {
            if (typeof ids === "object" && !Array.isArray(ids)) {
                ids = (<Torrent>ids).id;
            } else if (Array.isArray(ids) && typeof ids[0] === "object") {
                ids = (<Torrent[]>ids).map(elem => { return elem.id })
            }
        }
        // else is number[] or string[] or number or string

        return ids;
    }

    async getAllTorrents(fields: string[] = defaultFields, notFields: string[] = []): Promise<Torrent[]> {
        let torrents = await this.getTorrent(null, fields, notFields);
        if (!torrents.length) return [<any>torrents as Torrent];
        else return torrents;
    }

    async getTorrent(recent: "recently-active", fields?: string[], notFields?: string[]): Promise<Torrent[]>
    // doesn't make sense, but might as well include it for consistency
    async getTorrent(torrent: Torrent, fields?: string[], notFields?: string[]): Promise<Torrent>
    async getTorrent(torrents: Torrent[], fields?: string[], notFields?: string[]): Promise<Torrent[]>
    async getTorrent(id: number, fields?: string[], notFields?: string[]): Promise<Torrent>
    async getTorrent(ids: number[], fields?: string[], notFields?: string[]): Promise<Torrent[]>
    async getTorrent(hash: string, fields?: string[], notFields?: string[]): Promise<Torrent>
    async getTorrent(hashes: string[], fields?: string[], notFields?: string[]): Promise<Torrent[]>
    async getTorrent(ids: any, fields: string[] = defaultFields, notFields: string[] = []) {
        let options: any = {};
        ids = this.convertIds(ids);
        if (ids)
            options.ids = ids;

        if (!fields) fields = defaultFields;
        if (!notFields) notFields = [];

        fields = fields.filter(item => !(~notFields.indexOf(item)));
        fields.push("id");
        fields.push("name");

        if (fields.indexOf("files") > -1) {
            // we could do a check whether fileStats doesn't exist, but the server doesn't care about multiples
            fields.push("fileStats");
        }

        if (fields.indexOf("trackers") > -1) {
            fields.push("trackerStats");
        }

        options["fields"] = fields;

        let req = new TransmissionRequest("torrent-get", options);
        let res = await this.sendRequest(req);
        let x: Torrent[] = [];

        for (var i = 0; i < res.arguments["torrents"].length; i++) {
            var element = <ITorrent>res.arguments["torrents"][i];
            let torrent = new Torrent(this, fields).deserialize(element);

            x.push(torrent);
        }

        if (x.length == 1)
            return x[0];
        else
            return x;
    }

    async removeTorrent(recent: "recently-active", deleteData?: boolean): Promise<void>;
    async removeTorrent(torrent: Torrent, deleteData?: boolean): Promise<void>;
    async removeTorrent(torrents: Torrent[], deleteData?: boolean): Promise<void>;
    async removeTorrent(id: number, deleteData?: boolean): Promise<void>;
    async removeTorrent(ids: number[], deleteData?: boolean): Promise<void>;
    async removeTorrent(hash: string, deleteData?: boolean): Promise<void>;
    async removeTorrent(hashes: string[], deleteData?: boolean): Promise<void>;
    async removeTorrent(ids: any, deleteData: boolean = false) {
        let options: any = {};
        ids = this.convertIds(ids);
        if (ids)
            options.ids = ids;
        options["delete-local-data"] = deleteData;
        let req = new TransmissionRequest("torrent-remove", options);
        let res = await this.sendRequest(req);
    }

    async addTorrent(file: string, options?: AddTorrentOptions): Promise<ITorrent>
    async addTorrent(file: Buffer, options?: AddTorrentOptions): Promise<ITorrent>
    async addTorrent(file: any, options?: AddTorrentOptions): Promise<ITorrent> {
        if (typeof file === 'string') {
            let fileObj = url.parse(file);
            if (!fileObj.protocol) {
                try {
                    fs.statSync(fileObj.href);
                    options = Object.assign({}, options, { filename: fileObj.href });
                } catch (e) {
                    // is base64 string
                    options = Object.assign({}, options, { metainfo: fileObj.href })
                }
            } else {
                options = Object.assign({}, options, { filename: fileObj.href })
            }
        } else {
            options = Object.assign({}, options, { metainfo: (<Buffer>file).toString('base64')});
        }

        let req = new TransmissionRequest("torrent-add", options);
        let res = await this.sendRequest(req);
        return <ITorrent>res.arguments;
    }

    async setTorrentLocation(recent: "recently-active", options: SetLocationOptions): Promise<void>
    async setTorrentLocation(torrent: Torrent, options: SetLocationOptions): Promise<void>
    async setTorrentLocation(torrents: Torrent[], options: SetLocationOptions): Promise<void>
    async setTorrentLocation(id: number, options: SetLocationOptions): Promise<void>
    async setTorrentLocation(ids: number[], options: SetLocationOptions): Promise<void>
    async setTorrentLocation(hash: string, options: SetLocationOptions): Promise<void>
    async setTorrentLocation(hashes: string[], options: SetLocationOptions): Promise<void>
    async setTorrentLocation(ids: any, options: SetLocationOptions) {
        ids = this.convertIds(ids);
        if (ids && !options.ids)
            options.ids = ids;
        let req = new TransmissionRequest("torrent-set-location", options);
        let res = await this.sendRequest(req);
    }

    async renameTorrentPath(hash: string, path: string, name: string): Promise<RenameTorrentResponse>
    async renameTorrentPath(torrent: Torrent, path: string, name: string): Promise<RenameTorrentResponse>
    async renameTorrentPath(id: number, path: string, name: string): Promise<RenameTorrentResponse>
    async renameTorrentPath(id: any, path: string, name: string): Promise<RenameTorrentResponse> {
        let ids = this.convertIds([id]);
        let req = new TransmissionRequest("torrent-rename-path", { ids, path, name });
        let res = await this.sendRequest(req);

        return <RenameTorrentResponse>res.arguments;
    }

    async setTorrentProperties(recent: "recently-active", options: SetTorrentOptions): Promise<void>
    async setTorrentProperties(torrent: Torrent, options: SetTorrentOptions): Promise<void>
    async setTorrentProperties(torrents: Torrent[], options: SetTorrentOptions): Promise<void>
    async setTorrentProperties(id: number, options: SetTorrentOptions): Promise<void>
    async setTorrentProperties(ids: number[], options: SetTorrentOptions): Promise<void>
    async setTorrentProperties(hash: string, options: SetTorrentOptions): Promise<void>
    async setTorrentProperties(hashes: string[], options: SetTorrentOptions): Promise<void>
    async setTorrentProperties(ids: any, options: SetTorrentOptions) {
        ids = this.convertIds(ids);
        if (ids && !options.ids)
            options.ids = ids;
        let req = new TransmissionRequest("torrent-set", options);
        let res = await this.sendRequest(req);
    }

    async getSession(): Promise<Session> {
        let req = new TransmissionRequest("session-get", {});
        let res = await this.sendRequest(req);
        return new Session(this).deserialize(<ISession>res.arguments);
    }

    async setSessionProperties(options: SessionSetOptions) {
        let req = new TransmissionRequest("session-set", options);
        await this.sendRequest(req);
    }

    async sendRequest(trequest: TransmissionRequest): Promise<TransmissionResponse> {
        this.emit("request",trequest);
        return new Promise<TransmissionResponse>((resolve, reject) => {
            let failed: boolean = false;
            let reqopts: http.RequestOptions = {};
            if (this.options.port) reqopts.port = this.options.port;
            if (this.options.path) reqopts.path = this.options.path;
            if (this.options.host) reqopts.hostname = this.options.host;
            if (this.options.protocol) reqopts.protocol = this.options.protocol;
            if (this.needsAuth) reqopts.auth = this.auth;

            reqopts.method = "POST";
            reqopts.headers = {};
            if (this.sessionID)
                reqopts.headers["x-transmission-session-id"] = this.sessionID;
            reqopts.headers["content-type"] = "application/json";

            const req = http.request(reqopts, res => {
                if (res.statusCode < 200 || res.statusCode > 299) {
                    failed = true;
                    if (res.statusCode == 409) {
                        this.sessionID = res.headers["x-transmission-session-id"];
                        resolve(this.sendRequest(trequest))
                    } else reject(new Error("Failed to load: " + res.statusCode))
                }

                let data: string = "";
                let decoder = new sd.StringDecoder("utf-8");
                res.on("data", chunk => {
                    let textChunk = decoder.write(<Buffer>chunk);
                    data += textChunk;
                });
                res.on("end", () => {
                    if (!failed) {
                        let result = <TransmissionResponse>JSON.parse(data);
                        this.emit("response", result);
                        if (result.result != "success") reject(result.result);
                        else resolve(result);
                    }
                });
            });
            req.on("error", err => reject(err));
            req.write(JSON.stringify(trequest));
            req.end();
        });
    }

}