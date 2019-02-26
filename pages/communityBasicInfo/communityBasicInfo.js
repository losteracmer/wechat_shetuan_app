// pages/communityBasicInfo/communityBasicInfo.js
const getcommInfoUrl = require('../../config.js').getcommInfoUrl
const changecommUrl = require('../../config.js').changecommUrl
const host = require('../../config.js').host
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confocus: false,
    brifocus: false,
    conable: true,
    briable: true,
    commdata:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  changelogo: function () {
    console.log('点击changelogo');
    var avatar = this.data.commdata.profile;
    var id = this.data.commdata.id;
    wx.navigateTo({
      url: `../avatarUpload/index/index?avatar=${avatar}&id=${id}`,
    })
  },
  changecon: function () {
    console.log('点击changecon');
    var id = this.data.commdata.id;
    var text = this.data.commdata.contact;
    wx.navigateTo({
      url: `../change/change?id=${id}&text=${text}&cgtype=联系信息&cgkey=contact&maxlen=100`,
    })
  },
  changebri: function () {
    console.log('点击changebri');
    var id = this.data.commdata.id;
    var text = this.data.commdata.brief;
    wx.navigateTo({
      url: `../change/change?id=${id}&text=${text}&cgtype=社团简介&cgkey=brief&maxlen=1000`,
    })
  },
  //主要负责人
  changezyfzr:function(){
    console.log('点击  主要负责人');
    var id = this.data.commdata.id;
    var text = this.data.commdata.zyfzr;
    wx.navigateTo({
      url: `../change/change?id=${id}&text=${text}&cgtype=主要负责人&cgkey=zyfzr&maxlen=16`,
    })
  },
  //精品活动
  changejphd:function(){
    console.log('点击  精品活动');
    var id = this.data.commdata.id;
    var text = this.data.commdata.jphd;
    wx.navigateTo({
      url: `../change/change?id=${id}&text=${text}&cgtype=精品活动&cgkey=jphd&maxlen=128`,
    })
  },
  onLoad: function (options) {
    var that = this
    var commId = options.id;
    console.log('globalData:', app.globalData.sessionkey)
    var sessionkey = app.globalData.sessionkey;
    this.setData({
      id: commId
    })
    //加载社团信息
    wx.showLoading({
      title: 'loading...',
    })
    wx.request({
      url: getcommInfoUrl,
      data: {
        commId: commId,
        sessionkey: sessionkey
      },
      success: function (res) {
        console.log('getcommInfo->', res.data)
        res.data.profile = host+res.data.profile
        that.setData({
          commdata:res.data
          // name: res.data.name,
          // member: res.data.member,
          // like: res.data.like,
          // id: res.data.id,
          // kinds: res.data.kinds,
          // brief: res.data.brief,
          // //新增属性申请方式
          // contact: res.data.contact,
          // //新增属性判断是否关注
          // likeOrNot: res.data.likeOrNot,
          // //主要负责人
          // zyfzr:res.data.zyfzr
        })
        // console.log('图片地址:', that.data.profile)
      },
      complete: () => wx.hideLoading()
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