<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      :style="{height: trHeight}"
      class="repeater-form mb-2"
    >
      <!-- ENCABEZADOS -->
      <b-row
        ref="row"
      >
        <!-- Criterios -->
        <b-col md="3">
          <b-form-group
            label="Criterios sobre enseñanza y aprendizaje a considerar en la planificación y evaluación en el aula, a saber"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- Estrategias para -->
        <b-col md="3">
          <b-form-group
            label="Estrategias"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- Como? -->
        <b-col md="3">
          <b-form-group
            label="¿Cómo?"
            label-for="como"
            class="text-center"
          />
        </b-col>
        <!-- A quienes? -->
        <b-col md="3">
          <b-form-group
            label="Estudiantes"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
      </b-row>

      <colLinea class="mt-25 mb-1"/>

      <!-- 1=NORMAL; -->
      <b-row
        v-for="(item_normal, index) in items_normal"
        :id="item_normal.id"
        :key="item_normal.id"
        ref="row"
      >
        <!-- Criterios -->
        <b-col md="3">
          <b-form-checkbox
            v-model="item_normal.criterio_chk"
            value="1"
            :disabled="!$can('update', nombre_permiso)"
            class="mb-1"
          >
            {{ item_normal.criterio }}
          </b-form-checkbox>
        </b-col>

        <!-- Estrategias para -->
        <b-col md="3">

          <b-form-checkbox
            v-model="item_normal.estrategia_1_chk"
            value="1"
            :disabled="!$can('update', nombre_permiso)"
            class="mb-1"
          >
            {{ item_normal.estrategia_1 }}
          </b-form-checkbox>

          <b-form-checkbox
            v-if="item_normal.estrategia_2_chk !== null"
            value="1"
            v-model="item_normal.estrategia_2_chk"
            :disabled="!$can('update', nombre_permiso)"
            class="mb-1"
          >
            {{ item_normal.estrategia_2 }}
          </b-form-checkbox>

          <b-form-checkbox
            v-if="item_normal.estrategia_3_chk !== null"
            value="1"
            v-model="item_normal.estrategia_3_chk"
            :disabled="!$can('update', nombre_permiso)"
          >
           {{ item_normal.estrategia_3 }}
          </b-form-checkbox>

        </b-col>

        <!-- Como? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            v-model="item_normal.como"
            :placeholder="$can('update', nombre_permiso)
              ? 'Materiales, acciones, formas de agrupamiento, etc'
              : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            rows="7"
          />
        </b-col>

        <!-- A quienes? -->
        <!-- ESTUDIANTES -->
        <b-col md="3">
          <v-select
            v-if="$can('update', nombre_permiso)"
            :id="'estudiantes-'+item_normal.id"
            v-model="item_normal.personas"
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
              v-if="item_normal.personas.length !== 0"
            >
              <div
                v-for="(persona, key) in item_normal.personas"
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
                :id="'estudiantes-text-'+item_normal.id"
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

      <!-- 2=OTRO; -->
      <b-row>
        <!-- Titulo -->
        <template>
          <b-col md="3">
            <b-form-group
              label="Otro"
              label-for="otro"
            />
          </b-col>
          <!-- Estrategias para -->
          <b-col md="3">
          </b-col>
          <!-- Como? -->
          <b-col md="3">
          </b-col>
          <!-- A quienes? -->
          <b-col md="3">
          </b-col>
        </template>

        <!-- Criterios -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            v-model="item_otro.criterio"
            :placeholder="$can('update', nombre_permiso)
              ? 'Ingresa un criterio'
              : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            rows="3"
          />
        </b-col>

        <!-- Estrategias para -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            v-model="item_otro.estrategia_1"
            :placeholder="$can('update', nombre_permiso)
              ? 'Ingresa una estrategia'
              : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            rows="3"
          />
        </b-col>

        <!-- Como? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            v-model="item_otro.como"
            :placeholder="$can('update', nombre_permiso)
              ? 'Materiales, acciones, formas de agrupamiento, etc'
              : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            rows="3"
          />
        </b-col>

        <!-- A quienes? -->
        <!-- ESTUDIANTES -->
        <b-col md="3">
          <v-select
            v-if="$can('update', nombre_permiso)"
            :id="'estudiantes-'+item_otro.id"
            v-model="item_otro.personas"
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
              v-if="item_otro.personas.length !== 0"
            >
              <div
                v-for="(persona, key) in item_otro.personas"
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
                :id="'estudiantes-text-'+item_otro.id"
                placeholder="Sin información"
                :plaintext="!$can('update', nombre_permiso)"
              />
            </div>
          </template>
        </b-col>
      </b-row>

      <colLinea />

      <!-- 3=AJUSTES; -->
      <b-row>
        <!-- Titulo -->
        <template>
          <b-col md="3">
            <b-form-group
              label="Ajustes"
              label-for="ajustes"
            />
          </b-col>
          <!-- Estrategias para -->
          <b-col md="3">
          </b-col>
          <!-- Como? -->
          <b-col md="3">
          </b-col>
          <!-- A quienes? -->
          <b-col md="3">
          </b-col>
        </template>

        <!-- Criterios -->
        <template
          v-for="(item_ajuste, index) in items_ajustes"
          :id="item_ajuste.id"
        >

          <b-col md="3" >
            <b-form-textarea
              v-if="item_ajuste.criterio_show"
              v-model="item_ajuste.criterio"
              id="ajustes"
              :placeholder="$can('update', nombre_permiso)
                ? 'En qué aspecto o nivel se realizarán ajustes'
                : 'Sin información'"
              :plaintext="!$can('update', nombre_permiso)"
              rows="7"
            />
          </b-col>

          <!-- Estrategias para -->
          <b-col md="9">
            <b-row v-if="item_ajuste.estrategia_1_chk !== null">
              <b-col md="4">
                <b-form-checkbox
                  v-model="item_ajuste.estrategia_1_chk"
                  value="1"
                  :disabled="!$can('update', nombre_permiso)"
                  class="mb-1"
                >
                  {{ item_ajuste.estrategia_1 }}
                </b-form-checkbox>
              </b-col>

              <b-col md="4">
                <b-form-textarea
                  id="como"
                  v-model="item_ajuste.como"
                  :placeholder="$can('update', nombre_permiso)
                    ? 'Materiales, acciones, formas de agrupamiento, etc'
                    : 'Sin información'"
                  :plaintext="!$can('update', nombre_permiso)"
                  rows="3"
                />
              </b-col>

              <!-- ESTUDIANTES -->
              <b-col md="4">
                <v-select
                  v-if="$can('update', nombre_permiso)"
                  :id="'estudiantes-'+item_ajuste.id"
                  v-model="item_ajuste.personas"
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
                    v-if="item_ajuste.personas.length !== 0"
                  >
                    <div
                      v-for="(persona, key) in item_ajuste.personas"
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
                      :id="'estudiantes-text-'+item_ajuste.id"
                      placeholder="Sin información"
                      :plaintext="!$can('update', nombre_permiso)"
                    />
                  </div>
                </template>
              </b-col>
              <b-col md="12">
                <colLinea />
              </b-col>
            </b-row>

            <!-- AJUSTES / OTRO -->
            <b-row v-if="item_ajuste.estrategia_1_chk === null">
                <!-- Criterios -->
              <b-col md="4">
                <b-form-group
                  label="Otro"
                  label-for="otro"
                />
              </b-col>
              <!-- Estrategias para -->
              <b-col md="4">
              </b-col>
              <!-- Como? -->
              <b-col md="4">
              </b-col>

              <b-col md="4">
                <b-form-textarea
                  id="estrategia"
                  v-model="item_ajuste.estrategia_1"
                  :placeholder="$can('update', nombre_permiso)
                    ? 'Ingresa una estrategia'
                    : 'Sin información'"
                  :plaintext="!$can('update', nombre_permiso)"
                  rows="3"
                />
              </b-col>
              <b-col md="4">
                <b-form-textarea
                  id="como"
                  v-model="item_ajuste.como"
                  :placeholder="$can('update', nombre_permiso)
                    ? 'Materiales, acciones, formas de agrupamiento, etc'
                    : 'Sin información'"
                  :plaintext="!$can('update', nombre_permiso)"
                  rows="3"
                />
              </b-col>

              <!-- ESTUDIANTES -->
              <b-col md="4">
                <v-select
                  v-if="$can('update', nombre_permiso)"
                  :id="'estudiantes-'+item_ajuste.id"
                  v-model="item_ajuste.personas"
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
                    v-if="item_ajuste.personas.length !== 0"
                  >
                    <div
                      v-for="(persona, key) in item_ajuste.personas"
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
                      :id="'estudiantes-text-'+item_ajuste.id"
                      placeholder="Sin información"
                      :plaintext="!$can('update', nombre_permiso)"
                    />
                  </div>
                </template>
              </b-col>
            </b-row>
          </b-col>
        </template>
      </b-row>

      <colLinea />

      <!-- 4=OTRAS; -->
      <b-row>
        <!-- Titulo -->
        <template>
          <b-col md="3">
            <b-form-group
              label="Otras estrategias y criterios"
              label-for="ajustes"
            />
          </b-col>
          <!-- Estrategias para -->
          <b-col md="3">
          </b-col>
          <!-- Como? -->
          <b-col md="3">
          </b-col>
          <!-- A quienes? -->
          <b-col md="3">
          </b-col>
        </template>

        <!-- Criterios -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            v-model="item_otras.criterio"
            :placeholder="$can('update', nombre_permiso)
              ? 'Ingresa un criterio'
              : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            rows="3"
          />
        </b-col>

        <!-- Estrategias para -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            v-model="item_otras.estrategia_1"
            :placeholder="$can('update', nombre_permiso)
              ? 'Ingresa una estrategia'
              : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            rows="3"
          />
        </b-col>

        <!-- Como? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            v-model="item_otras.como"
            :placeholder="$can('update', nombre_permiso)
              ? 'Materiales, acciones, formas de agrupamiento, etc'
              : 'Sin información'"
            :plaintext="!$can('update', nombre_permiso)"
            rows="3"
          />
        </b-col>

        <!-- A quienes? -->
        <!-- ESTUDIANTES -->
        <b-col md="3">
          <v-select
            v-if="$can('update', nombre_permiso)"
            :id="'estudiantes-'+item_otras.id"
            v-model="item_otras.personas"
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
              v-if="item_otras.personas.length !== 0"
            >
              <div
                v-for="(persona, key) in item_otras.personas"
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
                :id="'estudiantes-text-'+item_otras.id"
                placeholder="Sin información"
                :plaintext="!$can('update', nombre_permiso)"
              />
            </div>
          </template>
        </b-col>
      </b-row>

      <colLinea />

      <!-- 5=OBSERVACIONES; -->
      <b-row>
        <!-- OBSERVACIONES -->
        <b-col md="12">
          <b-form-group
            label="Observaciones"
            label-for="observaciones"
          >
            <b-form-textarea
              id="observaciones"
              v-model="item_observaciones.observaciones"
              :placeholder="$can('update', nombre_permiso)
                  ? 'Ingresa las observaciones'
                  : 'Sin información'"
                :plaintext="!$can('update', nombre_permiso)"
              rows="4"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <colLinea />

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
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
import vSelect from 'vue-select'

