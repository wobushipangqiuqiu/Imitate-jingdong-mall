import { createStore } from 'vuex'
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

// state中cartList 刚开始是一个空对象{} 将其置为本地存储的内容,没有的情况下才为{}   如果手动清空缓存,则会报错,因为JSON.parse的值不能是空或者undefined,所以要么加判断 或try catch  
// if (localStorage.cartList) {
//   return JSON.parse(localStorage.cartList)
// } else {
//   localStorage.cartList = ''
// }
const getLocalCartList = () => {
  //  {shopId:{shopName:'',productList:{productId:{} }}}
  try {
    return JSON.parse(localStorage.cartList)
  } catch (err) {
    return {
    }
  }
}
/* state中数据结构
state: {
  cartList: {
    // 第一层级：商铺shopId 
    shopId: {
      // 第二层 商品名称（沃尔玛、山姆）和商品列表
      shopName: '沃尔玛',
      productList: {
        // 第三层:商品id
        // 第三层内容：商品内容及购物数量
        productId: {
          _id: '1',
          name: '番茄：250g/份',
          imgUrl: '',
          sales: 10,
          price: 33.6,
          oldPrice: 39.6,
          count: 2
        }
      }
    }
  }
}, */

export default createStore({
  state: {
    cartList: getLocalCartList()
  },
  mutations: {
    // 购物车加减号逻辑
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + payload.num
      if (payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      // console.log(state.cartList)
      setLocalCartList(state)
    },
    // 改变商铺名字
    changeShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 是否选中
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      // console.log(payload)
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 点击全选将数量大于等于1都置为选中
    setCartItemChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    clearCartData(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
