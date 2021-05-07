<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button" @click.native="checkClick">
      </check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>

import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'


export default {
 name: "CartButtomBar",
 components:{
  CheckButton
},
 computed:{
   ...mapGetters(['cartList']),
   totalPrice(){
     return '￥' + this.cartList.filter(item => {
       return item.checked
     }).reduce((preValue,item) => {
       return preValue + item.price * item.count
     },0).toFixed(2)
   },

   checkLength(){
     return this.cartList.filter(item => item.checked).length
   },
   isSelectAll(){
     //如果添加的商品中有不被选中的，并且返回了长度，则通过！取反得到false
     //使用filter函数
     // return !(this.cartList.filter(item => !item.checked).length)

     //使用find函数
     // return !this.cartList.find(item => !item.checked)

     //使用普通遍历
     // for(let item of this.cartList){
     //   if(!item.checked)
     //     return false
     // }
     // return true

     //使用every函数
     if(this.cartList.length === 0) return  false
     return this.cartList.every(item => item.checked)
   }

 },
 methods:{
   checkClick(){
     //原来都是选中的，点击一次则全部不选中
     if(this.isSelectAll){
       this.cartList.forEach(item => item.checked = false)
     }else { //原来部分不选中，或者全部不选中，点击一次全部选中
       this.cartList.forEach(item => item.checked = true)
     }
   },
   calcClick(){
     if(!this.isSelectAll){
       this.$toast.show('请选择购买的商品',2000)
     }
   }


 }
}
</script>

<style scoped>

 .bottom-bar{
   position: relative;
   display: flex;

   height: 40px;
   line-height: 40px;
   font-size: 14px;

   background-color: #eee;



 }

 .check-content{
   display: flex;
   align-items: center;
   margin-left: 10px;
   width: 58px;

 }

 .check-button{
   height: 21px;
   width:21px;
   line-height: 21px;
   margin-right: 5px;
 }

 .price{
   margin-left: 20px;
   flex: 1;
 }

 .calculate{
   width: 90px;
   background-color: red;
   color: white;
   text-align: center;
 }
</style>
