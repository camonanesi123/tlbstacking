"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_1 = require("./page");
const pages = new page_1.default();
const router = express_1.Router();
router.get('/account', pages.account.bind(pages));
exports.default = router;
//# sourceMappingURL=routes.js.map