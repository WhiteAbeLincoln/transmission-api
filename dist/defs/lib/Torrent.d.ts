import { ISerializable, IMutable } from "./Interfaces";
import { IFile, IFileStat, File } from "./File";
import { IPeer, IPeersFrom } from "./Peer";
import { ITracker, ITrackerStat, Tracker } from "./Tracker";
import { Client } from "./Client";
export declare type IdList = number | number[] | string | string[] | null;
export interface RenameTorrentResponse {
    path: string;
    name: string;
    id: number;
}
export interface AddTorrentOptions {
    cookies?: string;
    "download-dir"?: string;
    filename?: string;
    metainfo?: string;
    paused?: boolean;
    "peer-limit"?: number;
    bandwidthPriority?: number;
    "files-wanted"?: number[];
    "files-unwanted"?: number[];
    "priority-high": number[];
    "priority-low": number[];
    "priority-normal": number[];
}
export interface SetLocationOptions {
    ids?: IdList;
    location?: string;
    move?: boolean;
}
export interface SetTorrentOptions {
    bandwidthPriority?: number;
    downloadLimit?: number;
    downloadLimited?: boolean;
    "files-wanted"?: number[];
    "files-unwanted"?: number[];
    honorsSessionLimits?: boolean;
    ids?: IdList;
    location?: string;
    "peer-limit"?: number;
    "priority-high"?: number[];
    "priority-low"?: number[];
    "priority-normal"?: number[];
    queuePosition?: number;
    seedIdleLimit?: number;
    seedIdleMode?: number;
    seedRatioLimit?: number;
    seedRatioMode?: number;
    trackerAdd?: string[];
    trackerRemove?: number[];
    trackerReplace?: [[number, string]];
    uploadLimit?: number;
    uploadLimited?: boolean;
}
export interface IFilledTorrent {
    activityDate: number;
    addedDate: number;
    bandwidthPriority: number;
    comment: string;
    corruptEver: number;
    creator: string;
    dateCreated: number;
    desiredAvailable: number;
    doneDate: number;
    downloadDir: string;
    downloadedEver: number;
    downloadLimit: number;
    downloadLimited: boolean;
    error: number;
    errorString: string;
    eta: number;
    etaIdle: number;
    files: IFile[];
    fileStats: IFileStat[];
    hashString: string;
    haveUnchecked: number;
    haveValid: number;
    honorsSessionLimits: boolean;
    id: number;
    isFinished: boolean;
    isPrivate: boolean;
    isStalled: boolean;
    leftUntilDone: number;
    magnetLink: string;
    manualAnnounceTime: number;
    maxConnectedPeers: number;
    metadataPercentComplete: number;
    name: string;
    "peer-limit": number;
    peers: IPeer[];
    peersConnected: number;
    peersFrom: IPeersFrom;
    peersGettingFromUs: number;
    peersSendingToUs: number;
    percentDone: number;
    pieces: string;
    pieceCount: number;
    pieceSize: number;
    priorities: number[];
    queuePosition: number;
    rateDownload: number;
    rateUpload: number;
    recheckProgress: number;
    secondsDownloading: number;
    secondsSeeding: number;
    seedIdleLimit: number;
    seedIdleMode: number;
    seedRatioLimit: number;
    seedRatioMode: number;
    sizeWhenDone: number;
    startDate: number;
    status: number;
    trackers: ITracker[];
    trackerStats: ITrackerStat[];
    totalSize: number;
    torrentFile: string;
    uploadedEver: number;
    uploadLimit: number;
    uploadLimited: boolean;
    uploadRatio: number;
    wanted: number[];
    webseeds: string[];
    webseedsSendingToUs: number;
}
export interface ITorrent extends Partial<IFilledTorrent> {
}
export declare class Torrent implements Readonly<IFilledTorrent>, ISerializable<ITorrent, Torrent>, IMutable<ITorrent> {
    private client;
    private fields;
    [Symbol.toStringTag]: string;
    private _torrent;
    readonly bandwidthPriority: number;
    readonly downloadLimit: number;
    readonly downloadLimited: boolean;
    readonly honorsSessionLimits: boolean;
    readonly queuePosition: number;
    readonly seedIdleLimit: number;
    readonly seedIdleMode: number;
    readonly seedRatioLimit: number;
    readonly seedRatioMode: number;
    readonly uploadLimit: number;
    readonly uploadLimited: boolean;
    readonly "peer-limit": number;
    readonly activityDate: number;
    readonly addedDate: number;
    readonly comment: string;
    readonly corruptEver: number;
    readonly creator: string;
    readonly dateCreated: number;
    readonly desiredAvailable: number;
    readonly doneDate: number;
    readonly downloadDir: string;
    readonly downloadedEver: number;
    readonly error: number;
    readonly errorString: string;
    readonly eta: number;
    readonly etaIdle: number;
    readonly files: File[];
    readonly fileStats: IFileStat[];
    readonly hashString: string;
    readonly haveUnchecked: number;
    readonly haveValid: number;
    readonly id: number;
    readonly isFinished: boolean;
    readonly isPrivate: boolean;
    readonly isStalled: boolean;
    readonly leftUntilDone: number;
    readonly magnetLink: string;
    readonly manualAnnounceTime: number;
    readonly maxConnectedPeers: number;
    readonly metadataPercentComplete: number;
    readonly name: string;
    readonly peers: IPeer[];
    readonly peersConnected: number;
    readonly peersFrom: IPeersFrom;
    readonly peersGettingFromUs: number;
    readonly peersSendingToUs: number;
    readonly percentDone: number;
    readonly pieces: string;
    readonly pieceCount: number;
    readonly pieceSize: number;
    readonly priorities: number[];
    readonly rateDownload: number;
    readonly rateUpload: number;
    readonly recheckProgress: number;
    readonly secondsDownloading: number;
    readonly secondsSeeding: number;
    readonly sizeWhenDone: number;
    readonly startDate: number;
    readonly status: number;
    readonly trackers: Tracker[];
    readonly trackerStats: ITrackerStat[];
    readonly totalSize: number;
    readonly torrentFile: string;
    readonly uploadedEver: number;
    readonly uploadRatio: number;
    readonly wanted: number[];
    readonly webseeds: string[];
    readonly webseedsSendingToUs: number;
    constructor(client: Client, fields: string[]);
    serialize(): string;
    toJSON(): ITorrent;
    deserialize(input: string | ITorrent): Torrent;
    update(fields?: string[]): Promise<ITorrent>;
    readonly peerLimit: number;
    setUploadLimited(limited: boolean): Promise<void>;
    setUploadLimit(limit: number): Promise<void>;
    setSeedRatioMode(mode: number): Promise<void>;
    setSeedRatioLimit(limit: number): Promise<void>;
    setSeedIdleMode(mode: number): Promise<void>;
    setSeedIdleLimit(limit: number): Promise<void>;
    setQueuePosition(pos: number): Promise<void>;
    setPeerLimit(limit: number): Promise<void>;
    setLocation(location: string, move?: boolean): Promise<void>;
    setHonorsSessionLimits(honored: boolean): Promise<void>;
    setDownloadLimited(isLimited: boolean): Promise<void>;
    setDownloadLimit(limit: number): Promise<void>;
    setBandwidthPriority(priority: number): Promise<void>;
    setName(name: string): Promise<void>;
    setFilePriority(file: File, priority: "low" | "normal" | "high"): Promise<void>;
    setFilePriority(files: File[], priority: "low" | "normal" | "high"): Promise<void>;
    setFilePriority(idx: number, priority: "low" | "normal" | "high"): Promise<void>;
    setFilePriority(indexes: number[], priority: "low" | "normal" | "high"): Promise<void>;
    setFileWanted(file: File, wanted?: boolean): Promise<void>;
    setFileWanted(files: File[], wanted?: boolean): Promise<void>;
    setFileWanted(idx: number, wanted?: boolean): Promise<void>;
    setFileWanted(indexes: number[], wanted?: boolean): Promise<void>;
    setTorrentProperties(options: SetTorrentOptions): Promise<void>;
}