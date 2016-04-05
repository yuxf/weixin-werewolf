var express = require('express');
var wechat = require('./lib/wechat');

var log = require('debug')('weixin-werewolf');

// 启动服务
var app = express();

var config = {
  token: 'feiyuitravel',
  appid: 'wx5d34f7a9cb77d517',
  encodingAESKey: '3GyljhUVInXIcHR0KmIXX30sazb3SrgBNnBQ4RSLM5W'
};

app.use(express.query());
app.use('/', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.MsgType === 'device_text') {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  } else if (message.MsgType === 'device_event') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    res.reply([
      {
        title: 'freedom',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));

// 在环境变量提供的 $PORT 或 3000 端口监听
var port = process.env.PORT || 3000;
app.listen(port, function(){
log("Listening on %s", port);
});

// 微信接口地址只允许服务放在 80 端口
// 所以需要做一层 proxy
app.enable('trust proxy');
