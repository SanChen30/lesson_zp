import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
  data: {
    roomId: '',
    roomInfo: {},
    players: [],
    settlements: [],
    moneyRatio: 0
  },

  onLoad(options) {
    const roomId = options.roomId;
    if (!roomId) {
      Toast('房间ID不能为空');
      return;
    }
    
    this.setData({ roomId });
    this.initSettlement();
  },

  // 初始化结算数据
  async initSettlement() {
    try {
      wx.showLoading({ title: '计算中...' });
      
      // 获取房间信息
      const roomResult = await wx.cloud.callFunction({
        name: 'getRoom',
        data: { roomId: this.data.roomId }
      });

      if (!roomResult.result.success) {
        Toast(roomResult.result.message || '获取房间信息失败');
        return;
      }

      const roomInfo = roomResult.result.data;
      this.setData({ roomInfo, moneyRatio: roomInfo.money_ratio });

      // 获取玩家信息
      const playersResult = await wx.cloud.callFunction({
        name: 'getPlayers',
        data: { roomId: this.data.roomId }
      });

      if (!playersResult.result.success) {
        Toast('获取玩家信息失败');
        return;
      }

      const players = playersResult.result.data;
      this.setData({ players });

      // 计算结算方案
      const settlements = this.calculateSettlements(players, roomInfo.money_ratio);
      this.setData({ settlements });

      wx.hideLoading();
    } catch (error) {
      console.error('初始化结算失败:', error);
      wx.hideLoading();
      Toast('计算失败');
    }
  },

  // 计算结算方案算法
  calculateSettlements(players, moneyRatio) {
    if (!players || players.length === 0) return [];

    // 计算每个人的应得/应付金额
    const playerBalances = players.map(player => ({
      id: player._id,
      nickname: player.nickname || '玩家',
      balance: player.current_score * moneyRatio // 转换为金额
    }));

    // 分离债权人和债务人
    const creditors = []; // 债权人（余额为正）
    const debtors = [];   // 债务人（余额为负）

    playerBalances.forEach(person => {
      if (person.balance > 0) {
        creditors.push({ ...person });
      } else if (person.balance < 0) {
        debtors.push({ ...person });
      }
    });

    // 确保数组顺序稳定
    creditors.sort((a, b) => b.balance - a.balance);
    debtors.sort((a, b) => a.balance - b.balance);

    const settlements = [];
    let creditorIndex = 0;
    let debtorIndex = 0;

    // 使用贪心算法进行结算
    while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
      const creditor = creditors[creditorIndex];
      const debtor = debtors[debtorIndex];

      const amount = Math.min(creditor.balance, Math.abs(debtor.balance));
      
      settlements.push({
        from: debtor.nickname,
        to: creditor.nickname,
        amount: Math.abs(amount).toFixed(2),
        description: `${debtor.nickname}支付${creditor.nickname}¥${Math.abs(amount).toFixed(2)}`
      });

      creditor.balance -= amount;
      debtor.balance += amount;

      // 如果债权人余额清零，移到下一个
      if (creditor.balance <= 0.001) { // 考虑浮点数精度问题
        creditorIndex++;
      }
      
      // 如果债务人余额清零，移到下一个
      if (debtor.balance >= -0.001) { // 考虑浮点数精度问题
        debtorIndex++;
      }
    }

    return settlements;
  },

  // 复制结算方案
  copySettlement() {
    const settlementText = this.data.settlements.map(item => 
      `${item.from} 支付 ${item.to} ${item.amount}元`
    ).join('\n');

    if (settlementText) {
      wx.setClipboardData({
        data: settlementText,
        success: () => {
          Toast('已复制到剪贴板');
        }
      });
    } else {
      Toast('暂无结算方案');
    }
  },

  // 返回房间
  backToRoom() {
    wx.navigateBack();
  }
});