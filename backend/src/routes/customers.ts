import express from 'express';

const router = express.Router();

// Demo data
let customers = [
  {
    id: '1',
    name: 'Dr. Ahmet Yılmaz',
    type: 'doctor',
    specialization: 'Kardiyoloji',
    hospital: 'Ankara Hastanesi',
    district: 'Çankaya',
    city: 'Ankara',
    phone: '0532 123 45 67',
    email: 'ahmet.yilmaz@example.com',
    notes: 'Yeni ilaçlara ilgili',
    status: 'active'
  },
  {
    id: '2',
    name: 'Merkez Eczanesi',
    type: 'pharmacy',
    owner: 'Mehmet Demir',
    district: 'Kızılay',
    city: 'Ankara',
    phone: '0312 234 56 78',
    email: 'merkez@eczane.com',
    notes: 'Büyük stok kapasitesi',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Fatma Demir',
    type: 'doctor',
    specialization: 'Nöroloji',
    hospital: 'Özel Hastane',
    district: 'Keçiören',
    city: 'Ankara',
    phone: '0533 345 67 89',
    email: 'fatma.demir@example.com',
    notes: 'Randevu alınacak',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Sağlık Eczanesi',
    type: 'pharmacy',
    owner: 'Ayşe Kaya',
    district: 'Mamak',
    city: 'Ankara',
    phone: '0312 456 78 90',
    email: 'saglik@eczane.com',
    notes: 'Hastane yakınında',
    status: 'active'
  },
];

// GET /api/customers - Get all customers
router.get('/', (req, res) => {
  res.json(customers);
});

// GET /api/customers/:id - Get customer by ID
router.get('/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  res.json(customer);
});

// POST /api/customers - Create new customer
router.post('/', (req, res) => {
  const newCustomer = {
    id: Date.now().toString(),
    ...req.body,
    status: req.body.status || 'active'
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// PUT /api/customers/:id - Update customer
router.put('/:id', (req, res) => {
  const customerIndex = customers.findIndex(c => c.id === req.params.id);
  if (customerIndex === -1) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  
  customers[customerIndex] = { ...customers[customerIndex], ...req.body };
  res.json(customers[customerIndex]);
});

// DELETE /api/customers/:id - Delete customer
router.delete('/:id', (req, res) => {
  const customerIndex = customers.findIndex(c => c.id === req.params.id);
  if (customerIndex === -1) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  
  customers.splice(customerIndex, 1);
  res.json({ message: 'Customer deleted successfully' });
});

export { router as customersRouter };
