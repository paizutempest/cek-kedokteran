const { Telegraf } = require('telegraf');
const { createCanvas } = require('canvas');
const fs = require('fs');

const bot = new Telegraf('BOT TELE KAMU');
const DB_FILE = './database.json';

// --- DATA POOLS ---
const hospitals = [
    { name: "RSUD Dr. Soetomo", addr: "Jl. Mayjen Prof. Dr. Moestopo No. 6-8, Surabaya", telp: "(031) 5501078" },
    { name: "Siloam Hospitals Surabaya", addr: "Jl. Raya Gubeng No. 70, Surabaya", telp: "(031) 99206900" },
    { name: "RS Premier Surabaya", addr: "Jl. Nginden Intan Barat Blok B, Surabaya", telp: "(031) 5993211" },
    { name: "National Hospital", addr: "Jl. Boulevard Famili Sel. No. Kav. 1, Surabaya", telp: "(031) 2975777" }
];

const doctors = ["dr. Bambang Irawan, Sp.PD", "dr. Anita Wijaya, Sp.A", "dr. Lukman Hakim, Sp.THT", "dr. Sarah Azhari, Sp.GK"];
const medsPool = [
    { n: "Amoxicillin 500mg", p: 4500 }, { n: "Paracetamol 500mg", p: 2500 },
    { n: "Cefadroxil 500mg", p: 12000 }, { n: "Dexamethasone", p: 3500 },
    { n: "Vitamin C 1000mg", p: 15000 }, { n: "Antasida Doen", p: 4000 },
    { n: "Omeprazole 20mg", p: 18000 }, { n: "Methylprednisolone", p: 9000 }
];

// --- DATABASE LOGIC ---
let db = { globalCount: 0, users: {} };
if (fs.existsSync(DB_FILE)) db = JSON.parse(fs.readFileSync(DB_FILE));

function save() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

