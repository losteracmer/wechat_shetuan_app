//index.js
//获取应用实例
const app = getApp()
const setuserInfoUrl = require('../../config.js').setuserInfoUrl;
const host = require('../../config.js').host;
Page({
  data: {
    page: 1,
    items: ["河南大学社团一览表","信息反馈", "社团登陆"],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    communityitems: ["社团信息", "更多操作", "管理动态","修改密码","消息提醒"],
    //社团头像
    profile: "../../image/waiting.gif",
    //社团名称
    name: "acm"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    console.log('index加载信息：', options)
  },

  onShow: function() {
    var that = this
    var commadmin = app.globalData.commadmin
    if (commadmin) {
      let adminJson = JSON.parse(commadmin)
      //说明社团已经登录
      //console.log('说明社团已经登录')
      that.setData({
        page: 2,
        id: adminJson.id,
        profile: host + adminJson.profile,
        name: adminJson.name,
        account: adminJson.account
      })
    }

  },

  onLoad: function() {
    //console.log('-------',this.data.hasUserInfo,this.data.canIUse)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      //把用户信息同步到服务器
      this.SyncUserInfo(app.globalData.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //把用户信息同步到服务器
        this.SyncUserInfo(res.userInfo)
      }
      
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          //把用户信息同步到服务器
          this.SyncUserInfo(res.userInfo)
        }
      })
      
    }
  },
  //退出登录
  logout: function() {
    app.globalData.commadmin = null;
    this.setData({
      page: 1
    })
  },

  toPage0: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `../../pages/communityTable/communityTable`,
    })
  },
  toPage1: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `../../pages/myInfo/myInfo`,
    })
  },
  toPage2: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `../../pages/communityLogin/communityLogin`,
    })
  },


  //转至社团基本信息页
  toCommPage0: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `../../pages/communityBasicInfo/communityBasicInfo?id=${this.data.id}`,
    })
  },
  //转至发布动态页
  toCommPage1: function(e) {
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: `../../pages/sendActivity/sendActivity?id=${that.data.id}`,
    })
  },
  //转至我的动态页
  toCommPage2: function (e) {
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: `../../pages/myActivity/myActivity?id=${that.data.id}&account=${that.data.account}`,
    })
  },
  //转至修改密码页
  toCommPage3: function(e) {
    var that = this;
    console.log(e)
    var account = that.data.account;
    wx.navigateTo({
      url: `../../pages/changePassword/changePassword?account=${account}`,
    })
  },
  toCommPage4: function (e) {
    var that = this;
    console.log(e)
    var account = that.data.account;
    wx.navigateTo({
      url: `../../pages/mymsg/mymsg?id=${that.data.id}&account=${that.data.account}`,
    })
  },
  getUserInfo: function(e) {

    console.log('userInfo:', e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //把用户信息同步到服务器
    this.SyncUserInfo(e.detail.userInfo)
  },
  SyncUserInfo:function(userInfo){
    var sessionkey = app.globalData.sessionkey;
    wx: wx.request({
      url: setuserInfoUrl,
      data: {
        sessionkey: sessionkey,
        userInfo: userInfo
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
})

//同步用户信息方法
