import * as tf from '@tensorflow/tfjs';
import { BrandInfo, LocationData } from './types';

interface SimulationConfig {
  duration: number; // 模拟天数
  customerVolume: number; // 基础客流量
  seasonality: number[]; // 季节性因子
  specialEvents: Array<{
    name: string;
    date: Date;
    impact: number;
  }>;
}

interface SimulationResult {
  dailyRevenue: number[];
  customerFlow: number[];
  conversionRate: number;
  averageTicketSize: number;
  peakHours: number[];
  operationalCosts: {
    rent: number;
    labor: number;
    utilities: number;
    marketing: number;
  };
  kpis: {
    roi: number;
    paybackPeriod: number;
    profitMargin: number;
  };
}

export class VirtualStoreSimulator {
  private model: tf.LayersModel;
  private readonly defaultConfig: SimulationConfig = {
    duration: 365,
    customerVolume: 1000,
    seasonality: Array(12).fill(1),
    specialEvents: []
  };

  constructor() {
    this.initializeModel();
  }

  private async initializeModel() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 256, activation: 'relu', inputShape: [100] }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 128, activation: 'relu' }),
        tf.layers.dense({ units: 64, activation: 'relu' }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 4, activation: 'linear' }) // 输出：[日收入, 客流量, 转化率, 客单价]
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['accuracy']
    });
  }

  public async simulateStore(
    brand: BrandInfo,
    location: LocationData,
    config: Partial<SimulationConfig> = {}
  ): Promise<SimulationResult> {
    const fullConfig = { ...this.defaultConfig, ...config };
    const features = this.prepareSimulationFeatures(brand, location, fullConfig);
    const predictions = await this.runSimulation(features, fullConfig);
    
    return this.processSimulationResults(predictions, fullConfig);
  }

  private prepareSimulationFeatures(
    brand: BrandInfo,
    location: LocationData,
    config: SimulationConfig
  ): tf.Tensor {
    // 组合品牌、位置和配置特征
    const brandFeatures = [
      brand.marketShare,
      brand.priceLevel,
      ...this.encodeBrandCategory(brand.category)
    ];

    const locationFeatures = [
      location.trafficFlow,
      location.demographics.population,
      location.demographics.incomeLevel,
      location.infrastructure.parking,
      location.infrastructure.publicTransport
    ];

    const configFeatures = [
      config.customerVolume,
      ...config.seasonality
    ];

    return tf.tensor2d([...brandFeatures, ...locationFeatures, ...configFeatures], [1, -1]);
  }

  private async runSimulation(
    features: tf.Tensor,
    config: SimulationConfig
  ): Promise<number[][]> {
    const results: number[][] = [];
    
    for (let day = 0; day < config.duration; day++) {
      const dailyFeatures = this.adjustFeaturesForDay(features, day, config);
      const prediction = await this.model.predict(dailyFeatures) as tf.Tensor;
      results.push(Array.from(await prediction.data()));
    }

    return results;
  }

  private adjustFeaturesForDay(
    baseFeatures: tf.Tensor,
    day: number,
    config: SimulationConfig
  ): tf.Tensor {
    // 根据日期调整特征
    const month = Math.floor((day % 365) / 30);
    const seasonalityFactor = config.seasonality[month];
    
    // 检查特殊事件
    const eventImpact = config.specialEvents
      .filter(event => this.isDayOfEvent(day, event.date))
      .reduce((acc, event) => acc + event.impact, 0);

    // 调整基础特征
    return tf.tidy(() => {
      const adjusted = baseFeatures.mul(tf.scalar(seasonalityFactor + eventImpact));
      return adjusted;
    });
  }

  private processSimulationResults(
    predictions: number[][],
    config: SimulationConfig
  ): SimulationResult {
    const dailyRevenue = predictions.map(p => p[0]);
    const customerFlow = predictions.map(p => p[1]);
    const conversionRate = predictions.map(p => p[2]).reduce((a, b) => a + b) / predictions.length;
    const averageTicketSize = predictions.map(p => p[3]).reduce((a, b) => a + b) / predictions.length;

    const operationalCosts = this.calculateOperationalCosts(predictions, config);
    const kpis = this.calculateKPIs(dailyRevenue, operationalCosts);

    return {
      dailyRevenue,
      customerFlow,
      conversionRate,
      averageTicketSize,
      peakHours: this.analyzePeakHours(customerFlow),
      operationalCosts,
      kpis
    };
  }

  private calculateOperationalCosts(predictions: number[][], config: SimulationConfig) {
    const totalRevenue = predictions.reduce((sum, day) => sum + day[0], 0);
    
    return {
      rent: totalRevenue * 0.1, // 假设租金为收入的10%
      labor: totalRevenue * 0.15, // 人工成本为收入的15%
      utilities: totalRevenue * 0.05, // 水电费为收入的5%
      marketing: totalRevenue * 0.08 // 营销费用为收入的8%
    };
  }

  private calculateKPIs(dailyRevenue: number[], costs: SimulationResult['operationalCosts']) {
    const totalRevenue = dailyRevenue.reduce((a, b) => a + b, 0);
    const totalCosts = Object.values(costs).reduce((a, b) => a + b, 0);
    const profit = totalRevenue - totalCosts;

    return {
      roi: profit / totalCosts,
      paybackPeriod: totalCosts / (profit / 365), // 天数
      profitMargin: profit / totalRevenue
    };
  }

  private analyzePeakHours(customerFlow: number[]): number[] {
    // 假设每天24小时的分布
    return Array(24).fill(0).map((_, hour) => {
      const hourlyFlow = customerFlow.reduce((sum, daily) => {
        return sum + (daily * this.getHourlyDistribution(hour));
      }, 0);
      return hourlyFlow;
    });
  }

  private getHourlyDistribution(hour: number): number {
    // 简化的每小时客流分布模型
    if (hour >= 10 && hour <= 21) {
      return hour >= 17 && hour <= 20 ? 0.08 : 0.05; // 高峰时段
    }
    return 0.02; // 非营业时段
  }

  private isDayOfEvent(currentDay: number, eventDate: Date): boolean {
    const simulationStartDate = new Date();
    simulationStartDate.setHours(0, 0, 0, 0);
    
    const currentSimDate = new Date(simulationStartDate);
    currentSimDate.setDate(currentSimDate.getDate() + currentDay);
    
    return currentSimDate.toDateString() === eventDate.toDateString();
  }

  private encodeBrandCategory(category: string): number[] {
    // 简单的品牌类别编码
    const categories = [
      '餐饮', '服装', '数码', '美妆', '娱乐',
      '生活服务', '运动', '儿童', '家居', '其他'
    ];
    
    return categories.map(cat => cat === category ? 1 : 0);
  }
} 