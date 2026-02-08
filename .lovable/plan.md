

# Fix Doctor Approval Flow + Deferred Swell Account Creation

## Two Issues to Fix

### Issue 1: Approve Button Not Working
The approve flow calls `update-swell-account` edge function, which searches for the Swell account by email. But if the Swell account wasn't created during registration (due to CORS or other failures), it returns 404 "No Swell account found" and the entire approval fails (line 134-138 in DoctorApprovalCard.tsx returns early on Swell failure).

Additionally, the Supabase `customers` table update (line 150-153) may fail silently if the admin's Supabase auth session has expired.

### Issue 2: Deferred Account Creation for Doctor/Pharmacy
Currently, Swell accounts are created immediately during registration for ALL user types. The user wants Doctor and Pharmacy accounts to only be created in Swell **after** admin approval.

---

## Solution

### Step 1: Modify Registration Flow (SwellAuthContext.tsx)

Skip Swell account creation for doctor and pharmacy user types during registration. Only create the Supabase customer record with status "pending".

**Changes:**
- In the `register` function, wrap the Swell account creation (lines 252-279) in a condition: only create Swell account if `userType` is NOT `doctor` or `pharmacy`
- Store the password hash or skip it entirely (Swell account will be created on approval with a generated password, then user resets via "forgot password")

### Step 2: Update Edge Function (update-swell-account/index.ts)

Modify the edge function to **create** a Swell account if one doesn't exist (instead of failing with 404). On approval:
1. Search for existing Swell account by email
2. If found: update group and metadata (current behavior)
3. If NOT found: create the account via Swell Backend API, then set group and metadata

**New flow:**
- Accept additional fields: `first_name`, `last_name`, `phone` (needed for account creation)
- Use Swell Backend API `POST /accounts` to create the account
- Then update with group assignment

### Step 3: Update DoctorApprovalCard.tsx

Pass additional customer data (name, phone) to the edge function so it can create the Swell account if needed.

---

## Technical Details

### File: `src/contexts/SwellAuthContext.tsx`

In the `register` function, add a condition around the Swell account creation block:

```typescript
// Step 1: Only create Swell account for non-professional types
const shouldCreateSwellNow = !['doctor', 'pharmacy'].includes(userData.userType);

if (shouldCreateSwellNow) {
  // existing Swell account creation code...
}
```

### File: `supabase/functions/update-swell-account/index.ts`

Update the interface and logic:

```typescript
interface UpdateSwellRequest {
  email: string;
  group?: string;
  verification_status: string;
  first_name?: string;  // NEW
  last_name?: string;   // NEW
  phone?: string;       // NEW
}
```

After searching for the account, if not found and status is "approved":
- Create the account via `POST https://api.swell.store/accounts`
- Then update with group and metadata

If not found and status is "rejected":
- Skip Swell (no account to update), return success

### File: `src/components/admin/DoctorApprovalCard.tsx`

Update the `updateSwellAccount` call to pass name/phone data:

```typescript
const updateSwellAccount = async (doctor: PendingDoctor, status: 'approved' | 'rejected') => {
  const nameParts = doctor.name.split(' ');
  const { data, error } = await supabase.functions.invoke('update-swell-account', {
    body: {
      email: doctor.email,
      group: status === 'approved' ? 'doctor' : undefined,
      verification_status: status,
      first_name: nameParts[0],
      last_name: nameParts.slice(1).join(' ') || '',
      phone: doctor.phone,
    }
  });
  // ...
};
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/contexts/SwellAuthContext.tsx` | Skip Swell account creation for doctor/pharmacy |
| `supabase/functions/update-swell-account/index.ts` | Create Swell account if not found on approval |
| `src/components/admin/DoctorApprovalCard.tsx` | Pass name/phone to edge function |

---

## Flow After Changes

**Registration (Doctor/Pharmacy):**
1. User fills registration form
2. Supabase customer record created with status "pending"
3. No Swell account created yet
4. User sees "pending verification" message

**Admin Approval:**
1. Admin sees pending doctor in dashboard
2. Admin clicks "Approve"
3. Edge function creates Swell account with doctor group
4. Supabase customer record updated to "approved"
5. Notification email sent
6. Doctor can now log in (may need to use "Forgot Password" to set their Swell password)

**Registration (Customer/Student):**
- No change to current behavior (Swell account created immediately)

