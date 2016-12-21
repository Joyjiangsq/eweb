export default function adapter(d) {
    if(d.code == "gxh" || d.code == "zx") return d;
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
      d.name = {    
          def: d.name || "",
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
             if(!this.def) return exepFun(this, "必须填写")
             else return resetFun(this)
          }
      };

      return d;
}
