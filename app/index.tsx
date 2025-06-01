import ProductCard from '@/components/ProductCard';
import { ProductShimmerGrid } from '@/components/ProductListShimmer';
import { getCategories, getProducts } from '@/utils/api';
import { COLORS } from '@/utils/colors';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const headerHeight = useHeaderHeight();

  const {
    data: products = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60, // 1 minute
  });
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const allCategories = ['all', ...categories];
  const filteredProducts = products?.filter((product: Product) => {
    if (selectedCategory !== 'all') {
      return product.category === selectedCategory;
    }
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  return (
    <View
      style={[
        styles.container,
        { marginTop: Platform.select({ ios: headerHeight + 30, android: 0 }) },
      ]}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: 'Search products',
            hideWhenScrolling: false,
            hideNavigationBar: false,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {allCategories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {isLoading ? (
        <ProductShimmerGrid />
      ) : (
        <FlashList
          data={filteredProducts}
          renderItem={renderProduct}
          estimatedItemSize={200}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 8,
  },
  categoryContainer: {
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    height: 60,
    zIndex: 1,
  },
  categoryButton: {
    padding: 8,
    borderRadius: 10,
    marginRight: 8,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
  },
  categoryScroll: {
    paddingHorizontal: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  selectedCategoryText: {
    color: 'white',
  },
});
