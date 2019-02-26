// pages/mymsg/mymsg.js

const changecommUrl = require('../../config.js').changecommUrl;
const host = require('../../config.js').host;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change:[],
    account:null,
    start: 0,
    add: 5,
    operate:['批准','拒绝']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      account:options.account,
      id:options.id
    })
    //请求些数据
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: changecommUrl+'/stchange',
      data:{
        operate: 'getlist',
        sessionkey: sessionkey,
        key: key,
        start: that.data.start,
        add: that.data.add,
        id:that.data.id
      },
      success:function(res){
        console.log('更改信息：',res.data)
        if(res.data.code == 200){
          if(res.data.change.length == 0){
            wx.showToast({
              icon:'none',
              title: '还没有信息哦qaq',
            })
          }
          for (var i = 0; i < res.data.change.length; i++) {
            res.data.change[i].profile = host + res.data.change[i].profile;
          }
          that.setData({
            issuper:res.data.issuper,
            change:res.data.change,
            start:res.data.change.length
          })
        } else{
          wx.showModal({
            title: res.data.code+"",
            content: res.data.msg,
          })
        }
      },
      fail:function(){
        wx.showModal({
          title: '网络',
          content: '请检查网络连接',
        })
      },
      complete:function(error){
        wx.hideLoading();
      }
    })
  },
  //提交审核信息
  changemsg:function(e){
    var that = this;
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var operate = that.data.operate[parseInt(e.detail.value)];
    var cgid = e.currentTarget.dataset.cgid;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: changecommUrl + '/stchange',
      data: {
        operate: operate,
        sessionkey: sessionkey,
        key: key,
        id: that.data.id,
        cgid:cgid
      },
      success: function (res) {
        console.log('shezhi 更改信息：', res.data)
        if (res.data.code == 200) {
          //及时跟新审核状态
          let aftchange = that.data.change;
          if(operate == '批准'){
            aftchange[index].cgstatus = 1;
          } else {
            aftchange[index].cgstatus = 0;
          }
          that.setData({
            change:aftchange
          })
          wx.showModal({
            showCancel:false,
            content: res.data.msg,
          })
        } else {
          wx.showModal({
            title: res.data.code + "",
            content: res.data.msg,
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '网络',
          content: '请检查网络连接',
        })
      },
      complete: function (error) {
        wx.hideLoading();
      }
    })
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, change = this.data.change;
    for (var i = 0, len = change.length; i < len; ++i) {
      if (change[i].cgid == id) {
        change[i].open = !change[i].open
      } else {
        change[i].open = false
      }
    }
    //console.log('更改后的change:',change)
    this.setData({
      change: change
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: '正在加载更多....'
    });
    wx.request({
      url: changecommUrl + '/stchange',
      data: {
        operate: 'getlist',
        sessionkey: sessionkey,
        key: key,
        start: that.data.start,
        add: that.data.add,
        id: that.data.id
      },
      success: function (res) {
        console.log('更改信息：', res.data)
        if (res.data.code = 200) {
          for (var i = 0; i < res.data.change.length; i++) {
            res.data.change[i].profile = host + res.data.change[i].profile;
          }
          var addcg = that.data.change.concat(res.data.change)
          that.setData({
            change: addcg,
            start:that.data.start+res.data.change.length
          })
        } else {
          wx.showModal({
            title: res.data.code + "",
            content: res.data.msg,
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '网络连接失败',
          content: '请检查网络连接',
        })
      },
      complete: function (error) {
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '修改信息'
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})