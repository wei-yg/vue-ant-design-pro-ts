<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in matched" :key="item.path">
      <router-link :to="item.path || '/'">{{
        item.path === "" ? "首页" : item.meta && item.meta.title
      }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
/***
 * 面包屑导航
 */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Breadcrumb extends Vue {
  private matched: Array<any> = [];

  @Watch("$route.path")
  changRoute(val: any) {
    this.matched = this.$route.matched;
  }

  created() {
    this.matched = this.$route.matched;
  }
}
</script>

<style scoped></style>
