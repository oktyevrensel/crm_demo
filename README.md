# CRM Demo - İş Görüşmeleri İçin

Bu proje, iş görüşmelerinde demo olarak gösterilebilecek basitleştirilmiş bir CRM uygulamasıdır. Orijinal uygulamadan karmaşık özellikler çıkarılarak, temel CRM işlevleri korunmuştur.

## 🚀 Özellikler

### Frontend (React + TypeScript + Material-UI)
- **Dashboard**: Genel istatistikler ve grafikler
- **Müşteri Yönetimi**: Doktor ve eczane müşterilerini yönetme
- **Ziyaret Yönetimi**: Ziyaret planlama ve takibi
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Tema Desteği**: Açık/koyu mod

### Backend (Node.js + Express + TypeScript)
- **RESTful API**: Temel CRUD işlemleri
- **Demo Veri**: Önceden tanımlanmış örnek veriler
- **CORS Desteği**: Frontend ile entegrasyon
- **Hata Yönetimi**: Kullanıcı dostu hata mesajları

## 📁 Proje Yapısı

```
github_crm/
├── frontend/                 # React uygulaması
│   ├── src/
│   │   ├── components/       # UI bileşenleri
│   │   ├── pages/           # Sayfa bileşenleri
│   │   ├── contexts/        # React Context'ler
│   │   ├── types/           # TypeScript tipleri
│   │   └── config/          # Konfigürasyon dosyaları
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── routes/          # API route'ları
│   │   └── index.ts         # Ana server dosyası
│   └── package.json
└── README.md
```

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Backend Kurulumu
```bash
cd backend
npm install
npm run dev
```
Backend http://localhost:3000 adresinde çalışacak.

### Frontend Kurulumu
```bash
cd frontend
npm install
npm run dev
```
Frontend http://localhost:3001 adresinde çalışacak.

## 🎯 Demo Kullanımı

### Giriş
- Herhangi bir email ve şifre ile giriş yapabilirsiniz
- Demo veriler önceden yüklenmiştir

### Ana Özellikler

#### 1. Dashboard
- Toplam müşteri sayısı
- Aktif müşteri oranı
- Ziyaret istatistikleri
- Aylık trend grafikleri

#### 2. Müşteri Yönetimi
- Doktor ve eczane müşterilerini görüntüleme
- Yeni müşteri ekleme
- Müşteri bilgilerini düzenleme
- Müşteri silme
- Arama ve filtreleme

#### 3. Ziyaret Yönetimi
- Planlanan ziyaretleri görüntüleme
- Yeni ziyaret ekleme
- Ziyaret düzenleme ve silme
- Ziyaret durumunu güncelleme (tamamlandı olarak işaretleme)
- Öncelik seviyesi belirleme

## 🔧 Teknik Detaylar

### Frontend Teknolojileri
- **React 18**: UI kütüphanesi
- **TypeScript**: Tip güvenliği
- **Material-UI**: UI bileşen kütüphanesi
- **React Router**: Sayfa yönlendirme
- **Recharts**: Grafik kütüphanesi
- **Vite**: Build tool

### Backend Teknolojileri
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Tip güvenliği
- **CORS**: Cross-origin resource sharing

### API Endpoints

#### Müşteriler
- `GET /api/customers` - Tüm müşterileri getir
- `GET /api/customers/:id` - Belirli müşteriyi getir
- `POST /api/customers` - Yeni müşteri ekle
- `PUT /api/customers/:id` - Müşteri güncelle
- `DELETE /api/customers/:id` - Müşteri sil

#### Ziyaretler
- `GET /api/visits` - Tüm ziyaretleri getir
- `GET /api/visits/:id` - Belirli ziyareti getir
- `POST /api/visits` - Yeni ziyaret ekle
- `PUT /api/visits/:id` - Ziyaret güncelle
- `DELETE /api/visits/:id` - Ziyaret sil

#### Dashboard
- `GET /api/dashboard/stats` - Dashboard istatistikleri
- `GET /api/dashboard/visits` - Ziyaret verileri
- `GET /api/dashboard/activities` - Son aktiviteler

## 🎨 UI/UX Özellikleri

- **Modern Tasarım**: Material Design prensiplerine uygun
- **Responsive**: Tüm cihazlarda uyumlu
- **Tema Desteği**: Açık ve koyu mod
- **Kullanıcı Dostu**: Sezgisel arayüz
- **Hızlı Yükleme**: Optimize edilmiş performans

## 📱 Demo Senaryoları

### 1. Müşteri Yönetimi Demo
1. Müşteriler sayfasına git
2. Yeni müşteri ekle butonuna tıkla
3. Doktor veya eczane seç
4. Bilgileri doldur ve kaydet
5. Müşteriyi düzenle veya sil

### 2. Ziyaret Planlama Demo
1. Ziyaretler sayfasına git
2. Yeni ziyaret ekle butonuna tıkla
3. Müşteri seç ve ziyaret detaylarını gir
4. Ziyareti planla
5. Ziyareti tamamlandı olarak işaretle

### 3. Dashboard Analizi Demo
1. Ana sayfaya git
2. İstatistikleri incele
3. Grafikleri analiz et
4. Son aktiviteleri görüntüle

## 🔒 Güvenlik Notları

- Bu demo uygulaması gerçek veri güvenliği içermez
- Sadece iş görüşmeleri için tasarlanmıştır
- Production ortamında kullanılmamalıdır

Bu demo uygulaması iş görüşmelerinde kullanılmak üzere hazırlanmıştır. Herhangi bir sorunuz olursa lütfen iletişime geçin.

---

**Not**: Bu uygulama orijinal CRM uygulamasından karmaşık özellikler çıkarılarak basitleştirilmiştir. Temel CRM işlevleri korunarak demo amaçlı kullanıma uygun hale getirilmiştir.
