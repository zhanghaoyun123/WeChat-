// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 初始化数据库集合
    const db = cloud.database()
    
    // 检查并创建screenshots集合
    await db.collection('screenshots').get()
    
    // 检查并创建categories集合
    await db.collection('categories').get()
    
    // 添加默认分类
    const categories = await db.collection('categories').count()
    if (categories.total === 0) {
      await db.collection('categories').add({
        data: {
          name: '工作汇报',
          color: '#07c160',
          createTime: new Date(),
          updateTime: new Date()
        }
      })
      await db.collection('categories').add({
        data: {
          name: '问题反馈',
          color: '#409eff',
          createTime: new Date(),
          updateTime: new Date()
        }
      })
      await db.collection('categories').add({
        data: {
          name: '其他',
          color: '#909399',
          createTime: new Date(),
          updateTime: new Date()
        }
      })
    }
    
    return {
      success: true,
      message: '初始化成功'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}