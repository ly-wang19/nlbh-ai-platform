import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { ShopOutlined, TeamOutlined, RiseOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Title } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Title level={2}>南宁百货AI提质增效平台</Title>
      
      <Row gutter={[16, 16]} className="stats-overview">
        <Col span={6}>
          <Card>
            <Statistic 
              title="招商入驻"
              value={93}
              suffix="%"
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="客流量"
              value={15482}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="营业额"
              value={289.5}
              prefix={<RiseOutlined />}
              suffix="万"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="ESG评分"
              value={88}
              prefix={<SafetyCertificateOutlined />}
              suffix="/100"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="module-cards">
        <Col span={8}>
          <Card title="招商革命" extra={<a href="/leasing">详情</a>}>
            <p>量子计算选址系统</p>
            <p>虚拟店铺沙盒</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="运营进化" extra={<a href="/operations">详情</a>}>
            <p>元运营助手</p>
            <p>能耗博弈系统</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="消费升维" extra={<a href="/consumer">详情</a>}>
            <p>AR导购系统</p>
            <p>代谢型推荐引擎</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage; 