<template>
  <b-tabs
    class="mt-2"
    vertical
    nav-wrapper-class="nav-vertical"
    active-tab-class="font-weight-bold"
    fill
  >
    <b-tab
      active
      lazy
      title="Docentes"
    >
      <docentes />
    </b-tab>
    <b-tab
      lazy
      title="Docentes PIE"
    >
      <docentes-pie />
    </b-tab>
    <b-tab
      lazy
      title="Especialistas"
    >
      <especialistas />
    </b-tab>
    <b-tab
      lazy
      title="Coordinación"
    >
      <coordinacion />
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab, BCardText, BCard } from 'bootstrap-vue'

import docentes from './IdentificacionEquipo/Docentes.vue'
import especialistas from './IdentificacionEquipo/Especialistas.vue'
import docentesPie from './IdentificacionEquipo/DocentesPie.vue'
import coordinacion from './IdentificacionEquipo/Coordinacion.vue'

export default {
  components: {
    BCardText,
    BTabs,
    BTab,
    BCard,

    // componentes
    docentes,
    especialistas,
    docentesPie,
    coordinacion,
  },
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>
