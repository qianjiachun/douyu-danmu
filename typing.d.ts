/**
 * @param {string} data Message from douyu websocket
 */
type IMsgHandler = (data: string) => void;

/**
 * @param {any} error Error from websocket
 */
type IErrorHandler = (error: any) => void;

class IDouyuDanmu {
    constructor(rid: string, msgHandler: IMsgHandler, closeHandler?: IErrorHandler);
    close(): void;
}