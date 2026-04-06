Page({
  data: {
    screenshots: [],
    categories: [],
    selectedCategory: null,
    categoryIndex: 0,
    page: 0,
    pageSize: 10,
    hasMore: true
  },
  
  onLoad() {
    this.getCategories()
    this.getScreenshots()
  },
  
  onReachBottom() {
    if (this.data.hasMore) {
      this.getScreenshots()
    }
  },
  
  getCategories() {
    const categories = wx.getStorageSync('categories') || []
    this.setData({
      categories: categories
    })
  },
  
  getScreenshots() {
    if (!this.data.hasMore) return
    
    // 从本地存储获取数据
    let allScreenshots = wx.getStorageSync('screenshots') || []
    
    // 按分类筛选
    if (this.data.selectedCategory) {
      allScreenshots = allScreenshots.filter(item => item.categoryId === this.data.selectedCategory._id)
    }
    
    // 按时间排序
    allScreenshots.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    
    // 分页处理
    const start = this.data.page * this.data.pageSize
    const end = start + this.data.pageSize
    const pageScreenshots = allScreenshots.slice(start, end)
    
    if (pageScreenshots.length < this.data.pageSize) {
      this.setData({ hasMore: false })
    }
    
    this.setData({
      screenshots: this.data.page === 0 ? pageScreenshots : [...this.data.screenshots, ...pageScreenshots],
      page: this.data.page + 1
    })
  },
  
  bindCategoryChange(e) {
    const index = e.detail.value
    const category = this.data.categories[index]
    this.setData({
      selectedCategory: category,
      categoryIndex: index,
      page: 0,
      hasMore: true,
      screenshots: []
    })
    this.getScreenshots()
  },
  
  formatTime(time) {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  },
  
  getCategoryColor(categoryId) {
    const category = this.data.categories.find(c => c._id === categoryId)
    return category ? category.color : '#999'
  }
})