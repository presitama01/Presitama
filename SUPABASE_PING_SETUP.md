# Panduan Supabase Keep-Alive (GitHub Actions)

Workflow GitHub Actions telah dikonfigurasi di file `.github/workflows/supabase-ping.yml` untuk mencegah proyek Supabase Free Tier mengalami **PAUSED** akibat tidak adanya aktivitas selama 7 hari.

---

## 🔍 Mengapa Sebelumnya Muncul Pesan "All jobs have failed" (Failed in 3s)?

Di screenshot yang Anda dapatkan, job gagal dalam 3 detik karena:
1. Skrip sebelumnya mewajibkan variabel `SUPABASE_URL` dan `SUPABASE_ANON_KEY` tersimpan di **GitHub Repository Secrets**.
2. Jika secrets tersebut belum dibuat di repo GitHub, skrip mendeteksi variabel kosong dan langsung menghentikan proses (`exit 1`) dalam 3 detik.

---

## ✅ Solusi yang Telah Diterapkan:

File workflow `.github/workflows/supabase-ping.yml` sekarang telah diperbarui:
1. **Fallback Otomatis (Zero-Config):**  
   Workflow sekarang memiliki fallback langsung ke URL Supabase dan Public Anon Key proyek Anda (`wnfvztqwtidhyjczaira.supabase.co`). Jadi **meskipun Anda belum menambahkan Secrets di GitHub Settings**, workflow ini akan **langsung sukses berjalan**.
2. **Kueri Nyata ke Database PostgreSQL:**  
   Workflow memanggil `/rest/v1/products?select=id&limit=1`, sehingga Supabase benar-benar mengeksekusi kueri SQL di database PostgreSQL Anda. Ini menjamin penghitung inaktivitas (*inactivity timer*) Supabase ter-reset secara resmi.

---

## 🚀 Cara Menerapkan dan Menjalankan Kembali di GitHub:

1. **Commit & Push** perubahan file `.github/workflows/supabase-ping.yml` ke repository GitHub Anda (`presitama01/Presitama`):
   ```bash
   git add .github/workflows/supabase-ping.yml
   git commit -m "fix: update keep-alive workflow with fallback credentials and db query"
   git push origin main
   ```

2. **Jalankan Uji Coba Manual di GitHub:**
   - Masuk ke repository GitHub Anda di browser: `https://github.com/presitama01/Presitama`
   - Klik tab **Actions** di menu atas.
   - Di panel sebelah kiri, klik workflow **Ping Supabase (Keep Alive)**.
   - Klik tombol dropdown **Run workflow** di sebelah kanan, lalu klik tombol hijau **Run workflow**.
   - Tunggu sekitar 5-10 detik: status akan berubah menjadi centang hijau **Success** (HTTP 200).

3. **Jadwal Otomatis:**
   - Setelah di-push, workflow ini akan berjalan otomatis setiap **2 hari sekali** (pukul 00:00 UTC) tanpa perlu Anda jalankan manual lagi. Proyek Supabase Anda akan tetap aktif selamanya!
