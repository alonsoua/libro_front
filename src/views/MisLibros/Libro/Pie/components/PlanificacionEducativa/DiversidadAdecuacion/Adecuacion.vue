<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      :style="{height: trHeight}"
      class="repeater-form mb-2 mt-3"
    >

      <b-row
        ref="row"
      >

        <!-- ADECUACIÓN -->
        <b-col md="3">
          <b-form-group
            label="Adecuación curricular"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- AMBITOS DE APRENDIZAJE -->
        <b-col md="3">
          <b-form-group
            label="Ámbito de aprendizaje, asignatura o módulo en que se aplicarán"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- ESTRATEGIAS -->
        <b-col md="3">
          <b-form-group
            label="Principales estrategias que se utilizarán"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- ESTUDIANTES -->
        <b-col md="3">
          <b-form-group
            label="Estudiantes"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
      </b-row>

      <colLinea class="mt-25 mb-1"/>

      <b-row
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        ref="row"
      >
        <!-- ADECUACIÓN -->
        <b-col md="3">
          <b-form-checkbox
            :id="'adecuacion-'+item.id"
            v-model="item.adecuacion_chk"
            value="1"
            :disabled="!$can('update', nombre_permiso)"
          >
            <b>{{ item.adecuacion }}</b>
          </b-form-checkbox>
        </b-col>

        <!-- ASIGNATURA -->
        <b-col md="3">
          <v-select
            v-if="$can('update', nombre_permiso)"
            :id="'id_asignatura-'+item.id"
            v-model="item.id_asignatura"
            placeholder="Selecciona una asignatura..."
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="texto"
            :options="asignaturasOption"
            :reduce="option => option.id"
            input-id="id_periodo"
          />
          <b-form-textarea
            v-if="!$can('update', nombre_permiso)"
            v-model="item.id_asignatura"
            :id="'id_asignatura-text-'+item.id"
            placeholder="Sin información"
            :plaintext="!$can('update', nombre_permiso)"
          />
        </b-col>

        <!-- ESTRATEGIAS -->
        <b-col md="3">
          <b-form-textarea
            :id="'estrategias-'+item.id"
            :placeholder="$can('update', nombre_permiso)
                ? 'Ingresa una estrategia'
                : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            v-model="item.estrategia"
            rows="6"
          />
        </b-col>

        <!-- ESTUDIANTES -->
        <b-col md="3">
          <v-select
            v-if="$can('update', nombre_permiso)"
            :id="'estudiantes-'+item.id"
            v-model="item.personas"
            multiple
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="nombre_completo"
            placeholder="Selecciona un estudiante..."
            :options="estudiantesOption"
            :reduce="option => option.id_persona_rol"
            input-id="personas"
          />

          <template
            v-if="!$can('update', nombre_permiso)"
          >
            <div
              v-if="item.personas.length !== 0"
            >
              <div
                v-for="(persona, key) in item.personas"
                :key="key"
                class="text-secondary"
              >
                {{ persona.nombre_completo }}
                <hr
                  style="margin-top: 1px; margin-bottom: 5px;"
                >
              </div>
            </div>
            <div v-else>
              <b-form-textarea
                :id="'estudiantes-text-'+item.id"
                placeholder="Sin información"
                :plaintext="!$can('update', nombre_permiso)"
              />
            </div>
          </template>
        </b-col>
        <b-col cols="12">
          <colLinea />
        </b-col>

      </b-row>

      <!-- Action Buttons -->
      <b-row
        ref="row"
      >
        <b-col md="8">
        </b-col>

        <b-col md="4">
          <btnSubmit
            class="float-right"
            variant="primary"
            :modulo="nombre_permiso"
            :btnText="btnSubmit"
            @processBtn="submitOption"
          />
        </b-col>

      </b-row>
    </b-form>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BOverlay, BCardText,
  BFormTextarea, BFormCheckbox
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import Cleave from 'vue-cleave-component'

import ToastificationContent
from '@core/components/toastification/ToastificationContent.vue'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
import { mapGetters, mapActions } from 'vuex'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES
import colLinea from '../../../../../../components/Form/colLinea.vue'
import btnSubmit from '../../../../../../components/Form/btnSubmit.vue'

