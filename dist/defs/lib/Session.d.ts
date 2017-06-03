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
export interface SessionSetOptions extends Partial<Omit<ISession, "config-dir" | "download-dir-free-space" | "rpc-version" | "rpc-version-minimum" | "units" | "version">> {
}
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
export declare class Session implements Readonly<ISession>, ISerializable<ISession, Session>, IMutable<ISession> {
    private client;
    [Symbol.toStringTag]: string;
    private _session;
    readonly "alt-speed-down": number;
    readonly "alt-speed-enabled": boolean;
    readonly "alt-speed-time-begin": number;
    readonly "alt-speed-time-day": number;
    readonly "alt-speed-time-enabled": boolean;
    readonly "alt-speed-time-end": number;
    readonly "alt-speed-up": number;
    readonly "blocklist-enabled": boolean;
    readonly "blocklist-size": number;
    readonly "blocklist-url": string;
    readonly "cache-size-mb": number;
    readonly "config-dir": string;
    readonly "dht-enabled": boolean;
    readonly "download-dir": string;
    readonly "download-dir-free-space": number;
    readonly "download-queue-enabled": boolean;
    readonly "download-queue-size": number;
    readonly encryption: string;
    readonly "idle-seeding-limit": number;
    readonly "idle-seeding-limit-enabled": boolean;
    readonly "incomplete-dir": string;
    readonly "incomplete-dir-enabled": boolean;
    readonly "lpd-enabled": boolean;
    readonly "peer-limit-global": number;
    readonly "peer-limit-per-torrent": number;
    readonly "peer-port": number;
    readonly "peer-port-random-on-start": boolean;
    readonly "pex-enabled": boolean;
    readonly "port-forwarding-enabled": boolean;
    readonly "queue-stalled-enabled": boolean;
    readonly "queue-stalled-minutes": number;
    readonly "rename-partial-files": boolean;
    readonly "rpc-version": number;
    readonly "rpc-version-minimum": number;
    readonly "seed-queue-enabled": boolean;
    readonly "seed-queue-size": number;
    readonly seedRatioLimit: number;
    readonly seedRatioLimited: boolean;
    readonly "speed-limit-down": number;
    readonly "speed-limit-down-enabled": boolean;
    readonly "speed-limit-up": number;
    readonly "speed-limit-up-enabled": boolean;
    readonly "start-added-torrents": boolean;
    readonly "utp-enabled": boolean;
    readonly version: string;
    readonly "script-torrent-done-enabled": boolean;
    readonly "script-torrent-done-filename": string;
    readonly "trash-original-torrent-files": boolean;
    readonly units: {
        readonly "memory-bytes": number;
        readonly "memory-units": string[];
        readonly "size-bytes": number;
        readonly "size-units": string[];
        readonly "speed-bytes": number;
        readonly "speed-units": string[];
    };
    constructor(client: Client);
    readonly altSpeedDown: number;
    readonly altSpeedEnabled: boolean;
    readonly altSpeedScheduledBegin: number;
    readonly altSpeedScheduledOnDays: number;
    readonly altSpeedScheduledEnabled: boolean;
    readonly altSpeedScheduledEnd: number;
    readonly altSpeedUp: number;
    readonly blocklistEnabled: boolean;
    readonly blocklistSize: number;
    readonly blocklistURL: string;
    readonly cacheSize: number;
    readonly configDir: string;
    readonly dhtEnabled: boolean;
    readonly downloadDir: string;
    readonly downloadDirFreeSpace: number;
    readonly downloadQueueEnabled: boolean;
    readonly downloadQueueSize: number;
    readonly idleSeedingLimit: number;
    readonly idleSeedingLimitEnabled: boolean;
    readonly incompleteDir: string;
    readonly incompleteDirEnabled: boolean;
    readonly lpdEnabled: boolean;
    readonly globalPeerLimit: number;
    readonly torrentPeerLimit: number;
    readonly peerPort: number;
    readonly randomPeerPortEnabled: boolean;
    readonly pexEnabled: boolean;
    readonly portForwardingEnabled: boolean;
    readonly queueStalledEnabled: boolean;
    readonly minutesQueueStalled: number;
    readonly renamePartialFiles: boolean;
    readonly rpcVersion: number;
    readonly minimumRPCVersion: number;
    readonly callScriptOnTorrentCompletion: boolean;
    readonly torrentScriptFilename: string;
    readonly seedQueueEnabled: boolean;
    readonly seedQueueSize: number;
    readonly speedLimitDown: number;
    readonly speedLimitDownEnabled: boolean;
    readonly speedLimitUp: number;
    readonly speedLimitUpEnabled: boolean;
    readonly startAddedTorrents: boolean;
    readonly trashTorrentFiles: boolean;
    readonly utpEnabled: boolean;
    setEncryption(type: "required" | "preferred" | "tolerated"): Promise<void>;
    setAltSpeedDown(speed: number): Promise<void>;
    setAltSpeedEnabled(enabled: boolean): Promise<void>;
    setAltSpeedScheduledBegin(time: number): Promise<void>;
    setAltSpeedScheduledOnDays(day: number): Promise<void>;
    setAltSpeedScheduledEnabled(enabled: boolean): Promise<void>;
    setAltSpeedScheduledEnd(time: number): Promise<void>;
    setAltSpeedUp(speed: number): Promise<void>;
    setBlocklistEnabled(enabled: boolean): Promise<void>;
    setBlocklistURL(url: string): Promise<void>;
    setCacheSize(size: number): Promise<void>;
    setDHTEnabled(enabled: boolean): Promise<void>;
    setDownloadDir(dir: string): Promise<void>;
    setDownloadQueueEnabled(enabled: boolean): Promise<void>;
    setDownloadQueueSize(size: number): Promise<void>;
    setIdleSeedingLimit(limit: number): Promise<void>;
    setIdleSeedingLimitEnabled(enabled: boolean): Promise<void>;
    setIncompleteDir(dir: string): Promise<void>;
    setIncompleteDirEnabled(enabled: boolean): Promise<void>;
    setLPDEnabled(enabled: boolean): Promise<void>;
    setGlobalPeerLimit(limit: number): Promise<void>;
    setTorrentPeerLimit(limit: number): Promise<void>;
    setPeerPort(port: number): Promise<void>;
    setRandomPeerPortEnabled(enabled: boolean): Promise<void>;
    setPEXEnabled(enabled: boolean): Promise<void>;
    setPortForwardingEnabled(enabled: boolean): Promise<void>;
    setQueueStalledEnabled(enabled: boolean): Promise<void>;
    setQueueStalledMinutes(minutes: number): Promise<void>;
    setRenamePartialFiles(rename: boolean): Promise<void>;
    setCallScriptOnCompletion(call: boolean): Promise<void>;
    setScriptFilename(name: string): Promise<void>;
    setSeedQueueEnabled(enabled: boolean): Promise<void>;
    setSeedQueueSize(size: number): Promise<void>;
    setSpeedLimitDown(limit: number): Promise<void>;
    setSpeedLimitDownEnabled(enabled: boolean): Promise<void>;
    setSpeedLimitUp(limit: number): Promise<void>;
    setSpeedLimitUpEnabled(enabled: boolean): Promise<void>;
    setStartAddedTorrents(start: boolean): Promise<void>;
    setTrashTorrentFiles(trash: boolean): Promise<void>;
    setUTPEnabled(enabled: boolean): Promise<void>;
    setSessionProperties(options: SessionSetOptions): Promise<void>;
    deserialize(input: string | ISession): Session;
    serialize(): string;
    toJSON(): ISession;
    update(): Promise<ISession>;
    getStatistics(): Promise<ISessionStats>;
    close(): Promise<void>;
    isPortOpen(): Promise<boolean>;
    updateBlocklist(): Promise<number>;
}
