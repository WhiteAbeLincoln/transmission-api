/// <reference types="node" />
import * as EventEmitter from "events";
import { TransmissionRequest, TransmissionResponse } from "./Communication";
export declare type MockServerResponse = {
    req: TransmissionRequest;
    res: TransmissionResponse;
};
export interface MockServerOptions {
    port?: number;
    host?: string;
    path?: string;
}
export declare class MockServer extends EventEmitter {
    private idCount;
    private server;
    private options;
    private torrentList;
    private session;
    private sessionStat;
    private methods;
    constructor(options?: MockServerOptions);
    emit(event: "data", data: MockServerResponse): boolean;
    on(event: "data", listener: (data: MockServerResponse) => void): this;
    once(event: "data", listener: (data: MockServerResponse) => void): this;
    addListener(event: "data", listener: (data: MockServerResponse) => void): this;
    prependListener(event: "data", listener: (data: MockServerResponse) => void): this;
    prependOnceListener(event: "data", listener: (data: MockServerResponse) => void): this;
    removeListener(event: "data", listener: (data: MockServerResponse) => void): this;
    private addTorrent(args, cb);
    private removeTorrent(args, cb);
    private renameTorrent(args, cb);
    private getTorrent(args, cb);
    clear(): void;
    start(): void;
    stop(): void;
}
