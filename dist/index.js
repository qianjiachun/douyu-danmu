"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var websocket_1 = __importDefault(require("./websocket"));
var stt_1 = __importDefault(require("./stt"));
module.exports = {
    DouyuDanmu: websocket_1.default,
    deserialize: stt_1.default
};
