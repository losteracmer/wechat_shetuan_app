// pages/changePassword/changePassword.js
const adminChangepwUrl = require('../../config.js').adminChangepwUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  formSubmit:function(res){
    var that = this;
    var account = that.data.account;
    console.log(res)
    if(res.detail.value.newpw1 != res.detail.value.newpw2){
      wx.showModal({
        title: "",
        content: '两次密码输入不一致',
        showCancel:false
      })
    } else{
      wx.request({
        url: adminChangepwUrl,
        data:{
          account:account,
          password:res.detail.value.oldpw,
          newpassword:res.detail.value.newpw1
        },
        success:function(res){
          if(res.data.code == 200){
            wx.showModal({
              content: res.data.msg,
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  //console.log('用户点击确定')
                  wx.navigateBack({})
                } else if (res.cancel) {
                  //console.log('用户点击取消')
                }
              }
            })
            
          } else {
            wx.showModal({
              content: res.data.msg
            })
          }
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.account = options.account;
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