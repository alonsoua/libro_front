<template>
    <!-- :style="`margin: -2px !important; background: ${color};`" -->
  <div class="text-center">
    <spinner
      v-if="showSpinner"
      size="small"
    />
    <b-row>
      <b-col md="1" class="">
      <!-- v-if= -->
      <!-- v-else-if="$can('update', 'notas')" -->
        <b-form-checkbox
          v-model="asistencia"
          class="mt-50 ml-25"
          size="md"
          :disabled="!asignatura"
          @change="chkAsistencia()"
        />

      </b-col>
      <b-col md="10" class="">
        <b-form-select
          v-model="tipo_asistencia"
          class="ml-25"
          :options="optionsTipoAsistencia"
          value-field="id"
          size="sm"
          text-field="nombre"
          :disabled="!asignatura"
          @change="changeTipoAsistencia()"
        >
        </b-form-select>
      </b-col>
    </b-row>
      <!-- @blur="addAsistencia" -->
    <!-- <div
      v-else
      :style="`color: ${textColor}`"
    >
      {{ puntaje ? puntaje : '-' }}
    </div> -->

  </div>
</template>

<script>
import {
  BFormCheckbox, VBTooltip, BFormSelect, BCol, BRow,
} from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES RECICLADOS
import spinner from '../../../../../components/spinner.vue'

export default {
  components: {
    BFormCheckbox,
    BFormSelect,
    BCol,
    BRow,

    // COMPONENTES RECICLADOS
    spinner,
  },
  data() {
    return {
      showSpinne: false,
      asistencia: false,
      asignatura: null,
      id_asistencia: null,
      id_bloque: null,
      tipo_asistencia: 1,
      optionsTipoAsistencia: [],
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
    tipoAsistencia: {
      type: Array,
      required: true,
    },
    asistenciasBloques: {
      type: Array,
      required: true,
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
  mounted() {
    this.setAsistencias(this.item.bloques, this.field)
    this.setTipoAsistencia(this.tipoAsistencia)
  },
  methods: {
    ...mapActions({
      // addNota: 'notas/addNota',
      // updateNota: 'notas/updateNota',
      // updatePuntajeIndicador: 'puntajesIndicadores/updatePuntajeIndicador',
      // fetchPuntajesIndicadores: 'puntajesIndicadores/fetchPuntajesIndicadores',
      // calcularNota: 'notas/calcularNota',
    }),
    setTipoAsistencia(tipoAsistencia) {
      this.optionsTipoAsistencia = []
      this.optionsTipoAsistencia = tipoAsistencia
    },
    setAsistencias(bloques, field) {
      if (field.bloque) {

        const bloque = bloques.find(n => n.id === Number(field.id_bloque))

        this.bloque = typeof bloque !== 'undefined'
          ? bloque.bloque
          : 0


        this.id_bloque = typeof bloque !== 'undefined'
          ? bloque.id
          : null
        this.id_bloque = field.id_bloque


        let tipo = ''
        if (typeof bloque.id_tipo_asistencia === 'undefined' || bloque.id_tipo_asistencia === null) {
          tipo = 2
          this.tipo_asistencia = 1
        } else {
          this.tipo_asistencia = bloque.id_tipo_asistencia
          tipo = this.tipo_asistencia >= 1 && this.tipo_asistencia <= 5
            ? 2 // presente
            : 1 // ausente
        }

        if (bloque.tipo === null) {
          this.asistencia = false // PRESENTE
        }else {
          this.asistencia = bloque.tipo === 1
            ? true // AUSENTE
            : false // PRESENTE
        }

        this.asignatura = bloque.nombre_asignatura
        this.setAsistenciaBloque()
      }
    },
    chkAsistencia() {
      if (!this.asistencia) { // false = presente
        this.tipo_asistencia = 1
      } else {                // true = ausente
        this.tipo_asistencia = 16
      }
      this.setAsistenciaBloque()
    },
    changeTipoAsistencia(){
      if (this.tipo_asistencia >= 1 && this.tipo_asistencia <= 5 ) {
        this.asistencia = false // PRESENTE
      } else {
        this.asistencia = true // AUSENTE
      }
      this.setAsistenciaBloque()
    },
    setAsistenciaBloque() {
      const alumno = this.asistenciasBloques.find(ab => ab.id === this.item.id)
      const bloque = alumno.bloques.find(b => b.id === this.id_bloque)
      bloque.tipoAsistencia = this.tipo_asistencia
    }
  },
}
</script>
