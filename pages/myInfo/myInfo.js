// pages/myInfo/myInfo.js
const getupdatemsg = require('../../config.js').getupdatemsg;
const host = require('../../config.js').host;
const submitmsg = require('../../config.js').submitmsg;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  kindToggle: function (e) {
    var id = e.currentTarget.id, updatemsg = this.data.updatemsg;

    updatemsg.open = !updatemsg.open
    this.setData({
      updatemsg: updatemsg
    });
  },


  submit: function(res) {
    console.log(res)
    var text = res.detail.value.text;
    var sessionkey = app.globalData.sessionkey;
    wx.request({
      url: submitmsg,
      data: {
        text: text,
        sessionkey: sessionkey
      },
      success: function(res) {
        if (res.data.code == 200) {
          wx.navigateBack({})
          wx.showToast({
            title: res.data.msg,
          })
        } else {
          wx.showModal({
            title: res.data.code + '',
            content: res.data.msg,
          })
        }
      },
      fail: function(err) {
        wx.showModal({
          title: '提交失败',
          content: '请稍后重试',
        })
      }
    })

  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: getupdatemsg,
      data:{},
      success:function(res){
        if(res.data.code == 200){
          that.setData({
            updatemsg:res.data.updatemsg
          })
        }
      },
      fail:function(){

      },
      complete:function(){
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})