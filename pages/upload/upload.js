Page({
  data: {
    imagePath: '',
    description: '',
    categories: [],
    selectedCategory: null
  },
  
  onLoad() {
    this.getCategories()
  },
  
  getCategories() {
    const categories = wx.getStorageSync('categories') || []
    this.setData({
      categories: categories
    })
  },
  
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // 对图片进行压缩处理
        wx.compressImage({
          src: res.tempFilePaths[0],
          quality: 80,
          success: compressRes => {
            this.setData({
              imagePath: compressRes.tempFilePath
            })
          }
        })
      }
    })
  },
  
  bindDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    })
  },
  
  selectCategory(e) {
    this.setData({
      selectedCategory: e.currentTarget.dataset.category
    })
  },
  
  navigateToCategory() {
    wx.navigateTo({
      url: '../category/category'
    })
  },
  
  submit() {
    if (!this.data.imagePath) {
      wx.showToast({ title: '请选择图片', icon: 'none' })
      return
    }
    
    if (!this.data.selectedCategory) {
      wx.showToast({ title: '请选择分类', icon: 'none' })
      return
    }
    
    wx.showLoading({ title: '提交中...' })
    
    // 生成唯一ID
    const timestamp = Date.now()
    const id = 'screenshot_' + timestamp
    
    // 保存数据到本地存储
    const screenshots = wx.getStorageSync('screenshots') || []
    const newScreenshot = {
      _id: id,
      imageUrl: this.data.imagePath, // 存储本地路径
      description: this.data.description,
      categoryId: this.data.selectedCategory._id,
      categoryName: this.data.selectedCategory.name,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    }
    
    screenshots.unshift(newScreenshot) // 添加到数组开头
    wx.setStorageSync('screenshots', screenshots)
    
    wx.hideLoading()
    wx.showToast({ title: '提交成功', icon: 'success' })
    
    // 重置表单
    this.setData({
      imagePath: '',
      description: '',
      selectedCategory: null
    })
  }
})