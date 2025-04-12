import React from 'react';
import { Tabs } from 'antd';
import CollaborationPlatform from './components/CollaborationPlatform';
import SupplyChainAlert from './components/SupplyChainAlert';

const { TabPane } = Tabs;

const MerchantPage: React.FC = () => {
  return (
    <div className="merchant-container">
      <h1>商户赋能中心</h1>
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="跨店协同平台" key="1">
          <CollaborationPlatform />
        </TabPane>
        <TabPane tab="供应链预警系统" key="2">
          <SupplyChainAlert />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MerchantPage; 