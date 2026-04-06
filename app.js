App({
  onLaunch() {
    // 初始化本地存储
    this.initLocalStorage()
  },
  
  initLocalStorage() {
    // 初始化默认分类
    const categories = wx.getStorageSync('categories')
    if (!categories || categories.length === 0) {
      const defaultCategories = [
        { _id: '1', name: '工作汇报', color: '#07c160', createTime: new Date().toISOString(), updateTime: new Date().toISOString() },
        { _id: '2', name: '问题反馈', color: '#409eff', createTime: new Date().toISOString(), updateTime: new Date().toISOString() },
        { _id: '3', name: '其他', color: '#909399', createTime: new Date().toISOString(), updateTime: new Date().toISOString() }
      ]
      wx.setStorageSync('categories', defaultCategories)
    }
    
    // 初始化截图数据
    const screenshots = wx.getStorageSync('screenshots')
    if (!screenshots) {
      wx.setStorageSync('screenshots', [])
    }
  },
  
  globalData: {
    userInfo: null
  }
})