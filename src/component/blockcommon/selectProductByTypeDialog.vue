<template>
    <div>
           <!--根据类型选品对话框-->
          <dialog :flag.sync="showSelect" title="选品" @dialogclick="dialogClickHandler">
                <div slot="containerDialog">
                    <div :class="css.sBox">
                          <search pathname :datas="sdata" :hash="false" :needsearch="false"  :events="searchEvents"></search>
                        </div>
                    <div :class="css.tBox">
                      <tb :headercaption="headerCaption" @checklist="checklist" :getchecks="getchecks" :needindex="false" url="material/select-product-list" :totals.sync="totals" :load="load" :params="searchParams" :events="tableEvents"></tb>
                    </div>
                    <pg @pagechange="pagechange" :totals="totals" :curpage.sync="searchParams.page" :hash="false"></pg>
                </div>
          </dialog>
    </div>
</template>
<script> 

    export default {
            props:{
                cid: {
                    default:"" // 分类id
                },
                toload:{
                    default: false // 控制加载开关
                }
            },
            data: function() {
                return {
                     searchEvents:{
                        onSearch: function(params) {
                            
                        }
                     },
                     headerCaption: [],
                     load: false,
                     searchParams: {page: 1}
                }
            },
            computed: {
                sdata: function() {
                    return [];
                }
            },
            methods:{
                checklist: function(list) {

                },

                loadList: function() {
                    this.load = !this.load;
                },
                pagechange: function(d){
                    if(!d.page) return false;
                    this.searchParams.page = d.page;
                    this.loadList();
                },
            }
    }
</script>