import React from 'react';
import { Card, Row, Col, Table, Tag, Button } from 'antd';
import { ApiOutlined, SafetyOutlined, DollarOutlined } from '@ant-design/icons';

const DataAssetOperation: React.FC = () => {
  const columns = [
    {
      title: '数据资产',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '安全等级',
      dataIndex: 'security',
      key: 'security',
      render: (security: string) => (
        <Tag color={security === '高' ? 'red' : security === '中' ? 'orange' : 'green'}>
          {security}
        </Tag>
      ),
    },
    {
      title: '接口状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '正常' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '调用量',
      dataIndex: 'calls',
      key: 'calls',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: '客流数据',
      security: '高',
      status: '正常',
      calls: '1.2万/天',
    },
    {
      key: '2',
      name: '交易数据',
      security: '高',
      status: '正常',
      calls: '8千/天',
    },
    {
      key: '3',
      name: '环境数据',
      security: '中',
      status: '正常',
      calls: '5千/天',
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="数据脱敏处理" extra={<SafetyOutlined />}>
            <p>今日处理数据：2.5TB</p>
            <p>敏感数据占比：35%</p>
            <Button type="primary">查看详情</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="API封装" extra={<ApiOutlined />}>
            <p>已发布API：56个</p>
            <p>平均响应时间：120ms</p>
            <Button type="primary">管理API</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="数据变现" extra={<DollarOutlined />}>
            <p>本月收益：￥125,000</p>
            <p>活跃客户：28家</p>
            <Button type="primary">收益报告</Button>
          </Card>
        </Col>
      </Row>

      <Card title="数据资产概览" style={{ marginTop: '20px' }}>
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default DataAssetOperation; 