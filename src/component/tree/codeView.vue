<template>
    <div>
        <div v-for="one in datas" :class="css.loneBox">
            <span @click="levelClick(one)" :class="css.toper">
                <span v-if="one.lv2">
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
            <div v-for="sone in one.lv2" v-show="one.show" :class="css.ltwoBox">
                <span @click="levelClick(sone)" :class="css.toper">
                    <span  v-if="sone.lv3">
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
                <div v-for="(index,mone) in sone.lv3" v-show="sone.show"  :class="css.lthreeBox">
                    <span  @click="oneClickHandler(3,one, sone, mone)"  :class='[mone.selected?css.selected:"", css.itemOne]'>
                        <span :class='["elip", css.lText]'>{{mone.name}}</span>
                        <span :class='css.addBtn' v-if="edit">
                            <icon iconname="icon-edit"  @click="editHandler(3,one, sone, mone,index)"></icon>
                            <icon iconname="icon-delete"  @click="deleteHandler(3,one, sone, mone,index)"></icon>
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
import Utils from "common/Utils";
export default {
    props: {
        level: {
            default: 3,
            type: Number
        },
        reload: {
            default: false
        },
        params: {
            default: () => {},
            type:Object
        },
        url: {
            default:"",
            type:String
        },
        edit: {
            default: true,
            type:Boolean
        },
        datas:{
            default: () =>  [ { "_id": "584e44dfbd0688fb7008bb7b", "code": "MC001", "name": "cizhuan", 
            "lv2": [ { "code": "M2002", "name": "erji02", "show": false, "selected": false }, { "code": "M2003", "name": "ddz", "Valid": false, 
            "lv3": [ { "code": "M3001", "name": "大地砖4", "show": false, "selected": false }, { "code": "M3002", "name": "大地砖4", "show": false, "selected": false } ], "show": false, "selected": true } ],
             "show": true, "selected": false } ],
            type:Array
        }
    },
    data(){
      return {
        css,
        oldData:{selected: false}
      }
    },
    ready: function () {
        this.getData();
    },
    methods:{
        getData: function(){
            console.log('getdata');
            this.$http.get(this.$Api+this.url, {params:this.params}).then((res) => {
                let d = res.json();
                let p = d.data.docs.map((one) => {
                    one.show = false;
                    one.selected = false;
                    if(!one.lv2) return  Utils.cloneObj(one)
                    one.lv2.map((sone) => {
                        sone.show=false; 
                        sone.selected=false;
                        if(!sone.lv3) return sone;
                        sone.lv3.map((ssone) => {ssone.show=false; ssone.selected=false;return ssone})
                        return sone
                    });
                   
                    return Utils.cloneObj(one)
                })
                console.log(p);
                this.datas = p;
            },(error) =>{
                console.log(error);
            })
        },
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
        editHandler: function(level, one, sone, mone,index) {
            this.$dispatch("editclick", {
                level: level,
                one: one,
                sone: sone,
                mone:mone,
                index:index
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
    components:{icon},
    watch: {
        "reload": function(){
            this.getData();
        }
    }
}
</script>