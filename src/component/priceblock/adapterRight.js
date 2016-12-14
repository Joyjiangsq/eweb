export default function adapter(d, open) {
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
    if(!open) {
        d.diff_price = {    
            def: d.diff_price || 0,
            defCss: "default",
            tb_disabled: true,
            errorMsg:"",
            validateFun:function(data, index){
            if(isNaN(this.def)) return exepFun(this, "请填写正确的差价");
            if(!this.def && this.def != 0)  return exepFun(this, "请填写正确的差价");
            else return resetFun(this)
            }
        };

        d.counts = {    
            def: d.counts || "",
            defCss: "default",
            errorMsg:"",
            tb_disabled: true,
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
            tb_disabled: true,
            validateFun:function(data, index){
                return true
            }
        };
    }
    else {
        d.diff_price.tb_disabled = false;
         d.counts.tb_disabled = false;
          d.remark.tb_disabled = false;
    }
    return d;
}
