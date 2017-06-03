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
export declare class File implements IFile, ISerializable<IFile, File>, IMutable<IFile> {
    private parentTorrent;
    readonly id: number;
    [Symbol.toStringTag]: string;
    private _file;
    private _stats;
    stats: IFileStat;
    readonly bytesCompleted: number;
    readonly length: number;
    readonly name: string;
    readonly wanted: boolean;
    readonly priority: number;
    constructor(parentTorrent: Torrent, id: number);
    serialize(): string;
    toJSON(): IFile;
    deserialize(input: string | IFile): File;
    setPriority(priority: "low" | "normal" | "high"): Promise<void>;
    setWanted(wanted: boolean): Promise<void>;
    update(): Promise<IFile>;
}
