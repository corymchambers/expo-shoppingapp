import useCartStore from '@/store/cartStore';
import { Product } from '@/utils/api';
import { COLORS } from '@/utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Reanimated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

interface CartItemProps {
  item: Product & { quantity: number };
}

const LeftActions = (
  progress: SharedValue<number>,
  dragX: SharedValue<number>,
  onShouldDelete: () => void
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragX.value - 100 }],
    };
  });
  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity style={styles.leftAction} onPress={onShouldDelete}>
        <Ionicons name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const CartItem = ({ item }: CartItemProps) => {
  const { addProduct, reduceProduct } = useCartStore();
  const reanimatedRef = useRef<SwipeableMethods>(null);
  const opacityAnim = useSharedValue(1);
  const scaleAnim = useSharedValue(1);
  const heightAnim = useSharedValue(80);

  const handleQuantityChanged = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      addProduct(item);
    } else {
      reduceProduct(item);
    }

    scaleAnim.value = withSequence(
      withSpring(1.2, { damping: 2, stiffness: 80 }),
      withSpring(1, { damping: 2, stiffness: 80 })
    );
  };

  const onShouldDelete = async () => {
    opacityAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    heightAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    await new Promise((resolve) => setTimeout(resolve, 300));

    reanimatedRef.current?.close();
    for (let i = 0; i < item.quantity; i++) {
      reduceProduct(item);
    }
  };

  const quantityAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
      height: heightAnim.value,
    };
  });

  return (
    <Reanimated.View style={animatedStyle}>
      <ReanimatedSwipeable
        ref={reanimatedRef}
        leftThreshold={50}
        friction={2}
        containerStyle={styles.swipeable}
        renderLeftActions={(progress, dragX) =>
          LeftActions(progress, dragX, onShouldDelete)
        }
      >
        <View style={styles.cartItemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.itemContainer}>
            <Text style={styles.cartItemName} numberOfLines={2}>
              {item.title}
            </Text>
            <Text>Price: ${item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleQuantityChanged('decrement')}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={24} color="black" />
            </TouchableOpacity>
            <Reanimated.Text
              style={[styles.cartItemQuantity, quantityAnimatedStyle]}
            >
              {item.quantity}
            </Reanimated.Text>
            <TouchableOpacity
              onPress={() => handleQuantityChanged('increment')}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ReanimatedSwipeable>
    </Reanimated.View>
  );
};
export default CartItem;
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#fff',
    height: 80,
  },
  image: {
    width: 50,
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  itemContainer: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    padding: 10,
  },
  cartItemQuantity: {
    fontWeight: 'bold',
    backgroundColor: COLORS.primary,
    fontSize: 16,
    padding: 5,
    width: 30,
    color: 'white',
    textAlign: 'center',
  },
  swipeable: {
    height: 80,
  },
  leftAction: {
    backgroundColor: 'red',
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
