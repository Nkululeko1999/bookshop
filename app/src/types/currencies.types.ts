export interface Currency {
    code: string;
    name: string;
    descr: string | null;
    symbol?: string;
    minorUnit?: string | null;
}