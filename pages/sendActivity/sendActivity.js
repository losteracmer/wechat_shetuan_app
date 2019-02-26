// pages/sendActivty/sendActivty.js
var app = getApp();
const uploadFileUrl = require('../../config.js').uploadFileUrl;
const getimageslist = require('../../config.js').getimageslist;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //上传图片
    id: '',
    img_url: [],
    //上传文字内容
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取文字信息
  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  //选取图片
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,//默认
      sizeType: ['original', 'compressed'],//可指定原图还是压缩图，默认两者都有
      sourceType: ['album', 'camera'],//可指定相册还是相机，默认两者都有
      success: function (res) {

        //把每次选择的图push进数组
        let img_url = that.data.img_url;
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          img_url.push(res.tempFilePaths[i])
        }
        that.setData({
          img_url: img_url
        })

        //图满9张不加图
        if (that.data.img_url.length == 9) {
          that.setData({
            hideAdd: 1
          })
        } else if (that.data.img_url.length > 9) {
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.pop();
          }
          that.setData({
            img_url: img_url,
            hideAdd: 0
          })
          wx: wx.showModal({
            title: '提示',
            content: "最多只能添加9张图",
            showCancel: false,
            confirmText: '确定'
          })
        } else {
          that.setData({
            hideAdd: 0
          })
        }
      },
    })
  },

  //单击删除图片
  deleteimage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.idx;
    wx: wx.showModal({
      title: '提示',
      content: '是否删除该图片',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          var imgurl = that.data.img_url;
          imgurl.splice(index, 1);
          that.setData({
            img_url: imgurl,
            hideAdd: 0
          })
        }
      }
    })
  },

  //发布按钮事件,获取用户id这个操作后台注意一下，需要修改请自行修改
  send: function () {
    var that = this;
    that.img_upload()
  },

  //图片上传
  img_upload: function () {
    if(this.data.content == "" && this.data.img_url.length == 0){
      wx.showModal({
        content: '内容不能为空哦QAQ',
      })
      return;
    }
    let sessionkey = app.globalData.sessionkey;
    let that = this;
    let img_url = that.data.img_url;
    let img_url_ok = [];
    //准备上传数据，开始上传
    wx.showLoading({
      title: '上传中',
    })
    if(this.data.img_url.length == 0){
      //没有图片内容，直接上传文字？
      console.log('没有图片内容，直接上传文字？')
      let sessionkey = app.globalData.sessionkey;
      let content = that.data.content;
      let commid = that.data.id;
      let key = app.globalData.key;
      wx.request({
        url: getimageslist,//路径填上传图片方法的地址
        data: {
          sessionkey: sessionkey,
          key: key,
          id: commid,
          images: [],
          content: content,
        },
        success: function (res) {
          console.log('上传文件返回信息：', res)
          if (res.data.code == 200) {
            wx.hideLoading()

            wx.showModal({
              title: res.data.msg,
              showCancel: false,
              success: function () {
                wx.navigateBack({});
              }
            })
          }
        }
      })
      return;
    }
    for (let i = 0; i < img_url.length; i++) {
      console.log('正在进行 第', i, '次上传。。。。')
      wx.uploadFile({
        url: uploadFileUrl,//
        filePath: img_url[i],
        name: 'data',
        success: function (res) {
          console.log('上传成功');
          //把上传成功的图片的地址放入数组中
          img_url_ok.push(res.data)

          //#################################

          //如果全部传完，则可以将图片路径保存到数据库中
          console.log('getinageslist: ', getimageslist);
          if (img_url_ok.length == img_url.length) {
            var sessionkey = app.globalData.sessionkey;
            var content = that.data.content;
            var commid = that.data.id;
            var key = app.globalData.key;
            wx.request({
              url: getimageslist,//路径填上传图片方法的地址
              data: {
                sessionkey: sessionkey,
                key: key,
                id: commid,
                images: img_url_ok,
                content: content,
              },
              success: function (res) {
                console.log('上传文件返回信息：', res)
                wx.hideLoading()
                if (res.data.code == 200) {
                  wx.showModal({
                    title: res.data.msg,
                    showCancel: false,
                    success: function () {
                      wx.navigateBack({});
                    }
                  })
                } else {
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
              }
            })
          }
        }
      })
    }
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