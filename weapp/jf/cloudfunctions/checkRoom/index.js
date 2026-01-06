const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    const { roomNumber } = event;

    // 验证输入
    if (!roomNumber || roomNumber.length !== 6) {
      return {
        success: false,
        message: '房间号必须是6位数字'
      };
    }

    // 查找房间
    const roomResult = await db.collection('rooms').where({
      room_number: roomNumber,
      status: 'active'
    }).get();

    if (roomResult.data.length === 0) {
      return {
        success: false,
        message: '房间不存在或已结束'
      };
    }

    const room = roomResult.data[0];
    const roomId = room._id;

    // 检查用户是否已经在房间中
    const existingPlayer = await db.collection('players').where({
      room_id: roomId,
      openid: wxContext.OPENID
    }).get();

    if (existingPlayer.data.length > 0) {
      // 用户已在房间中，直接返回
      return {
        success: true,
        roomId: roomId
      };
    }

    // 添加用户为玩家
    await db.collection('players').add({
      data: {
        _id: `${roomId}_${wxContext.OPENID}`,
        room_id: roomId,
        openid: wxContext.OPENID,
        nickname: wxContext.NICKNAME || `玩家${Math.floor(Math.random() * 1000)}`,
        avatar_url: wxContext.HEADIMGURL,
        current_score: 0,
        joined_at: db.serverDate()
      }
    });

    return {
      success: true,
      roomId: roomId
    };
  } catch (error) {
    console.error('检查房间失败:', error);
    return {
      success: false,
      message: error.message || '检查房间失败'
    };
  }
};