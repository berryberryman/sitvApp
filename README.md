# siTV Finance App - Panduan Setup dengan Supabase & Vercel

Aplikasi sistem informasi keuangan dengan multi-user yang terintegrasi dengan Supabase dan siap deploy ke Vercel.

## 📁 Struktur Folder

```
sitvApp/
├── index.html              # Frontend utama
├── server.js              # Server Express
├── package.json           # Dependencies
├── .env                   # Environment variables (jangan di-commit)
├── .env.example          # Template env vars
├── .gitignore           # Git ignore rules
├── SETUP_SUPABASE.md    # Panduan setup database
├── src/
│   ├── config/
│   │   └── supabase.js  # Konfigurasi Supabase client
│   ├── controllers/
│   │   └── authController.js  # Logic untuk auth
│   ├── routes/
│   │   └── authRoutes.js      # API routes
│   └── middleware/
│       └── auth.js           # Middleware authentication
```

## 🚀 Langkah Setup Cepat

### 1. Instalasi Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buka https://app.supabase.com
2. Buat project baru atau gunakan yang sudah ada
3. Pergi ke **Settings → API** dan salin:
   - **Project URL**
   - **anon public key**
   - **service_role key**

### 3. Setup Database di Supabase

Di Supabase SQL Editor, jalankan query berikut:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  amount DECIMAL(15, 2) NOT NULL,
  description TEXT,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Setup Environment Variables

Copy `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Isi file `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
PORT=3000
NODE_ENV=development
```

### 5. Test Lokal

```bash
npm run dev
```

Buka browser: `http://localhost:3000`

## 🌐 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git add .
git commit -m "Initial setup dengan Supabase"
git push origin main
```

### 2. Connect ke Vercel

1. Buka https://vercel.com
2. Login dengan akun GitHub
3. Klik **Add New → Project**
4. Pilih repository Anda
5. Klik **Deploy**

### 3. Setup Environment Variables di Vercel

1. Pergi ke **Settings → Environment Variables**
2. Tambahkan 3 variable:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Klik **Save** dan **Redeploy**

## 🔐 API Endpoints

### Login

```
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
Response: { "success": true, "user": {...} }
```

### Logout

```
POST /api/auth/logout
Response: { "success": true, "message": "Logout berhasil" }
```

### Get Current User

```
GET /api/auth/me
Response: { "success": true, "user": {...} }
```

## 📝 Catatan Penting

- File `.env` tidak boleh di-commit (sudah di `.gitignore`)
- Passwords di-store dalam plaintext (untuk production, gunakan bcrypt)
- Session/token handling bisa dikembangkan lebih lanjut
- Database sudah auto-sync dengan Vercel via Supabase

## 🎯 Next Steps

1. ✅ Database sudah setup
2. ✅ API endpoints sudah siap
3. ⏭️ Test login di lokal
4. ⏭️ Deploy ke Vercel
5. ⏭️ Implementasi more features

## 💡 Tips

- Gunakan `npm run dev` untuk development dengan auto-reload
- Check console browser untuk debug frontend
- Check server logs untuk debug backend
- Supabase dashboard untuk manage data

Selamat! Aplikasi Anda siap terhubung dengan Supabase! 🎉
