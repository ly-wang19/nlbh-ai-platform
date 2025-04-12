export interface StoreData {
  yesterdayMetrics: {
    totalTraffic: number;
    totalSales: number;
    conversionRate: number;
    transactions: number;
  };
  historicalData: {
    averageDailySales: number;
    averageDailyTraffic: number;
    averageConversionRate: number;
  };
  keyIssues: string[];
  predictions: {
    expectedTraffic: number;
    weather: string;
    events: string[];
  };
}

export interface EmergencyEvent {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  affectedAreas: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'processing' | 'handled' | 'resolved';
}

export interface EmergencyResponse {
  eventId: string;
  status: string;
  plan: {
    immediateActions: string[];
    resourceAllocation: Record<string, any>;
    communicationPlan: Record<string, any>;
    followUpTasks: string[];
  };
  automatedActions: string[];
  nextSteps: string[];
}

export interface MorningReport {
  date: Date;
  content: {
    summary: string;
    analysis: string;
    recommendations: string[];
  };
  metrics: {
    salesGrowth: number;
    trafficGrowth: number;
    conversionRate: number;
    averageTicketSize: number;
  };
  recommendations: string[];
}

export interface EnergyData {
  buildingId: string;
  timestamp: Date;
  readings: {
    hvac: {
      temperature: number;
      humidity: number;
      power: number;
    };
    lighting: {
      power: number;
      brightness: number;
    };
    equipment: {
      power: number;
      utilization: number;
    };
  };
  zones: Array<{
    id: string;
    type: string;
    occupancy: number;
    temperature: number;
    humidity: number;
  }>;
}

export interface TenantPreference {
  id: string;
  name: string;
  zone: string;
  temperatureRange: {
    min: number;
    max: number;
  };
  humidityRange: {
    min: number;
    max: number;
  };
  operatingHours: {
    start: string;
    end: string;
  };
  specialRequirements?: string[];
}

export interface OptimizationResult {
  recommendations: Array<{
    type: string;
    description: string;
    expectedSavings: number;
    implementationCost: number;
    roi: number;
    priority: 'low' | 'medium' | 'high';
  }>;
  projectedSavings: {
    energy: number;
    cost: number;
    co2: number;
  };
  schedule: Array<{
    time: string;
    actions: string[];
    zones: string[];
  }>;
} 