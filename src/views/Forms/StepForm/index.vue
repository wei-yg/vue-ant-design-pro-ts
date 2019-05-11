<template>
  <div>
    <div>分布表单</div>
    <Breadcrumb></Breadcrumb>
    <div class="btnBox">
      <a-button @click="goTo('/form/step-form/info')">第一步</a-button>
      <a-button @click="goTo('/form/step-form/confirm')">第二步</a-button>
      <a-button @click="goTo('/form/step-form/result')">第三步</a-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "../../../components/Breadcrumb.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: { Breadcrumb }
})
export default class StepForm extends Vue {
  goTo(path: string) {
    this.$router.push({ path, query: this.$route.query });
  }
}
</script>

<style scoped>
.btnBox button {
  display: flex;
  justify-content: space-between;
}
</style>
