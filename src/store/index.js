import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCounter(state,payload){
      payload.count++
    },
    addTocart(state,payload){
      state.cartList.push(payload)
    }
  },
  //在actions中进行重构，再发送到mutations中，方便跟踪
  actions:{
    //mutations唯一的目的就是修改State中的状态
    //mutations中的每个方法尽可能完成的时间比较单一一点
    addCart(context,payload){
      //payload新添加的商品
      // let oldProduct = null;
      // //判断原来的数组中是否有同一个商品
      // for(let item of state.cartList){
      //   if (item.iid === payload.iid){
      //       oldProduct = item
      //   }
      // }
      //

      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function (item){
        return item.iid === payload.iid
      })

      //2.判断oldProduct
      if (oldProduct){
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)

      }else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addTocart',payload)
      }





    }
  }
})


//3.挂载到Vue实例上
export default store
