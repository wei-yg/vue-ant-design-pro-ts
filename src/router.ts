import Vue from "vue";
import Router, { RouteRecord } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";
import { check, isLogin } from "./util/auth";
import NotFound from "./views/NotFound.vue";
import Forbidden from "./views/Forbidden.vue";
import { notification } from "ant-design-vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
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
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard",
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
          path: "/chart",
          name: "chart",
          meta: { icon: "dashboard", title: "数据图" },
          component: { render: h => h("router-view") },
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
          component: { render: h => h("router-view") },
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
              hideChildrenInMenu:true,
              name: "stepform",
              meta: { title: "分布表单" },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/index.vue"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1.vue")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2.vue")
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3.vue")
                }
              ]
            }
          ]
        },
        {
          path: "/user",
          hideInMenu: true,
          component: () =>
            import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
          children: [
            {
              path: "/user",
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
          path: "/403",
          hideInMenu: true,
          name: "403",
          component: Forbidden
        },
        {
          path: "*",
          hideInMenu: true,
          name: "404",
          component: NotFound
        }
      ]
    }
  ]
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
