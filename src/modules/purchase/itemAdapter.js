export default function adapterData(d) {
        for (var i = 0; i < d.length; i++) {
           let one = d[i]; // 单条数据
           // 页面端  使用库存和采购数量
           one.use_stores = one.use_stores.def || "";
           one.U_Pquantity = one.U_Pquantity.def || "";
        }
    return d
}
