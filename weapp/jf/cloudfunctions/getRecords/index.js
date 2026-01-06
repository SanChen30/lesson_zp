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

    // 查找房间中的所有记录
    const recordsResult = await db.collection('records').where({
      room_id: roomId
    }).orderBy('round_number', 'desc').get();

    return {
      success: true,
      data: recordsResult.data
    };
  } catch (error) {
    console.error('获取记录信息失败:', error);
    return {
      success: false,
      message: error.message || '获取记录信息失败'
    };
  }
};