Link Youtube : https://youtu.be/dPTt5C26xCc?si=NQqSGSLnSYoq7v1h

# Luna Menstrual Cycle Tracker
1. **Halaman Register dan Login**

![Screenshot 2025-05-29 131039](https://github.com/user-attachments/assets/e5b7e68c-39ec-4371-a6bc-ff96cd1fa953)

![Screenshot 2025-05-29 131022](https://github.com/user-attachments/assets/ce8090db-3b81-4602-85cb-e3a976e65ed4)

2. **Halaman Dashboard Luna**
![alt text](<Screenshot 2025-05-29 131125.png>)

3. **Halaman Kalender**
![Screenshot 2025-05-29 131209](https://github.com/user-attachments/assets/1c6189b0-6e03-4b99-976a-d07b8c12e75a)

4. **Halaman Pelacak Mood**
![Screenshot 2025-05-29 131234](https://github.com/user-attachments/assets/49afb749-aa5e-45b0-91a2-82f018ed61bd)

5. **Halaman Pelacak Gejala**
![Screenshot 2025-05-29 131320](https://github.com/user-attachments/assets/03fa0d4f-efcb-4ba6-80e6-6d9b3242005b)

6. **Halaman Pengingat Obat**
![Screenshot 2025-05-29 131404](https://github.com/user-attachments/assets/b7f185ae-55d7-40d4-a151-eadfc4af749e)

7. **Halaman Pengaturan**
![Screenshot 2025-05-29 131430](https://github.com/user-attachments/assets/1f373abc-c975-4149-975c-a7c89e37c9c4)

## Deskripsi Aplikasi
Luna Menstrual Cycle Tracker adalah aplikasi pelacak kesehatan reproduksi yang dirancang untuk membantu pengguna memantau siklus menstruasi, suasana hati, gejala, dan pengingat obat mereka. Aplikasi ini menyediakan antarmuka yang intuitif dan menyenangkan untuk melacak dan mengelola kesehatan secara holistik.

## Teknologi yang Digunakan

### Frontend
- React.js (dengan TypeScript)
- Tailwind CSS untuk styling
- React Router untuk navigasi
- React Context API untuk manajemen state
- shadcn/ui untuk komponen UI
- react-hook-form untuk pengelolaan form
- date-fns untuk manipulasi tanggal

### Backend
- Python Pyramid (framework)
- PostgreSQL (database)
- SQLAlchemy (ORM)
- Alembic (migrasi database)
- RESTful API
- Sistem autentikasi JWT
- Cookiecutter untuk pembuatan proyek

## Fitur Utama
- **Kalender Siklus**: Visualisasi dan pelacakan siklus menstruasi dengan prediksi periode mendatang
- **Pelacak Suasana Hati**: Catat suasana hati setiap hari dan lihat pola dari waktu ke waktu
- **Pelacak Gejala**: Dokumentasikan gejala fisik untuk mengidentifikasi pola dan pemicu
- **Pengingat Obat**: Atur dan kelola pengingat untuk obat-obatan dan suplemen
- **Tips Kesehatan Harian**: Dapatkan tips untuk membantu mengelola kesehatan Anda
- **Autentikasi Pengguna**: Keamanan dengan sistem login/registrasi
- **UI Responsif dan User-Friendly**


### Dependensi Paket (Library)
- Python >= 3.10
- Pyramid (framework backend)
- SQLAlchemy
- psycopg2 (koneksi ke PostgreSQL)
- PostgreSQL (basis data)
- Tailwind CSS 

## Instalasi Frontend

```bash

# Pindah ke direktori frontend
cd fe-luna

# Instal dependensi
npm install

# Jalankan aplikasi dalam mode pengembangan
npm run dev
```

Aplikasi akan berjalan di [http://localhost:8080](http://localhost:8080) (atau port yang tersedia).

## Instalasi Backend

### Membuat Proyek Baru dengan Cookiecutter

```bash
# Instal cookiecutter
pip install cookiecutter


### Setup Manual

```bash
# Pindah ke direktori backend
cd be-luna

# Buat dan aktifkan virtual environment
python -m venv venv
venv\Scripts\activate
# Untuk Mac : source venv/bin/activate  

# Instal dependensi
pip install -e .

# Konfigurasi lingkungan
# Buat file .env dengan contoh:
echo "DB_URL=postgresql://username:password@localhost:5432/luna_backend" > .env
echo "JWT_SECRET=your_secret_key_here" >> .env
echo "CORS_ORIGIN=http://localhost:5173" >> .env

# Buat migrasi database awal
create_luna_migration development.ini "initial_schema"

# Setup database dengan Alembic
initialize_luna_db development.ini --alembic

# Jalankan server development
pserve development.ini --reload
```

Server backend akan berjalan di [http://localhost:8000](http://localhost:8000).

## Cara Penggunaan / Integrasi Backend dan Frontend

1. **Konfigurasi Endpoint API**:
   - Buat file `.env` di direktori frontend dengan format:
     ```
     VITE_API_URL=http://localhost:5432
     ```

2. **Otentikasi**:
   - Gunakan endpoint `/api/auth/register` untuk mendaftar.
   - Gunakan endpoint `/api/auth/login` untuk login dan dapatkan token.
   - Token harus disertakan dalam header `Authorization: Bearer <token>` untuk permintaan API yang memerlukan otentikasi.

3. **Endpoints Utama**:
   - Siklus: `/api/cycles`
   - Suasana Hati: `/api/moods`
   - Gejala: `/api/symptoms`
   - Pengingat Obat: `/api/medications`
   - Tips Kesehatan: `/api/tips`

4. **Manajemen Database**:
   - Buat migrasi baru setelah mengubah model:
     ```bash
     create_luna_migration development.ini "deskripsi_perubahan"
     ```
   - Terapkan migrasi:
     ```bash
     alembic -c alembic.ini upgrade head
     ```

5. **Pengujian Integrasi**:
   - Pastikan kedua server (frontend dan backend) berjalan.
   - Gunakan Postman atau Insomnia untuk menguji endpoints API.
   - Verifikasi integrasi frontend-backend menggunakan panel Network di Developer Tools browser.

## Referensi 
- National Institutes of Health - Menstrual Health
- Pyramid Web Framework
- PostgreSQL Official Site
- Aplikasi referensi seperti Flo
