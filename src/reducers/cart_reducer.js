import { act } from 'react-dom/test-utils';
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type == ADD_TO_CART) {
    //从action的负载中获取商品的id、颜色、数量和详细信息
    const { id, color, amount, product } = action.payload;
    //判断物品Id是否和payload的id和color一致，如果一致则说明该项已在购物车中
    const tempItem = state.cart.find((i) => i.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        //如果id和颜色都匹配，则只增加数量
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    }
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        //注意图片是数组，我们这里用主图
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      //...state.cart表示从之前的cart中复制所有值并添加newItem，当然cart最开始是空数组
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if (action.type == REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type == CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type == TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      } else {
        return item
      }
    })
    return { ...state, cart: tempCart }
  }
  if (action.type == COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce((
      total, cartItem) => {
      const { amount, price } = cartItem
      //使购物车图标数量变化
      total.total_items += amount
      //使总价变化
      total.total_amount += price * amount
      return total
    }, {
      total_items: 0, total_amount: 0
    }
    )
    return { ...state, total_items, total_amount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
