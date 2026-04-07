export interface Currency {
    ID: number;
    code: string;
    name: string;
    descr: string | null;
    symbol?: string;
    minorUnit?: string | null;
}