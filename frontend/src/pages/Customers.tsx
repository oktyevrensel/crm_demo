import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocalHospital as DoctorIcon,
  LocalPharmacy as PharmacyIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { Customer } from '../types';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'doctor' | 'pharmacy'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  
  const [customerForm, setCustomerForm] = useState({
    name: '',
    type: 'doctor' as 'doctor' | 'pharmacy',
    specialization: '',
    hospital: '',
    owner: '',
    district: '',
    city: '',
    phone: '',
    email: '',
    notes: '',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomers([
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
      ]);
    } catch (error) {
      console.error('Müşteriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...customerForm
    };
    setCustomers(prev => [...prev, newCustomer]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerForm({
      name: customer.name,
      type: customer.type,
      specialization: customer.specialization || '',
      hospital: customer.hospital || '',
      owner: customer.owner || '',
      district: customer.district,
      city: customer.city,
      phone: customer.phone,
      email: customer.email,
      notes: customer.notes || '',
      status: customer.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCustomer = () => {
    if (selectedCustomer) {
      setCustomers(prev => prev.map(customer => 
        customer.id === selectedCustomer.id 
          ? { ...customer, ...customerForm }
          : customer
      ));
      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
      resetForm();
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
      setCustomers(prev => prev.filter(customer => customer.id !== customerId));
    }
  };

  const resetForm = () => {
    setCustomerForm({
      name: '',
      type: 'doctor',
      specialization: '',
      hospital: '',
      owner: '',
      district: '',
      city: '',
      phone: '',
      email: '',
      notes: '',
      status: 'active'
    });
  };

  // Filtrelenmiş müşteriler
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || customer.type === filterType;
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getTypeIcon = (type: string) => {
    return type === 'doctor' ? <DoctorIcon /> : <PharmacyIcon />;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Müşteri Yönetimi
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Doktor ve eczane müşterilerinizi yönetin
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              resetForm();
              setIsAddDialogOpen(true);
            }}
            sx={{ borderRadius: 2 }}
          >
            Yeni Müşteri
          </Button>
        </Box>

        {/* Filtreler */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Müşteri ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Tip</InputLabel>
              <Select
                value={filterType}
                label="Tip"
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="doctor">Doktor</MenuItem>
                <MenuItem value="pharmacy">Eczane</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select
                value={filterStatus}
                label="Durum"
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Müşteri Listesi */}
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : filteredCustomers.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <DoctorIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Müşteri bulunamadı
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredCustomers.map((customer) => (
            <Grid item xs={12} sm={6} md={4} key={customer.id}>
              <Card sx={{ 
                borderRadius: 2, 
                boxShadow: 2, 
                height: '100%',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: customer.type === 'doctor' ? 'primary.main' : 'secondary.main',
                      mr: 2,
                      width: 48,
                      height: 48
                    }}>
                      {getTypeIcon(customer.type)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {customer.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip
                          label={customer.type === 'doctor' ? 'Doktor' : 'Eczane'}
                          color={customer.type === 'doctor' ? 'primary' : 'secondary'}
                          size="small"
                        />
                        <Chip
                          label={customer.status === 'active' ? 'Aktif' : 'Pasif'}
                          color={getStatusColor(customer.status)}
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Stack spacing={1}>
                    {customer.specialization && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {customer.specialization}
                        </Typography>
                      </Box>
                    )}
                    {customer.hospital && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {customer.hospital}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {customer.district}, {customer.city}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {customer.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {customer.email}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Yeni Müşteri Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          resetForm();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Tip</InputLabel>
                <Select
                  value={customerForm.type}
                  label="Tip"
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, type: e.target.value as 'doctor' | 'pharmacy' }))}
                >
                  <MenuItem value="doctor">Doktor</MenuItem>
                  <MenuItem value="pharmacy">Eczane</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Ad"
                fullWidth
                value={customerForm.name}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </Box>

            {customerForm.type === 'doctor' && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Uzmanlık"
                  fullWidth
                  value={customerForm.specialization}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, specialization: e.target.value }))}
                />
                <TextField
                  label="Hastane"
                  fullWidth
                  value={customerForm.hospital}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, hospital: e.target.value }))}
                />
              </Box>
            )}

            {customerForm.type === 'pharmacy' && (
              <TextField
                label="Sahip"
                fullWidth
                value={customerForm.owner}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, owner: e.target.value }))}
              />
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="İlçe"
                fullWidth
                value={customerForm.district}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, district: e.target.value }))}
                required
              />
              <TextField
                label="Şehir"
                fullWidth
                value={customerForm.city}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, city: e.target.value }))}
                required
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Telefon"
                fullWidth
                value={customerForm.phone}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
              <TextField
                label="E-posta"
                fullWidth
                value={customerForm.email}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </Box>

            <TextField
              label="Notlar"
              multiline
              rows={3}
              fullWidth
              value={customerForm.notes}
              onChange={(e) => setCustomerForm(prev => ({ ...prev, notes: e.target.value }))}
            />

            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select
                value={customerForm.status}
                label="Durum"
                onChange={(e) => setCustomerForm(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
              >
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsAddDialogOpen(false);
            resetForm();
          }}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleAddCustomer}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Müşteri Düzenleme Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedCustomer(null);
          resetForm();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Müşteri Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Tip</InputLabel>
                <Select
                  value={customerForm.type}
                  label="Tip"
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, type: e.target.value as 'doctor' | 'pharmacy' }))}
                >
                  <MenuItem value="doctor">Doktor</MenuItem>
                  <MenuItem value="pharmacy">Eczane</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Ad"
                fullWidth
                value={customerForm.name}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </Box>

            {customerForm.type === 'doctor' && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Uzmanlık"
                  fullWidth
                  value={customerForm.specialization}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, specialization: e.target.value }))}
                />
                <TextField
                  label="Hastane"
                  fullWidth
                  value={customerForm.hospital}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, hospital: e.target.value }))}
                />
              </Box>
            )}

            {customerForm.type === 'pharmacy' && (
              <TextField
                label="Sahip"
                fullWidth
                value={customerForm.owner}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, owner: e.target.value }))}
              />
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="İlçe"
                fullWidth
                value={customerForm.district}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, district: e.target.value }))}
                required
              />
              <TextField
                label="Şehir"
                fullWidth
                value={customerForm.city}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, city: e.target.value }))}
                required
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Telefon"
                fullWidth
                value={customerForm.phone}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
              <TextField
                label="E-posta"
                fullWidth
                value={customerForm.email}
                onChange={(e) => setCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </Box>

            <TextField
              label="Notlar"
              multiline
              rows={3}
              fullWidth
              value={customerForm.notes}
              onChange={(e) => setCustomerForm(prev => ({ ...prev, notes: e.target.value }))}
            />

            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select
                value={customerForm.status}
                label="Durum"
                onChange={(e) => setCustomerForm(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
              >
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsEditDialogOpen(false);
            setSelectedCustomer(null);
            resetForm();
          }}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleUpdateCustomer}>
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customers;
