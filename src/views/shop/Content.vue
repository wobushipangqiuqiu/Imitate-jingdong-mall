<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab
        }"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售 {{ item.sales }} 件</p>
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
                changeCartItem(shopId, item._id, item, -1, shopName)
              }
            "
            >&#xe670;</span
          >
          {{ getProductCartCount(shopId, item._id) }}
          <span
            class="product__number__plus iconfont"
            @click="
              () => {
                changeCartItem(shopId, item._id, item, 1, shopName)
              }
            "
            >&#xe675;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckilll' },
  { name: '新鲜水果', tab: 'fruit' }]

// tab切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}
// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({
    list: []
  })
  //   获取列表内容
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  // 首次加载以及页面tab发生变化才加载
  watchEffect(() => {
    getContentData()
  })
  const { list } = toRefs(content)
  return { list }
}

// 购物车相关逻辑 
const useCartEffect = () => {
  const store = useStore()
  const { changeCartItemInfo, cartList } = useCommonCartEffect()
  // 改变商铺名字
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  // 加号将数量增加的同事将商品名字也传过去
  const changeCartItem = (shopId, productId, item, number, shopName) => {
    changeCartItemInfo(shopId, productId, item, number)
    changeShopName(shopId, shopName)
  }
  // 数量判断
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
    return { categories, list, cartList, currentTab, handleTabClick, shopId, changeCartItem, getProductCartCount }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.content {
  display: flex;
  position: absolute;
  top: 1.51rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: 0.76rem;
  background-color: $search-bgColor;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background-color: $bgColor;
    }
  }
}
.product {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
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
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: $content-fontcolor;
      line-height: 0.16rem;
    }
    &__price {
      margin: 0;
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
      bottom: 0.12rem;
      line-height: 0.18rem;

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
</style>
