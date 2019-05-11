<template>
  <div>
    <AntPageHeader
      title="分步表单"
      desc="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
    />
    <div class="stopFormBox">
      <a-steps
        :current="currentStepIndex"
        style="max-width:750px;margin:0 auto"
      >
        <a-step
          v-for="item in stepInfo"
          :key="item.title"
          :title="item.title"
        ></a-step>
      </a-steps>
      <div class="stepIndexBox">
        <router-view></router-view>
      </div>
    </div>

    <!-- <div class="btnBox">
      <a-button @click="goTo('/form/step-form/info')">第一步</a-button>
      <a-button @click="goTo('/form/step-form/confirm')">第二步</a-button>
      <a-button @click="goTo('/form/step-form/result')">第三步</a-button>
    </div> -->
  </div>
</template>

<script lang="ts">
import AntPageHeader from "../../../components/AntPageHeader/AntPageHeader.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: { AntPageHeader }
})
export default class StepForm extends Vue {
  // 当前步骤
  private currentStepIndex: number = 0;

  // 步骤介绍
  private stepInfo: Array<Object> = [
    { title: "填写转账信息" },
    { title: "确认转账信息" },
    { title: "完成" }
  ];

  created() {}

  @Watch("$route.path")
  changRouter(val: any) {
    let currentRoute: any = this.$route.matched.find(
      (item): any => item.path === val
    );
    if (currentRoute.meta.step === undefined) {
      throw new Error("步骤需要配合路由meta.step字段");
    }
    this.currentStepIndex = currentRoute.meta.step;
  }

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
.stopFormBox {
  margin: 24px 24px 0 24px;
  background: #ffffff;
  padding: 24px;
  border-radius: 2px;
}
.stepIndexBox {
  padding-top: 40px;
}
</style>
