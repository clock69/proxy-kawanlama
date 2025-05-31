const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Ganti URL ini jika API tujuan Anda berubah
const TARGET_URL = "https://panel.khfy-store.com/api/api-xl-v7/cek_stock_akrab";

// Middleware agar CORS tidak error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Boleh diakses dari mana saja
  next();
});

// Route proxy: /cek-stok
app.get("/cek-stok", async (req, res) => {
  try {
    const response = await fetch(TARGET_URL, { cache: "no-store" });
    const data = await response.json();
    res.json(data); // Kirim balik ke browser
  } catch (error) {
    console.error("Gagal fetch:", error.message);
    res.status(500).json({ error: "Gagal mengambil data", detail: error.message });
  }
});

// Jalankan server di port 3000 (atau port lain di Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy aktif di http://localhost:${PORT}`);
});
