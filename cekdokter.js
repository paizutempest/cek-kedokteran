const { createCanvas } = require('canvas');
const fs = require('fs');

// Kumpulan Data Acak
const hospitals = [
    { name: "RS Medika Utama", addr: "Jl. Basuki Rahmat No. 102, Surabaya", telp: "(031) 531-xxxx" },
    { name: "Klinik Harapan Sehat", addr: "Jl. Manyar Kertoarjo No. 45, Surabaya", telp: "(031) 594-xxxx" },
    { name: "Apotek & Klinik Jaya", addr: "Jl. Dharmawangsa No. 20, Surabaya", telp: "(031) 502-xxxx" },
    { name: "RS International Health", addr: "Jl. HR Muhammad No. 17, Surabaya", telp: "(031) 732-xxxx" }
];

const doctors = ["dr. Budi Setiawan", "dr. Siti Aminah", "dr. Kevin Wijaya", "dr. Maria Ulfa", "dr. Hendra Pratama"];
const patients = ["Andi Perkasa", "Sari Indah", "Rizky Ramadan", "Dewi Lestari", "Bambang Sugeng"];
const medsPool = [
    { n: "Amoxicillin 500mg", p: 3500 }, { n: "Paracetamol 500mg", p: 2000 },
    { n: "Cefadroxil 500mg", p: 8000 }, { n: "Dexamethasone", p: 1500 },
    { n: "Vitamin B Complex", p: 5000 }, { n: "Antasida Doen", p: 2000 }
];

async function generateBill() {
    const width = 600;
    const height = 800;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background Putih
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Pilih Data Acak
    const rs = hospitals[Math.floor(Math.random() * hospitals.length)];
    const dr = doctors[Math.floor(Math.random() * doctors.length)];
    const pt = patients[Math.floor(Math.random() * patients.length)];
    const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // Header
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(rs.name, width / 2, 50);
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText(rs.addr, width / 2, 75);
    ctx.fillText(`Telp: ${rs.telp}`, width / 2, 95);

    ctx.beginPath();
    ctx.moveTo(30, 110);
    ctx.lineTo(570, 110);
    ctx.stroke();

    // Judul & Info
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px Arial';
    ctx.fillText("KUITANSI FARMASI", width / 2, 150);

    ctx.textAlign = 'left';
    ctx.font = '14px Arial';
    ctx.fillText(`Tanggal   : ${date}`, 40, 190);
    ctx.fillText(`Pasien     : ${pt}`, 40, 215);
    ctx.fillText(`Dokter      : ${dr}`, 40, 240);

    // Tabel Header
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(40, 270, 520, 30);
    ctx.fillStyle = '#000000';
    ctx.strokeRect(40, 270, 520, 30);
    ctx.fillText("Obat", 50, 290);
    ctx.fillText("Qty", 350, 290);
    ctx.fillText("Subtotal", 450, 290);

    // Isi Tabel (Acak 2-4 obat)
    let y = 320;
    let total = 0;
    const count = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < count; i++) {
        const med = medsPool[Math.floor(Math.random() * medsPool.length)];
        const qty = Math.floor(Math.random() * 10) + 5;
        const sub = med.p * qty;
        total += sub;

        ctx.fillText(med.n, 50, y);
        ctx.fillText(qty.toString(), 350, y);
        ctx.fillText(`Rp ${sub.toLocaleString('id-ID')}`, 450, y);
        y += 30;
    }

    // Total
    const admin = 10000;
    total += admin;
    ctx.fillText("Biaya Admin", 50, y);
    ctx.fillText(`Rp ${admin.toLocaleString('id-ID')}`, 450, y);

    ctx.font = 'bold 16px Arial';
    ctx.fillText("TOTAL BAYAR", 300, y + 50);
    ctx.fillText(`Rp ${total.toLocaleString('id-ID')}`, 450, y + 50);

    // Footer
    ctx.font = '14px Arial';
    ctx.fillText("Kasir,", 450, height - 100);
    ctx.fillText("( Keuangan )", 435, height - 30);

    // Simpan ke JPG
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('./kuitansi_otomatis.jpg', buffer);
    console.log("Kuitansi berhasil dibuat: kuitansi_otomatis.jpg");
}

generateBill();