<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $route.push({ path: item.key, query: $route.query })"
        >
          <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta && item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import { check } from "../util/auth";
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
    collapsed: function() {
      this.openKeys = [];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = [];
      for (let menu of routes) {
        if (menu.meta && menu.meta.authority && !check(menu.meta.authority))
          break;
        if (menu.name && (menu.meta && !menu.meta.hideInMenu)) {
          this.openKeysMap[menu.path] = parentKeys;
          this.selectedKeysMap[menu.path] = [selectedKeys || menu.path];
          const newMenu = { ...menu };
          delete newMenu.children;
          if (menu.children && (menu.meta && !menu.meta.hideChildrenInMenu)) {
            newMenu.children = this.getMenuData(menu.children, [
              ...parentKeys,
              menu.path
            ]);
          } else {
            this.getMenuData(
              menu.children,
              selectedKeys ? parentKeys : [...parentKeys, menu.path],
              selectedKeys || menu.path
            );
          }
          menuData.push(newMenu);
        } else if (
          menu.meta &&
          !menu.meta.hideInMenu &&
          !menu.hideChildrenInMenu &&
          menu.children
        ) {
          menuData.push(
            ...this.getMenuData(menu.children, [...parentKeys, menu.path])
          );
        }
      }

      return menuData;
    }
  }
};
</script>
