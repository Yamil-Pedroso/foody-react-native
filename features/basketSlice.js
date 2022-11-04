import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
        state.items = [...state.items, action.payload]
        console.log(`You have added: ${state.items.length} dish/es to your basket`)
    },
    removeFromBasket: (state, action) => {
       const index = state.items.findIndex( basketItem => basketItem.id === action.payload.id);
         let newBasket = [...state.items];
         console.log(`You had removed one ${newBasket[index].name} from your basket of ${newBasket.length} dish/es now you have ${newBasket.length - 1} dish/es in your basket`)
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id: ${action.payload.id}) as its not in basket!`
                )
            }

        state.items = newBasket;
    },
  }
})

export const { addToBasket, removeFromBasket  } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items

export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item) => item.id === id).length

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0)

export default basketSlice.reducer
