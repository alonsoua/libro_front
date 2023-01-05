<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <!-- v-if="$can('read', nombre_permiso)" -->
    <b-card style="margin: -18px -20px -18px -20px!important;">
      <!-- getLibroSelected: {{ getLibroSelected.id }}
      <br>
      id_persona: {{ user.id }}
      <br> -->

      <!-- ENCABEZADO -->
      <b-row>
        <b-col
          lg="2"
          md="3"
          sm="3"
          class="my-2"
        >
        </b-col>
        <b-col
          lg="6"
          md="5"
          sm="5"
          class="my-1"
        >
        </b-col>
        <b-col
          md="4"
          sm="4"
          class="my-1"
        >
          <div
            class="d-flex align-items-center justify-content-end"
          >
            <!-- CREAR -->
            <evaluaciones-create
              :idCurso="getLibroSelected.id"
            />

            <!-- BOTON CREAR -->
            <btn-crear-modal
              accion="Crear"
              texto="Evaluación"
              modal="modal-evaluacion-create"
            />
              <!-- :modulo="nombre_permiso" -->
          </div>
        </b-col>
      </b-row>
      <!-- Asignaturas del docente -->

      <b-tabs class="mt-1 mb-0">
        <b-tab
          v-for="(asignatura, key) in asignaturas"
          :title="asignatura.nombre"
          :active="key === 0"
        >
        <!-- Listado de alumnos del curso y sus notas por prueba -->
          <tabla-notas
            :id_asignatura="asignatura.id"
          />

        </b-tab>
      </b-tabs>
    </b-card>
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

import { mapGetters } from 'vuex'

// COMPONENTES RECICLADOS
import btnCrearModal from '../../../components/List/btnCrearModal.vue'

// COMPONENTES HIJOS
import TablaNotas from './TablaNotas.vue'
import EvaluacionesCreate from './Evaluaciones/EvaluacionesCreate.vue'


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
    btnCrearModal,

    // COMPONENTES HIJOS
    TablaNotas,
    EvaluacionesCreate,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      cargando: false,
      nombre_permiso: 'notas',

      id_persona: 2, // *

      asignaturas: [
        {
          id: 1,
          nombre: 'Lenguaje',
        },
        {
          id: 2,
          nombre: 'Matemáticas',
        },
        {
          id: 3,
          nombre: 'Historia',
        },
        {
          id: 4,
          nombre: 'Ciencias Naturales',
        },
      ],

      selectedRadio: 'active',
      optionsRadio: [
        { text: '1º S', value: 1 },
        { text: '2º S', value: 2 },
        { text: 'Todo', value: 0 },
      ],

    }
  },
  computed: {
    ...mapGetters({
      // getReuniones: 'I_2_reuniones/getReuniones',
      getLibroSelected: 'libros/getLibroSelected',
      user: 'auth/user',
    }),
  },
  methods: {
    addEvaluacion() {
      console.log('--- agregar evaluacion ---')
    },
  },
}
</script>
