// pages/activity/activity.js
const activitiesUrl = require('../../config.js').activitiesUrl
const dianzanUrl = require('../../config.js').dianzanUrl
const host = require('../../config.js').host
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    add: 4,
    pip: true,
    idx: 0,
    array: ['全部', '热门', '关注', '明伦', '金明'],
    dzarr: [],
    hide: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //在页面加载完成之前请求
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var xiaoqu = this.data.array[this.data.idx];
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: activitiesUrl,
      data: {
        start: that.data.start,
        add: that.data.add,
        sessionkey: sessionkey,
        xiaoqu: xiaoqu
      },
      success: function(res) {
        console.log('活动列表收到回复：', res);
        //要对立面的图片进行处理
        if (res.data.code == 200) {
          if (res.data.activities.length == 0) {
            wx.showToast({
              title: '没有了呢',
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

      },fail:function(error){
        wx.showModal({
          title: '获取活动信息失败',
          content: '请检查网络连接',
        })
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  //显示下拉列表
  showPicker: function(e) {
    var that = this;
    var hide = that.data.hide;
    if (hide == 0) {
      that.setData({
        hide: 1
      })
    } else {
      that.setData({
        hide: 0
      })
    }
  },

  //更换分类
  changeIdx: function(e) {
    //console.log(e.currentTarget.dataset)
    this.setData({
      idx: e.currentTarget.dataset.idx
    })
    this.showPicker();
    //更换了分类后，重新请求
    this.onPullDownRefresh();
  },

  //跳转社团详情页
  gotodetail: function(e) {
    //var commId = none;//待补充
    console.log('点击社团头像', e)
    let commId = e.currentTarget.dataset.commid
    wx.navigateTo({
      url: `../../pages/communityInfo/communityInfo?id=${commId}`,
    })
  },

  //预览大图
  previewImage: function(e) {
    console.log('显示大图', e)
    wx.previewImage({
      urls: e.currentTarget.dataset.list,
      current: e.currentTarget.dataset.src
    })
  },

  //点赞方法
  starOrNot: function(res) {
    //无论如点赞按钮都不变化。。。
    var sessionkey = app.globalData.sessionkey;
    console.log(res)
    var index = res.currentTarget.id;
    var that = this;
    that.data.pip = false //!that.data.pip;
    console.log(that.data.activities[index].star, '\n', that.data.activities[index].imgs)


    //#################不管了，先写接口
    wx.request({
      url: dianzanUrl,
      data: {
        hdid: res.currentTarget.dataset.hdid,
        sessionkey: sessionkey,
        star: parseInt(that.data.activities[index].star)
      },
      success: function(res) {
        console.log('点赞收到回复', res.data)
        if (res.data.code = 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          //收到请求后设置star状态
          if (that.data.activities[index].star == 0) {
            that.data.activities[index].star = 1;
            that.data.activities[index].hddz += 1;
            let dzafterAC = that.data.activities;
            that.setData({
              activities: dzafterAC
            })
            console.log('设置star = 1')
          } else {
            that.data.activities[index].star = 0
            let dzafterAC = that.data.activities;
            that.data.activities[index].hddz -= 1;
            that.setData({
              activities: dzafterAC
            })
            console.log('设置star = 0')
          }
        } else {
          wx.showModal({
            title: res.data.code,
            content: res.data.msg,
          })
        }
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
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: '正在加载最新活动....'
    });
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    that.data.start = 0;
    var xiaoqu = this.data.array[this.data.idx];
    wx.request({
      url: activitiesUrl,
      data: {
        start: that.data.start,
        add: that.data.add,
        sessionkey: sessionkey,
        xiaoqu: xiaoqu
      },
      success: function(res) {
        console.log('活动列表收到回复：', res);
        //要对立面的图片进行处理
        if (res.data.code == 200) {
          if (res.data.activities.length == 0) {
            wx.showToast({
              title: '没有了呢',
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
      complete: function() {
        wx.hideNavigationBarLoading()

        wx.setNavigationBarTitle({
          title: '活动'
        });
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //加载更多动画
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: '正在加载更多....'
    });
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var xiaoqu = this.data.array[this.data.idx];
    wx.request({
      url: activitiesUrl,
      data: {

        start: that.data.start,
        add: that.data.add,
        sessionkey: sessionkey,
        xiaoqu: xiaoqu
      },
      success: function(res) {
        console.log('再次活动列表收到回复：', res);
        //应该判断获取到的是否为空
        //另外，加载动画
        //要对立面的图片进行处理
        if (res.data.code == 200) {
          if (res.data.activities.length == 0) {
            wx.showToast({
              title: '没有了呢',
              icon: 'none'
            })
          }
          for (var i = 0; i < res.data.activities.length; i++) {
            res.data.activities[i].profile = host + res.data.activities[i].profile;
            for (var j = 0; j < res.data.activities[i].images.length; j++) {
              res.data.activities[i].images[j] = host + res.data.activities[i].images[j];
            }
          }
          var addact = that.data.activities.concat(res.data.activities)
          that.setData({
            activities: addact,
            start: that.data.start + res.data.activities.length
          })
        }

      },
      complete: function() {
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