import React from 'react';
import tw from 'twrnc';
import { TouchableOpacity, Text, Image } from 'react-native';

const CategoryCard = ({ imgUrl, title }) => {

    return (
        <TouchableOpacity style={tw`relative mr-2`}>
          <Image source={{ uri: imgUrl }} style={tw`h-20 rounded w-22`} />
            <Text style={tw`absolute bottom-1 left-1 font-bold text-white`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default CategoryCard;
