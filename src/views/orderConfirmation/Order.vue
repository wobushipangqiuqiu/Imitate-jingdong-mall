<template>
  <div class="order">
    <div class="order__price">
      实付金额 &nbsp;<b> &yen;{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmlOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmlOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { useCommonCartEffect } from '../../effects/cartEffect'
import { post } from '../../utils/request'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

// 下单相关
const useMakeOrderEffect = (shopName, productList, shopId) => {
  console.log(2, productList)
  const router = useRouter()
  const store = useStore()

  const handleConfirmlOrder = async (isCanceled) => {
    console.log(3, productList)
    // console.log(123)
    // 在store中，getLocalCartList 里面，productList 是对象形式，此处接口数据中，products是一个数组，要通过对象循环去构建products   
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
      // console.log(product)
    }

    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      console.log(result)
      if (result?.errno === 0) {
        store.commit('clearCartData', { shopId })
        router.push({ name: 'OrderList' })
      } else {
        // showToast('确认失败')
      }
    } catch (e) {
      // showToast('请求失败')
    }
  }
  return { handleConfirmlOrder }
}

// 弹层展示相关
const useShowMaskEfect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}
export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    console.log(1, productList)
    const { handleConfirmlOrder } = useMakeOrderEffect(shopName, productList, shopId)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEfect()
    return {
      calculations, handleConfirmlOrder, showConfirm, handleShowConfirmChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins';
@import '../../style/viriables';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  font-size: 0.14rem;
  background-color: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    color: $bgColor;
    text-align: center;
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.6rem;
    background-color: #ffffff;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      color: #333333;
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
    }
    &__desc {
      font-size: 0.14rem;
      color: #666666;
      line-height: 0.2rem;
      margin: 0.08rem 0 0 0;
    }
    &__btns {
      margin: 0.24rem 0.58rem;
      display: flex;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        color: #0091ff;
        margin-right: 0.12rem;
      }
      &--last {
        background-color: #4fb0f9;
        color: #ffffff;
        margin-left: 0.12rem;
      }
    }
  }
}
</style>
