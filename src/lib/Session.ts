import { TransmissionRequest } from "./Communication";
import { ISerializable, IMutable, Omit } from "./Interfaces";
import { Client } from "./Client";


export interface ISession {
    "alt-speed-down": number;
    "alt-speed-enabled": boolean;
    "alt-speed-time-begin": number;
    "alt-speed-time-day": number;
    "alt-speed-time-enabled": boolean;
    "alt-speed-time-end": number;
    "alt-speed-up": number;
    "blocklist-enabled": boolean;
    "blocklist-size": number;
    "blocklist-url": string;
    "cache-size-mb": number;
    "dht-enabled": boolean;
    "download-dir": string;
    "download-queue-enabled": boolean;
    "download-queue-size": number;
    encryption: string;
    "idle-seeding-limit": number;
    "idle-seeding-limit-enabled": boolean;
    "incomplete-dir": string;
    "incomplete-dir-enabled": boolean;
    "lpd-enabled": boolean;
    "peer-limit-global": number;
    "peer-limit-per-torrent": number;
    "peer-port": number;
    "peer-port-random-on-start": boolean;
    "pex-enabled": boolean;
    "port-forwarding-enabled": boolean;
    "queue-stalled-enabled": boolean;
    "queue-stalled-minutes": number;
    "rename-partial-files": boolean;
    "script-torrent-done-enabled": boolean;
    "script-torrent-done-filename": string;
    "seed-queue-enabled": boolean;
    "seed-queue-size": number;
    seedRatioLimit: number;
    seedRatioLimited: boolean;
    "speed-limit-down": number;
    "speed-limit-down-enabled": boolean;
    "speed-limit-up": number;
    "speed-limit-up-enabled": boolean;
    "start-added-torrents": boolean;
    "trash-original-torrent-files": boolean;
    "utp-enabled": boolean;
    "config-dir": string;
    "download-dir-free-space": number;
    "rpc-version": number;
    "rpc-version-minimum": number;
    units: {
        "memory-bytes": number;
        "memory-units": string[];
        "size-bytes": number;
        "size-units": string[];
        "speed-bytes": number;
        "speed-units": string[];
    };
    version: string;
}

export interface SessionSetOptions extends Partial<
                 Omit<ISession, "config-dir"
                                | "download-dir-free-space"
                                | "rpc-version"
                                | "rpc-version-minimum"
                                | "units"
                                | "version" >> {}

export interface ISessionStatsState {
    downloadedBytes: number;
    filesAdded: number;
    secondsActive: number;
    sessionCount: number;
    uploadedBytes: number;
}

export interface ISessionStats {
    activeTorrentCount: number;
    "cumulative-stats": ISessionStatsState;
    "current-stats": ISessionStatsState;
    downloadSpeed: number;
    pausedTorrentCount: number;
    torrentCount: number;
    uploadSpeed: number;
}

export class Session implements Readonly<ISession>, ISerializable<ISession, Session>, IMutable<ISession> {
    [Symbol.toStringTag] = "Session";

