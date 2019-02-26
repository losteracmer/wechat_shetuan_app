// pages/changebri/changebri.js
const changecommUrl = require('../../config.js').changecommUrl
const host = require('../../config.js').host
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    text:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cgtype:options.cgtype,
      cgkey:options.cgkey,
      text: options.text,
      id: options.id,
      num: options.text.length,
      maxlen :parseInt(options.maxlen)
    })
    wx.setNavigationBarTitle({
      title: options.cgtype,
    })
  },
  input: function (e) {
    this.setData({
      text: e.detail.value,
      num: e.detail.cursor
    })
  },
  submit: function () {
    console.log('提交')
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;

    wx.request({
      url: changecommUrl + '/' + that.data.cgkey,
      data: {
        text: that.data.text,
        sessionkey: sessionkey,
        id: that.data.id,
        key: key
      },
      success: res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
            success: wx.navigateBack({})
          })
        } else {
          wx.showModal({
            title: res.data.code + '',
            content: res.data.msg || "服务器错误",
          })
        }
      },
      fail: err => {
        wx.showModal({
          title: '网络连接失败',
          content: '请检查网络连接',
        })
      },
      complete: () => { }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})