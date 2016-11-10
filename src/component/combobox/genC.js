var data = require("./cySrc.json");
var fs = require("fs");
//格式化地址字段
for (var i = 0; i < data.length; i++) {
   data[i].citys = data[i].city;
   delete  data[i].city;
   for (var j = 0; j < data[i].citys.length; j++) {
     var cn = [];
     var t =  data[i].citys[j];
     if(t.name.indexOf("市") == -1 || t.name.indexOf("区") == -1) {
       if(t.name.length < 3) t.name = t.name + "市"
     }
     for (var g = 0; g < t.area.length; g++) {
        var a = t.area[g];
        cn.push({name: a});
     }
     t.areas = cn;
     delete t.area;
   }
}
fs.writeFile('city.json', JSON.stringify(data),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
});
