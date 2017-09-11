import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import Particulars from '@/components/singer/particulars'
import RecomDetails from '@/components/recommend/recomDetails'
import RankDetails from '@/components/rank/rankDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Recommend 
    },
    {
      path: '/recommend',
      component: Recommend 
    },
    {
      path: '/singer',
      component: Singer 
    },
    {
      path: '/rank',
      component: Rank 
    },
    {
      path: '/search',
      component: Search 
    },
    {
      path: '/childparticulars',
      component: Particulars 
    },
    {
      path: '/childrecomDetails',
      component: RecomDetails 
    },
    {
      path: '/childrankDetails',
      component: RankDetails 
    },
    {
      path: '*',
      component: Recommend
    },
  ]
})
