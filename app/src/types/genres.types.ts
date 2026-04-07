export interface Genre {
    ID: number;
    name: string;
    descr?: string | null;
    parent_ID?: number | null;
}