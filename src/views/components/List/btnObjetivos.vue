<template>
  <div
    class="d-flex justify-content-center"
  >
    <div
      v-for="(objetivo, index) in objetivosBtns"
      :key="index"
    >
      <b-button
        :variant="setColor(objetivo.puntajes_indicadores, objetivo.puntajes_indicadores_personalizado)"
        class="btn-sm"
        style="padding: 6px 3px 6px 3px !important; margin-right: 2px !important; margin-top: 1px !important; min-width: 60px !important"
        :title="objetivo.nombreObjetivo"
        @click="$emit('processBtn', objetivo)"
      >

        <span class="align-middle">{{colorBtn}} {{ objetivo.abreviatura }}</span>
        <br>
        <feather-icon
          v-if="objetivo.priorizacion !== null"
          icon="StarIcon"
          size="12"
          style="margin-top: 2px !important;"
          :class="[{'fill-current': objetivo.priorizacion === 1 }]"
        />
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
  },
  data() {
    return {
      objetivosBtns: [],
      colorBtn: null,
    }
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    objetivos: {
      type: Array,
      required: true,
    },
  },
  watch: {
    objetivos() {
      this.setObjetivos()
    },
  },
  mounted() {
    this.setObjetivos()
  },
  methods: {
    setObjetivos() {
      const { key } = this.field
      this.objetivosBtns = this.objetivos.filter(ob => ob.idEje === Number(key))
    },
    setColor(cantidadIndicadoresTrabajados, cantidadIndicadoresTrabajadosPersonalizados) {
      let colorBtn = null
      if (cantidadIndicadoresTrabajados > 0 || cantidadIndicadoresTrabajadosPersonalizados > 0) {
        colorBtn = 'relief-success'
      } else if (cantidadIndicadoresTrabajados === 0 && cantidadIndicadoresTrabajadosPersonalizados === 0) {
        colorBtn = 'relief-primary'
      }
      return colorBtn
    },
  },
}
</script>
