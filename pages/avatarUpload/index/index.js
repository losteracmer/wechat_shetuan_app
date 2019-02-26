/**
 * Created by sail on 2017/4/14.
 */

Page({
  data: {
    src: ''
  },
  upload () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0];
        var id = that.data.id;
        wx.redirectTo({
          url: `../upload/upload?src=${src}&id=${id}`
        })
      }
    })
  },
  onLoad (option) {
    console.log(' -logo index options  ',option)
    let avatar= option.avatar
    let commId = option.id;

    if (avatar) {
      this.setData({
        src: avatar,
      })
    }
    if(commId){
      this.setData({
        id:commId
      })
    }
  }
})
