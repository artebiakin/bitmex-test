<template>
  <div class="form">
    <input
      class="form-control"
      v-model.number="volume"
      type="number"
      @keypress="onlyNumber"
      :disabled="isDisabled"
    />
    <section>
      <button class="btn btn-dark" @click="submit('Buy')" :disabled="isDisabled">Купить</button>
      <button class="btn btn-dark" @click="submit('Sell')" :disabled="isDisabled">Продать</button>
    </section>
  </div>
</template>
<script>
import { API_KEY, API_SECRET } from '../secrete';
import crypto from 'crypto';

export default {
  data() {
    return {
      volume: 1,
      isDisabled: true,
      symbol: null,
      REQUEST_EXPIRES_TIMEOUT_SEC: 60,
    };
  },
  methods: {
    /* 
      Блокирует все не числовые значения.
    */
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    createSignature(...args) {
      const reducer = args.reduce((accumulator, value) => accumulator + value);
      return crypto
        .createHmac('sha256', API_SECRET)
        .update(reducer)
        .digest('hex');
    },
    submit(side) {
      /* 
        Метод вызывается при клике на одну из кнопок "Купить" или "Продать".
      */
      const expires = Math.round(new Date().getTime() / 1000) + this.REQUEST_EXPIRES_TIMEOUT_SEC;
      const data = { ordType: 'Market', symbol: this.symbol, orderQty: this.volume, side };
      const postBody = JSON.stringify(data);
      const signature = this.createSignature('POST', '/api/v1/order', expires, postBody);
      this.$axios({
        method: 'POST',
        url: '/order',
        data: data,
        headers: {
          contentType: 'application/json',
          'api-expires': expires,
          'api-key': API_KEY,
          'api-signature': signature,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error.response);
        });
    },
    /* 
      Метод вызывается из App.vue при эмите события в ToolList.vue.
    */
    setQuotes(symbol) {
      this.isDisabled = false;
      this.symbol = symbol;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & section {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    & button {
      margin: 1rem;
    }
  }
}
</style>
