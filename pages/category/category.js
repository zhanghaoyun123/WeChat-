Page({
  data: {
    categories: [],
    categoryName: '',
    colors: ['#07c160', '#409eff', '#e6a23c', '#f56c6c', '#909399', '#67c23a', '#303133', '#606266'],
    colorIndex: 0,
    editingCategory: null
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
  
  bindCategoryNameInput(e) {
    this.setData({
      categoryName: e.detail.value
    })
  },
  
  bindColorChange(e) {
    this.setData({
      colorIndex: e.detail.value
    })
  },
  
  addCategory() {
    if (!this.data.categoryName) {
      wx.showToast({ title: '请输入分类名称', icon: 'none' })
      return
    }
    
    const categories = wx.getStorageSync('categories') || []
    
    if (this.data.editingCategory) {
      // 编辑分类
      const updatedCategories = categories.map(item => {
        if (item._id === this.data.editingCategory._id) {
          return {
            ...item,
            name: this.data.categoryName,
            color: this.data.colors[this.data.colorIndex],
            updateTime: new Date().toISOString()
          }
        }
        return item
      })
      wx.setStorageSync('categories', updatedCategories)
      wx.showToast({ title: '编辑成功', icon: 'success' })
    } else {
      // 添加分类
      const newCategory = {
        _id: 'category_' + Date.now(),
        name: this.data.categoryName,
        color: this.data.colors[this.data.colorIndex],
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      }
      categories.push(newCategory)
      wx.setStorageSync('categories', categories)
      wx.showToast({ title: '添加成功', icon: 'success' })
    }
    
    this.resetForm()
    this.getCategories()
  },
  
  editCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      editingCategory: category,
      categoryName: category.name,
      colorIndex: this.data.colors.indexOf(category.color)
    })
  },
  
  deleteCategory(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个分类吗？',
      success: res => {
        if (res.confirm) {
          const categories = wx.getStorageSync('categories') || []
          const updatedCategories = categories.filter(item => item._id !== id)
          wx.setStorageSync('categories', updatedCategories)
          wx.showToast({ title: '删除成功', icon: 'success' })
          this.getCategories()
        }
      }
    })
  },
  
  resetForm() {
    this.setData({
      categoryName: '',
      colorIndex: 0,
      editingCategory: null
    })
  },
  
  formatTime(time) {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  }
})