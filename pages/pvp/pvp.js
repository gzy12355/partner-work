// pages/pvp/pvp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  touzi1:1,
  touzi2:1,
  touzitupian1:'/image/1.jpg',
  touzitupian2:'/image/1.jpg',
  isDistabled1:true,
  isDistabled2:true, 
  GG:0,
  sum1:0,
  sum2:0,
  point1:[
    [0,0,0],[0,0,0],[0,0,0]
  ],
  point2:[
    [0,0,0],[0,0,0],[0,0,0]
  ]
  },
  yaotouzi1(){
   this.setData({
     touzi1:Math.floor(Math.random()*6 + 1)
    })
   this.setData({
     touzitupian1:'/image/' + this.data.touzi1 +'.jpg'
     })
  },
  yaotouzi2(){
    this.setData({
      touzi2:Math.floor(Math.random()*6 + 1)
    })
    this.setData({
      touzitupian2:'/image/' + this.data.touzi2 +'.jpg'
      })
  },
  changepoint1(e){
    let i,j
    let index1 = e.target.dataset.id
    let index2 = e.target.dataset.sid
    let pointa = this.data.point1
    let pointb = this.data.point2
    pointa[index1][index2] = this.data.touzi1
    this.setData({
              point1:pointa
            })
    // 设置己方在点击任意格子之后无法再进行点击
    this.setData({
              isDisabled2:false,
              isDisabled1:true
            })
    for(i=0;i<3;i++)
    {
      if(this.data.touzi1 == pointb[i][index2]){
        pointb[i][index2]=0
      }
    }      
    this.setData({
      point2:pointb
    })
    
    


    // ------------------------------------------------动态更新point1的分数
    let sum=0
    let GG_temp = 1
    for(i=0;i<3;i++)
    { 
      let count7 = [0,0,0,0,0,0,0] 
      for(j=0;j<3;j++){
        let temp = this.data.point1[j][i]
        // temp 1~6
        count7[temp]++
        // 判断是否GG
        if(temp == 0)
        {
          GG_temp = 0
        }
       
      }
      for(j=1;j<7;j++)
      {
        sum += j*count7[j]*count7[j]
      }
    }
    this.setData({
      sum1:sum
    })

    // -----------------------------------------动态更新point2的分数
    sum=0
    for(i=0;i<3;i++)
    { 
      let count7 = [0,0,0,0,0,0,0] 
      for(j=0;j<3;j++){
        let temp = this.data.point2[j][i]
        // temp 1~6
        count7[temp]++
        
      }
      for(j=1;j<7;j++)
      {
        sum += j*count7[j]*count7[j]
      }
    }
    this.setData({
      sum2:sum,
      GG:GG_temp
    })
    //游戏结束产生赢家的弹窗
    if(GG_temp==1){
      if(this.data.sum1>this.data.sum2){
        wx.showToast({
          title: 'winner:playerA!!!!',
          icon:'none',
          image:'/image/gg.jpg',
          duration: 2000//持续的时间
        })
      }
      else if(this.data.sum1<this.data.sum2){
        wx.showToast({
          title: 'winner:playerB!!!!',
          icon:'none',
          image:'/image/gg.jpg',
          duration: 2000//持续的时间
        })
      }
      else{
        wx.showToast({
          title: 'you both are the real winners!!!!',
          icon:'none',  
          image:'/image/homelander.jpg',
          duration: 2000//持续的时间
        })
      }
    }
    else{
      wx.showToast({
        title: '玩家B的回合',
        icon:'none',
        duration: 2000//持续的时间
      })
    }


  },
  changepoint2(e){
    let i,j
    let index1 = e.target.dataset.id
    let index2 = e.target.dataset.sid
    let pointa = this.data.point1
    let pointb = this.data.point2
    pointb[index1][index2] = this.data.touzi2
    this.setData({
              point2:pointb
            })
    // 设置己方在点击任意格子之后无法再进行点击
    this.setData({
              isDisabled2:true,
              isDisabled1:false
            })

            
    for(i=0;i<3;i++)
    {
      if(this.data.touzi2 == pointa[i][index2]){
        pointa[i][index2]=0
      }
    }      
    this.setData({
      point1:pointa
    })
    

    // -----------------------------------------动态更新point2的分数
    let GG_temp = 1
    let sum=0
    for(i=0;i<3;i++)
    { 
      let count7 = [0,0,0,0,0,0,0] 
      for(j=0;j<3;j++){
        let temp = this.data.point2[j][i]
        // temp 1~6
        count7[temp]++
        // 判断是否GG
        if(temp == 0)
        {
          GG_temp = 0
        }
      }
      for(j=1;j<7;j++)
      {
        sum += j*count7[j]*count7[j]
      }
    }
    this.setData({
      sum2:sum
     
    })

    // -----------------------------------------------动态更新point1的分数
    sum=0
    for(i=0;i<3;i++)
    { 
      let count7 = [0,0,0,0,0,0,0] 
      for(j=0;j<3;j++){
        let temp = this.data.point1[j][i]
        // temp 1~6
        count7[temp]++
      }
      for(j=1;j<7;j++)
      {
        sum += j*count7[j]*count7[j]
      }
    }
    this.setData({
      sum1:sum,
      GG:GG_temp
    })
    //游戏结束产生赢家的弹窗
    if(GG_temp==1){
      if(this.data.sum1>this.data.sum2){
        wx.showToast({
          title: 'winner:playerA!!!!',
          icon:'none',
          image:'/image/gg.jpg',
          duration: 2000//持续的时间
        })
       
      }
      else if(this.data.sum1<this.data.sum2){
        wx.showToast({
          title: 'winner:playerB!!!!',
          icon:'none',
          image:'/image/gg.jpg',
          duration: 2000//持续的时间
        })
      }
      else{
        wx.showToast({
          title: 'you both are the real winners!!!!',
          icon:'none',  
          image:'/image/homelander.jpg',
          duration: 2000//持续的时间
        })
      }
    }
    else{
      wx.showToast({
        title: '玩家A的回合',
        icon:'none',
        duration: 1000//持续的时间
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.audioCtx = wx.createAudioContext('music');
    this.audioCtx.play()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.audioCtx.pause()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})