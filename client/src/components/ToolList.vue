<template>
  <div>
    <table class="table table-striped table-dark">
      <tr>
        <td colspan="2">Список торговых пар</td>
      </tr>
      <tr>
        <th>Валютная пара</th>
        <th>Значение</th>
      </tr>
      <tr v-for="data in data" :key="data.symbol" @click="getQuotes(data.symbol)">
        <td>{{ data.symbol }}</td>
        <td>{{ data.lastPrice }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      websocket: null,
    };
  },
  methods: {
    getQuotes(symbol) {
      this.$emit('getQuotes', symbol);
    },
  },
  created() {
    this.$store.dispatch('toolList/fetch').then((data) => {
      this.data = data;
      this.$store.dispatch('toolList/setSubscribe');
    });
  },
};
</script>

<style lang="scss" scoped>
tr:hover:not(:nth-child(-n + 2)) {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
