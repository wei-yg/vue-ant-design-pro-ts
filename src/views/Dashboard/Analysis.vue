<template>
  <div style="padding:30px">
    <p>{{ $t("message")["app.dashboard.analysis.timeLabel"] }}</p>
    <a-date-picker></a-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Analysis extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
