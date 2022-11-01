import { View, SafeAreaView, Text, Image, TextInput, ScrollView } from 'react-native'
import tw from 'twrnc'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation();
  const pizza = '🍕'

  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  useEffect(() => {
    sanityClient.fetch(`
       *[_type == "featured"] {
         ...,
         restaurants[]-> {
           ...,
           dishes[]->
         }
         }
    `
    ).then((data) => {
      setFeaturedCategories(data)
    })
  }, [])

  console.log(featuredCategories)

  return (
    <SafeAreaView style={tw`bg-white pt-5`}>
      {/*<Text style={tw.style("text-red-500")}>Hello Foody! {}</Text>*/}

      <View style={tw`flex-row pb-3 items-center mx-4 px-2`}>

        <Image source={{
          uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
        }}
        style={tw`h-10 w-10 bg-gray-300 p-4 rounded-full mr-2`}
        />

      <View style={tw`flex-1`}>
        <Text style={tw`font-bold text-gray-400 text-xs`}>
          Deliver now!
        </Text>
        <Text style={tw`font-bold`}>
          Current Location
          <Icon name="chevron-down" size={12} color="#00CCBB" />
        </Text>
        </View>

          {/* user icon */}
          <Icon name="person-circle" size={30} color="#00CCBB" />
        </View>
          {/* Search */}
          <View style={tw`flex-row items-center pb-4 mx-4 px-4`}>
             <View style={tw`flex-row bg-gray-200 items-center`}>
                <Icon name="search" size={20} color="gray" style={tw`m-2`} />
                <TextInput
                  placeholder="Search for food"
                  keyboardType="default"
                  style={tw`text-sm w-63`}
                />
             </View>

             {/* Adjustment Icon */}
             <Icon name="settings" size={30} color="#00CCBB" />
          </View>

          {/* Body */}
          <ScrollView style={tw`bg-gray-100`}
            contentContainerStyle={{paddingBottom: 100}}
          >
             {/* Categories */}
              <Categories />


             {/* Featured Rows */}
              {featuredCategories?.map((category) => (
                <FeaturedRow
                  key={category.id}
                  id={category._id}
                  title={category.name}
                  description={category.short_description}
                  />
              ))}
          </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
