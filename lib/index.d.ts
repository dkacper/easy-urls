export declare type URLParams = Record<string, string | number | undefined>;
export declare type URLQuery = Record<string, string>;
export interface URLOptions {
    params?: URLParams;
    query?: URLQuery;
}
export declare function resolveParams<TParams extends URLParams>(path: string, params: TParams): string;
export declare function resolveQuery<TQuery extends URLQuery>(url: string, query: TQuery): string;
export declare function composeUrl(path: string, options: URLOptions): string;
export declare function matchUrl(path?: string, pathname?: string): boolean;
