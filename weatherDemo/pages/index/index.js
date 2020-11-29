const app = getApp();
// var QQMapWX = require('../../common/js/qqmap-wx-jssdk.js');
// var qqmapsdk = new QQMapWX({
//   key: '3JCBZ-K3E6O-7XPWY-STEUM-B52RQ-PJBJM'
// });  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['陕西省', '西安市', '新城区'],
    now: {},
    LongLat: ''
  },
  queryCityInfo: function (latitude,longitude) {
    qqmapsdk.reverseGeocoder({
			location: {
				latitude,
				longitude
			},
			// location: e.detail.value.reverseGeo || '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
			success: function(res) {//成功后的回调
				console.log(res);
			},
			fail: function (res) {
			   console.log("获取地址失败", failres);
			},
			complete: function (completeres) {
		
			}
		})
  },
getLocation: function () {
  wx.getLocation({
    type: 'wgs84',
    success: res => {
      const {
        latitude,
        longitude
      } = res
     console.log(latitude,longitude);
    //  this.queryCityInfo(latitude,longitude);
     this.getWeather(`${longitude},${latitude}`);
     this.setData({
     'LongLat': `${longitude},${latitude}`
     })
    },
    fail: res => {
      // console.log('您已经拒绝获取定位，需要打开设置')
      wx.showModal({
        title: '警告',
        content: '如果不授权获取您的定位，将无法为您展示你当前位置天气详情.',
        confirmText: '去授权',
        showCancel: false,
        success: res => {
          if (res.confirm) {
            wx.openSetting({
              success: res => {
                this.getLoaction()
              }
            })
          }
        }
      })
    }
  })
},
  getWeather: function (data) {
    let that = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      data: {
        location: data ? data : that.data.region[1],
        key: 'dd19f274c3074b2c9c416fb4292ef197'
      },success: function (res) {
        console.log(res.data);
        that.setData({
          now: res.data.HeWeather6[0].now
        })
      }
    })
  },

  regionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
    this.getWeather();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
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