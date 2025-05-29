const API_URL = 'https://fakestoreapi.com'

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};


export const getProduct = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};


export const getCategories = async () => {
  const response = await fetch(`${API_URL}/products/categories`);
  return response.json();
};

