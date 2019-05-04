/**
 * vue.js (入口文件)
 * 1. 将data,methods里面的属性挂载根实例中
 * 2. 监听 data 属性的变化
 * 3. 编译挂载点内的所有指令和插值表达式
 */

 console.log(1)
 class Vue {
     constructor( options={} ) {
         this.$el = options.el;
         this.$data = options.data;
         this.$methods = options.methods;
         debugger
        //  将data和methods挂在跟实例中
         this.proxy(this.$data);
         this.proxy(this.$methods);
        //  监听数据
        new Observer(this.$data);
        if ( this.$el ) {
            // 开始编译
            new Compile(this.$el)
        }
     }

     proxy( data={} ) {
        Object.keys(data).forEach(key=>{
            // 这里的this指向Vue的实例
            Object.defineProperty(this,key,{
                enumerable: true, //是否可枚举的
                configurable: true, //是否可配置的
                get() {
                    return data[key]
                },
                set(val) {
                    if ( data[key] === val ) return 
                    return val
                }
            })
        })
     }
 }

 ob = {
     el: '#app',
     data() {
         a:'1'
     }
 }

 let vue = new Vue(ob)
 console.log(vue)