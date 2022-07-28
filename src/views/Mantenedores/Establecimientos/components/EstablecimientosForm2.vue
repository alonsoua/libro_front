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
      <b-form @submit.prevent="$emit('processForm', establecimiento)">
        <!-- Establecimiento Info: Input Fields -->
        <b-row>
          <!-- Field: Imagen -->
          <b-col
            cols="12"
            md="12"
          >

            <b-form-group
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
                <div class="d-flex flex-wrap">
                  <b-button
                    variant="primary"
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
                      Seleccionar
                    </span>
                    <feather-icon
                      icon="EditIcon"
                      class="d-inline d-sm-none"
                    />
                  </b-button>
                  <b-button
                    variant="outline-secondary"
                    class="ml-1"
                    @click="establecimiento.insignia = ''"
                  >
                    <span class="d-none d-sm-inline">Eliminar</span>
                    <feather-icon
                      icon="TrashIcon"
                      class="d-inline d-sm-none"
                    />
                  </b-button>
                </div>
              </b-media>
            </b-form-group>
          </b-col>

          <!-- Field: Nombre -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Nombre"
              label-for="nombre"
            >
              <b-form-input
                id="nombre"
                v-model="establecimiento.nombre"
                placeholder="Ingresa el nombre"
                :state="establecimiento.nombre
                  ? $v.establecimiento.nombre.$invalid == true
                    ? false
                    : null
                  : null"
                @input="$v.establecimiento.$touch"
              />
              <b-form-invalid-feedback
                v-if="$v.establecimiento.$dirty"
                id="nombreInfo"
              >
                El campo nombre
                <span v-if="!$v.establecimiento.nombre.required">
                  es requerido.
                </span>
                <span v-if="!$v.establecimiento.nombre.maxLength">
                  debe tener máximo 200 caracteres.
                </span>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: rbd -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="RBD"
              label-for="rbd"
            >
              <b-form-input
                id="rbd"
                v-model="establecimiento.rbd"
                placeholder="Ingresa el rbd"
                :state="establecimiento.rbd
                  ? $v.establecimiento.rbd.$invalid == true
                    ? false
                    : null
                  : null"
                @input="$v.establecimiento.$touch"
              />
              <b-form-invalid-feedback
                v-if="$v.establecimiento.$dirty"
                id="rbdInfo"
              >
                El campo rbd
                <span v-if="!$v.establecimiento.rbd.required">
                  es requerido.
                </span>
                <span v-if="!$v.establecimiento.rbd.maxLength">
                  debe tener máximo 10 caracteres.
                </span>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Correo -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Correo"
              label-for="correo"
            >
              <b-form-input
                id="correo"
                v-model="establecimiento.correo"
                placeholder="Ingresa el correo"
                :state="establecimiento.correo
                  ? $v.establecimiento.correo.$invalid == true
                    ? false
                    : null
                  : null"
                @input="$v.establecimiento.$touch"
              />
              <b-form-invalid-feedback
                v-if="$v.establecimiento.$dirty"
                id="correoInfo"
              >
                El campo correo
                <span v-if="!$v.establecimiento.correo.required">
                  es requerido.
                </span>
                <span v-if="!$v.establecimiento.correo.email">
                  debe ser un correo válido.
                </span>
                <span v-if="!$v.establecimiento.correo.maxLength">
                  debe tener máximo 80 caracteres.
                </span>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Teléfono -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Teléfono"
              label-for="telefono"
            >
              <b-form-input
                id="telefono"
                v-model="establecimiento.telefono"
                placeholder="Ingresa el teléfono"
                :state="establecimiento.telefono
                  ? $v.establecimiento.telefono.$invalid == true
                    ? false
                    : null
                  : null"
                @input="$v.establecimiento.$touch"
              />
              <b-form-invalid-feedback
                v-if="$v.establecimiento.$dirty"
                id="telefonoInfo"
              >
                El campo telefono
                <span v-if="!$v.establecimiento.telefono.required">
                  es requerido.
                </span>
                <span v-if="!$v.establecimiento.telefono.maxLength">
                  debe tener máximo 25 caracteres.
                </span>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Dirección -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Dirección"
              label-for="direccion"
            >
              <b-form-input
                id="direccion"
                v-model="establecimiento.direccion"
                placeholder="Ingresa la dirección"
                :state="establecimiento.direccion
                  ? $v.establecimiento.direccion.$invalid == true
                    ? false
                    : null
                  : null"
                @input="$v.establecimiento.$touch"
              />
              <b-form-invalid-feedback
                v-if="$v.establecimiento.$dirty"
                id="direccionInfo"
              >
                El campo direccion
                <span v-if="!$v.establecimiento.direccion.required">
                  es requerido.
                </span>
                <span v-if="!$v.establecimiento.direccion.maxLength">
                  debe tener máximo 250 caracteres.
                </span>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: Dependencia -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Dependencia"
              label-for="dependencia"
            >
              <v-select
                v-model="establecimiento.dependencia"
                placeholder="Selecciona una dependencia"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="dependenciasOption"
                label="text"
                :reduce="option => option.value"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <colLinea />

        <!-- Action Buttons -->
        <!-- <btnSubmit
          v-if="cargando"
          :btnText="btnSubmit"
          :btnDisabled="$v.establecimiento.$invalid"
        /> -->

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

import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { validationMixin } from 'vuelidate'
import {
  required, email, maxLength,
} from 'vuelidate/lib/validators'
// import { mapActions, mapState } from 'vuex'
import { avatarText } from '@core/utils/filter'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

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
  mixins: [validationMixin],
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
  data() {
    return {
      cargando: true,
      required,
      email,
      dependenciasOption: [
        { value: 'Municipal', text: 'Municipal' },
        { value: 'Paricular', text: 'Paricular' },
        { value: 'Particular Subvencionado', text: 'Particular Subvencionado' },
      ],
    }
  },
  validations: {
    establecimiento: {
      nombre: {
        required,
        maxLength: maxLength(200),
      },
      rbd: {
        required,
        maxLength: maxLength(10),
      },
      correo: {
        required,
        email,
        maxLength: maxLength(80),
      },
      telefono: {
        required,
        maxLength: maxLength(25),
      },
      direccion: {
        required,
        maxLength: maxLength(250),
      },
      dependencia: {
        required,
      },
      estado: {},
    },
  },
  methods: {
    submitOption() {
      this.$v.establecimiento.$touch()
      if (!this.$v.establecimiento.$invalid) {
        this.$emit('processForm', this.establecimiento)
      }
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
  setup(props) {
    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.establecimiento.insignia = base64
    })

    return {
      avatarText,
      previewEl,
      refInputEl,
      inputImageRenderer,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
  .mt-1-alarma {
    margin-top: 9px;
  }
</style>
