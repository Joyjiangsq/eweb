export function routerStart(router) {
      router.map({
          "/index": {
              name:"index",
              component: function(resovle) {require(['modules/index.vue'], resovle)},
          },

          "/": {
              component: function(resovle) {require(['modules/index.vue'], resovle)},
          },

          "/userMgr": {
              component: function(resovle) {require(['modules/userMgr.vue'], resovle)},
          },

          "/customMgr": {
              component: function(resovle) {require(['modules/customMgr.vue'], resovle)},
          }
      })

      // redirect
      router.redirect({

      })

      // global before
      // 3 options:
      // 1. return a boolean
      // 2. return a Promise that resolves to a boolean
      // 3. call transition.next() or transition.abort()
      router.beforeEach((transition) => {
          transition.next();
      })
}
