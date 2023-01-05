<template>
    <!-- :style="`margin: -2px !important; background: ${color};`" -->
  <div
    :class="` border ${color};`"
  >
    <spinner
      v-if="showSpinner"
      size="small"
    />
    <!-- v-if= -->
      <!-- v-else-if="$can('update', 'notas')" -->
    <b-form-input
      v-model="nota"
      size="xs"
      :class="textColor"
      @keyup="changeNota"
      @blur="addNota"
    />
    <!-- <div
      v-else
      :style="`color: ${textColor}`"
    >
      {{ puntaje ? puntaje : '-' }}
    </div> -->

  </div>
</template>

<script>
import { BFormInput, VBTooltip } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES RECICLADOS
import spinner from '../../../../components/spinner.vue'

export default {
  components: {
    BFormInput,

    // COMPONENTES RECICLADOS
    spinner,
  },
  data() {
    return {
      showSpinne: false,
      nota: 0,
      color: null,
      textColor: null,
      puntajesOption: [],
      autores: null,
    }
  },
  directives: {
    'b-tooltip': VBTooltip,
    // Ripple,
  },
  mixins: [formatos],
  props: {
    item: {
      type: Object,
      required: true,
    },
    field: {
      type: Object,
      required: true,
    },
    modulo: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      // getUser: 'auth/user',
    }),
    showSpinner() {
      return false
    },
  },
  watch: {
  },
  mounted() {
    if (this.item.notas.length > 0) {
      this.setNotas(this.item.notas, this.field)
    }
  },
  methods: {
    ...mapActions({
      // addNota: 'notas/addNota',
      // updateNota: 'notas/updateNota',
      // updatePuntajeIndicador: 'puntajesIndicadores/updatePuntajeIndicador',
      // fetchPuntajesIndicadores: 'puntajesIndicadores/fetchPuntajesIndicadores',
      // calcularNota: 'notas/calcularNota',
    }),
    limpiaNota(nota) {

    },
    changeNota() {
      this.nota = this.formatNota(this.nota)
      this.formatColor(this.nota)
    },
    addNota() {
      if (this.nota.length === 1  && parseInt(this.nota) !== 0) {
        const cero = 0
        this.nota = this.nota[0]+''+cero
        if (parseInt(this.nota) > 70) {
          this.nota = 70
        }
      }
      if (!this.id_nota) { // CREATE
        if (parseInt(this.nota) !== 0) {

          const data = {
            id_alumno: this.item.id_alumno,
            id_evaluacion: this.id_evaluacion,
            nota: this.nota,
          }
          console.log('CREATE nota data', data)
        }
      } else { // UPDATE
        const nota = this.item.notas.find(n => n.id_evaluacion === Number(this.field.id_evaluacion))
        if (parseInt(this.nota) !== nota.nota) {
          const data = {
            id_nota: this.id_nota,
            nota: this.nota,
          }
          console.log('UPDATE nota data', data)
        }
      }
    },
    setNotas(notas, field) {
      if (field.evaluacion) {
        const nota = notas.find(n => n.id_evaluacion === Number(field.id_evaluacion))
        this.nota = typeof nota !== 'undefined'
          ? nota.nota
          : 0
        this.id_nota = typeof nota !== 'undefined'
          ? nota.id
          : null
        this.id_evaluacion = field.id_evaluacion

        this.formatColor(this.nota)
      }
    },
  },
}
</script>
