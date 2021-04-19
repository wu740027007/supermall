<template>
 <div class="tab-bar-item" @click="itemClick">
   <div v-if="!isActive">
     <slot name="item-icon"></slot>
   </div>
   <div v-else>
     <slot name="item-icon-actvie"></slot>
   </div>
   <div v-bind:style="activeStyle">
     <slot name="item-text"></slot>
   </div>


 </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //父传子
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    isActive(){
      // /home -> item1(/home) = true
      // /home -> item1(/category) = false
      // /home -> item1(/cart) = false
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item img{
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.active{
  color: blue;
}

</style>
