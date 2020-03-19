import Vue from 'vue';
import Vuex from 'vuex';
import toolList from './modules/toolList';
import quotesHistory from './modules/quotesHistory';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    toolList: toolList,
    quotesHistory: quotesHistory,
  },
});
