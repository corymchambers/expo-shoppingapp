import CartItem from '@/components/CartItem';
import useCartStore from '@/store/cartStore';
import { COLORS } from '@/utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { products, total, clearCart } = useCartStore();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert('Add some products to your cart first!');
      return;
    }
    clearCart();
    Alert.alert('Checkout successful!');
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      {products.length === 0 && (
        <Text style={styles.emptyText}>No products in the cart</Text>
      )}
      <FlatList
        data={products}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {products.length && (
              <Text style={styles.totalText}>Total: ${total}</Text>
            )}
          </>
        )}
      />
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          { paddingBottom: Platform.OS === 'ios' ? bottom : 20 },
        ]}
        onPress={handleCheckout}
      >
        <Ionicons name="checkmark" size={20} color="white" />
        <Text style={styles.addToCartText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  addToCartText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
