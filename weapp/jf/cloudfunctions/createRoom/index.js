const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

// 生成6位随机房间号
function generateRoomNumber() {
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    const { moneyRatio } = event;

    // 验证输入
    if (typeof moneyRatio !== 'number' || moneyRatio <= 0) {
      return {
        success: false,
        message: '金钱比例必须是大于0的数字'
      };
    }

    // 生成唯一的房间号
    let roomNumber;
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 10) {
      roomNumber = generateRoomNumber();
      const existingRoom = await db.collection('rooms').where({
        room_number: roomNumber
      }).get();
      
      if (existingRoom.data.length === 0) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return {
        success: false,
        message: '生成房间号失败，请重试'
      };
    }

    // 创建房间
    const roomResult = await db.collection('rooms').add({
      data: {
        room_number: roomNumber,
        creator_id: wxContext.OPENID,
        money_ratio: moneyRatio,
        status: 'active',
        created_at: db.serverDate()
      }
    });

    const roomId = roomResult._id;

    // 添加创建者为玩家
    await db.collection('players').add({
      data: {
        _id: wxContext.OPENID,
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
      roomId: roomId,
      roomNumber: roomNumber
    };
  } catch (error) {
    console.error('创建房间失败:', error);
    return {
      success: false,
      message: error.message || '创建房间失败'
    };
  }
};