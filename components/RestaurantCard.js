import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'
import {TouchableOpacity, View, Text, Image} from 'react-native';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
//import restaurants from '../data/restaurants.json';

const RestaurantCard = ({ id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat }) => {
    const navigation = useNavigation();
    console.log(dishes);

    return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Restaurant', {
              id,
              imgUrl,
              title,
              rating,
              genre,
              address,
              short_description,
              dishes,
              long,
              lat
            });
          }}
          style={tw`bg-white mr-3 shadow`}>

            <Image source={{
                uri: urlFor(imgUrl).url()
                }}
               style={tw`w-64 h-36 rounded-sm`}
             />

            <View style={tw`px-3 pb-4`}>
                <Text style={tw`font-bold text-lg pt-2`}>{title}</Text>
                <View style={tw`flex flex-row items-center space-x-1`}>
                   <Icon name="ios-star" size={22} color="#00CCBB" style={tw`opacity-50`} />
                     <Text style={tw`text-xs text-gray-500`}>
                        <Text style={tw`text-green-500`}>{rating}</Text> {genre}
                    </Text>
                </View>

                <View style={tw`flex flex-row items-center space-x-1`}>
                    <Icon name="location" size={22} color="gray" style={tw`opacity-40`} />
                    <Text style={tw`text-xs text-gray-500`}>Nearby  {address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default RestaurantCard;
