<template>
    <div>
        <div v-for="one in datas" :class="css.loneBox">
            <span @click="levelClick(one)" :class="css.toper">
                <span v-if="one.subTypes">
                     <icon iconname="icon-right2" v-if="!one.show"></icon>
                     <icon iconname="icon-down02" v-else></icon>
                </span>
            </span>
            <span @click="oneClickHandler(1,one)"  :class='[one.selected?css.selected:"", css.itemOne]'>
                <span :class='["elip", css.tText]'>{{one.name}}</span>
                <span :class='css.addBtn' v-if="edit">
                    <icon iconname="icon-add"  @click="addHandler(1,one)"></icon>
                    <icon iconname="icon-edit"  @click="editHandler(1,one)"></icon>
                    <icon iconname="icon-delete"  @click="deleteHandler(1,one)"></icon>
                </span>
            </span>
            <div v-for="sone in one.subTypes" v-show="one.show" :class="css.ltwoBox">
                <span @click="levelClick(sone)" :class="css.toper">
                    <span  v-if="sone.subTypes">
                        <icon iconname="icon-right2" v-if="!sone.show"></icon>
                        <icon iconname="icon-down02" v-else></icon>
                    </span>
                </span>
                <span  @click="oneClickHandler(2,one, sone)" :class='[sone.selected?css.selected:"", css.itemOne]'>
                    <span :class='["elip", css.wText]' >{{sone.name}}</span>
                    <span :class='css.addBtn' v-if="edit">
                        <icon iconname="icon-add" @click="addHandler(2,one, sone)"></icon>
                        <icon iconname="icon-edit"  @click="editHandler(2,one, sone)"></icon>
                        <icon iconname="icon-delete"  @click="deleteHandler(2,one, sone)"></icon>
                    </span>
                </span>
                <div v-for="mone in sone.subTypes" v-show="sone.show"  :class="css.lthreeBox">
                    <span  @click="oneClickHandler(3,one, sone, mone)"  :class='[mone.selected?css.selected:"", css.itemOne]'>
                        <span :class='["elip", css.lText]'>{{mone.name}}</span>
                        <span :class='css.addBtn' v-if="edit">
                            <icon iconname="icon-edit"  @click="editHandler(3,one, sone, mone)"></icon>
                            <icon iconname="icon-delete"  @click="deleteHandler(3,one, sone, mone)"></icon>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import css from './code.css';
import icon from "component/sprite/icon";
export default {
    props: {
        level: {
            default: 3
        },

        url: {
            default:""
        },
        edit: {
            default: true
        },
        datas:{
            default: function(){
                return [
                    {name:"国民包", id:"1", show:false, selected:false, subTypes:[{name:"瓷砖", id:"1",show:false, selected:false, subTypes:[{name:"大地地砖",selected:false,  id:"1"},{name:"墙砖", selected:false, id:"2"}]}]},
                    {name:"国民包2", id:"2", selected:false, show:false, subTypes:[{name:"达到是", id:"1", show: false, selected: false}]}
                ]
            }
        }
    },
    data(){
      return {
        css,
        oldData:{selected: false}
      }
    },
    methods:{
        levelClick: function(d){
            d.show = !d.show;
        },
        // 单个点击
        oneClickHandler: function(level, one, sone, mone) {
            if(level == 1) this.revieOne(one)
            else if(level == 2) this.revieOne(sone)
            else if(level == 3)this.revieOne(mone)
            this.$dispatch("treeclick", {
                level: level,
                one: one,
                sone: sone,
                mone:mone
            });
        },
        // 新增
        addHandler: function(level, one, sone) {
            this.$dispatch("addclick", {
                level: level,
                one: one,
                sone: sone
            });
        },
        // 编辑
        editHandler: function(level, one, sone, mone) {
            this.$dispatch("editclick", {
                level: level,
                one: one,
                sone: sone,
                mone:mone
            });
        },
        // 删除
        deleteHandler: function(level, one, sone, mone) {
            this.$dispatch("deleteclick", {
                level: level,
                one: one,
                sone: sone,
                mone:mone
            });
        },

        revieOne: function(one) {
                this.oldData.selected = false;
                one.selected = true;
                this.oldData = one;
        }
    },
    components:{icon}

}
</script>