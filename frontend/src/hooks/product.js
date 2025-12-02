import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Hook utama untuk mengelola data produk, status loading, dan error.
export const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fungsi fetch produk yang disimpan (memoized) agar dependency effect tetap stabil.
    const fetchProducts = useCallback(async () =>{
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Jalankan fetch sekali saat komponen memakai hook ini di-render.
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {products, loading, error, refetch : fetchProducts};
}
