export const CART_SESSION_KEY = 'swell_checkout_id';

export const getStoredCheckoutId = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(CART_SESSION_KEY);
  } catch {
    return null;
  }
};

export const setStoredCheckoutId = (checkoutId: string | null | undefined) => {
  if (typeof window === 'undefined') return;
  try {
    if (!checkoutId) return;
    window.localStorage.setItem(CART_SESSION_KEY, checkoutId);
  } catch {
    // ignore
  }
};

export const clearStoredCheckoutId = () => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CART_SESSION_KEY);
  } catch {
    // ignore
  }
};

/**
 * Appends checkout_id to a Swell cart endpoint.
 *
 * Useful when browsers block 3rd-party cookies, causing Swell session-based cart calls
 * to create a new empty cart.
 */
export const withCheckoutId = (endpoint: string, checkoutId?: string | null) => {
  const id = checkoutId ?? getStoredCheckoutId();
  if (!id) return endpoint;
  if (endpoint.includes('checkout_id=')) return endpoint;
  const sep = endpoint.includes('?') ? '&' : '?';
  return `${endpoint}${sep}checkout_id=${encodeURIComponent(id)}`;
};
