import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer'
import Rank from '../components/rank/rank'
import Search from '../components/search/search'
import SingerDetail from '../components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path:':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        keepAlive: false
      }
    }
  ]
})
