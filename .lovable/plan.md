
# Add Admin Sign Out Button to Sidebar

## What Changes
Add a "Sign Out" button at the bottom of the admin sidebar, below the Settings link. Clicking it will sign the admin out of Supabase auth and redirect to the `/admin/login` page.

## Technical Details

**File: `src/pages/AdminDashboard.tsx`**

1. Import `LogOut` icon from `lucide-react`, `useNavigate` from `react-router-dom`, and `supabase` client
2. Add a sign-out handler that calls `supabase.auth.signOut()` and navigates to `/admin/login`
3. Add a separator line and Sign Out button at the bottom of the sidebar nav, below Settings

The sidebar will use `flex flex-col justify-between` so the nav items stay at the top and the sign-out button sticks to the bottom of the sidebar.
