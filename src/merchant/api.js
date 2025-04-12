import express from 'express';

const router = express.Router();

// 获取商户列表
router.get('/', async (req, res) => {
  try {
    // 模拟数据
    const merchants = [
      {
        id: 1,
        name: '品牌A',
        type: '服装',
        status: '营业中'
      },
      {
        id: 2,
        name: '品牌B',
        type: '餐饮',
        status: '营业中'
      }
    ];
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ error: '获取商户列表失败' });
  }
});

// 获取商户协同数据
router.get('/collaboration', async (req, res) => {
  try {
    const data = {
      sharedData: 24,
      totalVolume: '1.2TB',
      activePartners: 18
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取协同数据失败' });
  }
});

// 获取供应链数据
router.get('/supply-chain', async (req, res) => {
  try {
    const data = {
      vehicles: 45,
      avgUnloadTime: 25,
      alerts: 3
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取供应链数据失败' });
  }
});

export default router; 