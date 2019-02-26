// pages/communityLogin/communityLogin.js
const adminLoginUrl = require('../../config.js').adminLoginUrl;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  formSubmit:function(e){
    var sessionkey = app.globalData.sessionkey;
    console.log(e.detail.value)
    wx.showLoading({
      title: 'login',
    })
    //将账号密码缓存到本地

    wx.request({
      url: adminLoginUrl,
      data:{
        account:e.detail.value.account,
        password:e.detail.value.password,
        sessionkey:sessionkey
      },
      success:function(res){
        console.log('登录回复：',res.data)
        if(res.data.code == 200){
          //账号 密码正确，可以登录
          //将账号密码缓存到本地
          var account = e.detail.value.account;
          var passwd = e.detail.value.password;
          wx.setStorageSync('adminaccount', account)
          wx.setStorageSync('adminpasswd', passwd)
          app.globalData.key = res.data.key;
          app.globalData.adminaccount = e.detail.account;
          var id = res.data.id;
          var profile = res.data.profile;
          var name = res.data.name;
          var account = e.detail.value.account;
          //跳转到权限界面
          console.log('跳转到权限界面。。。。')
          // wx.navigateTo({
          //   url: `../../pages/index/index?id=${id}&profile=${profile}&name=${name}&account=${account}`,
          // })
          //只能调用缓存到本地
          app.globalData.commadmin = `{"id":"${id}","profile":"${profile}","name":"${name}","account":"${account}"}`
          wx.setStorage({
            key: 'commadmin',
            data: `{"id":"${id}","profile":"${profile}","name":"${name}","account":"${account}"}`,
            success:function(){
              wx.navigateBack({})
            }
          })
          

        } else {
          wx.showModal({
            title: String(res.data.code),
            content: res.data.msg,
          })
        }
      },
      complete:function(){
        wx.hideLoading()
      }
      
    })
  },

  //转至忘记密码页
  changePassword: function (e) {
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: `../../pages/forgetPassword/forgetPassword?msg=请联系社联找回密码哦`,
    })
  },
  createaccount: function (e) {
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: `../../pages/forgetPassword/forgetPassword?msg=请联系社联注册账号哦`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var account = wx.getStorageSync('adminaccount')||""
    var passwd = wx.getStorageSync('adminpasswd')||""
    //console.log('账号密码',account,passwd)
    this.setData({
      account:account,
      passwd:passwd
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
    console.log('显示')
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