<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="xl"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar Registro"
    :ok-disabled="this.v$.realizadas.$errors.length > 0"
    @ok.prevent="submitOption"
  >
    <b-overlay
      :show="cargando"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <!-- <b-form> -->
        <!-- Registro Info: Input Fields -->
        <b-row>

          <!-- Field: ALUMNOS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Plan de apoyo *"
              label-for="plan"
            >

              <v-select
                v-model="realizadas.id_plan_apoyo"
                :placeholder="optionsPlanApoyo.length === 0
                  ? 'No hay planes de apoyo disponibles...'
                  : 'Selecciona una plan de apoyo...'"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :reduce="option => option.id_plan_apoyo"
                :options="optionsPlanApoyo"
                :class="v$.realizadas.id_plan_apoyo.$error === true
                  ? 'border-danger rounded'
                  : ''"
                :disabled="optionsPlanApoyo.length === 0"
              />
              <b-alert
                v-if="optionsPlanApoyo.length === 0"
                class="pl-50 pt-25 pb-25 pr-50 mt-50 mb-25"
                variant="primary"
                show
              >
                Para crear un nuevo plan de apoyo, dirígase al menú "II 4".
              </b-alert>
              <div
                v-if="v$.realizadas.id_plan_apoyo.$error"
                id="asistentesInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.realizadas.id_plan_apoyo.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: OBJETIVOS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Observaciones *"
              label-for="observaciones"
            >
              <b-form-textarea
                id="observaciones"
                placeholder="Ingresa las observaciones"
                v-model="realizadas.observaciones"
                :state="v$.realizadas.observaciones.$error === true
                ? false
                : null"
                @blur.native="v$.realizadas.observaciones.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.realizadas.observaciones.$error"
                id="acuerdosInfo"
                class="text-right"
              >
                <p v-for="error of v$.realizadas.observaciones.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: OBJETIVOS -->
          <b-col
            cols="12"
            md="12"
          >

          </b-col>
        </b-row>

        <!-- REPEAT -->
          <!-- :style="{height: trHeight}" -->
        <b-form-group
          label="Registro de acciones"
          label-for="acciones"
          class="mb-1 mt-1 h3"
        />
        <b-form
          ref="form"
          class="repeater-form overflow-auto border-light"
          style="min-height: 540px !important; max-height: 540px !important; margin: 0px 0px 0px 0px; padding: 20px 18px 0px 18px;"
          @submit.prevent="repeateAgain"
        >
          <b-alert
            v-if="typeof items === 'undefined' || items.length === 0"
            variant="primary"
            show
          >
            <div class="alert-body">
              <span>No existen acciones agregadas.</span>
            </div>
          </b-alert>
          <b-row
            v-for="(item, index) in items"
            :id="item.id"
            :key="item.id"
            ref="row"
          >

            <!-- FECHA -->
            <b-col md="3">
              <b-form-group
                label="Fecha"
                :label-for="'fecha-'+item.id"
              >
                <b-form-datepicker
                  :id="'fecha-'+item.id"
                  v-model="item.fecha"
                  placeholder="Abrir calendario"
                  hide-header
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short'
                  }"
                  start-weekday="1"
                  locale="es-CL"
                  :date-disabled-fn="dateDisabled"
                  label-help=""
                />
              </b-form-group>
            </b-col>

            <!-- HORAS -->
            <b-col md="3">
              <b-form-group
                label="Horas pedagógicas"
                :label-for="'horas-'+item.id"
              >
                <b-form-input
                  :id="'horas-'+item.id"
                  type="number"
                  v-model="item.horas"
                  placeholder="Ingresa las horas"
                  @keyup='item.horas = formatSoloNumerosUnDigito(item.horas)'
                />
              </b-form-group>
            </b-col>

            <!-- ACTIVIDADES -->
            <b-col
              lg="4"
              md="4"
            >
              <b-form-group
                label="Actividades desarrolladas"
                :label-for="'actividades-'+item.id"
              >
                <b-form-textarea
                  :id="'actividades-'+item.id"
                  v-model="item.actividades"
                  placeholder="Ingresa las actividades desarrolladas"
                  rows="3"
                />
              </b-form-group>
            </b-col>

            <!-- FIRMA -->
            <b-col
              lg="1"
              md="1"
            >
              <b-form-group
                label="Firma"
                :label-for="'firma-'+item.id"
                class="text-center"
              >
                <!-- v-if="typeof item.participantes !== 'undefined' ? true : false" -->
                  <!-- :idUsuario.sync="item.id"
                  :nombreCompleto.sync="item.participantes.nombre" -->
                <firmas
                  :data.sync="item"
                  :modulo="nombre_permiso"
                  text="Firmar acción registrada ya sea para la planificación conjunta de la respuesta educativa diversificada o para el seguimiento y evaluación del trabajo colaborativo, entre otras actividades"
                />
              </b-form-group>
            </b-col>

            <!-- Remove Button -->
            <b-col
              lg="1"
              md="1"
              class="mb-50 text-right"
            >
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                variant="outline-danger"
                class="mt-0 mt-md-2 pr-1 pl-1"
                @click="removeItem(index)"
              >
                <feather-icon
                  icon="TrashIcon"
                />
              </b-button>
            </b-col>
            <b-col cols="12">
              <hr class="mt-0">
            </b-col>
          </b-row>
        </b-form>

        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="outline-primary"
          class="mt-25 pr-1 pl-1"
          @click="repeateAgain"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-25"
          />
          <span>Agregar acción</span>
        </b-button>
      </b-form>
    </b-overlay>
  </b-modal>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BAlert, BModal, VBModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'

