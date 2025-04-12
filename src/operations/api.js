import express from 'express';
import { MetaOperationsAssistant } from './MetaOperationsAssistant';
import { EnergyOptimizer } from './EnergyOptimizer';

const router = express.Router();
const assistant = new MetaOperationsAssistant();
const energyOptimizer = new EnergyOptimizer();

// 生成晨会简报
router.post('/morning-report', async (req, res) => {
  try {
    const { date, storeData } = req.body;
    const report = await assistant.generateMorningReport(date, storeData);
    res.json(report);
  } catch (error) {
    res.status(500).json({
      error: '生成晨会简报失败',
      message: error.message
    });
  }
});

// 处理突发事件
router.post('/handle-emergency', async (req, res) => {
  try {
    const { eventType, eventData } = req.body;
    const response = await assistant.handleEmergency(eventType, eventData);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: '处理突发事件失败',
      message: error.message
    });
  }
});

// 能耗优化建议
router.post('/energy-optimization', async (req, res) => {
  try {
    const { buildingData, tenantPreferences } = req.body;
    const optimization = await energyOptimizer.optimize(buildingData, tenantPreferences);
    res.json(optimization);
  } catch (error) {
    res.status(500).json({
      error: '能耗优化分析失败',
      message: error.message
    });
  }
});

// 实时能耗监控
router.get('/energy-monitoring', async (req, res) => {
  try {
    const { buildingId, timeRange } = req.query;
    const monitoring = await energyOptimizer.monitor(buildingId as string, timeRange as string);
    res.json(monitoring);
  } catch (error) {
    res.status(500).json({
      error: '能耗监控数据获取失败',
      message: error.message
    });
  }
});

// 商户舒适度评估
router.post('/comfort-assessment', async (req, res) => {
  try {
    const { tenantId, environmentalData } = req.body;
    const assessment = await energyOptimizer.assessComfort(tenantId, environmentalData);
    res.json(assessment);
  } catch (error) {
    res.status(500).json({
      error: '舒适度评估失败',
      message: error.message
    });
  }
});

// 获取智能晨会简报
router.get('/morning-briefing', async (req, res) => {
  try {
    const data = {
      date: new Date().toISOString(),
      highlights: [
        { type: '客流', value: '预计今日客流12000人次，较昨日+15%' },
        { type: '销售', value: '昨日销售额85.6万元，完成目标108%' },
        { type: '活动', value: '今日3场促销活动，2场品牌发布会' }
      ],
      weather: {
        temperature: 26,
        condition: '晴',
        suggestion: '适合举办户外活动'
      },
      tasks: [
        '9:30 商户联席会议',
        '14:00 消防演习',
        '16:00 VIP客户酒会'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取晨会简报失败' });
  }
});

// 获取能耗数据
router.get('/energy', async (req, res) => {
  try {
    const data = {
      current_consumption: 2850, // kWh
      comparison: {
        yesterday: -5,
        last_week: -8
      },
      areas: [
        { name: '中央空调', consumption: 1200, status: 'normal' },
        { name: '照明系统', consumption: 800, status: 'warning' },
        { name: '电梯系统', consumption: 500, status: 'normal' },
        { name: '其他设备', consumption: 350, status: 'normal' }
      ],
      suggestions: [
        '建议调整3楼照明亮度',
        '优化中央空调运行时段',
        '考虑更换节能灯具'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取能耗数据失败' });
  }
});

// 获取突发事件处理建议
router.get('/emergency', async (req, res) => {
  try {
    const data = {
      active_events: [
        {
          type: '设备故障',
          location: '3F-15号电梯',
          level: 'medium',
          action: '已通知维修团队，预计30分钟内修复'
        },
        {
          type: '客流拥堵',
          location: '1F中庭',
          level: 'high',
          action: '已增派保安疏导，开放应急通道'
        }
      ],
      resources: {
        security: 12,
        medical: 3,
        maintenance: 5
      },
      protocols: [
        '立即封锁事故区域',
        '疏散周边顾客',
        '联系相关部门支援'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取突发事件处理建议失败' });
  }
});

export default router; 