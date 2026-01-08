Page({
  data: {
    showCreateModal: false,
    showJoinModal: false,
    newRoomId: '',
    joinRoomId: '',
    moneyRatio: 1,
    recentRooms: []
  },

  onLoad() {
    this.loadRecentRooms();
  },

  showCreateModal() {
    this.setData({ showCreateModal: true });
  },

  hideCreateModal() {
    this.setData({ 
      showCreateModal: false,
      newRoomId: ''
    });
  },

  showJoinModal() {
    this.setData({ showJoinModal: true });
  },

  hideJoinModal() {
    this.setData({ 
      showJoinModal: false,
      joinRoomId: ''
    });
  },

  onNewRoomIdChange(event) {
    this.setData({ newRoomId: event.detail.value });
  },

  onJoinRoomIdChange(event) {
    this.setData({ joinRoomId: event.detail.value });
  },

  onMoneyRatioChange(event) {
    this.setData({ moneyRatio: event.detail.value });
  },

  async createRoom() {
    const roomId = this.data.newRoomId.trim();
    const moneyRatio = parseFloat(this.data.moneyRatio);

    if (!roomId) {
      wx.showToast({
        title: '请输入房间号',
        icon: 'none'
      });
      return;
    }

    if (isNaN(moneyRatio) || moneyRatio <= 0) {
      wx.showToast({
        title: '请输入有效的金钱比例',
        icon: 'none'
      });
      return;
    }

    try {
      wx.showLoading({ title: '创建中...' });

      const result = await wx.cloud.callFunction({
        name: 'createRoom',
        data: {
          roomId,
          moneyRatio
        }
      });

      wx.hideLoading();

      if (result.result.success) {
        // 保存到最近房间
        this.saveRecentRoom(roomId, 0);
        
        wx.navigateTo({
          url: `/pages/room/room?roomId=${roomId}`
        });
      } else {
        wx.showToast({
          title: result.result.message || '创建失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('创建房间失败:', error);
      wx.hideLoading();
      wx.showToast({
        title: '创建失败',
        icon: 'none'
      });
    }
  },

  async joinRoom() {
    const roomId = this.data.joinRoomId.trim();

    if (!roomId) {
      wx.showToast({
        title: '请输入房间号',
        icon: 'none'
      });
      return;
    }

    try {
      wx.showLoading({ title: '加入中...' });

      const result = await wx.cloud.callFunction({
        name: 'checkRoom',
        data: { roomId }
      });

      wx.hideLoading();

      if (result.result.success) {
        // 保存到最近房间
        this.saveRecentRoom(roomId, result.result.data.player_count || 0);
        
        wx.navigateTo({
          url: `/pages/room/room?roomId=${roomId}`
        });
      } else {
        wx.showToast({
          title: result.result.message || '房间不存在',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('加入房间失败:', error);
      wx.hideLoading();
      wx.showToast({
        title: '加入失败',
        icon: 'none'
      });
    }
  },

  async joinRecentRoom(event) {
    const roomId = event.currentTarget.dataset.roomId;

    try {
      wx.showLoading({ title: '加入中...' });

      const result = await wx.cloud.callFunction({
        name: 'checkRoom',
        data: { roomId }
      });

      wx.hideLoading();

      if (result.result.success) {
        wx.navigateTo({
          url: `/pages/room/room?roomId=${roomId}`
        });
      } else {
        wx.showToast({
          title: result.result.message || '房间不存在',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('加入房间失败:', error);
      wx.hideLoading();
      wx.showToast({
        title: '加入失败',
        icon: 'none'
      });
    }
  },

  saveRecentRoom(roomId, playerCount) {
    try {
      let recentRooms = wx.getStorageSync('recentRooms') || [];
      // 移除已存在的相同房间号
      recentRooms = recentRooms.filter(room => room.room_number !== roomId);
      // 添加新房间到开头
      recentRooms.unshift({
        room_number: roomId,
        player_count: playerCount,
        timestamp: Date.now()
      });
      // 只保留最近的10个房间
      recentRooms = recentRooms.slice(0, 10);
      wx.setStorageSync('recentRooms', recentRooms);
      this.setData({ recentRooms });
    } catch (error) {
      console.error('保存最近房间失败:', error);
    }
  },

  loadRecentRooms() {
    try {
      const recentRooms = wx.getStorageSync('recentRooms') || [];
      this.setData({ recentRooms });
    } catch (error) {
      console.error('加载最近房间失败:', error);
      this.setData({ recentRooms: [] });
    }
  }
});