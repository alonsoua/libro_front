<template>
  <div>
    <b-badge
      button
      :variant="variant"
      :title="title"
    >
      {{ texto }}
    </b-badge>

  </div>
</template>

<script>
import { BBadge } from 'bootstrap-vue'

export default {
  components: {
    BBadge,
  },
  data() {
    return {
      variant: null,
      texto: null,
      title: null,
    }
  },
  props: {
    datos: {
      type: Object,
      required: true,
    },
  },
  watch: {
    datos() {
      this.setVariant(this.datos)
    },
  },
  mounted() {
    this.setVariant(this.datos)
  },
  methods: {
    setVariant(info) {
      let texto
      if (info.idDiagnostico === null
        && info.pie !== null) {
        texto = 'Diagnóstico no seleccionado'
        this.variant = 'danger'
        this.texto = texto
        this.title = texto
      } else if (info.idDiagnostico === null
          && info.pie === null) {
        texto = 'Sin Diagnóstico'
        this.variant = 'primary'
        this.texto = texto
        this.title = texto
      } else {
        const nombreDiagnostico = info.nombreDiagnostico.substr(0, 20)
        this.variant = 'info'
        this.texto = `${info.tipoNee} - ${nombreDiagnostico}`
        this.title = `${info.tipoNee} - ${info.nombreDiagnostico}`
      }
    },
  },
}
</script>
