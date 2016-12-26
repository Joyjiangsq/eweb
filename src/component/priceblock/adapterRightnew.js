export default function adapter(d) {
    console.log("--------------------")
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

    if(d.type == "gxh" && !d["project_name"].defCss) d["project_name"] = {    
        def: d["project_name"] || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
           return resetFun(this)
        }
    };

    if(d.type == "gxh" && !d.description.defCss) d.description = {    
        def: d.description || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
           return resetFun(this)
        }
    };

   
    if(d.type == "gxh" && !d.selling_price.defCss) d.selling_price = {    
        def: d.selling_price || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
           if(isNaN(this.def)) return exepFun(this, "请填写正确的单价");
           else if(this.def*1 == 0 || !this.def) return  exepFun(this, "单价填写不正确");
           else {
               d.price = this.def*1*d.counts.def;
               console.log(d);
               return resetFun(this)
           }
        }
    };

    if(!d.counts && d.counts != 0) d.counts = 0;
    if(!d.counts.defCss) d.counts = {    
        def: d.counts || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
           if(isNaN(this.def)) return exepFun(this, "请填写正确的数量");
           else if(this.def*1 == 0) return  exepFun(this, "数量不能为0");
           else {
               if(d.selling_price.def && d.selling_price.def != 0) data.price = this.def*1*d.selling_price.def;
               else data.price = this.def*1*d.selling_price;
               console.log(d);
               return resetFun(this)
           }
        }
    };
    if(!d.remark && d.remark != 0) d.remark = 0;
    if(!d.remark.defCss) d.remark = {    
        def: d.remark || "",
        defCss: "default",
        errorMsg:"",
        tb_disabled: (d.ItemCode || d.project_name)?false:true,
        validateFun:function(data, index){
            return true
        }
    }
    return d;
}
