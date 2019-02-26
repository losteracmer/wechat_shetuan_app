// pages/communityInfo/communityInfo.js
const getcommInfoUrl = require('../../config.js').getcommInfoUrl;

const activitiesUrl = require('../../config.js').activitiesUrl;
const guanzhuUrl = require('../../config.js').guanzhuUrl;
const dianzanUrl = require('../../config.js').dianzanUrl;
const host = require('../../config.js').host;
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    add: 4,
    profile: "../../image/waiting.gif", //这个图可以换成正在加载图。。。
    name: "loading...",
    like: "loading...",
    navbar: ['主页', '活动'],
    currentTab: 0,
    id: "",
    kinds: "",
    brief: "",
    //新增属性申请方式
    contact: "loading...",
    //判断是否关注
    likeOrNot: 1,
    //相册数组
  },
  navbarTap: function(e) {
    let index = parseInt(e.currentTarget.dataset.idx)
    this.setData({
      currentTab: index
    })
    if (index == 1) {
      //如果点击的是活动页,调用活动加载函数
      if(!this.data.activities)//没有请求过数据时才请求，请求过了几不请求了
      this.activities();
    }
  },

  activities: function() {
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    var shetuanid = that.data.id;
    wx.request({
      url: activitiesUrl,
      data: {
        start: that.data.start,
        add: that.data.add,
        sessionkey: sessionkey,
        shetuanid:shetuanid
      },
      success: function(res) {
        console.log('活动列表收到回复：', res);
        //要对立面的图片进行处理
        if (res.data.code == 200) {
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
            title: res.data.code+"",
            content: res.data.msg,
          })
        }

      }
    })
  },

  //查看大图
  previewImage: function (e) {
    console.log('显示大图', e)
    wx.previewImage({
      urls: e.currentTarget.dataset.list,
      current: e.currentTarget.dataset.src
    })
  },

  onLoad: function(options) {
    var sessionkey = app.globalData.sessionkey;
    var that = this;
    console.log('跳转数据:', options);
    var commId = options.id;
    wx.request({
      url: getcommInfoUrl,
      data: {
        commId: commId,
        sessionkey: sessionkey
      },
      success: function(res) {
        console.log('getcommInfo->', res.data)
        that.setData({
          profile: host + res.data.profile,
          name: res.data.name,
          member: res.data.member,
          like: res.data.like,
          id: res.data.id,
          kinds: res.data.kinds,
          brief: res.data.brief,
          //新增属性申请方式
          contact: res.data.contact,
          //新增属性判断是否关注
          likeOrNot: res.data.likeOrNot,
          xiaoqu:res.data.xiaoqu,
          zyfzr:res.data.zyfzr,
          member: res.data.member,
          jphd: res.data.jphd,
          gkdw: res.data.gkdw
        })
        console.log('图片地址:', that.data.profile)
      },
    })
  },
  //关注函数
  guanzhu: function() {
    var that = this;
    let likeOrNot = this.data.likeOrNot;
    var sessionkey = app.globalData.sessionkey;
    if (likeOrNot == 1) {
      wx.showModal({
        title: '提示',
        content: '确定要取消关注吗?',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: guanzhuUrl,
              data: {
                likeOrNot: that.data.likeOrNot,
                sessionkey: sessionkey,
                shetuanid: that.data.id
              },
              success: function(res) {
                if(res.data.code == 200){
                  wx.showToast({
                    title: res.data.msg,
                    icon:"none"
                  })
                  that.setData({
                    likeOrNot: false,
                    like: that.data.like - 1
                  })
                } else {
                  wx.showModal({
                    title: res.data.code +'',
                    content: res.data.msg,
                  })
                }
                
              },
              //失败的回调
              fail: function(error) {
                console.log('关注失败')
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      //如果没有关注，就。。。嘿嘿
      wx.request({
        url: guanzhuUrl,
        data: {
          likeOrNot: that.data.likeOrNot,
          sessionkey: sessionkey,
          shetuanid: that.data.id
        },
        success: function(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            that.setData({
              likeOrNot: true,
              like: that.data.like + 1
            })
          } else {
            wx.showModal({
              title: res.data.code + '',
              content: res.data.msg,
            })
          }
        }
      })
    }
  },
  //点赞方法
  starOrNot: function (res) {
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
      success: function (res) {
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  onReachBottom: function() {
    //判断如果是活动页才下拉加载更多
    if (this.data.currentTab == 0) return ;
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: '正在加载更多....'
    });
    console.log('社团详情页触底了')
    var that = this;
    var sessionkey = app.globalData.sessionkey;
    wx.request({
      url: activitiesUrl,
      data: {
        start: that.data.start,
        add: that.data.add,
        sessionkey: sessionkey,
        shetuanid:that.data.id
      },
      success: function (res) {
        console.log('再次活动列表收到回复：', res);
        //应该判断获取到的是否为空
        //另外，加载动画
        //要对立面的图片进行处理
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
      },
      fail:function(err){
        wx.showModal({
          title: '请求失败',
          content: '请检查网络状态',
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