import { mapGetters, mapActions } from 'vuex'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES RECICLADOS
import firmas from '../../../../../../../components/firmas.vue'

export default {
  components: {
    // ETIQUETAS
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    BOverlay,
    BFormDatepicker,
    BFormTimepicker,
    BFormTextarea,
    BAlert,
    BModal,
    VBModal,
    vSelect,

    // COMPONENTES RECICLADOS
    firmas,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [heightTransition, formatos],
  data() {
    return {
      nombre_permiso: 'pieIII1B',
      cargando: false,
      optionsPlanApoyo: [],

      // REPEAT
      items: [],
      nextTodoId: 1,
    }
  },
  props: {
    nombreModal: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    realizadas: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      realizadas: {
        id_plan_apoyo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        observaciones: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
        },
      }
    }
  },
  computed: {
    ...mapGetters({
      getPlanApoyosAlumnos: 'II_4_plan_apoyo/getPlanApoyosAlumnos',
      getLibroSelected: 'libros/getLibroSelected',
    }),
  },
  watch: {
    getPlanApoyosAlumnos(val) {
      this.optionsPlanApoyo = []
      this.optionsPlanApoyo = this.getPlanApoyosAlumnos
    },
  },
  mounted() {
    if (this.realizadas.id_plan_apoyo !== null) { // Update
      this.cargarRelizada(this.realizadas)
    }
    this.cargarPlanApoyo(this.getLibroSelected.id)
    this.initTrHeight()
  },
  methods: {
    ...mapActions({
      fetchPlanApoyosAlumnos: 'II_4_plan_apoyo/fetchPlanApoyosAlumnos',
    }),
    cargarPlanApoyo(idCurso) {
      this.fetchPlanApoyosAlumnos(idCurso).then(() => {})
    },
    cargarRelizada(realizadas) {
      this.items = realizadas.acciones
    },
    submitOption() {
      this.v$.realizadas.$touch()
      if (!this.v$.realizadas.$invalid) {
        this.cargando = true
        if (typeof this.items === 'undefined' || this.items.length === 0) {
          alert('Debe agregar al menos una acción.')
        } else {
          let acciones = []
          this.items.forEach(item => {
            acciones.push(item)
          })
          this.$emit('processForm', this.realizadas, acciones)
        }
        this.cargando = false
      }
    },
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      // return weekday === 0 || weekday === 6 || day === 1
      return weekday === 0 || weekday === 6
    },


    // REPEAT
    repeateAgain() {
      if (typeof this.items === 'undefined') {
        this.items = []
      }
      this.items.push({
        id: this.nextTodoId += 1,
        horas: 0,
      })

      this.$nextTick(() => {
        if (typeof this.$refs.row !== 'undefined') {
          this.trAddHeight(this.$refs.row[0].offsetHeight)
        }
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        if (typeof this.$refs.form !== 'undefined') {
          this.trSetHeight(this.$refs.form.scrollHeight)
        }
      })
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },

  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
