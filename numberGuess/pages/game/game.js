// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: 0,
    x: -1,
    count: 0,
    tip: '',
    isGameStart: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initial();
  },
  initial: function () {
    this.setData({
      answer: Math.round(Math.random() * 100)
    })
  },
  getNumber: function (e) {
    this.setData({
      x: e.detail.value
    })
  },
  guess: function () {
    let num = this.data.x;
    this.setData({x: -1});
    if (num < 0 || num > 100) {
      let title = num < 0 ? '不能小于0' : (num > 100 ? '不能大于100' : '');
      wx.showToast({title});
    } else {
      let count = this.data.count + 1, tip = this.data.tip, answer = this.data.answer;
      if (num == answer) {
        tip += '\n第'+ count + '回合:' + num + ', 猜对了, 游戏结束！！';
        this.setData({isGameStart: false})
      } else if (num < answer) {
        tip += '\n第'+ count + '回合:' + num + ', 猜小了';
      } else if (num > answer) {
        tip += '\n第'+ count + '回合:' + num + ', 猜大了';
      }
      if (count == 8) {
        tip += '\n游戏结束';
        this.setData({isGameStart: false})
      }
      this.setData({
        tip,
        count
      })
    }
  },
  reStartGuss: function() {
    this.initial();
  }
})