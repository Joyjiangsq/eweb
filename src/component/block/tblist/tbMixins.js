import Utils from "common/Utils";
let tbMixin = {
    props:{
      listdata:{
        default:() => []
      },
      toload: {
        default: false
      }
    },
    data: function() {
        return {
          products:"products",
           totals:0,                 // 表格load结束之后 传递给分页的页数
           searchParams: {page: 1}, // 初始查询依据
           load: this.toload,                 // 表格是否加载开关
           cateLoad: this.toload,             // 分类加载tag
           tableEvents:{
                   operatorRender: function(d){
                       let exit = false;
                       let index = 0;
                       for (var i = 0; i < this.listdata.length; i++) {
                         let one = this.listdata[i];
                         let str = "";
                         if(typeof(one.ItemCode) == "object") str = one.ItemCode.def;
                         else str = one.ItemCode
                         if(str == d.ItemCode) {
                           exit = true;
                           index = i;
                           break;
                         }
                       }
                       if(exit) return [] //{action:"delete",icon:"icon-delete", index: index}
                       else return [{action:"add",icon:"icon-add", data: d}]
                   },
                   operatorHandler: function(d){
                       if(d.action == "add") {
                           // adapter这个动作一定要做， vue之所以能够数据驱动视图前提是必须有数据的项目
                           let one = Utils.cloneObj(d.data);
                           one = this.adapterFun(one);
                           this.listdata.push(one);
                       }
                      //  else if(d.action == "delete") {
                      //      this.listdata.splice(d.index,1);
                      //      d.action == "add";
                      //      d.icon = "icon-delete";
                      //  }
                   }
            },
            searchEvents:{                  // 查询回调函数
              onSearch: function(params) {
                  this.searchParams = Object.assign(this.searchParams, params);
                  this.loadlist();
              }
            },
            dtArray:["厨柜", "集成吊顶","洁具","施工辅材", "装修辅材", '门'],
            sDatas: [
              {type:"text",  value:"",  keyname:"ItemName", labelcaption:"产品名称:"},
              {type:"text",  value:"",  keyname:"U_Modle", labelcaption:"型号:"},
              {type:"text",  value:"",  keyname:"Spec", labelcaption:"规格:"},
              {type:"text",  value:"",  keyname:"U_Brand", labelcaption:"品牌:"},
              {type:"text",  value:"",  keyname:"U_Series", labelcaption:"系列:"},
              {type:"text",  value:"",  keyname:"U_MQuality", labelcaption:"材质:"},
              {type:"text",  value:"",  keyname:"U_colour", labelcaption:"颜色:"}]
        }
    },
    computed: {
      sdata: function(){
        //,
        console.log(this.load);
        return this.sDatas;

      }
    },
    ready: function() {
    },
    attached: function() {},
    methods: {
      loadlist: function(){
        this.$set("load", !this.load);
      },
      pagechange: function(d){
          if(!d.page) return false;
          this.searchParams.page = d.page;
          this.loadlist();
      }
    },
    watch: {
      "toload": function(){
          if(this.dtArray.indexOf(this.name) != -1) {
                this.sDatas.unshift({type:"combobox", keyname:"U_ThreeL", labelname:"U_ThreeL", keyid:"FirmCode", value:"", params:{U_ThreeL:this.name}, url:"products/firms", labelcaption:"三级分类："});
          }
          this.sDatas.unshift({type:"combobox", keyname:"FirmName", labelname:"FirmName",params:{ItmsGrpNam: this.name}, url:"products/firms", keyid:"FirmCode", value:"", labelcaption:"二级分类："});
          this.loadlist();
      }
    },
}

export default tbMixin
