import Vue from 'vue';
import Vuex from 'vuex';
import commonStore from './commonStore';
import searchStore from './searchStore';
import createLogger from 'common/logger';

Vue.use(Vuex)
// console.log(Vuex);
// Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    commonStore,searchStore
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
