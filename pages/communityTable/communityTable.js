// pages/communityTable/communityTable.js
const commtableUrl = require('../../config.js').commtableUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commtable:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: commtableUrl,
      data:{},
      success:function(res){
        console.log('社团一览表',res.data)
        if(res.data.code == 200){
          that.setData({
            commtable:res.data.commtable
          })
        } else {
          wx.showModal({
            
            content: res.data.msg,
          })
        }
      },
      fail:function(err){
        wx.showModal({
          title: '获取列表失败',
          content: '请检查网络连接',
        })
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  },

  gotodetail: function (e) {
    console.log(e)
    var commId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/communityInfo/communityInfo?id=${commId}`,
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