import ToastificationContent
from '@core/components/toastification/ToastificationContent.vue'

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

    // COMPONENTS
    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition, formatos],
  data() {
    return {
      nombre_permiso: 'pieII3A',
      cargando: false,
      items_normal: [],
      item_otro: {},
      items_ajustes: [],
      item_otras: {},
      item_observaciones: {},
      estudiantesOption: [],
      nextTodoId: 2,
    }
  },
  computed: {
    ...mapGetters({
      getDiversidad: 'II_3_a_diversidad/getDiversidad',
      getLibroSelected: 'libros/getLibroSelected',
      getAlumnos: 'personas/getAlumnos',
    }),
  },
  watch: {
    getLibroSelected(getLibroSelected) {
      // this.cargarDiversidades(getLibroSelected.id)
    },
    getAlumnos(val) {
      this.estudiantesOption = []
      this.estudiantesOption = this.getAlumnos
    },
    // getAsignaturasCurso(val) {
    //   this.asignaturasOption = []
    //   this.asignaturasOption = this.getAsignaturasCurso
    // },
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Estrategia',
    },
  },
  mounted() {
    this.cargaEstudiantesPie(this.getLibroSelected.id)
    this.cargarDiversidades(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      // ADECUACIONES
      fetchDiversidad: 'II_3_a_diversidad/fetchDiversidad',
      addDiversidad: 'II_3_a_diversidad/addDiversidad',
      updateDiversidad: 'II_3_a_diversidad/updateDiversidad',

      // OTROS
      fetchAlumnosPie: 'personas/fetchAlumnosPie',
    }),
    cargaEstudiantesPie(idCurso) {
      this.fetchAlumnosPie(idCurso).then(() => {})
    },
    cargarDiversidades(idCurso) {
      this.cargando = true
      this.fetchDiversidad(idCurso).then(() => {
        if (this.getDiversidad.length !== 0) {
          this.vaciarItems()
          this.getDiversidad.forEach(diversidad => {
            switch (diversidad.tipo) {
              case 1: // Normal
                  this.items_normal.push(diversidad)
                break;

              case 2: // Otro
                  this.item_otro = diversidad
                break;

              case 3: // Ajustes
                  this.items_ajustes.push(diversidad)
                break;

              case 4: // Otras
                  this.item_otras = diversidad
                break;

              case 5: // Observaciones
                  this.item_observaciones = diversidad
                break;

              default:
                break;
            }
          })
        } else {
          this.resetItems()
        }
        this.cargando = false
      }).catch(() => {
        this.cargando = false
      })
    },
    submitOption() {
      const data = {
        items_normal: this.items_normal,
        item_otro: this.item_otro,
        items_ajustes: this.items_ajustes,
        item_otras: this.item_otras,
        item_observaciones: this.item_observaciones,
      }

      const text = 'las estrategias que se utilizarán para dar respuesta a la diversidad de estudiantes, en el aula común'
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
          if (this.getDiversidad.length === 0) {
            this.agregarDiversidades()
          } else {
            this.editarDiversidades()
          }
        } else {
          return false
        }
      })
    },
    agregarDiversidades() {
      this.spinner = true
      this.addNormal(this.items_normal)
      this.addOtro(this.item_otro)
      this.addAjustes(this.items_ajustes)
      this.addOtras(this.item_otras)
      this.addObservaciones(this.item_observaciones)

      this.cargarDiversidades(this.getLibroSelected.id)
      this.msjActualizar()
      this.spinner = false
    },

    // * 1=NORMAL
    addNormal(diversidades) {
      diversidades.forEach(diversidad => {
        const data = {
          id_curso: this.getLibroSelected.id,
          tipo: 1, // tipo normal
          criterio_show: diversidad.criterio_show,
          criterio_chk: diversidad.criterio_chk,
          criterio: diversidad.criterio,
          estrategia_1_chk: diversidad.estrategia_1_chk,
          estrategia_1: diversidad.estrategia_1,
          estrategia_2_chk: diversidad.estrategia_2_chk,
          estrategia_2: diversidad.estrategia_2,
          estrategia_3_chk: diversidad.estrategia_3_chk,
          estrategia_3: diversidad.estrategia_3,
          como: diversidad.como,
          observaciones: diversidad.observaciones,
          personas: diversidad.personas,
        }
        this.addDiversidad(data).then((response) => {})
      })
    },
    // * 2=OTRO
    addOtro(diversidad) {

      const data = {
        id_curso: this.getLibroSelected.id,
        tipo: 2, // tipo otro
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: diversidad.personas,
      }
      this.addDiversidad(data).then((response) => {})
    },
    // * 3=AJUSTES
    addAjustes(diversidades) {
      diversidades.forEach(diversidad => {
        const data = {
          id_curso: this.getLibroSelected.id,
          tipo: 3, // tipo ajustes
          criterio_show: diversidad.criterio_show,
          criterio_chk: diversidad.criterio_chk,
          criterio: diversidad.criterio,
          estrategia_1_chk: diversidad.estrategia_1_chk,
          estrategia_1: diversidad.estrategia_1,
          estrategia_2_chk: diversidad.estrategia_2_chk,
          estrategia_2: diversidad.estrategia_2,
          estrategia_3_chk: diversidad.estrategia_3_chk,
          estrategia_3: diversidad.estrategia_3,
          como: diversidad.como,
          observaciones: diversidad.observaciones,
          personas: diversidad.personas,
        }
        this.addDiversidad(data).then((response) => {})
      })
    },
    // * 4=OTRAS
    addOtras(diversidad) {
      const data = {
        id_curso: this.getLibroSelected.id,
        tipo: 4, // tipo otras
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: diversidad.personas,
      }
      this.addDiversidad(data).then((response) => {})
    },
    // * 5=OBSERVACIONES
    addObservaciones(diversidad) {
      const data = {
        id_curso: this.getLibroSelected.id,
        tipo: 5, // tipo observaciones
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: diversidad.personas,
      }
      this.addDiversidad(data).then((response) => {})
    },

    editarDiversidades(diversidades) {
      this.spinner = true

      this.updateNormal(this.items_normal)
      this.updateOtro(this.item_otro)
      this.updateAjustes(this.items_ajustes)
      this.updateOtras(this.item_otras)
      this.updateObservaciones(this.item_observaciones)

      this.cargarDiversidades(this.getLibroSelected.id)
      this.msjActualizar()
      this.spinner = false
    },
    // * 1=NORMAL
    updateNormal(diversidades) {
      diversidades.forEach(diversidad => {
        let personas = []
        diversidad.personas.forEach(persona => {
          if (typeof persona.id === 'undefined') {
            personas.push(persona)
          } else {
            personas.push(persona.id_persona_rol)
          }
        })
        const data = {
          id_diversidad: diversidad.id,
          id_curso: this.getLibroSelected.id,
          tipo: 1, // tipo normal
          criterio_show: diversidad.criterio_show,
          criterio_chk: diversidad.criterio_chk,
          criterio: diversidad.criterio,
          estrategia_1_chk: diversidad.estrategia_1_chk,
          estrategia_1: diversidad.estrategia_1,
          estrategia_2_chk: diversidad.estrategia_2_chk,
          estrategia_2: diversidad.estrategia_2,
          estrategia_3_chk: diversidad.estrategia_3_chk,
          estrategia_3: diversidad.estrategia_3,
          como: diversidad.como,
          observaciones: diversidad.observaciones,
          personas: personas,
        }
        this.updateDiversidad(data).then((response) => {})
      })
    },
    // * 2=OTRO
    updateOtro(diversidad) {
      let personas = []
      diversidad.personas.forEach(persona => {
        if (typeof persona.id === 'undefined') {
          personas.push(persona)
        } else {
          personas.push(persona.id_persona_rol)
        }
      })
      const data = {
        id_diversidad: diversidad.id,
        id_curso: this.getLibroSelected.id,
        tipo: 2, // tipo otro
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: personas,
      }
      console.log('data otro:', data)
      this.updateDiversidad(data).then((response) => {})
    },
    // * 3=AJUSTES
    updateAjustes(diversidades) {
      diversidades.forEach(diversidad => {
        let personas = []
        diversidad.personas.forEach(persona => {
          if (typeof persona.id === 'undefined') {
            personas.push(persona)
          } else {
            personas.push(persona.id_persona_rol)
          }
        })

        const data = {
          id_diversidad: diversidad.id,
          id_curso: this.getLibroSelected.id,
          tipo: 3, // tipo ajustes
          criterio_show: diversidad.criterio_show,
          criterio_chk: diversidad.criterio_chk,
          criterio: diversidad.criterio,
          estrategia_1_chk: diversidad.estrategia_1_chk,
          estrategia_1: diversidad.estrategia_1,
          estrategia_2_chk: diversidad.estrategia_2_chk,
          estrategia_2: diversidad.estrategia_2,
          estrategia_3_chk: diversidad.estrategia_3_chk,
          estrategia_3: diversidad.estrategia_3,
          como: diversidad.como,
          observaciones: diversidad.observaciones,
          personas: personas,
        }
        this.updateDiversidad(data).then((response) => {})
      })
    },
    // * 4=OTRAS
    updateOtras(diversidad) {
      let personas = []
      diversidad.personas.forEach(persona => {
        if (typeof persona.id === 'undefined') {
          personas.push(persona)
        } else {
          personas.push(persona.id_persona_rol)
        }
      })
      const data = {
        id_diversidad: diversidad.id,
        id_curso: this.getLibroSelected.id,
        tipo: 4, // tipo otras
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: personas,
      }
      this.updateDiversidad(data).then((response) => {})
    },
    // * 5=OBSERVACIONES
    updateObservaciones(diversidad) {
      const data = {
        id_diversidad: diversidad.id,
        id_curso: this.getLibroSelected.id,
        tipo: 5, // tipo observaciones
        criterio_show: diversidad.criterio_show,
        criterio_chk: diversidad.criterio_chk,
        criterio: diversidad.criterio,
        estrategia_1_chk: diversidad.estrategia_1_chk,
        estrategia_1: diversidad.estrategia_1,
        estrategia_2_chk: diversidad.estrategia_2_chk,
        estrategia_2: diversidad.estrategia_2,
        estrategia_3_chk: diversidad.estrategia_3_chk,
        estrategia_3: diversidad.estrategia_3,
        como: diversidad.como,
        observaciones: diversidad.observaciones,
        personas: diversidad.personas,
      }
      this.updateDiversidad(data).then((response) => {})
    },

    msjActualizar() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Registro actualizado 👍',
          icon: 'CheckIcon',
          text: `Las estrategias que se utilizarán para dar respuesta a la diversidad de estudiantes, han sido actualizadas con éxito!`,
          variant: 'success',
        },
      },
      {
        position: 'bottom-right',
        timeout: 3000,
      })
    },
    vaciarItems () {
      this.items_normal = []
      this.item_otro = {}
      this.items_ajustes = []
      this.item_otras = {}
      this.item_observaciones = {}
    },
    resetItems() {
      this.vaciarItems()
      this.items_normal = [
        {
          criterio_show: true,
          criterio_chk: false,
          criterio: 'Múltiples medios de presentación y representación',
          estrategia_1_chk: false,
          estrategia_1: 'Favorecer percepción de la información.',
          estrategia_2_chk: false,
          estrategia_2: 'Favorecer la representación de la información.',
          estrategia_3_chk: false,
          estrategia_3: 'Favorecer la comprensión de la información.',
          como: '',
          observaciones: null,
          personas: [],
        },
        {
          criterio_show: true,
          criterio_chk: false,
          criterio: 'Múltiples medios de ejecución y expresión',
          estrategia_1_chk: false,
          estrategia_1: 'Para favorecer la expresión y la fluidez.',
          estrategia_2_chk: false,
          estrategia_2: 'Para favorecer la acción física.',
          estrategia_3_chk: null,
          estrategia_3: null,
          como: '',
          observaciones: null,
          personas: [],
        },
        {
          criterio_show: true,
          criterio_chk: false,
          criterio: 'Múltiples formas de participación',
          estrategia_1_chk: false,
          estrategia_1: 'Para captar la atención y el interés.',
          estrategia_2_chk: false,
          estrategia_2: 'De apoyo al esfuerzo y la persistencia.',
          estrategia_3_chk: false,
          estrategia_3: 'Para el control y regulación de los propios procesos de aprendizaje.',
          como: '',
          observaciones: null,
          personas: [],
        },
      ]

      this.item_otro = {
        criterio_show: true,
        criterio_chk: null,
        criterio: '',
        estrategia_1_chk: null,
        estrategia_1: '',
        estrategia_2_chk: null,
        estrategia_2: null,
        estrategia_3_chk: null,
        estrategia_3: null,
        como: '',
        observaciones: null,
        personas: [],
      }

      this.items_ajustes = [
        {
          criterio_show: true,
          criterio_chk: null,
          criterio: '',
          estrategia_1_chk: false,
          estrategia_1: 'En los materiales de acceso.',
          estrategia_2_chk: null,
          estrategia_2: null,
          estrategia_3_chk: null,
          estrategia_3: null,
          como: '',
          observaciones: null,
          personas: [],
        },
        {
          criterio_show: false,
          criterio_chk: null,
          criterio: '',
          estrategia_1_chk: false,
          estrategia_1: 'En el tiempo.',
          estrategia_2_chk: null,
          estrategia_2: null,
          estrategia_3_chk: null,
          estrategia_3: null,
          como: '',
          observaciones: null,
          personas: [],
        },
        {
          criterio_show: false,
          criterio_chk: null,
          criterio: '',
          estrategia_1_chk: false,
          estrategia_1: 'En la tarea.',
          estrategia_2_chk: null,
          estrategia_2: null,
          estrategia_3_chk: null,
          estrategia_3: null,
          como: '',
          observaciones: null,
          personas: [],
        },
        {
          criterio_show: false,
          criterio_chk: null,
          criterio: '',
          estrategia_1_chk: null,
          estrategia_1: '',
          estrategia_2_chk: null,
          estrategia_2: null,
          estrategia_3_chk: null,
          estrategia_3: null,
          como: '',
          observaciones: null,
          personas: [],
        }
      ]

      this.item_otras = {
        criterio_show: true,
        criterio_chk: null,
        criterio: '',
        estrategia_1_chk: null,
        estrategia_1: '',
        estrategia_2_chk: null,
        estrategia_2: null,
        estrategia_3_chk: null,
        estrategia_3: null,
        como: '',
        observaciones: null,
        personas: [],
      }

      this.item_observaciones = {
        criterio_show: false,
        criterio_chk: null,
        criterio: null,
        estrategia_1_chk: null,
        estrategia_1: null,
        estrategia_2_chk: null,
        estrategia_2: null,
        estrategia_3_chk: null,
        estrategia_3: null,
        como: null,
        observaciones: '',
        personas: [],
      }
    },
  },
}
</script>
