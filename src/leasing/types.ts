export interface BrandInfo {
  id: string;
  name: string;
  category: string;
  marketShare: number;
  targetCustomerBase: string[];
  priceLevel: number;
  annualRevenue?: number;
  averageRent?: number;
}

export interface LocationData {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  trafficFlow: number;
  nearbyCompetitors: BrandInfo[];
  demographics: {
    population: number;
    ageDistribution: Record<string, number>;
    incomeLevel: number;
    consumptionPower: number;
  };
  infrastructure: {
    parking: number;
    publicTransport: number;
    walkability: number;
  };
}

export interface RiskScore {
  score: number;
  confidence: number;
  volatility: number;
}

export interface RiskAnalysis {
  riskScore: RiskScore;
  competitionIndex: {
    matrix: number[][];
    overallIndex: number;
  };
  customerFlowPrediction: {
    daily: number;
    weekly: number[];
    seasonal: number[];
  };
  recommendations: string[];
} 