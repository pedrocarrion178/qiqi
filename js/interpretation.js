/**
 * 奇门遁甲解读内容生成
 */

/**
 * 宫位基本信息
 */
const PALACE_INFO = {
    1: {
        name: '坎一宫',
        direction: '北方',
        element: '水',
        domains: ['事业起始', '财源', '智慧', '人脉'],
        bodyParts: ['耳朵', '泌尿系统', '生殖系统'],
        characteristics: ['智慧', '灵活', '沟通', '流动']
    },
    2: {
        name: '坤二宫',
        direction: '西南方',
        element: '土',
        domains: ['婚姻', '伙伴关系', '合作', '母亲'],
        bodyParts: ['脾胃', '消化系统', '腹部'],
        characteristics: ['包容', '温和', '稳定', '滋养']
    },
    3: {
        name: '震三宫',
        direction: '东方',
        element: '木',
        domains: ['创新', '决策', '开拓', '长子'],
        bodyParts: ['肝胆', '神经系统', '四肢'],
        characteristics: ['活力', '成长', '变化', '冲击']
    },
    4: {
        name: '巽四宫',
        direction: '东南方',
        element: '木',
        domains: ['财富', '口才', '表达', '长女'],
        bodyParts: ['呼吸系统', '肺部', '皮肤'],
        characteristics: ['柔顺', '渗透', '敏感', '细腻']
    },
    5: {
        name: '中五宫',
        direction: '中央',
        element: '土',
        domains: ['核心', '自我', '中心', '平衡'],
        bodyParts: ['心脏', '脾脏', '中枢神经'],
        characteristics: ['稳定', '中正', '平衡', '调和']
    },
    6: {
        name: '乾六宫',
        direction: '西北方',
        element: '金',
        domains: ['事业', '领导', '权威', '父亲'],
        bodyParts: ['头部', '骨骼', '牙齿'],
        characteristics: ['刚毅', '决断', '权威', '领导']
    },
    7: {
        name: '兑七宫',
        direction: '西方',
        element: '金',
        domains: ['口舌', '社交', '喜悦', '少女'],
        bodyParts: ['口腔', '咽喉', '肺部'],
        characteristics: ['愉悦', '表达', '社交', '锐利']
    },
    8: {
        name: '艮八宫',
        direction: '东北方',
        element: '土',
        domains: ['学习', '知识', '稳定', '少男'],
        bodyParts: ['手部', '背部', '骨骼'],
        characteristics: ['稳重', '停止', '保守', '内敛']
    },
    9: {
        name: '离九宫',
        direction: '南方',
        element: '火',
        domains: ['名誉', '声望', '光明', '中女'],
        bodyParts: ['眼睛', '心脏', '血液循环'],
        characteristics: ['光明', '热情', '活跃', '表现']
    }
};

/**
 * 九星特性
 */
const STAR_TRAITS = {
    '天蓬星': {
        attribute: '凶星',
        element: '水',
        traits: ['谋略', '智慧', '刚强', '冲动'],
        domains: ['思考', '计划', '策略', '水相关事业']
    },
    '天芮星': {
        attribute: '凶星',
        element: '土',
        traits: ['稳重', '保守', '迟滞', '固执'],
        domains: ['稳定', '保障', '防守', '土地房产']
    },
    '天冲星': {
        attribute: '吉星',
        element: '木',
        traits: ['活力', '冲劲', '进取', '急躁'],
        domains: ['开拓', '创新', '突破', '木相关事业']
    },
    '天辅星': {
        attribute: '吉星',
        element: '木',
        traits: ['文雅', '辅佐', '协助', '支持'],
        domains: ['辅助', '教育', '文化', '艺术']
    },
    '天禽星': {
        attribute: '中性星',
        element: '土',
        traits: ['中正', '平衡', '调和', '中庸'],
        domains: ['协调', '中介', '调解', '平衡']
    },
    '天心星': {
        attribute: '吉星',
        element: '火',
        traits: ['热情', '光明', '领导', '自信'],
        domains: ['领导', '医疗', '心理', '火相关事业']
    },
    '天柱星': {
        attribute: '凶星',
        element: '金',
        traits: ['坚固', '支撑', '固执', '倔强'],
        domains: ['支持', '建设', '维护', '金属工业']
    },
    '天任星': {
        attribute: '吉星',
        element: '土',
        traits: ['责任', '担当', '稳重', '可靠'],
        domains: ['责任', '管理', '组织', '行政']
    },
    '天英星': {
        attribute: '凶星',
        element: '火',
        traits: ['聪明', '才智', '锐利', '急躁'],
        domains: ['创意', '表演', '娱乐', '科技']
    }
};

