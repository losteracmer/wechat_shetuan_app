// pages/community/community.js
const getkindsUrl = require('../../config.js').getkindsUrl;
const getcommlistUrl = require('../../config.js').getcommlistUrl;
const host = require('../../config.js').host;
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['热    门', '关    注', '思想政治', '学术科技', '创新创业', '文化体育', '志愿公益', '自律互助'],
    currentTab: 0,
    start: 0,
    add: 7,
    load: true,
    xiaoqu:['全部校区','金明校区','明伦校区'],
    choosexiaoqu:'全部校区',
    xiaoquimg:'../../image/allxiaoqu.png'
  },
  gotodetail: function(e) {
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
  //导航栏触发
  navbarTap: function(e) {
    //防止乱动bug，这里加一个判断
    console.log(this.data.load)
    if(this.data.load == true) return ;
    //因为不管是侧滑还是点击导航栏，都会触发侧滑事件，这样就会请求两次，这里导航栏去掉
     console.log('导航栏触发请求')
    // //因为sessionkey可能是在这个页面加载后获得的，所以每次都获取一次
    var sessionkey = app.globalData.sessionkey;
    this.setData({
      start: 0,
      currentTab: e.currentTarget.dataset.idx
    })
    // var that = this;
    // var index = parseInt(this.data.currentTab);
    // var spi = this.data.navbar[index];
    // var start = that.data.start;
    // var add = that.data.add;
    // this.data.load = true; //请求前的加载动画
    // that.setData({
    //   load: true
    // })
    // wx.request({
    //   url: getcommlistUrl,
    //   data: {
    //     spi: spi,
    //     start: start,
    //     add: add,
    //     sessionkey: sessionkey
    //   },
    //   success: function(res) {
    //     if (res.data.comm) {
    //       //对图片链接地址做处理,加上host
    //       for (var i = 0; i < res.data.comm.length; i++) {
    //         res.data.comm[i].profile = host + res.data.comm[i].profile;
    //       }
    //       console.log(res.data)
    //       that.setData({
    //         comm: res.data.comm
    //       })
    //     }

    //   },
    //   fail: function(error) {
    //     wx.showModal({
    //       title: '网络连接失败',
    //       content: '请检查网络状态',
    //     })
    //   },
    //   //无论请求是否完成，结束关闭请求动画
    //   complete: function() {
    //     that.setData({
    //       load: false
    //     })
    //   }
    // })
  },
  //这是，滑动侧滑触发事件
  contentChange: function(e) {
    console.log('侧滑事件触发请求')
    //return;
    //因为sessionkey可能是在这个页面加载后获得的，所以每次都获取一次
    var sessionkey = app.globalData.sessionkey;
    //var currenTab:

    console.log('当前状态:', this.data.load)
    if(this.data.load == true) {
      
      return ;
    }
    console.log('状态false 开始请求')
    var that = this;
    var index;
    if(e){
      index = parseInt(e.detail.current);
    } else {
      index = parseInt(that.data.currentTab);
    }

    var spi = this.data.navbar[index];
    var start = that.data.start;
    var add = that.data.add;
    var xiaoqu = that.data.choosexiaoqu;
    this.setData({
      load:true
    }) //请求前的加载动画
    wx.setNavigationBarTitle({
      title: `正在加载....`
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: getcommlistUrl,
      data: {
        spi: spi,
        start: start,
        add: add,
        sessionkey: sessionkey,
        xiaoqu:xiaoqu
      },
      success: function(res) {
        if (res.data.code == 200) {
          if(res.data.comm.length == 0){
            wx.showToast({
              title: '没有了呢',
              icon:'none'
            })
          }
          //对图片链接地址做处理,加上host
          for (var i = 0; i < res.data.comm.length; i++) {
            res.data.comm[i].profile = host + res.data.comm[i].profile;
          }
          console.log(res.data)
          that.setData({
            comm: res.data.comm
          })
        }

      },
      fail: function(error) {
        wx.showModal({
          title: '网络连接失败',
          content: '请检查网络状态',
        })
      },
      //无论请求是否完成，结束关闭请求动画
      complete: function() {
        wx.setNavigationBarTitle({
          title: `社团`
        });
        that.setData({
          load: false
        })
        wx.hideNavigationBarLoading()
        //这个时候再移动
        if (e) {
          //如果是通过触发进入的事件，改变cuurentab
          that.setData({
            start: 0,
            currentTab: e.detail.current,
            data: true
          })
        } else {
          that.setData({
            start: 0,
            data: true
          })
        }
      }
    })
  },


  onLoad: function(options) {
    //因为sessionkey可能是在这个页面加载后获得的，所以每次都获取一次，这里的sessionkey就是null
    var sessionkey = app.globalData.sessionkey;
    var that = this;
    var start = that.data.start;
    var add = that.data.add;
    var xiaoqu = that.data.choosexiaoqu;
    console.log(getkindsUrl, '--', app.globalData.userInfo)
    //获取分类信息
    this.data.load = true; //请求前的加载动画
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: getkindsUrl,
      data: {
        //这，传用户信息不知道啥用
        userInfo: app.globalData.userInfo
      },
      success: function(res) {
        console.log('----getkinds', res)
        if (res.data.code == 200)
          that.setData({
            navbar: res.data.kinds
          })
      },

      //无论请求是否完成，结束关闭请求动画
      complete: function() {
        that.setData({
          load: false
        })
        wx.hideLoading()
      }
    });
    this.data.load = true; //请求前的加载动画
    wx.request({
      url: getcommlistUrl,

      data: {
        spi: '热    门',
        start: start,
        add: add,
        sessionkey: sessionkey,
        xiaoqu:xiaoqu
      },
      success: function(res) {
        console.log('commlist收到回复', res)
        if (res.data.code == 200)
          if (res.data.comm.length == 0) {
            wx.showToast({
              title: '没有了呢',
              icon: 'none'
            })
          }
          //对图片链接地址做处理,加上host
          for (var i = 0; i < res.data.comm.length; i++) {
            res.data.comm[i].profile = host + res.data.comm[i].profile;
          }
        that.setData({
          comm: res.data.comm
        })
      },
      fail: function(error) {
        wx.showModal({
          title: '网络连接失败',
          content: '请检查网络状态',
        })
      },
      //无论请求是否完成，结束关闭请求动画
      complete: function() {
        that.setData({
          load: false
        })
      }
    })
  },

  //更改校区
  changexiaoqu:function(res){
    var that = this;
    console.log(res);
    var index = res.currentTarget.dataset.index;
    var xiaoqu = that.data.xiaoqu[parseInt(res.detail.value)];
    console.log(xiaoqu)
    if(xiaoqu == '金明校区'){
      that.setData({
        xiaoquimg:'../../image/jinming.png',
        choosexiaoqu:'金明校区'
      })
    }
    if(xiaoqu == '全部校区'){
      that.setData({
        xiaoquimg: '../../image/allxiaoqu.png',
        choosexiaoqu: '全部校区'
      })
    }
    if(xiaoqu == '明伦校区'){
      that.setData({
        xiaoquimg: '../../image/minglun.png',
        choosexiaoqu: '明伦校区'
      })
    }
    that.contentChange();
  },
  
  bindDownLoad: function() {
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: '正在加载更多社团....'
    });
    //因为sessionkey可能是在这个页面加载后获得的，所以每次都获取一次
    var sessionkey = app.globalData.sessionkey;
    console.log('触底download')
    var that = this;
    var start = that.data.comm.length;
    var add = that.data.add;
    var index = parseInt(this.data.currentTab);
    var spi = this.data.navbar[index];
    //触底都重新请求
    this.data.load = true; //请求前的加载动画
    var xiaoqu = that.data.choosexiaoqu;
    wx.request({
      url: getcommlistUrl,

      data: {
        spi: spi,
        start: start,
        add: add,
        sessionkey: sessionkey,
        xiaoqu:xiaoqu
      },
      success: function(res) {
        console.log('再次收到comm:', res)
        if (res.data.code = 200) {
          if (res.data.comm.length == 0) {
            wx.showToast({
              title: '没有了呢',
              icon: 'none'
            })
          }
          var addcomm = res.data.comm;

          //对于得到的新数据，可能是空的，所以这里做一个判断
          if (addcomm.length == 0) {
            console.log('没有更多数据了')
            return;
          }
          //依旧对add的image路径进行处理
          for (var i = 0; i < res.data.comm.length; i++) {
            res.data.comm[i].profile = host + res.data.comm[i].profile;
          }
          var comm = that.data.comm.concat(addcomm)
          var len = addcomm.length;
          console.log('增加后的comm', comm)
          that.setData({
            comm: comm,
            start: that.data.start + len
          })
        }


      },
      fail: function(error) {
        wx.showModal({
          title: '网络连接失败',
          content: '请检查网络状态',
        })
      },
      //无论请求是否完成，结束关闭请求动画
      complete: function() {
        that.setData({
          load: false
        })
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '社团'
        });
        wx.stopPullDownRefresh();
      }
    })
  },
  search: function() {
    wx.navigateTo({
      url: `../../pages/search/search`,
    })
  },
  bindTopLoad: function() {
    //console.log('触顶topload')
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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})