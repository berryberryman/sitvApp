# Panduan Setup Supabase untuk siTV Finance App

## 1. Setup Database di Supabase

### Buat tabel `users`:

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
```

### Buat tabel `transactions`:

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'income' atau 'expense'
  category VARCHAR(100),
  amount DECIMAL(15, 2) NOT NULL,
  description TEXT,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. Setup Environment Variables

Copy file `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Isi dengan credentials Supabase Anda:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
PORT=3000
NODE_ENV=development
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Test Koneksi Lokal

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 5. Deploy ke Vercel

1. Push code ke GitHub
2. Di Vercel, connect repository Anda
3. Add environment variables yang sama di Vercel project settings
4. Deploy

Itu saja! Database Anda akan tersinkronisasi otomatis.
