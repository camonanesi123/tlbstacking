"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const pager_1 = require("./pager");
const helper_1 = require("./helper");
/* export interface mysql.ConnectionConfig {
    host: string,
    port: string,
    user: string,
    password: string,
    database: string
} */
class Model {
    constructor(table, primaryKey = 'id') {
        this.table = table;
        this.primaryKey = primaryKey;
    }
    static connect(params) {
        return new Promise(resolve => {
            this.db = mysql.createConnection(params);
            this.db.connect((err) => {
                if (err) {
                    resolve(err);
                }
                else {
                    this.db.query('SET NAMES "utf8mb4"', (err, res) => {
                        this.db.query('SET @@SESSION.time_zone = "+00:00"', (err, res) => __awaiter(this, void 0, void 0, function* () {
                            resolve(true);
                        }));
                    });
                }
            });
        });
    }
    static raw(sql, params, cb) {
        this.db.query(sql, params, (err, res, fields) => {
            if (err) {
                cb(err, null);
            }
            else {
                let result = null;
                if (res) {
                    if (Array.isArray(res)) {
                        result = res.length ? res : null;
                    }
                    else if (res.affectedRows == 1 && res.insertId) {
                        result = res.insertId;
                    }
                    else if (res.affectedRows) {
                        result = res.affectedRows;
                    }
                }
                cb(null, result);
            }
        });
    }
    getFields(fields, noDefault = false) {
        if (fields)
            return fields.map(v => this.sanitize(v, 2)).join(',');
        return noDefault ? null : '*';
    }
    getWhere(query) {
        let where = "";
        for (let k in query) {
            let field = this.sanitize(k, 2);
            if (where)
                where += " AND ";
            if (k == '$or') {
                let kv = query[k];
                if (Array.isArray(kv)) {
                    where += '(' + kv.map(k => this.getWhere(k)).join(' OR ') + ')';
                }
                else {
                    new Error('[$or] Expected array but found ' + (typeof kv));
                }
            }
            else if (k == '$and') {
                let kv = query[k];
                if (Array.isArray(kv)) {
                    where += '(' + kv.map(k => this.getWhere(k)).join(' AND ') + ')';
                }
                else {
                    new Error('[$or] Expected array but found ' + (typeof kv));
                }
            }
            else if (query[k] && Array.isArray(query[k])) {
                where += field + " IN (" + query[k].map((v) => '"' + v + '"').join(',') + ")";
            }
            else if (typeof query[k] === 'object') {
                for (let k2 in query[k]) {
                    let value;
                    if (query[k][k2] !== null) {
                        if (!Array.isArray(query[k][k2])) {
                            if (k2 === '$lk') {
                                value = "'%" + this.sanitize(query[k][k2], 0) + "%'";
                            }
                            else {
                                value = this.sanitize(query[k][k2], 1);
                            }
                        }
                    }
                    switch (k2) {
                        case '$ne':
                            if (query[k][k2] == null) {
                                where += "NOT ISNULL(" + field + ")";
                            }
                            else {
                                where += field + " <> " + value;
                            }
                            break;
                        case '$gt':
                            where += field + ">" + value;
                            break;
                        case '$lt':
                            where += field + "<" + value;
                            break;
                        case '$bt':
                            let a = Number(query[k][k2][0]);
                            let b = Number(query[k][k2][1]);
                            if (a && b) {
                                where += field + " BETWEEN '" + a + "' AND '" + b + "'";
                            }
                            else {
                                new Error("$bt arg error");
                            }
                            break;
                        case '$in':
                            let vals = '';
                            query[k][k2].map((v) => {
                                if (vals)
                                    vals += ',';
                                vals += '"' + v + '"';
                            });
                            where += field + " IN (" + vals + ")";
                            break;
                        case '$lk':
                            where += field + " LIKE " + value;
                            break;
                        case '$rg':
                            where += field + " REGEXP " + value;
                            break;
                    }
                }
            }
            else {
                if (query[k] == null) {
                    where += "ISNULL(" + field + ")";
                }
                else {
                    let value = this.sanitize(query[k], 1);
                    where += field + "=" + value;
                }
            }
        }
        return where;
    }
    getOrder(order) {
        let orderBy = "";
        if (order) {
            if (order === 'rand')
                return 'RAND()';
            for (let k in order) {
                if (orderBy)
                    orderBy += ",";
                orderBy += this.sanitize(k, 2) + (order[k] == 1 ? '' : ' DESC');
            }
        }
        return orderBy;
    }
    find(query = null, order = null, fields = null, paging = null, pagetype = null) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let where = query && this.getWhere(query);
            let orderBy = order && this.getOrder(order);
            if (!fields)
                fields = '*';
            if (paging) {
                if (paging.p !== undefined || paging.url !== undefined) {
                    let limit = paging.limit || 20;
                    let count = 0, page = 0;
                    if (paging.p !== null) {
                        try {
                            const raw = helper_1.dec(paging.p);
                            if (raw) {
                                const x = raw.split('.');
                                page = Number(x[0]);
                                count = Number(x[1]);
                            }
                        }
                        catch (e) { }
                    }
                    if (count === 0) {
                        let res = yield this.count('*', query); // await Model.raw("SELECT COUNT(*) c FROM `"+this.table+"`"+(where ? ' WHERE '+where : ''),[], (err,res) => {
                        if (!isNaN(res))
                            count = res;
                    }
                    let total = Math.ceil(count / limit);
                    if (page > total)
                        page = total;
                    if (page < 1)
                        page = 1;
                    let start = (page - 1) * limit;
                    Model.raw("SELECT " + fields + " FROM `" + this.table + "`" + (where ? ' WHERE ' + where : '') + (orderBy ? ' ORDER BY ' + orderBy : '') + ' LIMIT ' + start + ',' + limit, [], (err, res) => {
                        if (res) {
                            /* if(pagetype==='prevnext') {
                                
                                resolve({data: res,prevpager:()=>pager(page,total,paging.req,'prev'),nextpager:()=>pager(page,total,paging.req,'next')});
                            } */
                            res.__proto__.paging = { page, count, total, limit };
                            res.__proto__.pager = () => pager_1.default(page, total, count, paging.url, '');
                            resolve(res);
                        }
                        else {
                            resolve(null);
                        }
                    });
                }
                else {
                    let limit = paging.limit || 20;
                    let offset = paging.offset || 0;
                    Model.raw("SELECT " + fields + " FROM `" + this.table + "`" + (where ? ' WHERE ' + where : '') + (orderBy ? ' ORDER BY ' + orderBy : '') + ' LIMIT ' + offset + ',' + limit, [], (err, res) => {
                        if (res) {
                            resolve(res);
                        }
                        else {
                            resolve(null);
                        }
                    });
                }
            }
            else {
                Model.raw("SELECT " + fields + " FROM `" + this.table + "`" + (where ? ' WHERE ' + where : '') + (orderBy ? ' ORDER BY ' + orderBy : ''), [], (err, res) => {
                    if (res) {
                        resolve(res);
                    }
                    else {
                        resolve(null);
                    }
                });
            }
        }));
    }
    ;
    findOne(query, order, fields) {
        return new Promise(resolve => {
            let where;
            if (typeof query === 'string' || typeof query === 'number') {
                where = "`" + this.primaryKey + "`='" + query + "'";
            }
            else {
                where = this.getWhere(query);
            }
            let orderBy = this.getOrder(order);
            if (!fields)
                fields = '*';
            Model.raw("SELECT " + fields + " FROM `" + this.table + "`" + (where ? ' WHERE ' + where : '') + (orderBy ? ' ORDER BY ' + orderBy : '') + ' LIMIT 1', [], (err, res) => {
                if (res && Array.isArray(res)) {
                    resolve(res[0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    update(query, data) {
        return new Promise(resolve => {
            let where;
            if (typeof query === 'string' || typeof query === 'number') {
                where = "`" + this.primaryKey + "`='" + query + "'";
            }
            else {
                where = this.getWhere(query);
            }
            let fields = "", values = [];
            for (let k in data) {
                if (fields)
                    fields += ",";
                let field = this.sanitize(k, 2);
                if (data[k] && typeof data[k] === 'object' && data[k].constructor === Object) {
                    for (let k2 in data[k]) {
                        switch (k2) {
                            case '$ad':
                                fields += field + "=" + field + "+?";
                                break;
                            case '$sb':
                                fields += field + "=" + field + "-?";
                                break;
                            case '$ml':
                                fields += field + "=" + field + "*?";
                                break;
                            case '$dv':
                                fields += field + "=" + field + "/?";
                                break;
                        }
                        values.push(data[k][k2]);
                    }
                }
                else {
                    if (data[k] === null) {
                        fields += field + "=NULL";
                    }
                    else {
                        fields += field + "=?";
                        values.push(data[k]);
                    }
                }
            }
            Model.raw("UPDATE `" + this.table + "` SET " + fields + (where ? ' WHERE ' + where : ''), values, (err, res) => {
                if (res) {
                    resolve(res);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    deleteAll() {
        return new Promise(resolve => {
            Model.raw("DELETE FROM `" + this.table + "`", [], (err, res) => {
                if (res) {
                    resolve(res);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    delete(query) {
        return new Promise(resolve => {
            let where;
            if (typeof query === 'string' || typeof query === 'number') {
                where = "`" + this.primaryKey + "`='" + query + "'";
            }
            else {
                where = this.getWhere(query);
            }
            Model.raw("DELETE FROM `" + this.table + "` " + (where ? ' WHERE ' + where : ''), [], (err, res) => {
                if (res) {
                    resolve(res);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    insert(data, ignoreDup = true) {
        return new Promise(resolve => {
            let fields = "", values = "", params = [], line = "";
            data = Array.isArray(data) ? data : [data];
            data.map((v, i) => {
                line = "";
                for (let k in v) {
                    if (i == 0) {
                        if (fields)
                            fields += ",";
                        fields += this.sanitize(k, 2);
                    }
                    if (line)
                        line += ",";
                    line += '?';
                    params.push(v[k]);
                }
                if (values)
                    values += ",";
                values += "(" + line + ")";
            });
            Model.raw("INSERT " + (ignoreDup ? 'IGNORE' : '') + " INTO `" + this.table + "`(" + fields + ") VALUES " + values, params, (err, res) => {
                if (res) {
                    resolve(res);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    insertOrUpdate(data) {
        return new Promise(resolve => {
            let fields = "", values = "", params = [], line = "", updates = "";
            data = Array.isArray(data) ? data : [data];
            data.map((v, i) => {
                line = "";
                for (let k in v) {
                    if (i == 0) {
                        if (fields)
                            fields += ",";
                        let field = this.sanitize(k, 2);
                        fields += field;
                        if (k != this.primaryKey) {
                            if (updates)
                                updates += ",";
                            updates += field + '=VALUES(' + field + ')';
                        }
                    }
                    if (line)
                        line += ",";
                    line += '?';
                    params.push(v[k]);
                }
                if (values)
                    values += ",";
                values += "(" + line + ")";
            });
            Model.raw("INSERT INTO `" + this.table + "`(" + fields + ") VALUES " + values + ' ON DUPLICATE KEY UPDATE ' + updates, params, (err, res) => {
                if (res !== null) {
                    resolve(res);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    max(field, query = null) {
        return new Promise(resolve => {
            let where = query ? this.getWhere(query) : null;
            Model.raw("SELECT MAX(`" + field + "`) m FROM `" + this.table + "`" + (where ? ' WHERE ' + where : ''), [], (err, res) => {
                if (res && Array.isArray(res)) {
                    resolve(res[0].m || 0);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    min(field, query = null) {
        return new Promise(resolve => {
            let where = query ? this.getWhere(query) : null;
            Model.raw("SELECT min(`" + field + "`) m FROM `" + this.table + "`" + (where ? ' WHERE ' + where : ''), [], (err, res) => {
                if (res && Array.isArray(res)) {
                    resolve(res[0].m || 0);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    sum(field, query = null) {
        return new Promise(resolve => {
            let where = query ? this.getWhere(query) : null;
            Model.raw("SELECT sum(`" + field + "`) m FROM `" + this.table + "`" + (where ? ' WHERE ' + where : ''), [], (err, res) => {
                if (res && Array.isArray(res)) {
                    resolve(res[0].m || 0);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    count(field, query = null) {
        return new Promise(resolve => {
            if (query === null) {
                if (field !== null)
                    query = field;
                field = '*';
            }
            let where = query ? this.getWhere(query) : null;
            Model.raw("SELECT count(" + field + ") m FROM `" + this.table + "`" + (where ? ' WHERE ' + where : ''), [], (err, res) => {
                if (res && Array.isArray(res)) {
                    resolve(res[0].m || 0);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    sanitize(v, type = 0) {
        if (v === null)
            return 'NULL';
        if (typeof v == 'string')
            v = v.replace(/'/g, '').replace(/\\/g, '');
        switch (type) {
            case 1: // value
                if (typeof v === 'string' && v.indexOf('`') == -1 && v.indexOf('(') == -1)
                    return `'${v}'`;
                break;
            case 2: // field
                if (v.indexOf('`') == -1 && v.indexOf('(') == -1)
                    return '`' + v + '`';
                break;
        }
        return v;
    }
}
exports.default = Model;
//# sourceMappingURL=model.js.map