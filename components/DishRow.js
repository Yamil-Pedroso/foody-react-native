import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'
import { urlFor } from '../sanity';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { alignItems } from 'react-native-wind/dist/styles/flex/align-items';

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <>
            <TouchableOpacity
              onPress={() => setIsPressed(!isPressed)}
              style={tw`bg-white border p-4 border-gray-200
                ${isPressed && "border-b-0"}
              `}
              >
                <View style={tw`flex-row`}>
                    <View style={tw`flex-1 pr-2`}>
                        <Text style={tw`text-lg mb-1`}>{name}</Text>
                        <Text style={tw`text-gray-400`}>{description}</Text>
                        <Text style={tw`text-gray-400`}>
                            <Currency quantity={price} currency="CHF" />
                        </Text>
                    </View>

                <View>
                    <Image source={{
                        uri: urlFor(image).url()
                    }} style={tw`w-20 h-20 bg-gray-300 p-4`} />
                </View>
            </View>
            </TouchableOpacity>

            { isPressed && (
                <View style={tw`bg-white px-4 p-2`}>
                    <View style={tw`flex-row items-center`}>
                        <TouchableOpacity>
                            {/* Minus circle Icon */}
                            <Icon name="remove-circle" size={40} color="#00CCBB" />
                        </TouchableOpacity>

                        <Text style={tw`ml-1`}>0</Text>

                        <TouchableOpacity  style={tw`ml-1`}>
                            {/* Plus circle Icon */}
                            <Icon name="add-circle" size={40} color="#00CCBB" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}

export default DishRow;
