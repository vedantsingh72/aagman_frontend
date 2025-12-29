# Aagman Frontend Structure

## 📁 Complete Folder Tree

```
aagman/
├── public/                          # Static assets
├── src/
│   ├── api/
│   │   └── axios.js                 # ✅ Central Axios instance with interceptors
│   ├── auth/                        # Auth utilities (if needed)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Loading.jsx         # ✅ Loading spinner component
│   │   │   ├── ErrorMessage.jsx    # ✅ Error display component
│   │   │   └── ProtectedRoute.jsx  # ✅ Route protection wrapper
│   │   ├── layout/
│   │   │   └── Navbar.jsx          # ✅ Navigation bar with logout
│   │   └── qr/
│   │       ├── QRDisplay.jsx       # ✅ Display QR codes
│   │       └── QRScanner.jsx       # ✅ Scan QR codes
│   ├── context/
│   │   └── AuthContext.jsx         # ✅ Global auth state management
│   ├── hooks/
│   │   └── useAuth.js              # ✅ Custom auth hook
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.jsx          # ✅ Login page for all roles
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx  # ✅ Student dashboard
│   │   │   ├── CreatePass.jsx        # ✅ Create new pass
│   │   │   └── MyPasses.jsx          # ✅ View my passes
│   │   ├── department/
│   │   │   ├── DepartmentDashboard.jsx  # ✅ Department dashboard
│   │   │   └── PendingPasses.jsx        # ✅ View & approve pending
│   │   ├── academic/
│   │   │   ├── AcademicDashboard.jsx   # ✅ Academic dashboard
│   │   │   └── PendingPasses.jsx       # ✅ Approve passes
│   │   ├── hostel/
│   │   │   ├── HostelDashboard.jsx     # ✅ Hostel Office dashboard
│   │   │   └── PendingPasses.jsx       # ✅ View & approve local passes
│   │   └── gate/
│   │       ├── GateDashboard.jsx       # ✅ Gate dashboard
│   │       └── Scanner.jsx              # ✅ QR scanner page
│   ├── routes/
│   │   └── AppRoutes.jsx            # ✅ All route definitions
│   ├── services/
│   │   ├── auth.service.js          # ✅ Authentication API calls
│   │   ├── pass.service.js          # ✅ Pass-related API calls
│   │   ├── department.service.js    # ✅ Department API calls
│   │   ├── academic.service.js      # ✅ Academic API calls
│   │   ├── hostel.service.js        # ✅ Hostel Office API calls
│   │   └── gate.service.js          # ✅ Gate API calls
│   ├── utils/
│   │   ├── constants.js             # ✅ App constants (roles, types)
│   │   └── helpers.js               # ✅ Helper functions
│   ├── App.jsx                      # ✅ Main app component
│   ├── main.jsx                     # ✅ Entry point
│   └── index.css                    # ✅ Tailwind CSS
├── .env                             # Environment variables
├── .gitignore
├── index.html
├── package.json                     # ✅ Dependencies
├── vite.config.js                   # ✅ Vite configuration
├── tailwind.config.js               # ✅ Tailwind configuration
├── postcss.config.js                # ✅ PostCSS configuration
└── README.md                        # ✅ Documentation
```

## 📂 Folder Explanations

### `/src/api`
- **Purpose**: Axios configuration
- **Key File**: `axios.js` - Central axios instance with request/response interceptors
- **Features**: Auto-attach JWT token, handle 401 errors globally

### `/src/services`
- **Purpose**: API service files for all backend endpoints
- **Files**: One service file per feature/role
- **Features**: Clean API calls, error handling, easy to maintain

### `/src/context`
- **Purpose**: React Context for global state
- **Key File**: `AuthContext.jsx` - Manages authentication state globally
- **Features**: Login, logout, user data, role management

### `/src/hooks`
- **Purpose**: Custom React hooks
- **Key File**: `useAuth.js` - Easy access to auth context

### `/src/utils`
- **Purpose**: Constants and helper functions
- **Files**: 
  - `constants.js` - Roles, pass types, status values
  - `helpers.js` - Date formatting, status colors, etc.

### `/src/components`
- **Purpose**: Reusable UI components
- **Structure**:
  - `common/` - Loading, ErrorMessage, ProtectedRoute
  - `layout/` - Navbar
  - `qr/` - QR code display and scanner

### `/src/pages`
- **Purpose**: Page components organized by role
- **Structure**: Each role has its own folder with dashboard and specific pages

### `/src/routes`
- **Purpose**: Route configuration and protected route logic
- **Key File**: `AppRoutes.jsx` - All routes with role-based protection

## 🔑 Key Files Explained

### 1. `src/api/axios.js`
- Centralized axios instance
- Automatically attaches JWT token to all requests
- Handles 401 errors (auto-logout and redirect)

### 2. `src/context/AuthContext.jsx`
- Global authentication state management
- Stores token, user data, and role
- Provides login/logout functions
- Auto-fetches user profile on mount

### 3. `src/components/common/ProtectedRoute.jsx`
- Protects routes that require authentication
- Checks user role for role-based access
- Redirects to login if not authenticated
- Shows "Access Denied" for unauthorized roles

### 4. `src/pages/auth/Login.jsx`
- Login page for all roles
- Dynamic identifier label based on role
- Redirects to appropriate dashboard after login

### 5. `src/routes/AppRoutes.jsx`
- All route definitions
- Role-based route protection
- Automatic redirects based on authentication state

## 🎯 Assumptions

1. **Backend URL**: `http://localhost:5000`
2. **API Endpoints**: All match the service files exactly
3. **CORS**: Enabled for `http://localhost:3000`
4. **JWT Storage**: Tokens stored in localStorage
5. **User Profile**: Fetched automatically after login via `/api/users/me`
6. **Response Format**: Backend returns `{ data: {...}, message: "..." }` format

## 🚀 Getting Started

1. Navigate to `aagman` folder
2. Run `npm install`
3. Create `.env` file with `VITE_API_BASE_URL=http://localhost:5000`
4. Run `npm run dev`
5. Open `http://localhost:3000`

## ✨ Features Implemented

- ✅ JWT Authentication
- ✅ Role-Based Access Control
- ✅ Protected Routes
- ✅ QR Code Display
- ✅ QR Code Scanner
- ✅ Complete API Integration
- ✅ Error Handling
- ✅ Loading States
- ✅ Responsive Design (Tailwind CSS)

