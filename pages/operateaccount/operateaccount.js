// pages/operateaccount/operateaccount.js
const app = getApp()
const operateaccount = require('../../config.js').operateaccount;
const host = require('../../config.js').host;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'00000',
    commname:''
  },

  formSubmit:function(e){
    console.log(e)
    var that = this;
    var account = e.detail.value.account;
    var commname = e.detail.value.commname;
    var password = e.detail.value.password;
    var xiaoqu = e.detail.value.xiaoqu?"金明":"明伦";
    wx.request({
      url: operateaccount,
      data:{
        account:account,
        commname:commname,
        kind:password,
        xiaoqu:xiaoqu
      },
      success:function(res){
        if(res.data.code == 200){
          wx.showToast({
            title: res.data.msg,
          })
          let acint = parseInt(account);
          that.setData({
            account:"00000"+(acint+1),
            commname:''
          })
        } else {
          wx.showModal({
            title: res.data.code+"",
            content: res.data.msg+"",
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  formReset:function(){
    this.setData({
      account:'00000'
    })
  },
  onLoad: function (options) {

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