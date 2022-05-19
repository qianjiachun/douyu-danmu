"use strict";
function unescape(v) {
    if (!v)
        return "";
    return v.toString().replace(/@A/g, '@').replace(/@S/g, '/');
}
function deserialize(raw) {
    if (!raw)
        return "";
    if (raw.indexOf('//') !== -1) {
        return raw.split('//').filter(function (e) { return e !== ''; }).map(function (item) { return deserialize(item); });
    }
    if (raw.indexOf('@=') !== -1) {
        return raw.split('/').filter(function (e) { return e !== ''; }).reduce(function (o, s) {
            var _a = s.split('@='), k = _a[0], v = _a[1];
            o[k] = deserialize(unescape(v));
            return o;
        }, {});
    }
    else if (raw.indexOf('@A=') !== -1) {
        return deserialize(unescape(raw));
    }
    else {
        return raw.toString();
    }
}
module.exports = deserialize;
