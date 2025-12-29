# Complete Backend ↔ Frontend Integration

## ✅ FULLY CONNECTED - NO MOCK DATA

This frontend is **100% connected** to the backend running on `http://localhost:5000`.

## 🔗 API Integration Map

### Authentication APIs

| Frontend Page | API Endpoint | Method | Service File |
|--------------|--------------|--------|--------------|
| Register | `/api/users/register` | POST | `auth.service.js` → `register()` |
| Login | `/api/auth/login` | POST | `auth.service.js` → `login()` |
| Get Profile | `/api/users/me` | GET | `auth.service.js` → `getProfile()` |

**Login Flow:**
1. User submits login form
2. Frontend calls `POST /api/auth/login`
3. Backend returns token + role
4. Frontend saves token temporarily
5. Frontend calls `GET /api/users/me` to fetch profile
6. Frontend saves token + user data + role
7. Redirects to role-based dashboard

### Pass APIs (Student)

| Frontend Page | API Endpoint | Method | Service File |
|--------------|--------------|--------|--------------|
| Create Pass | `/api/passes` | POST | `pass.service.js` → `createPass()` |
| My Passes | `/api/passes/my` | GET | `pass.service.js` → `getMyPasses()` |

### Approval APIs

| Frontend Page | API Endpoint | Method | Service File |
|--------------|--------------|--------|--------------|
| Department Pending | `/api/department/pending` | GET | `department.service.js` → `getPendingPasses()` |
| Department Approve | `/api/department/approve/:id` | PATCH | `department.service.js` → `approvePass()` |
| Academic Approve | `/api/academic/approve/:id` | PATCH | `academic.service.js` → `approvePass()` |
| Hostel Pending | `/api/hosteloffice/pending` | GET | `hostel.service.js` → `getPendingPasses()` |
| Hostel Approve | `/api/hosteloffice/approve/:id` | PATCH | `hostel.service.js` → `approvePass()` |

### Gate API

| Frontend Page | API Endpoint | Method | Service File |
|--------------|--------------|--------|--------------|
| Scan QR | `/api/gate/scan` | POST | `gate.service.js` → `scanQRCode()` |

## 🔑 Key Integration Points

### 1. Axios Configuration (`src/api/axios.js`)

```javascript
// Base URL matches backend exactly
baseURL: 'http://localhost:5000'

// Auto-attach JWT token
config.headers.Authorization = `Bearer ${token}`

// Handle 401 globally
if (error.response?.status === 401) {
  // Auto-logout and redirect
}
```

### 2. Auth Context (`src/context/AuthContext.jsx`)

- Stores token, user, role in state
- Fetches profile using `GET /api/users/me` on mount
- Provides login/logout functions
- Persists auth state in localStorage

### 3. Protected Routes (`src/components/common/ProtectedRoute.jsx`)

- Checks authentication
- Validates role
- Redirects unauthorized users

### 4. All Service Files Use Real APIs

Every service file makes actual HTTP requests to the backend:
- ✅ `auth.service.js` - Login, Register, Get Profile
- ✅ `pass.service.js` - Create Pass, Get My Passes
- ✅ `department.service.js` - Get Pending, Approve
- ✅ `academic.service.js` - Approve
- ✅ `hostel.service.js` - Get Pending, Approve
- ✅ `gate.service.js` - Scan QR

## 📋 Complete File Structure

```
aagman/
├── src/
│   ├── api/
│   │   └── axios.js              ✅ Base URL: http://localhost:5000
│   ├── services/
│   │   ├── auth.service.js       ✅ POST /api/auth/login
│   │   │                          ✅ POST /api/users/register
│   │   │                          ✅ GET /api/users/me
│   │   ├── pass.service.js       ✅ POST /api/passes
│   │   │                          ✅ GET /api/passes/my
│   │   ├── department.service.js ✅ GET /api/department/pending
│   │   │                          ✅ PATCH /api/department/approve/:id
│   │   ├── academic.service.js   ✅ PATCH /api/academic/approve/:id
│   │   ├── hostel.service.js     ✅ GET /api/hosteloffice/pending
│   │   │                          ✅ PATCH /api/hosteloffice/approve/:id
│   │   └── gate.service.js       ✅ POST /api/gate/scan
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Register.jsx      ✅ Uses POST /api/users/register
│   │   │   └── Login.jsx         ✅ Uses POST /api/auth/login + GET /api/users/me
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── CreatePass.jsx    ✅ Uses POST /api/passes
│   │   │   └── MyPasses.jsx      ✅ Uses GET /api/passes/my
│   │   ├── department/
│   │   │   └── PendingPasses.jsx ✅ Uses GET + PATCH /api/department/*
│   │   ├── academic/
│   │   │   └── PendingPasses.jsx ✅ Uses PATCH /api/academic/approve/:id
│   │   ├── hostel/
│   │   │   └── PendingPasses.jsx ✅ Uses GET + PATCH /api/hosteloffice/*
│   │   └── gate/
│   │       └── Scanner.jsx       ✅ Uses POST /api/gate/scan
│   └── ...
```

## 🎯 Testing Checklist

1. ✅ Register new student → Should call `POST /api/users/register`
2. ✅ Login → Should call `POST /api/auth/login` then `GET /api/users/me`
3. ✅ Create pass → Should call `POST /api/passes`
4. ✅ View passes → Should call `GET /api/passes/my`
5. ✅ Department approve → Should call `PATCH /api/department/approve/:id`
6. ✅ Gate scan → Should call `POST /api/gate/scan`

## ⚠️ Important Notes

- **NO MOCK DATA** - All APIs are real
- **Base URL**: `http://localhost:5000` (hardcoded in axios.js)
- **Token Management**: Automatic via axios interceptor
- **Error Handling**: All API calls have try-catch blocks
- **401 Handling**: Global interceptor auto-logouts on 401

## 🚀 Quick Start

1. **Backend must be running** on `http://localhost:5000`
2. **Start frontend**: `cd aagman && npm install && npm run dev`
3. **Test flow**: Register → Login → Create Pass → View Passes → Approve → Scan

---

**✅ Frontend is 100% connected to backend. All APIs are real and functional.**

