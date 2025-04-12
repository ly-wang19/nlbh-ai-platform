class Navigation {
    constructor() {
        this.currentPage = 'home';
        this.menuItems = [
            { id: 'home', name: '首页', icon: 'fas fa-home' },
            { id: 'leasing', name: '招商革命', icon: 'fas fa-store' },
            { id: 'operations', name: '运营进化', icon: 'fas fa-chart-line' },
            { id: 'consumer', name: '消费升维', icon: 'fas fa-users' },
            { id: 'merchant', name: '商户赋能', icon: 'fas fa-shopping-bag' },
            { id: 'asset', name: '资产评估', icon: 'fas fa-building' }
        ];
    }

    async render() {
        const nav = document.getElementById('side-nav');
        nav.innerHTML = this.menuItems.map(item => `
            <div class="menu-item ${item.id === this.currentPage ? 'active' : ''}" 
                 data-page="${item.id}">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </div>
        `).join('');

        nav.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                const page = menuItem.dataset.page;
                this.loadPage(page);
                
                // 更新激活状态
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                menuItem.classList.add('active');
            }
        });

        // 初始加载首页
        await this.loadPage('home');
    }

    async loadPage(page) {
        this.currentPage = page;
        const content = document.getElementById('content');
        
        try {
            switch (page) {
                case 'home':
                    await this.renderHome();
                    break;
                case 'leasing':
                    await this.renderLeasing();
                    break;
                case 'operations':
                    await this.renderOperations();
                    break;
                case 'consumer':
                    await this.renderConsumer();
                    break;
                case 'merchant':
                    await this.renderMerchant();
                    break;
                case 'asset':
                    await this.renderAsset();
                    break;
            }
        } catch (error) {
            console.error('加载页面出错:', error);
            content.innerHTML = '<div class="error">加载页面时发生错误</div>';
        }
    }

    async renderHome() {
        const response = await fetch('/api/home');
        const data = await response.json();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="card">
                <h2>欢迎使用${data.title}</h2>
                <div class="modules-grid">
                    ${data.modules.map(module => `
                        <div class="module-card" onclick="nav.loadPage('${module.path.slice(1)}')">
                            <h3>${module.name}</h3>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async renderLeasing() {
        const response = await fetch('/api/leasing/location-analysis');
        const data = await response.json();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="card">
                <h2>选址分析</h2>
                <div class="score-container">
                    <div class="big-score">${data.score}</div>
                    <div class="score-label">综合评分</div>
                </div>
                <div class="factors-grid">
                    ${data.factors.map(factor => `
                        <div class="factor-card">
                            <div class="factor-name">${factor.name}</div>
                            <div class="factor-score">${factor.score}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="card">
                <h2>品牌推荐</h2>
                <div id="brandChart" class="chart-container"></div>
            </div>
        `;

        // 初始化品牌推荐图表
        const chart = echarts.init(document.getElementById('brandChart'));
        chart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'value',
                max: 1
            },
            yAxis: {
                type: 'category',
                data: data.recommendations.map(r => r.brand)
            },
            series: [{
                name: '匹配度',
                type: 'bar',
                data: data.recommendations.map(r => r.compatibility)
            }]
        });
    }

    async renderOperations() {
        const response = await fetch('/api/operations/morning-briefing');
        const data = await response.json();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="card">
                <h2>晨会简报</h2>
                <div class="briefing-content">
                    <div class="date">${new Date(data.date).toLocaleDateString()}</div>
                    <div class="highlights">
                        ${data.highlights.map(highlight => `
                            <div class="highlight-item">
                                <div class="highlight-type">${highlight.type}</div>
                                <div class="highlight-value">${highlight.value}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    async renderConsumer() {
        const response = await fetch('/api/consumer/recommendations');
        const data = await response.json();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="card">
                <h2>个性化推荐</h2>
                ${data.recommendations.map(rec => `
                    <div class="recommendation-section">
                        <h3>${rec.type}</h3>
                        <div class="items-grid">
                            ${rec.items.map(item => `
                                <div class="item-card">
                                    <div class="item-brand">${item.brand}</div>
                                    <div class="item-name">${item.name}</div>
                                    <div class="item-price">
                                        <span class="original">¥${item.price}</span>
                                        <span class="discount">¥${(item.price * item.discount).toFixed(2)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    async renderMerchant() {
        const response = await fetch('/api/merchant/analysis');
        const data = await response.json();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="card">
                <h2>销售概况</h2>
                <div class="sales-overview">
                    <div class="stat-item">
                        <div class="stat-label">今日销售额</div>
                        <div class="stat-value">¥${data.sales.today.toLocaleString()}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">同比增长</div>
                        <div class="stat-value ${data.sales.growth > 0 ? 'positive' : 'negative'}">
                            ${(data.sales.growth * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <h2>库存预警 <span class="warning-count">${data.inventory.warning}</span></h2>
                <div class="inventory-list">
                    ${data.inventory.items.map(item => `
                        <div class="inventory-item">
                            <div class="item-name">${item.name}</div>
                            <div class="stock-info">
                                <div class="current-stock">当前库存: ${item.stock}</div>
                                <div class="threshold">警戒线: ${item.threshold}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async renderAsset() {
        const response = await fetch('/api/asset/evaluation');
        const data = await response.json();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="card">
                <h2>ESG 评估</h2>
                <div id="esgChart" class="chart-container"></div>
            </div>
            <div class="card">
                <h2>数据资产价值</h2>
                <div class="value-overview">
                    <div class="total-value">
                        <div class="value-label">总价值</div>
                        <div class="value-number">¥${data.dataAssets.totalValue.toLocaleString()}</div>
                    </div>
                    <div class="growth-rate">
                        <div class="value-label">增长率</div>
                        <div class="value-number ${data.dataAssets.growth > 0 ? 'positive' : 'negative'}">
                            ${(data.dataAssets.growth * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
                <div id="dataAssetsChart" class="chart-container"></div>
            </div>
        `;

        // 初始化 ESG 图表
        const esgChart = echarts.init(document.getElementById('esgChart'));
        esgChart.setOption({
            radar: {
                indicator: [
                    { name: '环境', max: 100 },
                    { name: '社会', max: 100 },
                    { name: '治理', max: 100 }
                ]
            },
            series: [{
                type: 'radar',
                data: [{
                    value: [
                        data.esg.environmental,
                        data.esg.social,
                        data.esg.governance
                    ],
                    name: 'ESG 评分'
                }]
            }]
        });

        // 初始化数据资产图表
        const dataAssetsChart = echarts.init(document.getElementById('dataAssetsChart'));
        dataAssetsChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{b}: ¥{c} ({d}%)'
            },
            series: [{
                type: 'pie',
                radius: '60%',
                data: data.dataAssets.categories.map(cat => ({
                    name: cat.name,
                    value: cat.value
                }))
            }]
        });
    }
}

// 导出 Navigation 类
window.Navigation = Navigation; 