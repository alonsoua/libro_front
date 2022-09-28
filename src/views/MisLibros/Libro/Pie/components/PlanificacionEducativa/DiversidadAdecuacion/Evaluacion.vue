<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      class="mb-3"
    >

      <!-- Row Loop -->
      <b-row
        ref="row"
      >
        <!-- EVALUACION DE PROCESO Y ACANCE -->
        <b-col md="12">
          <b-form-group
            label="Evaluación de proceso y avance"
            label-for="proceso"
          >
            <b-form-textarea
              id="proceso"
              placeholder="Indique estrategias y procedimientos que aplicará para las siguientes evaluaciones:
- Evaluaciones para el aprendizaje, periódicas, se recomiendan quincenales.
- Evaluaciones de resultados; trimestrales, semestrales con informe escrito a la Familia."
              v-model="evaluacion.proceso"
              rows="4"
              :state="v$.evaluacion.proceso.$error === true
                ? false
                : null"
              @blur.native="v$.evaluacion.proceso.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.evaluacion.proceso.$error"
              id="evaluacionInfo"
              class="text-right"
            >
              <p
                v-for="error of v$.evaluacion.proceso.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- EVALUACIÓN ANUAL -->
        <b-col md="12">
          <b-form-group
            label="Evaluación anual de logros de aprendizaje; de evolución
            del déficit o trastorno, de egreso o de continuidad en el PIE"
            label-for="evaluacionAnual"
          >
            <b-form-textarea
              id="evaluacionAnual"
              placeholder="Indique estrategias y procedimientos que aplicará para las siguientes evaluaciones:
- Evaluaciones para el aprendizaje, periódicas, se recomiendan quincenales.
- Evaluaciones de resultados; trimestrales, semestrales con informe escrito a la Familia."
              v-model="evaluacion.evaluacionAnual"
              rows="4"
              :state="v$.evaluacion.evaluacionAnual.$error === true
                ? false
                : null"
              @blur.native="v$.evaluacion.evaluacionAnual.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.evaluacion.evaluacionAnual.$error"
              id="evaluacionAnualInfo"
              class="text-right"
            >
              <p
                v-for="error of v$.evaluacion.evaluacionAnual.$errors"
                :key="error.$uid"
              >
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
              placeholder="Indique las observaciones"
              v-model="evaluacion.observaciones"
              rows="4"
              :state="v$.evaluacion.observaciones.$error === true
                ? false
                : null"
              @blur.native="v$.evaluacion.observaciones.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.evaluacion.observaciones.$error"
              id="observacionesInfo"
              class="text-right"
            >
              <p
                v-for="error of v$.evaluacion.observaciones.$errors"
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
            :disabled="this.v$.evaluacion.$errors.length > 0"
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
      getEvaluacion: 'II_3_c_evaluacion/getEvaluacion',
      getLibroSelected: 'libros/getLibroSelected'
    }),
  },
  data() {
    return {
      evaluacion: [],
      cargando: false,
    }
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Estrategia',
    },
  },
  watch: {
    getLibroSelected(getLibroSelected) {
      this.cargarEvaluacion(getLibroSelected.id)
    },
  },
  validations() {
    return {
      evaluacion: {
        proceso: {
          $autoDirty: true,
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 550 caracteres.',
            maxLength(550)),
        },
        evaluacionAnual: {
          $autoDirty: true,
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 550 caracteres.',
            maxLength(550)),
        },
        observaciones: {
          $autoDirty: true,
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 550 caracteres.',
            maxLength(550)),
        },
      }
    }
  },
  mounted() {
    this.cargarEvaluacion(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchEvaluacion: 'II_3_c_evaluacion/fetchEvaluacion',
      addEvaluacion: 'II_3_c_evaluacion/addEvaluacion',
      updateEvaluacion: 'II_3_c_evaluacion/updateEvaluacion',
    }),
    cargarEvaluacion(idCurso) {
      this.cargando = true
      this.fetchEvaluacion(idCurso).then(() => {
        if (typeof this.getEvaluacion !== 'undefined') {
          this.evaluacion = {
            proceso: this.getEvaluacion.evaluacion,
            evaluacionAnual: this.getEvaluacion.estrategia,
            observaciones: this.getEvaluacion.observaciones,
          }
        } else {
          this.evaluacion = []
        }
        this.cargando = false
      }).catch(() => {
        this.cargando = false
      })
    },
    submitOption() {
      this.v$.evaluacion.$touch()
      if (!this.v$.evaluacion.$invalid) {
        const text = `Estás seguro de actualizar las estrategias y
          procedimientos de evaluación?`
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
            if (typeof this.getEvaluacion === 'undefined') {
              this.agregar(this.evaluacion)
            } else {
              this.editar(this.evaluacion)
            }
          } else {
            return false
          }
        })
      }
    },
    agregar(evaluacion) {
      const datos = {
        idCurso: this.getLibroSelected.id,
        evaluacion: evaluacion.proceso,
        estrategia: evaluacion.evaluacionAnual,
        observaciones: evaluacion.observaciones,
      }

      this.spinner = true
      this.addEvaluacion(datos).then((response) => {
        this.msjActualizar()
        this.cargarEvaluacion(this.getLibroSelected.id)
        this.spinner = false
      })
    },

    editar(evaluacion) {
      const datos = {
        id: this.getEvaluacion.id,
        idCurso: this.getLibroSelected.id,
        evaluacion: evaluacion.proceso,
        estrategia: evaluacion.evaluacionAnual,
        observaciones: evaluacion.observaciones,
      }
      this.spinner = true
      this.updateEvaluacion(datos).then((reponse) => {
        this.msjActualizar()
        this.cargarEvaluacion(this.getLibroSelected.id)
        this.spinner = false
      })
    },

    msjActualizar() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Registro actualizado 👍',
          icon: 'CheckIcon',
          text: `Las estrategias y procedimientos de evaluación han sido actualizadas con éxito!`,
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
