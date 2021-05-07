<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from 'components/content/backTop/BackTop'



import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";


import {getDetail,Goods,Shop,getRecommend} from "network/detail";
import {GoodsParam} from "network/detail";
import {debounce} from "common/utils";
import {backTopMixin} from "common/mixin";


export default {
  name: "Detail",
  mixins:[backTopMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      detailImages:[],
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      // message:'',
      // show:false


    }
  },
  components:{
    DetailGoodsInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    Scroll,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast


  },

  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的图片轮播数据
      const data =res.result;
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      //1.第一次获取，值不对
      //值不对的原因：this.$refs.params.$el压根没有渲染
      // this.themeTopYs = []
      //
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)



      // this.$nextTick(() => {
      //   //2.第二次获取：值不对的原因是图片没有计算在内
      //   //根据最新的数据，对应的Dom是已经被渲染出来
      //   //但是图片依然是没有加载完（目前获取到的offsetTop是不包含其中的图片）
      //   // offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = []
      //
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },100)



  },

  methods:{

    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()

    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1500)
    },
    contentScroll(position){
      // console.log(position);
      //1.获取y值
      const positionY = -position.y

      let length = this.themeTopYs.length
      //2.positionY和主题中值进行对比
      for(let i=0;i<length-1;i++){
        //第一种方法
        // 防止i+1溢出
        // if(this.currentIndex !== i &&((i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
        // ||(i === length - 1 && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i;
          // console.log(i);
        //   this.$refs.nav.currentIndex = this.currentIndex
        //
        //
        // }

        //第二种方法 手动在themeTopYs数组中加一个很大的数
        if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }

        //3.是否显示回到顶部
        this.isShowBackTop = Math.abs(position.y)> 1000
      }

    },
    // backClick(){
    //   this.$refs.scroll.scrollTo(0,0,500);
    //
    // },
    //将商品加入到购物车
    addToCart(){
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice
      product.iid = this.iid;

      //2.将商品添加到购物车
      // this.$store.commit('addCart',product)
      //可以使用{mapActions}进行映射,然后使用...mapActions,就可以直接通过this.addCart进行调用
      this.$store.dispatch('addCart',product).then(res => {
        // this.show = true;
        // this.message = res
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)
        // // console.log(res);
        this.$toast.show(res,1500)
      })
    }





  }
}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }

 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }

 .content{
   height: calc(100% - 44px - 49px);
 }
</style>
