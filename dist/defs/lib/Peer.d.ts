export interface IPeersFrom {
    fromCache: number;
    fromDht: number;
    fromIncoming: number;
    fromLpd: number;
    fromLtep: number;
    fromPex: number;
    fromTracker: number;
}
export interface IPeer {
    address: string;
    clientName: string;
    clientIsChoked: boolean;
    clientIsInterested: boolean;
    flagStr: string;
    isDownloadingFrom: boolean;
    isEncrypted: boolean;
    isIncoming: boolean;
    isUploadingTo: boolean;
    isUTP: boolean;
    peerIsChoked: boolean;
    peerIsInterested: boolean;
    port: number;
    progress: number;
    rateToClient: number;
    rateToPeer: number;
}
