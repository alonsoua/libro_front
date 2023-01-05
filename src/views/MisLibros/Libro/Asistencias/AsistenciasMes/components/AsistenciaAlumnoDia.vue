<template>
    <!-- :style="`margin: -2px !important; background: ${color};`" -->
  <div class="text-center">
    <spinner
      v-if="showSpinner"
      size="small"
    />
    {{ tipo_asistencia }}
  </div>
</template>

<script>
import { VBTooltip } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES RECICLADOS
import spinner from '../../../../../components/spinner.vue'


export default {
  components: {
    // COMPONENTES RECICLADOS
    spinner,
  },
  data() {
    return {
      showSpinner: false,
      tipo_asistencia: {},
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
    tipoAsistencia: {
      type: Array,
      required: true,
    },
    modulo: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      // getTipoAsistencia: 'asistencias/getTipoAsistencia',
    }),
  },
  mounted() {
    this.setDias(this.item.dias, this.field)
  },
  methods: {
    ...mapActions({
    }),
    setDias(dias, field) {
      if (field.dia) {

        const dia = dias.find(n => n.numeroDia === Number(field.numeroDia))
        const tipo_asistencia = this.tipoAsistencia.find(ta => ta.id === Number(dia.tipo_asistencia))

        this.tipo_asistencia = dia.tipo_asistencia === null
          ? '-'
          : tipo_asistencia
      }
    },
  },
}
</script>
