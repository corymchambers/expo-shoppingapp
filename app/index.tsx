import { getCategories, getProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

export default function Index() {
    const {
    data: products = [],
    isLoading,
    refetch,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    // staleTime: 1000 * 60, // 1 minute
  });

  console.log({products})
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
