/**
 * 工具函数库
 */

// 天干
const CELESTIAL_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
const TERRESTRIAL_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 九宫
const PALACES = {
    1: { name: '坎一宫', element: '水' },
    2: { name: '坤二宫', element: '土' },
    3: { name: '震三宫', element: '木' },
    4: { name: '巽四宫', element: '木' },
    5: { name: '中五宫', element: '土' },
    6: { name: '乾六宫', element: '金' },
    7: { name: '兑七宫', element: '金' },
    8: { name: '艮八宫', element: '土' },
    9: { name: '离九宫', element: '火' }
};

// 九星
const NINE_STARS = [
    { name: '天蓬星', attribute: '凶星', element: '水' },
    { name: '天芮星', attribute: '凶星', element: '土' },
    { name: '天冲星', attribute: '吉星', element: '木' },
    { name: '天辅星', attribute: '吉星', element: '木' },
    { name: '天禽星', attribute: '中性星', element: '土' },
    { name: '天心星', attribute: '吉星', element: '火' },
    { name: '天柱星', attribute: '凶星', element: '金' },
    { name: '天任星', attribute: '吉星', element: '土' },
    { name: '天英星', attribute: '凶星', element: '火' }
];

// 八门
const EIGHT_DOORS = [
    { name: '休门', attribute: '吉门', element: '水' },
    { name: '生门', attribute: '吉门', element: '木' },
    { name: '伤门', attribute: '凶门', element: '木' },
    { name: '杜门', attribute: '平门', element: '土' },
    { name: '景门', attribute: '吉门', element: '火' },
    { name: '死门', attribute: '凶门', element: '土' },
    { name: '惊门', attribute: '凶门', element: '金' },
    { name: '开门', attribute: '吉门', element: '金' }
];

// 八神
const EIGHT_DEITIES = [
    { name: '值符', attribute: '吉神' },
    { name: '腾蛇', attribute: '凶神' },
    { name: '太阴', attribute: '吉神' },
    { name: '六合', attribute: '吉神' },
    { name: '白虎', attribute: '凶神' },
    { name: '玄武', attribute: '凶神' },
    { name: '九地', attribute: '吉神' },
    { name: '九天', attribute: '吉神' }
];

/**
 * 获取指定年份的所有月份天数
 * @param {number} year - 年份
 * @returns {Array} - 每月天数数组
 */
function getDaysInMonths(year) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // 闰年2月有29天
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
    }
    
    return daysInMonth;
}

/**
 * 根据年月获取该月的天数
 * @param {number} year - 年份
 * @param {number} month - 月份（1-12）
 * @returns {number} - 天数
 */
function getDaysInMonth(year, month) {
    return getDaysInMonths(year)[month - 1];
}

/**
 * 判断是否为闰年
 * @param {number} year - 年份
 * @returns {boolean} - 是否为闰年
 */
function isLeapYear(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}

/**
 * 获取干支纪年
 * @param {number} year - 公历年份
 * @returns {string} - 干支纪年
 */
function getYearGanZhi(year) {
    const offset = (year - 4) % 60;
    const stemIndex = offset % 10;
    const branchIndex = offset % 12;
    
    return CELESTIAL_STEMS[stemIndex] + TERRESTRIAL_BRANCHES[branchIndex];
}

/**
 * 获取干支纪月
 * @param {number} year - 公历年份
 * @param {number} month - 公历月份（1-12）
 * @returns {string} - 干支纪月
 */
function getMonthGanZhi(year, month) {
    // 简化版，实际应考虑节气
    const stemBase = (year - 1900) * 12 + month - 1;
    const stemIndex = (stemBase % 10 + 6) % 10; // 月干起于丙
    const branchIndex = (month + 1) % 12; // 月支起于寅
    
    return CELESTIAL_STEMS[stemIndex] + TERRESTRIAL_BRANCHES[branchIndex];
}

/**
 * 获取干支纪日
 * @param {number} year - 公历年份
 * @param {number} month - 公历月份（1-12）
 * @param {number} day - 公历日期
 * @returns {string} - 干支纪日
 */
function getDayGanZhi(year, month, day) {
    // 简化版，实际计算更复杂
    // 1900年1月1日是甲戌日
    const base = new Date(1900, 0, 1);
    const current = new Date(year, month - 1, day);
    const offset = Math.floor((current - base) / (24 * 60 * 60 * 1000));
    
    const stemIndex = (offset + 10) % 10;
    const branchIndex = (offset + 10) % 12;
    
    return CELESTIAL_STEMS[stemIndex] + TERRESTRIAL_BRANCHES[branchIndex];
}

/**
 * 获取干支纪时
 * @param {string} hour - 时辰（子、丑、寅...）
 * @param {string} dayGan - 日干
 * @returns {string} - 干支纪时
 */
function getHourGanZhi(hour, dayGan) {
    const branchIndex = TERRESTRIAL_BRANCHES.indexOf(hour);
    if (branchIndex === -1) return '';
    
    // 根据日干确定时干起点
    const dayGanIndex = CELESTIAL_STEMS.indexOf(dayGan);
    const stemOffset = (dayGanIndex % 5) * 2;
    const stemIndex = (stemOffset + branchIndex) % 10;
    
    return CELESTIAL_STEMS[stemIndex] + hour;
}

/**
 * 获取节气信息
 * @param {number} year - 公历年份
 * @param {number} month - 公历月份（1-12）
 * @param {number} day - 公历日期
 * @returns {Object} - 节气信息
 */
function getSolarTerm(year, month, day) {
    // 简化版，实际应查表或计算
    // 这里仅返回示例数据
    return {
        name: '冬至', // 节气名称
        dunType: 'yang', // 阴阳遁类型
        juNumber: 1 // 局数
    };
}

/**
 * 根据节气确定奇门局数
 * @param {string} solarTerm - 节气名称
 * @param {string} dunType - 阴阳遁类型
 * @returns {number} - 局数（1-9）
 */
function getQimenJu(solarTerm, dunType) {
    // 简化版，实际应查表
    const juTable = {
        'yang': {
            '冬至': 1,
            '小寒': 2,
            '大寒': 3,
            '立春': 4,
            '雨水': 5,
            '惊蛰': 6,
            '春分': 7,
            '清明': 8,
            '谷雨': 9,
            '立夏': 9,
            '小满': 8,
            '芒种': 7
        },
        'yin': {
            '夏至': 1,
            '小暑': 2,
            '大暑': 3,
            '立秋': 4,
            '处暑': 5,
            '白露': 6,
            '秋分': 7,
            '寒露': 8,
            '霜降': 9,
            '立冬': 9,
            '小雪': 8,
            '大雪': 7
        }
    };
    
    return juTable[dunType][solarTerm] || 1;
}

/**
 * 格式化日期时间
 * @param {number} year - 年份
 * @param {number} month - 月份（1-12）
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

