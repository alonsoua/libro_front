<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      class="repeater-form mb-3"
    >

      <!-- Row Loop -->
      <b-row
        ref="row"
      >

        <!-- APRENDIZAJES -->
        <b-col md="12">
          <b-form-group
            label="Estilos y modos de aprendizaje del curso"
            label-for="aprendizajes"
          >
            <b-form-textarea
              id="aprendizajes"
              placeholder="Ingresa los estilos y modos de aprendizaje"
              v-model="panorama.estilo"
              rows="4"
              :state="v$.panorama.estilo.$error === true
                ? false
                : null"
              @blur.native="v$.panorama.estilo.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.panorama.estilo.$error"
              id="estiloInfo"
              class="text-right"
            >
              <p
                v-for="error of v$.panorama.estilo.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- FORTALEZAS -->
        <b-col md="12">
          <b-form-group
            label="Fortalezas del curso"
            label-for="fortalezas"
          >
            <b-form-textarea
              id="fortalezas"
              placeholder="Ingresa las fortalezas"
              v-model="panorama.fortaleza"
              rows="4"
              :state="v$.panorama.fortaleza.$error === true
                ? false
                : null"
              @blur.native="v$.panorama.fortaleza.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.panorama.fortaleza.$error"
              id="fortalezaInfo"
              class="text-right"
            >
              <p
                v-for="error of v$.panorama.fortaleza.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- NECESIDADES -->
        <b-col md="12">
          <b-form-group
            label="Necesidades de apoyo del curso"
            label-for="necesidades"
          >
            <b-form-textarea
              id="necesidades"
              placeholder="Ingresa las necesidades"
              v-model="panorama.necesidad"
              rows="4"
              :state="v$.panorama.necesidad.$error === true
                ? false
                : null"
              @blur.native="v$.panorama.necesidad.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.panorama.necesidad.$error"
              id="necesidadInfo"
              class="text-right"
            >
              <p
                v-for="error of v$.panorama.necesidad.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
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
            :disabled="this.v$.panorama.$errors.length > 0"
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
  BFormTextarea, BFormInvalidFeedback
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store/index'
import ToastificationContent
from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters, mapActions } from 'vuex'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required
  , maxLength, email, helpers } from '@vuelidate/validators'

// COMPONENTES RECICLADOS
import colLinea from '../../../../../../components/Form/colLinea.vue'
import btnSubmit from '../../../../../../components/Form/btnSubmit.vue'

export default {
  components: {
    BOverlay,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BCardText,
    BFormTextarea,
    BFormInvalidFeedback,
    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  computed: {
    ...mapGetters({
      getPanorama: 'II_1_a_panorama/getPanorama',
      getLibroSelected: 'libros/getLibroSelected'
    }),
  },
  data() {
    return {
      panorama: [],
      cargando: true,
    }
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Panorama',
    },
  },
  watch: {
    getLibroSelected(getLibroSelected) {
      this.cargarPanorama(getLibroSelected.id)
    }
  },
  validations() {
    return {
      panorama: {
        estilo: {
          $autoDirty: true,
          // required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 550 caracteres.',
            maxLength(550)),
        },
        fortaleza: {
          $autoDirty: true,
          // required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 550 caracteres.',
            maxLength(550)),
        },
        necesidad: {
          $autoDirty: true,
          // required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 550 caracteres.',
            maxLength(550)),
        },
      }
    }
  },
  mounted() {
    this.cargarPanorama(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchPanorama: 'II_1_a_panorama/fetchPanorama',
      addPanorama: 'II_1_a_panorama/addPanorama',
      updatePanorama: 'II_1_a_panorama/updatePanorama',
    }),
    cargarPanorama(idCurso) {
      this.cargando = true
      this.fetchPanorama(idCurso).then(() => {
        if (this.getPanorama.message !== 'Registro no existe') {
          this.panorama = this.getPanorama
        } else {
          this.panorama = []
        }
        this.cargando = false
      })
    },
    submitOption() {
      this.v$.panorama.$touch()
      if (!this.v$.panorama.$invalid) {
        const html = `
        <p class="mb-75 mt-50 text-center">
          Estás seguro de actualizar el panorama<br>del curso?
        </p>
        <i
          class="text-secondary"
          style="font-size: 0.94rem;"
        >
          "La información ingresada en el panorama,<br>se verá reflejada en el perfil del curso"
        </i>`
        this.$swal({
          title: 'Guardar cambios',
          html,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Si, guardar',
          cancelButtonText: 'Cancelar',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-secondary ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            if (this.getPanorama.message === 'Registro no existe') {
              this.agregar(this.panorama)
            } else {
              this.editar(this.panorama)
            }
          } else {
            return false
          }
        })
      }
      // si getPanorama es undefined crea
      // si getPanorama no es undefined actualiza
      // this.v$.asistencia.$touch()
      // if (!this.v$.asistencia.$invalid) {
      //   this.$emit('processForm', this.asistencia)
      // }
    },

    agregar(panorama) {
      const datos = {
        idCurso: this.getLibroSelected.id,
        estilo: panorama.estilo,
        fortaleza: panorama.fortaleza,
        necesidad: panorama.necesidad,
      }
      this.spinner = true
      this.addPanorama(datos).then((response) => {
        this.msjActualizar()
        this.cargarPanorama(this.getLibroSelected.id)
        this.spinner = false
      })
    },

    editar(panorama) {
      const datos = {
        id: panorama.id,
        idCurso: this.getLibroSelected.id,
        estilo: panorama.estilo,
        fortaleza: panorama.fortaleza,
        necesidad: panorama.necesidad,
      }
      this.spinner = true
      this.updatePanorama(datos).then((reponse) => {
        this.msjActualizar()
        this.cargarPanorama(this.getLibroSelected.id)
        this.spinner = false
      })
    },

    msjActualizar() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Panorama actualizado 👍',
          icon: 'CheckIcon',
          text: `El panorama fue actualizado con éxito!`,
          variant: 'success',
        },
      },
      {
        position: 'bottom-right',
        timeout: 3000,
      })
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
}
</script>
