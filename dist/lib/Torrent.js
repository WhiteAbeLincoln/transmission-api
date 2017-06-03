"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = require("./File");
const Tracker_1 = require("./Tracker");
const Communication_1 = require("./Communication");
class Torrent {
    constructor(client, fields) {
        this.client = client;
        this.fields = fields;
        this[Symbol.toStringTag] = "Torrent";
        this._torrent = {};
    }
    get bandwidthPriority() { return this._torrent["bandwidthPriority"]; }
    get downloadLimit() { return this._torrent["downloadLimit"]; }
    get downloadLimited() { return this._torrent["downloadLimited"]; }
    get honorsSessionLimits() { return this._torrent["honorsSessionLimits"]; }
    get queuePosition() { return this._torrent["queuePosition"]; }
    get seedIdleLimit() { return this._torrent["seedIdleLimit"]; }
    get seedIdleMode() { return this._torrent["seedIdleMode"]; }
    get seedRatioLimit() { return this._torrent["seedRatioLimit"]; }
    get seedRatioMode() { return this._torrent["seedRatioMode"]; }
    get uploadLimit() { return this._torrent["uploadLimit"]; }
    get uploadLimited() { return this._torrent["uploadLimited"]; }
    get "peer-limit"() { return this._torrent["peer-limit"]; }
    get activityDate() { return this._torrent["activityDate"]; }
    get addedDate() { return this._torrent["addedDate"]; }
    get comment() { return this._torrent["comment"]; }
    get corruptEver() { return this._torrent["corruptEver"]; }
    get creator() { return this._torrent["creator"]; }
    get dateCreated() { return this._torrent["dateCreated"]; }
    get desiredAvailable() { return this._torrent["desiredAvailable"]; }
    get doneDate() { return this._torrent["doneDate"]; }
    get downloadDir() { return this._torrent["downloadDir"]; }
    get downloadedEver() { return this._torrent["downloadedEver"]; }
    get error() { return this._torrent["error"]; }
    get errorString() { return this._torrent["errorString"]; }
    get eta() { return this._torrent["eta"]; }
    get etaIdle() { return this._torrent["etaIdle"]; }
    get files() { return this._torrent["files"]; }
    get fileStats() { return this._torrent["fileStats"]; }
    get hashString() { return this._torrent["hashString"]; }
    get haveUnchecked() { return this._torrent["haveUnchecked"]; }
    get haveValid() { return this._torrent["haveValid"]; }
    get id() { return this._torrent["id"]; }
    get isFinished() { return this._torrent["isFinished"]; }
    get isPrivate() { return this._torrent["isPrivate"]; }
    get isStalled() { return this._torrent["isStalled"]; }
    get leftUntilDone() { return this._torrent["leftUntilDone"]; }
    get magnetLink() { return this._torrent["magnetLink"]; }
    get manualAnnounceTime() { return this._torrent["manualAnnounceTime"]; }
    get maxConnectedPeers() { return this._torrent["maxConnectedPeers"]; }
    get metadataPercentComplete() { return this._torrent["metadataPercentComplete"]; }
    get name() { return this._torrent["name"]; }
    get peers() { return this._torrent["peers"]; }
    get peersConnected() { return this._torrent["peersConnected"]; }
    get peersFrom() { return this._torrent["peersFrom"]; }
    get peersGettingFromUs() { return this._torrent["peersGettingFromUs"]; }
    get peersSendingToUs() { return this._torrent["peersSendingToUs"]; }
    get percentDone() { return this._torrent["percentDone"]; }
    get pieces() { return this._torrent["pieces"]; }
    get pieceCount() { return this._torrent["pieceCount"]; }
    get pieceSize() { return this._torrent["pieceSize"]; }
    get priorities() { return this._torrent["priorities"]; }
    get rateDownload() { return this._torrent["rateDownload"]; }
    get rateUpload() { return this._torrent["rateUpload"]; }
    get recheckProgress() { return this._torrent["recheckProgress"]; }
    get secondsDownloading() { return this._torrent["secondsDownloading"]; }
    get secondsSeeding() { return this._torrent["secondsSeeding"]; }
    get sizeWhenDone() { return this._torrent["sizeWhenDone"]; }
    get startDate() { return this._torrent["startDate"]; }
    get status() { return this._torrent["status"]; }
    get trackers() { return this._torrent["trackers"]; }
    get trackerStats() { return this._torrent["trackerStats"]; }
    get totalSize() { return this._torrent["totalSize"]; }
    get torrentFile() { return this._torrent["torrentFile"]; }
    get uploadedEver() { return this._torrent["uploadedEver"]; }
    get uploadRatio() { return this._torrent["uploadRatio"]; }
    get wanted() { return this._torrent["wanted"]; }
    get webseeds() { return this._torrent["webseeds"]; }
    get webseedsSendingToUs() { return this._torrent["webseedsSendingToUs"]; }
    serialize() {
        return JSON.stringify(this);
    }
    toJSON() {
        return this._torrent;
    }
    deserialize(input) {
        if (typeof input === "string")
            input = JSON.parse(input);
        let files;
        if (input.files) {
            if (this._torrent.files && this.files.length > 0) {
                for (let i = 0; i < input.files.length; i++) {
                    let file = this._torrent.files[i];
                    file.deserialize(input.files[i]);
                    if (input.fileStats) {
                        file.stats = input.fileStats[i];
                    }
                }
            }
            else {
                this._torrent.files = [];
                for (let i = 0; i < input.files.length; i++) {
                    let newFile = new File_1.File(this, i).deserialize(input.files[i]);
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
                let newTracker = new Tracker_1.Tracker().deserialize(input.trackers[i]);
                if (input.trackerStats) {
                    newTracker.stats = input.trackerStats[i];
                }
                this._torrent.trackers.push(newTracker);
            }
        }
        this._torrent = Object.assign({}, this._torrent, input);
        return this;
    }
    update(fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            fields = fields.length ? fields : this.fields;
            let req = new Communication_1.TransmissionRequest("torrent-get", { ids: [this.id], fields: fields });
            let res = yield this.client.sendRequest(req);
            var element = res.arguments["torrents"][0];
            this.deserialize(element);
            return element;
        });
    }
    get peerLimit() {
        return this["peer-limit"];
    }
    setUploadLimited(limited) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ uploadLimited: limited });
            this._torrent.uploadLimited = limited;
        });
    }
    setUploadLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ uploadLimit: limit });
            this._torrent.uploadLimit = limit;
        });
    }
    setSeedRatioMode(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ seedRatioMode: mode });
            this._torrent.seedRatioMode = mode;
        });
    }
    setSeedRatioLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ seedRatioLimit: limit });
            this._torrent.seedRatioLimit = limit;
        });
    }
    setSeedIdleMode(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ seedIdleMode: mode });
            this._torrent.seedIdleMode = mode;
        });
    }
    setSeedIdleLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ seedIdleLimit: limit });
            this._torrent.seedIdleLimit = limit;
        });
    }
    setQueuePosition(pos) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ queuePosition: pos });
            this._torrent.queuePosition = pos;
        });
    }
    setPeerLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ "peer-limit": limit });
            this._torrent["peer-limit"] = limit;
        });
    }
    setLocation(location, move = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.setTorrentLocation(this.id, { location, move });
        });
    }
    setHonorsSessionLimits(honored) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ honorsSessionLimits: honored });
            this._torrent.honorsSessionLimits = honored;
        });
    }
    setDownloadLimited(isLimited) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ downloadLimited: isLimited });
            this._torrent.downloadLimited = isLimited;
        });
    }
    setDownloadLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ downloadLimit: limit });
            this._torrent.downloadLimit = limit;
        });
    }
    setBandwidthPriority(priority) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTorrentProperties({ bandwidthPriority: priority });
            this._torrent.bandwidthPriority = priority;
        });
    }
    setName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.client.renameTorrentPath(this.id, this.name, name);
            this._torrent.name = res.name;
        });
    }
    setFilePriority(obj, priority) {
        return __awaiter(this, void 0, void 0, function* () {
            let idx;
            if (Array.isArray(obj) && obj.length && typeof obj[0] === "object")
                idx = obj.map(f => f.id);
            else if (Array.isArray(obj))
                idx = obj;
            else if (typeof obj === "object")
                idx = [obj.id];
            else
                idx = [obj];
            if (idx.some(id => id > this.files.length || id < 0))
                throw new RangeError(`File ${idx} doesn't exist in Torrent`);
            if (priority !== "low" && priority !== "normal" && priority !== "high")
                priority = "normal";
            let options = {};
            if (priority === "low")
                options["priority-low"] = idx;
            else if (priority === "normal")
                options["priority-normal"] = idx;
            else
                options["priority-high"] = idx;
            return yield this.setTorrentProperties(options);
        });
    }
    setFileWanted(obj, wanted = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let idx;
            if (Array.isArray(obj) && obj.length && typeof obj[0] === "object")
                idx = obj.map(f => f.id);
            else if (Array.isArray(obj))
                idx = obj;
            else if (typeof obj === "object")
                idx = [obj.id];
            else
                idx = [obj];
            if (idx.some(id => id > this.files.length || id < 0))
                throw new RangeError(`File ${idx} doesn't exist in Torrent`);
            let options = {};
            if (wanted)
                return yield this.setTorrentProperties({ "files-wanted": idx });
            else
                return yield this.setTorrentProperties({ "files-unwanted": idx });
        });
    }
    setTorrentProperties(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.setTorrentProperties(this.id, options);
        });
    }
}
exports.Torrent = Torrent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7WUFDM0IsSUFBSTtnQkFDQSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVoQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsR0FBRywyQkFBMkIsQ0FBQyxDQUFDO1lBRWpFLElBQUksT0FBTyxHQUFzQixFQUFFLENBQUM7WUFDcEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNQLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFBO1lBQ2pFLElBQUk7Z0JBQ0EsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQTtRQUN2RSxDQUFDO0tBQUE7SUFFSyxvQkFBb0IsQ0FBQyxPQUEwQjs7WUFDakQsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FBQTtDQUNKO0FBaFJELDBCQWdSQyIsImZpbGUiOiJsaWIvVG9ycmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpYWxpemFibGUsIElNdXRhYmxlIH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgSUZpbGUsIElGaWxlU3RhdCwgRmlsZSB9IGZyb20gXCIuL0ZpbGVcIjtcbmltcG9ydCB7IElQZWVyLCBJUGVlcnNGcm9tIH0gZnJvbSBcIi4vUGVlclwiO1xuaW1wb3J0IHsgSVRyYWNrZXIsIElUcmFja2VyU3RhdCwgVHJhY2tlciB9IGZyb20gXCIuL1RyYWNrZXJcIlxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4vQ2xpZW50XCI7XG5pbXBvcnQgeyBUcmFuc21pc3Npb25SZXF1ZXN0IH0gZnJvbSBcIi4vQ29tbXVuaWNhdGlvblwiO1xuXG5leHBvcnQgdHlwZSBJZExpc3QgPSBudW1iZXJ8bnVtYmVyW118c3RyaW5nfHN0cmluZ1tdfG51bGw7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuYW1lVG9ycmVudFJlc3BvbnNlIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGlkOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRUb3JyZW50T3B0aW9ucyB7XG4gICAgY29va2llcz86IHN0cmluZztcbiAgICBcImRvd25sb2FkLWRpclwiPzogc3RyaW5nO1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIG1ldGFpbmZvPzogc3RyaW5nO1xuICAgIHBhdXNlZD86IGJvb2xlYW47XG4gICAgXCJwZWVyLWxpbWl0XCI/OiBudW1iZXI7XG4gICAgYmFuZHdpZHRoUHJpb3JpdHk/OiBudW1iZXI7XG4gICAgXCJmaWxlcy13YW50ZWRcIj86IG51bWJlcltdO1xuICAgIFwiZmlsZXMtdW53YW50ZWRcIj86IG51bWJlcltdO1xuICAgIFwicHJpb3JpdHktaGlnaFwiOiBudW1iZXJbXTtcbiAgICBcInByaW9yaXR5LWxvd1wiOiBudW1iZXJbXTtcbiAgICBcInByaW9yaXR5LW5vcm1hbFwiOiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXRMb2NhdGlvbk9wdGlvbnMge1xuICAgIGlkcz86IElkTGlzdDtcbiAgICBsb2NhdGlvbj86IHN0cmluZztcbiAgICBtb3ZlPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldFRvcnJlbnRPcHRpb25zIHtcbiAgICBiYW5kd2lkdGhQcmlvcml0eT86IG51bWJlcjtcbiAgICBkb3dubG9hZExpbWl0PzogbnVtYmVyO1xuICAgIGRvd25sb2FkTGltaXRlZD86IGJvb2xlYW47XG4gICAgXCJmaWxlcy13YW50ZWRcIj86IG51bWJlcltdO1xuICAgIFwiZmlsZXMtdW53YW50ZWRcIj86IG51bWJlcltdO1xuICAgIGhvbm9yc1Nlc3Npb25MaW1pdHM/OiBib29sZWFuO1xuICAgIGlkcz86IElkTGlzdDtcbiAgICBsb2NhdGlvbj86IHN0cmluZztcbiAgICBcInBlZXItbGltaXRcIj86IG51bWJlcjtcbiAgICBcInByaW9yaXR5LWhpZ2hcIj86IG51bWJlcltdO1xuICAgIFwicHJpb3JpdHktbG93XCI/OiBudW1iZXJbXTtcbiAgICBcInByaW9yaXR5LW5vcm1hbFwiPzogbnVtYmVyW107XG4gICAgcXVldWVQb3NpdGlvbj86IG51bWJlcjtcbiAgICBzZWVkSWRsZUxpbWl0PzogbnVtYmVyO1xuICAgIHNlZWRJZGxlTW9kZT86IG51bWJlcjtcbiAgICBzZWVkUmF0aW9MaW1pdD86IG51bWJlcjtcbiAgICBzZWVkUmF0aW9Nb2RlPzogbnVtYmVyO1xuICAgIHRyYWNrZXJBZGQ/OiBzdHJpbmdbXTtcbiAgICB0cmFja2VyUmVtb3ZlPzogbnVtYmVyW107XG4gICAgdHJhY2tlclJlcGxhY2U/OiBbW251bWJlciwgc3RyaW5nXV07XG4gICAgdXBsb2FkTGltaXQ/OiBudW1iZXI7XG4gICAgdXBsb2FkTGltaXRlZD86IGJvb2xlYW47XG59XG5cbi8vIFRPRE86IG9uY2Ugd2UgaGF2ZSB0eXBlIHN1YnRyYWN0aW9uLCBJIHNob3VsZCBiZSBhYmxlIHRvIFxuLy8gdW5wYXJ0aWFsIGEgdHlwZSwgcmVtb3ZpbmcgdGhlIG5lZWQgZm9yIHRoaXNcbmV4cG9ydCBpbnRlcmZhY2UgSUZpbGxlZFRvcnJlbnQge1xuICAgIGFjdGl2aXR5RGF0ZTogbnVtYmVyO1xuICAgIGFkZGVkRGF0ZTogbnVtYmVyO1xuICAgIGJhbmR3aWR0aFByaW9yaXR5OiBudW1iZXI7XG4gICAgY29tbWVudDogc3RyaW5nO1xuICAgIGNvcnJ1cHRFdmVyOiBudW1iZXI7XG4gICAgY3JlYXRvcjogc3RyaW5nO1xuICAgIGRhdGVDcmVhdGVkOiBudW1iZXI7XG4gICAgZGVzaXJlZEF2YWlsYWJsZTogbnVtYmVyO1xuICAgIGRvbmVEYXRlOiBudW1iZXI7XG4gICAgZG93bmxvYWREaXI6IHN0cmluZztcbiAgICBkb3dubG9hZGVkRXZlcjogbnVtYmVyO1xuICAgIGRvd25sb2FkTGltaXQ6IG51bWJlcjtcbiAgICBkb3dubG9hZExpbWl0ZWQ6IGJvb2xlYW47XG4gICAgZXJyb3I6IG51bWJlcjtcbiAgICBlcnJvclN0cmluZzogc3RyaW5nO1xuICAgIGV0YTogbnVtYmVyO1xuICAgIGV0YUlkbGU6IG51bWJlcjtcbiAgICBmaWxlczogSUZpbGVbXTtcbiAgICBmaWxlU3RhdHM6IElGaWxlU3RhdFtdO1xuICAgIGhhc2hTdHJpbmc6IHN0cmluZztcbiAgICBoYXZlVW5jaGVja2VkOiBudW1iZXI7XG4gICAgaGF2ZVZhbGlkOiBudW1iZXI7XG4gICAgaG9ub3JzU2Vzc2lvbkxpbWl0czogYm9vbGVhbjtcbiAgICBpZDogbnVtYmVyO1xuICAgIGlzRmluaXNoZWQ6IGJvb2xlYW47XG4gICAgaXNQcml2YXRlOiBib29sZWFuO1xuICAgIGlzU3RhbGxlZDogYm9vbGVhbjtcbiAgICBsZWZ0VW50aWxEb25lOiBudW1iZXI7XG4gICAgbWFnbmV0TGluazogc3RyaW5nO1xuICAgIG1hbnVhbEFubm91bmNlVGltZTogbnVtYmVyO1xuICAgIG1heENvbm5lY3RlZFBlZXJzOiBudW1iZXI7XG4gICAgbWV0YWRhdGFQZXJjZW50Q29tcGxldGU6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgXCJwZWVyLWxpbWl0XCI6IG51bWJlcjtcbiAgICBwZWVyczogSVBlZXJbXTtcbiAgICBwZWVyc0Nvbm5lY3RlZDogbnVtYmVyO1xuICAgIHBlZXJzRnJvbTogSVBlZXJzRnJvbTtcbiAgICBwZWVyc0dldHRpbmdGcm9tVXM6IG51bWJlcjtcbiAgICBwZWVyc1NlbmRpbmdUb1VzOiBudW1iZXI7XG4gICAgcGVyY2VudERvbmU6IG51bWJlcjtcbiAgICBwaWVjZXM6IHN0cmluZztcbiAgICBwaWVjZUNvdW50OiBudW1iZXI7XG4gICAgcGllY2VTaXplOiBudW1iZXI7XG4gICAgcHJpb3JpdGllczogbnVtYmVyW107XG4gICAgcXVldWVQb3NpdGlvbjogbnVtYmVyO1xuICAgIHJhdGVEb3dubG9hZDogbnVtYmVyO1xuICAgIHJhdGVVcGxvYWQ6IG51bWJlcjtcbiAgICByZWNoZWNrUHJvZ3Jlc3M6IG51bWJlcjtcbiAgICBzZWNvbmRzRG93bmxvYWRpbmc6IG51bWJlcjtcbiAgICBzZWNvbmRzU2VlZGluZzogbnVtYmVyO1xuICAgIHNlZWRJZGxlTGltaXQ6IG51bWJlcjtcbiAgICBzZWVkSWRsZU1vZGU6IG51bWJlcjtcbiAgICBzZWVkUmF0aW9MaW1pdDogbnVtYmVyO1xuICAgIHNlZWRSYXRpb01vZGU6IG51bWJlcjtcbiAgICBzaXplV2hlbkRvbmU6IG51bWJlcjtcbiAgICBzdGFydERhdGU6IG51bWJlcjtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICB0cmFja2VyczogSVRyYWNrZXJbXTtcbiAgICB0cmFja2VyU3RhdHM6IElUcmFja2VyU3RhdFtdO1xuICAgIHRvdGFsU2l6ZTogbnVtYmVyO1xuICAgIHRvcnJlbnRGaWxlOiBzdHJpbmc7XG4gICAgdXBsb2FkZWRFdmVyOiBudW1iZXI7XG4gICAgdXBsb2FkTGltaXQ6IG51bWJlcjtcbiAgICB1cGxvYWRMaW1pdGVkOiBib29sZWFuO1xuICAgIHVwbG9hZFJhdGlvOiBudW1iZXI7XG4gICAgd2FudGVkOiBudW1iZXJbXTtcbiAgICB3ZWJzZWVkczogc3RyaW5nW107XG4gICAgd2Vic2VlZHNTZW5kaW5nVG9VczogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUb3JyZW50IGV4dGVuZHMgUGFydGlhbDxJRmlsbGVkVG9ycmVudD4ge31cblxuZXhwb3J0IGNsYXNzIFRvcnJlbnQgaW1wbGVtZW50cyBSZWFkb25seTxJRmlsbGVkVG9ycmVudD4sIElTZXJpYWxpemFibGU8SVRvcnJlbnQsIFRvcnJlbnQ+LCBJTXV0YWJsZTxJVG9ycmVudD4ge1xuICAgIC8vIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHsgcmV0dXJuIFwiVG9ycmVudFwiIH07XG4gICAgW1N5bWJvbC50b1N0cmluZ1RhZ10gPSBcIlRvcnJlbnRcIjtcblxuICAgIHByaXZhdGUgX3RvcnJlbnQ6IElUb3JyZW50ID0ge307XG5cbiAgICAvLyBtdXRhYmxlIHByb3BlcnRpZXNcbiAgICBnZXQgYmFuZHdpZHRoUHJpb3JpdHkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJiYW5kd2lkdGhQcmlvcml0eVwiXTsgfVxuICAgIGdldCBkb3dubG9hZExpbWl0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiZG93bmxvYWRMaW1pdFwiXTsgfVxuICAgIGdldCBkb3dubG9hZExpbWl0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiZG93bmxvYWRMaW1pdGVkXCJdOyB9XG4gICAgZ2V0IGhvbm9yc1Nlc3Npb25MaW1pdHMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiaG9ub3JzU2Vzc2lvbkxpbWl0c1wiXTsgfVxuICAgIGdldCBxdWV1ZVBvc2l0aW9uKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wicXVldWVQb3NpdGlvblwiXTsgfVxuICAgIGdldCBzZWVkSWRsZUxpbWl0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wic2VlZElkbGVMaW1pdFwiXTsgfVxuICAgIGdldCBzZWVkSWRsZU1vZGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJzZWVkSWRsZU1vZGVcIl07IH1cbiAgICBnZXQgc2VlZFJhdGlvTGltaXQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJzZWVkUmF0aW9MaW1pdFwiXTsgfVxuICAgIGdldCBzZWVkUmF0aW9Nb2RlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wic2VlZFJhdGlvTW9kZVwiXTsgfVxuICAgIGdldCB1cGxvYWRMaW1pdCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInVwbG9hZExpbWl0XCJdOyB9XG4gICAgZ2V0IHVwbG9hZExpbWl0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90b3JyZW50W1widXBsb2FkTGltaXRlZFwiXTsgfVxuICAgIGdldCBcInBlZXItbGltaXRcIigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInBlZXItbGltaXRcIl07IH1cblxuICAgIC8vIHByb3BlcnRpZXMgZnJvbSBJVG9ycmVudFxuICAgIGdldCBhY3Rpdml0eURhdGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJhY3Rpdml0eURhdGVcIl07IH1cbiAgICBnZXQgYWRkZWREYXRlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiYWRkZWREYXRlXCJdOyB9XG4gICAgZ2V0IGNvbW1lbnQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJjb21tZW50XCJdOyB9XG4gICAgZ2V0IGNvcnJ1cHRFdmVyKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiY29ycnVwdEV2ZXJcIl07IH1cbiAgICBnZXQgY3JlYXRvcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcImNyZWF0b3JcIl07IH1cbiAgICBnZXQgZGF0ZUNyZWF0ZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJkYXRlQ3JlYXRlZFwiXTsgfVxuICAgIGdldCBkZXNpcmVkQXZhaWxhYmxlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiZGVzaXJlZEF2YWlsYWJsZVwiXTsgfVxuICAgIGdldCBkb25lRGF0ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcImRvbmVEYXRlXCJdOyB9XG4gICAgZ2V0IGRvd25sb2FkRGlyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiZG93bmxvYWREaXJcIl07IH1cbiAgICBnZXQgZG93bmxvYWRlZEV2ZXIoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJkb3dubG9hZGVkRXZlclwiXTsgfVxuICAgIGdldCBlcnJvcigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcImVycm9yXCJdOyB9XG4gICAgZ2V0IGVycm9yU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiZXJyb3JTdHJpbmdcIl07IH1cbiAgICBnZXQgZXRhKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiZXRhXCJdOyB9XG4gICAgZ2V0IGV0YUlkbGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJldGFJZGxlXCJdOyB9XG4gICAgZ2V0IGZpbGVzKCk6IEZpbGVbXSB7IHJldHVybiA8RmlsZVtdPnRoaXMuX3RvcnJlbnRbXCJmaWxlc1wiXTsgfVxuICAgIGdldCBmaWxlU3RhdHMoKTogSUZpbGVTdGF0W10geyByZXR1cm4gdGhpcy5fdG9ycmVudFtcImZpbGVTdGF0c1wiXTsgfVxuICAgIGdldCBoYXNoU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiaGFzaFN0cmluZ1wiXTsgfVxuICAgIGdldCBoYXZlVW5jaGVja2VkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiaGF2ZVVuY2hlY2tlZFwiXTsgfVxuICAgIGdldCBoYXZlVmFsaWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJoYXZlVmFsaWRcIl07IH1cbiAgICBnZXQgaWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJpZFwiXTsgfVxuICAgIGdldCBpc0ZpbmlzaGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdG9ycmVudFtcImlzRmluaXNoZWRcIl07IH1cbiAgICBnZXQgaXNQcml2YXRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdG9ycmVudFtcImlzUHJpdmF0ZVwiXTsgfVxuICAgIGdldCBpc1N0YWxsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90b3JyZW50W1wiaXNTdGFsbGVkXCJdOyB9XG4gICAgZ2V0IGxlZnRVbnRpbERvbmUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJsZWZ0VW50aWxEb25lXCJdOyB9XG4gICAgZ2V0IG1hZ25ldExpbmsoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJtYWduZXRMaW5rXCJdOyB9XG4gICAgZ2V0IG1hbnVhbEFubm91bmNlVGltZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcIm1hbnVhbEFubm91bmNlVGltZVwiXTsgfVxuICAgIGdldCBtYXhDb25uZWN0ZWRQZWVycygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcIm1heENvbm5lY3RlZFBlZXJzXCJdOyB9XG4gICAgZ2V0IG1ldGFkYXRhUGVyY2VudENvbXBsZXRlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wibWV0YWRhdGFQZXJjZW50Q29tcGxldGVcIl07IH1cbiAgICBnZXQgbmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcIm5hbWVcIl07IH1cbiAgICBnZXQgcGVlcnMoKTogSVBlZXJbXSB7IHJldHVybiB0aGlzLl90b3JyZW50W1wicGVlcnNcIl07IH1cbiAgICBnZXQgcGVlcnNDb25uZWN0ZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJwZWVyc0Nvbm5lY3RlZFwiXTsgfVxuICAgIGdldCBwZWVyc0Zyb20oKTogSVBlZXJzRnJvbSB7IHJldHVybiB0aGlzLl90b3JyZW50W1wicGVlcnNGcm9tXCJdOyB9XG4gICAgZ2V0IHBlZXJzR2V0dGluZ0Zyb21VcygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInBlZXJzR2V0dGluZ0Zyb21Vc1wiXTsgfVxuICAgIGdldCBwZWVyc1NlbmRpbmdUb1VzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wicGVlcnNTZW5kaW5nVG9Vc1wiXTsgfVxuICAgIGdldCBwZXJjZW50RG9uZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInBlcmNlbnREb25lXCJdOyB9XG4gICAgZ2V0IHBpZWNlcygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInBpZWNlc1wiXTsgfVxuICAgIGdldCBwaWVjZUNvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wicGllY2VDb3VudFwiXTsgfVxuICAgIGdldCBwaWVjZVNpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJwaWVjZVNpemVcIl07IH1cbiAgICBnZXQgcHJpb3JpdGllcygpOiBudW1iZXJbXSB7IHJldHVybiB0aGlzLl90b3JyZW50W1wicHJpb3JpdGllc1wiXTsgfVxuICAgIGdldCByYXRlRG93bmxvYWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJyYXRlRG93bmxvYWRcIl07IH1cbiAgICBnZXQgcmF0ZVVwbG9hZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInJhdGVVcGxvYWRcIl07IH1cbiAgICBnZXQgcmVjaGVja1Byb2dyZXNzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wicmVjaGVja1Byb2dyZXNzXCJdOyB9XG4gICAgZ2V0IHNlY29uZHNEb3dubG9hZGluZygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInNlY29uZHNEb3dubG9hZGluZ1wiXTsgfVxuICAgIGdldCBzZWNvbmRzU2VlZGluZygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInNlY29uZHNTZWVkaW5nXCJdOyB9XG4gICAgZ2V0IHNpemVXaGVuRG9uZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInNpemVXaGVuRG9uZVwiXTsgfVxuICAgIGdldCBzdGFydERhdGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJzdGFydERhdGVcIl07IH1cbiAgICBnZXQgc3RhdHVzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3JyZW50W1wic3RhdHVzXCJdOyB9XG4gICAgZ2V0IHRyYWNrZXJzKCk6IFRyYWNrZXJbXSB7IHJldHVybiA8VHJhY2tlcltdPnRoaXMuX3RvcnJlbnRbXCJ0cmFja2Vyc1wiXTsgfVxuICAgIGdldCB0cmFja2VyU3RhdHMoKTogSVRyYWNrZXJTdGF0W10geyByZXR1cm4gdGhpcy5fdG9ycmVudFtcInRyYWNrZXJTdGF0c1wiXTsgfVxuICAgIGdldCB0b3RhbFNpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJ0b3RhbFNpemVcIl07IH1cbiAgICBnZXQgdG9ycmVudEZpbGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJ0b3JyZW50RmlsZVwiXTsgfVxuICAgIGdldCB1cGxvYWRlZEV2ZXIoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJ1cGxvYWRlZEV2ZXJcIl07IH1cbiAgICBnZXQgdXBsb2FkUmF0aW8oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvcnJlbnRbXCJ1cGxvYWRSYXRpb1wiXTsgfVxuICAgIGdldCB3YW50ZWQoKTogbnVtYmVyW10geyByZXR1cm4gdGhpcy5fdG9ycmVudFtcIndhbnRlZFwiXTsgfVxuICAgIGdldCB3ZWJzZWVkcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl90b3JyZW50W1wid2Vic2VlZHNcIl07IH1cbiAgICBnZXQgd2Vic2VlZHNTZW5kaW5nVG9VcygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG9ycmVudFtcIndlYnNlZWRzU2VuZGluZ1RvVXNcIl07IH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50OiBDbGllbnQsIHByaXZhdGUgZmllbGRzOiBzdHJpbmdbXSkgeyB9XG5cbiAgICBzZXJpYWxpemUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMpO1xuICAgIH1cblxuICAgIHRvSlNPTigpOiBJVG9ycmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3JyZW50O1xuICAgIH1cblxuICAgIGRlc2VyaWFsaXplKGlucHV0OiBzdHJpbmcgfCBJVG9ycmVudCk6IFRvcnJlbnQge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgaW5wdXQgPSA8SVRvcnJlbnQ+SlNPTi5wYXJzZShpbnB1dCk7XG5cbiAgICAgICAgbGV0IGZpbGVzOklGaWxlW107XG4gICAgICAgIGlmIChpbnB1dC5maWxlcykge1xuICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBhbnkgcHJldmlvdXMgZmlsZXMsIHdlJ3ZlIGNhbGxlZCB0aGUgZGVzZXJpYWxpemUgbWV0aG9kIGJlZm9yZVxuICAgICAgICAgICAgLy8gc28gZmlsZXMgbXVzdCBiZSBGaWxlIHR5cGUsIG5vdCBJRmlsZVxuICAgICAgICAgICAgaWYgKHRoaXMuX3RvcnJlbnQuZmlsZXMgJiYgdGhpcy5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgYXNzdW1lIHRoZSBmaWxlIGxpc3QgbGVuZ3RoIGlzbid0IGNoYW5nZWQsIHNpbmNlIHlvdSBjYW4ndCBcbiAgICAgICAgICAgICAgICAvLyBhZGQgb3IgcmVtb3ZlIGEgZmlsZSBmcm9tIGEgdG9ycmVudCBqdXN0IGNoYW5nZSB3aGV0aGVyIGl0J3Mgd2FudGVkIG9yIG5vdFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXQuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSA8RmlsZT50aGlzLl90b3JyZW50LmZpbGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBmaWxlLmRlc2VyaWFsaXplKGlucHV0LmZpbGVzW2ldKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZmlsZVN0YXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnN0YXRzID0gaW5wdXQuZmlsZVN0YXRzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3JyZW50LmZpbGVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RmlsZSA9IG5ldyBGaWxlKHRoaXMsIGkpLmRlc2VyaWFsaXplKGlucHV0LmZpbGVzW2ldKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVyZSBzaG91bGQgYWx3YXlzIGJlIGFuIGlucHV0LmZpbGVTdGF0cyBpZiB0aGVyZSdzIGEgZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGl0IGRvZXNuJ3QgaHVydCB0byBjaGVja1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZmlsZVN0YXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdGaWxlLnN0YXRzID0gaW5wdXQuZmlsZVN0YXRzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9ycmVudC5maWxlcy5wdXNoKG5ld0ZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dC50cmFja2Vycykge1xuICAgICAgICAgICAgdGhpcy5fdG9ycmVudC50cmFja2VycyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC50cmFja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdUcmFja2VyID0gbmV3IFRyYWNrZXIoKS5kZXNlcmlhbGl6ZShpbnB1dC50cmFja2Vyc1tpXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHJhY2tlclN0YXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RyYWNrZXIuc3RhdHMgPSBpbnB1dC50cmFja2VyU3RhdHNbaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9ycmVudC50cmFja2Vycy5wdXNoKG5ld1RyYWNrZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdG9ycmVudCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3RvcnJlbnQsIGlucHV0KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGUoZmllbGRzOiBzdHJpbmdbXSA9IFtdKTogUHJvbWlzZTxJVG9ycmVudD4ge1xuICAgICAgICBmaWVsZHMgPSBmaWVsZHMubGVuZ3RoID8gZmllbGRzIDogdGhpcy5maWVsZHM7XG4gICAgICAgIGxldCByZXEgPSBuZXcgVHJhbnNtaXNzaW9uUmVxdWVzdChcInRvcnJlbnQtZ2V0XCIsIHsgaWRzOiBbdGhpcy5pZF0sIGZpZWxkczogZmllbGRzIH0pO1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5jbGllbnQuc2VuZFJlcXVlc3QocmVxKTtcblxuICAgICAgICB2YXIgZWxlbWVudCA9IDxJVG9ycmVudD5yZXMuYXJndW1lbnRzW1widG9ycmVudHNcIl1bMF07XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemUoZWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IHBlZXJMaW1pdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbXCJwZWVyLWxpbWl0XCJdO1xuICAgIH1cblxuICAgIGFzeW5jIHNldFVwbG9hZExpbWl0ZWQobGltaXRlZDogYm9vbGVhbikge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFRvcnJlbnRQcm9wZXJ0aWVzKHsgdXBsb2FkTGltaXRlZDogbGltaXRlZCB9KVxuICAgICAgICB0aGlzLl90b3JyZW50LnVwbG9hZExpbWl0ZWQgPSBsaW1pdGVkO1xuICAgIH1cbiAgICBhc3luYyBzZXRVcGxvYWRMaW1pdChsaW1pdDogbnVtYmVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0VG9ycmVudFByb3BlcnRpZXMoeyB1cGxvYWRMaW1pdDogbGltaXQgfSk7XG4gICAgICAgIHRoaXMuX3RvcnJlbnQudXBsb2FkTGltaXQgPSBsaW1pdDtcbiAgICB9XG4gICAgYXN5bmMgc2V0U2VlZFJhdGlvTW9kZShtb2RlOiBudW1iZXIpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRUb3JyZW50UHJvcGVydGllcyh7IHNlZWRSYXRpb01vZGU6IG1vZGUgfSk7XG4gICAgICAgIHRoaXMuX3RvcnJlbnQuc2VlZFJhdGlvTW9kZSA9IG1vZGU7XG4gICAgfVxuICAgIGFzeW5jIHNldFNlZWRSYXRpb0xpbWl0KGxpbWl0OiBudW1iZXIpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRUb3JyZW50UHJvcGVydGllcyh7IHNlZWRSYXRpb0xpbWl0OiBsaW1pdCB9KTtcbiAgICAgICAgdGhpcy5fdG9ycmVudC5zZWVkUmF0aW9MaW1pdCA9IGxpbWl0O1xuICAgIH1cbiAgICBhc3luYyBzZXRTZWVkSWRsZU1vZGUobW9kZTogbnVtYmVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0VG9ycmVudFByb3BlcnRpZXMoeyBzZWVkSWRsZU1vZGU6IG1vZGUgfSk7XG4gICAgICAgIHRoaXMuX3RvcnJlbnQuc2VlZElkbGVNb2RlID0gbW9kZTtcbiAgICB9XG4gICAgYXN5bmMgc2V0U2VlZElkbGVMaW1pdChsaW1pdDogbnVtYmVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0VG9ycmVudFByb3BlcnRpZXMoeyBzZWVkSWRsZUxpbWl0OiBsaW1pdCB9KTtcbiAgICAgICAgdGhpcy5fdG9ycmVudC5zZWVkSWRsZUxpbWl0ID0gbGltaXQ7XG4gICAgfVxuICAgIGFzeW5jIHNldFF1ZXVlUG9zaXRpb24ocG9zOiBudW1iZXIpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRUb3JyZW50UHJvcGVydGllcyh7IHF1ZXVlUG9zaXRpb246IHBvcyB9KTtcbiAgICAgICAgdGhpcy5fdG9ycmVudC5xdWV1ZVBvc2l0aW9uID0gcG9zO1xuICAgIH1cbiAgICBhc3luYyBzZXRQZWVyTGltaXQobGltaXQ6IG51bWJlcikge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFRvcnJlbnRQcm9wZXJ0aWVzKHsgXCJwZWVyLWxpbWl0XCI6IGxpbWl0IH0pO1xuICAgICAgICB0aGlzLl90b3JyZW50W1wicGVlci1saW1pdFwiXSA9IGxpbWl0O1xuICAgIH1cbiAgICBhc3luYyBzZXRMb2NhdGlvbihsb2NhdGlvbjogc3RyaW5nLCBtb3ZlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuc2V0VG9ycmVudExvY2F0aW9uKHRoaXMuaWQsIHsgbG9jYXRpb24sIG1vdmUgfSk7XG4gICAgfVxuICAgIGFzeW5jIHNldEhvbm9yc1Nlc3Npb25MaW1pdHMoaG9ub3JlZDogYm9vbGVhbikge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFRvcnJlbnRQcm9wZXJ0aWVzKHsgaG9ub3JzU2Vzc2lvbkxpbWl0czogaG9ub3JlZCB9KTtcbiAgICAgICAgdGhpcy5fdG9ycmVudC5ob25vcnNTZXNzaW9uTGltaXRzID0gaG9ub3JlZDtcbiAgICB9XG4gICAgYXN5bmMgc2V0RG93bmxvYWRMaW1pdGVkKGlzTGltaXRlZDogYm9vbGVhbikge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFRvcnJlbnRQcm9wZXJ0aWVzKHsgZG93bmxvYWRMaW1pdGVkOiBpc0xpbWl0ZWQgfSk7XG4gICAgICAgIHRoaXMuX3RvcnJlbnQuZG93bmxvYWRMaW1pdGVkID0gaXNMaW1pdGVkO1xuICAgIH1cbiAgICBhc3luYyBzZXREb3dubG9hZExpbWl0KGxpbWl0OiBudW1iZXIpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRUb3JyZW50UHJvcGVydGllcyh7IGRvd25sb2FkTGltaXQ6IGxpbWl0IH0pO1xuICAgICAgICB0aGlzLl90b3JyZW50LmRvd25sb2FkTGltaXQgPSBsaW1pdDtcbiAgICB9XG4gICAgYXN5bmMgc2V0QmFuZHdpZHRoUHJpb3JpdHkocHJpb3JpdHk6IG51bWJlcikge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFRvcnJlbnRQcm9wZXJ0aWVzKHsgYmFuZHdpZHRoUHJpb3JpdHk6IHByaW9yaXR5IH0pO1xuICAgICAgICB0aGlzLl90b3JyZW50LmJhbmR3aWR0aFByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuICAgIGFzeW5jIHNldE5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLmNsaWVudC5yZW5hbWVUb3JyZW50UGF0aCh0aGlzLmlkLCB0aGlzLm5hbWUsIG5hbWUpO1xuICAgICAgICB0aGlzLl90b3JyZW50Lm5hbWUgPSByZXMubmFtZTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRGaWxlUHJpb3JpdHkoZmlsZTogRmlsZSwgcHJpb3JpdHk6IFwibG93XCJ8XCJub3JtYWxcInxcImhpZ2hcIik6IFByb21pc2U8dm9pZD5cbiAgICBhc3luYyBzZXRGaWxlUHJpb3JpdHkoZmlsZXM6IEZpbGVbXSwgcHJpb3JpdHk6IFwibG93XCJ8XCJub3JtYWxcInxcImhpZ2hcIik6IFByb21pc2U8dm9pZD5cbiAgICBhc3luYyBzZXRGaWxlUHJpb3JpdHkoaWR4OiBudW1iZXIsIHByaW9yaXR5OiBcImxvd1wifFwibm9ybWFsXCJ8XCJoaWdoXCIpOiBQcm9taXNlPHZvaWQ+XG4gICAgYXN5bmMgc2V0RmlsZVByaW9yaXR5KGluZGV4ZXM6IG51bWJlcltdLCBwcmlvcml0eTogXCJsb3dcInxcIm5vcm1hbFwifFwiaGlnaFwiKTogUHJvbWlzZTx2b2lkPlxuICAgIGFzeW5jIHNldEZpbGVQcmlvcml0eShvYmo6IGFueSwgcHJpb3JpdHk6IFwibG93XCJ8XCJub3JtYWxcInxcImhpZ2hcIik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBsZXQgaWR4OiBudW1iZXJbXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSAmJiBvYmoubGVuZ3RoICYmIHR5cGVvZiBvYmpbMF0gPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICBpZHggPSAoPEZpbGVbXT5vYmopLm1hcChmID0+IGYuaWQpO1xuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpXG4gICAgICAgICAgICBpZHggPSBvYmo7XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICBpZHggPSBbKDxGaWxlPm9iaikuaWRdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZHggPSBbb2JqXTtcblxuICAgICAgICBpZiAoaWR4LnNvbWUoaWQgPT4gaWQgPiB0aGlzLmZpbGVzLmxlbmd0aCB8fCBpZCA8IDApKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYEZpbGUgJHtpZHh9IGRvZXNuJ3QgZXhpc3QgaW4gVG9ycmVudGApO1xuXG4gICAgICAgIGlmIChwcmlvcml0eSAhPT0gXCJsb3dcIiAmJiBwcmlvcml0eSAhPT0gXCJub3JtYWxcIiAmJiBwcmlvcml0eSAhPT0gXCJoaWdoXCIpXG4gICAgICAgICAgICBwcmlvcml0eSA9IFwibm9ybWFsXCI7XG5cbiAgICAgICAgbGV0IG9wdGlvbnM6U2V0VG9ycmVudE9wdGlvbnMgPSB7fTtcbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSBcImxvd1wiKVxuICAgICAgICAgICAgb3B0aW9uc1tcInByaW9yaXR5LWxvd1wiXSA9IGlkeDtcbiAgICAgICAgZWxzZSBpZiAocHJpb3JpdHkgPT09IFwibm9ybWFsXCIpXG4gICAgICAgICAgICBvcHRpb25zW1wicHJpb3JpdHktbm9ybWFsXCJdID0gaWR4O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBvcHRpb25zW1wicHJpb3JpdHktaGlnaFwiXSA9IGlkeDtcblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXRUb3JyZW50UHJvcGVydGllcyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRGaWxlV2FudGVkKGZpbGU6IEZpbGUsIHdhbnRlZD86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+XG4gICAgYXN5bmMgc2V0RmlsZVdhbnRlZChmaWxlczogRmlsZVtdLCB3YW50ZWQ/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPlxuICAgIGFzeW5jIHNldEZpbGVXYW50ZWQoaWR4OiBudW1iZXIsIHdhbnRlZD86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+XG4gICAgYXN5bmMgc2V0RmlsZVdhbnRlZChpbmRleGVzOiBudW1iZXJbXSwgd2FudGVkPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD5cbiAgICBhc3luYyBzZXRGaWxlV2FudGVkKG9iajogYW55LCB3YW50ZWQ6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBpZHg6IG51bWJlcltdO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopICYmIG9iai5sZW5ndGggJiYgdHlwZW9mIG9ialswXSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIGlkeCA9ICg8RmlsZVtdPm9iaikubWFwKGYgPT4gZi5pZCk7XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgICAgIGlkeCA9IG9iajtcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIGlkeCA9IFsoPEZpbGU+b2JqKS5pZF07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlkeCA9IFtvYmpdO1xuXG4gICAgICAgIGlmIChpZHguc29tZShpZCA9PiBpZCA+IHRoaXMuZmlsZXMubGVuZ3RoIHx8IGlkIDwgMCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgRmlsZSAke2lkeH0gZG9lc24ndCBleGlzdCBpbiBUb3JyZW50YCk7XG5cbiAgICAgICAgbGV0IG9wdGlvbnM6IFNldFRvcnJlbnRPcHRpb25zID0ge307XG4gICAgICAgIGlmICh3YW50ZWQpXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXRUb3JyZW50UHJvcGVydGllcyh7XCJmaWxlcy13YW50ZWRcIjogaWR4fSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0VG9ycmVudFByb3BlcnRpZXMoe1wiZmlsZXMtdW53YW50ZWRcIjogaWR4fSlcbiAgICB9XG5cbiAgICBhc3luYyBzZXRUb3JyZW50UHJvcGVydGllcyhvcHRpb25zOiBTZXRUb3JyZW50T3B0aW9ucykge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jbGllbnQuc2V0VG9ycmVudFByb3BlcnRpZXModGhpcy5pZCwgb3B0aW9ucyk7XG4gICAgfVxufVxuIl19
