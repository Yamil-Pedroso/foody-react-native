import { View, SafeAreaView, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { selectBasketItems, removeFromBasket, selectBasketTotal } from '../features/basketSlice'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'

const BasketScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
  const dispatch = useDispatch()


  const groupedItems = useMemo(() => {
    const groupedItems = {}
    items.forEach((item) => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].quantity += 1
      } else {
        groupedItems[item.id] = {
          ...item,
          quantity: 1,
        }
      }
    })
    return groupedItems
  }, [items])

  const groupedItemsArray = Object.entries(groupedItems).map((item) => item[1])


  console.log(groupedItemsArray)

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-gray-100`}>
        <View style={tw`p-5 border-b border-[#00CCBB] bg-white shadow-xs`}>
           <View>
              <Text style={tw`text-lg font-bold text-center`}>Basket</Text>
              <Text style={tw`text-center text-gray-400`}>
                {restaurant.title}
              </Text>
           </View>

            <TouchableOpacity
              onPress={() =>{ navigation.goBack()}}
              style={tw`rounded-full bg-gray-100 absolute top-3 right-5`} >
              <Icon name="close" size={50} color="#00CCBB" width={50} />
            </TouchableOpacity>
        </View>

        <View style={tw`flex-row items-center mr-4 py-3 bg-white my-5`}>
           <Image source={{
              uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
            }}
            style={tw`h-7 w-7 bg-gray-300 rounded-full`}
          />
          <Text style={tw`flex-1 ml-2`}>Deliver in 50-75 minutes</Text>
          <TouchableOpacity>
            <Text style={tw`text-[#00CCBB]`}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={tw`divide-y divide-gray-200`}>
          {groupedItemsArray.map((item) => (
            <View key={item.id}
              style={tw`p-5 bg-white flex-row items-center`}
            >
              <Text style={tw`font-bold text-[#00CCBB]`}>{item.quantity}x</Text>
              <Image source={{
                uri: urlFor(item.image).width(100).url()
              }} style={tw`h-10 w-10 bg-gray-300 rounded-full mx-2`} />
              <Text style={tw`flex-1 ml-2 font-bold`}>{item.name}</Text>

              <Text style={tw`font-bold mr-2`}>
                <Currency quantity={item.price * item.quantity} currency="CHF" />
              </Text>

              <TouchableOpacity>
                <Text style={tw`text-[#00CCBB] text-xs`}
                  onPress={() => dispatch(removeFromBasket({ id: item.id }))}
              >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={tw`p-5 bg-white mt-5`}>
          <View style={tw`flex flex-row justify-between`}>
             <Text style={tw`text-gray-500`}>Subtotal</Text>
              <Text style={tw`text-gray-500 font-bold`}>
                <Currency quantity={basketTotal} currency="CHF" />
              </Text>
          </View>

          <View style={tw`flex flex-row justify-between`}>
             <Text style={tw`text-gray-500 mt-3`}>Delivery Fee</Text>
              <Text style={tw`text-gray-500 font-bold mt-3`}>
                <Currency quantity={5.99} currency="CHF" />
              </Text>
          </View>

          <View style={tw`flex flex-row justify-between`}>
             <Text style={tw`mt-3`}>Order Total</Text>
              <Text style={tw`text-gray-500 font-extrabold mt-3`}>
                <Currency quantity={basketTotal +  5.99} currency="CHF" />
              </Text>
          </View>

          <TouchableOpacity
             onPress={() => {
              navigation.navigate('PreparingOrderScreen')
            }}
            style={tw`rounded-lg bg-[#00CCBB] p-4 mt-3`}
          >
            <Text style={tw`text-center text-white text-lg font-bold`}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen
