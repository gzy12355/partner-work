// pages/pve/pve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touzitupian1:'/image/1.jpg',
    touzitupian2:'/image/1.jpg',
    isDistabled1:true,
    isDistabled2:true,
    touzi1:1,
    touzi2:1,
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
   yaotouzi2(){
     this.setData({
       touzi2:Math.floor(Math.random()*6 + 1)
     })
     this.setData({
      touzitupian2:'/image/' + this.data.touzi2 +'.jpg'
      })
   },
   changepoint2(e){
    //  填格子
     let i,j
     let index1 = e.target.dataset.id
     let index2 = e.target.dataset.sid
     let pointa = this.data.point1
     let pointb = this.data.point2
     pointb[index1][index2] = this.data.touzi2
           
  // ---------------------------------------------------
  // 消格子
     for(i=0;i<3;i++)
     {
       if(this.data.touzi2 == pointa[i][index2]){
         pointa[i][index2]=0
       }
     }      
     this.setData({
       point1:pointa,
       point2:pointb
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
           title: 'winner:Robot!!!!',
           icon:'none',
           image:'/image/gg.jpg',
           duration: 2000//持续的时间
         })
       }
       else if(this.data.sum1<this.data.sum2){
         wx.showToast({
           title: 'winner:You!!!!',
           icon:'none',
           image:'/image/gg.jpg',
           duration: 2000//持续的时间
         })
       }
        else {
         wx.showToast({
           title: 'You both are the real winners!!!!',
           icon:'none',  
           image:'/image/homelander.jpg',
           duration: 2000//持续的时间
         })
       }
     }
     
     else if(GG_temp!=1 ){
       wx.showToast({
         title: '机器人的回合',
         icon:'none',
         duration: 1000//持续的时间
       })
      //  --------------------------------------
      //  机器人摇骰子

       this.setData({
        touzi1:Math.floor(Math.random()*6 + 1)
      })
      this.setData({
        touzitupian1:'/image/' + this.data.touzi1 +'.jpg'
        })


      //---------------------------------------------- 
      // 算法 求index_1和index_2
      let pointa_temp = [[0,0,0],[0,0,0],[0,0,0]] 
      let pointb_temp = [[0,0,0],[0,0,0],[0,0,0]] 
      pointa_temp = pointa
      pointb_temp = pointb
      let max = -200
      let a,b,c,d 
      let index_1 = 0
      let index_2 = 0

      for(i=0;i<3;i++){
        for(j=0;j<3;j++){       
            let sum3 = 0
            let sum4 = 0
            if(pointa_temp[i][j]==0){
              // 填入格子
              pointa_temp[i][j] = this.data.touzi1
              // 消pointb_temp格子
              for(d=0;d<3;d++){
                  if(pointb_temp[d][j] == this.data.touzi1){
                      pointb_temp[d][j] = 0
                      }
                } 
              // 算出填入此位置时pointa_temp的总分
              for(a=0;a<3;a++){ 
                  let count7 = [0,0,0,0,0,0,0] 
                  for( b=0;b<3;b++){
                    let temp = pointa_temp[b][a]
                    // temp 1~6
                    count7[temp]++       
                    }
                  for( c=1;c<7;c++){
                    sum3 += c*count7[c]*count7[c]
                    }
                  }
              pointa_temp[i][j] = 0        
              // 求消掉格子后的pointb_temp的总分
              for(a=0;a<3;a++){ 
                let count7 = [0,0,0,0,0,0,0] 
                for( b=0;b<3;b++){
                  let temp = pointb_temp[b][a]
                  // temp 1~6
                  count7[temp]++       
                  }
                for( c=1;c<7;c++){
                  sum4 += c*count7[c]*count7[c]
                  }   
                }
              // 求sum3-sum4
              if((sum3-sum4)>max){
                max = sum3-sum4
                index_1 = i
                index_2 = j
                }            
              }
          else continue  
          }  
        }
      

      
      // 填格子
      pointa[index_1][index_2] = this.data.touzi1
      //  消格子
      for(i=0;i<3;i++)
        {
          if(this.data.touzi1 == pointb[i][index_2]){
            pointb[i][index_2]=0
          }
        }
      // 更新棋盘
      this.setData({
          point1:pointa,
          point2:pointb
        })
      
        // ------------------------------------------------动态更新point1的分数
         sum=0
         GG_temp = 1
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
              title: 'winner:Robot!!!!',
              icon:'none',
              image:'/image/gg.jpg',
              duration: 2000//持续的时间
            })
          }
          else if(this.data.sum1<this.data.sum2){
            wx.showToast({
              title: 'winner:You!!!!',
              icon:'none',
              image:'/image/gg.jpg',
              duration: 2000//持续的时间
            })
          }
          else{
            wx.showToast({
              title: 'You both are the real winners!!!!',
              icon:'none',  
              image:'/image/homelander.jpg',
              duration: 2000//持续的时间
            })
          }
        }
        else{
          wx.showToast({
            title: '你的回合',
            icon:'none',
            duration: 2000//持续的时间
          })
        }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

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