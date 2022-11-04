import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc';
import { urlFor } from '../sanity';
import DishRow from '../components/DishRow';
import sanityClient from '../sanity'
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [dishesApi , setDishesApi] = useState([]);
    const {
        params: {
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
        }
    } = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        dispatch(setRestaurant({
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
        })
        )
    },[]);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "restaurant" && _id == "${id}"] {
                ...,
                dishes[]->
            }
        `).then((data) => {
            setDishesApi(data[0].dishes)
        })
    }, []);

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View style={tw`relative`}>
                <Image source={{
                    uri: urlFor(imgUrl).url()
                }}
                style={tw`w-full h-56 rounded-sm bg-gray-300 p4`} />

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}>
                    <Icon name="arrow-back" size={25} color="#00CCBB" />
                </TouchableOpacity>
                </View>

                <View style={tw`bg-white`}>
                    <View style={tw`pt-4 px-4`}>
                        <Text style={tw`text-3xl font-bold`}>{title}</Text>
                        <View style={tw`flex-row items-center my-1`}>

                            <View style={tw`flex flex-row items-center`}>
                            <Icon name="star" size={22} color="green" style={tw`opacity-50`}/>
                            <Text  style={tw`text-xs text-gray-500 ml-1`}>
                                <Text style={tw`text-green-500`}>{rating}</Text> "pending..."
                            </Text>
                            </View>

                            <View style={tw`flex flex-row items-center`}>
                            <Icon name="location" size={22} color="gray" style={tw`opacity-40`}/>
                            <Text  style={tw`text-xs text-gray-500 ml-1`}>Nearby {address}</Text>
                            </View>

                        </View>

                        <Text style={tw`text-xs text-gray-500 mt-2 pb-4`}>{short_description}</Text>
                    </View>

                    <TouchableOpacity style={tw`flex-row items-center p-4 border-t border-gray-200`}>
                        <Icon  name="help-circle" size={20} color="gray" style={tw`opacity-60`} />
                        <Text style={tw`pl-2 flex-1 text-md font-bold`}>
                            Have a food allergy?
                        </Text>
                        {/* chevron right icon */ }
                        <Icon name="chevron-forward" size={20} color="#00CCBB" style={tw`opacity-60`} />
                    </TouchableOpacity>
                </View>

                <View style={tw`pb-36`}>
                    <Text style={tw`text-xl font-bold px-4 pt-4`}>Menu</Text>

                    {/* Dishrows */}
                    {dishesApi.map((dish) => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            image={dish.image}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                        />
                    ))}


                </View>
            </ScrollView>
        </>
    );
}

export default RestaurantScreen;
