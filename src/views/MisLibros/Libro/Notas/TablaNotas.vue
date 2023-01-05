<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
    v-if="$can('read', 'notas')"
  >
    <b-table
      striped
      small
      hover
      noCollapse
      class="mt-0"
      responsive
      :fields="fields"
      :items="items"
      @head-clicked="headTitulo(data)"
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
          {{ data.item.num_lista }}
        </div>

        <div
          v-else-if="data.field.key == 'nombre_completo'"
        >
          {{ data.item.nombre_completo }}
        </div>

        <nota-alumno-evaluacion
          v-else-if="data.field.evaluacion"
          :item.sync="data.item"
          :field="data.field"
        />

        <div
          v-else-if="data.field.key == 'promedio_primer'"
        >
          {{ data.item.promedio_primer }}
        </div>

        <div
          v-else-if="data.field.key == 'promedio_segundo'"
        >
          {{ data.item.promedio_segundo }}
        </div>

        <div
          v-else-if="data.field.key == 'promedio_final'"
        >
          {{ data.item.promedio_final }}
        </div>

      </template>

      <!-- <template #cell(nota_1)="data">
        {{ data.item}}
        <b-form-input
          :id="'nota_'+data.item.id"
          :value="data.item.nota"
        />
      </template> -->
      <!-- <div
        v-for="(evaluacion, key) in getEvaluaciones"
      >
        {{ key }}
        {{ evaluacion }}
      </div> -->
      <!-- <template #cell(n2)="data">
        <b-form-input
          :id="'n2-'+data.item.id"
          placeholder="Ingresa el nombre del participante"
          :value="data.item.n2"
        />
      </template> -->

      <!-- <template #cell(promedio_primer)="data">
        <div class="text-primary">{{ data.item.promedioPrimer}}</div>
      </template>

      <template #cell(promedio_segundo="data">
        <div class="text-primary">{{ data.item.promedioPrimer}}</div>
      </template>

      <template #cell(promedio_final)="data">
        <div class="text-primary">{{ data.item.promedioFinal}}</div>
      </template> -->

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
import spinner from '../../../components/spinner.vue'

// COMPONENTES HIJOS
import NotaAlumnoEvaluacion from './components/NotaAlumnoEvaluacion.vue'


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
    NotaAlumnoEvaluacion,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      cargando: false,

      items: [],

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
          key: 'nombre_completo',
          label: 'Estudiantes',
          // sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
      ],

      fieldsSemestral: [
        {
          key: 'promedio_primer',
          label: 'I SEM',
          tdClass: 'text-center',
          variant: 'success',
          thStyle: {
            'text-align': 'center',
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'promedio_segundo',
          label: 'II SEM',
          tdClass: 'text-center',
          variant: 'success',
          thStyle: {
            'text-align': 'center',
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'promedio_final',
          label: 'Final',
          tdClass: 'text-center',
          variant: 'primary',
          thStyle: {
            'text-align': 'center',
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
      ],

      fieldsTrimestral: [
        {
          key: 'promedio_primer',
          label: 'I TRIM',
          tdClass: 'text-center',
          variant: 'success',
          thStyle: {
            'text-align': 'center',
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'promedio_segundo',
          label: 'II TRIM',
          tdClass: 'text-center',
          variant: 'success',
          thStyle: {
            'text-align': 'center',
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'promedio_tercer',
          label: 'III TRIM',
          tdClass: 'text-center',
          variant: 'success',
          thStyle: {
            'text-align': 'center',
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'promedio_final',
          label: 'Final',
          tdClass: 'text-center',
          variant: 'primary',
          thStyle: {
            'text-align': 'center',
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      getNotas: 'notas/getNotas',
      getPeriodosEstablecimiento: 'periodos/getPeriodosEstablecimiento',
      getEvaluaciones: 'evaluaciones/getEvaluaciones',
      getLibroSelected: 'libros/getLibroSelected',
    }),
  },
  watch: {
    getNotas(val) {
      this.items = []
      this.items = this.getNotas
    },
    // getEvaluaciones(val) {
    //   this.items = []
    //   this.items = this.getEvaluaciones
    // },
  },
  props: {
    id_asignatura: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    // const id_establecimiento = 1
    // this.fetchPeriodosEstablecimiento(id_establecimiento).then(() => {
      // console.log('this.getPeriodosEstablecimiento :', this.getPeriodosEstablecimiento)
    // })

    this.cargarFieldsEvaluaciones(this.id_asignatura)
    this.cargarNotas(this.id_asignatura)
  },
  methods: {
    ...mapActions({
      fetchPeriodosEstablecimiento: 'periodos/fetchPeriodosEstablecimiento',
      fetchEvaluaciones: 'evaluaciones/fetchEvaluaciones',
      fetchNotas: 'notas/fetchNotas',
    }),
    cargarFieldsEvaluaciones(id_asignatura) {
      this.fetchEvaluaciones(id_asignatura).then(() => {
        for (let i = 0; i < this.getEvaluaciones.length; i++) {
          const evaluacion = this.getEvaluaciones[i];
          const numNota = i+1
          this.fields.push(
            {
              key: 'nota_'+numNota,
              label: 'N'+numNota,
              tdClass: 'text-center',
              evaluacion: true,
              id_evaluacion: evaluacion.id,
              thStyle: {
                'cursor' : 'pointer',
                'text-align': 'center',
                width: '40px !important',
                display: 'table-cell',
                'vertical-align': 'middle',
              },
            },
          )
        }
        this.cargarFieldsPromedios()
      })
    },
    cargarFieldsPromedios() {
      this.fieldsSemestral.forEach(field => {
        this.fields.push(field)
      })
    },
    cargarNotas(id_asignatura) {
      this.fetchNotas(id_asignatura).then(() => {})
    },
    addNota() {
      // console.log('--- agregar nota ---')
    },
    headTitulo(key, e) {
      console.log(e)
    },
  },
}
</script>
