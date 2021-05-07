<!--把toast封装成一个plugin,解决简单组件需多次复用问题-->
<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
name: "Toast",
props:{
  // message:{
  //   type:String,
  //   default:''
  // },
  // show:{
  //   type:Boolean,
  //   default:false
  // }
},
data(){
  return {
    message:'',
    isshow:false
  }
},
methods:{
  show(message,duration){
    this.message = message
    this.isshow = true;


    setTimeout(() => {
      this.isshow = false;
      this.message = ''
    },duration)
  }
}
}
</script>

<style scoped>
 .toast{
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   color: #fff;
   padding: 8px 10px;
   background-color: rgba(0,0,0,.75);
   z-index: 999;
 }
</style>
