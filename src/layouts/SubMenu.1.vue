<template functional>
  <a-sub-menu :key="menuInfo.path">
    <span slot="title">
      <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" /><span>{{
        menuInfo.meta.title
      }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="
          () =>
            $parent.$router.push({
              path: item.path,
              query: $parent.$route.query
            })
        "
      >
        <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SubMenu extends Vue {
  @Prop() private menuInfo!: any;

  public $parent: any;

  created() {
    console.log("menuInfo", this.menuInfo, this.$parent);
  }
}
</script>

<style scoped></style>
