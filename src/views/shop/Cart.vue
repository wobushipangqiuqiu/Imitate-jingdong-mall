<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe70f;' : '&#xe61b;'"
          ></span>
          全选
        </div>
        <div class="product__header__clear">
          <span
            class="product__header__clear__btn"
            @click="() => cleanCartProducts(shopId)"
            >清空购物车</span
          >
        </div>
      </div>
      <div v-for="item in productList" :key="item._id" class="product__item">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe70f;' : '&#xe66c;'"
          @click="() => changeCartItemChecked(shopId, item._id)"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <div class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__orign">&yen;{{ item.oldPrice }}</span>
          </div>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1)
              }
            "
            >&#xe670;</span
          >
          {{ item.count || 0 }}
          <span
            class="product__number__plus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1)
              }
            "
            >&#xe675;</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计:
        <span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.price > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffect'
// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const { changeCartItemInfo, productList, calculations } = useCommonCartEffect(shopId)

  // 是否选中
  const changeCartItemChecked = (shopId, productId) => {
    // commit 同步修改数据
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  // 点击全选将数量大于等于1都置为选中
  const setCartItemChecked = (shopId) => {
    store.commit('setCartItemChecked', { shopId })
  }
  return { productList, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemChecked, calculations }
}
// 购物车展示与否
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}
export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    console.log(shopId) // 1
    const { calculations, productList, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemChecked } = useCartEffect(shopId)
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return { calculations, productList, shopId, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemChecked, showCart, handleCartShowChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $bgColor;
}
.product {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  background-color: $bgColor;
  &__header {
    display: flex;
    line-height: 0.52rem;
    box-sizing: content-box;
    background-color: $bgColor;
    border-bottom: 0.01rem solid $content-bgColor;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &__all {
      width: 0.74rem;
      margin-left: 0.18rem;
    }
    &__icon {
      font-size: 0.2rem;
      vertical-align: top;
      color: $btn-bgColor;
      margin-right: 0.084rem;
    }
    &__clear {
      display: inline-block;
      flex: 1;
      text-align: right;
      margin-right: 0.18rem;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__checked {
      line-height: 0.5rem;
      margin-right: 0.18rem;
      //   color: #96919196;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      /* 多行文字省略  超过1行显示省略号*/
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   display: -webkit-box;
      //   -webkit-line-clamp: 1;
      //   -webkit-box-orient: vertical;
      //   white-space: normal !important;
      //   word-wrap: break-word;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      font-size: 0.14rem;
      color: $highlight-fontColor;
      line-height: 0.2rem;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__orign {
      font-size: 0.12rem;
      color: $light-fontColor;
      line-height: 0.2rem;
      text-decoration: line-through;
      margin-left: 0.06rem;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.3rem;
      &__minus {
        font-size: 0.2rem;
        position: relative;
        top: 0.02rem;
        color: $medium-fontColor;
        margin-right: 0.08rem;
      }
      &__plus {
        font-size: 0.2rem;
        position: relative;
        top: 0.02rem;
        color: $btn-bgColor;
        margin-left: 0.08rem;
      }
    }
  }
}
.check {
  display: flex;
  box-sizing: border-box;
  line-height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      text-align: center;
      left: 0.45rem;
      top: 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      color: $bgColor;
      background-color: $highlight-fontColor;
      border-radius: 0.1rem;
      padding: 0 0.04rem;
      font-size: 0.12rem;
      text-align-last: center;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      //   line-height: 0.49rem;
      font-size: 0.18rem;
      color: $highlight-fontColor;
    }
  }
  &__btn {
    width: 0.98rem;
    font-size: 0.14rem;
    background-color: #4fb0f9;
    color: $bgColor;
    text-align: center;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
