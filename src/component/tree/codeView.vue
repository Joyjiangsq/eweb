<template>
  <div>
    <div v-for="one in datas">
         <span>{{one.name}}</span>
         <div v-if="one.subTypes" v-for="sone in one.subTypes">
                <span>{{sone.name}}</span>
                <div v-if="sone.subTypes" v-for="mone in sone.subTypes">
                        <span>{{mone.name}}</span>
                </div>
         </div>
    </div>
  </div>
</template>

<script>
import css from './code.css';
export default {
    props: {
        level: {
            default: 3
        },

        url: {
            default:""
        },

        datas:{
            default: function(){
                return [
                    {name:"国民包", id:"1", subTypes:[{name:"瓷砖", id:"1", subTypes:[{name:"大地砖", id:"1"}， {name:"墙砖", id:"2"}]}]}
                ]
            }
        }
    },
    data(){
      return {
        css
      }
    }

}
</script>
