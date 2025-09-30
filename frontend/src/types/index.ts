export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Customer {
  id: string;
  name: string;
  type: 'doctor' | 'pharmacy';
  specialization?: string;
  hospital?: string;
  owner?: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  notes?: string;
  status: 'active' | 'inactive';
}

export interface Visit {
  id: string;
  customerName: string;
  customerType: 'doctor' | 'pharmacy';
  location: string;
  date: string;
  time: string;
  status: 'planned' | 'completed' | 'cancelled';
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
  estimatedDuration?: number;
}

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  totalVisits: number;
  completedVisits: number;
  monthlyVisits: Array<{ month: string; visits: number }>;
}