    private _session: ISession;
    // properties from ISession
    get "alt-speed-down"(): number              { return this._session["alt-speed-down"]; }
    get "alt-speed-enabled"(): boolean          { return this._session["alt-speed-enabled"]; }
    get "alt-speed-time-begin"(): number        { return this._session["alt-speed-time-begin"]; }
    get "alt-speed-time-day"(): number          { return this._session["alt-speed-time-day"] }
    get "alt-speed-time-enabled"(): boolean     { return this._session["alt-speed-time-enabled"] }
    get "alt-speed-time-end"(): number          { return this._session["alt-speed-time-end"] }
    get "alt-speed-up"(): number                { return this._session["alt-speed-up"] }
    get "blocklist-enabled"(): boolean          { return this._session["blocklist-enabled"] }
    get "blocklist-size"(): number              { return this._session["blocklist-size"] }
    get "blocklist-url"(): string               { return this._session["blocklist-url"] }
    get "cache-size-mb"(): number               { return this._session["cache-size-mb"] }
    get "config-dir"(): string                  { return this._session["config-dir"] }
    get "dht-enabled"(): boolean                { return this._session["dht-enabled"] }
    get "download-dir"(): string                { return this._session["download-dir"] }
    get "download-dir-free-space"(): number     { return this._session["download-dir-free-space"] }
    get "download-queue-enabled"(): boolean     { return this._session["download-queue-enabled"] }
    get "download-queue-size"(): number         { return this._session["download-queue-size"] }
    get encryption(): string                    { return this._session["encryption"] }
    get "idle-seeding-limit"(): number          { return this._session["idle-seeding-limit"] }
    get "idle-seeding-limit-enabled"(): boolean { return this._session["idle-seeding-limit-enabled"] }
    get "incomplete-dir"(): string              { return this._session["incomplete-dir"] }
    get "incomplete-dir-enabled"(): boolean     { return this._session["incomplete-dir-enabled"] }
    get "lpd-enabled"(): boolean                { return this._session["lpd-enabled"] }
    get "peer-limit-global"(): number           { return this._session["peer-limit-global"] }
    get "peer-limit-per-torrent"(): number      { return this._session["peer-limit-per-torrent"] }
    get "peer-port"(): number                   { return this._session["peer-port"] }
    get "peer-port-random-on-start"(): boolean  { return this._session["peer-port-random-on-start"] }
    get "pex-enabled"(): boolean                { return this._session["pex-enabled"] }
    get "port-forwarding-enabled"(): boolean    { return this._session["port-forwarding-enabled"] }
    get "queue-stalled-enabled"(): boolean      { return this._session["queue-stalled-enabled"] }
    get "queue-stalled-minutes"(): number       { return this._session["queue-stalled-minutes"] }
    get "rename-partial-files"(): boolean       { return this._session["rename-partial-files"] }
    get "rpc-version"(): number                 { return this._session["rpc-version"] }
    get "rpc-version-minimum"(): number         { return this._session["rpc-version-minimum"] }
    get "seed-queue-enabled"(): boolean         { return this._session["seed-queue-enabled"] }
    get "seed-queue-size"(): number             { return this._session["seed-queue-size"] }
    get seedRatioLimit(): number                { return this._session["seedRatioLimit"] }
    get seedRatioLimited(): boolean             { return this._session["seedRatioLimited"] }
    get "speed-limit-down"(): number            { return this._session["speed-limit-down"] }
    get "speed-limit-down-enabled"(): boolean   { return this._session["speed-limit-down-enabled"] }
    get "speed-limit-up"(): number              { return this._session["speed-limit-up"] }
    get "speed-limit-up-enabled"(): boolean     { return this._session["speed-limit-up-enabled"] }
    get "start-added-torrents"(): boolean       { return this._session["start-added-torrents"] }
    get "utp-enabled"(): boolean                { return this._session["utp-enabled"] }
    get version(): string                       { return this._session.version };
    get "script-torrent-done-enabled"(): boolean { return this._session["script-torrent-done-enabled"] }
    get "script-torrent-done-filename"(): string { return this._session["script-torrent-done-filename"] }
    get "trash-original-torrent-files"(): boolean { return this._session["trash-original-torrent-files"] }
    get units(): {
        readonly "memory-bytes": number;
        readonly "memory-units": string[];
        readonly "size-bytes": number;
        readonly "size-units": string[];
        readonly "speed-bytes": number;
        readonly "speed-units": string[];
    } { return this._session.units };

    constructor(private client: Client) { }

