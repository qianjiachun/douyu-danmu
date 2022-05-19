"use strict";
var DouyuDanmu = /** @class */ (function () {
    /**
     *
     * @param rid Must be a real room id
     * @param msgHandler Function for receiving messages
     * @param closeHandler Callback function when the connection is closed
     */
    function DouyuDanmu(rid, msgHandler, closeHandler) {
        var _this = this;
        this.timer = 0;
        this.ws = new WebSocket("wss://danmuproxy.douyu.com:850" + String(getRandom(2, 5)));
        this.ws.onopen = function () {
            _this.ws.send(WebSocket_Packet("type@=loginreq/roomid@=" + rid));
            _this.ws.send(WebSocket_Packet("type@=joingroup/rid@=" + rid + "/gid@=-9999/"));
            _this.timer = setInterval(function () {
                _this.ws.send(WebSocket_Packet("type@=mrkl/"));
            }, 40000);
        };
        this.ws.onerror = function (err) {
            closeHandler && closeHandler(err);
        };
        this.ws.onclose = function (err) {
            closeHandler && closeHandler(err);
        };
        this.ws.onmessage = function (e) {
            var reader = new FileReader();
            reader.onload = function () {
                var arr = [];
                if (reader) {
                    arr = String(reader.result).split("\0"); // 分包
                }
                reader = null;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].length > 12) {
                        // 过滤第一条和心跳包
                        msgHandler(arr[i]);
                    }
                }
            };
            reader.readAsText(e.data);
        };
    }
    DouyuDanmu.prototype.close = function () {
        clearInterval(this.timer);
        this.ws.close();
    };
    return DouyuDanmu;
}());
function WebSocket_Packet(str) {
    var MSG_TYPE = 689;
    var bytesArr = stringToByte(str);
    var buffer = new Uint8Array(bytesArr.length + 4 + 4 + 2 + 1 + 1 + 1);
    var p_content = new Uint8Array(bytesArr.length); // 消息内容
    for (var i = 0; i < p_content.length; i++) {
        p_content[i] = bytesArr[i];
    }
    var p_length = new Uint32Array([bytesArr.length + 4 + 2 + 1 + 1 + 1]); // 消息长度
    var p_type = new Uint32Array([MSG_TYPE]); // 消息类型
    buffer.set(new Uint8Array(p_length.buffer), 0);
    buffer.set(new Uint8Array(p_length.buffer), 4);
    buffer.set(new Uint8Array(p_type.buffer), 8);
    buffer.set(p_content, 12);
    return buffer;
}
function stringToByte(str) {
    // eslint-disable-next-line no-array-constructor
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = String(str).charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }
        else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }
        else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        }
        else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
module.exports = DouyuDanmu;
