import { View, SafeAreaView, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { selectBasketItems } from '../features/basketSlice'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'

const BasketScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
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

        <ScrollView>
          {groupedItemsArray.map((item) => (
            <View key={item.id} style={tw`p-5 bg-white`}>
              <Image source={{
                uri: urlFor(item.image).width(100).url()
              }} style={tw`h-10 w-10 bg-gray-300 rounded-full`} />
              <Text style={tw`text-lg font-bold`}>{item.quantity}x {item.name}</Text>

              <Text style={tw`text-lg font-bold`}>
                <Currency quantity={item.price * item.quantity} currency="CHF" />
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen
