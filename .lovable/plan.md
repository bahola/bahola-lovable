

# Fix Checkout "Log In" Link + Pre-fill Form After Login

## Problem
The "Log in" link on the checkout page has two issues:
1. It navigates to `/login` without a return URL, so after logging in the user lands on the homepage instead of back at checkout
2. When the user navigates away to login and comes back, all form data is lost

## Solution

### Change 1: Add return URL to the checkout login link
**File:** `src/pages/Checkout.tsx`
- Change `<Link to="/login">` to `<Link to="/login?returnUrl=/checkout">` so users are redirected back to checkout after logging in

### Change 2: Auto-fill checkout form when user is logged in
**File:** `src/pages/Checkout.tsx`
- Import `useSwellAuth` from the auth context
- Add a `useEffect` that watches for authentication state changes
- When the user is authenticated, pre-fill the form fields (firstName, lastName, email, phone) from their account data
- This way, when they return from login, the contact information is already filled in

### Technical Details

```text
Checkout page loads
  |
  +--> User clicks "Log in" link
  |      |
  |      +--> Navigates to /login?returnUrl=/checkout
  |      |
  |      +--> User logs in successfully
  |      |
  |      +--> Redirected back to /checkout
  |
  +--> useEffect detects isAuthenticated = true
  |
  +--> Pre-fills firstName, lastName, email, phone from user data
```

### Files to Modify

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Add `returnUrl=/checkout` to login link; import `useSwellAuth`; add useEffect to pre-fill form from user data |

No other files need changes. The Login page already supports `returnUrl` via search params.

