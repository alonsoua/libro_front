<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      :style="{height: trHeight}"
      class="repeater-form mb-2"
      @submit.prevent="repeateAgain"
    >
      <b-row
        ref="row"
      >

        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-group
            label="Criterios sobre enseñanza y aprendizaje a considerar en la planificación y evaluación en el aula, a saber"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-group
            label="Estrategias"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
        <!-- COMO? -->
        <b-col md="3">
          <b-form-group
            label="¿Cómo?"
            label-for="como"
            class="text-center"
          />
        </b-col>
        <!-- A QUIENES? -->
        <b-col md="3">
          <b-form-group
            label="Estudiantes"
            label-for="observaciones"
            class="text-center"
          />
        </b-col>
      </b-row>

      <colLinea class="mt-25 mb-1"/>

      <b-row>
        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.criteriosPresentacionRepresentacion"
            value="CC"
            class="mb-1"
          >
            Múltiples medios de presentación y representación
          </b-form-checkbox>
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.estrategiaPercepcion"
            value="CC"
            class="mb-1"
          >
            Favorecer percepción de la información.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="adecuacion.estrategiaRepresentacion"
            value="CC"
            class="mb-1"
          >
            Favorecer la representación de la información.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="adecuacion.estrategiaComprension"
            value="CC"
          >
           Favorecer la comprensión de la información.
          </b-form-checkbox>
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            v-model="adecuacion.como"
            placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
            rows="7"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.alumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <b-row>
        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.criterioEjecucionExpresion"
            value="CC"
            class="mb-1"
          >
            Múltiples medios de ejecución y expresión
          </b-form-checkbox>
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.estrategiaExpresionFluidez"
            value="CC"
            class="mb-1"
          >
            Para favorecer la expresión y la fluidez.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="adecuacion.estrategiaFisica"
            value="CC"
          >
            Para favorecer la acción física.
          </b-form-checkbox>
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            v-model="adecuacion.como"
            placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
            rows="7"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.alumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <b-row>
        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.criterioParticipacion"
            value="CC"
            class="mb-1"
          >
            Múltiples formas de participación
          </b-form-checkbox>
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-checkbox
            v-model="adecuacion.estrategiaAtencionInteres"
            value="CC"
            class="mb-1"
          >
            Para captar la atención y el interés.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="adecuacion.estrategiaEsfuerzoPersistencia"
            value="CC"
            class="mb-1"
          >
            De apoyo al esfuerzo y la persistencia.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="adecuacion.estrategiaControlRegulacion"
            value="CC"
          >
            Para el control y regulación de los propios procesos de aprendizaje.
          </b-form-checkbox>
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            v-model="adecuacion.como"
            placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
            rows="7"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.alumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <b-row>
         <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-group
            label="Otro"
            label-for="otro"
          />
        </b-col>
        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
        </b-col>
        <!-- COMO? -->
        <b-col md="3">
        </b-col>
        <!-- A QUIENES? -->
        <b-col md="3">
        </b-col>

        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            placeholder="Ingresa el criterio"
            v-model="adecuacion.criterioOtro"
            rows="3"
          />
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            placeholder="Ingresa la estrategia"
            v-model="adecuacion.estrategiaOtro"
            rows="3"
          />
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
            v-model="adecuacion.como"
            rows="3"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.alumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <b-row>
        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-group
            label="Ajustes"
            label-for="ajustes"
          />
        </b-col>
        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
        </b-col>
        <!-- COMO? -->
        <b-col md="3">
        </b-col>
        <!-- A QUIENES? -->
        <b-col md="3">
        </b-col>

        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-textarea
            id="ajustes"
            placeholder="Ingresa en qué aspecto o nivel se realizarán ajustes"
            v-model="adecuacion.como"
            rows="7"
          />
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="9">

          <b-row>
            <b-col md="4">
              <b-form-checkbox
                v-model="adecuacion.estrategiaMateriales"
                value="CC"
                class="mb-1"
              >
                En los materiales de acceso.
              </b-form-checkbox>
            </b-col>
            <b-col md="4">
              <b-form-textarea
                id="como"
                v-model="adecuacion.como"
                placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
                rows="3"
              />
            </b-col>
            <b-col md="4">
              <v-select
                v-model="adecuacion.alumnos"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="title"
                :options="optionsAlumnos"
                placeholder="Seleccione el/la estudiante"
              />
            </b-col>
          </b-row>

          <colLinea />

          <b-row>
            <b-col md="4">
              <b-form-checkbox
                v-model="adecuacion.estrategiaTiempo"
                value="CC"
                class="mb-1"
              >
                En el tiempo.
              </b-form-checkbox>
            </b-col>
            <b-col md="4">
              <b-form-textarea
                id="como"
                v-model="adecuacion.como"
                placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
                rows="3"
              />
            </b-col>
            <b-col md="4">
              <v-select
                v-model="adecuacion.alumnos"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="title"
                :options="optionsAlumnos"
                placeholder="Seleccione el/la estudiante"
              />
            </b-col>
          </b-row>

          <colLinea />

          <b-row>
            <b-col md="4">
              <b-form-checkbox
                v-model="adecuacion.estrategiaTarea"
                value="CC"
                class="mb-1"
              >
                En la tarea.
              </b-form-checkbox>
            </b-col>
            <b-col md="4">
              <b-form-textarea
                id="como"
                v-model="adecuacion.como"
                placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
                rows="3"
              />
            </b-col>
            <b-col md="4">
              <v-select
                v-model="adecuacion.alumnos"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="title"
                :options="optionsAlumnos"
                placeholder="Seleccione el/la estudiante"
              />
            </b-col>
          </b-row>

          <colLinea />

          <b-row>
            <!-- CRITERIOS -->
            <b-col md="4">
              <b-form-group
                label="Otro"
                label-for="otro"
              />
            </b-col>
            <!-- ESTRATEGIAS PARA -->
            <b-col md="4">
            </b-col>
            <!-- COMO? -->
            <b-col md="4">
            </b-col>
            <b-col md="4">
              <b-form-textarea
                id="como"
                placeholder="Ingresa la estrategia"
                v-model="adecuacion.como"
                rows="3"
              />
            </b-col>
            <b-col md="4">
              <b-form-textarea
                id="como"
                v-model="adecuacion.como"
                placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
                rows="3"
              />
            </b-col>
            <b-col md="4">
              <v-select
                v-model="adecuacion.alumnos"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="title"
                :options="optionsAlumnos"
                placeholder="Seleccione el/la estudiante"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <colLinea />

      <b-row>
        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-group
            label="Otras estrategias y criterios"
            label-for="ajustes"
          />
        </b-col>
        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
        </b-col>
        <!-- COMO? -->
        <b-col md="3">
        </b-col>
        <!-- A QUIENES? -->
        <b-col md="3">
        </b-col>

        <!-- CRITERIOS -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            placeholder="Ingresa el criterio"
            v-model="adecuacion.criterioOtro"
            rows="3"
          />
        </b-col>

        <!-- ESTRATEGIAS PARA -->
        <b-col md="3">
          <b-form-textarea
            id="otro"
            placeholder="Ingresa la estrategia"
            v-model="adecuacion.estrategiaOtro"
            rows="3"
          />
        </b-col>

        <!-- COMO? -->
        <b-col md="3">
          <b-form-textarea
            id="como"
            v-model="adecuacion.como"
            placeholder="Ingresa los materiales, acciones, formas de agrupamiento, etc"
            rows="3"
          />
        </b-col>

        <!-- A QUIENES? -->
        <b-col md="3">
          <v-select
            v-model="adecuacion.alumnos"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="optionsAlumnos"
            placeholder="Seleccione el/la estudiante"
          />
        </b-col>
      </b-row>

      <colLinea />

      <b-row>
        <!-- OBSERVACIONES -->
        <b-col md="12">
          <b-form-group
            label="Observaciones"
            label-for="observaciones"
          >
            <b-form-textarea
              id="observaciones"
              placeholder="Ingresa las observaciones"
              v-model="adecuacion.observaciones"
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
            v-if="cargando"
            class="float-right"
            variant="primary"
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
  mixins: [heightTransition],
  data() {
    return {
      adecuacion: [],
      cargando: true,
      optionsAlumnos: [
        {
          value: 1,
          title: 'Catalina Gaete',
        },
        {
          value: 2,
          title: 'Thomas Torres',
        },
        {
          value: 3,
          title: 'Felipe López',
        },
      ],
      coordinacion: [],
      nextTodoId: 2,
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Estrategia',
    },
  },
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.asistencia)
      // this.v$.asistencia.$touch()
      // if (!this.v$.asistencia.$invalid) {
      //   this.$emit('processForm', this.asistencia)
      // }
    },
    // REPEATER
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>
