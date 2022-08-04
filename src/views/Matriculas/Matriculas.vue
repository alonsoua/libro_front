<template>
  <b-row>
    <b-col cols="12">
      <matriculas-wizard />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import MatriculasWizard from './MatriculasWizard.vue'

export default {
  components: {
    BRow,
    BCol,
    MatriculasWizard,
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
