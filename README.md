<p align="center"><a href="https://github.com/0xilham/blockchain-bank-recycle-waste" target="_blank"><img src="https://github.com/0xilham/blockchain-bank-recycle-waste/blob/d173b17699edc438f94cb02aa32372e283a2caed/public/assets/logo.png" width="400" alt="Logo"></a></p>

# Panduan Instalasi Program

Langkah-langkah Menjalankan Program Web aplikasi menggunakan framework react js bernama Next JS.

## About Next JS

Next.js adalah kerangka kerja React.js yang menawarkan berbagai fitur dan optimasi untuk membuat aplikasi web yang cepat dan efisien. Next js biasa digunakan oleh beberapa perusahaan terbesar di dunia, Next.js memungkinkan kita membuat aplikasi Web full-stack dengan memperluas fitur React terbaru, dan mengintegrasikan tools JavaScript berbasis Rust yang kuat untuk pembuatan tercepat.

### Learning Next Js

Untuk mempelajari lebih lanjut penggunaan framework ini bisa buka di halaman [documentation](https://nextjs.org/docs) milik Next Js.

## Langkah-langkah Menjalankan Program

### Langkah 1: Clone Project ke direktori

1. Buka terminal.
2. Lakukan cloning repository dengan mengetik:

```sh
git clone https://github.com/0xilham/blockchain-bank-recycle-waste.git
```

lalu enter. Setelah melakukan cloning terhadap repository berhasil, lanjut langkah selanjutnya.

3. Masuk ke direktori proyek dengan menggunakan perintah:

```sh
cd blockchain-bank-recycle-waste
```

4. Lakukan instalasi node modules dengan perintah berikut:

```sh
npm install
```

setelah berhasil kemudian lanjut langkah berikutnya.

5. Menjalankan Server dengan melakukan perintah:
   untuk mode development jalankan perintah berikut:

```sh
npm run dev
```

untuk membangun aplikasi dalam penggunaan production, jalankan perintah berikut:

```sh
npm run build
```

untuk memulai server production Next.js, jalankan perintah berikut:

```sh
npm run start
```

untuk menyiapkan konfigurasi ESLint bawaan Next.js, jalankan perintah berikut:

```sh
npm run lint
```

### Langkah 2: Menampilkan Halaman Website

Buka http://localhost:3000 dengan browser Anda untuk melihat hasilnya.

### Langkah 3: Program Berhasil Dijalankan

Sekarang kamu sudah dapat melihat tampilan website aplikasi dengan membuka localhost tersebut.

## Tampilan awal setelah dijalankan

![App Screenshot](https://github.com/0xilham/blockchain-bank-recycle-waste/blob/d173b17699edc438f94cb02aa32372e283a2caed/public/assets/ss.png)

# Panduan Menjadi Admin

Ada beberapa yang perlu kita lakukan sebelum menjadi admin atau mendapat hak akses sebagai admin pada website project ini, untuk mengakses halaman dashboard admin sesuai dengan wallet address yang kita tentukan, cukup perlu mengganti variabel adminAddress seperti berikut:

```js
const adminAddress = "0x...";
```

- isi string dengan wallet address yang akan dijadikan admin

Ubah semua beberapa code diatas pada path berikut:

- pages/DashboardAdmin/index.js
- pages/Dashboard/index.js

## Mengakses Halaman admin

Sign In terlebih dahulu dengan wallet address yang sama.

Untuk membuka halaman admin kita cukup mengklik tombol `Create Now` dengan klik Create pada navigasi dan akan bergulir ke paling bawah mengarahkan ke tombol tersebut. `Klik tulisannya` Pada tombol `Create Now` dan akan otomatis masuk ke dalam halaman Dashboard Admin.
