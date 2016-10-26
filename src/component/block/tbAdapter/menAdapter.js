export default function adapterData(d) {
  // 产品编码、产品名称、二级分类、三级分类、品牌、供应商、型号、 产品规格、材质、颜色、可用库存量、单位、备注 为固定字段
  d.U_CutAMe = {     // 切角方式
      def: d.U_CutAMe || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  d.U_GType = {     // 玻璃类型
      def: d.U_GType || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };

  d.U_DLType = {     // 门套线类型
      def: d.U_DLType || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  d.U_DCLNum = {     // 门套线边数
      def: d.U_DCLNum || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  d.U_DSWide = {     // 门洞宽
      def: d.U_DSWide || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  // 设置验证参数规则
  d.U_DSHigh = {     // 门洞高
      def: d.U_DSHigh || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  // 设置验证参数规则
  d.U_DSThick = {     // 门洞深
      def: d.U_DSThick || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  d.U_TDWide = {     // 门扇宽
      def: d.U_TDWide || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  d.U_TDHigh = {     // 门扇高
      def:d.U_TDHigh || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  d.U_TDThick = {     // 门扇厚
      def: d.U_TDThick || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  d.U_DLNum = {     // 门扇数
      def: d.U_DLNum || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };

  d.U_IKeyHole = {     // 是否开孔
      def: d.U_IKeyHole || "是",  // 是  否
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };

  d.U_HiPro = {     // 合页品牌/型号/规格
      def: d.U_HiPro || "",
      defCss: "",
      errorMsg:"",
      tb_disabled: false,
      validateFun:function(data, index){return true; }
  };
  d.U_LoPro = {     // 门锁品牌/型号/规格
      def:   d.U_LoPro || "",
      defCss: "",
      errorMsg:"",
      tb_disabled: false,
      validateFun:function(data, index){return true; }
  };
  d.U_OpenWay = {     // 开启方式   左开  右开
      def: d.U_OpenWay || "左开",
      defCss: "",
      errorMsg:"",
      tb_disabled: false,
      validateFun:function(data, index){return true; }
  };
  d.U_DThick = {     // 智能门锁厚度
      def:   d.U_DThick || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(isNaN(this.def)) {
          this.defCss = "errorHappend";
          this.errorMsg = "必须填写数字";
          return false
        }
        else if(this.def == 0 || this.def == "" || !this.def) {
          this.defCss = "errorHappend";
          this.errorMsg = "此项必须填写";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_LBLength = {     // 智能门锁锁体挡板长度
      def: d.U_LBLength || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(isNaN(this.def)) {
          this.defCss = "errorHappend";
          this.errorMsg = "必须填写数字";
          return false
        }
        else if(this.def == 0 || this.def == "" || !this.def) {
          this.defCss = "errorHappend";
          this.errorMsg = "此项必须填写";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_LBWide = {     // 智能门锁锁体挡板宽度
      def: d.U_LBWide || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(isNaN(this.def)) {
          this.defCss = "errorHappend";
          this.errorMsg = "必须填写数字";
          return false
        }
        else if(this.def == 0 || this.def == "" || !this.def) {
          this.defCss = "errorHappend";
          this.errorMsg = "此项必须填写";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_AbDis = {     // 智能门锁锁体档板左右螺丝十字中心孔距
      def: d.U_AbDis || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(isNaN(this.def)) {
          this.defCss = "errorHappend";
          this.errorMsg = "必须填写数字";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_UDDis = {     // 智能门锁锁体档板上下螺丝十字中心孔距
      def:d.U_UDDis || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(isNaN(this.def)) {
          this.defCss = "errorHappend";
          this.errorMsg = "必须填写数字";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_LTRDis = {     // 智能门锁门边到锁面板右侧的距离
      def: d.U_LTRDis || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(isNaN(this.def)) {
          this.defCss = "errorHappend";
          this.errorMsg = "必须填写数字";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_TLLength = {     // 智能门锁门锁面板总长度
      def: d.U_TLLength || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(isNaN(this.def)) {
          this.defCss = "errorHappend";
          this.errorMsg = "必须填写数字";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_DType = {     // 智能门锁门的类别
      def: d.U_DType || "",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){
        if(this.def == 0 || this.def == "" || !this.def) {
          this.defCss = "errorHappend";
          this.errorMsg = "此项必须填写";
          return false
        }
        else {
          this.defCss = "default";
          this.errorMsg = "";
          return true;
        }
      }
  };

  d.U_DoorO = {     // 智能门锁门开向   左内开，左外开，右内开，右外开
      def: d.U_DoorO || "左内开",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){ return true; }
  };

  d.U_IHEH = {     // 智能门锁是否有天地钩
      def: d.U_IHEH || "是",
      defCss: "default",
      errorMsg:"",tb_disabled: true,
      validateFun:function(data, index){ return true; }
  };

  d.Notes = {     // 备注
      def: d.Notes || "",
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){ return true; }
  };
  // 设置验证参数规则 销售数量是公用的验证
  d.buyCounts = {     // 销售数量 限制不能购买0 个
      def: 0,
      defCss: "default",
      errorMsg:"",tb_disabled: false,
      validateFun:function(data, index){
          if(isNaN(this.def)) {
            this.defCss = "errorHappend";
            this.errorMsg = "销售数量必须是整数";
            return false
          }
          else if(this.def == 0 || this.def == "" || !this.def) {
            this.defCss = "errorHappend";
            this.errorMsg = "必须填写销售数量";
            return false
          }
          else {
            this.defCss = "default";
            this.errorMsg = "";
            return true;
          }

      }
  };
  console.log(JSON.stringify(d));
  // 验证规则根据 三级分类的名称区分走哪个验证逻辑
  // 目前三级分类有 平开门（木门）, 移门（木门）,门套（木门）,垭口（木门）,窗套,飘窗板,门扇,平开门（铝框门）,移门（铝框门）,门套（铝框门）,五金,普通门锁,智能锁,合页,门吸
          //(1)门洞宽、门洞高、门洞深、开启方式、是否开锁孔、销售数量 限制必填
          //(2)门洞宽、门洞高、门洞深、门扇宽、门扇高、门扇厚、开启方式、是否开锁孔
          //(3) 当选择是开孔的时候 门锁／品牌／规格／型号  -门锁／品牌／规格／型号 可填写 并且验证必填
          // 门洞宽   最小值 U_DWWideMin   极限值 U_DWWideL

          // 默认是平开门（铝框门）  平开门（木门）
          d.U_DSWide.validateFun = function(data, index){
                if(isNaN(this.def)) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞宽必须是数字";
                  return false
                }
                else if(this.def == 0 || this.def == "" || !this.def) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞宽必须填写";
                  return false
                }
                else if(this.def*1 < d.U_DWWideMin*1) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞宽不能小于"+d.U_DWWideMin;
                  return false
                }
                else if(this.def*1 > d.U_DWWideL*1) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞宽不能大于"+d.U_DWWideL;
                  return false
                }
                else {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
            }
          // 设置验证参数规则
          // 门洞高    最小值 U_DWHighMin  极限值 U_DWHighL
              d.U_DSHigh.validateFun = function(data, index){
                  if(isNaN(this.def)) {
                    this.defCss = "errorHappend";
                    this.errorMsg = "门洞高必须是数字";
                    return false
                  }
                  else if(this.def == 0 || this.def == "" || !this.def) {
                    this.defCss = "errorHappend";
                    this.errorMsg = "门洞高必须填写";
                    return false
                  }
                  else if(this.def*1 < d.U_DWHighMin*1) {
                    this.defCss = "errorHappend";
                    this.errorMsg = "门洞高不能小于"+d.U_DWHighMin;
                    return false
                  }
                  else if(this.def*1 > d.U_DWHighL*1) {
                    this.defCss = "errorHappend";
                    this.errorMsg = "门洞高不能大于"+d.U_DWHighL;
                    return false
                  }
                  else {
                    this.defCss = "default";
                    this.errorMsg = "";
                    return true;
                  }
              }
          // 设置验证参数规则
          // 门洞深  最小值 U_DWDeepMin  极限值 U_DWDeepL
            d.U_DSThick.validateFun =function(data, index){
                if(isNaN(this.def)) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞深必须是数字";
                  return false
                }
                else if(this.def == 0 || this.def == "" || !this.def) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞深必须填写";
                  return false
                }
                else if(this.def*1 < d.U_DWDeepMin*1) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞深不能小于"+d.U_DWDeepMin;
                  return false
                }
                else if(this.def*1 > d.U_DWDeepL*1) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门洞深不能大于"+d.U_DWDeepL;
                  return false
                }
                else {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
              }
         // 门扇宽   最小值  U_DLWideMin  极限值 U_DLWideL
            d.U_TDWide.validateFun = function(data, index){
                if(d.U_ThreeL == "门扇") {
                    if(this.def == "" || !this.def) {
                      this.defCss = "errorHappend";
                      this.errorMsg = "门扇宽必须填写";
                      return false
                    }
                }
                else if(this.def == "" || !this.def) {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
                if(isNaN(this.def)) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇宽必须是数字";
                  return false
                }
                else if(this.def*1 < data.U_DLWideMin) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇宽不能小于" + data.U_DLWideMin;
                  return false
                }
                else if(this.def*1 > data.U_DLWideL) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇宽不能大于" + data.U_DLWideL;
                  return false
                }
                else {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
              }
              // 门扇高   最小值  U_DLHighMin  极限值 U_DLHighL
            d.U_TDHigh.validateFun = function(data, index){
                if(d.U_ThreeL == "门扇") {
                    if(this.def == "" || !this.def) {
                      this.defCss = "errorHappend";
                      this.errorMsg = "门扇高必须填写";
                      return false
                    }
                }
                else if(this.def == "" || !this.def) {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
                if(isNaN(this.def)) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇高必须是数字";
                  return false
                }
                else if(this.def*1 < data.U_DLHighMin) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇高不能小于" + data.U_DLHighMin;
                  return false
                }
                else if(this.def*1 > data.U_DLHighL) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇高不能大于" + data.U_DLHighL;
                  return false
                }
                else {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
            }
          // 门扇厚  最小值  U_DLThickMin  极限值 U_DLThickL
          d.U_TDThick.validateFun = function(data, index){
                if(d.U_ThreeL == "门扇") {
                    if(this.def == "" || !this.def) {
                      this.defCss = "errorHappend";
                      this.errorMsg = "门扇厚必须填写";
                      return false
                    }
                }
                else if(this.def == "" || !this.def) {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
                if(isNaN(this.def)) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇厚必须是数字";
                  return false
                }
                else if(this.def*1 < data.U_DLThickMin) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇厚不能小于" + data.U_DLThickMin;
                  return false
                }
                else if(this.def*1 > data.U_DLThickL) {
                  this.defCss = "errorHappend";
                  this.errorMsg = "门扇厚不能大于" + data.U_DLThickL;
                  return false
                }
                else {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
          }
          // 是否开孔
          d.U_IKeyHole.validateFun = function(data, index){
                  if(this.def == 2)  {
                      d.U_HiPro.def = "";
                      d.U_LoPro.def = "";
                  }// 如果否的时候  重置 合页与门锁的值
                  return true;
          }

           // 合页品牌/型号/规格
          d.U_HiPro.validateFun = function(data, index){
                if(this.def == 0 || this.def == "" || !this.def) {
                    if(data.U_IKeyHole.def == "是") {  // 是开孔的时候  此项必填
                      this.defCss = "errorHappend";
                      this.errorMsg = "必须选择合页";
                      return false
                    }
                }
                else {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
          }
           // 门锁品牌/型号/规格
          d.U_LoPro.validateFun = function(data, index){
                if(this.def == 0 || this.def == "" || !this.def) {
                    if(data.U_IKeyHole.def == "是") {  // 是开孔的时候  此项必填
                      this.defCss = "errorHappend";
                      this.errorMsg = "必须选择门锁";
                      return false
                    }
                }
                else {
                  this.defCss = "default";
                  this.errorMsg = "";
                  return true;
                }
          }

          var levelOneArray = ["移门（木门）", "移门（铝框门）","门套（木门）","门套（铝框门）","垭口（木门）","窗套","飘窗板","五金","普通门锁","合页","门吸"];
          var levelTwoArray = ["门套（木门）","门套（铝框门）","垭口（木门）","窗套","飘窗板","五金","普通门锁","合页","门吸"];
          var levelThreeArray = ["垭口（木门）","窗套","飘窗板","五金","普通门锁","合页","门吸"];
          if(levelOneArray.indexOf(d.U_ThreeL) != -1) {
              // 移门的时候 去除 开启方式， 是否开孔 门锁，合页
              d.U_IKeyHole.tb_disabled = true; // 是否开孔
              d.U_HiPro.tb_disabled = true; // 合页
              d.U_LoPro.tb_disabled = true; // 门锁
              d.U_OpenWay.tb_disabled = true; // 手否开孔

              // 门套木门是没有 门扇
              if(levelTwoArray.indexOf(d.U_ThreeL) != -1) {
                  d.U_TDWide.tb_disabled = true; // 门扇宽
                  d.U_TDHigh.tb_disabled = true; // 门扇高
                  d.U_TDThick.tb_disabled = true; // 门扇厚

                  if(levelThreeArray.indexOf(d.U_ThreeL) != -1) {
                    d.U_DSWide.tb_disabled = true; // 门洞宽
                    d.U_DSHigh.tb_disabled = true; // 门洞高
                    d.U_DSThick.tb_disabled = true; // 门洞深
                  }
              }
           }

           // 门扇逻辑
           if(d.U_ThreeL == "门扇") {
             d.U_DSWide.tb_disabled = true; // 门洞宽
             d.U_DSHigh.tb_disabled = true; // 门洞高
             d.U_DSThick.tb_disabled = true; // 门洞深
           }

           // 门扇逻辑
           if(d.U_ThreeL == "智能锁") {
                 d.U_DSWide.tb_disabled = true;  //门洞宽
                 d.U_DSHigh.tb_disabled = true;  //门洞高
                 d.U_DSThick.tb_disabled = true;  //门洞深
                 d.U_TDWide.tb_disabled = true;  //门扇宽
                 d.U_TDHigh.tb_disabled = true;  //门扇高
                 d.U_TDThick.tb_disabled = true;  //门扇厚
                 d.U_IKeyHole.tb_disabled = true;  //是否开孔
                 d.U_HiPro.tb_disabled = true;  //合页品牌/型号/规格
                 d.U_LoPro.tb_disabled = true;  //门锁品牌/型号/规格
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
                 d.U_DoorO.validateFun = function(data, index){

                 }

                 // 智能门锁是否有天地钩
                 d.U_IHEH.tb_disabled = false;
                 d.U_IHEH.validateFun = function(data, index){

                 }
           }


  // 开门（木门）的时候
  return d;
}
