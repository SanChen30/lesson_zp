Page({
  data: {
    roomId: '',
    roomInfo: {},
    players: [],
    records: [],
    showScoring: false,
    playerScores: {},
    scoreSum: 0,
    watcher: null,
    gameRecords: []
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
    if (!this.data.watcher) {
      this.startWatcher();
    }
  },

  onUnload() {
    if (this.data.watcher) {
      this.data.watcher.close();
    }
  },

  async initRoom() {
    try {
      wx.showLoading({ title: '加载中...' });
      
      const roomResult = await wx.cloud.callFunction({
        name: 'getRoom',
        data: { roomId: this.data.roomId }
      });

      if (!roomResult.result.success) {
        wx.showToast({
          title: roomResult.result.message || '获取房间信息失败',
          icon: 'none'
        });
        return;
      }

      const roomInfo = roomResult.result.data;
      this.setData({ roomInfo });

      const playersResult = await wx.cloud.callFunction({
        name: 'getPlayers',
        data: { roomId: this.data.roomId }
      });

      if (playersResult.result.success) {
        this.updatePlayersList(playersResult.result.data);
      }

      const recordsResult = await wx.cloud.callFunction({
        name: 'getRecords',
        data: { roomId: this.data.roomId }
      });

      if (recordsResult.result.success) {
        const gameRecords = recordsResult.result.data;
        this.setData({ gameRecords });
        if (this.data.players.length > 0) {
          this.updatePlayersList(this.data.players);
        }
      }

      wx.hideLoading();
      this.startWatcher();
    } catch (error) {
      console.error('初始化房间失败:', error);
      wx.hideLoading();
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  },

  startWatcher() {
    const db = wx.cloud.database();
    
    const playerWatcher = db.collection('players')
      .where({ room_id: this.data.roomId })
      .watch({
        onChange: (snapshot) => {
          this.updatePlayersList(snapshot.docs);
        },
        onError: (error) => {
          console.error('监听玩家数据变化失败:', error);
        }
      });

    const recordWatcher = db.collection('records')
      .where({ room_id: this.data.roomId })
      .watch({
        onChange: (snapshot) => {
          const sortedRecords = snapshot.docs.sort((a, b) => b.round_number - a.round_number);
          this.setData({ records: sortedRecords });
          this.setData({ gameRecords: snapshot.docs });
          this.updatePlayersList(this.data.players);
        },
        onError: (error) => {
          console.error('监听记录数据变化失败:', error);
        }
      });

    this.setData({
      watcher: {
        playerWatcher,
        recordWatcher
      }
    });
  },

  updatePlayersList(players) {
    const playerScores = {};
    
    players.forEach(player => {
      playerScores[player.openid] = 0;
    });

    this.data.gameRecords.forEach(record => {
      Object.keys(record.scores).forEach(openid => {
        playerScores[openid] += record.scores[openid] || 0;
      });
    });

    const playersWithScores = players.map(player => {
      const currentScore = playerScores[player.openid] || 0;
      const money = currentScore * (this.data.roomInfo?.money_ratio || 1);
      return {
        ...player,
        current_score: currentScore,
        current_money: money.toFixed(2)
      };
    });

    this.setData({
      players: playersWithScores
    });
  },

  showScoringModal() {
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

  hideScoringModal() {
    this.setData({
      showScoring: false,
      playerScores: {},
      scoreSum: 0
    });
  },

  onScoreChange(event) {
    const playerId = event.currentTarget.dataset.playerId;
    const value = event.detail.value;
    
    const newPlayerScores = { ...this.data.playerScores };
    newPlayerScores[playerId] = value;
    
    let sum = 0;
    Object.values(newPlayerScores).forEach(score => {
      const num = parseFloat(score);
      if (!isNaN(num)) {
        sum += num;
      }
    });
    
    this.setData({
      playerScores: newPlayerScores,
      scoreSum: Math.round(sum * 100) / 100
    });
  },

  async confirmScores() {
    if (this.data.scoreSum !== 0) {
      wx.showToast({
        title: '分数总和必须为0',
        icon: 'none'
      });
      return;
    }

    try {
      wx.showLoading({ title: '提交中...' });
      
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

      const result = await wx.cloud.callFunction({
        name: 'recordScores',
        data: {
          roomId: this.data.roomId,
          scores: scores
        }
      });

      wx.hideLoading();

      if (result.result.success) {
        wx.showToast({
          title: '记录成功',
          icon: 'success'
        });
        this.hideScoringModal();
      } else {
        wx.showToast({
          title: result.result.message || '记录失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('记录分数失败:', error);
      wx.hideLoading();
      wx.showToast({
        title: '记录失败',
        icon: 'none'
      });
    }
  },

  endGame() {
    wx.navigateTo({
      url: `/pages/settlement/settlement?roomId=${this.data.roomId}`
    });
  },

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