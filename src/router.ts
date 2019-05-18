import Vue from "vue";
import Router, { RouteRecord ,RouteConfig } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";
import { check, isLogin } from "./util/auth";
import NotFound from "./views/NotFound.vue";
import Forbidden from "./views/Forbidden.vue";
import { notification } from "ant-design-vue";
import RouterView from "./layouts/RouterView.vue";

Vue.use(Router);

// 为每一个路由添加meta
const addMeta = (routerList:Array<RouteConfig>):Array<RouteConfig> => {
  routerList.forEach(router => {
    if(!router.meta) router.meta = {};
    if(router.children){
      addMeta(router.children)
    }
  });
  return routerList
};

const routes = [
  {
    path: "/user",
    meta: { hideInMenu: true },
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        // meta:{},
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: RouterView,
        children: [
          {
            path: "/dashboard",
            meta:{},
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis.vue")
          }
        ]
      },
      {
        // 图表
        path: "/chart",
        name: "chart",
        meta: { icon: "dashboard", title: "数据图" },
        component: RouterView,
        children: [
          {
            path: "/chart",
            redirect: "/chart/test"
          },
          {
            path: "/chart/test",
            name: "chartTest",
            meta: { title: "柱状图" },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/Chart/test.vue")
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        component: RouterView,
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form"
          },
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm.vue")
          },
          // 表单
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分步表单", hideChildrenInMenu:true },
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/index.vue"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                meta: { title:"第一步", desc:"填写转账信息", step:0 },
                name: "info",
                component: () =>
                  import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1.vue")
              },
              {
                path: "/form/step-form/confirm",
                meta: { title:"第二步", desc:"确认转账信息", step:1  },
                name: "confirm",
                component: () =>
                  import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2.vue")
              },
              {
                path: "/form/step-form/result",
                meta: { title:"第三步",desc:"完成", step:2  },
                name: "result",
                component: () =>
                  import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3.vue")
              }
            ]
          }
        ]
      },
      
      {
        path: "/403",
        meta:{ hideInMenu: true },
        name: "403",
        component: Forbidden
      },
      {
        path: "*",
        meta:{ hideInMenu: true },
        name: "404",
        component: NotFound
      }
    ]
  }
];


/***
 * 注意 routes的每一项配置必须带meta 哪怕不需要 addMeta用来保证每个router都有meta属性
 * 建议 : 
 *  如果你想去掉addMeta(当路由足够大时,会有性能消耗,仅首次会执行一次)
 *  如果去掉addMeta,请自己手动确保每个router都有meta 如 上面 /user 的 meta:{}
 * 原因 : 
 *  菜单是根据路由显示的,meta属性中有hideInMenu和hideChildrenInMenu用来控制菜单的显示
 */

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: addMeta(routes)
});



router.beforeEach((to: { path: string; matched: RouteRecord[] | null | undefined; }, from: { path: string; }, next: { (arg0: { path: string; }): void; (arg0: { path: string; }): void; (): void; }) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  let record = <RouteRecord>findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({ path: "/user/login" });
    } else if (to.path !== "/403") {
      notification.error({
        message: "访问错误",
        description: "您暂无权限访问"
      });
      next({ path: "/403" });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
