import React from 'react';
import { Card, Row, Col, Button, Table } from 'antd';
import { ShareAltOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';

const CollaborationPlatform: React.FC = () => {
  const dataColumns = [
    {
      title: '商户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '共享数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: '协同状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const mockData = [
    {
      key: '1',
      name: '品牌A',
      dataType: '客流数据',
      status: '已连接',
    },
    {
      key: '2',
      name: '品牌B',
      dataType: '销售数据',
      status: '已连接',
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="数据共享">
            <p>当前共享商户：24家</p>
            <p>数据共享总量：1.2TB</p>
            <Button type="primary" icon={<ShareAltOutlined />}>
              发起共享
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="精准营销">
            <p>活动参与商户：18家</p>
            <p>联合营销活动：5个</p>
            <Button type="primary" icon={<ShoppingOutlined />}>
              创建活动
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户画像">
            <p>覆盖用户群：50万+</p>
            <p>特征维度：128个</p>
            <Button type="primary" icon={<UserOutlined />}>
              查看分析
            </Button>
          </Card>
        </Col>
      </Row>
      
      <Table 
        columns={dataColumns} 
        dataSource={mockData}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default CollaborationPlatform; 