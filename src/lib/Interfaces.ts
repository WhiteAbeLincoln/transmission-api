export interface IMutable<T> {
    update(): Promise<T>;
}

export interface ISerializable<X, T> {
    deserialize(input: string | X): T;
    serialize(): string;
    toJSON(): X;
}

// TODO: change this once we have type subtraction or rest type
export type Omit<A, B extends keyof A> = A & {
    [P in keyof A & B]: void
} 