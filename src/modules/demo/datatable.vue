<template>

    <tb :headercaption="headercaption" :loadtag="loadtag" ></tb>
</template>

<script>
import tb from "component/grid/tableListBase";
export default {
  data: function () {
    return {
      headercaption:[{name:"交易类型", labelValue:"type", type:"data"},{name:"订单号", labelValue:"orderid",type:"data"}, {name:"交易金额", labelValue:"cash",type:"data", attr:"price"},
                    {name:"交易日期", labelValue:"date",type:"data"},{name:"收款账号", labelValue:"account",type:"data"}, {name:"收款账号名称", labelValue:"name", type:"data"},
                    {type:"operator", name:"操作", labelCaption:[{name:"删除", action:"delete"},{name:"编辑",action:"edit"}]}],
      loadtag: false,

    }
  },

  ready: function () {},
  attached: function () {},
  methods: {},
  components: {tb},
}
</script>
