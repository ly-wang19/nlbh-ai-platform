import { Configuration, OpenAIApi } from 'openai';
import { StoreData, EmergencyEvent, EmergencyResponse, MorningReport } from './types';

export class MetaOperationsAssistant {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
  }

  public async generateMorningReport(date: Date, storeData: StoreData): Promise<MorningReport> {
    const prompt = this.buildMorningReportPrompt(date, storeData);
    
    const completion = await this.openai.createChatCompletion({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "你是一个专业的商业运营分析师，负责生成简洁而信息丰富的晨会简报。"
      }, {
        role: "user",
        content: prompt
      }]
    });

    const reportContent = completion.data.choices[0].message?.content || '';
    
    return {
      date: date,
      content: this.parseReportContent(reportContent),
      metrics: this.calculateKeyMetrics(storeData),
      recommendations: this.generateRecommendations(storeData)
    };
  }

  public async handleEmergency(
    eventType: string,
    eventData: EmergencyEvent
  ): Promise<EmergencyResponse> {
    // 根据事件类型选择处理策略
    const strategy = this.selectEmergencyStrategy(eventType);
    
    // 生成响应计划
    const plan = await this.generateResponsePlan(strategy, eventData);
    
    // 执行自动化操作
    await this.executeAutomatedActions(plan);
    
    // 通知相关人员
    await this.notifyStakeholders(eventData, plan);
    
    return {
      eventId: eventData.id,
      status: 'handled',
      plan: plan,
      automatedActions: this.getExecutedActions(),
      nextSteps: this.generateNextSteps(eventData)
    };
  }

  private buildMorningReportPrompt(date: Date, storeData: StoreData): string {
    return `
请生成${date.toLocaleDateString('zh-CN')}的晨会简报，包含以下内容：

1. 昨日经营概况
- 总客流：${storeData.yesterdayMetrics.totalTraffic}
- 总销售额：${storeData.yesterdayMetrics.totalSales}
- 转化率：${storeData.yesterdayMetrics.conversionRate}

2. 重点关注
${storeData.keyIssues.map(issue => `- ${issue}`).join('\n')}

3. 今日预测
- 预计客流：${storeData.predictions.expectedTraffic}
- 天气情况：${storeData.predictions.weather}
- 重要活动：${storeData.predictions.events.join(', ')}

请提供简明扼要的分析和具体可行的建议。
    `;
  }

  private parseReportContent(content: string): any {
    // 解析AI生成的报告内容
    const sections = content.split('\n\n');
    return {
      summary: sections[0],
      analysis: sections[1],
      recommendations: sections[2]?.split('\n').filter(line => line.trim())
    };
  }

  private calculateKeyMetrics(storeData: StoreData): any {
    return {
      salesGrowth: this.calculateGrowth(storeData.yesterdayMetrics.totalSales, storeData.historicalData.averageDailySales),
      trafficGrowth: this.calculateGrowth(storeData.yesterdayMetrics.totalTraffic, storeData.historicalData.averageDailyTraffic),
      conversionRate: storeData.yesterdayMetrics.totalSales / storeData.yesterdayMetrics.totalTraffic,
      averageTicketSize: storeData.yesterdayMetrics.totalSales / storeData.yesterdayMetrics.transactions
    };
  }

  private calculateGrowth(current: number, baseline: number): number {
    return (current - baseline) / baseline * 100;
  }

  private generateRecommendations(storeData: StoreData): string[] {
    const recommendations: string[] = [];

    // 基于销售表现的建议
    if (storeData.yesterdayMetrics.totalSales < storeData.historicalData.averageDailySales) {
      recommendations.push('建议加强促销力度，特别是在客流高峰时段');
    }

    // 基于转化率的建议
    if (storeData.yesterdayMetrics.conversionRate < storeData.historicalData.averageConversionRate) {
      recommendations.push('需要优化导购配置，加强销售技能培训');
    }

    // 基于天气预测的建议
    if (storeData.predictions.weather.includes('雨')) {
      recommendations.push('准备雨具租借服务，加强防滑措施');
    }

    return recommendations;
  }

  private selectEmergencyStrategy(eventType: string): any {
    const strategies: Record<string, any> = {
      'weather': {
        priority: 'high',
        automatedActions: ['adjustVentilation', 'notifyTenants'],
        notificationChannels: ['sms', 'app']
      },
      'security': {
        priority: 'urgent',
        automatedActions: ['lockdown', 'notifyAuthorities'],
        notificationChannels: ['sms', 'app', 'broadcast']
      },
      'maintenance': {
        priority: 'medium',
        automatedActions: ['isolateArea', 'redirectTraffic'],
        notificationChannels: ['app']
      }
    };

    return strategies[eventType] || strategies['maintenance'];
  }

  private async generateResponsePlan(strategy: any, eventData: EmergencyEvent): Promise<any> {
    const prompt = `
请针对以下突发事件生成应急响应方案：

事件类型：${eventData.type}
事件描述：${eventData.description}
影响范围：${eventData.affectedAreas.join(', ')}
优先级：${strategy.priority}

请包含：
1. 即时响应措施
2. 资源调配建议
3. 沟通方案
4. 后续跟进事项
    `;

    const completion = await this.openai.createChatCompletion({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "你是一个专业的商场应急管理专家，负责制定快速有效的应急响应方案。"
      }, {
        role: "user",
        content: prompt
      }]
    });

    return this.parseResponsePlan(completion.data.choices[0].message?.content || '');
  }

  private async executeAutomatedActions(plan: any): Promise<void> {
    // 实现自动化操作
    // 这里应该集成实际的自动化系统
  }

  private async notifyStakeholders(eventData: EmergencyEvent, plan: any): Promise<void> {
    // 实现利益相关者通知系统
    // 这里应该集成实际的通知系统
  }

  private getExecutedActions(): string[] {
    // 返回已执行的自动化操作列表
    return [];
  }

  private generateNextSteps(eventData: EmergencyEvent): string[] {
    // 生成后续跟进步骤
    return [];
  }

  private parseResponsePlan(content: string): any {
    // 解析AI生成的响应方案
    return {
      immediateActions: [],
      resourceAllocation: {},
      communicationPlan: {},
      followUpTasks: []
    };
  }
} 