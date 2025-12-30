# 📚 SQLearn - Nền Tảng Học SQL Tương Tác

> Một nền tảng học SQL toàn diện với backend Laravel, ứng dụng di động React Native, và giao diện web hiện đại sử dụng kiến trúc micro-frontend.

[![Laravel](https://img.shields.io/badge/Laravel-12-red.svg)](https://laravel.com)
[![React Native](https://img.shields.io/badge/React%20Native-Latest-61dafb.svg)](https://reactnative.dev)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()

---

## 🎯 Giới Thiệu Dự Án

**SQLearn** là một nền tảng học tập SQL hiện đại, cung cấp môi trường học tập tương tác cho người dùng từ cơ bản đến nâng cao. Dự án được xây dựng với kiến trúc phân tán, bao gồm:

- **Backend API**: Laravel 12 với Repository Pattern
- **Mobile App**: React Native hỗ trợ iOS & Android
- **Web Application**: React với kiến trúc Micro-Frontend
- **SQL Editor**: TipTap Editor tích hợp sẵn

---

## 🏗️ Kiến Trúc Dự Án

```
SQLearn/
├── backend/          # Laravel API Backend (Repository Pattern)
├── mobile/           # React Native Mobile App (iOS & Android)
└── web/              # React Web Application (Micro-Frontends)
    ├── sql_biz01_front/       # Business Module Frontend
    ├── sql_kernel_front/      # Core Kernel Module
    ├── sql_shell_front/       # Shell Application
    ├── reactjs-tiptap-editor/ # SQL Editor Component
    └── sql_libs_front/       # Shared Libraries
```

---

## ✨ Tính Năng Chính

### 🎓 Học Tập & Thực Hành
- ✅ Bài học SQL có cấu trúc từ cơ bản đến nâng cao
- ✅ Hệ thống câu hỏi trắc nghiệm và bài tập thực hành
- ✅ Theo dõi tiến độ học tập cá nhân

### 👨‍💼 Quản Lý & Tổ Chức
- ✅ Quản lý người dùng và phân quyền
- ✅ Hệ thống tổ chức và nhóm học tập
- ✅ Dashboard thống kê và báo cáo
- ✅ Quản lý nội dung học liệu

### 📱 Đa Nền Tảng
- ✅ Ứng dụng mobile native (iOS & Android)
- ✅ Web application responsive
- ✅ Đồng bộ dữ liệu realtime
- ✅ Offline mode support (Mobile)

---

## 🚀 Bắt Đầu Nhanh

### Yêu Cầu Hệ Thống

- **PHP**: >= 8.2
- **Node.js**: >= 18.x
- **MySQL**: >= 8.0
- **Composer**: Latest
- **npm/yarn**: Latest

### 1️⃣ Backend Setup

```powershell
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

📖 Chi tiết: [Backend README](./backend/README.md)

### 2️⃣ Mobile App Setup

```powershell
cd mobile
npm install
# hoặc yarn install

# Chạy trên Android
yarn run:android_dev

# Chạy trên iOS
yarn run:ios_dev
```

📖 Chi tiết: [Mobile README](./mobile/README.md)

### 3️⃣ Web Application Setup

```powershell
cd web/sql_shell_front
npm install
npm run dev
```

---

## 📂 Cấu Trúc Chi Tiết

### Backend (`/backend`)
```
backend/
├── app/
│   ├── Http/Controllers/    # API Controllers
│   ├── Repositories/        # Data Access Layer
│   ├── Services/            # Business Logic
│   └── Models/              # Eloquent Models
├── database/
│   ├── migrations/          # Database Migrations
│   └── seeders/             # Sample Data
├── routes/
│   └── api.php              # API Routes
└── API_ENDPOINTS.md         # API Documentation
```

### Mobile (`/mobile`)
```
mobile/
├── src/
│   ├── screens/             # App Screens
│   ├── components/          # Reusable Components
│   ├── navigation/          # Navigation Config
│   ├── redux/               # State Management
│   ├── services/            # API Services
│   └── utils/               # Utilities
├── android/                 # Android Native Code
└── ios/                     # iOS Native Code
```

### Web (`/web`)
```
web/
├── sql_shell_front/          # Main Shell Application
├── sql_kernel_front/         # Core Kernel Module
├── sql_biz01_front/          # Business Module
├── reactjs-tiptap-editor/   # SQL Editor
└── sql_libs_front/          # Shared Libraries
```

---

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Framework**: Laravel 12
- **Database**: MySQL
- **Authentication**: Laravel Sanctum & Fortify
- **Storage**: Google Drive (FlysystemGoogleDrive)
- **Cache**: Redis (Predis)
- **Excel**: PHPSpreadsheet
- **Firebase**: Firebase PHP SDK

### Mobile
- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: Redux
- **Navigation**: React Navigation
- **API Client**: Axios
- **Testing**: Jest

### Web
- **Framework**: React 18
- **Build Tool**: Vite
- **Editor**: TipTap
- **Architecture**: Micro-Frontend
- **Backend**: Python (Flask/FastAPI) cho một số module

