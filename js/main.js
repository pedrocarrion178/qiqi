/**
 * 主程序
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const yearSelect = document.getElementById('year');
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');
    const hourSelect = document.getElementById('hour');
    const generateBtn = document.getElementById('generate-btn');
    const qimenChart = document.getElementById('qimen-chart');
    const chartInfo = document.getElementById('chart-info');
    const overallInterpretation = document.getElementById('overall-interpretation');
    const modal = document.getElementById('palace-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.close-btn');
    
    // 初始化年份选项
    initYearOptions();
    
    // 初始化月份选项
    initMonthOptions();
    
    // 初始化表单验证
    initFormValidation();
    
    // 监听月份变化，更新日期选项
    monthSelect.addEventListener('change', updateDayOptions);
    
    // 监听年份变化，更新日期选项
    yearSelect.addEventListener('change', function() {
        if (monthSelect.value) {
            updateDayOptions();
        }
    });
    
    // 生成奇门盘按钮点击事件
    generateBtn.addEventListener('click', function(event) {
        event.preventDefault();
        generateQimenChart();
    });
    
    // 关闭模态框按钮点击事件
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭模态框
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    /**
     * 初始化年份选项
     */
    function initYearOptions() {
        const currentYear = new Date().getFullYear();
        
        for (let year = 1900; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year + '年';
            yearSelect.appendChild(option);
        }
        
        // 默认选择当前年份
        yearSelect.value = currentYear;
    }
    
    /**
     * 初始化月份选项
     */
    function initMonthOptions() {
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month + '月';
            monthSelect.appendChild(option);
        }
        
        // 默认选择当前月份
        const currentMonth = new Date().getMonth() + 1;
        monthSelect.value = currentMonth;
        
        // 初始化日期选项
        updateDayOptions();
    }
    
    /**
     * 更新日期选项
     */
    function updateDayOptions() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        
        if (!year || !month) return;
        
        // 清空现有选项
        daySelect.innerHTML = '<option value="">请选择日期</option>';
        
        // 获取月份天数
        const daysInMonth = getDaysInMonth(year, month);
        
        // 添加日期选项
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            daySelect.appendChild(option);
        }
        
        // 默认选择当前日期（如果在当月）
        const today = new Date();
        if (today.getFullYear() === year && today.getMonth() + 1 === month) {
            const currentDay = today.getDate();
            if (currentDay <= daysInMonth) {
                daySelect.value = currentDay;
            }
        }
    }
    
    /**
     * 获取月份天数
     * @param {number} year - 年份
     * @param {number} month - 月份（1-12）
     * @returns {number} - 天数
     */
    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }
    
    /**
     * 格式化日期时间
     * @param {number} year - 年份
     * @param {number} month - 月份
     * @param {number} day - 日期
     * @param {string} hour - 时辰
     * @returns {string} - 格式化后的日期时间
     */
    function formatDateTime(year, month, day, hour) {
        const hourMap = {
            '子': '23:00-01:00',
            '丑': '01:00-03:00',
            '寅': '03:00-05:00',
            '卯': '05:00-07:00',
            '辰': '07:00-09:00',
            '巳': '09:00-11:00',
            '午': '11:00-13:00',
            '未': '13:00-15:00',
            '申': '15:00-17:00',
            '酉': '17:00-19:00',
            '戌': '19:00-21:00',
            '亥': '21:00-23:00'
        };
        
        return `${year}年${month}月${day}日 ${hour}时 (${hourMap[hour] || ''})`;
    }
    
    /**
     * 生成奇门盘
     */
    function generateQimenChart() {
        // 获取表单值
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const day = parseInt(daySelect.value);
        const hour = hourSelect.value;
        const dunType = document.querySelector('input[name="dunType"]:checked')?.value;
        
        // 验证输入
        if (!year || !month || !day || !hour || !dunType) {
            showError('请填写完整的出生时间信息并选择遁类');
            return;
        }
        
        try {
            // 显示加载状态
            showLoading(true);
            
            // 生成奇门盘
            const chart = QimenChart.generate(year, month, day, hour, dunType);
            
            // 更新图表信息
            updateChartInfo(chart);
            
            // 渲染九宫格
            renderQimenChart(chart);
            
            // 显示整体解读
            overallInterpretation.innerHTML = generateOverallInterpretation(chart);
            
            // 保存当前奇门盘到全局变量，供模态框使用
            window.currentChart = chart;
            
            // 滚动到结果区域
            document.querySelector('.chart-section').scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('生成奇门盘出错:', error);
            showError('生成奇门盘时出错，请重试');
        } finally {
            // 隐藏加载状态
            showLoading(false);
        }
    }
    
    /**
     * 显示错误信息
     * @param {string} message - 错误信息
     */
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const form = document.querySelector('.input-form');
        const submitButton = document.querySelector('.btn-generate');
        
        form.insertBefore(errorDiv, submitButton);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    /**
     * 显示/隐藏加载状态
     * @param {boolean} show - 是否显示
     */
    function showLoading(show) {
        let loadingDiv = document.querySelector('.loading');
        
        if (show) {
            if (!loadingDiv) {
                loadingDiv = document.createElement('div');
                loadingDiv.className = 'loading';
                loadingDiv.innerHTML = '<div class="spinner"></div><p>正在生成奇门盘...</p>';
                document.body.appendChild(loadingDiv);
            }
            loadingDiv.style.display = 'flex';
        } else if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }
    }
    
    /**
     * 更新图表信息
     * @param {QimenChart} chart - 奇门盘对象
     */
    function updateChartInfo(chart) {
        const dateInfo = chart.dateInfo;
        
        chartInfo.innerHTML = `
            <p>排盘时间：${formatDateTime(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour)}</p>
            <p>四柱：${dateInfo.yearGanZhi}年 ${dateInfo.monthGanZhi}月 ${dateInfo.dayGanZhi}日 ${dateInfo.hourGanZhi}时</p>
            <p>节气：${dateInfo.solarTerm} | ${dateInfo.dunType === 'yang' ? '阳遁' : '阴遁'}${dateInfo.juNumber}局</p>
        `;
    }
    
    /**
     * 渲染九宫格
     * @param {QimenChart} chart - 奇门盘对象
     */
    function renderQimenChart(chart) {
        // 清空现有内容
        qimenChart.innerHTML = '';
        
        // 九宫格排列顺序
        const palaceOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];
        
        // 创建九宫格
        for (const palaceNumber of palaceOrder) {
            const palace = chart.palaces[palaceNumber];
            
            const cell = document.createElement('div');
            cell.className = 'qimen-cell';
            cell.setAttribute('data-palace', palaceNumber);
            
            cell.innerHTML = `
                <span class="palace-name">${palace.name.substring(0, 2)}</span>
                <h3>${palace.name}</h3>
                <p class="star">九星: <span class="star-text">${palace.star}</span></p>
                <p class="door">八门: <span class="door-text">${palace.door || '无'}</span></p>
                <p class="deity">八神: <span class="deity-text">${palace.deity || '无'}</span></p>
                <p>天盘: <span class="stem-text">${palace.celestialStem}</span></p>
                <p>地盘: <span class="branch-text">${palace.terrestrialBranch}</span></p>
            `;
            
            // 添加点击事件
            cell.addEventListener('click', function() {
                showPalaceDetail(palaceNumber);
            });
            
            qimenChart.appendChild(cell);
        }
    }
    
    /**
     * 显示宫位详情
     * @param {number} palaceNumber - 宫位数字（1-9）
     */
    function showPalaceDetail(palaceNumber) {
        if (!window.currentChart) return;
        
        const palace = window.currentChart.palaces[palaceNumber];
        modalTitle.textContent = palace.name + ' 详解';
        modalContent.innerHTML = generatePalaceInterpretation(palaceNumber, window.currentChart);
        modal.style.display = 'block';
    }
});

