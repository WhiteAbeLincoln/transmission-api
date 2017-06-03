export abstract class CommunicationBase {
    arguments: {[key:string]:any};
    tag?: number;
}

export class TransmissionResponse extends CommunicationBase {
    result: string;
}

export class TransmissionRequest extends CommunicationBase {
    method: string;
    constructor(method: string, args: {[key:string]:any}) {
        super();
        this.method = method;
        this.arguments = args;
    }
}