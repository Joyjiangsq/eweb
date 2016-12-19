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
    d.diff_price = {    
        def: d.diff_price || "",
        defCss: "default",
        tb_disabled: d.ItemCode?false:true,
        errorMsg:"",
        validateFun:function(data, index){
           if(isNaN(this.def)) return exepFun(this, "请填写正确的差价");
           else return resetFun(this)
        }
    };

    d.counts = {    
        def: d.counts || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: d.ItemCode?false:true,
        validateFun:function(data, index){
           if(isNaN(this.def)) return exepFun(this, "请填写正确的数量");
           else if(this.def*1 == 0) return  exepFun(this, "数量不能为0");
           else return resetFun(this)
        }
    };
    d.remark = {    
        def: d.remark || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: d.ItemCode?false:true,
        validateFun:function(data, index){
            return true
        }
    }
    return d;
}
