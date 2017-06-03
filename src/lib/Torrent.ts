import { ISerializable, IMutable } from "./Interfaces";
import { IFile, IFileStat, File } from "./File";
import { IPeer, IPeersFrom } from "./Peer";
import { ITracker, ITrackerStat, Tracker } from "./Tracker"
import { Client } from "./Client";
import { TransmissionRequest } from "./Communication";

export type IdList = number|number[]|string|string[]|null;

export interface RenameTorrentResponse {
    path: string;
    name: string;
    id: number
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
    move?: boolean
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

// TODO: once we have type subtraction, I should be able to 
// unpartial a type, removing the need for this
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

export interface ITorrent extends Partial<IFilledTorrent> {}

export class Torrent implements Readonly<IFilledTorrent>, ISerializable<ITorrent, Torrent>, IMutable<ITorrent> {
    // get [Symbol.toStringTag]() { return "Torrent" };
    [Symbol.toStringTag] = "Torrent";

    private _torrent: ITorrent = {};

    // mutable properties
    get bandwidthPriority(): number { return this._torrent["bandwidthPriority"]; }
    get downloadLimit(): number { return this._torrent["downloadLimit"]; }
    get downloadLimited(): boolean { return this._torrent["downloadLimited"]; }
    get honorsSessionLimits(): boolean { return this._torrent["honorsSessionLimits"]; }
    get queuePosition(): number { return this._torrent["queuePosition"]; }
    get seedIdleLimit(): number { return this._torrent["seedIdleLimit"]; }
    get seedIdleMode(): number { return this._torrent["seedIdleMode"]; }
    get seedRatioLimit(): number { return this._torrent["seedRatioLimit"]; }
    get seedRatioMode(): number { return this._torrent["seedRatioMode"]; }
    get uploadLimit(): number { return this._torrent["uploadLimit"]; }
    get uploadLimited(): boolean { return this._torrent["uploadLimited"]; }
    get "peer-limit"(): number { return this._torrent["peer-limit"]; }

    // properties from ITorrent
    get activityDate(): number { return this._torrent["activityDate"]; }
    get addedDate(): number { return this._torrent["addedDate"]; }
    get comment(): string { return this._torrent["comment"]; }
    get corruptEver(): number { return this._torrent["corruptEver"]; }
    get creator(): string { return this._torrent["creator"]; }
    get dateCreated(): number { return this._torrent["dateCreated"]; }
    get desiredAvailable(): number { return this._torrent["desiredAvailable"]; }
    get doneDate(): number { return this._torrent["doneDate"]; }
    get downloadDir(): string { return this._torrent["downloadDir"]; }
    get downloadedEver(): number { return this._torrent["downloadedEver"]; }
    get error(): number { return this._torrent["error"]; }
    get errorString(): string { return this._torrent["errorString"]; }
    get eta(): number { return this._torrent["eta"]; }
    get etaIdle(): number { return this._torrent["etaIdle"]; }
    get files(): File[] { return <File[]>this._torrent["files"]; }
    get fileStats(): IFileStat[] { return this._torrent["fileStats"]; }
    get hashString(): string { return this._torrent["hashString"]; }
    get haveUnchecked(): number { return this._torrent["haveUnchecked"]; }
    get haveValid(): number { return this._torrent["haveValid"]; }
    get id(): number { return this._torrent["id"]; }
    get isFinished(): boolean { return this._torrent["isFinished"]; }
    get isPrivate(): boolean { return this._torrent["isPrivate"]; }
    get isStalled(): boolean { return this._torrent["isStalled"]; }
    get leftUntilDone(): number { return this._torrent["leftUntilDone"]; }
    get magnetLink(): string { return this._torrent["magnetLink"]; }
    get manualAnnounceTime(): number { return this._torrent["manualAnnounceTime"]; }
    get maxConnectedPeers(): number { return this._torrent["maxConnectedPeers"]; }
    get metadataPercentComplete(): number { return this._torrent["metadataPercentComplete"]; }
    get name(): string { return this._torrent["name"]; }
    get peers(): IPeer[] { return this._torrent["peers"]; }
    get peersConnected(): number { return this._torrent["peersConnected"]; }
    get peersFrom(): IPeersFrom { return this._torrent["peersFrom"]; }
    get peersGettingFromUs(): number { return this._torrent["peersGettingFromUs"]; }
    get peersSendingToUs(): number { return this._torrent["peersSendingToUs"]; }
    get percentDone(): number { return this._torrent["percentDone"]; }
    get pieces(): string { return this._torrent["pieces"]; }
    get pieceCount(): number { return this._torrent["pieceCount"]; }
    get pieceSize(): number { return this._torrent["pieceSize"]; }
    get priorities(): number[] { return this._torrent["priorities"]; }
    get rateDownload(): number { return this._torrent["rateDownload"]; }
    get rateUpload(): number { return this._torrent["rateUpload"]; }
    get recheckProgress(): number { return this._torrent["recheckProgress"]; }
    get secondsDownloading(): number { return this._torrent["secondsDownloading"]; }
    get secondsSeeding(): number { return this._torrent["secondsSeeding"]; }
    get sizeWhenDone(): number { return this._torrent["sizeWhenDone"]; }
    get startDate(): number { return this._torrent["startDate"]; }
    get status(): number { return this._torrent["status"]; }
    get trackers(): Tracker[] { return <Tracker[]>this._torrent["trackers"]; }
    get trackerStats(): ITrackerStat[] { return this._torrent["trackerStats"]; }
    get totalSize(): number { return this._torrent["totalSize"]; }
    get torrentFile(): string { return this._torrent["torrentFile"]; }
    get uploadedEver(): number { return this._torrent["uploadedEver"]; }
    get uploadRatio(): number { return this._torrent["uploadRatio"]; }
    get wanted(): number[] { return this._torrent["wanted"]; }
    get webseeds(): string[] { return this._torrent["webseeds"]; }
    get webseedsSendingToUs(): number { return this._torrent["webseedsSendingToUs"]; }

