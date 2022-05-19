function unescape(v: string): string {
    if (!v) return "";
    return v.toString().replace(/@A/g, '@').replace(/@S/g, '/');
}

function deserialize<T>(raw: string): T | string | unknown {
    if(!raw) return "";
    if (raw.indexOf('//') !== -1) {
        return raw.split('//').filter(e => e !== '').map((item) => deserialize(item))
    }
    if (raw.indexOf('@=') !== -1) {
        return raw.split('/').filter(e => e !== '').reduce((o: any, s) => {
            const [k, v] = s.split('@=')
            o[k] = deserialize(unescape(v))
            return o
        }, {})
    } else if (raw.indexOf('@A=') !== -1) {
        return deserialize(unescape(raw))
    } else {
        return raw.toString()
    }
}

export = deserialize;