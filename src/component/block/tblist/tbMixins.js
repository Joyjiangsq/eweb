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
          //  headerCaption:[
          //         {type:"operator", name:"", icon: true},
          //         {name:"产品编码", labelValue:"ItemCode", type:"data"},{name:"产品名称", labelValue:"ItemName", type:"data"},
          //         {name:"产品包", labelValue:"SWW", type:"data"},{name:"二级分类", labelValue:"FirmName", type:"data"},
          //         {name:"三级分类", labelValue:"U_ThreeL", type:"data"},{name:"品牌", labelValue:"U_Brand", type:"data"},
          //         {name:"供应商", labelValue:"U_CardName", type:"data"},{name:"型号", labelValue:"U_Modle", type:"data"},
          //         {name:"系列", labelValue:"U_Series", type:"data"},{name:"材质", labelValue:"U_MQuality", type:"data"},
          //         {name:"产品规格", labelValue:"Spec", type:"data"},{name:"单位", labelValue:"SalUnitMsr",type:"data"}
          //  ],
           totals:0,                 // 表格load结束之后 传递给分页的页数
           searchParams: {page: 1}, // 初始查询依据
           load: this.toload,                 // 表格是否加载开关
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
            }
        }
    },
    computed: {
      sdata: function(){
        return [{type:"combobox", keyname:"FirmName", labelname:"FirmName", keyid:"FirmCode", value:"", params:{ItmsGrpNam: this.name}, url:"products/firms", labelcaption:"二级分类："},
        {type:"text",  value:"",  keyname:"ItemName", labelcaption:"产品名称:"},
                {type:"text",  value:"",  keyname:"U_Modle", labelcaption:"型号:"},
                {type:"text",  value:"",  keyname:"Spec", labelcaption:"规格:"},
                {type:"text",  value:"",  keyname:"U_Brand", labelcaption:"品牌:"},
                {type:"text",  value:"",  keyname:"U_Series", labelcaption:"系列:"},
                {type:"text",  value:"",  keyname:"U_MQuality", labelcaption:"材质:"},
                {type:"text",  value:"",  keyname:"U_colour", labelcaption:"颜色:"}];

      }
    },
    ready: function() {
      console.log(11111111);
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
          this.loadlist();
      }
    },
}

export default tbMixin
