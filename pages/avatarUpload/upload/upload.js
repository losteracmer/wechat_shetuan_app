import WeCropper from '../../we-cropper/we-cropper.js'
const uploadlogoUrl = require('../../../config.js').uploadlogoUrl;
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight+5
var app = getApp()
Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  onLoad: function (options) {

  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    var that = this;
    var key = app.globalData.key;
    var sessionkey = app.globalData.sessionkey;
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        //  获取到裁剪后的图片
        console.log('获取到裁剪后的图片:',avatar)
        wx.uploadFile({
          url: uploadlogoUrl,
          filePath: avatar,
          formData:{
            id:that.data.id,
            key:key,
            sessionkey : sessionkey
          },
          name: 'logo',
          success:res =>{
            console.log('上传logo回复;',res.data)
            let jres = JSON.parse(res.data)
            console.log('jres:',jres)
            if(jres.code == 200){
              wx.navigateBack({
                delta: 1,
              })
              wx.showToast({
                title: jres.msg,
              })
             
            } else{
              wx.showModal({
                title: jres.code + " ",
                content: jres.msg,
              })
            }
          },
          fail: err =>{
            console.log('logo失败',err)
          },
          complete :()=>{
            console.log('uploadlogo完成')
          }

        })

        wx.redirectTo({
          url: `../index/index?avatar=${avatar}`
        })
      } else {
        console.log('获取图片失败，请稍后重试')
      }

    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {
    const { cropperOpt } = this.data
    console.log('upload options:', option)
    let commId = option.id;
    this.setData({
      id: commId
    })
    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          //console.log(`before canvas draw,i can do something`)
          //console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})
