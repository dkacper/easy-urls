// import Route from 'route-parser';
// import queryString from 'query-string';
export function resolveParams(path, params) {
    return '';
    // const route = new Route<TParams>(path);
    // const url = route.reverse(params);
    // return url || '';
}
;
export function resolveQuery(url, query) {
    return '';
    // return query ? `${url}?${queryString.stringify(query)}` : url;
}
;
export function composeUrl(path, options) {
    var query = options.query, _a = options.params, params = _a === void 0 ? {} : _a;
    var url = resolveParams(path, params);
    if (query) {
        url = resolveQuery(url, query);
    }
    return url;
}
;
export function matchUrl(path, pathname) {
    if (!path || !pathname) {
        return false;
    }
    return false;
    // const route = new Route(path);
    // return route.match(pathname);
}
;
