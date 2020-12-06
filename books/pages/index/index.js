Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDownLoading: false,
    percentNum: 0,
    bookList: [
      {
        id: '01',
        title: 'Java编程思想',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s27243455.jpg',
        filePath: 'http://localhost/books/books001.pdf'
      },{
        id: '02',
        title: '安徒生童话',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s28036746.jpg',
        filePath: 'http://localhost/books/books002.pdf'
      },{
        id: '03',
        title: '计算机科学概述',
        poster: 'https://img3.doubanio.com/view/subject/l/public/s6069865.jpg',
        filePath: 'http://localhost/books/books003.pdf'
      }
    ]
  },
showTips: function (content) {
  wx.showModal({
    title:'提示',
    content,
    showCancel: false,
  })
},
openBooks: function (filePath) {
  wx.openDocument({
    filePath,
    success(res){
      console.log('已打开:', res);
    },
    fail(error) {
      console.log(error);
    }
  })
},
saveBook: function(id ,path){
  let that = this;
  wx.saveFile({
    tempFilePath: path,
    success(res){
      // 将文件保存在本地缓存，下次直接打开
      let newPath = res.savedFilePath;
      wx.setStorageSync(id, newPath)
      that.openBooks(newPath);
    },
    fail(error) {
      console.log(error);
      that.showTips('文件保存失败！！');
    }
  })
},
readBook: function (e) {
  let that = this;
  let id = e.currentTarget.dataset.id;
  let fileUrl = e.currentTarget.dataset.fileUrl;
  let path = wx.getStorageSync(id);
  if (!path) {
    that.setData({
      isDownLoading: true
    })
    const downloadTask = wx.downloadFile({
      url: fileUrl,
      success(res){
        // 关闭浮层
        that.setData({
          isDownLoading: false
        })
        if (res.StatusCode == 200) {
          path = res.tempFilePath;
          that.saveBooks(id, path);
        } else {
          that.showTips('下载失败！！');
        }
      },
      fail(error) {
        console.log(error);
        that.setData({
          isDownLoading: false
        })
        that.showTips('无法连接服务器！！');
      }
    })
    downloadTask.onProgressUpdate((res) => {
      let progress = res.progress;
      that.setData({
        percentNum: progress
      })
    })
  } else {
    that.openBooks(path);
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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