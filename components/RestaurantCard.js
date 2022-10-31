import React from 'react';
import tw from 'twrnc';
import {View, Text, Image} from 'react-native';
import restaurants from '../data/restaurants.json';

const RestaurantCard = ({ id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat }) => {

    return (
        <View>
            {restaurants.map((restaurant) => {
                return (
                    <View key={restaurant.id}>
                        <Text>{restaurant.name}</Text>
                        <Image source={{ uri: restaurant.imgUrl }} style={tw`h-20 rounded w-22`} />
                    </View>
                );
            })}
        </View>
    );
}

export default RestaurantCard;
