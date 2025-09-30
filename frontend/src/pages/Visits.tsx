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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  LocalHospital as DoctorIcon,
  LocalPharmacy as PharmacyIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { Visit } from '../types';

const Visits: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [visitForm, setVisitForm] = useState({
    customerName: '',
    customerType: 'doctor' as 'doctor' | 'pharmacy',
    location: '',
    date: '',
    time: '',
    notes: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVisits([
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
        },
      ]);
    } catch (error) {
      console.error('Ziyaretler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVisit = () => {
    const newVisit: Visit = {
      id: Date.now().toString(),
      ...visitForm,
      status: 'planned',
    };
    setVisits(prev => [...prev, newVisit]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditVisit = (visit: Visit) => {
    setSelectedVisit(visit);
    setVisitForm({
      customerName: visit.customerName,
      customerType: visit.customerType,
      location: visit.location,
      date: visit.date,
      time: visit.time,
      notes: visit.notes || '',
      priority: visit.priority || 'medium',
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateVisit = () => {
    if (selectedVisit) {
      setVisits(prev => prev.map(visit => 
        visit.id === selectedVisit.id 
          ? { ...visit, ...visitForm }
          : visit
      ));
      setIsEditDialogOpen(false);
      setSelectedVisit(null);
      resetForm();
    }
  };

  const handleDeleteVisit = (visitId: string) => {
    if (window.confirm('Bu ziyareti silmek istediğinizden emin misiniz?')) {
      setVisits(prev => prev.filter(visit => visit.id !== visitId));
    }
  };

  const handleCompleteVisit = (visitId: string) => {
    setVisits(prev => prev.map(visit => 
      visit.id === visitId 
        ? { ...visit, status: 'completed' as const }
        : visit
    ));
  };

  const resetForm = () => {
    setVisitForm({
      customerName: '',
      customerType: 'doctor',
      location: '',
      date: '',
      time: '',
      notes: '',
      priority: 'medium',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'planned': return 'primary';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const plannedVisits = visits.filter(visit => visit.status === 'planned');
  const completedVisits = visits.filter(visit => visit.status === 'completed');

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Ziyaret Yönetimi
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Günlük ziyaret planlarınızı yönetin
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Yeni Ziyaret
          </Button>
        </Box>
      </Paper>

      {/* Ziyaretler Grid */}
      <Grid container spacing={3}>
        {/* Planlanan Ziyaretler */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ScheduleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Planlanan Ziyaretler ({plannedVisits.length})
              </Typography>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {plannedVisits.map((visit) => (
                  <ListItem key={visit.id} sx={{ px: 0, mb: 2 }}>
                    <Card sx={{ width: '100%', boxShadow: 2, borderRadius: 2 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              {visit.customerType === 'doctor' ? 
                                <DoctorIcon color="primary" sx={{ mr: 1 }} /> : 
                                <PharmacyIcon color="primary" sx={{ mr: 1 }} />
                              }
                              <Typography variant="h6" fontWeight="bold">
                                {visit.customerName}
                              </Typography>
                              <Chip
                                label={visit.priority?.toUpperCase() || 'MEDIUM'}
                                color={getPriorityColor(visit.priority || 'medium')}
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              <LocationIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                              {visit.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              <TimeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                              {visit.date} - {visit.time}
                            </Typography>
                            {visit.notes && (
                              <Typography variant="body2" color="text.secondary">
                                {visit.notes}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditVisit(visit)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteVisit(visit.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleCompleteVisit(visit.id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
                
                {plannedVisits.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ScheduleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Planlanan ziyaret bulunamadı
                    </Typography>
                  </Box>
                )}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Tamamlanan Ziyaretler */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Tamamlanan Ziyaretler ({completedVisits.length})
              </Typography>
            </Box>
            
            <List>
              {completedVisits.map((visit) => (
                <ListItem key={visit.id} sx={{ px: 0, mb: 2 }}>
                  <Card sx={{ width: '100%', boxShadow: 1, borderRadius: 2, opacity: 0.9 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {visit.customerType === 'doctor' ? 
                              <DoctorIcon color="primary" sx={{ mr: 1 }} /> : 
                              <PharmacyIcon color="primary" sx={{ mr: 1 }} />
                            }
                            <Typography variant="h6" fontWeight="bold">
                              {visit.customerName}
                            </Typography>
                            <Chip
                              label="TAMAMLANDI"
                              color="success"
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <LocationIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                            {visit.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <TimeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                            {visit.date} - {visit.time}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
              
              {completedVisits.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Tamamlanan ziyaret bulunamadı
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Yeni Ziyaret Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          resetForm();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Yeni Ziyaret Ekle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Müşteri Tipi</InputLabel>
                <Select
                  value={visitForm.customerType}
                  label="Müşteri Tipi"
                  onChange={(e) => setVisitForm(prev => ({ ...prev, customerType: e.target.value as 'doctor' | 'pharmacy' }))}
                >
                  <MenuItem value="doctor">Doktor</MenuItem>
                  <MenuItem value="pharmacy">Eczane</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Müşteri Adı"
                fullWidth
                value={visitForm.customerName}
                onChange={(e) => setVisitForm(prev => ({ ...prev, customerName: e.target.value }))}
                required
              />
            </Box>
            
            <TextField
              label="Lokasyon"
              fullWidth
              value={visitForm.location}
              onChange={(e) => setVisitForm(prev => ({ ...prev, location: e.target.value }))}
              required
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Tarih"
                type="date"
                fullWidth
                value={visitForm.date}
                onChange={(e) => setVisitForm(prev => ({ ...prev, date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Saat"
                type="time"
                fullWidth
                value={visitForm.time}
                onChange={(e) => setVisitForm(prev => ({ ...prev, time: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            
            <FormControl fullWidth>
              <InputLabel>Öncelik</InputLabel>
              <Select
                value={visitForm.priority}
                label="Öncelik"
                onChange={(e) => setVisitForm(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
              >
                <MenuItem value="low">Düşük</MenuItem>
                <MenuItem value="medium">Orta</MenuItem>
                <MenuItem value="high">Yüksek</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Notlar"
              multiline
              rows={3}
              fullWidth
              value={visitForm.notes}
              onChange={(e) => setVisitForm(prev => ({ ...prev, notes: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsAddDialogOpen(false);
            resetForm();
          }}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleAddVisit}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ziyaret Düzenleme Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedVisit(null);
          resetForm();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Ziyaret Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Müşteri Tipi</InputLabel>
                <Select
                  value={visitForm.customerType}
                  label="Müşteri Tipi"
                  onChange={(e) => setVisitForm(prev => ({ ...prev, customerType: e.target.value as 'doctor' | 'pharmacy' }))}
                >
                  <MenuItem value="doctor">Doktor</MenuItem>
                  <MenuItem value="pharmacy">Eczane</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Müşteri Adı"
                fullWidth
                value={visitForm.customerName}
                onChange={(e) => setVisitForm(prev => ({ ...prev, customerName: e.target.value }))}
                required
              />
            </Box>
            
            <TextField
              label="Lokasyon"
              fullWidth
              value={visitForm.location}
              onChange={(e) => setVisitForm(prev => ({ ...prev, location: e.target.value }))}
              required
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Tarih"
                type="date"
                fullWidth
                value={visitForm.date}
                onChange={(e) => setVisitForm(prev => ({ ...prev, date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Saat"
                type="time"
                fullWidth
                value={visitForm.time}
                onChange={(e) => setVisitForm(prev => ({ ...prev, time: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            
            <FormControl fullWidth>
              <InputLabel>Öncelik</InputLabel>
              <Select
                value={visitForm.priority}
                label="Öncelik"
                onChange={(e) => setVisitForm(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
              >
                <MenuItem value="low">Düşük</MenuItem>
                <MenuItem value="medium">Orta</MenuItem>
                <MenuItem value="high">Yüksek</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Notlar"
              multiline
              rows={3}
              fullWidth
              value={visitForm.notes}
              onChange={(e) => setVisitForm(prev => ({ ...prev, notes: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsEditDialogOpen(false);
            setSelectedVisit(null);
            resetForm();
          }}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleUpdateVisit}>
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Visits;
