import axios from 'axios';

const toolList = {
  namespaced: true,
  state: {
    instruments: {},
  },
  mutations: {
    setData(state, data) {
      state.instruments = data;
    },
    updateData(state, { symbol, lastChangePcnt = 0 }) {
      state.instruments.find((instrument) => {
        if (instrument.symbol === symbol) {
          instrument.lastPrice += lastChangePcnt;
        }
      });
    },
  },
  actions: {
    fetch({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios({ method: 'get', url: '/instrument/active' })
          .then((response) => {
            commit('setData', response.data);
            resolve(state.instruments);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setSubscribe({ commit }) {
      return new Promise((resolve, reject) => {
        const msg = { op: 'subscribe', args: 'instrument' };
        const websocket = new WebSocket('wss://testnet.bitmex.com/realtime');
        websocket.onopen = () => {
          websocket.send(JSON.stringify(msg));
          resolve();
        };
        websocket.onerror = (event) => reject(event);
        websocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.action == 'insert') commit('updateData', data.data[0]);
        };
      });
    },
  },
  getters: {
    instruments: (s) => s.instruments,
  },
};

export default toolList;
