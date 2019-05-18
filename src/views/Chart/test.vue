<template>
  <div>
    <!-- {{ $t("message")["app.dashboard.analysis.timeLabel"] }} -->
    <Chart :option="chartData" style="height:400px" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Chart from "../../components/Chart.vue";
import random from "lodash/random";

@Component({
  components: {
    Chart
  }
})
export default class ChartTest extends Vue {
  private interval: any;
  private chartData: any = {
    title: {
      text: "ECharts 入门示例"
    },
    tooltip: {},
    legend: {
      data: ["销量"]
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
  mounted() {
    this.interval = setInterval(() => {
      this.chartData.series[0].data = this.chartData.series[0].data.map(() =>
        random(100)
      );
      //注意 这里需要拷贝触发chart渲染效果,也可以直接在chart组件深度监听(比现在这种方式耗性能)
      this.chartData = { ...this.chartData };
    }, 3000);
  }
  beforeDestroy() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
