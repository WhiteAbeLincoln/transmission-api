export declare abstract class CommunicationBase {
    arguments: {
        [key: string]: any;
    };
    tag?: number;
}
export declare class TransmissionResponse extends CommunicationBase {
    result: string;
}
export declare class TransmissionRequest extends CommunicationBase {
    method: string;
    constructor(method: string, args: {
        [key: string]: any;
    });
}
