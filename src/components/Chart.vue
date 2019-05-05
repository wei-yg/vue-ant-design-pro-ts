<template>
  <div ref="chartDom"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

@Component
export default class Chart extends Vue {
  @Prop() private option!: object;

  private chart: any;

  private resizeFun: any;

  public $refs: any;

  @Watch("option")
  watchOption(val: object) {
    this.chart.setOption(val);
  }

  created() {
    this.resizeFun = debounce(this.resize, 300);
  }

  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resizeFun);
  }

  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resizeFun);
    this.chart.dispose();
    this.chart = null;
  }

  resize() {
    this.chart.resize();
  }

  renderChart() {
    this.chart = echarts.init(this.$refs.chartDom);
    this.chart.setOption(this.option);
  }
}
</script>

<style scoped></style>
