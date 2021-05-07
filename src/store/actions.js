import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'


export default {

  //在actions中进行重构，再发送到mutations中，方便跟踪
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

    return new Promise((resolve, reject) => {
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function (item){
        return item.iid === payload.iid
      })

      //2.判断oldProduct
      if (oldProduct){ //数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品+1')

      }else { //添加新的商品
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('新添加商品')
      }
    })


  }
}