    constructor(private client: Client, private fields: string[]) { }

    serialize(): string {
        return JSON.stringify(this);
    }

    toJSON(): ITorrent {
        return this._torrent;
    }

    deserialize(input: string | ITorrent): Torrent {
        if (typeof input === "string")
            input = <ITorrent>JSON.parse(input);

        let files:IFile[];
        if (input.files) {
            // if we have any previous files, we've called the deserialize method before
            // so files must be File type, not IFile
            if (this._torrent.files && this.files.length > 0) {
                // we assume the file list length isn't changed, since you can't 
                // add or remove a file from a torrent just change whether it's wanted or not
                for (let i = 0; i < input.files.length; i++) {
                    let file = <File>this._torrent.files[i];
                    file.deserialize(input.files[i]);

                    if (input.fileStats) {
                        file.stats = input.fileStats[i];
                    }
                }
            } else {
                this._torrent.files = [];
                for (let i = 0; i < input.files.length; i++) {
                    let newFile = new File(this, i).deserialize(input.files[i]);

                    // there should always be an input.fileStats if there's a file,
                    // but it doesn't hurt to check
                    if (input.fileStats) {
                        newFile.stats = input.fileStats[i];
                    }

                    this._torrent.files.push(newFile);
                }
            }
        }

        if (input.trackers) {
            this._torrent.trackers = [];
            for (let i = 0; i < input.trackers.length; i++) {
                let newTracker = new Tracker().deserialize(input.trackers[i]);

                if (input.trackerStats) {
                    newTracker.stats = input.trackerStats[i];
                }

                this._torrent.trackers.push(newTracker);
            }
        }

        this._torrent = Object.assign({}, this._torrent, input);

        return this;
    }

    async update(fields: string[] = []): Promise<ITorrent> {
        fields = fields.length ? fields : this.fields;
        let req = new TransmissionRequest("torrent-get", { ids: [this.id], fields: fields });
        let res = await this.client.sendRequest(req);

        var element = <ITorrent>res.arguments["torrents"][0];
        this.deserialize(element);

        return element;
    }

    get peerLimit() {
        return this["peer-limit"];
    }