export default {
  components: {
    // ETIQUETAS
    BOverlay,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BCardText,
    BFormTextarea,
    BFormCheckbox,
    vSelect,
    // COMPONENTES
    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition, formatos],
  data() {
    return {
      nombre_permiso: 'pieII3B',
      cargando: false,
      nextTodoId: 2,

      items: [],
      estudiantesOption: [],
      asignaturasOption: [],
    }
  },
  computed: {
    ...mapGetters({
      getAdecuacion: 'II_3_b_adecuacion/getAdecuacion',
      getLibroSelected: 'libros/getLibroSelected',
      getAsignaturasCurso: 'asignaturas/getAsignaturasCurso',
      getAlumnos: 'personas/getAlumnos',
    }),
  },
  watch: {
    getLibroSelected(getLibroSelected) {
      this.cargarAdecuaciones(getLibroSelected.id)
    },
    getAsignaturasCurso(val) {
      this.asignaturasOption = []
      this.asignaturasOption = this.getAsignaturasCurso
    },
    getAlumnos(val) {
      this.estudiantesOption = []
      this.estudiantesOption = this.getAlumnos
    },
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Adecuacion',
    },
  },
  mounted() {
    this.cargarAsignaturas(this.getLibroSelected.id)
    this.cargaEstudiantesPie(this.getLibroSelected.id)
    this.cargarAdecuaciones(this.getLibroSelected.id)
    this.resetItems()
    // REPEATER
    // this.initTrHeight()
  },
  methods: {
    ...mapActions({
      // ADECUACIONES
      fetchAdecuacion: 'II_3_b_adecuacion/fetchAdecuacion',
      addAdecuacion: 'II_3_b_adecuacion/addAdecuacion',
      updateAdecuacion: 'II_3_b_adecuacion/updateAdecuacion',

      // OTROS
      fetchAsignaturasCurso: 'asignaturas/fetchAsignaturasCurso',
      fetchAlumnosPie: 'personas/fetchAlumnosPie',
    }),
    cargarAsignaturas(idCurso) {
      this.fetchAsignaturasCurso(idCurso).then(() => {})
    },
    cargaEstudiantesPie(idCurso) {
      this.fetchAlumnosPie(idCurso).then(() => {})
    },
    cargarAdecuaciones(idCurso) {
      this.cargando = true
      this.fetchAdecuacion(idCurso).then(() => {
        if (typeof this.getAdecuacion.message === 'undefined') {
          this.items = []
          this.items = this.getAdecuacion
        } else {
          this.resetForms()
          this.resetItems()
        }
        this.cargando = false
      }).catch(() => {
        this.cargando = false
      })
    },
    submitOption() {
      const text = 'las estrategias que se utilizarán para adecuar o flexibilizar el currículum'
      const html = this.formatHTMLSweetInfo(text, '')
      this.$swal({
        title: 'Guardar cambios!',
        html,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          if (this.getAdecuacion.message === 'Registro no existe') {
            this.agregarAdecuaciones(this.items)
          } else {
            this.editarAdecuaciones(this.items)
          }
        } else {
          return false
        }
      })
    },

    agregarAdecuaciones(adecuaciones) {
      this.spinner = true
      adecuaciones.forEach(adecuacion => {
        const data = {
          id_curso: this.getLibroSelected.id,
          adecuacion_chk: adecuacion.adecuacion_chk,
          adecuacion: adecuacion.adecuacion,
          id_asignatura: adecuacion.id_asignatura,
          estrategia: adecuacion.estrategia,
          personas: adecuacion.personas,
        }
        this.addAdecuacion(data).then((response) => {
          this.cargarAdecuaciones(this.getLibroSelected.id)
        })
      })
      this.msjActualizar()
      this.spinner = false
    },

    editarAdecuaciones(adecuaciones) {
      this.spinner = true
      adecuaciones.forEach(adecuacion => {
        let personas = []
        adecuacion.personas.forEach(asistente => {
        if (typeof asistente.id === 'undefined') {
          personas.push(asistente)
        } else {
          personas.push(asistente.id_persona_rol)
        }
      })
        const data = {
          id: adecuacion.id,
          id_curso: this.getLibroSelected.id,
          adecuacion_chk: adecuacion.adecuacion_chk,
          adecuacion: adecuacion.adecuacion,
          id_asignatura: adecuacion.id_asignatura,
          estrategia: adecuacion.estrategia,
          personas: personas,
        }
        this.updateAdecuacion(data).then((response) => {
          this.cargarAdecuaciones(this.getLibroSelected.id)
        })
      })
      this.msjActualizar()
      this.spinner = false
    },

    msjActualizar() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Registro actualizado 👍',
          icon: 'CheckIcon',
          text: `Las estrategias que se utilizarán para adecuar o flexibilizar el currículum, han sido actualizadas con éxito!`,
          variant: 'success',
        },
      },
      {
        position: 'bottom-right',
        timeout: 3000,
      })
    },

    resetForms() {
      this.items = []
    },
    resetItems() {
      this.items = []
      this.items = [
        {
          id: 1,
          adecuacion_chk: false,
          adecuacion: 'De acceso',
          id_asignatura: null,
          estrategia: '',
          personas: [],
        },
        {
          id: 2,
          adecuacion_chk: false,
          adecuacion: 'A los objetivos de aprendizaje en el caso de la educación básica.',
          id_asignatura: null,
          estrategia: '',
          personas: [],
        },
        {
          id: 3,
          adecuacion_chk: false,
          adecuacion: 'Al plan de estudio (básica)',
          id_asignatura: null,
          estrategia: '',
          personas: [],
        },
        {
          id: 4,
          adecuacion_chk: false,
          adecuacion: 'Plan de adecuación curricular individual (PACI) (Básica)',
          id_asignatura: null,
          estrategia: '',
          personas: [],
        },
      ]
    },
  },
}
</script>