    // CamelCase accessors for the above properties
    get altSpeedDown()                  { return this._session["alt-speed-down"]; }
    get altSpeedEnabled()               { return this._session["alt-speed-enabled"]; }
    get altSpeedScheduledBegin()        { return this._session["alt-speed-time-begin"]; }
    get altSpeedScheduledOnDays()       { return this._session["alt-speed-time-day"]; }
    get altSpeedScheduledEnabled()      { return this._session["alt-speed-time-enabled"]; }
    get altSpeedScheduledEnd()          { return this._session["alt-speed-time-end"]; }
    get altSpeedUp()                    { return this._session["alt-speed-up"]; }
    get blocklistEnabled()              { return this._session["blocklist-enabled"]; }
    get blocklistSize()                 { return this._session["blocklist-size"]; }
    get blocklistURL()                  { return this._session["blocklist-url"]; }
    get cacheSize()                     { return this._session["cache-size-mb"]; }
    get configDir()                     { return this._session["config-dir"]; }
    get dhtEnabled()                    { return this._session["dht-enabled"]; }
    get downloadDir()                   { return this._session["download-dir"]; }
    get downloadDirFreeSpace()          { return this._session["download-dir-free-space"]; }
    get downloadQueueEnabled()          { return this._session["download-queue-enabled"]; }
    get downloadQueueSize()             { return this._session["download-queue-size"]; }
    get idleSeedingLimit()              { return this._session["idle-seeding-limit"]; }
    get idleSeedingLimitEnabled()       { return this._session["idle-seeding-limit-enabled"]; }
    get incompleteDir()                 { return this._session["incomplete-dir"]; }
    get incompleteDirEnabled()          { return this._session["incomplete-dir-enabled"]; }
    get lpdEnabled()                    { return this._session["lpd-enabled"]; }
    get globalPeerLimit()               { return this._session["peer-limit-global"]; }
    get torrentPeerLimit()              { return this._session["peer-limit-per-torrent"]; }
    get peerPort()                      { return this._session["peer-port"]; }
    get randomPeerPortEnabled()         { return this._session["peer-port-random-on-start"]; }
    get pexEnabled()                    { return this._session["pex-enabled"]; }
    get portForwardingEnabled()         { return this._session["port-forwarding-enabled"]; }
    get queueStalledEnabled()           { return this._session["queue-stalled-enabled"]; }
    get minutesQueueStalled()           { return this._session["queue-stalled-minutes"]; }
    get renamePartialFiles()            { return this._session["rename-partial-files"]; }
    get rpcVersion()                    { return this._session["rpc-version"]; }
    get minimumRPCVersion()             { return this._session["rpc-version-minimum"]; }
    get callScriptOnTorrentCompletion() { return this._session["script-torrent-done-enabled"]; }
    get torrentScriptFilename()         { return this._session["script-torrent-done-filename"]; }
    get seedQueueEnabled()              { return this._session["seed-queue-enabled"]; }
    get seedQueueSize()                 { return this._session["seed-queue-size"]; }
    get speedLimitDown()                { return this._session["speed-limit-down"]; }
    get speedLimitDownEnabled()         { return this._session["speed-limit-down-enabled"]; }
    get speedLimitUp()                  { return this._session["speed-limit-up"]; }
    get speedLimitUpEnabled()           { return this._session["speed-limit-up-enabled"]; }
    get startAddedTorrents()            { return this._session["start-added-torrents"]; }
    get trashTorrentFiles()             { return this._session["trash-original-torrent-files"]; }
    get utpEnabled()                    { return this._session["utp-enabled"]; }

