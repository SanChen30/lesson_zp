const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const { roomId } = event;

    // 验证输入
    if (!roomId) {
      return {
        success: false,
        message: '房间ID不能为空'
      };
    }

    // 查找房间
    const roomResult = await db.collection('rooms').doc(roomId).get();

    if (roomResult.data.length === 0) {
      return {
        success: false,
        message: '房间不存在'
      };
    }

    return {
      success: true,
      data: roomResult.data[0]
    };
  } catch (error) {
    console.error('获取房间信息失败:', error);
    return {
      success: false,
      message: error.message || '获取房间信息失败'
    };
  }
};