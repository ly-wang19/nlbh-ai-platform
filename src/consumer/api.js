import express from 'express';

const router = express.Router();

// 获取AR导购路径
router.get('/ar-guide', async (req, res) => {
  try {
    const data = {
      current_location: {
        floor: 1,
        zone: 'A',
        coordinates: { x: 120, y: 85 }
      },
      recommended_path: [
        { floor: 1, zone: 'A', shop: '优衣库', type: '服装' },
        { floor: 1, zone: 'B', shop: '星巴克', type: '餐饮' },
        { floor: 2, zone: 'C', shop: '无印良品', type: '生活' }
      ],
      points_of_interest: [
        {
          name: '新品发布区',
          description: '春季新品特惠',
          distance: 50
        },
        {
          name: '休息区',
          description: '免费WiFi、充电',
          distance: 100
        }
      ],
      promotions: [
        {
          shop: '优衣库',
          offer: '新品8折',
          valid_until: '2024-03-31'
        }
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取AR导购路径失败' });
  }
});

// 获取个性化推荐
router.get('/recommendations', async (req, res) => {
  try {
    const data = {
      user_preferences: {
        style: ['休闲', '时尚'],
        price_range: '中等',
        favorite_brands: ['优衣库', 'ZARA']
      },
      recommendations: [
        {
          type: '服装',
          items: [
            {
              brand: 'ZARA',
              name: '春季外套',
              price: 599,
              discount: 0.8,
              location: '2F-12号'
            },
            {
              brand: '优衣库',
              name: '休闲裤',
              price: 299,
              discount: 0.9,
              location: '1F-08号'
            }
          ]
        },
        {
          type: '配饰',
          items: [
            {
              brand: '潘多拉',
              name: '手链',
              price: 999,
              discount: 1,
              location: '1F-15号'
            }
          ]
        }
      ],
      seasonal_trends: [
        '春季薄外套',
        '亮色系配饰',
        '运动休闲风'
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取个性化推荐失败' });
  }
});

// 获取实时状态分析
router.get('/status-analysis', async (req, res) => {
  try {
    const data = {
      crowd_density: {
        overall: 65, // percentage
        hotspots: [
          { location: '1F中庭', density: 85 },
          { location: '2F美食区', density: 75 }
        ]
      },
      shopping_mood: {
        overall: 'positive',
        factors: [
          { name: '温度', status: 'optimal' },
          { name: '音乐', status: 'good' },
          { name: '照明', status: 'good' }
        ]
      },
      real_time_metrics: {
        average_stay_time: 95, // minutes
        conversion_rate: 35, // percentage
        return_rate: 42 // percentage
      }
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取实时状态分析失败' });
  }
});

export default router; 