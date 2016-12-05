/**动作控制抽象类
 * let actionMps = [
    {action:"a_number", msg:""} // 验证只填写数字
    {action:"a_greater", msg:""} // 验证大于0
    {action:"a_greatere", msg:""} // 验证大于0
    {action:"a_must", msg:""} // 验证必须填写

    {action:"a_int", msg:""} // 验证只能整数

    {action:"a_greater_one", min:"", msg:""} // 验证必须大于某个值  value为该值
    {action:"a_less_one", max:"", msg:""} // 验证必须小于某个值  value为该值
]
 */
let exepFun = function(scope, msg){
    scope.defCss = "errorHappend";
    scope.errorMsg = msg;
    return false;
}
let resetFun = function(scope){
    scope.defCss = "default";
    scope.errorMsg = "";
    scope.def = scope.def*1;
    return true;
}
// 验证只填写数字
let getIsNumber = function(scope, one){
    if(isNaN(scope.def)) return exepFun(scope, one.msg || "填写不正确")
    else return true
}

// 验证大于0
let getIsGreayterZero = function(scope, one){
    if(scope.def*1 <= 0) return exepFun(scope, one.msg || "必须要大于0")
    else return true
}
// 验证大于等于0
let getIsGreayterEZero = function(scope, one){
    if(scope.def*1 < 0) return exepFun(scope, one.msg || "必须要大于等于0")
    else return true
}
// 验证必须填写
let getIsMust = function(scope, one){
    if(scope.def == 0) return true
    if(scope.def == "" || !scope.def) return exepFun(scope, one.msg || "必须填写")
    else return true
}

export default function actionFun(scope, actions, d){
    let res = true;
    console.log(res);
    // 只要有一个false 就直接return
    for(let i =0; i < actions.length; i++) {
        let one = actions[i];
        if(one.action == "a_number") {
             res = getIsNumber(scope, one);
             if(!res) break;
        }
        
        if(one.action == "a_greater") {
             res = getIsGreayterZero(scope, one);
             if(!res) break;
        }

        if(one.action == "a_greatere") {
             res = getIsGreayterEZero(scope, one);
             if(!res) break;
        }

        if(one.action == "a_must") {
             res = getIsMust(scope, one);
             if(!res) break;
        }
    }

    if(res) return resetFun(scope)
    else return false
}