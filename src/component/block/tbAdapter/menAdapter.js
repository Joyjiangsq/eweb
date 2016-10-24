export default function adapterData(d) {
    for(var i in d) {
      var value = d[i];
      d[i] = {
        def: value || '',
        defCss: "default",
        errorMsg:"",
        tb_disabled: false,  // 单元格开关
        validateFun:function(data, index){  }
      }
    }
      // 设置验证参数规则
      d.buyCounts = {     // 采购数量 限制不能购买0 个
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){
              if(isNaN(this.def)) {
                this.defCss = "errorHappend";
                this.errorMsg = "采购数量必须是整数";
                return false
              }
              else if(this.def == 0 || this.def == "" || !this.def) {
                this.defCss = "errorHappend";
                this.errorMsg = "必须填写采购数量";
                return false
              }
              else {
                this.defCss = "default";
                this.errorMsg = "";
                return true;
              }

          }
      };
      // 设置验证参数规则
      d.U_DSWide = {     // 门洞宽
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };
      // 设置验证参数规则
      d.U_DSHigh = {     // 门洞高
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };
      // 设置验证参数规则
      d.U_DSThick = {     // 门洞深
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };
      // 设置验证参数规则
      d.U_TDWide = {     // 门扇宽
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };
      // 设置验证参数规则
      d.U_TDHigh = {     // 门扇高
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };
      // 设置验证参数规则
      d.U_TDThick = {     // 门扇厚
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };
      // 设置验证参数规则
      d.U_DThick = {     // 智能门锁厚度
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_LBLength = {     // 智能门锁锁体挡板长度
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_LBWide = {     // 智能门锁锁体挡板宽度
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_LBLength = {     // 智能门锁锁体挡板长度
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_AbDis = {     // 智能门锁锁体档板左右螺丝十字中心孔距
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_UDDis = {     // 智能门锁锁体档板上下螺丝十字中心孔距
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_LTRDis = {     // 智能门锁门边到锁面板右侧的距离
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_TLLength = {     // 智能门锁门锁面板总长度
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_DType = {     // 智能门锁门的类别
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_DoorO = {     // 智能门锁门开向
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.U_IHEH = {     // 智能门锁是否有天地钩
          def: 0,
          defCss: "default",
          errorMsg:"",tb_disabled: false,
          validateFun:function(data, index){  }
      };

      d.temp1 = {     // heye
          def: "",
          defCss: "",
          errorMsg:"",
          tb_disabled: false,
          validateFun:function(data, index){
          console.log(this.def); }
      };
      d.temp2 = {     // menxi
          def: "",
          defCss: "",
          errorMsg:"",
          tb_disabled: false,
          validateFun:function(data, index){
          console.log(this.def); }
      };

      // console.log(d.U_IKeyHole);
      return d;
}