    // mutable setters for the above properties
    async setEncryption(type: "required" | "preferred" | "tolerated") { this.setSessionProperties({ "encryption": type }); }
    async setAltSpeedDown(speed: number)                { this.setSessionProperties({ "alt-speed-down": speed }); }
    async setAltSpeedEnabled(enabled: boolean)          { this.setSessionProperties({ "alt-speed-enabled": enabled }); }
    async setAltSpeedScheduledBegin(time: number)       { this.setSessionProperties({ "alt-speed-time-begin": time }); }
    async setAltSpeedScheduledOnDays(day: number)       { this.setSessionProperties({ "alt-speed-time-day": day }); }
    async setAltSpeedScheduledEnabled(enabled: boolean) { this.setSessionProperties({ "alt-speed-time-enabled": enabled }); }
    async setAltSpeedScheduledEnd(time: number)         { this.setSessionProperties({ "alt-speed-time-end": time }); }
    async setAltSpeedUp(speed: number)                  { this.setSessionProperties({ "alt-speed-up": speed }); }
    async setBlocklistEnabled(enabled: boolean)         { this.setSessionProperties({ "blocklist-enabled": enabled }); }
    async setBlocklistURL(url: string)                  { this.setSessionProperties({ "blocklist-url": url }); }
    async setCacheSize(size: number)                    { this.setSessionProperties({ "cache-size-mb": size }); }
    async setDHTEnabled(enabled: boolean)               { this.setSessionProperties({ "dht-enabled": enabled }); }
    async setDownloadDir(dir: string)                   { this.setSessionProperties({ "download-dir": dir }); }
    async setDownloadQueueEnabled(enabled: boolean)     { this.setSessionProperties({ "download-queue-enabled": enabled }); }
    async setDownloadQueueSize(size: number)            { this.setSessionProperties({ "download-queue-size": size }); }
    async setIdleSeedingLimit(limit: number)            { this.setSessionProperties({ "idle-seeding-limit": limit }); }
    async setIdleSeedingLimitEnabled(enabled: boolean)  { this.setSessionProperties({ "idle-seeding-limit-enabled": enabled }); }
    async setIncompleteDir(dir: string)                 { this.setSessionProperties({ "incomplete-dir": dir }); }
    async setIncompleteDirEnabled(enabled: boolean)     { this.setSessionProperties({ "incomplete-dir-enabled": enabled }); }
    async setLPDEnabled(enabled: boolean)               { this.setSessionProperties({ "lpd-enabled": enabled }); }
    async setGlobalPeerLimit(limit: number)             { this.setSessionProperties({ "peer-limit-global": limit }); }
    async setTorrentPeerLimit(limit: number)            { this.setSessionProperties({ "peer-limit-per-torrent": limit }); }
    async setPeerPort(port: number)                     { this.setSessionProperties({ "peer-port": port }); }
    async setRandomPeerPortEnabled(enabled: boolean)    { this.setSessionProperties({ "peer-port-random-on-start": enabled }); }
    async setPEXEnabled(enabled: boolean)               { this.setSessionProperties({ "pex-enabled": enabled }); }
    async setPortForwardingEnabled(enabled: boolean)    { this.setSessionProperties({ "port-forwarding-enabled": enabled }); }
    async setQueueStalledEnabled(enabled: boolean)      { this.setSessionProperties({ "queue-stalled-enabled": enabled }); }
    async setQueueStalledMinutes(minutes: number)       { this.setSessionProperties({ "queue-stalled-minutes": minutes }); }
    async setRenamePartialFiles(rename: boolean)        { this.setSessionProperties({ "rename-partial-files": rename }); }
    async setCallScriptOnCompletion(call: boolean)      { this.setSessionProperties({ "script-torrent-done-enabled": call }); }
    async setScriptFilename(name: string)               { this.setSessionProperties({ "script-torrent-done-filename": name }); }
    async setSeedQueueEnabled(enabled: boolean)         { this.setSessionProperties({ "seed-queue-enabled": enabled}); }
    async setSeedQueueSize(size: number)                { this.setSessionProperties({ "seed-queue-size": size}); }
    async setSpeedLimitDown(limit: number)              { this.setSessionProperties({ "speed-limit-down": limit}); }
    async setSpeedLimitDownEnabled(enabled: boolean)    { this.setSessionProperties({ "speed-limit-down-enabled": enabled}); }
    async setSpeedLimitUp(limit: number)                { this.setSessionProperties({ "speed-limit-up": limit}); }
    async setSpeedLimitUpEnabled(enabled: boolean)      { this.setSessionProperties({ "speed-limit-up-enabled": enabled}); }
    async setStartAddedTorrents(start: boolean)         { this.setSessionProperties({ "start-added-torrents": start}); }
    async setTrashTorrentFiles(trash: boolean)          { this.setSessionProperties({ "trash-original-torrent-files": trash}); }
    async setUTPEnabled(enabled: boolean)               { this.setSessionProperties({ "utp-enabled": enabled}); }

    async setSessionProperties(options: SessionSetOptions) {
        this.client.setSessionProperties(options);
    }

    // methods
    deserialize(input: string | ISession): Session {
        if (typeof input === "string")
            input = <ISession>JSON.parse(input);

        this._session = Object.assign({}, this._session, input);

        return this;
    }

    serialize(): string {
        return JSON.stringify(this);
    }

    toJSON(): ISession {
        return this._session;
    }

    async update(): Promise<ISession> {
        throw new Error("Method not implemented.");
    }

    async getStatistics(): Promise<ISessionStats> {
        let req = new TransmissionRequest("session-stats", {});
        let res = await this.client.sendRequest(req);

        var element = <ISessionStats>res.arguments;
        return element;
    }

    async close() {
        let req = new TransmissionRequest("session-close", {});
        await this.client.sendRequest(req);
    }

    async isPortOpen(): Promise<boolean> {
        let req = new TransmissionRequest("port-test", {});
        let res = await this.client.sendRequest(req);

        return res.arguments["port-is-open"];
    }

    async updateBlocklist(): Promise<number> {
        let req = new TransmissionRequest("blocklist-update", {});
        let res = await this.client.sendRequest(req);

        return res.arguments["blocklist-size"];
    }
}
