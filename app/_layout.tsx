import CartButton from '@/components/CartButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
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
      </Stack>
    </QueryClientProvider>
  );
}
