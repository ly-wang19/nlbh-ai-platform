import express from 'express';
import { QuantumLocationOptimizer } from './QuantumLocationOptimizer';
import { VirtualStoreSimulator } from './VirtualStoreSimulator';
import { BrandInfo, LocationData } from './types';

const router = express.Router();
const optimizer = new QuantumLocationOptimizer();
const simulator = new VirtualStoreSimulator();

// 量子计算选址分析
router.post('/analyze-location', async (req, res) => {
  try {
    const { brands, location } = req.body;
    const analysis = await optimizer.analyzeBrandCombination(brands, location);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({
      error: '选址分析失败',
      message: error.message
    });
  }
});

// 虚拟店铺模拟
router.post('/simulate-store', async (req, res) => {
  try {
    const { brand, location, config } = req.body;
    const simulation = await simulator.simulateStore(brand, location, config);
    res.json(simulation);
  } catch (error) {
    res.status(500).json({
      error: '店铺模拟失败',
      message: error.message
    });
  }
});

// 批量品牌组合分析
router.post('/analyze-combinations', async (req, res) => {
  try {
    const { brandCombinations, location } = req.body;
    const results = await Promise.all(
      brandCombinations.map(brands => 
        optimizer.analyzeBrandCombination(brands, location)
      )
    );

    // 对结果进行排序和评分
    const rankedResults = results.map((analysis, index) => ({
      combination: brandCombinations[index],
      analysis,
      score: calculateCombinationScore(analysis)
    })).sort((a, b) => b.score - a.score);

    res.json(rankedResults);
  } catch (error) {
    res.status(500).json({
      error: '品牌组合分析失败',
      message: error.message
    });
  }
});

// 情景模拟分析
router.post('/scenario-analysis', async (req, res) => {
  try {
    const { brand, location, scenarios } = req.body;
    const results = await Promise.all(
      scenarios.map(async scenario => {
        const simulation = await simulator.simulateStore(brand, location, scenario);
        return {
          scenario,
          simulation,
          impact: calculateScenarioImpact(simulation)
        };
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: '情景分析失败',
      message: error.message
    });
  }
});

// 获取选址分析
router.get('/location-analysis', async (req, res) => {
  try {
    const data = {
      score: 85,
      factors: [
        { name: '人流量', score: 90 },
        { name: '消费能力', score: 85 },
        { name: '竞争强度', score: 75 },
        { name: '交通便利性', score: 88 }
      ],
      recommendations: [
        '建议引入高端餐饮品牌',
        '增加儿童业态占比',
        '优化商业动线设计'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取选址分析失败' });
  }
});

// 获取品牌组合模拟
router.get('/brand-simulation', async (req, res) => {
  try {
    const data = {
      optimal_mix: [
        { category: '餐饮', percentage: 35 },
        { category: '服装', percentage: 25 },
        { category: '娱乐', percentage: 20 },
        { category: '零售', percentage: 20 }
      ],
      expected_revenue: 1250000,
      risk_level: 'medium'
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取品牌组合模拟失败' });
  }
});

// 获取虚拟店铺数据
router.get('/virtual-store', async (req, res) => {
  try {
    const data = {
      layout_efficiency: 92,
      predicted_sales: 85000,
      customer_flow: 1200,
      peak_hours: ['14:00', '19:00'],
      suggestions: [
        '优化收银区布局',
        '增加休息区座位',
        '调整照明方案'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取虚拟店铺数据失败' });
  }
});

// 辅助函数
function calculateCombinationScore(analysis: any): number {
  const {
    riskScore,
    competitionIndex,
    customerFlowPrediction
  } = analysis;

  // 综合评分计算
  return (
    riskScore.score * 0.3 +
    (1 - competitionIndex.overallIndex) * 0.3 +
    normalizeCustomerFlow(customerFlowPrediction.daily) * 0.4
  );
}

function calculateScenarioImpact(simulation: any): number {
  const {
    kpis,
    conversionRate,
    averageTicketSize
  } = simulation;

  // 情景影响评分
  return (
    kpis.roi * 0.4 +
    kpis.profitMargin * 0.3 +
    conversionRate * 0.15 +
    normalizeTicketSize(averageTicketSize) * 0.15
  );
}

function normalizeCustomerFlow(daily: number): number {
  // 客流量归一化（示例）
  const MAX_EXPECTED_FLOW = 10000;
  return Math.min(daily / MAX_EXPECTED_FLOW, 1);
}

function normalizeTicketSize(size: number): number {
  // 客单价归一化（示例）
  const MAX_EXPECTED_TICKET = 1000;
  return Math.min(size / MAX_EXPECTED_TICKET, 1);
}

export default router; 