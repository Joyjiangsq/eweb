import Utils from "common/Utils";
import {showTips} from "actions/index";
import {getLevelOneTypeByName, getLevelThreeTypeByName} from "config/codeMap"
let tbMixin = {
    props:{
      listdata:{
        default:() => []
      },
      toload: {
        default: false
      },
      scene: {
        default:""
      }
    },
    data: function() {
        return {
           products:"products",
           getLevelOneTypeByName: getLevelOneTypeByName,
           twoLevelData:[],   // 二级分类
           threeLevelData:[], // 三级分类
           totals:0,                 // 表格load结束之后 传递给分页的页数
           searchParams: {page: 1}, // 初始查询依据  searchParams: {ItmsGrpNam:"装修辅料"}, // 初始查询依据
           load: this.toload,                 // 表格是否加载开关
           cateLoad: this.toload,             // 分类加载tag
           tableEvents:{
                   operatorRender: function(d){
                       if(d.Code == getLevelThreeTypeByName("台面") && this.scene == "back") return [];  // 台面不允许备货
                       if(this.name == "厨柜" || this.name =="门") return [{action:"add",icon:"icon-add", data: d}]
                       let exit = false;
                       let index = 0;
                       console.log("this.listdata");
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
                       if(exit) return []
                       else return [{action:"add",icon:"icon-add", data: d}]
                   },
                   operatorHandler: function(d){
                       console.log(11);
                       if(d.action == "add") {
                          // 厨柜特殊
                           if(this.name == "厨柜") {
                                if(d.data.U_CardName == ""　|| !d.data.U_CardName)  this.putOne(d.data); // 如果不存在供应商 直接过
                                else if(this.filter.indexOf(d.data.FirmName) == -1)  this.putOne(d.data); // 如果新增数据不是filter里的 过
                                else {
                                    let flg = true;
                                    for (var i = 0; i < this.listdata.length; i++) {
                                        let one = this.listdata[i];
                                        if(this.filter.indexOf(one.FirmName) != -1) {  // 校验二级分类  如果存在限制
                                            if(one.CardCode != d.data.CardCode) {     // 校验供应商id 如果不等
                                                  showTips(this.$store, {type:"error", msg:this.filter.join(",") + "不允许夸供应商选品", time:4000});
                                                  flg = false;
                                                  break;
                                            }
                                        }

                                    }
                                    if(flg)  this.putOne(d.data);
                                }
                           }
                           else {
                               // adapter这个动作一定要做， vue之所以能够数据驱动视图前提是必须有数据的项目
                               this.putOne(d.data);
                           }
                       }
                   }
            },
            searchEvents:{                  // 查询回调函数
              onSearch: function(params) {
                  // this.searchParams = Object.assign(this.searchParams, params);
                  Object.assign(this.searchParams, params);
                  this.searchParams.page = 1;
                  this.loadlist();
              }
            },
            dtArray:["厨柜", "集成吊顶","洁具","施工辅材", "装修辅料", '门'],
            sDatas: [
              {type:"text",  value:"",  keyname:"ItemName", labelcaption:"产品名称:"},
              {type:"text",  value:"",  keyname:"U_Modle", labelcaption:"型号:"},
              {type:"text",  value:"",  keyname:"Spec", labelcaption:"规格:"},
              {type:"text",  value:"",  keyname:"U_Brand", labelcaption:"品牌:"},
              {type:"text",  value:"",  keyname:"U_Series", labelcaption:"系列:"},
              {type:"text",  value:"",  keyname:"U_MQuality", labelcaption:"材质:"},
              {type:"text",  value:"",  keyname:"U_Colour", labelcaption:"颜色:"}]
        }
    },
    computed: {
      sdata: function(){
        //,
        return this.sDatas;

      }
    },
    created: function(){
      this.searchParams.ItmsGrpCod = this.getLevelOneTypeByName(this.name);
      console.log(this.searchParams.ItmsGrpCod );
    },
    ready: function() {
    },
    attached: function() {},
    methods: {
      getLevelData: function(){
          this.$http.get(this.$Api + "products/firms", {params:{ItmsGrpCod: this.getLevelOneTypeByName(this.name)}}).then((res)=>{
                let d = res.json().data[0];
                this.twoLevelData = d.firms;
                for (var i = 0; i < d.firms.length; i++) {
                  let one = d.firms[i];
                  this.threeLevelData = one.next_firms.concat(this.threeLevelData);
                }
                if(this.dtArray.indexOf(this.name) != -1) {
                      this.sDatas.unshift({type:"combobox", keyname:"Code", labelname:"name", keyid:"code", datas: this.threeLevelData, labelcaption:"三级分类："});
                }
                this.sDatas.unshift({type:"combobox", keyname:"FirmCode", labelname:"name", datas: this.twoLevelData, keyid:"code", value:"", labelcaption:"二级分类："});
          }, (e)=>{

          });
      },
      loadlist: function(){
        this.$set("load", !this.load);
      },
      pagechange: function(d){
          if(!d.page) return false;
          this.searchParams.page = d.page;
          this.loadlist();
      },
      putOne: function(data){
        let one = Utils.cloneObj(data);
        if(this.name == "厨柜" || this.name =="门") one.randomTag = Math.random().toString(16)
        this.$dispatch("addone", one);
      }
    },
    watch: {
      "toload": function(){
          this.loadlist();
          if(this.twoLevelData.length == 0) {
              this.getLevelData();
          }
      }
    },
}

export default tbMixin
