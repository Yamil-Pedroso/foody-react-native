import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View style={tw`absolute bottom-10 w-full z-50`}>
      <TouchableOpacity
         onPress={() => {
          navigation.navigate('Basket', {
            items,
            basketTotal,
          });
        }}
         style={tw`mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center mr-2`} >
         <Text
              style={tw`text-white font-extrabold text-lg bg-[#01A296] py-1 px-2`}>
            {items.length}
        </Text>
         <Text style={tw`flex-1  font-bold text-lg text-[#303030] text-center`}>View Basket</Text>
         <Text style={tw`text-lg text-white font-extrabold ml-2`}>
            <Currency quantity={basketTotal} currency="CHF" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon
