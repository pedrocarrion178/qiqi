/**
 * 表单验证和错误处理
 */

/**
 * 验证表单输入
 * @param {HTMLFormElement} form - 表单元素
 * @returns {boolean} - 验证结果
 */
function validateForm(form) {
    const year = form.querySelector('#yearSelect').value;
    const month = form.querySelector('#monthSelect').value;
    const day = form.querySelector('#daySelect').value;
    const hour = form.querySelector('#hourSelect').value;
    const dunType = form.querySelector('input[name="dunType"]:checked');
    
    // 验证年份
    if (!year || year === '请选择年份') {
        showError('请选择出生年份');
        return false;
    }
    
    // 验证月份
    if (!month || month === '请选择月份') {
        showError('请选择出生月份');
        return false;
    }
    
    // 验证日期
    if (!day || day === '请选择日期') {
        showError('请选择出生日期');
        return false;
    }
    
    // 验证时辰
    if (!hour || hour === '请选择时辰') {
        showError('请选择出生时辰');
        return false;
    }
    
    // 验证遁类
    if (!dunType) {
        showError('请选择阴遁或阳遁');
        return false;
    }
    
    return true;
}

/**
 * 显示错误信息
 * @param {string} message - 错误信息
 */
function showError(message) {
    // 创建错误提示元素
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // 查找表单元素
    const form = document.querySelector('.input-form');
    const submitButton = document.querySelector('.btn-generate');
    
    // 插入错误提示
    form.insertBefore(errorDiv, submitButton);
    
    // 3秒后自动移除错误提示
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

/**
 * 处理日期选择器的联动
 * @param {HTMLSelectElement} yearSelect - 年份选择器
 * @param {HTMLSelectElement} monthSelect - 月份选择器
 * @param {HTMLSelectElement} daySelect - 日期选择器
 */
function handleDateSelectors(yearSelect, monthSelect, daySelect) {
    // 当年份或月份改变时，更新日期选择器
    yearSelect.addEventListener('change', () => updateDayOptions(yearSelect, monthSelect, daySelect));
    monthSelect.addEventListener('change', () => updateDayOptions(yearSelect, monthSelect, daySelect));
}

/**
 * 更新日期选择器的选项
 * @param {HTMLSelectElement} yearSelect - 年份选择器
 * @param {HTMLSelectElement} monthSelect - 月份选择器
 * @param {HTMLSelectElement} daySelect - 日期选择器
 */
function updateDayOptions(yearSelect, monthSelect, daySelect) {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    
    if (!year || !month) return;
    
    // 获取当月天数
    const daysInMonth = getDaysInMonth(year, month);
    
    // 保存当前选中的日期
    const selectedDay = daySelect.value;
    
    // 清空日期选择器
    daySelect.innerHTML = '<option value="">请选择日期</option>';
    
    // 添加日期选项
    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + '日';
        daySelect.appendChild(option);
    }
    
    // 恢复之前选中的日期（如果有效）
    if (selectedDay && parseInt(selectedDay) <= daysInMonth) {
        daySelect.value = selectedDay;
    }
}

/**
 * 获取指定年月的天数
 * @param {number} year - 年份
 * @param {number} month - 月份（1-12）
 * @returns {number} - 天数
 */
function getDaysInMonth(year, month) {
    // JavaScript中月份从0开始，所以需要减1
    return new Date(year, month, 0).getDate();
}

/**
 * 处理异常情况
 * @param {Error} error - 错误对象
 */
function handleError(error) {
    console.error('发生错误:', error);
    showError('生成奇门盘时出错，请重试');
}

/**
 * 初始化表单验证
 */
function initFormValidation() {
    const form = document.querySelector('.input-form');
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const daySelect = document.getElementById('daySelect');
    
    // 设置日期选择器联动
    handleDateSelectors(yearSelect, monthSelect, daySelect);
    
    // 表单提交验证
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm(form)) {
            try {
                generateQimenChart();
            } catch (error) {
                handleError(error);
            }
        }
    });
}

