/* ============================================================
   高山流水 · 金句题库（数据结构见技术设计文档 §4.2）
   weights: 每个金句对若干人格卡的权重（+1~+3）
   ============================================================ */
const QUOTES = [
  // ---- 知音 ----
  { id: "q001", text: "相识满天下，知心能几人", author: "《增广贤文》", category: "知音", weights: { boya: 2, zhongziqi: 2 } },
  { id: "q002", text: "高山流水，知音难觅", author: "伯牙子期", category: "知音", weights: { boya: 3, zhongziqi: 1 } },
  { id: "q003", text: "人生得一知己足矣，斯世当以同怀视之", author: "鲁迅", category: "知音", weights: { zhongziqi: 3, lindaiyu: 1 } },
  { id: "q004", text: "海内存知己，天涯若比邻", author: "王勃", category: "知音", weights: { sushi: 2, libai: 1 } },
  { id: "q005", text: "士为知己者死", author: "《战国策》", category: "知音", weights: { mengzi: 2, wangyangming: 2 } },
  // ---- 孤独 ----
  { id: "q006", text: "前不见古人，后不见来者", author: "陈子昂", category: "孤独", weights: { boya: 2, lindaiyu: 2 } },
  { id: "q007", text: "独坐幽篁里，弹琴复长啸", author: "王维", category: "孤独", weights: { wangwei: 3, jikang: 2 } },
  { id: "q008", text: "千山鸟飞绝，万径人踪灭", author: "柳宗元", category: "孤独", weights: { wangwei: 3, boya: 1 } },
  { id: "q009", text: "我本将心向明月，奈何明月照沟渠", author: "高明", category: "孤独", weights: { lindaiyu: 3, zhongziqi: 1 } },
  { id: "q010", text: "举世皆浊我独清，众人皆醉我独醒", author: "屈原", category: "孤独", weights: { boya: 2, mengzi: 1 } },
  // ---- 治愈 ----
  { id: "q011", text: "山重水复疑无路，柳暗花明又一村", author: "陆游", category: "治愈", weights: { sushi: 3, wangyangming: 1 } },
  { id: "q012", text: "莫愁前路无知己，天下谁人不识君", author: "高适", category: "治愈", weights: { sushi: 2, mengzi: 2 } },
  { id: "q013", text: "长风破浪会有时，直挂云帆济沧海", author: "李白", category: "治愈", weights: { libai: 3, sushi: 2 } },
  { id: "q014", text: "万物皆有裂痕，那是光照进来的地方", author: "莱昂纳德·科恩", category: "治愈", weights: { sushi: 2, lindaiyu: 2 } },
  { id: "q015", text: "世界以痛吻我，我要报之以歌", author: "泰戈尔", category: "治愈", weights: { sushi: 2, wangyangming: 2 } },
  // ---- 成长 ----
  { id: "q016", text: "知人者智，自知者明", author: "老子", category: "成长", weights: { laozi: 3, wangyangming: 2 } },
  { id: "q017", text: "路漫漫其修远兮，吾将上下而求索", author: "屈原", category: "成长", weights: { wangyangming: 3, mengzi: 2 } },
  { id: "q018", text: "不积跬步，无以至千里", author: "荀子", category: "成长", weights: { wangyangming: 3, taoyuanming: 1 } },
  { id: "q019", text: "学而不思则罔，思而不学则殆", author: "孔子", category: "成长", weights: { kongzi: 3, wangyangming: 1 } },
  { id: "q020", text: "博学之，审问之，慎思之，明辨之，笃行之", author: "《中庸》", category: "成长", weights: { kongzi: 3, wangyangming: 2 } },
  // ---- 自由 ----
  { id: "q021", text: "逍遥于天地之间，而心意自得", author: "庄子", category: "自由", weights: { zhuangzi: 3, jikang: 2 } },
  { id: "q022", text: "大鹏一日同风起，扶摇直上九万里", author: "李白", category: "自由", weights: { libai: 3, zhuangzi: 2 } },
  { id: "q023", text: "采菊东篱下，悠然见南山", author: "陶渊明", category: "自由", weights: { taoyuanming: 3, wangwei: 2 } },
  { id: "q024", text: "竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生", author: "苏轼", category: "自由", weights: { sushi: 3, zhuangzi: 1 } },
  { id: "q025", text: "人生在世不称意，明朝散发弄扁舟", author: "李白", category: "自由", weights: { libai: 3, zhuangzi: 2 } },
  { id: "q026", text: "不自由，毋宁死", author: "帕特里克·亨利", category: "自由", weights: { jikang: 3, zhuangzi: 2 } },
  { id: "q027", text: "生命诚可贵，爱情价更高；若为自由故，两者皆可抛", author: "裴多菲", category: "自由", weights: { jikang: 3, zhuangzi: 2 } },
  // ---- 热爱 ----
  { id: "q028", text: "生活明朗，万物可爱", author: "现代", category: "热爱", weights: { sushi: 2, libai: 2 } },
  { id: "q029", text: "热爱可抵岁月漫长", author: "现代", category: "热爱", weights: { sushi: 2, xinqiji: 2 } },
  { id: "q030", text: "众里寻他千百度，蓦然回首，那人却在灯火阑珊处", author: "辛弃疾", category: "热爱", weights: { xinqiji: 3, zhongziqi: 2 } },
  { id: "q031", text: "醉里挑灯看剑，梦回吹角连营", author: "辛弃疾", category: "热爱", weights: { xinqiji: 3, mengzi: 2 } },
  { id: "q032", text: "我见青山多妩媚，料青山见我应如是", author: "辛弃疾", category: "热爱", weights: { xinqiji: 3, zhuangzi: 2 } },
  { id: "q033", text: "心有猛虎，细嗅蔷薇", author: "西格里夫·萨松", category: "热爱", weights: { xinqiji: 3, lindaiyu: 1 } },
  { id: "q034", text: "此情可待成追忆，只是当时已惘然", author: "李商隐", category: "热爱", weights: { lindaiyu: 3, zhongziqi: 1 } },
  { id: "q035", text: "问世间情为何物，直教人生死相许", author: "元好问", category: "热爱", weights: { lindaiyu: 3, zhongziqi: 2 } },
  { id: "q036", text: "两情若是久长时，又岂在朝朝暮暮", author: "秦观", category: "热爱", weights: { zhongziqi: 3, lindaiyu: 2 } },
  { id: "q037", text: "苔花如米小，也学牡丹开", author: "袁枚", category: "热爱", weights: { taoyuanming: 2, mengzi: 2 } },
  { id: "q038", text: "天下兴亡，匹夫有责", author: "顾炎武", category: "热爱", weights: { mengzi: 3, wangyangming: 2 } },
  // ---- 成长（隐藏人格彩蛋） ----
  { id: "q039", text: "上善若水，水善利万物而不争", author: "老子", category: "成长", weights: { laozi: 3, zhuangzi: 2 } },
  { id: "q040", text: "三人行，必有我师焉", author: "孔子", category: "成长", weights: { kongzi: 3, taoyuanming: 1 } },
  // ---- 知音 ----
  { id: "q041", text: "同是天涯沦落人，相逢何必曾相识", author: "白居易", category: "知音", weights: { zhongziqi: 3, lindaiyu: 2 } },
  { id: "q042", text: "千金易得，知音难求", author: "民间谚语", category: "知音", weights: { boya: 3, zhongziqi: 2 } },
  { id: "q043", text: "知音少，弦断有谁听", author: "岳飞", category: "知音", weights: { boya: 2, zhongziqi: 3 } },
  { id: "q044", text: "山河不足重，重在遇知己", author: "鲍溶", category: "知音", weights: { zhongziqi: 3, libai: 1, boya: 1 } },
  // ---- 孤独 ----
  { id: "q045", text: "孤舟蓑笠翁，独钓寒江雪", author: "柳宗元", category: "孤独", weights: { wangwei: 3, taoyuanming: 2 } },
  { id: "q046", text: "今夜月明人尽望，不知秋思落谁家", author: "王建", category: "孤独", weights: { lindaiyu: 3, wangwei: 2 } },
  { id: "q047", text: "热闹是他们的，我什么也没有", author: "朱自清", category: "孤独", weights: { lindaiyu: 3, wangwei: 2 } },
  // ---- 治愈 ----
  { id: "q048", text: "凡是过往，皆为序章", author: "莎士比亚", category: "治愈", weights: { sushi: 3, wangyangming: 1 } },
  { id: "q049", text: "黑夜给了我黑色的眼睛，我却用它寻找光明", author: "顾城", category: "治愈", weights: { wangyangming: 3, mengzi: 2 } },
  { id: "q050", text: "即使身处阴沟，也要仰望星空", author: "王尔德", category: "治愈", weights: { sushi: 3, lindaiyu: 1 } },
  { id: "q051", text: "没有一个冬天不可逾越，没有一个春天不会来临", author: "现代", category: "治愈", weights: { sushi: 3, mengzi: 2 } },
  // ---- 成长 ----
  { id: "q052", text: "尽吾志也而不能至者，可以无悔矣", author: "王安石", category: "成长", weights: { wangyangming: 3, mengzi: 2 } },
  { id: "q053", text: "吾生也有涯，而知也无涯", author: "庄子", category: "成长", weights: { zhuangzi: 3, wangyangming: 2 } },
  { id: "q054", text: "凡是杀不死我的，必使我更强大", author: "尼采", category: "成长", weights: { wangyangming: 3, jikang: 2 } },
  { id: "q055", text: "合抱之木，生于毫末；九层之台，起于累土", author: "老子", category: "成长", weights: { laozi: 3, wangyangming: 2 } },
  { id: "q056", text: "宝剑锋从磨砺出，梅花香自苦寒来", author: "《警世贤文》", category: "成长", weights: { wangyangming: 3, mengzi: 2 } },
  // ---- 自由 ----
  { id: "q057", text: "非淡泊无以明志，非宁静无以致远", author: "诸葛亮", category: "自由", weights: { wangwei: 3, taoyuanming: 2 } },
  { id: "q058", text: "宠辱不惊，看庭前花开花落；去留无意，望天上云卷云舒", author: "洪应明", category: "自由", weights: { zhuangzi: 3, taoyuanming: 2 } },
  { id: "q059", text: "海阔凭鱼跃，天高任鸟飞", author: "阮阅", category: "自由", weights: { libai: 3, zhuangzi: 2 } },
  // ---- 热爱 ----
  { id: "q060", text: "愿你的生命中有足够多的云翳，来造成一个美丽的黄昏", author: "冰心", category: "热爱", weights: { libai: 3, lindaiyu: 1 } },
  { id: "q061", text: "草木有本心，何求美人折", author: "张九龄", category: "热爱", weights: { taoyuanming: 3, zhuangzi: 2 } },
  { id: "q062", text: "一花一世界，一叶一菩提", author: "《华严经》", category: "热爱", weights: { zhuangzi: 3, wangwei: 2 } },
  // ---- 释怀 ----
  { id: "q063", text: "弃我去者，昨日之日不可留；乱我心者，今日之日多烦忧", author: "李白", category: "释怀", weights: { libai: 3, zhuangzi: 2 } },
  { id: "q064", text: "回首向来萧瑟处，归去，也无风雨也无晴", author: "苏轼", category: "释怀", weights: { sushi: 3, zhuangzi: 2 } },
  { id: "q065", text: "此心安处是吾乡", author: "苏轼", category: "释怀", weights: { sushi: 3, taoyuanming: 2 } },
  { id: "q066", text: "悟已往之不谏，知来者之可追", author: "陶渊明", category: "释怀", weights: { taoyuanming: 3, sushi: 2 } },
  { id: "q067", text: "若无闲事挂心头，便是人间好时节", author: "无门慧开", category: "释怀", weights: { taoyuanming: 3, wangwei: 2 } },
  { id: "q068", text: "不如意事常八九，可与人言无二三", author: "方岳", category: "释怀", weights: { sushi: 3, lindaiyu: 2 } },
  { id: "q069", text: "不要为打翻的牛奶哭泣", author: "西方谚语", category: "释怀", weights: { sushi: 2, zhuangzi: 2 } },
  { id: "q070", text: "不必太纠结于当下，也不必太忧虑未来", author: "村上春树", category: "释怀", weights: { sushi: 3, taoyuanming: 2 } },
  { id: "q071", text: "只要想起一生中后悔的事，梅花便落了下来", author: "张枣", category: "释怀", weights: { lindaiyu: 3, wangwei: 2 } },
  // ---- 哲思 ----
  { id: "q072", text: "凡所有相，皆是虚妄", author: "《金刚经》", category: "哲思", weights: { zhuangzi: 3, wangwei: 2 } },
  { id: "q073", text: "塞翁失马，焉知非福", author: "《淮南子》", category: "哲思", weights: { sushi: 3, zhuangzi: 2 } },
  { id: "q074", text: "看山是山，看山不是山，看山还是山", author: "青原惟信禅师", category: "哲思", weights: { zhuangzi: 3, wangwei: 2 } },
  { id: "q075", text: "你站在桥上看风景，看风景的人在楼上看你", author: "卞之琳", category: "哲思", weights: { zhuangzi: 2, lindaiyu: 2 } },
  { id: "q076", text: "他人即地狱", author: "萨特", category: "哲思", weights: { jikang: 3, lindaiyu: 2 } },
  { id: "q077", text: "菩提本无树，明镜亦非台", author: "六祖慧能", category: "哲思", weights: { zhuangzi: 3, wangwei: 2 } },
  { id: "q078", text: "人类一思考，上帝就发笑", author: "米兰·昆德拉", category: "哲思", weights: { zhuangzi: 3, sushi: 1 } },
  { id: "q079", text: "吾爱吾师，吾更爱真理", author: "亚里士多德", category: "哲思", weights: { wangyangming: 3, mengzi: 2 } },
  // ---- 深情 ----
  { id: "q080", text: "山有木兮木有枝，心悦君兮君不知", author: "《越人歌》", category: "深情", weights: { lindaiyu: 3, zhongziqi: 2 } },
  { id: "q081", text: "曾经沧海难为水，除却巫山不是云", author: "元稹", category: "深情", weights: { lindaiyu: 3, zhongziqi: 2 } },
  { id: "q082", text: "玲珑骰子安红豆，入骨相思知不知", author: "温庭筠", category: "深情", weights: { lindaiyu: 3, xinqiji: 1, zhongziqi: 1 } },
  { id: "q083", text: "衣带渐宽终不悔，为伊消得人憔悴", author: "柳永", category: "深情", weights: { lindaiyu: 3, xinqiji: 2 } },
  { id: "q084", text: "金风玉露一相逢，便胜却人间无数", author: "秦观", category: "深情", weights: { zhongziqi: 3, lindaiyu: 2, xinqiji: 1 } },
  { id: "q085", text: "愿我如星君如月，夜夜流光相皎洁", author: "范成大", category: "深情", weights: { zhongziqi: 3, lindaiyu: 2 } },
  { id: "q086", text: "我行过许多地方的桥，看过许多次数的云……却只爱过一个正当最好年龄的人", author: "沈从文", category: "深情", weights: { zhongziqi: 3, lindaiyu: 2 } },
  { id: "q087", text: "月色与雪色之间，你是第三种绝色", author: "余光中", category: "深情", weights: { libai: 3, lindaiyu: 2 } },
  // ---- 勇气 ----
  { id: "q088", text: "明知山有虎，偏向虎山行", author: "民间谚语", category: "勇气", weights: { mengzi: 3, xinqiji: 2 } },
  { id: "q089", text: "虽千万人，吾往矣", author: "《孟子》", category: "勇气", weights: { mengzi: 3, wangyangming: 2 } },
  { id: "q090", text: "真的猛士，敢于直面惨淡的人生，敢于正视淋漓的鲜血", author: "鲁迅", category: "勇气", weights: { mengzi: 3, wangyangming: 2 } },
  { id: "q091", text: "纵有疾风起，人生不言弃", author: "宫崎骏", category: "勇气", weights: { wangyangming: 3, mengzi: 2 } },
  { id: "q092", text: "世界上只有一种真正的英雄主义，那就是认清生活的真相之后依然热爱生活", author: "罗曼·罗兰", category: "勇气", weights: { sushi: 3, mengzi: 2 } },
  { id: "q093", text: "人生能有几回搏，此时不搏更待何时", author: "容国团", category: "勇气", weights: { mengzi: 3, xinqiji: 2 } },
  // ---- 时间 ----
  { id: "q094", text: "逝者如斯夫，不舍昼夜", author: "孔子", category: "时间", weights: { kongzi: 3, wangyangming: 2 } },
  { id: "q095", text: "盛年不重来，一日难再晨", author: "陶渊明", category: "时间", weights: { taoyuanming: 3, wangyangming: 2 } },
  { id: "q096", text: "少壮不努力，老大徒伤悲", author: "《长歌行》", category: "时间", weights: { wangyangming: 3, mengzi: 2 } },
  { id: "q097", text: "流光容易把人抛，红了樱桃，绿了芭蕉", author: "蒋捷", category: "时间", weights: { lindaiyu: 3, wangwei: 2 } },
  { id: "q098", text: "岁月不饶人，我亦未曾饶过岁月", author: "木心", category: "时间", weights: { sushi: 3, jikang: 2 } },
  { id: "q099", text: "君不见，黄河之水天上来，奔流到海不复回", author: "李白", category: "时间", weights: { libai: 3, sushi: 1 } },
  // ---- 自我 ----
  { id: "q100", text: "我就是我，是颜色不一样的烟火", author: "张国荣", category: "自我", weights: { libai: 3, lindaiyu: 2 } },
  { id: "q101", text: "做你自己，因为别人都有人做了", author: "王尔德", category: "自我", weights: { zhuangzi: 3, jikang: 2 } },
  { id: "q102", text: "认识你自己", author: "苏格拉底", category: "自我", weights: { wangyangming: 3, zhuangzi: 2 } },
  { id: "q103", text: "我与我周旋久，宁作我", author: "《世说新语》", category: "自我", weights: { jikang: 3, zhuangzi: 2 } },
  { id: "q104", text: "不是所有的鱼，都会生活在同一片海里", author: "村上春树", category: "自我", weights: { zhuangzi: 3, lindaiyu: 2 } },
  { id: "q105", text: "如果有来生，要做一棵树，站成永恒", author: "三毛", category: "自我", weights: { taoyuanming: 3, zhuangzi: 2 } }
];

if (typeof module !== "undefined") module.exports = { QUOTES };
