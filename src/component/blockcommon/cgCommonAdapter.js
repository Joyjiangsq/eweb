import {getLevelThreeTypeByName} from "config/codeMap";
export default function adapterData(d) {
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

      let propertyNameArray = [
        {keyName:"U_HandleCodes", defValue:d.U_HandleCodes || []},            // 门把手产品数组  我和node层定义的
        {keyName:"U_FModeling", defValue:d.U_FModeling || "DM-008-直边"},     // 前沿造型 DM-008-直边、  DM-002-罗马边
        {keyName:"U_GSMe", defValue:d.U_GSMe || "天燃气"},                   // 气源方式      液化气  天燃气
        {keyName:"U_BasinT", defValue:d.U_BasinT || "台上工艺"},              // 台盆工艺  台上工艺、台下工艺
        {keyName:"U_HandleName", defValue:d.U_HandleName || ""},             // 把手型号文本描述  我和node层定义
        {keyName:"U_PSWide", defValue:d.U_PSWide || ""},                     // 宽度
        {keyName:"U_PSHigh", defValue:d.U_PSHigh || ""},                     // 高度
        {keyName:"U_PSDeep", defValue:d.U_PSDeep || ""},                     // 进深
        {keyName:"U_TableB", defValue:d.U_TableB || ""},                     // 台面进深
        {keyName:"U_HeightWR", defValue:d.U_HeightWR || ""},                 // 挡水高度
        {keyName:"U_ASWide", defValue:d.U_ASWide || ""},                     // 包管展开宽
        {keyName:"U_ASDeep", defValue:d.U_ASDeep || ""}                     // 包管展开深
      ]

      // 初始化参数属性
      for (var i = 0; i < propertyNameArray.length; i++) {
            let item = propertyNameArray[i];
            d[item.keyName] = {
                def: item.defValue,
                defCss: "default",
                errorMsg:"",tb_disabled: false,
                validateFun:function(data, index){
                     return true;
                }
            }
      }
      // 重新设置特殊参数属性
      // 前沿造型   下拉组件 默认 、、 DM-008-直边、  DM-002-罗马边
      d.U_FModeling.validateFun = function(data, index){
           if(d.sale_counts && d.sale_counts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
                if(!this.def || this.def == "")  return exepFun(this, "必须选择前沿造型")
                else  return resetFun(this)
           }
           else if(d.U_Pquantity && d.U_Pquantity.def > 0) { // 如果填写了采购数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
                if(!this.def || this.def == "")  return exepFun(this, "必须选择前沿造型")
                else  return resetFun(this)
           }
           else return resetFun(this)
      }
      // 台盆工艺   下拉组件 默认  台上工艺、台下工艺
      d.U_BasinT.validateFun = function(data, index){
          if(d.sale_counts && d.sale_counts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
               if(!this.def || this.def == "") return exepFun(this, "必须选择台盆工艺")
               else  return resetFun(this)
          }
          else if(d.U_Pquantity && d.U_Pquantity.def > 0) {    
               if(!this.def || this.def == "") return exepFun(this, "必须选择台盆工艺")
               else  return resetFun(this)
          }
          else  return resetFun(this)
      }
      //U_HandleName TODO
      let bav = [getLevelThreeTypeByName("柜门")];
      // 把手型号   下拉组件 默认 、、
      d.U_HandleName.validateFun = function(data, index){
          if(bav.indexOf(d.Code) != -1) {
              if(!this.def || this.def == "")  return exepFun(this, "把手型号必填")
              else  return resetFun(this)
          }
          else  return resetFun(this)
      }
      // 宽度（mm）   文本输入   个性化宽度 最小值 U_PSWideMin  个性化宽度最大值 U_PSWideMax
      d.U_PSWide.validateFun = function(data, index){
          if(!this.def || this.def == "" || this.def == 0) return exepFun(this, "宽度必须填写")
          else if(isNaN(this.def)) return exepFun(this, "宽度填写不正确")
          else if(this.def*1 < 0)  return exepFun(this, "宽度必须大于0")
          else if(this.def*1 < d.U_PSWideMin) return exepFun(this, "宽度不小于" + d.U_PSWideMin)
          else if(this.def*1 > d.U_PSWideMax) return exepFun(this, "宽度不大于" + d.U_PSWideMax)
          else  return resetFun(this)
      }
      // 高度（mm）   文本输入  个性化高度最小值 U_PSHighMin  个性化高度最大值 U_PSHighMax
      d.U_PSHigh.validateFun = function(data, index){
          if(!this.def || this.def == "" || this.def == 0) return exepFun(this, "高度必须填写")
          else if(isNaN(this.def)) return exepFun(this, "高度填写不正确")
          else if(this.def*1 < 0)  return exepFun(this, "高度必须大于0")
          else if(this.def*1 < d.U_PSHighMin) return exepFun(this, "高度不小于" + d.U_PSHighMin)
          else if(this.def*1 > d.U_PSHighMax) return exepFun(this, "高度不大于" + d.U_PSHighMax)
          else  return resetFun(this)
      }
      // 进深   文本输入   个性化深最小值 U_PSDeepMin   个性化深最大值 U_PSDeepMax
      d.U_PSDeep.validateFun = function(data, index){
         if(!this.def || this.def == "")  return exepFun(this, "必须填写进深")
         else if(isNaN(this.def)) return exepFun(this, "进深填写不正确")
         else if(this.def*1 < 0)  return exepFun(this, "进深必须大于0")
         else if(this.def*1 < d.U_PSDeepMin) return exepFun(this, "进深不能小于" + d.U_PSDeepMin)
         else if(this.def*1 > d.U_PSDeepMax)  return exepFun(this, "进深不能大于" + d.U_PSDeepMax)
         else return resetFun(this)
      }
      // 台面进深（mm）   文本输入 个性化深最小值 U_PSDeepMin   个性化深最大值 U_PSDeepMax
      d.U_TableB.validateFun = function(data, index){
          if(d.sale_counts && d.sale_counts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
               if(!this.def || this.def == "")  return exepFun(this, "必须填写台面进深")
               else if(isNaN(this.def)) return exepFun(this, "台面进深填写不正确")
               else if(this.def*1 < 0)  return exepFun(this, "台面进深必须大于0")
               else if(this.def*1 < d.U_PSDeepMin) return exepFun(this, "台面进深不能小于" + d.U_PSDeepMin)
               else if(this.def*1 > d.U_PSDeepMax)  return exepFun(this, "台面进深不能大于" + d.U_PSDeepMax)
               else return resetFun(this)
          }
          else if(d.U_Pquantity && d.U_Pquantity.def > 0) {
               if(!this.def || this.def == "")  return exepFun(this, "必须填写台面进深")
               else if(isNaN(this.def)) return exepFun(this, "台面进深填写不正确")
               else if(this.def*1 < 0)  return exepFun(this, "台面进深必须大于0")
               else if(this.def*1 < d.U_PSDeepMin) return exepFun(this, "台面进深不能小于" + d.U_PSDeepMin)
               else if(this.def*1 > d.U_PSDeepMax)  return exepFun(this, "台面进深不能大于" + d.U_PSDeepMax)
               else return resetFun(this)
          }
          else return resetFun(this)
      }
      // 挡水高度（mm）   文本输入   个性化高最小值 U_PSHighMin   个性化高最大值 U_PSHighMax
      d.U_HeightWR.validateFun =function(data, index){
          if(d.sale_counts && d.sale_counts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
               if(!this.def || this.def == "") return exepFun(this, "必须填写挡水高度")
               else if(isNaN(this.def)) return exepFun(this, "挡水高度填写不正确")
               else if(this.def*1 < 0)  return exepFun(this, "挡水高度必须大于0")
               else if(this.def*1 < d.U_PSHighMin) return exepFun(this, "挡水高度不能小于" + d.U_PSHighMin)
               else if(this.def*1 > d.U_PSHighMax)  return exepFun(this, "挡水高度不能大于" + d.U_PSHighMax)
               else return resetFun(this)
          }
          else if(d.U_Pquantity && d.U_Pquantity.def > 0) {
               if(!this.def || this.def == "") return exepFun(this, "必须填写挡水高度")
               else if(isNaN(this.def)) return exepFun(this, "挡水高度填写不正确")
               else if(this.def*1 < 0)  return exepFun(this, "挡水高度必须大于0")
               else if(this.def*1 < d.U_PSHighMin) return exepFun(this, "挡水高度不能小于" + d.U_PSHighMin)
               else if(this.def*1 > d.U_PSHighMax)  return exepFun(this, "挡水高度不能大于" + d.U_PSHighMax)
               else return resetFun(this)
          }
          else return resetFun(this)
      }
      // 如果销售数量存在  则忽略此项验证  否则开启验证
      // 包管展开宽（mm）   文本输入  包管宽最小值 U_AWideMin
      d.U_ASWide.validateFun = function(data, index){
          if(d.sale_counts) {
            if(d.sale_counts.def*1 == 0 || !d.sale_counts.def) {
                if(!this.def || this.def == "") return exepFun(this, "必须填写包管宽度")
                else if(isNaN(this.def)) return exepFun(this, "包管宽填写不正确")
                else if(this.def*1 < 0)  return exepFun(this, "包管宽必须大于0")
                else if(this.def*1 < d.U_AWideMin) return exepFun(this, "包管宽不能小于" + d.U_AWideMin)
                else return resetFun(this)
            }
            else return resetFun(this)
          }
          else if(d.U_Pquantity) {
            if(d.U_Pquantity.def*1 == 0 || !d.U_Pquantity.def) {
                if(!this.def || this.def == "") return exepFun(this, "必须填写包管宽度")
                else if(isNaN(this.def)) return exepFun(this, "包管宽填写不正确")
                else if(this.def*1 < 0)  return exepFun(this, "包管宽必须大于0")
                else if(this.def*1 < d.U_AWideMin) return exepFun(this, "包管宽不能小于" + d.U_AWideMin)
                else return resetFun(this)
            }
            else return resetFun(this)
          }
          else return resetFun(this)
      }
      // 包管展开深（mm）   文本输入 包管高 最小值 U_AHighMin
      d.U_ASDeep.validateFun =function(data, index){
          if(d.sale_counts) {
            if(d.sale_counts.def*1 == 0 || !d.sale_counts.def) {
                if(!this.def || this.def == "") return exepFun(this, "必须填写包管高度")
                else if(isNaN(this.def)) return exepFun(this, "包管高填写不正确")
                else if(this.def*1 < 0)  return exepFun(this, "包管高必须大于0")
                else if(this.def*1 < d.U_AWideMin) return exepFun(this, "包管高不能小于" + d.U_AHighMin)
                else return resetFun(this)
            }
            else return resetFun(this)
          }
          else if(d.U_Pquantity) {
            if(d.U_Pquantity.def*1 == 0 || !d.U_Pquantity.def) {
                if(!this.def || this.def == "") return exepFun(this, "必须填写包管高度")
                else if(isNaN(this.def)) return exepFun(this, "包管高填写不正确")
                else if(this.def*1 < 0)  return exepFun(this, "包管高必须大于0")
                else if(this.def*1 < d.U_AWideMin) return exepFun(this, "包管高不能小于" + d.U_AHighMin)
                else return resetFun(this)
            }
            else return resetFun(this)
          }
          else return resetFun(this)
      }
      // 设置验证参数规则
     // 延米（m）/销售数量
     if(d.sale_counts) d.sale_counts.validateFun = function(data, index){
          if(isNaN(this.def)) return exepFun(this, "延米填写错误")
          else if(this.def < 0) return exepFun(this, "延米必须大于0")
          else if(d.Code != getLevelThreeTypeByName("台面")) {
              if(this.def ==0 || this.def == "" || !this.def) return exepFun(this, "延米必须填写")
              else  return resetFun(this)
          }
          else return resetFun(this)
      }
      // 采购数量
     if(d.U_Pquantity) d.U_Pquantity.validateFun = function(data, index){
          if(isNaN(this.def)) return exepFun(this, "延米填写错误")
          else if(this.def < 0) return exepFun(this, "延米必须大于0")
          else if(d.Code != getLevelThreeTypeByName("台面")) {
              if(this.def ==0 || this.def == "" || !this.def) return exepFun(this, "延米必须填写")
              else  return resetFun(this)
          }
          else return resetFun(this)
      }
}
