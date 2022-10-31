import React from 'react';
import tw from 'twrnc';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import RestaurantCard from './RestaurantCard';

const FeaturedRow = ({ id, title, description }) => {

    return (
        <View>
          <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
              <Text style={tw`font-bold text-lg`}>{title}</Text>
              {/* <Icon name="ios-arrow-forward" size={20} color="#000" /> */}
              <Icon name="ios-arrow-forward" size={20} color="#00CCBB" />
          </View>

          <Text style={tw`text-xs text-gray-500 px-4`}>{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle= {{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                style={tw`pt-4`}
            >
              {/* RestaurantCard */}
              <RestaurantCard />
            </ScrollView>
        </View>
    );
}

export default FeaturedRow;
