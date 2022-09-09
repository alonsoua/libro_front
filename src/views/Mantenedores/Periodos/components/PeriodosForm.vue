<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-card
      aria-hidden="true"
      class="mb-0"
    >
      <b-form>
        <!-- Periodo Info: Input Fields -->
        <b-row>

          <!-- Field: Periodo -->
          <b-col>
            <b-form-group
              label="Periodo *"
              label-for="periodo"
            >
              <v-select
                v-model="periodo.periodo"
                placeholder="Selecciona el periodo"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="periodo"
                :options="periodosOption"
                :reduce="option => option.id"
                input-id="idPeriodo"
              />

              <!-- <b-form-input
                id="periodo"
                v-model="periodo.periodo"
                placeholder="Ingresa el periodo"
                :state="v$.periodo.periodo.$error === true
                ? false
                : null"
                @blur.native="v$.periodo.periodo.$touch"
              />
              // Mensajes Error Validación
              <b-form-invalid-feedback
                v-if="v$.periodo.periodo.$error"
                id="periodoInfo"
              >
                <p v-for="error of v$.periodo.periodo.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback> -->
            </b-form-group>
          </b-col>

        </b-row>

        <colLinea />

        <!-- Action Buttons -->
        <btnSubmit
          v-if="cargando"
          variant="primary"
          :btnText="btnSubmit"
          @processBtn="submitOption"
        />
      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

// Validaciones //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// Componentes //
import btnSubmit from '../../../components/Form/btnSubmit.vue'
import colLinea from '../../../components/Form/colLinea.vue'

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
    vSelect,
    BOverlay,
    BCard,

    btnSubmit,
    colLinea,
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      cargando: true,
      // email,
      // required,
      periodosOption: [
        { id: 1, periodo: '2022' },
        { id: 2, periodo: '2023' },
      ],
    }
  },
  props: {
    periodo: {
      type: Object,
      required: true,
    },
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Guardar Periodo',
    },
  },
  validations() {
    return {
      periodo: {
        rbd: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 8 caracteres.', maxLength(8)),
        },
        nombre: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
        },
        abreviatura: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 10 caracteres.', maxLength(10)),
        },
        correo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          email: helpers.withMessage('Debe ser un correo valido.', email),
        },
      }
    }
  },
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.periodo)
      this.v$.periodo.$touch()
      // if (!this.v$.periodo.$invalid) {
      //   this.$emit('processForm', this.periodo)
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
