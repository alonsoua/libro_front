<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="lg"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar Evaluación"
    :ok-disabled="this.v$.evaluacion.$errors.length > 0"
    @ok.prevent="submitOption"
  >
    <b-overlay
      :show="cargando"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <b-form>
        <!-- Evaluación Info: Input Fields -->
        <b-row>

          <!-- Field: Contenido -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Contenido *"
              label-for="contenido"
            >
              <b-form-input
                id="contenido"
                v-model="evaluacion.contenido"
                placeholder="Ingresa el contenido"
                :state="v$.evaluacion.contenido.$error === true
                  ? false
                  : null"
                @blur.native="v$.evaluacion.contenido.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.evaluacion.contenido.$error"
                id="contenidoInfo"
                class="text-right"
              >
                <p v-for="error of v$.evaluacion.contenido.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: PERIODO -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Período de tiempo en que se aplicará *"
              label-for="periodo"
            >
              <v-select
                v-model="evaluacion.id_periodo"
                placeholder="Selecciona un periodo..."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="texto"
                :options="periodosOption"
                :reduce="option => option.id"
                input-id="id_periodo"
                :class="v$.evaluacion.id_periodo.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
              <div
                v-if="v$.evaluacion.id_periodo.$error"
                id="id_periodoInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.evaluacion.id_periodo.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: FECHA -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Fecha *"
              label-for="fecha"
            >
              <b-form-datepicker
                v-model="evaluacion.fecha"
                id="fecha"
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
                :state="v$.evaluacion.fecha.$error === true
                  ? false
                  : null"
                @blur.native="v$.evaluacion.fecha.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.evaluacion.fecha.$error"
                id="fechaInfo"
                class="text-right"
              >
                <p v-for="error of v$.evaluacion.fecha.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>


          <!-- Field: Coeficiente -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Coeficiente *"
              label-for="coeficiente"
            >
              <v-select
                v-model="evaluacion.coeficiente"
                placeholder="Selecciona el coeficiente..."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="texto"
                :options="coeficientesOption"
                :reduce="option => option.id"
                input-id="coeficiente"
                :class="v$.evaluacion.coeficiente.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
              <div
                v-if="v$.evaluacion.coeficiente.$error"
                id="coeficienteInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.evaluacion.coeficiente.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

        </b-row>

      </b-form>
    </b-overlay>
  </b-modal>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BModal, VBModal, BInputGroup, BInputGroupAppend
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

import { mapGetters, mapActions } from 'vuex'

// CLEAVE
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

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
    BModal,
    BInputGroup,
    BInputGroupAppend,
    VBModal,
    vSelect,
    Cleave,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  data() {
    return {
      cargando: false,
      periodosOption: [],
      coeficientesOption: [
        {
          id: 1,
          texto: 'Coeficiente 1',
        },
        {
          id: 2,
          texto: 'Coeficiente 2',
        }
      ],
    }
  },
  computed: {
    ...mapGetters({
      getPeriodosEstablecimiento: 'periodos/getPeriodosEstablecimiento',
      getLibroSelected: 'libros/getLibroSelected',
    }),
    // Vuexy
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  watch: {
    getPeriodosEstablecimiento(val) {
      this.periodosOption = []
      this.periodosOption = this.getPeriodosEstablecimiento
    },
    getLibroSelected(val) {
      this.cargarEquipo(this.getLibroSelected.id)
    },
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
    evaluacion: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      evaluacion: {
        contenido: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 150 caracteres.', maxLength(150)),
        },
        fecha: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        id_periodo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        coeficiente: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
      }
    }
  },
  mounted() {
    this.cargarPeriodos(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchPeriodosEstablecimiento: 'periodos/fetchPeriodosEstablecimiento',
    }),
    cargarPeriodos(idEstablecimiento) {
      // this.cargando = true
      this.fetchPeriodosEstablecimiento(idEstablecimiento).then(() => {
        // this.cargando = false
      })
    },
    submitOption() {
      this.v$.evaluacion.$touch()
        // this.cargando = true
      if (!this.v$.evaluacion.$invalid) {
        // this.cargando = false
        this.$emit('processForm', this.evaluacion)
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
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
