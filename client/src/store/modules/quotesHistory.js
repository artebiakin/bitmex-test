import axios from 'axios';

const quotesHistory = {
  namespaced: true,
  state: {
    quotes: {},
  },
  mutations: {
    setQuotes(state, data) {
      state.quotes = data;
    },
    updateQuotes(state, quote) {
      state.quotes.pop();
      state.quotes.unshift(quote);
    },
  },
  actions: {
    fetch({ commit, state }, symbol) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${symbol}`)
          .then((response) => {
            commit('setQuotes', response.data);
            resolve(state.quotes);
          })
          .catch((error) => reject(error));
      });
    },
    setSubscribe(state, symbol) {
      return new Promise((resolve, reject) => {
        const msg = { op: 'subscribe', args: `tradeBin1m:${symbol}` };
        const websocket = new WebSocket('wss://testnet.bitmex.com/realtime');
        websocket.onopen = () => {
          websocket.send(JSON.stringify(msg));
          resolve();
        };
        websocket.onerror = (event) => reject(event);
        websocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.action == 'insert') state.commit('updateQuotes', data.data[0]);
        };
      });
    },
  },
  modules: {},
  getters: {
    quotes: (s) => s.quotes,
  },
};

export default quotesHistory;
