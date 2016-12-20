export default function adapter(d) {
     for(let i = 0; i < d.length; i++) {
           let one = d[i];
        //    delete one.selected;
           if(i == d.length-1) one.selected = true
           else one.selected = false
           for(let j in one) {
               if(!one[j].defCss) continue;
               let s = one[j].def;
               one[j] = s;
           }
           for(let g = 0; g < one.sub_data.sub_list.length; g++) {
               let sone = one.sub_data.sub_list[g];
            //    delete sone.checked;
               for(let j in sone) {
                  if(!sone[j].defCss) continue;
                  let s =  sone[j].def;
                  sone[j] =  s;
               }
           }
      }
      return d;
}