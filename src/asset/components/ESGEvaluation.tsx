import React from 'react';
import { Card, Row, Col, Progress, Statistic } from 'antd';
import { EnvironmentOutlined, DollarOutlined, TeamOutlined } from '@ant-design/icons';

const ESGEvaluation: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="环境指标" extra={<EnvironmentOutlined />}>
            <Statistic title="碳排放量" value={-15.8} suffix="%" />
            <p>较去年同期降低</p>
            <Progress percent={85} status="active" strokeColor="#52c41a" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="社会责任" extra={<TeamOutlined />}>
            <Statistic title="社区参与度" value={92} suffix="/100" />
            <p>社区活动参与率</p>
            <Progress percent={92} status="active" strokeColor="#1890ff" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="公司治理" extra={<DollarOutlined />}>
            <Statistic title="信息透明度" value={88} suffix="/100" />
            <p>数据公开程度</p>
            <Progress percent={88} status="active" strokeColor="#722ed1" />
          </Card>
        </Col>
      </Row>

      <Card title="低碳指标量化" style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Statistic title="能源使用效率" value={95} suffix="%" />
          </Col>
          <Col span={6}>
            <Statistic title="废物回收率" value={78} suffix="%" />
          </Col>
          <Col span={6}>
            <Statistic title="绿色采购比例" value={82} suffix="%" />
          </Col>
          <Col span={6}>
            <Statistic title="可持续发展投入" value={2.5} suffix="百万" />
          </Col>
        </Row>
      </Card>

      <Card title="资产估值模型" style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic title="ESG溢价" value={12.5} suffix="%" />
          </Col>
          <Col span={8}>
            <Statistic title="品牌价值提升" value={18.3} suffix="%" />
          </Col>
          <Col span={8}>
            <Statistic title="投资者信心指数" value={89} suffix="/100" />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ESGEvaluation; 