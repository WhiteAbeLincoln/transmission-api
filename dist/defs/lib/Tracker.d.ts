import { ISerializable } from "./Interfaces";
export interface ITracker {
    announce: string;
    id: number;
    scrape: string;
    tier: number;
}
export interface ITrackerStat {
    announce: string;
    announceState: number;
    downloadCount: number;
    hasAnnounced: boolean;
    hasScraped: boolean;
    host: string;
    id: number;
    isBackup: boolean;
    lastAnnouncePeerCount: number;
    lastAnnounceResult: string;
    lastAnnounceStartTime: number;
    lastAnnounceSucceeded: boolean;
    lastAnnounceTime: number;
    lastAnnounceTimedOut: boolean;
    lastScrapeResult: string;
    lastScrapeStartTime: number;
    lastScrapeSucceeded: boolean;
    lastScrapeTime: number;
    lastScrapeTimedOut: number;
    leecherCount: number;
    nextAnnounceTime: number;
    nextScrapeTime: number;
    scrape: string;
    scrapeState: number;
    seederCount: number;
    tier: number;
}
export declare class Tracker implements Readonly<ITracker>, ISerializable<ITracker, Tracker> {
    [Symbol.toStringTag]: string;
    private _tracker;
    readonly announce: string;
    readonly id: number;
    readonly scrape: string;
    readonly tier: number;
    stats: ITrackerStat;
    serialize(): string;
    toJSON(): ITracker;
    deserialize(input: string | ITracker): Tracker;
}
