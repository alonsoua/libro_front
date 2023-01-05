<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
    v-if="$can('read', 'notas')"
  >
    <asistencias-alumnos-horario
      :diaSelected="diaSelected"
      :mesSelected="mesSelected"
    />
    <b-table
      striped
      small
      hover
      noCollapse
      bordered
      class="mt-0 rounded"
      responsive
      :fields="fields"
      :items="items"
      @head-clicked="clickTitleTable"
    >
      <!-- caption-html="aaa" -->
      <!-- @head-clicked="" -->
      <!-- Cargando -->
      <template #table-busy>
        <div class="text-center text-danger my-1">
          <spinner />
        </div>
      </template>

      <!-- <template #cell(nombre_completo)="data">
        <div class="text-center text-danger my-1">
          aaaaaaaaa
        </div>
      </template> -->

      <template
        #cell()="data"
      >
        <div
          v-if="data.field.key == 'num_lista'"
        >
          {{ data.item.id }}
        </div>

        <div
          v-else-if="data.field.key == 'rut'"
        >
          {{ data.item.rut }}-{{data.item.dv}}
        </div>

        <div
          v-else-if="data.field.key == 'nombre_completo'"
        >
          {{ data.item.nombre }} {{ data.item.primer_apellido }} {{ data.item.segundo_apellido }}
        </div>


        <asistencia-alumno-dia
          v-else-if="data.field.dia"
          :item.sync="data.item"
          :field="data.field"
          :tipoAsistencia.sync="tipoAsistencia"
        />

      </template>

    </b-table>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BButtonGroup, BAvatar, BOverlay, BCard, BTab, BTabs,
  BFormRadioGroup, BTable, BCardText,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

import { mapGetters, mapActions } from 'vuex'

// COMPONENTES RECICLADOS
import spinner from '../../../../components/spinner.vue'

// COMPONENTES HIJOS
import AsistenciaAlumnoDia from './components/AsistenciaAlumnoDia.vue'
import AsistenciasAlumnosHorario from '../AsistenciasDia/AsistenciasAlumnosHorario.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BButtonGroup,
    BFormRadioGroup,
    BAvatar,
    BOverlay,
    BCard,
    BTab,
    BTabs,
    BTable,
    BCardText,

    // COMPONENTES RECICLADOS
    spinner,
    // COMPONENTES HIJOS
    AsistenciaAlumnoDia,
    AsistenciasAlumnosHorario,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      cargando: false,

      items: [],
      tipoAsistencia: [],
      diaSelected: {},

      fields: [
        {
          key: 'num_lista',
          label: '#',
          // sortable: true,
          variant: 'primary',
          thStyle: {
            width: '5px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'rut',
          label: 'Rut',
          // sortable: true,
          thStyle: {
            width: '150px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'nombre_completo',
          label: 'Nombre',
          // sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getAsistenciasMensual: 'asistencias/getAsistenciasMensual',
      getTipoAsistencia: 'asistencias/getTipoAsistencia',
      // getBloques: 'bloques/getBloques',
      // getLibroSelected: 'libros/getLibroSelected',
    }),
  },
  props: {
    mesSelected: {
      type: Number,
      required: true,
    },
  },
  watch: {
    getAsistencias(val) {
      this.cargaItems(val)
    },
    getAsistenciasMensual(val) {
        // this.totalRows = val.length
        this.items = []
        this.items = val
        this.cargarDias(val[0]['dias'])
    },
    getTipoAsistencia(val) {
      this.tipoAsistencia = val
    },
  },
  mounted() {
    this.cargarTipoAsistencia()
  },
  methods: {
    ...mapActions({
      fetchTipoAsistencia: 'asistencias/fetchTipoAsistencia',
    }),
    cargarTipoAsistencia() {
      this.fetchTipoAsistencia().then(() => {})
    },
    cargarDias(dias) {
      const hoy = new Date();
      dias.forEach(dia => {
        let variant = ''
        if (hoy.getDate() === dia.numeroDia) {
          variant = 'info'
        } else if (dia.isWeek) {
          variant = 'secondary'
        }
        this.fields.push(
          {
            key: 'dia_'+dia.numeroDia,
            label: dia.nombreDia+' '+dia.numeroDia,
            tdClass: 'text-center',
            variant,
            thVariant: variant,
            dia: true,
            numeroDia: dia.numeroDia,
            tipoAsistencia: dia.tipoAsistencia,
            isWeek: dia.isWeek,
            thStyle: {
              'cursor' : dia.isWeek ? '' : 'pointer',
              'text-align': 'center',
              width: '5px !important',
              display: 'table-cell',
              'vertical-align': 'middle',
            },
          },
        )
      })
    },
    clickTitleTable(key, field) {
      if (!field.isWeek) {
        this.diaSelected = field
        this.$bvModal.show('asistencia_dias')
      }
    },
  },
}
</script>