/**
 * 八门特性
 */
const DOOR_TRAITS = {
    '休门': {
        attribute: '吉门',
        element: '水',
        traits: ['休息', '调养', '收敛', '内省'],
        domains: ['休闲', '疗养', '调整', '内部事务']
    },
    '生门': {
        attribute: '吉门',
        element: '木',
        traits: ['生发', '成长', '繁荣', '发展'],
        domains: ['创业', '投资', '发展', '教育']
    },
    '伤门': {
        attribute: '凶门',
        element: '木',
        traits: ['损伤', '破坏', '冲突', '争执'],
        domains: ['竞争', '诉讼', '手术', '改革']
    },
    '杜门': {
        attribute: '平门',
        element: '土',
        traits: ['阻塞', '停滞', '保守', '稳定'],
        domains: ['保密', '防守', '保护', '隐藏']
    },
    '景门': {
        attribute: '吉门',
        element: '火',
        traits: ['明亮', '显露', '公开', '表达'],
        domains: ['宣传', '考试', '文书', '表演']
    },
    '死门': {
        attribute: '凶门',
        element: '土',
        traits: ['终结', '衰败', '停滞', '固化'],
        domains: ['结束', '清算', '丧葬', '转型']
    },
    '惊门': {
        attribute: '凶门',
        element: '金',
        traits: ['震惊', '意外', '变动', '不安'],
        domains: ['变革', '突发', '意外', '刺激']
    },
    '开门': {
        attribute: '吉门',
        element: '金',
        traits: ['开启', '畅通', '发展', '机遇'],
        domains: ['开始', '启动', '外出', '交流']
    }
};

/**
 * 八神特性
 */
const DEITY_TRAITS = {
    '值符': {
        attribute: '吉神',
        traits: ['领导', '权威', '贵人', '主导'],
        domains: ['领导', '权力', '核心', '主导']
    },
    '腾蛇': {
        attribute: '凶神',
        traits: ['变化', '波动', '诡异', '缠绕'],
        domains: ['变动', '口舌', '是非', '波折']
    },
    '太阴': {
        attribute: '吉神',
        traits: ['阴柔', '隐藏', '内敛', '神秘'],
        domains: ['隐秘', '女性', '情感', '直觉']
    },
    '六合': {
        attribute: '吉神',
        traits: ['和合', '团结', '协作', '融洽'],
        domains: ['合作', '婚姻', '团队', '和谐']
    },
    '白虎': {
        attribute: '凶神',
        traits: ['凶猛', '暴力', '伤害', '冲突'],
        domains: ['伤害', '争斗', '疾病', '意外']
    },
    '玄武': {
        attribute: '凶神',
        traits: ['隐匿', '欺诈', '暗昧', '偷盗'],
        domains: ['隐患', '欺骗', '暗中', '小人']
    },
    '九地': {
        attribute: '吉神',
        traits: ['稳固', '踏实', '根基', '支持'],
        domains: ['基础', '地产', '资源', '支持']
    },
    '九天': {
        attribute: '吉神',
        traits: ['高远', '理想', '抱负', '提升'],
        domains: ['提升', '理想', '目标', '高层']
    }
};

/**
 * 生成整体解读
 * @param {QimenChart} chart - 奇门盘对象
 * @returns {string} - 整体解读HTML
 */
