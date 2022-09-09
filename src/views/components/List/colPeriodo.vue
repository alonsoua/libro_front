<template>
  <div>
    <spinner
      v-if="showSpinner"
      size="small"
    />
    <!-- v-if= -->
      <!-- v-else-if="$can('update', modulo)" -->
    <b-form-select
      v-else-if="false"
      v-model="data.idPeriodoActivo"
      placeholder="Selecciona el periodo"
      :options="periodosOption"
      label="text"
      :state="!data.idPeriodoActivo
        ? false
        : true"
      :reduce="option => option.value"
      size="sm"
      class="mt-1 mb-1"
      @change="$emit('processUpdatePeriodo', data)"
    />
      <!-- v-else -->
    <b-badge
      :variant="nombrePeriodoActivo === null
        ? 'light-danger'
        : 'light-success'"
    >
      {{
        nombrePeriodoActivo === null
          ? 'Sin periodo'
          : nombrePeriodoActivo
      }}
    </b-badge>

  </div>
</template>

<script>
import { BFormSelect, BBadge } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
import spinner from '../spinner.vue'

export default {
  components: {
    BFormSelect,
    BBadge,

    spinner,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    modulo: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getPeriodos: 'periodos/getPeriodos',
      getUser: 'auth/user',
    }),
    showSpinner() {
      return this.periodosOption.length === 0
    },
  },
  data() {
    return {
      periodosOption: [],
      nombrePeriodoActivo: null,
    }
  },
  watch: {
    getPeriodos(periodos) {
      this.setPeriodosOptions(periodos)
      this.setPeriodosActivo(periodos)
    },
  },
  mounted() {
    this.fetchPeriodos()
    this.attempt()
    if (typeof this.data.idPeriodoActivo === 'undefined') {
      this.data.idPeriodoActivo = 2
      const periodos = [
        { id: 1, nombre: '2021' },
        { id: 2, nombre: '2022' },
      ]
      this.setPeriodosOptions(periodos)
      this.setPeriodosActivo(periodos)
    }
  },
  methods: {
    ...mapActions({
      fetchPeriodos: 'periodos/fetchPeriodos',
      attempt: 'auth/attempt',
    }),
    setPeriodosOptions(periodos) {
      this.periodosOption = [{ value: null, text: 'Seleccione un periodo' }]
      periodos.forEach(periodo => {
        if (periodo.id >= this.data.idPeriodoActivo
        || this.data.idPeriodoActivo === null) {
          this.periodosOption.push({
            value: periodo.id,
            text: periodo.nombre,
          })
        }
      })
    },
    setPeriodosActivo(periodos) {
      periodos.forEach(periodo => {
        if (periodo.id === this.data.idPeriodoActivo) {
          this.nombrePeriodoActivo = periodo.nombre
        }
      })
    },
  },
}
</script>
