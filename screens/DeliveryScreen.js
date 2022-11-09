import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import tw from 'twrnc'
import { useNavigation  } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress'
import MapView, {Marker} from 'react-native-maps'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)

  return (
    <View style={tw`flex-1 bg-[#2acdce]`}>
      <SafeAreaView style={tw`z-50`}>
        <View style={tw``}>
           <View style={tw`flex-row justify-around items-center`} >
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="close" size={30} color="white" />
              </TouchableOpacity>
              <Text style={tw`font-light font-bold text-white text-lg`}>Order Help</Text>
           </View>
        </View>

        <View style={tw`bg-white mx-5 rounded-md p-6 z-50 shadow-md`}>
          <View style={tw`flex-row justify-between`}>
            <View>
                <Text style={tw`text-lg text-gray-400`}>Estimated Arrival</Text>
                <Text style={tw`text-3xl font-bold`}>45-55 Minutes</Text>
            </View>

            <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/way-concept-illustration_114360-1191.jpg?w=2000&t=st=1667987515~exp=1667988115~hmac=dab389949c7d610ae483a7be71d3985b003caa68385b18077e3c126f82889883"
                }}
                style={tw`h-18 w-18`}
            />
           </View>

            <Progress.Bar size={30} color="#2acdce" indeterminate={true} />

            <Text style={tw`text-lg font-bold text-gray-400 mt-5`}>
              Your Order at <Text style={tw`text-black`}>{restaurant.title}</Text> is being prepared
            </Text>
          </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={tw`flex-1 mt-10 z-0`}
        mapType="mutedStandard"
      >

        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#2acdce"
        />
      </MapView>

      <SafeAreaView style={tw`flex bg-white items-center flex-row  h-28`}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
          }}
          style={tw`h-12 w-12 rounded-full ml-5 bg-gray-300 ml-5 p-4`}
         />

         <View style={tw`flex-1`}>
            <Text style={tw`text-lg`}>Foody Yummy</Text>
            <Text style={tw`text-gray-400`}>Delivery Partner</Text>
         </View>

         <Text style={tw`text-[#2acdce] text-lg mr-5 font-bold`}>Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen
