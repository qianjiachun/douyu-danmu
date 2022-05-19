declare class DouyuDanmu {
    private timer;
    private ws;
    /**
     *
     * @param rid Must be a real room id
     * @param msgHandler Function for receiving messages
     * @param closeHandler Callback function when the connection is closed
     */
    constructor(rid: string, msgHandler: IMsgHandler, closeHandler?: IErrorHandler);
    close(): void;
}
export = DouyuDanmu;
