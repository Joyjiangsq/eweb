/**
 * let actionMps = [
    {action:"a_number", msg:"", value:""} // 验证只填写数字
    {action:"a_greater", msg:""} // 验证大于0
    {action:"a_must", msg:""} // 验证必须填写

    {action:"a_greater_one", value:"", msg:""} // 验证必须大于某个值  value为该值
    {action:"a_less_one", value:"", msg:""} // 验证必须小于某个值  value为该值
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
    return true;
}
// 验证只填写数字
let getIsNumber = function(scope, one){
    if(isNaN(one.value)) return exepFun(scope, one.msg || "填写不正确")
    else 
}

export default actionFun = function (scope, actions){
    let res = true;
    // 只要有一个false 就直接return
    for(let i =0; i < actions.length; i++) {
        let one = actions[i];
        if(one.action == "a_number") {
            if
        }
    }

    return res
}