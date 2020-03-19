<template>
  <div class="grid">
    <ToolList @getQuotes="setQuotes" />
    <QuotesHistory ref="quotesHistory" />
    <FormaList ref="formList" />
    <OrderHistory />
  </div>
</template>

<script>
import ToolList from './components/ToolList.vue';
import QuotesHistory from './components/QuotesHistory.vue';
import FormaList from './components/FormaList.vue';
import OrderHistory from './components/OrderHistory.vue';

export default {
  components: {
    ToolList,
    QuotesHistory,
    FormaList,
    OrderHistory,
  },
  methods: {
    setQuotes(symbol) {
      this.$refs.quotesHistory.getQuotes(symbol);
      this.$refs.formList.setQuotes(symbol);
    },
  },
};
</script>

<style lang="scss">
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 50%;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  overflow: hidden;
  height: 100vh;
  & > div {
    height: 100%;
    overflow: scroll;
    & > :nth-child(n) {
      overflow-y: scroll;
      margin: 0;
      & > :first-child {
        text-align: center;
      }
      & > :nth-child(-n + 2) {
        font-weight: bold;
        & th {
          position: sticky;
          top: -1px;
          background-color: #343a40;
          z-index: 10;
        }
      }
    }
  }
  & > :last-child {
    grid-column-start: 1;
    grid-column-end: 4;
    height: 100%;
  }
}
@media (max-width: 1024px) {
  body {
    height: 100%;
    overflow: scroll;
  }
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    & > :nth-child(n) {
      margin: 1rem 0;
    }
  }
}
</style>
