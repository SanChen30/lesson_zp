Page({
  data: {
    roomId: '',
    roomInfo: {},
    players: [],
    records: [],
    showScoring: false,
    playerScores: {},
    scoreSum: 0,
    watcher: null
  },

  onLoad(options) {
    const roomId = options.roomId;
    if (!roomId) {
      wx.showToast({
        title: '房间ID不能为空',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ roomId });
    this.initRoom();
  },

  onShow() {
    // 页面显示时重新连接实时监听
    if (!this.data.watcher) {
      this.startWatcher();
    }
  },

  onUnload() {
    // 页面卸载时断开实时监听
    if (this.data.watcher) {
      this.data.watcher.close();
    }
  },

  // 初始化房间数据
  async initRoom() {
    try {
      wx.showLoading({ title: '加载中...' });
      
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
      this.setData({ roomInfo });

      // 获取玩家信息
      const playersResult = await wx.cloud.callFunction({
        name: 'getPlayers',
        data: { roomId: this.data.roomId }
      });

      if (playersResult.result.success) {
        this.setData({ players: playersResult.result.data });
      }

      // 获取记录信息
      const recordsResult = await wx.cloud.callFunction({
        name: 'getRecords',
        data: { roomId: this.data.roomId }
      });

      if (recordsResult.result.success) {
        this.setData({ records: recordsResult.result.data });
      }

      wx.hideLoading();

      // 开始实时监听数据变化
      this.startWatcher();
    } catch (error) {
      console.error('初始化房间失败:', error);
      wx.hideLoading();
      Toast('加载失败');
    }
  },

  // 开始实时监听数据变化
  startWatcher() {
    const db = wx.cloud.database();
    
    // 监听玩家数据变化
    const playerWatcher = db.collection('players')
      .where({ room_id: this.data.roomId })
      .watch({
        onChange: (snapshot) => {
          console.log('玩家数据变化:', snapshot);
          this.setData({ players: snapshot.docs });
        },
        onError: (error) => {
          console.error('监听玩家数据变化失败:', error);
        }
      });

    // 监听记录数据变化
    const recordWatcher = db.collection('records')
      .where({ room_id: this.data.roomId })
      .watch({
        onChange: (snapshot) => {
          console.log('记录数据变化:', snapshot);
          // 按轮数排序
          const sortedRecords = snapshot.docs.sort((a, b) => b.round_number - a.round_number);
          this.setData({ records: sortedRecords });
        },
        onError: (error) => {
          console.error('监听记录数据变化失败:', error);
        }
      });

    // 保存监听器引用
    this.setData({
      watcher: {
        playerWatcher,
        recordWatcher
      }
    });
  },

  // 显示计分模态框
  showScoringModal() {
    // 初始化玩家分数对象
    const playerScores = {};
    this.data.players.forEach(player => {
      playerScores[player._id] = '';
    });
    
    this.setData({
      showScoring: true,
      playerScores,
      scoreSum: 0
    });
  },

  // 隐藏计分模态框
  hideScoringModal() {
    this.setData({
      showScoring: false,
      playerScores: {},
      scoreSum: 0
    });
  },

  // 分数输入变化
  onScoreChange(event) {
    const playerId = event.currentTarget.dataset.playerId;
    const value = event.detail.value;
    
    const newPlayerScores = { ...this.data.playerScores };
    newPlayerScores[playerId] = value;
    
    // 计算总和
    let sum = 0;
    Object.values(newPlayerScores).forEach(score => {
      const num = parseFloat(score);
      if (!isNaN(num)) {
        sum += num;
      }
    });
    
    this.setData({
      playerScores: newPlayerScores,
      scoreSum: Math.round(sum * 100) / 100 // 避免浮点数精度问题
    });
  },

  // 确认分数
  async confirmScores() {
    if (this.data.scoreSum !== 0) {
      Toast('分数总和必须为0');
      return;
    }

    try {
      wx.showLoading({ title: '提交中...' });
      
      // 准备分数数据
      const scores = [];
      for (const [playerId, scoreStr] of Object.entries(this.data.playerScores)) {
        const score = parseFloat(scoreStr);
        if (!isNaN(score)) {
          scores.push({
            player_id: playerId,
            score: score
          });
        }
      }

      // 调用云函数提交分数
      const result = await wx.cloud.callFunction({
        name: 'recordScores',
        data: {
          roomId: this.data.roomId,
          scores: scores
        }
      });

      wx.hideLoading();

      if (result.result.success) {
        Toast('记录成功');
        this.hideScoringModal();
      } else {
        Toast(result.result.message || '记录失败');
      }
    } catch (error) {
      console.error('记录分数失败:', error);
      wx.hideLoading();
      Toast('记录失败');
    }
  },

  // 结束游戏/结算
  endGame() {
    wx.navigateTo({
      url: `/pages/settlement/settlement?roomId=${this.data.roomId}`
    });
  },

  // 格式化记录显示
  formatRecord(scores) {
    if (!scores || !Array.isArray(scores)) return '';
    
    return scores.map(item => {
      const player = this.data.players.find(p => p._id === item.player_id);
      const name = player ? player.nickname || '玩家' : '未知';
      const sign = item.score >= 0 ? '+' : '';
      return `${name}${sign}${item.score}`;
    }).join(', ');
  }
});