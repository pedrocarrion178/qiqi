/**
 * 奇门遁甲核心算法
 */

class Palace {
    /**
     * 宫位构造函数
     * @param {number} number - 宫位数字（1-9）
     * @param {string} name - 宫位名称
     */
    constructor(number, name) {
        this.number = number;
        this.name = name;
        this.celestialStem = ''; // 天盘天干
        this.terrestrialBranch = ''; // 地盘地支
        this.star = ''; // 九星
        this.door = ''; // 八门
        this.deity = ''; // 八神
        this.hiddenStem = ''; // 旬空等隐藏信息
    }
}

class QimenChart {
    /**
     * 奇门盘构造函数
     */
    constructor() {
        this.palaces = {}; // 存储9个宫位对象，键为宫位数字
        this.overallInterpretation = ''; // 整体解读
        this.dateInfo = {
            year: 0,
            month: 0,
            day: 0,
            hour: '',
            yearGanZhi: '',
            monthGanZhi: '',
            dayGanZhi: '',
            hourGanZhi: '',
            solarTerm: '',
            dunType: '',
            juNumber: 0
        };
        
        // 初始化九宫
        for (let i = 1; i <= 9; i++) {
            this.palaces[i] = new Palace(i, PALACES[i].name);
        }
    }
    
    /**
     * 设置日期信息
     * @param {number} year - 年份
     * @param {number} month - 月份（1-12）
     * @param {number} day - 日期
     * @param {string} hour - 时辰
     * @param {string} dunType - 阴阳遁类型
     */
    setDateInfo(year, month, day, hour, dunType) {
        this.dateInfo.year = year;
        this.dateInfo.month = month;
        this.dateInfo.day = day;
        this.dateInfo.hour = hour;
        this.dateInfo.dunType = dunType;
        
        // 计算干支
        this.dateInfo.yearGanZhi = getYearGanZhi(year);
        this.dateInfo.monthGanZhi = getMonthGanZhi(year, month);
        this.dateInfo.dayGanZhi = getDayGanZhi(year, month, day);
        this.dateInfo.hourGanZhi = getHourGanZhi(hour, this.dateInfo.dayGanZhi[0]);
        
        // 获取节气和局数
        const solarTermInfo = getSolarTerm(year, month, day);
        this.dateInfo.solarTerm = solarTermInfo.name;
        
        // 如果用户选择了遁类，则使用用户选择的，否则使用节气推算的
        if (!dunType) {
            this.dateInfo.dunType = solarTermInfo.dunType;
        }
        
        this.dateInfo.juNumber = getQimenJu(solarTermInfo.name, this.dateInfo.dunType);
    }
    
    /**
     * 排地盘三奇六仪
     */
    arrangeEarthPlate() {
        // 地盘三奇六仪的排布是固定的
        const earthPlateArrangement = {
            1: '戊', // 坎一宫
            2: '己', // 坤二宫
            3: '庚', // 震三宫
            4: '辛', // 巽四宫
            5: '丁', // 中五宫
            6: '壬', // 乾六宫
            7: '癸', // 兑七宫
            8: '丙', // 艮八宫
            9: '乙'  // 离九宫
        };
        
        // 地盘地支排布
        const earthBranchArrangement = {
            1: '子', // 坎一宫
            2: '未', // 坤二宫
            3: '申', // 震三宫
            4: '酉', // 巽四宫
            5: '午', // 中五宫
            6: '亥', // 乾六宫
            7: '戌', // 兑七宫
            8: '卯', // 艮八宫
            9: '辰'  // 离九宫
        };
        
        // 设置地盘天干和地支
        for (let i = 1; i <= 9; i++) {
            this.palaces[i].celestialStem = earthPlateArrangement[i];
            this.palaces[i].terrestrialBranch = earthBranchArrangement[i];
        }
    }
    
    /**
     * 确定值符和值使
     * @returns {Object} - 值符和值使的宫位
     */
    findZhiFuZhiShi() {
        // 简化版，实际计算更复杂
        // 这里假设值符落在艮八宫，值使落在坎一宫
        const zhiFuPalace = this.palaces[8]; // 艮八宫
        const zhiShiPalace = this.palaces[1]; // 坎一宫
        
        return { zhiFuPalace, zhiShiPalace };
    }
    
    /**
     * 排布九星
     * @param {Object} zhiFuPalace - 值符所在宫位
     */
    arrangeStars(zhiFuPalace) {
        // 简化版，实际计算更复杂
        // 这里假设九星按照固定顺序排布
        const starOrder = [
            '天蓬星', '天芮星', '天冲星', '天辅星', '天禽星',
            '天心星', '天柱星', '天任星', '天英星'
        ];
        
        // 根据阴阳遁确定排布方向
        const isYangDun = this.dateInfo.dunType === 'yang';
        const direction = isYangDun ? 1 : -1; // 1表示顺时针，-1表示逆时针
        
        // 值符宫位对应的九星索引
        const startIndex = starOrder.indexOf('天禽星'); // 假设值符对应天禽星
        
        // 排布九星
        for (let i = 1; i <= 9; i++) {
            const starIndex = (startIndex + (i - 1) * direction + 9) % 9;
            this.palaces[i].star = starOrder[starIndex];
        }
    }
    
