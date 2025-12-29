# Backend ↔ Frontend Integration Guide

## 🔗 Complete API Integration

This document shows how the frontend is FULLY CONNECTED to the backend.

### Base Configuration

**File**: `src/api/axios.js`
- Base URL: `http://localhost:5000` (matches backend)
- Auto-attaches JWT token to all requests
- Handles 401 errors globally (auto-logout)

### Authentication Flow

#### 1. Student Registration
**Page**: `src/pages/auth/Register.jsx`
**API**: `POST /api/users/register`
**Service**: `src/services/auth.service.js` → `register()`

```javascript

{
  name: string,
  rollNo: string,
  registrationNo: string,
  department: string,
  hostel: string,
  password: string
}

```

#### 2. Login (All Roles)
**Page**: `src/pages/auth/Login.jsx`
**API Flow**:
1. `POST /api/auth/login` → Get token
2. `GET /api/users/me` → Fetch user profile
3. Save token + user data + role
4. Redirect to role-based dashboard

**Service**: `src/services/auth.service.js` → `login()` and `getProfile()`

#### 3. Protected Routes
**Component**: `src/components/common/ProtectedRoute.jsx`
- Checks authentication
- Validates role
- Redirects unauthorized users

### API Service Files (All Connected to Backend)

#### `src/services/auth.service.js`
- `login()` → `POST /api/auth/login`
-  `register()` → `POST /api/users/register`
-  `getProfile()` → `GET /api/users/me`

#### `src/services/pass.service.js`
-  `createPass()` → `POST /api/passes`
-  `getMyPasses()` → `GET /api/passes/my`

#### `src/services/department.service.js`
-  `getPendingPasses()` → `GET /api/department/pending`
-  `approvePass()` → `PATCH /api/department/approve/:id`

#### `src/services/academic.service.js`
-  `approvePass()` → `PATCH /api/academic/approve/:id`

#### `src/services/hostel.service.js`
-  `getPendingPasses()` → `GET /api/hosteloffice/pending`
-  `approvePass()` → `PATCH /api/hosteloffice/approve/:id`

#### `src/services/gate.service.js`
-  `scanQRCode()` → `POST /api/gate/scan`

### Role-Based Dashboards (All Use Real APIs)

#### Student Dashboard
- **Create Pass**: Uses `POST /api/passes` (real API)
- **View Passes**: Uses `GET /api/passes/my` (real API)
- **QR Display**: Shows QR from approved pass (from backend)

#### Department Dashboard
- **View Pending**: Uses `GET /api/department/pending` (real API)
- **Approve**: Uses `PATCH /api/department/approve/:id` (real API)

#### Academic Dashboard
- **Approve**: Uses `PATCH /api/academic/approve/:id` (real API)

#### Hostel Office Dashboard
- **View Pending**: Uses `GET /api/hosteloffice/pending` (real API)
- **Approve**: Uses `PATCH /api/hosteloffice/approve/:id` (real API)

#### Gate Dashboard
- **Scan QR**: Uses `POST /api/gate/scan` (real API)
- **Show Result**: Displays backend response

### Error Handling

All API calls handle errors properly:
- Network errors
- Validation errors (from backend)
- 401 Unauthorized (auto-logout)
- 404 Not Found
- 500 Server Error

### Token Management

1. **Storage**: localStorage
2. **Auto-attach**: Via axios interceptor
3. **Refresh**: On page reload, fetches profile using stored token
4. **Expiry**: Handled by 401 interceptor

### Testing the Integration

1. **Start Backend**: `npm run dev` (in backend folder)
2. **Start Frontend**: `npm run dev` (in aagman folder)
3. **Test Flow**:
   - Register new student → Should call `POST /api/users/register`
   - Login → Should call `POST /api/auth/login` then `GET /api/users/me`
   - Create pass → Should call `POST /api/passes`
   - View passes → Should call `GET /api/passes/my`
   - Approve pass → Should call `PATCH /api/department/approve/:id`
   - Scan QR → Should call `POST /api/gate/scan`

### Important Notes


