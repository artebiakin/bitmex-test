<template>
  <div class="grid">
    <section>Список торговых пар (обновляется онлайн)</section>
    <section>Список котировок (обновляется онлайн)</section>
    <section>Форма создания ордера</section>
    <section>История ордеров</section>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}
</style>
