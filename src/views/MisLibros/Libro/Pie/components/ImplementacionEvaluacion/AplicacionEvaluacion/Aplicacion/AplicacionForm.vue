<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="lg"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar Acción"
    :ok-disabled="this.v$.aplicacion.$errors.length > 0"
    @ok.prevent="submitOption"
  >
    <b-overlay
      :show="!cargando"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <b-form>
        <!-- Reunión Info: Input Fields -->
        <b-row>

          <!-- Field: PERIODO -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Estrategia (Periodo) *"
              label-for="estrategia"
            >
              <v-select
                v-model="aplicacion.id_detalle_estrategia"
                :placeholder="estrategiasDisponiblesOption.length === 0
                  ? 'No hay estrategias disponibles...'
                  : 'Selecciona una estrategia...'"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="estrategia"
                :options="estrategiasDisponiblesOption"
                :reduce="option => option.id"
                input-id="estrategia"
                :class="v$.aplicacion.id_detalle_estrategia.$error === true
                  ? 'border-danger rounded'
                  : ''"
                :state="v$.aplicacion.id_detalle_estrategia.$error === true
                ? false
                : null"
                @blur.native="v$.aplicacion.id_detalle_estrategia.$touch"
                :disabled="estrategiasDisponiblesOption.length === 0"
              />
              <b-alert
                v-if="estrategiasDisponiblesOption.length === 0"
                class="pl-50 pt-25 pb-25 pr-50 mt-50 mb-25"
                variant="primary"
                show
              >
                Para crear una nueva estrategia, dirígase al menú "II 1 b".
              </b-alert>
              <div
                v-if="v$.aplicacion.id_detalle_estrategia.$error"
                id="asistentesInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.aplicacion.id_detalle_estrategia.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: ACCIÓN -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Acción desarrollada*"
              label-for="desarrollo"
            >
              <b-form-textarea
                id="desarrollo"
                placeholder="Ingresa la acción desarrollada"
                v-model="aplicacion.acciones"
                rows="2"
                :state="v$.aplicacion.acciones.$error === true
                ? false
                : null"
                @blur.native="v$.aplicacion.acciones.$touch"
              />
              <!-- Mensajes Validaciones -->
              <b-form-invalid-feedback
                v-if="v$.aplicacion.acciones.$error"
                id="accionInfo"
                class="text-right"
              >
                <p v-for="error of v$.aplicacion.acciones.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: EVALUACIÓN -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Evaluación (resultados) de las estrategias aplicadas *"
              label-for="evaluacion"
            >
              <b-form-textarea
                id="evaluacion"
                v-model="aplicacion.evaluacion"
                placeholder="Ingresa la evaluación"
                :state="v$.aplicacion.evaluacion.$error === true
                  ? false
                  : null"
                @blur.native="v$.aplicacion.evaluacion.$touch"
              />
              <!-- Mensajes Validaciones -->
              <b-form-invalid-feedback
                v-if="v$.aplicacion.evaluacion.$error"
                id="evaluacionInfo"
                class="text-right"
              >
                <p v-for="error of v$.aplicacion.evaluacion.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

      </b-form>
    </b-overlay>
  </b-modal>
</template>

<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BModal, VBModal, BAlert,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

import { mapGetters, mapActions, mapMutations } from 'vuex'

// Validaciones //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

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
    BAvatar,
    BOverlay,
    BFormDatepicker,
    BFormTimepicker,
    BFormTextarea,
    BModal,
    BAlert,
    vSelect,
    VBModal,
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  computed: {
    ...mapGetters({
      getEstrategiasDisponibles: 'II_1_b_estrategias/getEstrategiasDisponibles',
      // getEstrategiasDisponibles: 'III_1_a_acciones_de_aplicacion/getEstrategiasDisponibles',
      getLibroSelected: 'libros/getLibroSelected',
    }),
  },
  data() {
    return {
      cargando: true,
      estrategiasDisponiblesDisabled: false,
      estrategiasDisponiblesOption: [],

      // required,
      // email,
      // dependenciasOption: [
      //   { value: 'Municipal', text: 'Municipal' },
      //   { value: 'Paricular', text: 'Paricular' },
      //   { value: 'Particular Subvencionado', text: 'Particular Subvencionado' },
      // ],
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
    aplicacion: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      aplicacion: {
        id_detalle_estrategia: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        acciones: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.', maxLength(550)),
        },
        evaluacion: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.', maxLength(550)),
        },
        // abreviatura: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 10 caracteres.', maxLength(10)),
        // },
        // correo: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   email: helpers.withMessage('Debe ser un correo valido.', email),
        // },
      }
    }
  },
  // watch: {
  //   getEstrategiasDisponibles(val) {
  //     console.log('getEstrategiasDisponibles :', val)
  //   },
  // },
  mounted() {
    this.cargaEstrategiasDisponibles(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchEstrategiasDisponibles: 'II_1_b_estrategias/fetchEstrategiasDisponibles',
      // updateReuniones: 'I_2_reuniones/updateReuniones',
      // removeReunion: 'I_2_reuniones/removeReunion',
    }),
    cargaEstrategiasDisponibles(idCurso) {
      this.fetchEstrategiasDisponibles(idCurso).then(() => {
        if (typeof this.aplicacion.estrategia !== 'undefined') {
          this.estrategiasDisponiblesDisabled = true
          this.estrategiasDisponiblesOption = []
          // this.estrategiasDisponiblesOption = this.getEstrategiasDisponibles
          this.estrategiasDisponiblesOption.push({
            id: this.aplicacion.id_detalle_estrategia,
            estrategia: this.aplicacion.estrategia,
          })
        } else {
          this.estrategiasDisponiblesOption = []
          this.estrategiasDisponiblesOption = this.getEstrategiasDisponibles
        }
      })
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
    submitOption() {
      this.v$.aplicacion.$touch()
        // this.cargando = true
      if (!this.v$.aplicacion.$invalid) {
        // this.cargando = false
        this.$emit('processForm', this.aplicacion)
      }
    },
    // submitOption() {
    //   console.log('this.v$ :', this.v$.reunion)
    //   this.v$.reunion.$touch()
    //   // if (!this.v$.reunion.$invalid) {
    //   //   this.$emit('processForm', this.reunion)
    //   // }
    // },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
