<template>
  <div class="top">
    <div class="top__hearder">
      <div class="top__hearder__back iconfont" @click="handleBackClick">
        &#xe6db;
      </div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">瑶妹(先生)</span>
        <span class="top__receiver__info__phone">18911024266</span>
      </div>
      <div class="top__receiver__icon iconfont">&#xe6db;</div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup() {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins';
@import '../../style/viriables';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__hearder {
    position: relative;
    padding-top: 0.2rem;
    line-height: 0.24rem;
    color: $bgColor;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    border-radius: 0.04rem;
    background-color: $bgColor;
    &__title {
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
      line-height: 0.22rem;
    }
    &__address {
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      line-height: 0.2rem;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        font-size: 0.12rem;
        color: $medium-fontColor;
        margin-right: 0.06rem;
        line-height: 0.18rem;
      }
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.45rem;
      color: $medium-fontColor;
      font-size: 0.25rem;
      transform: rotate(180deg);
    }
  }
}
</style>
