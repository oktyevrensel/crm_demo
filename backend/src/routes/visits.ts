import express from 'express';

const router = express.Router();

// Demo data
let visits = [
  {
    id: '1',
    customerName: 'Dr. Ahmet Yılmaz',
    customerType: 'doctor',
    location: 'Ankara Hastanesi',
    date: '2024-01-15',
    time: '10:00',
    status: 'planned',
    notes: 'Yeni ilaç tanıtımı',
    priority: 'high',
    estimatedDuration: 60
  },
  {
    id: '2',
    customerName: 'Merkez Eczanesi',
    customerType: 'pharmacy',
    location: 'Kızılay, Ankara',
    date: '2024-01-15',
    time: '14:00',
    status: 'completed',
    notes: 'Stok kontrolü yapıldı',
    priority: 'medium',
    estimatedDuration: 30
  },
  {
    id: '3',
    customerName: 'Dr. Fatma Demir',
    customerType: 'doctor',
    location: 'Özel Hastane',
    date: '2024-01-16',
    time: '09:30',
    status: 'planned',
    notes: 'Randevu alınacak',
    priority: 'low',
    estimatedDuration: 45
  },
];

// GET /api/visits - Get all visits
router.get('/', (req, res) => {
  res.json(visits);
});

// GET /api/visits/:id - Get visit by ID
router.get('/:id', (req, res) => {
  const visit = visits.find(v => v.id === req.params.id);
  if (!visit) {
    return res.status(404).json({ message: 'Visit not found' });
  }
  res.json(visit);
});

// POST /api/visits - Create new visit
router.post('/', (req, res) => {
  const newVisit = {
    id: Date.now().toString(),
    ...req.body,
    status: req.body.status || 'planned'
  };
  visits.push(newVisit);
  res.status(201).json(newVisit);
});

// PUT /api/visits/:id - Update visit
router.put('/:id', (req, res) => {
  const visitIndex = visits.findIndex(v => v.id === req.params.id);
  if (visitIndex === -1) {
    return res.status(404).json({ message: 'Visit not found' });
  }
  
  visits[visitIndex] = { ...visits[visitIndex], ...req.body };
  res.json(visits[visitIndex]);
});

// DELETE /api/visits/:id - Delete visit
router.delete('/:id', (req, res) => {
  const visitIndex = visits.findIndex(v => v.id === req.params.id);
  if (visitIndex === -1) {
    return res.status(404).json({ message: 'Visit not found' });
  }
  
  visits.splice(visitIndex, 1);
  res.json({ message: 'Visit deleted successfully' });
});

export { router as visitsRouter };
