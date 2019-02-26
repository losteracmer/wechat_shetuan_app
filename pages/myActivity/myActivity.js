const changeactivities = require('../../config.js').changeactivities;
const host = require('../../config.js').host;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commid: '',
    operate: ['删除', '展示'],
    start: 0,
    add: 4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        commid: options.id,
        account: options.account
      })
    } else {
      //测试用的数据#####################
      console.log('没有数据，测试数据启动')
      app.globalData.key = 'sst';
      app.globalData.sessionkey = 'pC2xL2+s2wrYEj/TGm/Tjg==';
      this.setData({
        commid: '00000001',
        account: 'superadmin'
      })
    }
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: changeactivities,
      data: {
        operate: 'operate',
        sessionkey: sessionkey,
        key: key,
        id:that.data.commid
      },
      success: function(res) {
        console.log('operate结果;', res.data)
        if (res.data.code == 200) {
          that.setData({
            operate: res.data.operate
          })
        } else {
          wx.showModal({
            title: res.data.code + "",
            content: res.data.msg,
          })
        }
      },
      fail: function(err) {
        wx.showModal({
          title: '网络链接失败',
          content: '请检查网络状态',
        })
      },
      complete:function(){
        wx.hideLoading();
      }

    })
    //请求活动列表############################
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;
    wx.showLoading({
      title: '加载活动...',
    })
    wx.request({
      url: changeactivities,
      data: {
        operate:'getaclist',
        start: that.data.start,
        add: that.data.add,
        sessionkey: sessionkey,
        id:that.data.commid,
        key:key
      },
      success: function (res) {
        console.log('管理活动列表收到回复：', res);
        //要对立面的图片进行处理
        if (res.data.code == 200) {
          if (res.data.activities.length == 0) {
            wx.showToast({
              title: '无可用内容',
              icon: 'none'
            })
          }
          for (var i = 0; i < res.data.activities.length; i++) {
            res.data.activities[i].profile = host + res.data.activities[i].profile;
            for (var j = 0; j < res.data.activities[i].images.length; j++) {
              res.data.activities[i].images[j] = host + res.data.activities[i].images[j];
            }

          }
          console.log('处理后的活动列表：', res.data)
          that.setData({
            activities: res.data.activities,
            start: that.data.start + res.data.activities.length
          })
        } else {
          wx.showModal({
            title: res.data.code + "",
            content: res.data.msg,
          })
        }

      },
      fail:function(error){
        wx.showModal({
          title: '网络错误',
          content: '请检查网络连接',
        })
      },
      complete:function(){
        wx.hideLoading();
      }
    })

  },

  previewImage: function (e) {
    console.log('显示大图', e)
    wx.previewImage({
      urls: e.currentTarget.dataset.list,
      current: e.currentTarget.dataset.src
    })
  },

  //跳转社团详情页
  gotodetail: function (e) {
    //var commId = none;//待补充
    console.log('点击社团头像', e)
    let commId = e.currentTarget.dataset.commid
    wx.navigateTo({
      url: `../../pages/communityInfo/communityInfo?id=${commId}`,
    })
  },

  changeactivities: function(res) {
    console.log('change ac :', res);
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;
    var hdid = res.currentTarget.dataset.hdid;
    //事件处理机制
    var index = res.currentTarget.dataset.index;
    var operate =that.data.operate[parseInt( res.detail.value)];
    wx.showLoading({
      title: 'loading...',
    })
    wx.request({
      url: changeactivities,
      data:{
        operate:operate,
        sessionkey: sessionkey,
        key: key,
        id: that.data.commid,
        hdid:hdid
      },
      success: function(res){
        if(res.data.code = 200){
          let acAfter = that.data.activities;
          acAfter[index].hdstatus = 2;
          if(operate == '删除'){
            that.setData({
              activities: acAfter
            })
          }
          if(operate == '展示'){
            let acAfter = that.data.activities;
            acAfter[index].hdstatus = 1;
            that.setData({
              activities:acAfter
            })
          }
          if (operate == '停止展示') {
            let acAfter = that.data.activities;
            acAfter[index].hdstatus = 0;
            that.setData({
              activities: acAfter
            })
          }
          
          wx.showModal({
            content: res.data.msg,
            showCancel:false
          })

        }else {
          wx.showModal({
            title: res.data.code +"",
            content: res.data.msg,
          })
        }
      },
      fail:function(){
        wx.showModal({
          title: '网络连接失败',
          content: '请检查网络连接',
        })
      },
      complete :function(){
        wx.hideLoading();
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
    //触底再次请求活动列表############################
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: '正在加载更多....'
    });
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var key = app.globalData.key;
    wx.request({
      url: changeactivities,
      data: {
        operate: 'getaclist',
        start: that.data.start,
        add: that.data.add,
        sessionkey: sessionkey,
        id: that.data.commid,
        key: key
      },
      success: function (res) {
        console.log('管理活动列表收到回复：', res);
        //要对立面的图片进行处理
        if (res.data.code == 200) {
          if (res.data.activities.length == 0) {
            wx.showToast({
              title: '无更多内容',
              icon: 'none'
            })
          }
          for (var i = 0; i < res.data.activities.length; i++) {
            res.data.activities[i].profile = host + res.data.activities[i].profile;
            for (var j = 0; j < res.data.activities[i].images.length; j++) {
              res.data.activities[i].images[j] = host + res.data.activities[i].images[j];
            }

          }
          console.log('处理后的活动列表：', res.data)
          var addact = that.data.activities.concat(res.data.activities)
          that.setData({
            activities: addact,
            start: that.data.start + res.data.activities.length
          })
        } else {
          wx.showModal({
            title: res.data.code + "",
            content: res.data.msg,
          })
        }

      },
      fail: function (error) {
        wx.showModal({
          title: '网络错误',
          content: '请检查网络连接',
        })
      },
      complete: function () {
        wx.hideNavigationBarLoading()

        wx.setNavigationBarTitle({
          title: '活动'
        });
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})