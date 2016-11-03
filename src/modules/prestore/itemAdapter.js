export default function adapterData(d) {
    for (var key in d) {
        let item = d[key];
        if(item.list.length == 0) {
          delete d[key]
          continue;
        }
        for (var i = 0; i < item.list.length; i++) {
           let one = item.list[i]; // 单条数据
           for (var k in one) {
              if(typeof(one[k]) == "object") {
                  if(one[k].def == "" || one[k].def == 0) {  one[k] = one[k].def || ""}
                  else if(!one[k].def) {}
                  else one[k] = one[k].def
              }
           }
        }
    }
    return d
}
