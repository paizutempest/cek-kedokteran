# 🏥 Pharmacy Billing & Receipt Simulator Bot

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.x-green.svg)](https://nodejs.org/)
[![Library](https://img.shields.io/badge/library-Telegraf%20%26%20Canvas-blue.svg)](https://github.com/telegraf/telegraf)

**Pharmacy Receipt Simulator** adalah bot otomatis untuk menghasilkan simulasi visual rincian biaya obat-obatan secara acak. Proyek ini menggunakan **Canvas API** untuk rendering gambar dan **Telegraf** sebagai interface bot.

---

## ⚠️ PERINGATAN PENTING (DISCLAIMER)

1. **Hanya Simulasi:** Alat ini dibuat murni untuk tujuan edukasi, referensi desain grafis, dan simulasi sistem kasir farmasi[cite: 1, 2].
2. **Tanggung Jawab Pengguna:** Segala resiko, kerugian, atau tuntutan hukum yang muncul akibat penggunaan/penyalahgunaan bot ini **DITANGGUNG SEPENUHNYA OLEH PENGGUNA**.
3. **Penyalahgunaan:** Pengembang **TIDAK BERTANGGUNG JAWAB** atas penggunaan hasil simulasi ini untuk tindakan penipuan, klaim asuransi palsu, atau aktivitas ilegal lainnya.
4. **Data:** Nama rumah sakit, dokter, dan harga yang muncul adalah hasil acak sistem (dummy data) dan tidak mencerminkan data medis asli dari institusi terkait[cite: 1, 2].

---

## ✨ Fitur Utama

- 🎨 **Graphic Rendering:** Desain struk dengan font Courier dan tata letak profesional[cite: 1].
- 🏥 **Random Data Pool:** Data acak meliputi rumah sakit, dokter spesialis, dan daftar obat-obatan[cite: 1, 2].
- 📊 **User Tracking:** Database JSON untuk memantau aktivitas generate global dan per user[cite: 1].
- 🛡️ **Rate Limiting:** Batasan generate 3 kali per hari untuk setiap pengguna guna mencegah spam[cite: 1].
- ⚡ **Automated Billing:** Kalkulasi otomatis biaya admin dan total bayar[cite: 1, 2].

---

## 🚀 Instalasi Cepat

1. **Instal Dependensi:**
   ```bash
   npm install telegraf canvas
