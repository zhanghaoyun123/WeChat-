Page({
  data: {
  },
  
  navigateToUpload() {
    wx.navigateTo({
      url: '../upload/upload'
    })
  },
  
  navigateToHistory() {
    wx.navigateTo({
      url: '../history/history'
    })
  },
  
  navigateToCategory() {
    wx.navigateTo({
      url: '../category/category'
    })
  }
})