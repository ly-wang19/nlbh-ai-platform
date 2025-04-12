import React from 'react';
import { Tabs } from 'antd';
import ESGEvaluation from './components/ESGEvaluation';
import DataAssetOperation from './components/DataAssetOperation';

const { TabPane } = Tabs;

const AssetPage: React.FC = () => {
  return (
    <div className="asset-container">
      <h1>资产管理中心</h1>
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="ESG价值评估" key="1">
          <ESGEvaluation />
        </TabPane>
        <TabPane tab="数据资产运营" key="2">
          <DataAssetOperation />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AssetPage; 