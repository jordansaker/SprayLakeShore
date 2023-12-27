"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.send('Express + Typescript Server + Postgres');
});
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
    db_1.default.runMigrations();
});
