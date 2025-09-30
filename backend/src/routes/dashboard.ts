import express from 'express';

const router = express.Router();

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalCustomers: 45,
    activeCustomers: 42,
    totalVisits: 128,
    completedVisits: 95,
    monthlyVisits: [
      { month: 'Ocak', visits: 15 },
      { month: 'Şubat', visits: 22 },
      { month: 'Mart', visits: 18 },
      { month: 'Nisan', visits: 25 },
      { month: 'Mayıs', visits: 30 },
      { month: 'Haziran', visits: 28 },
    ]
  };
  
  res.json(stats);
});

// GET /api/dashboard/visits - Get visit data for charts
router.get('/visits', (req, res) => {
  const visitData = {
    monthly: [
      { month: 'Ocak', visits: 15 },
      { month: 'Şubat', visits: 22 },
      { month: 'Mart', visits: 18 },
      { month: 'Nisan', visits: 25 },
      { month: 'Mayıs', visits: 30 },
      { month: 'Haziran', visits: 28 },
    ],
    performance: [
      { category: 'Tamamlanan', value: 95 },
      { category: 'Planlanan', value: 33 },
      { category: 'İptal Edilen', value: 5 },
    ],
    regions: [
      { name: 'Ankara', value: 45, color: '#8884d8' },
      { name: 'İstanbul', value: 32, color: '#82ca9d' },
      { name: 'İzmir', value: 28, color: '#ffc658' },
      { name: 'Diğer', value: 23, color: '#ff7300' },
    ]
  };
  
  res.json(visitData);
});

// GET /api/dashboard/activities - Get recent activities
router.get('/activities', (req, res) => {
  const activities = [
    {
      id: 1,
      user: 'Demo User',
      action: 'Yeni müşteri eklendi: Dr. Ahmet Yılmaz',
      time: '2 saat önce'
    },
    {
      id: 2,
      user: 'Demo User',
      action: 'Ziyaret tamamlandı: Merkez Eczanesi',
      time: '4 saat önce'
    },
    {
      id: 3,
      user: 'Demo User',
      action: 'Yeni ziyaret planlandı: Dr. Fatma Demir',
      time: '1 gün önce'
    },
    {
      id: 4,
      user: 'Demo User',
      action: 'Müşteri güncellendi: Sağlık Eczanesi',
      time: '2 gün önce'
    },
    {
      id: 5,
      user: 'Demo User',
      action: 'Ziyaret iptal edildi: Dr. Mehmet Kaya',
      time: '3 gün önce'
    }
  ];
  
  res.json(activities);
});

export { router as dashboardRouter };
