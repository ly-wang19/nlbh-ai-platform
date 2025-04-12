import React from 'react';
import { Card, Row, Col, Alert, Progress, Timeline } from 'antd';
import { CarOutlined, WarningOutlined, InboxOutlined } from '@ant-design/icons';

const SupplyChainAlert: React.FC = () => {
  return (
    <div>
      <Alert
        message="系统预警"
        description="检测到3个商户库存水平低于安全阈值，建议及时补货"
        type="warning"
        showIcon
        style={{ marginBottom: '20px' }}
      />

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="车辆识别分析" extra={<CarOutlined />}>
            <p>今日配送车辆：45辆</p>
            <p>平均卸货时间：25分钟</p>
            <Progress percent={75} status="active" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="库存预测模型" extra={<InboxOutlined />}>
            <p>库存预警商品：12个</p>
            <p>预测准确率：92%</p>
            <Progress percent={92} status="active" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="智能补货提醒" extra={<WarningOutlined />}>
            <p>待处理提醒：8条</p>
            <p>自动补货率：85%</p>
            <Progress percent={85} status="active" />
          </Card>
        </Col>
      </Row>

      <Card title="近期预警记录" style={{ marginTop: '20px' }}>
        <Timeline>
          <Timeline.Item color="red">
            品牌A 服装库存不足 (2小时前)
          </Timeline.Item>
          <Timeline.Item color="yellow">
            品牌B 食品类商品即将过期 (4小时前)
          </Timeline.Item>
          <Timeline.Item>
            品牌C 补货完成 (6小时前)
          </Timeline.Item>
          <Timeline.Item>
            品牌D 库存预警解除 (8小时前)
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
};

export default SupplyChainAlert; 