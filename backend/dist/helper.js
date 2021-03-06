"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NF = exports.N = exports.formatDate = exports.offsetDate = exports.getDateText = exports.setlog = exports.dec = exports.enc = void 0;
require("dotenv").config();
const fs = require("fs");
const crypto = require("crypto");
const enc = (p) => {
    try {
        if (typeof p != 'string')
            p = p.toString();
        if (process.env.CRYPTOKEY !== undefined) {
            let secret = process.env.CRYPTOKEY;
            let iv = secret.substr(0, 16);
            let encryptor = crypto.createCipheriv('AES-256-CBC', secret, iv);
            let s = encryptor.update(p, 'utf8', 'hex') + encryptor.final('hex');
            /* let x = encBase58(s); */
            return encodeURIComponent(s);
        }
    }
    catch (err) { }
    return null;
};
exports.enc = enc;
const dec = (c) => {
    try {
        if (process.env.CRYPTOKEY !== undefined) {
            let secret = process.env.CRYPTOKEY;
            let iv = secret.substr(0, 16);
            let decryptor = crypto.createDecipheriv('AES-256-CBC', secret, iv);
            let s = decryptor.update(c, 'hex', 'utf8') + decryptor.final('utf8');
            return decodeURIComponent(s);
        }
    }
    catch (err) { }
    return null;
};
exports.dec = dec;
/* export const encNum = (num:number) => {
    let t = enc(num);
    if (t===null) return null;
    return `${t.slice(0,4)}-${t.slice(4,12)}-${t.slice(12,20)}-${t.slice(20,28)}-${t.slice(28)}`;
}
export const decNum = (enc:string) => {
    if (enc!=='') {
        return dec(enc.replace(/-/g,''));
    }
    return null;
} */
const setlog = (title = 'started', msg = null) => {
    const date = new Date();
    let y = date.getUTCFullYear();
    let m = date.getUTCMonth() + 1;
    let d = date.getUTCDate();
    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    let ss = date.getUTCSeconds();
    let datetext = [y, ('0' + m).slice(-2), ('0' + d).slice(-2)].join('-');
    let timetext = [('0' + hh).slice(-2), ('0' + mm).slice(-2), ('0' + ss).slice(-2)].join(':');
    if (msg instanceof Error)
        msg = msg.stack || msg.message;
    let bStart = 0;
    if (title === 'started') {
        bStart = 1;
        title = 'WebApp Started.';
    }
    if (msg)
        msg = msg.split(/\r\n|\r|\n/g).map(v => '\t' + v).join('');
    let text = `[${timetext}] ${title}\r\n${msg === null ? '' : msg + '\r\n'}`;
    fs.appendFileSync(__dirname + '/../logs/' + datetext + '.log', (bStart ? '\r\n\r\n\r\n' : '') + text);
    if (process.env.NODE_ENV === 'development')
        console.log(text);
};
exports.setlog = setlog;
const DLN = {
    "en": {
        prefixAgo: '',
        prefixFromNow: '',
        suffixAgo: "ago",
        suffixFromNow: "from now",
        inPast: 'any moment now',
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
    },
    "zh-cn": {
        prefixAgo: '',
        prefixFromNow: '',
        suffixAgo: "??????",
        suffixFromNow: "??????",
        seconds: "??????1??????",
        minute: "??????1??????",
        minutes: "%d??????",
        hour: "??????1??????",
        hours: "??????%d??????",
        day: "1???",
        days: "%d???",
        month: "??????1??????",
        months: "%d??????",
        year: "??????1???",
        years: "%d???",
        numbers: [],
        wordSeparator: ""
    },
    "zh-tw": {
        prefixAgo: '',
        prefixFromNow: '',
        suffixAgo: "??????",
        suffixFromNow: "??????",
        seconds: "??????1??????",
        minute: "??????1??????",
        minutes: "%d??????",
        hour: "??????1??????",
        hours: "%d??????",
        day: "??????1???",
        days: "%d???",
        month: "??????1??????",
        months: "%d??????",
        year: "??????1???",
        years: "%d???",
        wordSeparator: ""
    },
    ja: {
        prefixAgo: "",
        prefixFromNow: "?????????",
        suffixAgo: "???",
        suffixFromNow: "???",
        seconds: "1 ?????????",
        minute: "??? 1 ???",
        minutes: "%d ???",
        hour: "??? 1 ??????",
        hours: "??? %d ??????",
        day: "??? 1 ???",
        days: "??? %d ???",
        month: "??? 1 ??????",
        months: "??? %d ??????",
        year: "??? 1 ???",
        years: "??? %d ???",
        wordSeparator: ""
    },
    ko: {
        prefixAgo: '',
        prefixFromNow: '',
        suffixAgo: "???",
        suffixFromNow: "???",
        seconds: "1???",
        minute: "??? 1???",
        minutes: "%d???",
        hour: "??? 1??????",
        hours: "??? %d??????",
        day: "??????",
        days: "%d???",
        month: "??? 1??????",
        months: "%d??????",
        year: "??? 1???",
        years: "%d???",
        wordSeparator: " "
    }
};
const getDateText = (lang, value, isPast, unit) => {
    const ln = DLN[lang];
    if (unit == 'seconds')
        return ln.seconds;
    /* if(value>1) unit+='s'; */
    let s = '';
    if (!isPast && ln.prefixAgo)
        s += ln.prefixAgo + ln.wordSeparator;
    if (isPast && ln.prefixFromNow)
        s += ln.prefixFromNow + ln.wordSeparator;
    if (unit !== undefined) {
        const v = ln[unit];
        if (typeof v === 'string')
            s += v.replace('%d', value.toString());
    }
    if (!isPast && ln.suffixAgo)
        s += ln.wordSeparator + ln.suffixAgo;
    if (isPast && ln.suffixFromNow)
        s += ln.wordSeparator + ln.suffixFromNow;
    return s;
};
exports.getDateText = getDateText;
const offsetDate = (time, lang) => {
    if (!time)
        return '';
    let now = Date.now();
    let diff = Math.round((now - time) / 86400);
    let isPast = false;
    if (diff < 0) {
        diff = -diff;
        isPast = true;
    }
    let y = Math.floor(diff / 365);
    if (y)
        return exports.getDateText(lang, y, isPast, y === 1 ? 'year' : 'years');
    let m = Math.floor(diff / 31);
    if (m)
        return exports.getDateText(lang, m, isPast, m === 1 ? 'month' : 'months');
    if (diff == 0) {
        diff = now - time;
        if (diff < 0) {
            diff = -diff;
            isPast = true;
        }
        let h = Math.floor(diff / 3600);
        if (h)
            return exports.getDateText(lang, h, isPast, h === 1 ? 'hour' : 'hours');
        m = Math.floor(diff / 60);
        if (m)
            return exports.getDateText(lang, m, isPast, m === 1 ? 'minute' : 'minutes');
        return exports.getDateText(lang, 0, isPast, 'seconds');
    }
    return exports.getDateText(lang, diff, isPast, diff === 1 ? 'day' : 'days');
};
exports.offsetDate = offsetDate;
const formatDate = (time, dateOnly, offset = '+8.0') => {
    let iOffset = Number(offset);
    let date = time === undefined ? new Date(Date.now() * 1000 + (3600000 * iOffset)) : (typeof time === 'number' ? new Date(time * 1000 + (3600000 * iOffset)) : new Date(+time + (3600000 * iOffset)));
    let y = date.getUTCFullYear();
    let m = date.getUTCMonth() + 1;
    let d = date.getUTCDate();
    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    /* let ss=date.getUTCSeconds(); */
    let dt = ("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
    let tt = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2);
    if (dateOnly === 'smart') {
        let date2 = new Date(Date.now() * 1000 + (3600000 * iOffset));
        let y2 = date2.getUTCFullYear();
        let m2 = date2.getUTCMonth() + 1;
        let d2 = date2.getUTCDate();
        if (y == y2) {
            if (m != m2 || d != d2)
                return dt;
            return tt;
        }
        return y + '-' + dt;
    }
    return y + '-' + dt + (dateOnly === true ? "" : " " + tt);
};
exports.formatDate = formatDate;
const N = (v, p = 8) => Number(Number(v.toString().replace(/[^\d.]/g, '')).toFixed(p));
exports.N = N;
const NF = (num, p) => {
    if (p !== undefined)
        num = exports.N(num, p);
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
exports.NF = NF;
//# sourceMappingURL=helper.js.map