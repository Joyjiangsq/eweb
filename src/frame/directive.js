export default class directive {
    init(Vue) {
        // 该指令用于接收组建作为的参数
        Vue.directive('widget', {
            terminal: true,
            bind: function() {
            },
            update: function(value) {
               var el = this.el;
               var dtpl =  value.data;   // 对应数据 只能是字符串去传递  不知道怎么穿对象
               var widget = value.widget.component;
               var widgetName = value.cname;
               if(!Vue.component(widgetName)) {
                 Vue.component(widgetName, widget);
               }
               var html = `<${widgetName}></${widgetName}>`;
               el.innerHTML = html;
               this.anchor = Vue.util.createAnchor('v-widget');//创建一些注释做锚点插入片段用
               Vue.util.replace(el, this.anchor);
               var factory = new Vue.FragmentFactory(this.vm, el);// 初始化实例 编译partial
               this.frag = factory.create(this._host, this._scope, this._frag);
               this.frag.children[0].selfData = dtpl;  // 手动注入参数
               this.frag.before(this.anchor);
            }
        })

    }
}
