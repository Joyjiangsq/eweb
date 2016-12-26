export default function adapter(d) {
    let exepFun = function(scope, msg){
        scope.defCss = "errorHappend";
        scope.errorMsg = msg;
        return false;
    }
    let resetFun = function(scope){
        scope.defCss = "default";
        scope.errorMsg = "";
        scope.def = scope.def;
        return true;
    }
    if(!d.counts || d.counts == "-") d.counts = 0;
    if(!d.counts.defCss) d.counts = {    
        def: d.counts || 0,
        defCss: "default",
        errorMsg:"",
        tb_disabled: d.ItemCode?false:true,
        validateFun:function(data, index){
            if(this.tb_disabled) return resetFun(this)
            console.log(data);
           if(isNaN(this.def)) return exepFun(this, "请填写正确的数量");
           else if(this.def*1 == 0) return  exepFun(this, "数量不能为0");
           else {
               d.price = this.def*d.self_price*1;
               return resetFun(this)
           }
        }
    };
    if(d.ItemCode) {
        d.counts.tb_disabled = false;
    }

    // if(!d.remark) d.remark = "";
    // d.remark = {    
    //     def: d.remark.def || "",
    //     defCss: "default",
    //     errorMsg:"",
    //     tb_disabled: (d.ItemCode || d.project_name)?false:true,
    //     validateFun:function(data, index){
    //         return true
    //     }
    // }
    console.log(d);
    return d;
}
