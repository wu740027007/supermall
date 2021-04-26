import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
   mounted(){
   }
}

export const backTopMixin ={
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false,
    }
  },

  methods:{
    //返回顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);

    },
  }
}
