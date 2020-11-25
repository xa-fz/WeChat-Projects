Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    danmuTxt: '',
    list: [
      {
        id: '299371',
        title: '口述校史实录',
        videoUrl: 'https://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4'
      },{
        id: '299396',
        title: '直到世界尽头',
        videoUrl: 'https://www.bilibili.com/video/BV15z4y1y7Vs'
      },{
        id: '299378',
        title: '马元甲',
        videoUrl: 'https://www.bilibili.com/video/BV1HV41117Cp?spm_id_from=333.851.b_62696c695f7265706f72745f6b696368696b75.18'
      }
    ]
  },
  playVideo: function (e) {
    this.videoCtx.stop();
    this.setData({
      src: e.currentTarget.dataset.url
    })
    this.videoCtx.play()
  },
  getDanmu: function (e) {
    this.setData({
      danmuTxt: e.detail.value
    })
  },
  sendDanmu: function (e) {
    let text = this.data.danmuTxt;
    this.videoCtx.sendDanmu({
      text,
      color: getRandomDanmu()
    })
  },
  getRandomDanmu: function (){
    let rbg = [];
    for (let i = 0;i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16);
      color = color.length == 1 ? '0' + color : color
      rbg.push(color);
    }
    return '#' + rbg.join('')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('myVideo')
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