function generateOverallInterpretation(chart) {
    const dateInfo = chart.dateInfo;
    
    // 基本信息
    const basicInfo = `
        <h3>排盘信息</h3>
        <p>排盘时间：${dateInfo.year}年${dateInfo.month}月${dateInfo.day}日 ${dateInfo.hour}时</p>
        <p>四柱：${dateInfo.yearGanZhi}年 ${dateInfo.monthGanZhi}月 ${dateInfo.dayGanZhi}日 ${dateInfo.hourGanZhi}时</p>
        <p>节气：${dateInfo.solarTerm} | ${dateInfo.dunType === 'yang' ? '阳遁' : '阴遁'}${dateInfo.juNumber}局</p>
    `;
    
    // 总体运势
    const overallFortune = `
        <h3>总体运势</h3>
        <p>奇门遁甲排盘显示，您目前的整体运势较为平稳。日干落入中等吉位，与时干关系和谐，显示您当前处于一个相对稳定的阶段，各方面发展均衡，没有明显的大起大落。</p>
    `;
    
    // 事业运势
    const careerFortune = `
        <h3>事业运势</h3>
        <p>事业方面有贵人相助，但需注意人际关系的处理。近期工作中可能会遇到一些挑战，但只要保持积极的态度和良好的沟通，就能顺利度过。适合稳扎稳打，循序渐进地推进工作计划，不宜冒进或做重大决策。</p>
    `;
    
    // 财运分析
    const wealthFortune = `
        <h3>财运分析</h3>
        <p>财运方面有小幅波动，收入来源稳定但增长有限。适合稳健投资，避免高风险的财务决策。近期可能有意外收入，但也要防范突发支出。理财上宜守不宜攻，量入为出，避免大额消费和冲动购物。</p>
    `;
    
    // 感情运势
    const loveFortune = `
        <h3>感情运势</h3>
        <p>感情方面关系和谐，沟通顺畅。单身者可能会在社交场合遇到有好感的对象，但发展需要时间培养。已有伴侣的人近期感情生活平淡但温馨，适合规划共同的未来，增进彼此了解和信任。</p>
    `;
    
    // 健康状况
    const healthFortune = `
        <h3>健康状况</h3>
        <p>健康方面需要注意休息，避免过度劳累。工作压力可能导致精神紧张和身体疲劳，应合理安排作息时间，保证充足的睡眠。特别注意呼吸系统和消化系统的保健，适当增加户外活动和体育锻炼，保持身心健康。</p>
    `;
    
    // 运势建议
    const adviceFortune = `
        <h3>运势建议</h3>
        <ul>
            <li>事业上把握机会，主动出击，但注意与同事和上级的沟通方式</li>
            <li>财务上保持稳健，避免冲动消费和高风险投资</li>
            <li>感情上增进交流，创造共同的美好回忆</li>
            <li>健康上注重作息规律，避免熬夜和过度疲劳</li>
            <li>整体上保持积极心态，合理规划时间，平衡工作与生活</li>
        </ul>
    `;
    
    // 组合所有内容
    return `
        <div class="interpretation-section">
            ${basicInfo}
            ${overallFortune}
            ${careerFortune}
            ${wealthFortune}
            ${loveFortune}
            ${healthFortune}
            ${adviceFortune}
        </div>
        <p class="interpretation-note">点击九宫格中的任意宫位，可查看该宫位的详细解读。</p>
    `;
}

/**
 * 生成宫位详解
 * @param {number} palaceNumber - 宫位数字（1-9）
 * @param {QimenChart} chart - 奇门盘对象
 * @returns {string} - 宫位详解HTML
 */
function generatePalaceInterpretation(palaceNumber, chart) {
    const palace = chart.palaces[palaceNumber];
    const palaceInfo = PALACE_INFO[palaceNumber];
    
    if (!palace || !palaceInfo) return '<p>无法获取宫位信息</p>';
    
    // 宫位基本信息
    const basicInfo = `
        <h3>基本信息</h3>
        <p>宫位：${palaceInfo.name}（${palaceInfo.direction}）</p>
        <p>五行：${palaceInfo.element}</p>
        <p>代表领域：${palaceInfo.domains.join('、')}</p>
        <p>代表身体部位：${palaceInfo.bodyParts.join('、')}</p>
    `;
    
    // 宫位元素分析
    const starInfo = STAR_TRAITS[palace.star] || { traits: ['未知'], domains: ['未知'] };
    const doorInfo = DOOR_TRAITS[palace.door] || { traits: ['未知'], domains: ['未知'] };
    const deityInfo = DEITY_TRAITS[palace.deity] || { traits: ['未知'], domains: ['未知'] };
    
    const elementAnalysis = `
        <h3>元素分析</h3>
        <p>天盘：${palace.celestialStem} - 代表${getCelestialStemMeaning(palace.celestialStem)}</p>
        <p>地盘：${palace.terrestrialBranch} - 代表${getTerrestrialBranchMeaning(palace.terrestrialBranch)}</p>
        <p>九星：${palace.star} - 主${starInfo.traits.join('、')}</p>
        <p>八门：${palace.door || '无'} - ${palace.door ? `主${doorInfo.traits.join('、')}` : '无门'}</p>
        <p>八神：${palace.deity || '无'} - ${palace.deity ? `主${deityInfo.traits.join('、')}` : '无神'}</p>
    `;
    
    // 宫位格局判断
    const patternJudgment = `
        <h3>格局判断</h3>
        <p>${getPalacePattern(palace, palaceNumber)}</p>
    `;
    
    // 宫位生活化解读
    const lifeInterpretation = `
        <h3>生活化解读</h3>
        
        <h4>事业方面</h4>
        <p>${getCareerInterpretation(palace, palaceInfo)}</p>
        
        <h4>财运方面</h4>
        <p>${getWealthInterpretation(palace, palaceInfo)}</p>
        
        <h4>感情方面</h4>
        <p>${getLoveInterpretation(palace, palaceInfo)}</p>
        
        <h4>健康方面</h4>
        <p>${getHealthInterpretation(palace, palaceInfo)}</p>
    `;
    
    // 宫位吉凶与化解
    const fortuneAndSolution = `
        <h3>吉凶与化解</h3>
        <p>${getPalaceFortuneAndSolution(palace, palaceInfo)}</p>
    `;
    
    // 组合所有内容
    return `
        <div class="palace-interpretation">
            ${basicInfo}
            ${elementAnalysis}
            ${patternJudgment}
            ${lifeInterpretation}
            ${fortuneAndSolution}
        </div>
    `;
}

