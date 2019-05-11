<template>
  <div class="ant-page-header">
    <div style="margin-bottom:12px">
      <Breadcrumb></Breadcrumb>
    </div>
    <h4 style="font-size:20px">
      {{ title || ($route.meta && $route.meta.title) }}
    </h4>
    <div style="margin-top:12px;">
      <span v-if="desc" style="color:rgba(0,0,0,.65);font-size:14px;">{{
        desc
      }}</span>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script lang="ts">
/***
 * 内容页面组件头部
 * 有默认插槽
 */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Breadcrumb from "../AntPageHeader/Breadcrumb.vue";
@Component({
  components: {
    Breadcrumb
  }
})
export default class AntPageHeader extends Vue {
  // 标题
  @Prop({ default: "" })
  private title?: string;

  // 描述
  @Prop({ default: "" })
  private desc?: string;
}
</script>

<style scoped>
.ant-page-header {
  padding: 16px 32px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}
</style>
