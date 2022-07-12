<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__wrapper">
      <div class="products__list">
        <div v-for="item in productList" :key="item._id" class="products__item">
          <img class="products__item__img" :src="item.imgUrl" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item.name }}</h4>
            <div class="products__item__price">
              <span class="products__item__single">
                <span class="products__item__yen">&yen;</span>
                {{ item.price }}x{{ item.count }}
              </span>
              <span class="products__item__total">
                <span class="products__item__yen">&yen;</span>
                {{ (item.price * item.count).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffect'
export default {
  name: 'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins';
@import '../../style/viriables';
.products {
  margin: 0.16rem 0.18rem 0.2rem 0.18rem;
  &__title {
    padding: 0.16rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
    background: $bgColor;
  }
  &__wrapper {
    position: absolute;
    overflow-y: scroll;
    left: 0;
    right: 0;
    bottom: 0.6rem;
    top: 2.6rem;
    margin: 0 0.18rem;
  }
  &__list {
    background: $bgColor;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0 0.16rem 0.16rem 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
