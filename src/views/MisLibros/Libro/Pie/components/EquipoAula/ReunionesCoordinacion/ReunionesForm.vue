<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="lg"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar Reunión"
    :ok-disabled="this.v$.reunion.$errors.length > 0"
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

          <!-- Field: FECHA -->
          <b-col
            cols="6"
            md="6"
          >
            <b-form-group
              label="Fecha *"
              label-for="fecha"
            >
              <!-- <b-form-input
                id="fecha"
                v-model="reunion.fecha"
                placeholder="Ingresa el fecha"
              /> -->


              <b-form-datepicker
                v-model="reunion.fecha"
                id="fecha"
                placeholder="Selecciona una fecha"
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
                :state="v$.reunion.fecha.$error === true
                  ? false
                  : null"
                @blur.native="v$.reunion.fecha.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.reunion.fecha.$error"
                id="fechaInfo"
                class="text-right"
              >
                <p v-for="error of v$.reunion.fecha.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: HORA -->
          <b-col
            cols="6"
            md="6"
          >
            <b-form-group
              label="Hora *"
              label-for="horario"
            >
              <b-input-group class='mb-1'>
                <cleave
                  id="time"
                  v-model='reunion.horario'
                  class="form-control"
                  :raw="false"
                  :options="time"
                  placeholder="hh:mm"
                />

                <b-input-group-append>
                  <b-form-timepicker
                    v-model='reunion.horario'
                    button-only
                    size='sm'
                    @keyup='formatHoraInput(reunion.horario)'
                    aria-controls='horario'
                    hide-header
                    right
                    locale='es-CL'
                    no-close-button
                    :state="v$.reunion.horario.$error === true
                      ? false
                      : null"
                    @blur.native="v$.reunion.horario.$touch"
                  />
                </b-input-group-append>
              </b-input-group>
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.reunion.horario.$error"
                id="horarioInfo"
                class="text-right"
              >
                <p v-for="error of v$.reunion.horario.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Asistentes -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Asistentes *"
              label-for="asistentes"
            >
              <v-select
                v-model="reunion.asistentes"
                multiple
                placeholder="Selecciona los asistentes"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="texto"
                :options="asistentesOption"
                :reduce="option => option.id"
                input-id="asistentes"
                :class="v$.reunion.asistentes.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
              <div
                v-if="v$.reunion.asistentes.$error"
                id="asistentesInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.reunion.asistentes.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: Acuerdos -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Acuerdos *"
              label-for="acuerdos"
            >
              <b-form-textarea
                id="acuerdos"
                placeholder="Ingresa los acuerdos"
                v-model="reunion.acuerdos"
                rows="4"
                :state="v$.reunion.acuerdos.$error === true
                  ? false
                  : null"
                @blur.native="v$.reunion.acuerdos.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.reunion.acuerdos.$error"
                id="acuerdosInfo"
                class="text-right"
              >
                <p v-for="error of v$.reunion.acuerdos.$errors" :key="error.$uid">
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

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BModal, VBModal, BInputGroup, BInputGroupAppend
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

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
      // datatimer
      time: {
        time: true,
        timePattern: ['h', 'm'],
      },
      cargando: true,
      asistentesOption: [
        { id: 1, texto: 'Raul Retamal Cortes' },
        { id: 2, texto: 'Alonso Bastián Ugarte Álvarez' },
      ],
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
    reunion: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      reunion: {
        fecha: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        horario: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        asistentes: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        acuerdos: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 500 caracteres.', maxLength(500)),
        },
      }
    }
  },
  methods: {
    submitOption() {
      this.v$.reunion.$touch()
        // this.cargando = true
      if (!this.v$.reunion.$invalid) {
        // this.cargando = false
        this.$emit('processForm', this.reunion)
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
