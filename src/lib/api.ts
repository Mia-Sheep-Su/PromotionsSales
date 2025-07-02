import type { Product } from '@/types';

const API_URL = 'https://fakestoreapi.com';

export async function getProducts(offset: number = 0, limit?: number): Promise<Product[]> {
  try {
    const url = new URL(`${API_URL}/products`);
    if (limit !== undefined) {
      url.searchParams.set('limit', String(limit));
    }
    // The API doesn't support offset, so we fetch all and slice.
    // This is not ideal for performance but is a limitation of the fake API.
    // For a real API, we would use offset and limit parameters.
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const allProducts: Product[] = await res.json();
    if (limit !== undefined) {
      return allProducts.slice(offset, offset + limit);
    }
    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
     if (!res.ok) {
      throw new Error(`Failed to fetch product with id ${id}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}
