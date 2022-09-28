<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      class="mb-2"
    >

      <!-- Row Loop -->
      <b-row
        ref="row"
      >

        <!-- APOYOS ENTRE PROFESORES -->
        <b-col md="12">
          <b-form-group
            label="Entre profesores (educación especial y profesor regular) <Co-enseñanza>"
            label-for="profesores"
          >
            <b-form-textarea
              id="profesores"
              placeholder="Ingresa las estrategias y/o acciones entre profesores"
              v-model="acciones.profesores"
              rows="4"
              :state="v$.acciones.profesores.$error === true
                ? false
                : null"
              @blur.native="v$.acciones.profesores.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.acciones.profesores.$error"
              id="profesoresInfo"
              class="text-right"
            >
              <p v-for="error of v$.acciones.profesores.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- APOYOS ENTRE PROFESORES Y ASISTENTES -->
        <b-col md="12">
          <b-form-group
            label="Entre profesores y asistentes de la educación (psicólogos, fonoaudiólogos, auxiliares, intérpretes, etc.)"
            label-for="asistentes"
          >
            <b-form-textarea
              id="asistentes"
              placeholder="Ingresa las estrategias y/o acciones entre profesores y asistentes de la educación"
              v-model="acciones.asistentes"
              rows="4"
              :state="v$.acciones.asistentes.$error === true
                ? false
                : null"
              @blur.native="v$.acciones.asistentes.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.acciones.asistentes.$error"
              id="asistentesInfo"
              class="text-right"
            >
              <p v-for="error of v$.acciones.asistentes.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- APOYOS ENTRE ESTUDIANTES -->
        <b-col md="12">
          <b-form-group
            label="Entre estudiantes (Ej: Aprendizaje Colaborativo)"
            label-for="estudiantes"
          >
            <b-form-textarea
              id="estudiantes"
              placeholder="Ingresa las estrategias y/o acciones entre estudiantes"
              v-model="acciones.estudiantes"
              rows="4"
              :state="v$.acciones.estudiantes.$error === true
                ? false
                : null"
              @blur.native="v$.acciones.estudiantes.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.acciones.estudiantes.$error"
              id="estudiantesInfo"
              class="text-right"
            >
              <p v-for="error of v$.acciones.estudiantes.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- APOYOS CON LA FAMILIA -->
        <b-col md="12">
          <b-form-group
            label="Con la familia y entre familias"
            label-for="familia"
          >
            <b-form-textarea
              id="familia"
              placeholder="Ingresa las estrategias y/o acciones con la familia y entre familia"
              v-model="acciones.familia"
              rows="4"
              :state="v$.acciones.familia.$error === true
                ? false
                : null"
              @blur.native="v$.acciones.familia.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.acciones.familia.$error"
              id="familiaInfo"
              class="text-right"
            >
              <p v-for="error of v$.acciones.familia.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- APOYOS CON LA FAMILIA -->
        <b-col md="12">
          <b-form-group
            label="Con la comunidad (con otras Escuelas, Centros Culturales, Servicios, etc)"
            label-for="comunidad"
          >
            <b-form-textarea
              id="comunidad"
              placeholder="Ingresa las estrategias y/o acciones con la comunidad"
              v-model="acciones.comunidad"
              rows="4"
              :state="v$.acciones.comunidad.$error === true
                ? false
                : null"
              @blur.native="v$.acciones.comunidad.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.acciones.comunidad.$error"
              id="comunidadInfo"
              class="text-right"
            >
              <p v-for="error of v$.acciones.comunidad.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- OBSERVACIONES -->
        <b-col md="12">
          <b-form-group
            label="Observaciones"
            label-for="observaciones"
          >
            <b-form-textarea
              id="observaciones"
              placeholder="Ingresa las observaciones"
              v-model="acciones.observaciones"
              rows="4"
              :state="v$.acciones.observaciones.$error === true
                ? false
                : null"
              @blur.native="v$.acciones.observaciones.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.acciones.observaciones.$error"
              id="observacionesInfo"
              class="text-right"
            >
              <p v-for="error of v$.acciones.observaciones.$errors" :key="error.$uid">
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
            v-if="!cargando"
            class="float-right"
            variant="primary"
            :disabled="this.v$.acciones.$errors.length > 0"
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
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters, mapActions } from 'vuex'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required , maxLength, helpers } from '@vuelidate/validators'

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
    BFormInvalidFeedback,

    // COMPONENTES
    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      acciones: [],
      cargando: false,
    }
  },
  computed: {
    ...mapGetters({
      getAcciones: 'II_2_a_acciones/getAcciones',
      getLibroSelected: 'libros/getLibroSelected'
    }),
  },
  watch: {
    getLibroSelected(getLibroSelected) {
      this.cargarAcciones(getLibroSelected.id)
    }
  },
  validations() {
    return {
      acciones: {
        profesores: {
          $autoDirty: true,
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.'
            , maxLength(550)),
        },
        asistentes: {
          $autoDirty: true,
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.'
            , maxLength(550)),
        },
        estudiantes: {
          $autoDirty: true,
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.'
            , maxLength(550)),
        },
        familia: {
          $autoDirty: true,
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.'
            , maxLength(550)),
        },
        comunidad: {
          $autoDirty: true,
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.'
            , maxLength(550)),
        },
        observaciones: {
          $autoDirty: true,
          maxLength: helpers.withMessage('Debe tener un máximo de 550 caracteres.'
            , maxLength(550)),
        },
      }
    }
  },
  mounted() {
    this.cargarAcciones(this.getLibroSelected.id)
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Acciones',
    },
  },
  methods: {
    ...mapActions({
      fetchAcciones: 'II_2_a_acciones/fetchAcciones',
      addAccion: 'II_2_a_acciones/addAccion',
      updateAccion: 'II_2_a_acciones/updateAccion',
    }),
    cargarAcciones(idCurso) {
      this.cargando = true
      this.fetchAcciones(idCurso).then(() => {
        if (typeof this.getAcciones !== 'undefined' && this.getAcciones.length !== 0) {
          this.acciones = this.getAcciones
        } else {
          this.acciones = []
        }
        this.cargando = false
      })
    },

    editar(acciones) {
      const datos = {
        id: acciones.id,
        profesores: acciones.profesores,
        asistentes: acciones.asistentes,
        estudiantes: acciones.estudiantes,
        familia: acciones.familia,
        comunidad: acciones.comunidad,
        observaciones: acciones.observaciones,
        idCurso: this.getLibroSelected.id,
      }
      this.spinner = true
      this.updateAccion(datos).then((reponse) => {
        this.msjActualizar()
        this.cargarAcciones(this.getLibroSelected.id)
        this.spinner = false
      })
    },

    agregar(acciones) {
      const datos = {
        profesores: acciones.profesores,
        asistentes: acciones.asistentes,
        estudiantes: acciones.estudiantes,
        familia: acciones.familia,
        comunidad: acciones.comunidad,
        observaciones: acciones.observaciones,
        idCurso: this.getLibroSelected.id,
      }
      this.spinner = true
      this.addAccion(datos).then((response) => {
        this.msjActualizar()
        this.cargarAcciones(this.getLibroSelected.id)
        this.spinner = false
      })
    },

    submitOption() {
      this.v$.acciones.$touch()
      if (!this.v$.acciones.$invalid) {
        const text = `Estás seguro de actualizar las acciones
          que se implementarán?`
        this.$swal({
          title: 'Guardar cambios!',
          text,
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
            if (typeof this.getAcciones === 'undefined') {
              this.agregar(this.acciones)
            } else {
              this.editar(this.acciones)
            }
          } else {
            return false
          }
        })
      }
    },

    msjActualizar() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Acciones actualizadas 👍',
          icon: 'CheckIcon',
          text: 'Las acciones fueron actualizadas con éxito!',
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
