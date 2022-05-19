## douyu-danmu-ws
> 用于接收与反序列化斗鱼的弹幕

### Features
1. 支持TypeScript
2. 自动负载均衡
3. 自动TCP分包
4. 支持反序列化

### Usage
```
let ws = new DouyuDanmu(roomId, (data) => {
    let obj = deserialize(data);
    console.log(obj);
}, (err) => {});
```