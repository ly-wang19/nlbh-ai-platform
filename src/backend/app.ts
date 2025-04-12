import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import router from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// 中间件
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 静态文件服务
app.use(express.static(join(__dirname, '..', 'frontend', 'public')));

// API 路由
app.use(router);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 商户API路由
app.get('/api/merchant', (req, res) => {
  res.json([
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
  ]);
});

// 招商API路由
app.get('/api/leasing/location-analysis', (req, res) => {
  res.json({
    score: 85,
    factors: [
      { name: '人流量', score: 90 },
      { name: '消费能力', score: 85 },
      { name: '竞争强度', score: 75 },
      { name: '交通便利性', score: 88 }
    ]
  });
});

// 运营API路由
app.get('/api/operations/morning-briefing', (req, res) => {
  res.json({
    date: new Date().toISOString(),
    highlights: [
      { type: '客流', value: '预计今日客流12000人次，较昨日+15%' },
      { type: '销售', value: '昨日销售额85.6万元，完成目标108%' }
    ]
  });
});

// 消费者API路由
app.get('/api/consumer/recommendations', (req, res) => {
  res.json({
    recommendations: [
      {
        type: '服装',
        items: [
          {
            brand: 'ZARA',
            name: '春季外套',
            price: 599,
            discount: 0.8
          }
        ]
      }
    ]
  });
});

// 所有其他请求返回 index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// 错误处理
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : '请稍后重试'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('环境:', process.env.NODE_ENV || 'development');
}); 