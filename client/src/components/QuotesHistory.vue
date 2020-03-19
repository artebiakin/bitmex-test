<template>
  <div>
    <table class="table table-striped table-dark">
      <tr>
        <td colspan="6">Список котировок</td>
      </tr>
      <tr>
        <th>Время</th>
        <th>Цена открытия</th>
        <th>Цена закрытия</th>
        <th>Цена максимальная</th>
        <th>Цена минимальная</th>
        <th>Объем</th>
      </tr>
      <tr v-for="data in data" :key="data.id">
        <td>{{ getDate(data.timestamp) }}</td>
        <td>{{ data.open }}</td>
        <td>{{ data.high }}</td>
        <td>{{ data.low }}</td>
        <td>{{ data.close }}</td>
        <td>{{ data.volume }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: Array,
      websocket: null,
    };
  },
  methods: {
    /* 
      Возвращает необходимый формат времени.
    */
    getDate(data) {
      const date = new Date(data);
      return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:00`;
    },
    /* 
      Метод вызвается из App.vue при эмите события в ToolList.vue и загружает данные с переданым символом котировки.
      Использовал vuex для контроля состояния.
    */
    getQuotes(symbol) {
      this.$store
        .dispatch('quotesHistory/fetch', symbol)
        .then((data) => {
          this.data = data;
          this.$store.dispatch('quotesHistory/setSubscribe', symbol);
        })
        .catch((error) => console.warn(error));
    },
  },
};
</script>
