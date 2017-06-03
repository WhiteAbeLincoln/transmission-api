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

export class Tracker implements Readonly<ITracker>, ISerializable<ITracker, Tracker> {
    [Symbol.toStringTag] = "Tracker";

    private _tracker: ITracker;

    get announce(): string { return this._tracker.announce };
    get id(): number { return this._tracker.id };
    get scrape(): string { return this._tracker.scrape };
    get tier(): number { return this._tracker.tier };

    stats: ITrackerStat;

    serialize(): string {
        return JSON.stringify(this);
    }

    toJSON(): ITracker {
        return this._tracker;
    }

    deserialize(input: string | ITracker): Tracker {
        if (typeof input === "string")
            input = <ITracker>JSON.parse(input);

        this._tracker = Object.assign({}, this._tracker, input);

        return this;
    }
}