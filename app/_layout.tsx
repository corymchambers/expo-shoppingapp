import CartButton from '@/components/CartButton';
import { storage } from '@/store/mmkv';
import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const RootLayout = () => {
  // DevTools
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({
    storage,
  });

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Galactic Products',
              headerShadowVisible: false,
              headerSearchBarOptions: {
                placeholder: 'Search products..',
                hideWhenScrolling: false,
                hideNavigationBar: false,
              },
              headerRight: () => <CartButton />,
            }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{
              title: '',
              headerBackTitle: 'Products',
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              title: 'Cart',
              presentation: 'modal',
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.dismiss()}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default RootLayout;