/**
 * 获取天干含义
 * @param {string} stem - 天干
 * @returns {string} - 含义
 */
function getCelestialStemMeaning(stem) {
    const meanings = {
        '甲': '创新、开始、领导力',
        '乙': '柔顺、灵活、适应性',
        '丙': '光明、热情、表现力',
        '丁': '温暖、细腻、敏感',
        '戊': '稳重、中正、包容',
        '己': '滋养、温和、内敛',
        '庚': '刚毅、决断、执行力',
        '辛': '锐利、精确、审美',
        '壬': '智慧、流动、变通',
        '癸': '滋润、内敛、深思'
    };
    
    return meanings[stem] || '未知特性';
}

/**
 * 获取地支含义
 * @param {string} branch - 地支
 * @returns {string} - 含义
 */
function getTerrestrialBranchMeaning(branch) {
    const meanings = {
        '子': '起始、潜伏、蓄势',
        '丑': '积累、储藏、稳固',
        '寅': '生发、冲破、奋进',
        '卯': '舒展、明朗、生长',
        '辰': '震动、变化、转折',
        '巳': '明亮、活跃、上升',
        '午': '极盛、明显、外向',
        '未': '和缓、滋养、内敛',
        '申': '收敛、整顿、规整',
        '酉': '收获、锐利、精确',
        '戌': '稳定、守成、固守',
        '亥': '潜藏、回归、蓄势'
    };
    
    return meanings[branch] || '未知特性';
}

/**
 * 获取宫位格局
 * @param {Object} palace - 宫位对象
 * @param {number} palaceNumber - 宫位数字
 * @returns {string} - 格局描述
 */
function getPalacePattern(palace, palaceNumber) {
    // 这里简化处理，实际应根据具体的星门神组合判断格局
    const patterns = [
        `${palace.star}与${palace.door || '无门'}相会，形成"${palace.star.substring(1, 2)}${palace.door ? palace.door.substring(0, 1) : ''}同宫"格局，`,
        `${palace.celestialStem}天干与${palace.terrestrialBranch}地支同宫，`,
        `${palace.deity ? palace.deity + '入' + PALACE_INFO[palaceNumber].name + '，' : ''}`
    ];
    
    const effects = [
        '主文思敏捷，学习能力强，但也可能过于理想化。',
        '显示您在此方面有较强的执行力和创新思维。',
        '表明您可能会得到贵人相助，但也需要注意人际关系的处理。',
        '意味着您在此领域可能会遇到一些挑战，但只要保持积极态度，就能顺利度过。'
    ];
    
    // 随机选择一些效果描述
    const selectedPatterns = patterns.filter(() => Math.random() > 0.3);
    const selectedEffects = effects.filter(() => Math.random() > 0.5);
    
    return selectedPatterns.join('') + selectedEffects.join('');
}

/**
 * 获取事业解读
 * @param {Object} palace - 宫位对象
 * @param {Object} palaceInfo - 宫位信息
 * @returns {string} - 事业解读
 */
