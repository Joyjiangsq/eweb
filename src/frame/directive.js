export default class directive {
    init(Vue) {
        // 该指令用于接收组建作为的参数
        Vue.directive('widget', {
            terminal: true,
            bind: function() {
            },
            update: function(value) {
               let el = this.el;
               let dtpl = JSON.stringify(value.data);   // 对应数据 只能是字符串去传递  不知道怎么穿对象
               let widget = value.widget.component;
               let widgetName = value.widget.cname;
               if(!Vue.component(widgetName)) Vue.component(widgetName, widget);
               let html = `<${widgetName} datas=${dtpl}></${widgetName}>`;
               el.innerHTML = html;
               this.anchor = Vue.util.createAnchor('v-widget');//创建一些注释做锚点插入片段用
               Vue.util.replace(el, this.anchor);
               let factory = new Vue.FragmentFactory(this.vm, el);// 初始化实例 编译partial
               this.frag = factory.create(this._host, this._scope, this._frag);
               this.frag.before(this.anchor);
            }
        })

    }
}
