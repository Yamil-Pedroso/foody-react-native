import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import CategoryCard from './CategoryCard';
import sanityClient, { urlFor } from '../sanity';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "category"]`).then((data) => setCategories(data))
        .catch(console.error);
    }, []);

    console.log(categories);

    return (
      <ScrollView
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 8,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            id={category._id}
            title={category.name}
            imgUrl={urlFor(category.image).url()}
          />
        ))}
      </ScrollView>
    );
}

export default Categories;
