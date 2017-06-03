import { ISerializable, IMutable } from "./Interfaces";
import { Torrent } from "./Torrent";

export interface IFile {
    bytesCompleted: number;
    length: number;
    name: string;
}

export interface IFileStat {
    bytesCompleted: number;
    priority: number;
    wanted: boolean;
}

export class File implements IFile, ISerializable<IFile, File>, IMutable<IFile> {
    [Symbol.toStringTag] = "File";

    private _file:IFile;
    private _stats: IFileStat;

    set stats(v: IFileStat) { this._stats = v; }

    get bytesCompleted(): number { return this._file["bytesCompleted"]; }
    get length(): number { return this._file["length"]; }
    get name(): string { return this._file["name"]; }
    get wanted(): boolean { return this._stats["wanted"]; }
    get priority(): number { return this._stats["priority"]; }

    constructor(private parentTorrent: Torrent, readonly id: number) { }

    serialize(): string {
        return JSON.stringify(this);
    }

    toJSON(): IFile {
       return this._file; 
    }

    deserialize(input: string | IFile): File {
        if (typeof input === "string")
            input = <IFile>JSON.parse(input);

        this._file = Object.assign({}, this._file, input);

        return this;
    }

    async setPriority(priority: "low" | "normal" | "high") {
        return await this.parentTorrent.setFilePriority(this.id, priority);
    }

    async setWanted(wanted: boolean) {
        return await this.parentTorrent.setFileWanted(this.id, wanted);
    }

    async update(): Promise<IFile> {
        let torrent = await this.parentTorrent.update(["files", "fileStats"]);
        console.log(torrent);
        return torrent.files[this.id];
    }
}