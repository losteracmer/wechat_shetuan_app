const searchcommUrl = require('../../config.js').searchcommUrl;
const host = require('../../config.js').host;
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch: false,
    inputValue: '',
    searchHistory:''
  },

  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
    if(e.detail.value.length == 0){
      //当用户清空所有输入后，隐藏search result  额，这个功能没法实现了。。。
      console.log('hidden result')
      this.setData({
        isSearch:false
      })
    }
  },
  delecthistory:function(){
    console.log('delect histroy')
    wx.removeStorageSync('search');
    this.setData({
      searchHistory:[]
    })
  },
  search: function() {
    var that = this
    var sessionkey = app.globalData.sessionkey;
    console.log('search!', this.data.inputValue)
    var text = this.data.inputValue;
    if (text.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '输入不能为空哦',
      })
    } else {
      //保存缓存
      var sh = wx.getStorageSync('search') || [];
      
      if(sh.includes(text)==false){
        sh.unshift(text)
        console.log('新缓存')
        wx.setStorageSync('search',sh) 
        
      }
      wx.showLoading({
        title: 'searching',
      })
      wx.request({
        url: searchcommUrl,

        data: {
          text: text,
          sessionkey: sessionkey
        },
        success: function(res) {
          console.log('搜 收到回复', res)
          if (res.data.comm)
            if(res.data.comm.length == 0){
              wx.showToast({
                title: '没找到呢...',
                icon:'none'
              })
            }
            //对图片链接地址做处理,加上host
            for (var i = 0; i < res.data.comm.length; i++) {
              res.data.comm[i].profile = host + res.data.comm[i].profile;
            }
          that.setData({
            comm: res.data.comm,
            isSearch:true
          })
        },
        fail: function(error) {
          wx.showModal({
            title: '网络连接失败',
            content: '请检查网络状态',
          })
        },
        complete:function(){
          wx.hideLoading();
        }
      })


    }
  },
  gotodetail: function (e) {
    console.log(e)
    var index = e.currentTarget.id * 1;
    console.log('index', index, typeof index);
    var commId = this.data.comm[index].id;
    wx.navigateTo({
      url: `../../pages/communityInfo/communityInfo?id=${commId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  putsh:function(res){
    console.log(res)
    this.setData({
      searchValue:res.currentTarget.dataset.sh,
      inputValue:res.currentTarget.dataset.sh
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var searchHistory = wx.getStorageSync('search') || [];
    console.log('缓存类型', typeof searchHistory)
    var shList = searchHistory
    console.log('缓存内容:',shList)
    this.setData({
      searchHistory:shList
    })
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