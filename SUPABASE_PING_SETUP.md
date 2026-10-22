# Panduan Konfigurasi Supabase Keep-Alive (GitHub Actions)

Untuk mencegah database Supabase Free Tier Anda mengalami **PAUSE** karena tidak aktif selama 7 hari, workflow GitHub Actions otomatis telah dibuat di `.github/workflows/supabase-ping.yml`. Workflow ini akan melakukan ping ke Supabase setiap **2 hari sekali**.

## Langkah-langkah Setup di GitHub:

1. **Buka Repository GitHub Anda** tempat proyek ini di-push.
2. Masuk ke menu **Settings** > **Secrets and variables** > **Actions**.
3. Klik tombol **New repository secret** dan tambahkan 2 secrets berikut:

   - **Secret 1:**
     - **Name:** `SUPABASE_URL`
     - **Value:** `https://wnfvztqwtidhyjczaira.supabase.co` *(atau URL Supabase Anda)*

   - **Secret 2:**
     - **Name:** `SUPABASE_ANON_KEY`
     - **Value:** *(Masukkan Anon/Public API Key Supabase Anda)*

4. Setelah secrets ditambahkan, workflow akan otomatis berjalan setiap 2 hari sesuai jadwal cron (`0 0 */2 * *`).
5. Anda juga dapat mengujinya secara manual kapan saja dengan masuk ke tab **Actions** di GitHub, pilih **Ping Supabase (Keep Alive)**, lalu klik **Run workflow**.
