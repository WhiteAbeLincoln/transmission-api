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
class File {
    constructor(parentTorrent, id) {
        this.parentTorrent = parentTorrent;
        this.id = id;
        this[Symbol.toStringTag] = "File";
    }
    set stats(v) { this._stats = v; }
    get bytesCompleted() { return this._file["bytesCompleted"]; }
    get length() { return this._file["length"]; }
    get name() { return this._file["name"]; }
    get wanted() { return this._stats["wanted"]; }
    get priority() { return this._stats["priority"]; }
    serialize() {
        return JSON.stringify(this);
    }
    toJSON() {
        return this._file;
    }
    deserialize(input) {
        if (typeof input === "string")
            input = JSON.parse(input);
        this._file = Object.assign({}, this._file, input);
        return this;
    }
    setPriority(priority) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parentTorrent.setFilePriority(this.id, priority);
        });
    }
    setWanted(wanted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parentTorrent.setFileWanted(this.id, wanted);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            let torrent = yield this.parentTorrent.update(["files", "fileStats"]);
            console.log(torrent);
            return torrent.files[this.id];
        });
    }
}
exports.File = File;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBZUE7SUFjSSxZQUFvQixhQUFzQixFQUFXLEVBQVU7UUFBM0Msa0JBQWEsR0FBYixhQUFhLENBQVM7UUFBVyxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBYi9ELEtBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQWFxQyxDQUFDO0lBUnBFLElBQUksS0FBSyxDQUFDLENBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUMsSUFBSSxjQUFjLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsSUFBSSxNQUFNLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELElBQUksSUFBSSxLQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxJQUFJLE1BQU0sS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsSUFBSSxRQUFRLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBSTFELFNBQVM7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTTtRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBcUI7UUFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO1lBQzFCLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFSyxXQUFXLENBQUMsUUFBbUM7O1lBQ2pELE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkUsQ0FBQztLQUFBO0lBRUssU0FBUyxDQUFDLE1BQWU7O1lBQzNCLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0lBRUssTUFBTTs7WUFDUixJQUFJLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0NBQ0o7QUE5Q0Qsb0JBOENDIiwiZmlsZSI6ImxpYi9GaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlcmlhbGl6YWJsZSwgSU11dGFibGUgfSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBUb3JyZW50IH0gZnJvbSBcIi4vVG9ycmVudFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlIHtcbiAgICBieXRlc0NvbXBsZXRlZDogbnVtYmVyO1xuICAgIGxlbmd0aDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRmlsZVN0YXQge1xuICAgIGJ5dGVzQ29tcGxldGVkOiBudW1iZXI7XG4gICAgcHJpb3JpdHk6IG51bWJlcjtcbiAgICB3YW50ZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGaWxlIGltcGxlbWVudHMgSUZpbGUsIElTZXJpYWxpemFibGU8SUZpbGUsIEZpbGU+LCBJTXV0YWJsZTxJRmlsZT4ge1xuICAgIFtTeW1ib2wudG9TdHJpbmdUYWddID0gXCJGaWxlXCI7XG5cbiAgICBwcml2YXRlIF9maWxlOklGaWxlO1xuICAgIHByaXZhdGUgX3N0YXRzOiBJRmlsZVN0YXQ7XG5cbiAgICBzZXQgc3RhdHModjogSUZpbGVTdGF0KSB7IHRoaXMuX3N0YXRzID0gdjsgfVxuXG4gICAgZ2V0IGJ5dGVzQ29tcGxldGVkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9maWxlW1wiYnl0ZXNDb21wbGV0ZWRcIl07IH1cbiAgICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9maWxlW1wibGVuZ3RoXCJdOyB9XG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ZpbGVbXCJuYW1lXCJdOyB9XG4gICAgZ2V0IHdhbnRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXRzW1wid2FudGVkXCJdOyB9XG4gICAgZ2V0IHByaW9yaXR5KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zdGF0c1tcInByaW9yaXR5XCJdOyB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmVudFRvcnJlbnQ6IFRvcnJlbnQsIHJlYWRvbmx5IGlkOiBudW1iZXIpIHsgfVxuXG4gICAgc2VyaWFsaXplKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTtcbiAgICB9XG5cbiAgICB0b0pTT04oKTogSUZpbGUge1xuICAgICAgIHJldHVybiB0aGlzLl9maWxlOyBcbiAgICB9XG5cbiAgICBkZXNlcmlhbGl6ZShpbnB1dDogc3RyaW5nIHwgSUZpbGUpOiBGaWxlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGlucHV0ID0gPElGaWxlPkpTT04ucGFyc2UoaW5wdXQpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9maWxlLCBpbnB1dCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0UHJpb3JpdHkocHJpb3JpdHk6IFwibG93XCIgfCBcIm5vcm1hbFwiIHwgXCJoaWdoXCIpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucGFyZW50VG9ycmVudC5zZXRGaWxlUHJpb3JpdHkodGhpcy5pZCwgcHJpb3JpdHkpO1xuICAgIH1cblxuICAgIGFzeW5jIHNldFdhbnRlZCh3YW50ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucGFyZW50VG9ycmVudC5zZXRGaWxlV2FudGVkKHRoaXMuaWQsIHdhbnRlZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlKCk6IFByb21pc2U8SUZpbGU+IHtcbiAgICAgICAgbGV0IHRvcnJlbnQgPSBhd2FpdCB0aGlzLnBhcmVudFRvcnJlbnQudXBkYXRlKFtcImZpbGVzXCIsIFwiZmlsZVN0YXRzXCJdKTtcbiAgICAgICAgY29uc29sZS5sb2codG9ycmVudCk7XG4gICAgICAgIHJldHVybiB0b3JyZW50LmZpbGVzW3RoaXMuaWRdO1xuICAgIH1cbn0iXX0=
