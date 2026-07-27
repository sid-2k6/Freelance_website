import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const WishlistContext = createContext(undefined);
const STORAGE_KEY = 'technova-wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggle = useCallback((slug) => {
    setItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const has = useCallback((slug) => items.includes(slug), [items]);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, toggle, has, clear, count: items.length }),
    [items, toggle, has, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
