import { useStore } from 'vuex'
import { computed } from 'vue'

// 购物车相关逻辑  点击加减号
export const useCommonCartEffect = (shopId) => {
    const store = useStore()
    const cartList = store.state.cartList

    // 获取购物车数据
    const productList = computed(() => {
        const productList = cartList[shopId]?.productList || {}
        // console.log(productList)
        const notEmptyProductList = {}
        for (const i in productList) {
            const product = productList[i]
            if (product.count > 0) {
                notEmptyProductList[i] = product
            }
        }
        return productList
    })

    // 获取shopName
    const shopName = computed(() => {
        const shopName = cartList[shopId]?.shopName || ''
        return shopName
    })

    const changeCartItemInfo = (shopId, productId, productInfo, num) => {
        // console.log(shopId) 
        // commit 同步修改数据
        store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
    }

    // 优化多次用到的productList
    const calculations = computed(() => {
        const productList = cartList[shopId]?.productList
        const result = { total: 0, price: 0, allChecked: true }
        // 总件数 小圆点
        // let total = 0
        // //  总价 总计
        // let price = 0
        // // 是否全部选中 
        // let allChecked = true // 默认全选
        if (productList) {
            for (const i in productList) {
                const product = productList[i]
                result.total += product.count
                if (product.check) {
                    result.price += product.count * product.price
                }
                if (product.count > 0 && !product.check) {
                    result.allChecked = false
                }
            }
        }
        result.price = result.price.toFixed(2)
        return result
    })
    return { changeCartItemInfo, cartList, productList, shopName, calculations }
}
