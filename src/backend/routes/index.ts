import express from 'express';
import { Router } from 'express';

const router = Router();

// 首页路由
router.get('/api/home', (req, res) => {
  res.json({
    title: '南宁百货AI提质增效平台',
    modules: [
      { name: '招商革命', path: '/leasing' },
      { name: '运营进化', path: '/operations' },
      { name: '消费升维', path: '/consumer' },
      { name: '商户赋能', path: '/merchant' },
      { name: '资产评估', path: '/asset' }
    ]
  });
});

// 招商模块路由
router.get('/api/leasing/location-analysis', (req, res) => {
  res.json({
    score: 85,
    factors: [
      { name: '人流量', score: 90 },
      { name: '消费能力', score: 85 },
      { name: '竞争强度', score: 75 },
      { name: '交通便利性', score: 88 }
    ],
    recommendations: [
      { brand: 'ZARA', compatibility: 0.92 },
      { brand: '优衣库', compatibility: 0.88 },
      { brand: 'H&M', compatibility: 0.85 }
    ]
  });
});

// 运营模块路由
router.get('/api/operations/morning-briefing', (req, res) => {
  res.json({
    date: new Date().toISOString(),
    highlights: [
      { type: '客流', value: '预计今日客流12000人次，较昨日+15%' },
      { type: '销售', value: '昨日销售额85.6万元，完成目标108%' },
      { type: '能耗', value: '当前能耗指数89，处于良好水平' }
    ]
  });
});

// 消费者模块路由
router.get('/api/consumer/recommendations', (req, res) => {
  res.json({
    recommendations: [
      {
        type: '服装',
        items: [
          { brand: 'ZARA', name: '春季外套', price: 599, discount: 0.8 },
          { brand: '优衣库', name: '休闲裤', price: 199, discount: 0.9 }
        ]
      }
    ]
  });
});

// 商户模块路由
router.get('/api/merchant/analysis', (req, res) => {
  res.json({
    sales: {
      today: 85600,
      yesterday: 78900,
      growth: 0.085
    },
    inventory: {
      warning: 3,
      items: [
        { name: '商品A', stock: 5, threshold: 10 },
        { name: '商品B', stock: 3, threshold: 8 }
      ]
    }
  });
});

// 资产模块路由
router.get('/api/asset/evaluation', (req, res) => {
  res.json({
    esg: {
      environmental: 85,
      social: 78,
      governance: 92
    },
    dataAssets: {
      totalValue: 1200000,
      growth: 0.15,
      categories: [
        { name: '用户数据', value: 500000 },
        { name: '交易数据', value: 400000 },
        { name: '运营数据', value: 300000 }
      ]
    }
  });
});

export default router; 