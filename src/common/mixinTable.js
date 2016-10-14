let tableBase = {
        props:{
          classname:{
            type:String,
            default: ""
          },
          load:{
            type: Boolean,
            default: true
          },
          stylein:{
            type:Object,
            default: () => {}
          },
          codevalue:{
            type:String,
            default:"id"
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
            default:() => {}
          },
          totals:{
              twoway: true
          },
          events: {
            type: Object,
            default:function(){
              return {operatorHandler: function(data){},
                      operatorRender: function(){return []}}  // 操作渲染
            }
          },

          datas:{
            type:Array,
            default:() => []
          }
        },

        data: function () {
          return {
              dataList: this.datas || [],
              noresult: false,
              loading:true,
              checked: false,
              checkeds:[],
              tpIds:[],
              stag: false,
              smsg:""
          }
        },

        computed: {
          all: function(){
            return this.checkeds.length == this.dataList.length
          }
        },

        created: function(){
          if(this.dataList.length != 0) this.$set("loading", !this.loading);
        },
        ready: function(){
          if(this.load) this.loadData();
        },
        methods: {
          clickOne: function(one){
              let index = this.checkeds.indexOf(one);
              if(index != -1)  this.checkeds.splice(index, 1);
              else  this.checkeds.push(one);
              this.$dispatch("checkedchange", this.checkeds.join(","));
          },
          checkedAll: function(){
            this.checkeds = []
            this.$set("checked", !this.checked);
            if(this.checked) {
              if(this.tpIds.length != 0) this.checkeds = this.tpIds;
              else {
                for(let i = 0; i < this.datas.length; i++) {
                      this.checkeds.push(this.datas[i][this.codevalue]);
                }
              }
            }
            this.$dispatch("checkedchange", this.checkeds.join(","));
          },
          btnEventHandler: function(d){
            this.events.operatorHandler.call(this._context, d)
          },
          btnData: function(one){
              return   this.events.operatorRender.call(this._context, one);
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
                    }
                    rowData["_id"] = one["_id"];
                    if(i == 0) rowData["selected"] = true;
                    else rowData["selected"] = false;
                  }
                  this.dataList.push(rowData);
                  this.tpIds.push(one[this.codevalue]);
              }
                this.$set("loading", false);
          },

          loadData: function() {
            return this.$http.get(this.$Api+ (this.url || ""),{params:this.params}).then((res) => {
                // 如果有数据 就渲染
               //  如果没有数据就显示没有数据
                let datas = res.json();
                this.adapertData({data: datas.data.docs});
                this.$set("totals", datas.data.count);
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
          }
        }
 }

export default tableBase
