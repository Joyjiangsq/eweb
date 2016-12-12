import Utils from "common/Utils";
let tableBase = {
        props:{
          classname:{
            type:String,
            default: ""
          },
          needselected:{
            default: false
          },
          load:{
            type: Boolean,
            default: false
          },
          stylein:{
            type:Object,
            default: () => {}
          },
          // 头信息
          headercaption:{             // [{name:"姓名", labelValue:"name", checkBox: true, type:"data", sort: true, attr:""}, {type:"operator", name:"操作"}]
            type:Array,
            default:() => []
          },

          url:{
            type:String
          },

          params:{
            type:Object,
            default:function(){return {}}
          },
          totals:{
              // twoway: true
          },
          events: {
            type: Object,
            default:function(){
              return {operatorHandler: function(data){},
                      operatorRender: function(){return []}}  // 操作渲染
            }
          },
          getchecks:{
            default: false
          },
          size: {
            type: Number,
            default: 10
          },

          datas:{
            type:Array,
            default:function() {
              return []
            },
          }
        },

        data: function () {
          return {
              dataList: this.datas || [],
              noresult: true,
              loading:false,
              adpArry:[],
          }
        },

        computed: {
          all: function(){
              let counts = 0;
              for (var i = 0; i < this.dataList.length; i++) {
                  if(this.dataList[i].checkTag) {
                    counts += 1;
                  }
              }
              return counts < this.dataList.length? false:true
          }
        },

        created: function(){
          if(this.dataList.length != 0) this.$set("loading", !this.loading);
        },
        ready: function(){
          if(this.load) this.loadData();
          if(this.datas.length != 0) {
              setTimeout(()=>{
                this.noresult = false;
                this.loading = false;
                this.adapertDataMin(this.datas);
              }, 30)
          }

        },
        methods: {
          getCheckeds: function() {
              let newa = [];
              for (var i = 0; i < this.dataList.length; i++) {
                  let one = Utils.cloneObj(this.dataList[i]);
                  delete one.checkTag;
                  delete one.selected;
                  if(this.dataList[i].checkTag) newa.push(one);
              }
              return newa;
          },
          clickOne: function(one, index){
          },
          checkedAll: function(){
              if(this.all) {
                for (var i = 0; i < this.dataList.length; i++) {
                    this.dataList[i].checkTag = false
                }
              }
              else {
                for (var i = 0; i < this.dataList.length; i++) {
                    this.dataList[i].checkTag = true
                }
              }
          },
          btnEventHandler: function(d){
            this.events.operatorHandler.call(this._context, d)
          },
          btnData: function(one, index){
              return   this.events.operatorRender.call(this._context, one, index);
          },
          adapertData(d){
              if(!d.data || d.data.length == 0) {this.noresult = true; this.loading = false; return false;}
              this.dataList = [];
              for (var i = 0; i < d.data.length; i++) {
                  let one = d.data[i];
                  let rowData = {};
                  for (var j = 0; j < this.headercaption.length; j++) {
                    var hone = this.headercaption[j];
                    if(hone.type == "data") rowData[hone.labelValue] = one[hone.labelValue];
                    if(hone.adapterFun) {
                       rowData[hone.labelValue] = hone.adapterFun.call(this._context, one);

                      //  if(this.adpArry.indexOf(hone.labelValue) == -1)  this.adpArry.push(hone.labelValue);
                    }
                    rowData["_id"] = one["_id"];
                    if(this.needselected) {   // 选中状态
                      if(i == 0) rowData["selected"] = true;  // 选中行样式
                      else rowData["selected"] = false;
                    }
                    if(hone.checkbox) one.checkTag = false;
                  }
                  let nd = Object.assign(one, rowData);
                  this.dataList.push(nd);
              }
                this.$set("loading", false);
          },

          adapertDataMin: function() {
              if(!this.datas || this.datas.length == 0) {
                this.dataList = [];
                this.noresult = true;
                this.loading = false;
                return false;
              }
              this.dataList = [];
              for (var i = 0; i < this.datas.length; i++) {
                  let one = this.datas[i];
                  for (var j = 0; j < this.headercaption.length; j++) {
                    var hone = this.headercaption[j];
                    if(hone.adapterFun) {
                      var s  =  hone.adapterFun.call(this._context, one);
                      one[hone.labelValue] = s
                    }
                    if(hone.checkbox) one.checkTag = false;
                  }
                  if(one.checkTag === false) this.dataList.push(Utils.cloneObj(one));
                  else this.dataList.push(one);
              }
          },

          loadData: function() {
            this.params.size = this.size;
            return this.$http.get(this.$Api+ (this.url || ""),{params:this.params}).then((res) => {
                // 如果有数据 就渲染
               //  如果没有数据就显示没有数据
                let datas = res.json();
                this.adapertData({data: datas.data.docs});
                this.$set("totals", datas.data.count);
                this.$dispatch("successload", datas.data.docs);
                if(this.loadSuccess) this.loadSuccess();
            },(e) =>{
              this.$set("loading", false);
              this.$set("noresult", true);
            })
          },

          operatorHandler(id, action){
              // this.$dispatch("table_action", {id: id, action:action}); // 发射事件
              this.events.operatorHandler.call(this._context, action, id);
          }
        },
        watch:{
          "load": function(){

            this.$set("loading", true);
            this.$set("noresult", false);
            this.loadData();
          },

          "datas": {      // 监听静态datas变化  驱动dataList渲染视图
              deep: true,
              handler: function(n, o) {
                //  console.log(JSON.stringify(this.datas));
                 this.adapertDataMin();   // 静态datas 渲染
                  // this.dataList = this.datas;
              }
          },
          "getchecks": function(){
                this.$dispatch("checklist", this.getCheckeds());
          }
        }
 }

export default tableBase