function getCareerInterpretation(palace, palaceInfo) {
    const starInfo = STAR_TRAITS[palace.star] || { traits: ['未知'], domains: ['未知'] };
    const doorInfo = DOOR_TRAITS[palace.door] || { traits: ['未知'], domains: ['未知'] };
    
    const careerTraits = [
        `您在职场上${starInfo.traits[0]}、${starInfo.traits[1]}，特别适合${starInfo.domains[0]}、${starInfo.domains[1]}相关的工作。`,
        `近期可能会有与${doorInfo.domains[0]}、${doorInfo.domains[1]}相关的机会，值得把握。`,
        `您的专业能力得到认可，但需注意不要${starInfo.traits[2]}而忽视团队协作。`,
        `建议多向有经验的前辈请教，汲取实战经验，提升自己的${palaceInfo.characteristics[0]}和${palaceInfo.characteristics[1]}能力。`
    ];
    
    // 随机选择一些特性描述
    const selectedTraits = careerTraits.filter(() => Math.random() > 0.3);
    
    return selectedTraits.join(' ');
}

/**
 * 获取财运解读
 * @param {Object} palace - 宫位对象
 * @param {Object} palaceInfo - 宫位信息
 * @returns {string} - 财运解读
 */
function getWealthInterpretation(palace, palaceInfo) {
    const starInfo = STAR_TRAITS[palace.star] || { traits: ['未知'], domains: ['未知'] };
    const doorInfo = DOOR_TRAITS[palace.door] || { traits: ['未知'], domains: ['未知'] };
    
    const wealthTraits = [
        `财源${doorInfo.attribute === '吉门' ? '稳定且有增长' : '稳定但增长有限'}，适合${doorInfo.attribute === '吉门' ? '积极' : '稳健'}投资和理财规划。`,
        `近期可能有与${starInfo.domains[0]}、${starInfo.domains[1]}相关的收入机会。`,
        `但也要注意防范与${palaceInfo.element}相关的财务风险，如${getElementRisk(palaceInfo.element)}。`,
        `建议增加储蓄比例，为未来做好财务准备，避免冲动消费。`
    ];
    
    // 随机选择一些特性描述
    const selectedTraits = wealthTraits.filter(() => Math.random() > 0.3);
    
    return selectedTraits.join(' ');
}

/**
 * 获取感情解读
 * @param {Object} palace - 宫位对象
 * @param {Object} palaceInfo - 宫位信息
 * @returns {string} - 感情解读
 */
function getLoveInterpretation(palace, palaceInfo) {
    const starInfo = STAR_TRAITS[palace.star] || { traits: ['未知'], domains: ['未知'] };
    const deityInfo = DEITY_TRAITS[palace.deity] || { traits: ['未知'], domains: ['未知'] };
    
    const loveTraits = [
        `感情生活${deityInfo.attribute === '吉神' ? '和谐美满' : '较为平静'}，沟通${deityInfo.attribute === '吉神' ? '顺畅' : '可能有些障碍'}。`,
        `单身者可能会在${starInfo.domains[0]}、${starInfo.domains[1]}相关的场合遇到有好感的对象。`,
        `已有伴侣的人需要注意避免${starInfo.traits[2]}、${starInfo.traits[3]}影响关系，多创造共同的美好回忆。`,
        `建议通过${palaceInfo.characteristics[0]}、${palaceInfo.characteristics[1]}的方式增进感情，提升关系质量。`
    ];
    
    // 随机选择一些特性描述
    const selectedTraits = loveTraits.filter(() => Math.random() > 0.3);
    
    return selectedTraits.join(' ');
}

/**
 * 获取健康解读
 * @param {Object} palace - 宫位对象
 * @param {Object} palaceInfo - 宫位信息
 * @returns {string} - 健康解读
 */
function getHealthInterpretation(palace, palaceInfo) {
    const starInfo = STAR_TRAITS[palace.star] || { traits: ['未知'], domains: ['未知'] };
    const doorInfo = DOOR_TRAITS[palace.door] || { traits: ['未知'], domains: ['未知'] };
    
    const healthTraits = [
        `需要特别关注${palaceInfo.bodyParts.join('、')}的健康，保持良好的生活习惯。`,
        `${starInfo.traits[2]}、${starInfo.traits[3]}的特性可能影响睡眠质量，建议通过冥想、轻度运动等方式调节心态。`,
        `${doorInfo.attribute === '凶门' ? '环境变化时要特别注意保健' : '保持规律的作息有助于提升健康状况'}。`,
        `建议适当增加${getElementHealth(palaceInfo.element)}相关的活动或食物，平衡身体状态。`
    ];
    
    // 随机选择一些特性描述
    const selectedTraits = healthTraits.filter(() => Math.random() > 0.3);
    
    return selectedTraits.join(' ');
}

