export default function adapterData(d) {
      d.U_SWW = d.SWW; // 这里sap xxx 不解释了
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
      d.U_HandleCodes = {
        def: d.U_HandleCodes || [],
        defCss: "default",
        errorMsg:"",tb_disabled: false,
        validateFun:function(data, index){
             return true;
        }
      }
      d.U_FModeling = {     // 前沿造型   下拉组件 默认 、、 DM-008-直边、  DM-002-罗马边
          def: d.U_FModeling || "DM-008-直边",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
               if(d.buyCounts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
                    if(!this.def || this.def == "")  return exepFun(this, "必须选择前沿造型")
                    else  return resetFun(this)
               }
               else return resetFun(this)
          }
      };
      d.U_GSMe = {     // 气源方式   下拉组件 默认 、、     液化气  天燃气
          def: d.U_GSMe || "天燃气 ",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){ return true; }
      };
      d.U_BasinT = {     // 台盆工艺   下拉组件 默认  台上工艺、台下工艺
          def: d.U_BasinT || "台上工艺",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
            if(d.buyCounts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
                 if(!this.def || this.def == "") return exepFun(this, "必须选择台盆工艺")
                 else  return resetFun(this)
            }
            else  return resetFun(this)
          }
      };

      //U_HandleName TODO
      let bav = ["吊柜","地柜","高柜","半高柜","柜门","板件"];
      d.U_HandleName = {     // 把手型号   下拉组件 默认 、、
          def: d.U_HandleName || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
              if(bav.indexOf(d.U_ThreeL) != -1) {
                  if(!this.def || this.def == "")  return exepFun(this, "把手型号必填")
                  else  return resetFun(this)
              }
              else  return resetFun(this)
          }
      };
      d.U_PSWide = {     // 宽度（mm）   文本输入   个性化宽度 最小值 U_PSWideMin  个性化宽度最大值 U_PSWideMax
          def: d.U_PSWide || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
              if(!this.def || this.def == "" || this.def == 0) return exepFun(this, "宽度必须填写")
              else if(isNaN(this.def)) return exepFun(this, "宽度填写不正确")
              else if(this.def*1 < 0)  return exepFun(this, "宽度必须大于0")
              else if(this.def*1 < d.U_PSWideMin) return exepFun(this, "宽度不小于" + d.U_PSWideMin)
              else if(this.def*1 > d.U_PSWideMax) return exepFun(this, "宽度不大于" + d.U_PSWideMax)
              else  return resetFun(this)
          }
      };
      d.U_PSHigh = {     // 高度（mm）   文本输入  个性化高度最小值 U_PSHighMin  个性化高度最大值 U_PSHighMax
          def: d.U_PSHigh || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
              if(!this.def || this.def == "" || this.def == 0) return exepFun(this, "高度必须填写")
              else if(isNaN(this.def)) return exepFun(this, "高度填写不正确")
              else if(this.def*1 < 0)  return exepFun(this, "高度必须大于0")
              else if(this.def*1 < d.U_PSHighMin) return exepFun(this, "高度不小于" + d.U_PSHighMin)
              else if(this.def*1 > d.U_PSHighMax) return exepFun(this, "高度不大于" + d.U_PSHighMax)
              else  return resetFun(this)
          }
      };
      d.U_PSDeep = {     // 进深   文本输入   个性化深最小值 U_PSDeepMin   个性化深最大值 U_PSDeepMax
          def: d.U_PSDeep || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
             if(!this.def || this.def == "")  return exepFun(this, "必须填写进深")
             else if(isNaN(this.def)) return exepFun(this, "进深填写不正确")
             else if(this.def*1 < 0)  return exepFun(this, "进深必须大于0")
             else if(this.def*1 < d.U_PSDeepMin) return exepFun(this, "进深不能小于" + d.U_PSDeepMin)
             else if(this.def*1 > d.U_PSDeepMax)  return exepFun(this, "进深不能大于" + d.U_PSDeepMax)
             else return resetFun(this)
          }
      };
      d.U_TableB = {     // 台面进深（mm）   文本输入 个性化深最小值 U_PSDeepMin   个性化深最大值 U_PSDeepMax
          def: d.U_TableB || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
            if(d.buyCounts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
                 if(!this.def || this.def == "")  return exepFun(this, "必须填写台面进深")
                 else if(isNaN(this.def)) return exepFun(this, "台面进深填写不正确")
                 else if(this.def*1 < 0)  return exepFun(this, "台面进深必须大于0")
                 else if(this.def*1 < d.U_PSDeepMin) return exepFun(this, "台面进深不能小于" + d.U_PSDeepMin)
                 else if(this.def*1 > d.U_PSDeepMax)  return exepFun(this, "台面进深不能大于" + d.U_PSDeepMax)
                 else return resetFun(this)
            }
            else return resetFun(this)
          }
      };
      d.U_HeightWR = {     // 挡水高度（mm）   文本输入   个性化高最小值 U_PSHighMin   个性化高最大值 U_PSHighMax
          def: d.U_HeightWR || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
              if(d.buyCounts.def > 0) {      // 如果填写了销售数量的时候   台盆工艺、前沿造型、进深、挡水高度必填
                   if(!this.def || this.def == "") return exepFun(this, "必须填写挡水高度")
                   else if(isNaN(this.def)) return exepFun(this, "挡水高度填写不正确")
                   else if(this.def*1 < 0)  return exepFun(this, "挡水高度必须大于0")
                   else if(this.def*1 < d.U_PSHighMin) return exepFun(this, "挡水高度不能小于" + d.U_PSHighMin)
                   else if(this.def*1 > d.U_PSHighMax)  return exepFun(this, "挡水高度不能大于" + d.U_PSHighMax)
                   else return resetFun(this)
              }
              else return resetFun(this)
          }
      };

      // 如果销售数量存在  则忽略此项验证  否则开启验证
      d.U_ASWide = {     // 包管展开宽（mm）   文本输入  包管宽最小值 U_AWideMin
          def: d.U_ASWide || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
              if(d.buyCounts.def*1 == 0 || !d.buyCounts.def) {
                  if(!this.def || this.def == "") return exepFun(this, "必须填写包管宽度")
                  else if(isNaN(this.def)) return exepFun(this, "包管宽填写不正确")
                  else if(this.def*1 < 0)  return exepFun(this, "包管宽必须大于0")
                  else if(this.def*1 < d.U_AWideMin) return exepFun(this, "包管宽不能小于" + d.U_AWideMin)
                  else return resetFun(this)
              }
              else return resetFun(this)
          }
      };
      d.U_ASDeep = {     // 包管展开深（mm）   文本输入 包管高 最小值 U_AHighMin
          def: d.U_ASDeep || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
            if(d.buyCounts.def*1 == 0 || !d.buyCounts.def) {
                if(!this.def || this.def == "") return exepFun(this, "必须填写包管高度")
                else if(isNaN(this.def)) return exepFun(this, "包管高填写不正确")
                else if(this.def*1 < 0)  return exepFun(this, "包管高必须大于0")
                else if(this.def*1 < d.U_AWideMin) return exepFun(this, "包管高不能小于" + d.U_AHighMin)
                else return resetFun(this)
            }
            else return resetFun(this)
          }
      };
      d.Notes = {     // 备注
          def: d.Notes || "",
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){ return true; }
      };


      // 设置验证参数规则
      d.buyCounts = {     // 延米线（m）/销售数量
          def: d.sale_counts || 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
              if(isNaN(this.def)) return exepFun(this, "此项填写错误")
              else if(this.def < 0) return exepFun(this, "此项必须大于0")
              else if(d.U_ThreeL != "台面") {
                  if(this.def ==0 || this.def == "" || !this.def) return exepFun(this, "此项必须填写")
                  else  return resetFun(this)
              }
              else return resetFun(this)
          }
      };

      //吊柜,地柜,高柜,半高柜,柜门,板件,顶线,灯线,罗马柱,木框玻璃门,上翻门,拉手,铰链,抽屉轨道,踢脚线,拉篮,台面,烟机,灶台,消毒柜,热水器,水槽,龙头
      let levelOne = ["板件","顶线","灯线","罗马柱","木框玻璃门","上翻门","拉手","铰链","抽屉轨道","踢脚线","拉篮","烟机","消毒柜","热水器","水槽","龙头"];

      let levelTwo = ["灶台", "台面"];
      if(levelTwo.indexOf(d.U_ThreeL) == -1) {
            // 关闭  前沿造型/气源方式/台盆工艺/台面进深（mm）/挡水高度（mm）/包管展开宽（mm）/包管展开深（mm）
            // 第一层 "吊柜","地柜","高柜","半高柜","柜门",
            d.U_FModeling.tb_disabled = true;
            d.U_GSMe.tb_disabled = true;
            d.U_BasinT.tb_disabled = true;
            d.U_TableB.tb_disabled = true;
            d.U_HeightWR.tb_disabled = true;
            d.U_ASWide.tb_disabled = true;
            d.U_ASDeep.tb_disabled = true;
            if(levelOne.indexOf(d.U_ThreeL) != -1) {
                d.U_PSDeep.tb_disabled = true; // 关闭进深
                d.U_HandleName.tb_disabled = true // 关闭把手型号
                if(d.U_ThreeL != "板件") {
                    d.U_PSWide.tb_disabled = true // 关闭宽
                    d.U_PSHigh.tb_disabled = true // 关闭高
                }
            }
      }
      else {
            d.U_PSDeep.tb_disabled = true; // 关闭进深
            d.U_PSWide.tb_disabled = true; // 关闭宽
            d.U_PSHigh.tb_disabled = true; // 关闭高
            d.U_HandleName.tb_disabled = true // 关闭把手型号
            if(d.U_ThreeL == "灶台") {
                //灶台  关闭 包管展开宽、包管展开高、台盆工艺、台面进深、挡水高度、前沿造型
                d.U_FModeling.tb_disabled = true;
                d.U_BasinT.tb_disabled = true;
                d.U_TableB.tb_disabled = true;
                d.U_HeightWR.tb_disabled = true;
                d.U_ASWide.tb_disabled = true;
                d.U_ASDeep.tb_disabled = true;
            }
            else {
                d.U_GSMe.tb_disabled = true; // 台面关闭气源
            }
      }

      return d;
}
