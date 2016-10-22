export default function adapterData(d) {
      // 设置验证参数规则
      d.buyCounts = {     // 采购数量 限制不能购买0 个
          def: 0,
          defCss: "default",
          errorMsg:"",
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
      d.U_DThick = {     // 智能门锁厚度
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_LBLength = {     // 智能门锁锁体挡板长度
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_LBWide = {     // 智能门锁锁体挡板宽度
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_LBLength = {     // 智能门锁锁体挡板长度
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_AbDis = {     // 智能门锁锁体档板左右螺丝十字中心孔距
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_UDDis = {     // 智能门锁锁体档板上下螺丝十字中心孔距
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_LTRDis = {     // 智能门锁门边到锁面板右侧的距离
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_TLLength = {     // 智能门锁门锁面板总长度
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_DType = {     // 智能门锁门的类别
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_DoorO = {     // 智能门锁门开向
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.U_IHEH = {     // 智能门锁是否有天地钩
          def: 0,
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){  }
      };

      d.temp1 = {     // 智能门锁是否有天地钩
          def: "",
          defCss: "default",
          errorMsg:"",
          validateFun:function(data, index){
          console.log(this.def); }
      };

      return d;
}
