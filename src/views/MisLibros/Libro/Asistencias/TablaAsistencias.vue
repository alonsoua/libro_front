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

        <div
          v-else-if="data.field.key == 'nombre_completo'"
        >
          {{ data.item.nombre_completo }}
        </div>


        <asistencia-alumno-bloque
          v-else-if="data.field.bloque"
          :item.sync="data.item"
          :field="data.field"
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
import spinner from '../../../components/spinner.vue'

// COMPONENTES HIJOS
import AsistenciaAlumnoBloque from './AsistenciasDia/components/AsistenciaAlumnoBloque.vue'


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
    AsistenciaAlumnoBloque,
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
    }
  },
  computed: {
    ...mapGetters({
      getAsistencias: 'asistencias/getAsistencias',
      getBloques: 'bloques/getBloques',
      getLibroSelected: 'libros/getLibroSelected',
    }),
  },
  watch: {
    getAsistencias(val) {
      this.cargaItems(val)
    },
    // getBloques(val) {
    //   this.items = []
    //   this.items = this.getBloques
    // },
  },
  mounted() {
    this.cargarFieldsBloques(this.getLibroSelected.id)
    this.cargarAsistencias(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchBloques: 'bloques/fetchBloques',
      fetchAsistencias: 'asistencias/fetchAsistencias',
    }),
    cargarFieldsBloques(id_curso) {
      this.fetchBloques(id_curso).then(() => {
        for (let i = 0; i < this.getBloques.length; i++) {
          const bloque = this.getBloques[i];
          const numNota = i+1
          this.fields.push(
            {
              key: 'bloque_'+numNota,
              label: bloque.nombre+' - '+bloque.horario,
              tdClass: 'text-center',
              bloque: true,
              id_bloque: bloque.id,
              thStyle: {
                'text-align': 'center',
                width: '5px !important',
                display: 'table-cell',
                'vertical-align': 'middle',
              },
            },
          )
        }
      })
    },
    cargarAsistencias(id_curso) {
      this.fetchAsistencias(id_curso).then(() => {})
    },
    cargaItems(items) {
      this.items = []
      this.items = items

      // this.items.push(
      //   {
      //     num_lista: '-',
      //     id_alumno: '-',
      //     nombre_completo: 'Firmas',
      //     // id_bloque: bloque.id,
      //   },
      // )
      console.log('this.items 2:', this.items)
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
