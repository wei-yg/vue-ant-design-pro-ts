# ant-design-pro-ts

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### 问题
##### 在router.ts中,tsLint检查hideInMenu和hideChildrenInMenu会报错(不影响运行)
##### 解决办法: 修改node_modules/vue-router/types/router.d.ts (如大家有其他更好的方法,请告诉我)
##### 找到如下代码
```
export interface RouteConfig {
  path: string;
  name?: string;
  component?: Component;
  components?: Dictionary<Component>;
  redirect?: RedirectOption;
  alias?: string | string[];
  children?: RouteConfig[];
  meta?: any;
  beforeEnter?: NavigationGuard;
  props?: boolean | Object | RoutePropsFunction;
  caseSensitive?: boolean;
  pathToRegexpOptions?: PathToRegexpOptions;
}
```
##### 修改成(添加自定义属性的声明)
```
export interface RouteConfig {
  path: string;
  name?: string;
  component?: Component;
  components?: Dictionary<Component>;
  redirect?: RedirectOption;
  alias?: string | string[];
  children?: RouteConfig[];
  meta?: any;
  beforeEnter?: NavigationGuard;
  props?: boolean | Object | RoutePropsFunction;
  caseSensitive?: boolean;
  pathToRegexpOptions?: PathToRegexpOptions;
  hideChildrenInMenu?:boolean;
  hideInMenu?:boolean;
}
```
