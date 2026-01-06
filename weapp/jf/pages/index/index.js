Page({
  data: {
    moneyRatio: 1,
    roomNumber: '',
    showCreateModal: false,
    showJoinModal: false
  },

  onLoad: function(options) {
    // 页面加载时的逻辑
  },

  createRoom: function() {
    // 显示自定义创建房间模态框
    this.setData({
      showCreateModal: true,
      moneyRatio: 1
    });
  },

  joinRoom: function() {
    // 显示自定义加入房间模态框
    this.setData({
      showJoinModal: true,
      roomNumber: ''
    });
  },

  // 输入金钱比例
  onMoneyRatioInput: function(e) {
    this.setData({
      moneyRatio: e.detail.value
    });
  },

  // 输入房间号
  onRoomNumberInput: function(e) {
    this.setData({
      roomNumber: e.detail.value
    });
  },

  // 确认创建房间
  confirmCreate: function() {
    const moneyRatio = parseFloat(this.data.moneyRatio) || 1;
    this.setData({
      showCreateModal: false
    });
    this.doCreateRoom(moneyRatio);
  },

  // 确认加入房间
  confirmJoin: function() {
    const roomNumber = this.data.roomNumber;
    if (!roomNumber || roomNumber.length !== 6) {
      wx.showToast({
        title: '请输入正确的6位房间号',
        icon: 'none'
      });
      return;
    }
    this.setData({
      showJoinModal: false
    });
    this.doJoinRoom(roomNumber);
  },

  // 取消创建
  cancelCreate: function() {
    this.setData({
      showCreateModal: false
    });
  },

  // 取消加入
  cancelJoin: function() {
    this.setData({
      showJoinModal: false
    });
  },

  doCreateRoom: function(moneyRatio) {
    wx.showLoading({
      title: '创建中...'
    });

    wx.cloud.callFunction({
      name: 'createRoom',
      data: {
        moneyRatio: moneyRatio
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result.success) {
        wx.showToast({
          title: '房间创建成功',
          icon: 'success'
        });
        wx.navigateTo({
          url: `/pages/room/room?roomId=${res.result.roomId}&creator=true`
        });
      } else {
        wx.showToast({
          title: res.result.message || '创建失败',
          icon: 'none'
        });
      }
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      });
      console.error('创建房间失败:', err);
    });
  },

  doJoinRoom: function(roomNumber) {
    wx.showLoading({
      title: '加入中...'
    });

    wx.cloud.callFunction({
      name: 'checkRoom',
      data: {
        roomNumber: roomNumber
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result.success) {
        wx.showToast({
          title: '加入成功',
          icon: 'success'
        });
        wx.navigateTo({
          url: `/pages/room/room?roomId=${res.result.roomId}&creator=false`
        });
      } else {
        wx.showToast({
          title: res.result.message || '加入失败',
          icon: 'none'
        });
      }
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      });
      console.error('加入房间失败:', err);
    });
  }
});