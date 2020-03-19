<template>
  <div>
    <table class="table table-striped table-dark">
      <tr>
        <td colspan="7">История ордеров</td>
      </tr>
      <tr>
        <th>Дата создания</th>
        <th>Валютная пара</th>
        <th>Тип</th>
        <th>Цена создания</th>
        <th>Объем</th>
        <th>Состояние</th>
        <th>id</th>
      </tr>
      <tr v-for="data in data" :key="data.id">
        <td>{{ getDate(data.timestamp) }}</td>
        <td>{{ data.symbol }}</td>
        <td>{{ data.side }}</td>
        <td>{{ data.price }}</td>
        <td>{{ data.orderQty }}</td>
        <td>{{ data.ordStatus }}</td>
        <td>{{ data.orderID }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import crypto from 'crypto';
import { API_KEY, API_SECRET } from '../secrete';

export default {
  data() {
    return {
      data: {},
      REQUEST_EXPIRES_TIMEOUT_SEC: 60,
      websocket: null,
      subscribe: false,
    };
  },
  methods: {
    createSignature(...args) {
      const reducer = args.reduce((accumulator, value) => accumulator + value);
      return crypto
        .createHmac('sha256', API_SECRET)
        .update(reducer)
        .digest('hex');
    },
    getDate(timestamp) {
      const date = new Date(timestamp);
      const y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      const m = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
      const d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
      return `${d}.${m}.${y}`;
    },
  },
  created() {
    /* 
      Загрузка истории заказов.
    */
    const expires = Math.round(new Date().getTime() / 1000) + this.REQUEST_EXPIRES_TIMEOUT_SEC;

    this.$axios({
      method: 'GET',
      url: '/order',
      headers: {
        contentType: 'application/json',
        'api-expires': expires,
        'api-key': API_KEY,
        'api-signature': this.createSignature('GET', '/api/v1/order', expires, ''),
      },
    })
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 30vh;
  overflow: hidden;
}
</style>
