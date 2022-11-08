import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import tw from 'twrnc'

const DeliveryScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`font-extrabold text-base`}>Welcome to DeliveryScreen</Text>
    </SafeAreaView>
  )
}

export default DeliveryScreen
