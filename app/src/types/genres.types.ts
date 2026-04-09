export interface Genre {
    ID: string;
    name: string;
    descr?: string | null;
    parent_ID?: number | null;
}