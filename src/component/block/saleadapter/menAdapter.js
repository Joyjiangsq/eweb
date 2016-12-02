import {getLevelThreeTypeByName} from "config/codeMap";
export default function adapterData(d) {
  d.U_SWW = d.SWW; // 这里sap xxx 不解释了
//   delete d.SWW;
    d.U_SupNum = d.CardCode;
    delete d.CardCode;
  if(!d.stock || d.stock == 0) d.stock = "0";

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
    // {keyName:"U_CutAMe", defValue:d.U_CutAMe || ""},             // 切角方式
    // {keyName:"U_GType", defValue:d.U_GType || ""},               // 玻璃类型
    // {keyName:"U_DLType", defValue:d.U_DLType || ""},             // 门套线类型
    // {keyName:"U_DCLNum", defValue:d.U_DCLNum || ""},             // 门套线边数
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
    {keyName:"U_IHEH", defValue:d.U_IHEH || "是"},               // 智能门锁是否有天地钩
    {keyName:"Freetxt", defValue:d.Freetxt || ""},               // 备注
    {keyName:"sale_counts", defValue:d.sale_counts || 0}           // 销售数量
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

  // 设置验证参数规则 销售数量是公用的验证
  // 销售数量 限制不能购买0 个
  d.sale_counts.validateFun = function(data, index){
          if(isNaN(this.def)) return exepFun(this, "销售数量必须填写")
          else if(this.def < 0) return exepFun(this, "销售数量必须大于0")
          else if(this.def == 0 || this.def == "" || !this.def) return exepFun(this, "必须填写销售数量")
          else return resetFun(this);
  }
  // 验证规则根据 三级分类的名称区分走哪个验证逻辑
  // 目前三级分类有 平开门（木门）, 移门（木门）,门套（木门）,垭口（木门）,窗套,飘窗板,门扇,平开门（铝框门）,移门（铝框门）,门套（铝框门）,五金,普通门锁,智能锁,合页,门吸
          //(1)门洞宽、门洞高、门洞深、开启方式、是否开锁孔、销售数量 限制必填
          //(2)门洞宽、门洞高、门洞深、门扇宽、门扇高、门扇厚、开启方式、是否开锁孔
          //(3) 当选择是开孔的时候 门锁／品牌／规格／型号  -门锁／品牌／规格／型号 可填写 并且验证必填
          // 默认是平开门（铝框门）  平开门（木门）
          // 设置验证参数规则
          // 门洞高    最小值 U_DWHighMin  极限值 U_DWHighL
          // 设置验证参数规则
          // 门洞深  最小值 U_DWDeepMin  极限值 U_DWDeepL
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

          d.U_DThick.tb_disabled = true;
          d.U_LBLength.tb_disabled = true;
          d.U_LBWide.tb_disabled = true;
          d.U_AbDis.tb_disabled = true;
          d.U_UDDis.tb_disabled = true;
          d.U_LTRDis.tb_disabled = true;
          d.U_TLLength.tb_disabled = true;
          d.U_DType.tb_disabled = true;
          d.U_DoorO.tb_disabled = true;
          d.U_IHEH.tb_disabled = true;

          var levelOneArray = ["移门（木门）", "移门（铝框门）","门套（木门）","门套（铝框门）","垭口（木门）","窗套","飘窗板","五金","普通门锁","合页","门吸"];
          var levelTwoArray = ["门套（木门）","门套（铝框门）","垭口（木门）","窗套","飘窗板","五金","普通门锁","合页","门吸"];
          var levelThreeArray = ["垭口（木门）","五金","普通门锁","合页","门吸"];
          levelOneArray = levelOneArray.map(one => getLevelThreeTypeByName(one));
          levelTwoArray = levelTwoArray.map(one => getLevelThreeTypeByName(one));
          levelThreeArray = levelThreeArray.map(one => getLevelThreeTypeByName(one));
          
          if(levelOneArray.indexOf(d.Code) != -1) {
              // 移门的时候 去除 开启方式， 是否开孔 门锁，合页
              d.U_IKeyHole.tb_disabled = true; // 是否开孔
              d.U_HingeName.tb_disabled = true; // 合页
              d.U_LockName.tb_disabled = true; // 门锁
              d.U_OpenWay.tb_disabled = true; // 手否开孔

              // 门套木门是没有 门扇
              if(levelTwoArray.indexOf(d.Code) != -1) {
                  d.U_TDWide.tb_disabled = true; // 门扇宽
                  d.U_TDHigh.tb_disabled = true; // 门扇高
                  d.U_TDThick.tb_disabled = true; // 门扇厚

                  if(levelThreeArray.indexOf(d.Code) != -1) {
                    d.U_DSWide.tb_disabled = true; // 门洞宽
                    d.U_DSHigh.tb_disabled = true; // 门洞高
                    d.U_DSThick.tb_disabled = true; // 门洞深
                  }
              }
           }
           // 门扇逻辑
           if(d.Code == getLevelThreeTypeByName("门扇")) {
             d.U_DSWide.tb_disabled = true; // 门洞宽
             d.U_DSHigh.tb_disabled = true; // 门洞高
             d.U_DSThick.tb_disabled = true; // 门洞深
           }

           // 门扇逻辑
           if(d.Code == getLevelThreeTypeByName("智能锁")) {
                 d.U_DSWide.tb_disabled = true;  //门洞宽
                 d.U_DSHigh.tb_disabled = true;  //门洞高
                 d.U_DSThick.tb_disabled = true;  //门洞深
                 d.U_TDWide.tb_disabled = true;  //门扇宽
                 d.U_TDHigh.tb_disabled = true;  //门扇高
                 d.U_TDThick.tb_disabled = true;  //门扇厚
                 d.U_IKeyHole.tb_disabled = true;  //是否开孔
                 d.U_HingeName.tb_disabled = true;  //合页品牌/型号/规格
                 d.U_LockName.tb_disabled = true;  //门锁品牌/型号/规格
                 d.U_OpenWay.tb_disabled = true;  //开启方式   左开  右开

                 // 智能门锁厚度
                 d.U_DThick.tb_disabled = false;
                 // // 智能门锁锁体挡板长度
                 d.U_LBLength.tb_disabled = false;
                 // 智能门锁锁体挡板宽度
                 d.U_LBWide.tb_disabled = false;
                 // 智能门锁锁体档板左右螺丝十字中心孔距
                 d.U_AbDis.tb_disabled = false;
                 // 智能门锁锁体档板上下螺丝十字中心孔距
                 d.U_UDDis.tb_disabled = false;
                 // 智能门锁门边到锁面板右侧的距离
                 d.U_LTRDis.tb_disabled = false;
                 // 智能门锁门锁面板总长度
                 d.U_TLLength.tb_disabled = false;
                 // 智能门锁门的类别
                 d.U_DType.tb_disabled = false;
                 // 智能门锁门开向
                 d.U_DoorO.tb_disabled = false;
                //  d.U_DoorO.validateFun = function(data, index){
                //       // TODO
                //  }
                 // 智能门锁是否有天地钩
                 d.U_IHEH.tb_disabled = false;
                //  d.U_IHEH.validateFun = function(data, index){
                //     // TODO
                //  }
           }


  // 开门（木门）的时候
  return d;
}
