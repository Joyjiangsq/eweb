import { getLevelThreeTypeByName } from "config/codeMap";

let menMap = {
    // 门
    a_datas:[
        "平开门（木门）",
        "移门（木门）",
        "门套（木门）",
        "垭口（木门）",
        "窗套",
        "飘窗板",
        "门套线（木门）",
        "门套板（木门）",
        "哑口板（木门）",
        "遮轮板（木门）",
        "门扇（木门）",
        "平开门（铝框门）",
        "移门（铝框门）",
        "门套（铝框门）",
        "门套线（铝框门）",
        "门套板（铝框门）",
        "哑口板（铝框门）",
        "遮轮板（铝框门）",
        "门扇（铝框门）"
    ],
    // 五金
    b_datas: [
        "五金",
        "普通门锁",
        "合页",
        "吊轮",
        "吊轨",
        "拉手（门）",
        "门吸"
    ],
    // 智能锁
    c_datas:["智能锁"]
}

let cgMap = {
    // 柜体/门板/配件
    a_datas:[
        "吊柜",
        "地柜",
        "高柜",
        "半高柜",
        "柜门",
        "板件",
        "顶线",
        "灯线",
        "罗马柱",
        "木框玻璃门",
        "上翻门"
    ],
    // 台面
    b_datas:["台面"],
    // 五金/厨电/水槽龙头
    c_datas:[
        "拉手（厨柜）",
        "铰链",
        "抽屉轨道",
        "踢脚线",
        "拉篮",
        "烟机",
        "灶台",
        "消毒柜",
        "热水器",
        "水槽",
        "龙头"
    ]
}

for(let i in menMap) { menMap[i] = menMap[i].map((one) => getLevelThreeTypeByName(one));}
for(let i in cgMap) { cgMap[i] = cgMap[i].map((one) => getLevelThreeTypeByName(one));}

let typeMap = {
    "chugui": cgMap,
    "men": menMap
}
export const specFun = function(datas, type){
    let res = {a:[],b:[],c:[]};
    if(!datas || datas.length == 0) return res;
    // 门  厨柜
    let depData = typeMap[type];
    for(let i =0; i < datas.length; i++) {
        let one = datas[i];
        if(depData.a_datas.indexOf(one.Code) != -1) {res.a.push(one); continue;}
        if(depData.b_datas.indexOf(one.Code) != -1) {res.b.push(one); continue;}
        if(depData.c_datas.indexOf(one.Code) != -1) res.c.push(one); 
    }
    return res
}

export const specSetOne = function(one, type, a,b,c) {
    let depData = typeMap[type];
    console.log(depData);
    if(depData.a_datas.indexOf(one.Code) != -1) a.push(one)
    else if(depData.b_datas.indexOf(one.Code) != -1) b.push(one)
    else if(depData.c_datas.indexOf(one.Code) != -1) c.push(one);
}

// 
export const getType = function(one, type) {
    let depData = typeMap[type];
    if(depData.a_datas.indexOf(one.Code) != -1) return "a"
    else if(depData.b_datas.indexOf(one.Code) != -1) return "b"
    else if(depData.c_datas.indexOf(one.Code) != -1) return "c"
}