// --- GENERATOR GAMBAR MEWAH ---
async function drawMewah() {
    const w = 600, h = 850;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    const rs = hospitals[Math.floor(Math.random() * hospitals.length)];
    const dr = doctors[Math.floor(Math.random() * doctors.length)];
    const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const noTrans = `TRX-${Date.now().toString().slice(-6)}-${Math.floor(Math.random()*100)}`;

    // Background & Border
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w-20, h-20);

    // Header
    ctx.fillStyle = '#1a252f';
    ctx.font = 'bold 26px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(rs.name.toUpperCase(), w/2, 60);
    ctx.font = '13px Arial';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText(rs.addr, w/2, 85);
    ctx.fillText(`Telp: ${rs.telp} | Website: www.${rs.name.split(' ')[0].toLowerCase()}.com`, w/2, 105);

    ctx.beginPath();
    ctx.moveTo(30, 120); ctx.lineTo(570, 120); ctx.stroke();

    // Info Section
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000';
    ctx.font = 'bold 15px Arial';
    ctx.fillText("RINCIAN BIAYA FARMASI", 40, 160);
    
    ctx.font = '14px Courier New'; // Pake Courier biar ala struk asli
    ctx.fillText(`No. Trans : ${noTrans}`, 40, 200);
    ctx.fillText(`Tanggal   : ${date}`, 40, 225);
    ctx.fillText(`Dokter    : ${dr}`, 40, 250);
    ctx.fillText(`Unit      : Farmasi Rawat Jalan`, 40, 275);

    // Tabel Header
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(40, 300, 520, 35);
    ctx.strokeRect(40, 300, 520, 35);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 13px Arial';
    ctx.fillText("NAMA OBAT", 50, 323);
    ctx.fillText("QTY", 330, 323);
    ctx.fillText("HARGA", 400, 323);
    ctx.fillText("TOTAL", 500, 323);

    // Isi Tabel Acak
    let y = 360;
    let subtotal = 0;
    const items = medsPool.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 3);
    
    items.forEach(item => {
        const qty = Math.floor(Math.random() * 5) + 2;
        const lineTotal = item.p * qty;
        subtotal += lineTotal;
        ctx.font = '13px Arial';
        ctx.fillText(item.n, 50, y);
        ctx.fillText(qty.toString(), 335, y);
        ctx.fillText(item.p.toLocaleString(), 400, y);
        ctx.fillText(lineTotal.toLocaleString(), 500, y);
        y += 35;
    });

    // --- PERBAIKAN FINAL SUMMARY ---
    const admin = 15000;
    const total = subtotal + admin;
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#2c3e50';
    ctx.beginPath(); 
    ctx.moveTo(340, y + 10); 
    ctx.lineTo(565, y + 10); 
    ctx.stroke();
    
    // Teks Subtotal & Admin (Rata Kanan)
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText("Subtotal Obat", 350, y + 40);
    ctx.textAlign = 'right';
    ctx.fillText(`Rp ${subtotal.toLocaleString()}`, 555, y + 40);
    
    ctx.textAlign = 'left';
    ctx.fillText("Biaya Admin", 350, y + 65);
    ctx.textAlign = 'right';
    ctx.fillText(`Rp ${admin.toLocaleString()}`, 555, y + 65);

    // BLOCK TOTAL BAYAR (Warna Biru Tua Sesuai Gambar)
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(340, y + 85, 225, 45); 
    
    // TEKS DI DALAM BLOCK (Putih & Menyatu)
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.font = 'bold 15px Arial';
    ctx.fillText("TOTAL BAYAR", 355, y + 115); // Geser dikit dari kiri kotak
    
    ctx.textAlign = 'right';
    ctx.font = 'bold 17px Arial';
    ctx.fillText(`Rp ${total.toLocaleString()}`, 555, y + 115); // Rata kanan kotak
    
    // Reset kembali ke default agar tidak merusak elemen lain
    ctx.textAlign = 'left';

    // Footer Signature
    ctx.fillStyle = '#000';
    ctx.font = 'italic 12px Arial';
    ctx.fillText("Semoga Lekas Sembuh", 40, h - 80);
    ctx.textAlign = 'center';
    ctx.font = '13px Arial';
    ctx.fillText("Kasir / Finance", 480, h - 120);
    ctx.fillText("( .................... )", 480, h - 40);

    return canvas.toBuffer('image/jpeg');
}
bot.start((ctx) => {
    const welcomeMsg = `
<b>🏥 Selamat Datang di Bot Farmasi Mandiri! 🏥</b>

Halo <b>${ctx.from.first_name}</b>! Bot ini didesain untuk membantu kamu membuat simulasi struk rincian biaya obat secara acak untuk keperluan referensi atau arsip pribadi.

📊 <b>Informasi Bot:</b>
• <b>Limit Harian:</b> 3 kali generate per hari.
• <b>Reset:</b> Otomatis setiap pukul 00:00 WIB.
• <b>Status:</b> Global Counter Aktif.

🚀 <b>Cara Penggunaan:</b>
Cukup ketik atau klik perintah di bawah:
/generate - Untuk membuat struk baru secara acak.

⚠️ <i>Penyalahgunaan hasil simulasi di luar tanggung jawab pengembang.</i>`;
    

    ctx.reply(welcomeMsg, { parse_mode: 'HTML' });
    
    console.log(`[${new Date().toLocaleTimeString()}] New User Started: ${ctx.from.first_name}`);
});
// --- COMMANDS ---
bot.command('generate', async (ctx) => {
    const uid = ctx.from.id;
    const today = new Date().toDateString();

    if (!db.users[uid]) db.users[uid] = { count: 0, lastDate: today, total: 0 };
    if (db.users[uid].lastDate !== today) { db.users[uid].count = 0; db.users[uid].lastDate = today; }

    if (db.users[uid].count >= 3) return ctx.reply("⚠️ Limit harian (3x) tercapai!");

    console.log(`[${new Date().toLocaleTimeString()}] Generating for ${ctx.from.first_name}...`);
    
    const buffer = await drawMewah();
    db.globalCount++;
    db.users[uid].count++;
    db.users[uid].total++;
    save();

    await ctx.replyWithPhoto({ source: buffer }, {
        caption: `✅ **Struk Berhasil Dibuat!**\n\n👤 Total Kamu: ${db.users[uid].total}\n🌍 Total Global: ${db.globalCount}\n📊 Sisa Kuota: ${3 - db.users[uid].count}`
    });
});

bot.launch().then(() => console.log('🚀 BOT MEWAH ONLINE!'));