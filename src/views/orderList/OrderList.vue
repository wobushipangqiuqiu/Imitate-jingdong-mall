<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{
            item.isCanceled ? '已取消' : '已下单'
          }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img
                class="order__content__img"
                :src="innerItem.product.img"
                alt=""
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">&yen;{{ item.totalPrice }}</div>
            <div class="order__content__count">
              共 {{ item.totalNumber }} 件
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'
// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  // 取数据
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      // console.log(result.data)
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber = (productItem?.orderSales || 0)
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
      console.log(orderList)
    }
  }
  const { list } = toRefs(data)
  getNearbyList()
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },

  setup() {
    const { list } = useOrderListEffect()
    console.log(list)
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables';
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  background-color: rgb(248, 248, 248);
}
.title {
  background-color: $bgColor;
  line-height: 0.44rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
  margin-bottom: 0.16rem;
}
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background-color: $bgColor;
  &__title {
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
    margin-bottom: 0.16rem;
  }
  &__status {
    float: right;
    font-size: 0.14rem;
    color: $light-fontColor$light-fontColor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &__info {
      width: 0.7rem;
      text-align: right;
    }
    &__price {
      font-size: 0.14rem;
      color: $highlight-fontColor;
      line-height: 0.2rem;
      margin-bottom: 0.04rem;
    }
    &__count {
      font-size: 0.12rem;
      color: $content-fontcolor;
      line-height: 0.14rem;
      height: 0.14rem;
    }
  }
}
</style>
