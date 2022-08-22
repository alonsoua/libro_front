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
        <!-- Establecimiento Info: Input Fields -->
        <b-row>

          <!-- Field: Imagen -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Insignia"
              label-for="insignia"
            >
              <!-- Media -->
              <b-media class="mb-2">
                <template #aside>
                  <b-avatar
                    ref="previewEl"
                    :src="establecimiento.insignia"
                    :text="establecimiento.nombre == ''
                      ? 'E'
                      : avatarText(establecimiento.nombre)"
                    size="90px"
                    rounded
                    variant="light-success"
                    :title="establecimiento.nombre == ''
                      ? 'E'
                      : avatarText(establecimiento.nombre)"
                  />
                </template>
                <div class="d-flex flex-wrap">
                  <b-button
                    variant="primary"
                    size="sm"
                    @click="$refs.refInputEl.click()"
                  >
                    <input
                      :id="establecimiento.insignia"
                      ref="refInputEl"
                      type="file"
                      class="d-none"
                      accept="image/png,image/jpeg,image/jpg"
                      @input="inputImageRenderer"
                      @change="onFileSelected"
                    >
                    <span class="d-none d-sm-inline">
                      Seleccionar insignia
                    </span>
                    <feather-icon
                      icon="UploadIcon"
                      class="d-inline d-sm-none"
                    />
                  </b-button>
                  <b-button
                    variant="outline-secondary"
                    class="ml-1"
                    size="sm"
                    @click="establecimiento.insignia = ''"
                  >
                    <span class="d-none d-sm-inline">Eliminar</span>
                    <feather-icon
                      icon="TrashIcon"
                      class="d-inline d-sm-none"
                    />
                  </b-button>
                </div>
                <div class="mt-2 d-inline-block">
                  <h4 class="mb-1">
                    <span v-if="establecimiento.rbd">
                      {{ establecimiento.rbd }}
                    </span>
                    <span v-if="establecimiento.rbd && establecimiento.nombre">
                      <feather-icon
                        icon="ChevronsRightIcon"
                      />
                    </span>
                    <span v-if="establecimiento.nombre">
                      {{ establecimiento.nombre }}
                    </span>
                  </h4>
                </div>
              </b-media>
            </b-form-group>
          </b-col>

          <!-- Field: RBD -->
          <b-col
            cols="12"
            md="2"
          >
            <b-form-group
              label="RBD *"
              label-for="rbd"
            >
              <b-form-input
                id="rbd"
                v-model="establecimiento.rbd"
                placeholder="Ingresa el rbd"
                :state="v$.establecimiento.rbd.$error === true
                ? false
                : null"
                @blur.native="v$.establecimiento.rbd.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.establecimiento.rbd.$error"
                id="rbdInfo"
              >
                <p v-for="error of v$.establecimiento.rbd.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Nombre -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Nombre *"
              label-for="nombre"
            >
              <b-form-input
                id="nombre"
                v-model="establecimiento.nombre"
                placeholder="Ingresa el nombre"
                :state="v$.establecimiento.nombre.$error === true
                ? false
                : null"
                @blur.native="v$.establecimiento.nombre.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.establecimiento.nombre.$error"
                id="nombreInfo"
              >
                <p v-for="error of v$.establecimiento.nombre.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Abreviatura -->
          <b-col
            cols="12"
            md="2"
          >
            <b-form-group
              label="Abreviatura *"
              label-for="abreviatura"
            >
              <b-form-input
                id="abreviatura"
                v-model="establecimiento.abreviatura"
                placeholder="Ingresa la abreviatura"
                :state="v$.establecimiento.abreviatura.$error === true
                ? false
                : null"
                @blur.native="v$.establecimiento.abreviatura.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.establecimiento.abreviatura.$error"
                id="abreviaturaInfo"
              >
                <p v-for="error of v$.establecimiento.abreviatura.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Correo -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Correo *"
              label-for="correo"
            >
              <b-form-input
                id="correo"
                v-model="establecimiento.correo"
                placeholder="Ingresa el correo"
                :state="v$.establecimiento.correo.$error === true
                ? false
                : null"
                @blur.native="v$.establecimiento.correo.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.establecimiento.correo.$error"
                id="correoInfo"
              >
                <p v-for="error of v$.establecimiento.correo.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
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

// Imágen //
import { avatarText } from '@core/utils/filter'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

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
  setup(props) {
    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.establecimiento.insignia = base64
    })

    return {
      v$: useVuelidate(),
      avatarText,
      previewEl,
      refInputEl,
      inputImageRenderer,
    }
  },
  data() {
    return {
      cargando: true,
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
    establecimiento: {
      type: Object,
      required: true,
    },
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Guardar Establecimiento',
    },
  },
  validations() {
    return {
      establecimiento: {
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
        // correo: {
        //   required,
        //   email,
        //   maxLength: maxLength(80),
        // },
        // telefono: {
        //   required,
        //   maxLength: maxLength(25),
        // },
        // direccion: {
        //   required,
        //   maxLength: maxLength(250),
        // },
        // dependencia: {
        //   required,
        // },
        // estado: {},
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.establecimiento)
      this.v$.establecimiento.$touch()
      // if (!this.v$.establecimiento.$invalid) {
      //   this.$emit('processForm', this.establecimiento)
      // }
    },
    onFileSelected(e) {
      // Obtiene primera Imagen
      const file = e.target.files[0]
      this.cargarImg(file)
    },
    cargarImg(file) {
      // Objeto que permite trabajar con archivos
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.establecimiento.insignia = e.target.result
      }
    },
  },
}
</script>
