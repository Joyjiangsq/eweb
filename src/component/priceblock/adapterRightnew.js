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

    if(!d["project_name"]) d["project_name"] = "";
    d["project_name"] = {    
        def: d["project_name"] || d["project_name"].def || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
            console.log(data);
           if(isNaN(this.def)) return exepFun(this, "请填写正确的数量");
           else if(this.def*1 == 0) return  exepFun(this, "数量不能为0");
           else return resetFun(this)
        }
    };

    if(!d.description) d.description = "";
    d.description = {    
        def: d.description || d.description.def || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
            console.log(data);
           if(isNaN(this.def)) return exepFun(this, "请填写正确的数量");
           else if(this.def*1 == 0) return  exepFun(this, "数量不能为0");
           else return resetFun(this)
        }
    };

    if(!d.selling_price) d.selling_price = "";
    d.selling_price = {    
        def: d.selling_price || d.selling_price.def || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
            console.log(data);
           if(isNaN(this.def)) return exepFun(this, "请填写正确的数量");
           else if(this.def*1 == 0) return  exepFun(this, "数量不能为0");
           else return resetFun(this)
        }
    };

    if(!d.counts) d.counts = "";
    d.counts = {    
        def: d.counts || d.counts.def || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
            console.log(data);
           if(isNaN(this.def)) return exepFun(this, "请填写正确的数量");
           else if(this.def*1 == 0) return  exepFun(this, "数量不能为0");
           else return resetFun(this)
        }
    };
    if(!d.remark) d.remark = "";
    d.remark = {    
        def: d.remark || d.remark.def || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
            return true
        }
    }
    return d;
}
