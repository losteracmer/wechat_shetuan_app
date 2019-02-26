// pages/communityManager/communityManager.js
const host = require('../../config.js').host;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ["社团信息", "发布动态","修改密码"],
    //社团头像
    profile:"../../image/ACM.jpg",
    //社团名称
    name:"acm"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('社团管理跳转信息：',options)
    //这里还是要处理一下图片的链接问题
    var imageUrl = host+options.profile; 
    this.setData({
      id : options.id,
      profile : imageUrl,
      name : options.name,
      account:options.account
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