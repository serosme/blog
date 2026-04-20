# Vue Router

## 基于文件的路由

::: code-group

```ts [src\router\index.ts]
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

```ts [src\main.ts]
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

:::