    /**
     * 排布八门
     * @param {Object} zhiShiPalace - 值使所在宫位
     */
    arrangeDoors(zhiShiPalace) {
        // 简化版，实际计算更复杂
        // 这里假设八门按照固定顺序排布
        const doorOrder = [
            '休门', '生门', '伤门', '杜门',
            '景门', '死门', '惊门', '开门'
        ];
        
        // 根据阴阳遁确定排布方向
        const isYangDun = this.dateInfo.dunType === 'yang';
        const direction = isYangDun ? 1 : -1; // 1表示顺时针，-1表示逆时针
        
        // 值使宫位对应的八门索引
        const startIndex = doorOrder.indexOf('休门'); // 假设值使对应休门
        
        // 排布八门（中宫没有门）
        for (let i = 1; i <= 9; i++) {
            if (i === 5) continue; // 中宫没有门
            
            const doorIndex = (startIndex + (i > 5 ? i - 2 : i - 1) * direction + 8) % 8;
            this.palaces[i].door = doorOrder[doorIndex];
        }
    }
    
    /**
     * 排布八神
     * @param {Object} zhiFuPalace - 值符所在宫位
     */
    arrangeDeities(zhiFuPalace) {
        // 简化版，实际计算更复杂
        // 这里假设八神按照固定顺序排布
        const deityOrder = [
            '值符', '腾蛇', '太阴', '六合',
            '白虎', '玄武', '九地', '九天'
        ];
        
        // 根据阴阳遁确定排布方向
        const isYangDun = this.dateInfo.dunType === 'yang';
        const direction = isYangDun ? 1 : -1; // 1表示顺时针，-1表示逆时针
        
        // 值符宫位对应的八神索引
        const startIndex = 0; // 值符神总是第一个
        
        // 排布八神（中宫没有神）
        for (let i = 1; i <= 9; i++) {
            if (i === 5) continue; // 中宫没有神
            
            const deityIndex = (startIndex + (i > 5 ? i - 2 : i - 1) * direction + 8) % 8;
            this.palaces[i].deity = deityOrder[deityIndex];
        }
    }
    
    /**
     * 生成整体解读
     */
    generateOverallInterpretation() {
        // 简化版，实际解读更复杂
        this.overallInterpretation = `
            <p>奇门遁甲排盘显示，您目前的整体运势较为平稳。</p>
            <p>事业方面有贵人相助，但需注意人际关系的处理。财运方面有小幅波动，建议稳健投资。健康方面需要注意休息，避免过度劳累。</p>
            <p>点击九宫格中的任意宫位，可查看该宫位的详细解读。</p>
        `;
    }
    
    /**
     * 生成宫位详解
     * @param {number} palaceNumber - 宫位数字（1-9）
     * @returns {string} - 宫位详解HTML
     */
    generatePalaceInterpretation(palaceNumber) {
        const palace = this.palaces[palaceNumber];
        if (!palace) return '';
        
        // 简化版，实际解读更复杂
        return `
            <p>这是 ${palace.name} 的详细解读。</p>
            <p>此宫位代表了您生活中的某个特定领域，根据当前的奇门盘，可以解读出以下信息：</p>
            <ul>
                <li>天盘：${palace.celestialStem}</li>
                <li>地盘：${palace.terrestrialBranch}</li>
                <li>九星：${palace.star}</li>
                <li>八门：${palace.door || '无'}</li>
                <li>八神：${palace.deity || '无'}</li>
            </ul>
            <p>事业方面：有机遇但需谨慎把握</p>
            <p>财运方面：稳中有进，适合稳健投资</p>
            <p>感情方面：关系和谐，沟通顺畅</p>
            <p>健康方面：需注意休息，避免过度劳累</p>
            <p>建议：保持积极心态，把握当下机遇，同时做好风险防范。</p>
        `;
    }
    
    /**
     * 排盘主函数
     * @param {number} year - 年份
     * @param {number} month - 月份（1-12）
     * @param {number} day - 日期
     * @param {string} hour - 时辰
     * @param {string} dunType - 阴阳遁类型
     * @returns {QimenChart} - 排盘结果
     */
    static generate(year, month, day, hour, dunType) {
        const chart = new QimenChart();
        
        // 设置日期信息
        chart.setDateInfo(year, month, day, hour, dunType);
        
        // 排地盘三奇六仪
        chart.arrangeEarthPlate();
        
        // 确定值符和值使
        const { zhiFuPalace, zhiShiPalace } = chart.findZhiFuZhiShi();
        
        // 排布九星
        chart.arrangeStars(zhiFuPalace);
        
        // 排布八门
        chart.arrangeDoors(zhiShiPalace);
        
        // 排布八神
        chart.arrangeDeities(zhiFuPalace);
        
        // 生成整体解读
        chart.generateOverallInterpretation();
        
        return chart;
    }
}

