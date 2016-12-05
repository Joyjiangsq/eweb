import actionFun from "component/blockcommon/adapterAction";
import {getLevelThreeTypeByName} from "config/codeMap";
export default function adapter(d) {

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
    {keyName:"U_LockCodes", defValue:d.U_LockCodes || []},       // 门锁产品数组  我和node层定义的
    {keyName:"U_HingeCodes", defValue:d.U_HingeCodes || []},     // 合页产品数组  我和node层定义的
    {keyName:"U_DSWide", defValue:d.U_DSWide || ""},             // 门洞宽
    {keyName:"U_DSHigh", defValue:d.U_DSHigh || ""},             // 门洞高
    {keyName:"U_DSThick", defValue:d.U_DSThick || ""},           // 门洞深
    {keyName:"U_TDWide", defValue:d.U_TDWide || ""},             // 门扇宽
    {keyName:"U_TDHigh", defValue:d.U_TDHigh || ""},             // 门扇高
    {keyName:"U_TDThick", defValue:d.U_DLThickMin || ""},           // 门扇厚  取产品里门扇厚最小值
    {keyName:"U_DLNum", defValue:d.U_DLNum || ""},               // 门扇数
    {keyName:"U_IKeyHole", defValue:d.U_IKeyHole || "是"},       // 是否开孔
    {keyName:"U_HingeName", defValue:d.U_HingeName || ""},       // 合页品牌/型号/规格 我和node层定义的
    {keyName:"U_LockName", defValue:d.U_LockName || ""},         // 门锁品牌/型号/规格 我和node层定义的
    {keyName:"U_OpenWay", defValue:d.U_OpenWay || "左开"},       // 开启方式  左开 右开
    {keyName:"U_DThick", defValue:d.U_DThick || ""},             // 智能门锁厚度
    {keyName:"U_LBLength", defValue:d.U_LBLength || ""},         // 智能门锁锁体挡板长度
    {keyName:"U_LBWide", defValue:d.U_LBWide || ""},             // 智能门锁锁体挡板宽度
    {keyName:"U_AbDis", defValue:d.U_AbDis || ""},               // 智能门锁锁体档板左右螺丝十字中心孔距
    {keyName:"U_UDDis", defValue:d.U_UDDis || ""},               // 智能门锁锁体档板上下螺丝十字中心孔距
    {keyName:"U_LTRDis", defValue:d.U_LTRDis || ""},             // 智能门锁门边到锁面板右侧的距离
    {keyName:"U_TLLength", defValue:d.U_TLLength || ""},         // 智能门锁门锁面板总长度
    {keyName:"U_DType", defValue:d.U_DType || "木门 "},          // 智能门锁门的类别 木门  铁门
    {keyName:"U_DoorO", defValue:d.U_DoorO || "左内开"},         // 智能门锁门开向   左内开，左外开，右内开，右外开
    {keyName:"U_IHEH", defValue:d.U_IHEH || "是"}               // 智能门锁是否有天地钩
  ]

  // 初始化参数属性
  for (var i = 0; i < propertyNameArray.length; i++) {
        let item = propertyNameArray[i];
        d[item.keyName] = {
            def: item.defValue,
            defCss: "default",
            errorMsg:"",tb_disabled: true,
            validateFun:function(data, index){
                 return true;
            }
        }
  }
  // 重新设置特殊参数属性
  // 门洞宽   // 门洞宽   最小值 U_DWWideMin   极限值 U_DWWideL
  d.U_DSWide.validateFun = function(data, index){
      if(isNaN(this.def)) return exepFun(this, "门洞宽必须是数字")
      else if(this.def < 0) return exepFun(this, "此项必须大于0")
      else if(this.def == 0 || this.def == "" || !this.def)  return exepFun(this, "门洞宽必须填写")
      else if(this.def*1 < d.U_DWWideMin*1) return exepFun(this, "门洞宽不能小于"+d.U_DWWideMin)
      else if(this.def*1 > d.U_DWWideL*1) return exepFun(this, "门洞宽不能大于"+d.U_DWWideL)
      else return resetFun(this);
  }
  // 设置验证参数规则
  // 门洞高       // 门洞高    最小值 U_DWHighMin  极限值 U_DWHighL
  d.U_DSHigh.validateFun = function(data, index){
      if(isNaN(this.def)) return exepFun(this, "门洞高必须是数字")
      else if(this.def < 0)  return exepFun(this, "此项必须大于0")
      else if(this.def == 0 || this.def == "" || !this.def) return exepFun(this, "门洞高必须填写")
      else if(this.def*1 < d.U_DWHighMin*1) return exepFun(this, "门洞高不能小于"+d.U_DWHighMin)
      else if(this.def*1 > d.U_DWHighL*1) return exepFun(this, "门洞高不能大于"+d.U_DWHighL)
      else return resetFun(this);
  }
  // 智能门锁厚度
  d.U_DThick.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "必须填写数字")
        else if(this.def < 0) return exepFun(this, "智能门锁厚度必须大于0")
        else if(this.def == 0 || this.def == "" || !this.def) return exepFun(this, "此项必须填写")
        else return resetFun(this);
  }
  // 智能门锁锁体挡板长度
  d.U_LBLength.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "必须填写数字")
        else if(this.def < 0) return exepFun(this, "挡板长度必须大于0")
        else if(this.def == 0 || this.def == "" || !this.def) return exepFun(this, "此项必须填写")
        else return resetFun(this);
  }
  // 智能门锁锁体挡板宽度
  d.U_LBWide.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "必须填写数字")
        else if(this.def < 0) return exepFun(this, "挡板宽度必须大于0")
        else if(this.def == 0 || this.def == "" || !this.def) return exepFun(this, "此项必须填写")
        else return resetFun(this);
  }
  // 智能门锁锁体档板左右螺丝十字中心孔距
  d.U_AbDis.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "必须填写数字")
        else if(this.def < 0) return exepFun(this, "此项必须大于0")
        else return resetFun(this);
  }
  // 智能门锁锁体档板上下螺丝十字中心孔距
  d.U_UDDis.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "必须填写数字")
        else if(this.def < 0) return exepFun(this, "此项必须大于0")
        else return resetFun(this);
  }
  // 智能门锁门边到锁面板右侧的距离
  d.U_LTRDis.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "必须填写数字")
        else if(this.def < 0)  return exepFun(this, "此项必须大于0")
        else return resetFun(this);
  }
  // 智能门锁门锁面板总长度
   d.U_TLLength.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "必须填写数字")
        else if(this.def < 0) return exepFun(this, "此项必须大于0")
        else return resetFun(this);
  }
  // 智能门锁门的类别
  d.U_DType.validateFun = function(data, index){
        if(this.def == 0 || this.def == "" || !this.def) return exepFun(this, "必须填写数字")
        else return resetFun(this);
  }

    d.U_DSThick.validateFun = function(data, index){
        if(isNaN(this.def)) return exepFun(this, "门洞深必须是数字")
        else if(this.def < 0) return exepFun(this, "此项必须大于0")
        else if(this.def == 0 || this.def == "" || !this.def) return exepFun(this, "门洞深必须填写")
        else if(this.def*1 < d.U_DWDeepMin*1) return exepFun(this, "门洞深不能小于"+d.U_DWDeepMin)
        else if(this.def*1 > d.U_DWDeepL*1) return exepFun(this, "门洞深不能大于"+d.U_DWDeepL)
        else return resetFun(this)
        }
    // 门扇宽   最小值  U_DLWideMin  极限值 U_DLWideL
    d.U_TDWide.validateFun = function(data, index){
        if(d.Code == getLevelThreeTypeByName("门扇")) {
            if(this.def == "" || !this.def) return exepFun(this, "门扇宽必须填写")
            else {}
        }
        else if(this.def == "" || !this.def) return resetFun(this)
        if(isNaN(this.def))  return exepFun(this, "门扇宽必须是数字")
        else if(this.def < 0) return exepFun(this, "此项必须大于0")
        else if(this.def*1 < data.U_DLWideMin) return exepFun(this, "门扇宽不能小于" + data.U_DLWideMin)
        else if(this.def*1 > data.U_DLWideL) return exepFun(this, "门扇宽不能大于" + data.U_DLWideL)
        else return resetFun(this)
        }
        // 门扇高   最小值  U_DLHighMin  极限值 U_DLHighL
    d.U_TDHigh.validateFun = function(data, index){
        if(d.Code == getLevelThreeTypeByName("门扇")) {
            if(this.def == "" || !this.def) return exepFun(this, "门扇高必须填写")
            else if(this.def < 0) return exepFun(this, "此项必须大于0")
            else {}
        }
        else if(this.def == "" || !this.def) return resetFun(this)
        if(isNaN(this.def)) return exepFun(this, "门扇高必须是数字")
        else if(this.def < 0) return exepFun(this, "此项必须大于0")
        else if(this.def*1 < data.U_DLHighMin) return exepFun(this, "门扇高不能小于" + data.U_DLHighMin)
        else if(this.def*1 > data.U_DLHighL) return exepFun(this, "门扇高不能大于" + data.U_DLHighL)
        else return resetFun(this)
    }
    // 门扇厚  最小值  U_DLThickMin  极限值 U_DLThickL
    // 去除
    // d.U_TDThick.validateFun = function(data, index){
    //       if(d.Code == getLevelThreeTypeByName("门扇")) {
    //           if(this.def == "" || !this.def) return exepFun(this, "门扇厚必须填写")
    //           else if(this.def < 0) return exepFun(this, "此项必须大于0")
    //       }
    //       else if(this.def == "" || !this.def) return resetFun(this)
    //       if(isNaN(this.def)) return exepFun(this, "门扇厚必须是数字")
    //       else if(this.def < 0) return exepFun(this, "此项必须大于0")
    //       else if(this.def*1 < data.U_DLThickMin) return exepFun(this, "门扇厚不能小于" + data.U_DLThickMin)
    //       else if(this.def*1 > data.U_DLThickL)  return exepFun(this, "门扇厚不能大于" + data.U_DLThickL)
    //       else return resetFun(this)
    // }
    // 是否开孔
    d.U_IKeyHole.validateFun = function(data, index){
            if(this.def == "否")  {
                d.U_LockName.def = "";
                d.U_HingeName.def = "";
            }// 如果否的时候  重置 合页与门锁的值
            return true;
    }
    // 合页品牌/型号/规格
    d.U_HingeName.validateFun = function(data, index){
        if(this.def == 0 || this.def == "" || !this.def) {
            if(data.U_IKeyHole.def == "是") return exepFun(this, "必须选择合页") // 是开孔的时候  此项必填
        }
        else return resetFun(this)
    }
    // 门锁品牌/型号/规格
    d.U_LockName.validateFun = function(data, index){
        if(this.def == 0 || this.def == "" || !this.def) {
            if(data.U_IKeyHole.def == "是") return exepFun(this, "必须选择门锁")  // 是开孔的时候  此项必填
        }
        else return resetFun(this)
    }

}
