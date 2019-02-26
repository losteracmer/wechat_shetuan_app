//app.js
const loginUrl = require('./config.js').loginUrl;
const setuserInfoUrl = require('./config.js').setuserInfoUrl;
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('user登录',res)
        wx.request({
          url: loginUrl,
          data:{
            code:res.code
          },
          success:function(res){
            console.log('login->',res)
            if(res.data.code == 200)
            that.globalData.sessionkey = res.data.sessionkey;
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已授权，不弹窗')
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('获取用户Info:',this.globalData.userInfo)
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
                //同步用户信息infor
                var sessionkey = that.globalData.sessionkey;
                wx: wx.request({
                  url: setuserInfoUrl,
                  data: {
                    sessionkey: sessionkey,
                    userInfo: that.globalData.userInfo
                  },
                  success: function (res) {
                    if (res.data.code == 200) {
                      console.log('sync user info success!~')
                    } else if (res.data.code == 404) {
                      wx.showModal({
                        title: '同步信息错误',
                        content: res.data.errMsg,
                      })
                    }
                  },
                  fail: function (res) {
                    wx.showModal({
                      title: '网络连接失败',
                      content: '请检查网络状态',
                    })
                  },
                  complete: function (res) { },
                })
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    sessionkey:null
  }
})