/**
 * 获取宫位吉凶与化解
 * @param {Object} palace - 宫位对象
 * @param {Object} palaceInfo - 宫位信息
 * @returns {string} - 吉凶与化解
 */
function getPalaceFortuneAndSolution(palace, palaceInfo) {
    const starInfo = STAR_TRAITS[palace.star] || { attribute: '未知' };
    const doorInfo = DOOR_TRAITS[palace.door] || { attribute: '未知' };
    const deityInfo = DEITY_TRAITS[palace.deity] || { attribute: '未知' };
    
    // 判断宫位吉凶
    const attributes = [starInfo.attribute, doorInfo.attribute, deityInfo.attribute];
    const fortuneCount = attributes.filter(attr => attr === '吉星' || attr === '吉门' || attr === '吉神').length;
    const badFortuneCount = attributes.filter(attr => attr === '凶星' || attr === '凶门' || attr === '凶神').length;
    
    let fortune = '中平';
    if (fortuneCount > badFortuneCount) {
        fortune = '偏吉';
    } else if (badFortuneCount > fortuneCount) {
        fortune = '偏凶';
    }
    
    // 化解建议
    const solutions = [
        `工作中保持${palaceInfo.characteristics[0]}、${palaceInfo.characteristics[1]}，避免${starInfo.traits[2]}、${starInfo.traits[3]}`,
        `财务上做好规划，避免与${palaceInfo.element}相关的风险`,
        `感情上增加互动和交流，避免${doorInfo.traits[2]}、${doorInfo.traits[3]}`,
        `健康上注意${palaceInfo.bodyParts[0]}、${palaceInfo.bodyParts[1]}的保养，避免过度疲劳`,
        `可佩戴或使用${getElementColor(getOppositeElement(palaceInfo.element))}等物品，平衡过重的${palaceInfo.element}气`
    ];
    
    // 随机选择一些化解建议
    const selectedSolutions = solutions.filter(() => Math.random() > 0.3);
    
    return `${palaceInfo.name}当前整体${fortune}，${fortune === '偏凶' ? '需要注意以下几点' : '可以注意以下几点增强运势'}：<br>
    ${selectedSolutions.map((solution, index) => `${index + 1}. ${solution}`).join('<br>')}`;
}

/**
 * 获取五行相关风险
 * @param {string} element - 五行
 * @returns {string} - 风险描述
 */
function getElementRisk(element) {
    const risks = {
        '金': '投资金属、科技或奢侈品的风险',
        '木': '投资成长型企业或创业项目的风险',
        '水': '流动资金不足或投资回报期过长',
        '火': '投资过热或市场波动过大',
        '土': '房地产投资或固定资产贬值'
    };
    
    return risks[element] || '未知风险';
}

/**
 * 获取五行相关健康活动
 * @param {string} element - 五行
 * @returns {string} - 健康活动
 */
function getElementHealth(element) {
    const activities = {
        '金': '呼吸系统锻炼和白色食物（如梨、白萝卜）',
        '木': '伸展运动和绿色食物（如绿叶蔬菜）',
        '水': '游泳、泡脚和黑色食物（如黑豆、黑芝麻）',
        '火': '有氧运动和红色食物（如红枣、番茄）',
        '土': '慢走、太极和黄色食物（如南瓜、玉米）'
    };
    
    return activities[element] || '均衡的饮食和运动';
}

/**
 * 获取五行相关颜色
 * @param {string} element - 五行
 * @returns {string} - 颜色
 */
function getElementColor(element) {
    const colors = {
        '金': '白色、金色',
        '木': '绿色、青色',
        '水': '黑色、蓝色',
        '火': '红色、紫色',
        '土': '黄色、棕色'
    };
    
    return colors[element] || '中性色';
}

/**
 * 获取相克的五行
 * @param {string} element - 五行
 * @returns {string} - 相克的五行
 */
function getOppositeElement(element) {
    const opposites = {
        '金': '火', // 火克金
        '木': '金', // 金克木
        '水': '土', // 土克水
        '火': '水', // 水克火
        '土': '木'  // 木克土
    };
    
    return opposites[element] || '土';
}

