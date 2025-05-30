import { COLORS } from '@/utils/colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductCard({ product }): ReactElement {
  const router = useRouter();
  return (
    <Pressable
      style={styles.productCard}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 8,
    gap: 8,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  productInfo: {
    // flex: 1,
    gap: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
