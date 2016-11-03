import tb from "component/grid/tableSpec";
import tbbase from "component/grid/tableListBase";
import css from "./type.css";
import dialog from "component/dialog/dialog";
import itemtpl from "./itemtpl.vue";
import {showTips} from "actions/index";
export default {
  props :{
    subvalidate:{         // 开启验证的开关   验证结束会向父类派发success 和 fail 两个事件 并且附带品类名称
      default: false
    },
    testdata:{
      default: function(){
        return []
      },
    },
    recdata:{
      default: function(){
        return {
          Address2:"安徽省,合肥市,高新区,xxx街道", // 分站地址描述


        }
      },
    },
    curaction:{
      default: "add"
    },
    detail:{
      default: false,
    }
  },
  data: function () {
    return {
      css,
      plist:[],
      vlist:[],
      pshow:false,
      tableEvents:{
          operatorRender: function(d){
            if(!d.ProductList || d.ProductList == "") {
              return [{action:"delete",icon:"icon-delete", data: d}]
            }
            else return [{action:"delete",icon:"icon-delete", data:d}, {action:"tip",icon:"icon-tip", data:d}]
          },
          operatorHandler: function(d){
            console.log(d);
              if(d.action == "delete") {
                for (var i = 0; i < this.vlist.length; i++) {
                  let one = this.vlist[i];
                  if(d.data.ItemCode == one.ItemCode) {
                    this.vlist.splice(i,1);
                    break;
                  }
                }
              }
          }
      },
      showSelectDialog:false, // 选品对话框控制
      validateRec :true, // 验证 列表
      toload: false, // 展开选品对话框再加载
      validateInfo: true // 验证 收件信息
    }
  },
  computed: {
  },
  created: function () {
    // 初始化验证(如果有第一次)
    // for (var i = 0; i < this.testdata.length; i++) {
    //   let one = this.testdata[i];
    //   this.adapterFun(one);
    // }
  },
  attached: function () {},
  methods: {
    // 显示选品弹框
    moreClickHandler: function(){
          this.$set("toload", true);
          this.showSelectDialog = !this.showSelectDialog;
    },
    // 根据产品编码查询的结果
    oneSuccessHandler: function(d) {
      let one = this.adapterFun(d);
      this.vlist.push(one);
    },
    // 收件信息验证函数
    validateHandler: function(d) {
        if(d.res == "fail") this.validateInfo = false;
        else {
            this.recdata[d.name] = d.value;
        }
    },
    // 验证列表数据
    validateFun: function(){
        this.validateRec = true;
        this.validateInfo = true;
        for (var i = 0; i < this.vlist.length; i++) {
          let one = this.vlist[i];
            for(var key in one) {
              if(typeof(one[key]) == "object") {
                console.log(key);
                  if(one[key].tb_disabled) continue;
                  let res = one[key].validateFun(one, i);
                  if(!res) {this.validateRec = false;}
              }
          }
        }
        // 收件信息验证
        if(this.vlist.length != 0)  this.validate = !this.validate;
        setTimeout(()=>{
          if(!this.validateRec || !this.validateInfo) this.$dispatch("fail", {project: this.curName});
          else {

              this.recdata.U_DstCutm = ""; // 分站编码  配送客户
              let params = {list: this.vlist, rec_info: this.recdata};
              if(this.eclosure) params["U_Enclosure"] = this.eclosure;
              // TODO 以下所有字段 不解释
              params.U_AddCode = "1,2,3,4"; // 分站地址编码
              params.Descript = "";  // 分站地址描述
              params.WhsCode = "09"; // 仓库
              params.U_DeWay = "PS"; // ZT-自提  PS-配送
              this.$dispatch("success", {project:this.curName,data:params});
          }
        })
    },
    // 验证列表数据
    // validateFun: function(){
    //   console.log(111);
    //     this.validateRec = true;
    //     for (var i = 0; i < this.testdata.length; i++) {
    //       let one = this.testdata[i];
    //         for(var key in one) {
    //           if(typeof(one[key]) == "object") {
    //               if(!one[key].validateFun) continue;
    //               if(one[key].tb_disabled) continue;
    //               let res = one[key].validateFun(one, i);
    //               if(!res) {this.validateRec = false;}
    //           }
    //       }
    //     }
    //     // 备注
    //     this.validate = !this.validate;
    //     setTimeout(()=>{
    //       if(!this.validateRec) this.$dispatch("fail", {project:this.curName});
    //       else this.$dispatch("success", {project: this.curName,data:{list: this.testdata, rec_info: this.recdata}});
    //     });
    // },

    deleteoneHandler: function(d) {
        this.vlist.split(d.index,1);
    },

    addoneHandler : function(d){
        let one = this.adapterFun(d.data);
        this.vlist.push(one);
    }
  },
  ready: function(){
    if(!this.detail) {
      for (var i = 0; i < this.testdata.length; i++) {
        var one = this.testdata[i];
        this.vlist.push(this.adapterFun(one));
      }
      console.log(this.vlist);
    }
    if(this.curaction == "edit") {
      this.headercaption.splice(0,1);
    }
  },
  components: {tb, dialog, tbbase, itemtpl},
  watch:{
    "subvalidate": function() {
        // 执行验证
        this.validateFun();
    }
  }
}
