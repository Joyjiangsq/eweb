import tb from "component/grid/tableSpec";
import tbbase from "component/grid/tableListBase";
import css from "./type.css";
import dialog from "component/dialog/dialog";
import formtext from "component/form/formText";
import formtextadd from "component/form/formTextAdd";
import itemtpl from "./itemtpl.vue";
import {showTips} from "actions/index";
import {sale_standard_header, sale_standard_header_d} from "config/headerConst";
import Utils from "common/Utils";

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
    scene: {
      default:"sale"
    },
    recdata:{
      default: function(){
        return {
          Address2:Utils.getUserInfo().Street || '', // 分站地址描述
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
              return [{action:"delete",icon:"icon-delete", data: d}]
          },
          operatorHandler: function(d){
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
      // 瓷砖，地板，洁具，集成吊顶，装修辅料，施工辅材的表格列都是一致的
      headercaption:sale_standard_header(this.scene),
      headerdetail:sale_standard_header_d(this.scene),
      showSelectDialog:false, // 选品对话框控制
      validateRec :true, // 验证 列表
      toload: false, // 展开选品对话框再加载
      validate:false, // 验证收件信息 开关
      validateInfo: true // 验证 收件信息 标志
    }
  },
  computed: {
  },
  created: function () {

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
        if(this.concatFunc) this.concatFunc();
        this.validateRec = true;
        this.validateInfo = true;
        for (var i = 0; i < this.vlist.length; i++) {
          let one = this.vlist[i];
            for(var key in one) {
              console.log(key);
              if(!one[key]) continue;
              if(one[key] instanceof Array) continue;
              if(typeof(one[key]) == "object") {
                  if(one[key].tb_disabled) continue;
                  if(!one[key].validateFun) continue;
                  let res = one[key].validateFun(one, i);
                  if(!res) {this.validateRec = false;}
              }
          }
        }
        // 收件信息验证
        if(this.vlist.length != 0)  this.validate = !this.validate;
        // else this.validateInfo = false;
        setTimeout(()=>{
          if(!this.validateRec || !this.validateInfo) this.$dispatch("fail", {project: this.curName});
          else {
              this.recdata.U_DstCutm = ""; // 分站编码  配送客户
              let params = {list: this.vlist, rec_info: this.recdata};
              if(this.eclosure) params["U_Enclosure"] = this.eclosure;
              console.log(Utils.getUserInfo());
              // TODO 以下所有字段 不解释
              // params.U_AddCode = Utils.getUserInfo().U_AddCode; // 分站地址编码  放base_info下了
              params.Descript = "";  // 分站地址描述
              params.WhsCode = "09"; // 仓库
              params.U_DeWay = "PS"; // ZT-自提  PS-配送
              params.U_ShortName = Utils.getUserInfo().CardCode; // 分站编码
              if(this.curName == "cizhuan") {
                  let adArray = this.recdata.Address2.split(",");
                  this.recdata.Name = adArray[0];
                  this.recdata.City = adArray[1];
                  this.recdata.County = adArray[2];
              }
              this.$dispatch("success", {project:this.curName,data:params});
          }
        },30)
    },

    deleteoneHandler: function(d) {
        this.vlist.split(d.index,1);
    },
    addoneHandler : function(d){
        let one = this.adapterFun(d);
        this.vlist.push(one);
    }
  },
  ready: function(){
    if(!this.detail) {
      for (var i = 0; i < this.testdata.length; i++) {
        var one = this.testdata[i];
        let no = Utils.cloneObj(one);
        this.vlist.push(this.adapterFun(no));
      }
    }
    if(this.curaction == "edit") {
      this.headercaption.splice(0,1);
    }
  },
  components: {tb, dialog, tbbase, itemtpl, formtextadd, formtext},
  watch:{
    "subvalidate": function() {
        // 执行验证
        this.validateFun();
    }
  }
}
