export default function adapterData(d) {
    for (var key in d) {
        let item = d[key];

        for (var i = 0; i < item.list.length; i++) {
           let one = item.list[i]; // 单条数据
           // 页面端  销售数量  这里格式化一下
           if(one.buyCounts) one.sale_counts = one.buyCounts.def || 0;
           delete one.buyCounts;
        }
    }
    return d
}
