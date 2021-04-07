<template>
<div class="home">
 <nav-bar class="home-nav"><div slot="center">购物</div></nav-bar>
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view>
  <feature-view></feature-view>
  <tab-control :titles="titles" class="tab-control" @tabClick="tabClick"></tab-control>
  <good-list :goods="showGoods"></good-list>
</div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from '../../components/content/tabcontrol/TabControl';
import GoodList from "../../components/content/goods/GoodList";

import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendView from "./childcomps/RecommendView";
import FeatureView from "./childcomps/FeatureView";

import {getHomeMultidata,getHomeGoods} from 'network/home'


export default {
  name: "App",
  data() {
    return {
      banners:[],
      recommends:[],
      titles:['流行','新款','精选'],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop'
    }
  },
  components: {
    NavBar,
    TabControl,
    GoodList,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    tabClick(index){
      console.log(index);
      switch (index){
        case 0:
          this.currentType='pop';
          break
        case 1:{
          this.currentType='new';
          break
        }
        case 2:{
          this.currentType='sell';
          break
        }

      }
    },

    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        console.log(res);
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
      })
    }
  }
}
</script>

<style scoped>
.home{
  height: 3000px;
  padding-top: 44px;
}
.home-nav{
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:8;
  /*margin-bottom: 44px;*/
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 8;
}
</style>