    async setUploadLimited(limited: boolean) {
        await this.setTorrentProperties({ uploadLimited: limited })
        this._torrent.uploadLimited = limited;
    }
    async setUploadLimit(limit: number) {
        await this.setTorrentProperties({ uploadLimit: limit });
        this._torrent.uploadLimit = limit;
    }
    async setSeedRatioMode(mode: number) {
        await this.setTorrentProperties({ seedRatioMode: mode });
        this._torrent.seedRatioMode = mode;
    }
    async setSeedRatioLimit(limit: number) {
        await this.setTorrentProperties({ seedRatioLimit: limit });
        this._torrent.seedRatioLimit = limit;
    }
    async setSeedIdleMode(mode: number) {
        await this.setTorrentProperties({ seedIdleMode: mode });
        this._torrent.seedIdleMode = mode;
    }
    async setSeedIdleLimit(limit: number) {
        await this.setTorrentProperties({ seedIdleLimit: limit });
        this._torrent.seedIdleLimit = limit;
    }
    async setQueuePosition(pos: number) {
        await this.setTorrentProperties({ queuePosition: pos });
        this._torrent.queuePosition = pos;
    }
    async setPeerLimit(limit: number) {
        await this.setTorrentProperties({ "peer-limit": limit });
        this._torrent["peer-limit"] = limit;
    }
    async setLocation(location: string, move: boolean = false) {
        await this.client.setTorrentLocation(this.id, { location, move });
    }
    async setHonorsSessionLimits(honored: boolean) {
        await this.setTorrentProperties({ honorsSessionLimits: honored });
        this._torrent.honorsSessionLimits = honored;
    }
    async setDownloadLimited(isLimited: boolean) {
        await this.setTorrentProperties({ downloadLimited: isLimited });
        this._torrent.downloadLimited = isLimited;
    }
    async setDownloadLimit(limit: number) {
        await this.setTorrentProperties({ downloadLimit: limit });
        this._torrent.downloadLimit = limit;
    }
    async setBandwidthPriority(priority: number) {
        await this.setTorrentProperties({ bandwidthPriority: priority });
        this._torrent.bandwidthPriority = priority;
    }
    async setName(name: string) {
        let res = await this.client.renameTorrentPath(this.id, this.name, name);
        this._torrent.name = res.name;
    }

    async setFilePriority(file: File, priority: "low"|"normal"|"high"): Promise<void>
    async setFilePriority(files: File[], priority: "low"|"normal"|"high"): Promise<void>
    async setFilePriority(idx: number, priority: "low"|"normal"|"high"): Promise<void>
    async setFilePriority(indexes: number[], priority: "low"|"normal"|"high"): Promise<void>
    async setFilePriority(obj: any, priority: "low"|"normal"|"high"): Promise<void> {
        let idx: number[];
        if (Array.isArray(obj) && obj.length && typeof obj[0] === "object")
            idx = (<File[]>obj).map(f => f.id);
        else if (Array.isArray(obj))
            idx = obj;
        else if (typeof obj === "object")
            idx = [(<File>obj).id];
        else
            idx = [obj];

        if (idx.some(id => id > this.files.length || id < 0))
            throw new RangeError(`File ${idx} doesn't exist in Torrent`);

        if (priority !== "low" && priority !== "normal" && priority !== "high")
            priority = "normal";

        let options:SetTorrentOptions = {};
        if (priority === "low")
            options["priority-low"] = idx;
        else if (priority === "normal")
            options["priority-normal"] = idx;
        else
            options["priority-high"] = idx;

        return await this.setTorrentProperties(options);
    }

    async setFileWanted(file: File, wanted?: boolean): Promise<void>
    async setFileWanted(files: File[], wanted?: boolean): Promise<void>
    async setFileWanted(idx: number, wanted?: boolean): Promise<void>
    async setFileWanted(indexes: number[], wanted?: boolean): Promise<void>
    async setFileWanted(obj: any, wanted: boolean = true): Promise<void> {
        let idx: number[];
        if (Array.isArray(obj) && obj.length && typeof obj[0] === "object")
            idx = (<File[]>obj).map(f => f.id);
        else if (Array.isArray(obj))
            idx = obj;
        else if (typeof obj === "object")
            idx = [(<File>obj).id];
        else
            idx = [obj];

        if (idx.some(id => id > this.files.length || id < 0))
            throw new RangeError(`File ${idx} doesn't exist in Torrent`);

        let options: SetTorrentOptions = {};
        if (wanted)
            return await this.setTorrentProperties({"files-wanted": idx})
        else
            return await this.setTorrentProperties({"files-unwanted": idx})
    }

    async setTorrentProperties(options: SetTorrentOptions) {
        return await this.client.setTorrentProperties(this.id, options);
    }
}
