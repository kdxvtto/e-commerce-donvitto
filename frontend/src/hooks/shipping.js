import { useEffect, useState, useCallback } from "react";
import { api } from "../lib/api";

// Hook untuk mengambil metode pengiriman dari backend
export const useShippingMethods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch daftar pengiriman (aktif) dari API
  const fetchMethods = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/shipping-methods"); // endpoint backend
      setMethods(res.data?.data || []); // simpan daftar metode
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Gagal memuat metode pengiriman";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Muat sekali saat hook dipakai
  useEffect(() => {
    fetchMethods();
  }, [fetchMethods]);

  return { methods, loading, error, refetch: fetchMethods };
};
