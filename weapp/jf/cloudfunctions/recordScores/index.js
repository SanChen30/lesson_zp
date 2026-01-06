const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  try {
    const { roomId, scores } = event;

    // 验证输入
    if (!roomId) {
      return {
        success: false,
        message: '房间ID不能为空'
      };
    }

    if (!Array.isArray(scores) || scores.length === 0) {
      return {
        success: false,
        message: '分数列表不能为空'
      };
    }

    // 验证分数总和是否为0
    const totalScore = scores.reduce((sum, item) => sum + item.score, 0);
    if (Math.abs(totalScore) > 0.001) { // 考虑浮点数精度问题
      return {
        success: false,
        message: `分数总和必须为0，当前总和为 ${totalScore}`
      };
    }

    // 获取房间信息
    const roomResult = await db.collection('rooms').doc(roomId).get();
    if (roomResult.data.length === 0) {
      return {
        success: false,
        message: '房间不存在'
      };
    }

    // 获取当前房间的记录数量，确定新的轮数
    const recordCountResult = await db.collection('records').where({
      room_id: roomId
    }).count();
    const newRoundNumber = recordCountResult.total + 1;

    // 开启事务以确保数据一致性
    const transaction = await db.startTransaction();

    try {
      // 添加记录
      await transaction.collection('records').add({
        data: {
          room_id: roomId,
          round_number: newRoundNumber,
          scores: scores,
          created_at: db.serverDate()
        }
      });

      // 更新玩家分数
      for (const scoreItem of scores) {
        await transaction.collection('players').doc(scoreItem.player_id).update({
          data: {
            current_score: _.inc(scoreItem.score)
          }
        });
      }

      // 提交事务
      await transaction.commit();
    } catch (transactionError) {
      // 如果事务失败，回滚
      await transaction.rollback();
      throw transactionError;
    }

    return {
      success: true,
      message: '记录成功'
    };
  } catch (error) {
    console.error('记录分数失败:', error);
    return {
      success: false,
      message: error.message || '记录分数失败'
    };
  }
};