<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      :style="{height: trHeight}"
      @submit.prevent="repeateAgain"
    >
      <!-- Row Loop -->
      <b-row
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        ref="row"
      >
        <!-- NOMBRE -->
        <b-col md="3">
          <b-form-group
            label="Estrategias de participación"
            label-for="participacion"
          >
            <b>{{ item.participacion }}</b>
            <!-- <div
              v-if="item.participacion !== null"
            >
            </div>
            <div
              v-else
            >
              <b>Otra estrategia</b>
            </div> -->
              <!-- <b-form-textarea
                v-model="item.descripcion"
                id="descripcion"
                type="text"
                placeholder="Ingresa una descripción"
                row="2"
              /> -->
          </b-form-group>
        </b-col>

        <!-- DESCRIPCIÓN -->
        <b-col md="3">
          <b-form-group
            label="Descripción"
            label-for="descripcion"
          >
            <b-form-textarea
              v-model="item.descripcion"
              id="descripcion"
              type="text"
              placeholder="Ingresa una descripción"
              row="2"
            />
          </b-form-group>
        </b-col>

        <!-- DESCRIPCIÓN -->
        <b-col md="3">
          <b-form-group
            label="Seguimiento"
            label-for="seguimiento"
          >
            <b-form-textarea
              v-model="item.seguimiento"
              id="seguimiento"
              type="text"
              placeholder="Ingresa el seguimiento"
              row="2"
            />
          </b-form-group>
        </b-col>

        <!-- Evaluación -->
        <b-col md="3">
          <b-form-group
            label="Evaluación"
            label-for="evaluacion"
          >
            <b-form-textarea
              v-model="item.evaluacion"
              id="evaluacion"
              type="text"
              placeholder="Ingresa la evaluación"
              row="2"
            />
          </b-form-group>
        </b-col>

        <!-- Remove Button -->
        <!-- <b-col
          v-if="index > 2"
          lg="1"
          md="1"
          class=""
        >
          <b-button
            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
            variant="outline-danger"
            class="mt-0 mt-md-3 float-left btn btn-sm"
            @click="deleteEstrategiaDetalle(index, item.id)"
          >
            <feather-icon
              icon="TrashIcon"
            />
            <span></span>
          </b-button>
        </b-col>
        <b-col cols="12">
          <hr>
        </b-col> -->
      </b-row>
      <!-- <b-button
        :disabled="items.length >= 6"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="outline-primary"
        @click="repeateAgain"
      >
        <feather-icon
          icon="PlusIcon"
          class="mr-25"
        />
        <span>Agregar estrategia</span>
      </b-button> -->

      <!-- OBSERVACIONES -->
      <b-row class="mt-3">
        <b-col>
          <b-form-group
            label="Observaciones"
            label-for="observaciones"
          >
            <b-form-textarea
              id="observaciones"
              placeholder="Ingresa las observaciones"
              v-model="estrategia.observaciones"
              rows="4"
              :state="v$.estrategia.observaciones.$error === true
                ? false
                : null"
              @blur.native="v$.estrategia.observaciones.$touch"
            />
            <!-- Mensajes Error Validación -->
            <b-form-invalid-feedback
              v-if="v$.estrategia.observaciones.$error"
              id="observacionesInfo"
              class="text-right"
            >
              <p
                v-for="error of v$.estrategia.observaciones.$errors"
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
      <btnSubmit
        class="float-right"
        variant="primary"
        :disabled="this.v$.estrategia.$errors.length > 0"
        :btnText="btnSubmit"
        @processBtn="submitOption"
      />

    </b-form>
  </b-overlay>
</template>

<script>

// Etiquetas //
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BOverlay, BCardText,
  BFormTextarea,
  BNavItem
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store/index'
import ToastificationContent
from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters, mapActions } from 'vuex'

// Componentes //
import colLinea from '../../../../../components/Form/colLinea.vue'
import btnSubmit from '../../../../../components/Form/btnSubmit.vue'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required
  , maxLength, email, helpers } from '@vuelidate/validators'

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

    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  computed: {
    ...mapGetters({
      getEstrategia: 'II_5_b_estrategias_trabajo/getEstrategia',
      getEstrategiaDetalle: 'II_5_b_estrategias_trabajo/getEstrategiaDetalle',
      getLibroSelected: 'libros/getLibroSelected'
    }),
  },
  data() {
    return {
      cargando: false,
      estrategia: {},
      items: [],
      observaciones: '',
      phone: {
        phone: true,
        phoneRegionCode: 'CL',
      },
      nextTodoId: 2,
    }
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Estrategias',
    },
  },
  validations() {
    return {
      estrategia: {
        observaciones: {
          $autoDirty: true,
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 550 caracteres.',
            maxLength(550)),
        },
        descripcion: {
          $autoDirty: true,
          maxLength: helpers.withMessage(
            'Debe tener un máximo de 3 caracteres.',
            maxLength(3)),
        },
      }
    }
  },
  watch: {
    getLibroSelected(getLibroSelected) {
      this.cargarEstrategias(getLibroSelected.id)
    },
  },
  mounted() {
    // REPEATER
    this.resetItems()
    this.initTrHeight()
    this.cargarEstrategias(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      // ESTRATEGIA
      fetchEstrategia: 'II_5_b_estrategias_trabajo/fetchEstrategia',
      addEstrategia: 'II_5_b_estrategias_trabajo/addEstrategia',
      updateEstrategia: 'II_5_b_estrategias_trabajo/updateEstrategia',

      // ESTRATEGIA DETALLE
      fetchEstrategiaDetalle: 'II_5_b_estrategias_trabajo/fetchEstrategiaDetalle',
      addEstrategiaDetalle: 'II_5_b_estrategias_trabajo/addEstrategiaDetalle',
      updateEstrategiaDetalle: 'II_5_b_estrategias_trabajo/updateEstrategiaDetalle',
      removeEstrategiaDetalle: 'II_5_b_estrategias_trabajo/removeEstrategiaDetalle',
    }),
    cargarEstrategias(idCurso) {
      console.log('idCurso :', idCurso)
      this.cargando = true
      this.fetchEstrategia(idCurso).then(() => {
        if (typeof this.getEstrategia !== 'undefined') {
          this.estrategia = []
          this.estrategia = {
            id: this.getEstrategia.id,
            id_curso: this.getEstrategia.id_curso,
            observaciones: this.getEstrategia.observaciones,
          }
          this.fetchEstrategiaDetalle(this.getEstrategia.id_curso).then(() => {
            // Si el getEstrategiaDetalle llega vacio, deja el valor items
            // tal como está seteado, de lo contrario lo setea.
            if (this.getEstrategiaDetalle.length !== 0) {
              this.cargarEstrategiasDetalles(this.getEstrategiaDetalle)
            } else {
              this.resetItems()
            }
          })
        } else {
          this.resetForms()
          this.resetItems()
        }
        this.cargando = false
      }).catch(() => {
        this.cargando = false
      })
    },

    cargarEstrategiasDetalles(estrategia) {
      this.items = []
      this.getEstrategiaDetalle.forEach(estrategia => {
        this.items.push({
          id: estrategia.id,
          participacion: estrategia.participacion,
          descripcion: estrategia.descripcion,
          seguimiento: estrategia.seguimiento,
          evaluacion: estrategia.evaluacion,
        })
      })
    },
    submitOption() {
      this.v$.estrategia.$touch()
      if (!this.v$.estrategia.$invalid) {
        const text = `Estás seguro de actualizar las estrategias y
          procedimientos de estrategia?`
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
            if (this.getEstrategia.message === 'Registro no existe') {
              this.agregarEstrategia(this.estrategia)
            } else {
              this.editarEstrategia(this.estrategia)
            }
          } else {
            return false
          }
        })
      }
    },

    agregarEstrategia(estrategia) {
      const data = {
        id_curso: this.getLibroSelected.id,
        observaciones: estrategia.observaciones,
      }

      this.addEstrategia(data).then((response) => {
        this.msjActualizar()
        this.fetchEstrategia(this.getLibroSelected.id).then(() => {
          if (typeof this.getEstrategia !== 'undefined') {
            this.agregarEstrategiaDetalle(this.getEstrategia)
          }
        })
      })
    },

    agregarEstrategiaDetalle(estrategia) {
      this.items.forEach(item => {
        const data = {
          id_estrategia_familia: estrategia.id,
          participacion: item.participacion,
          descripcion: item.descripcion,
          seguimiento: item.seguimiento,
          evaluacion: item.evaluacion,
        }
        this.addEstrategiaDetalle(data).then((response) => {
          this.cargarEstrategias(this.getLibroSelected.id)
        })
      })
    },

    editarEstrategia(estrategia) {
      this.spinner = true
      this.updateEstrategia(estrategia).then((reponse) => {
        this.msjActualizar()
        this.cargarEstrategias(this.getLibroSelected.id)
        this.editarEstrategiaDetalle(estrategia)
        this.spinner = false
      })

    },

    editarEstrategiaDetalle(estrategia) {
      this.items.forEach(item => {
        const data = {
          id: item.id,
          id_estrategia_familia: estrategia.id,
          participacion: item.participacion,
          descripcion: item.descripcion,
          seguimiento: item.seguimiento,
          evaluacion: item.evaluacion,
        }
        this.updateEstrategiaDetalle(data).then((response) => {
          console.log('response :', response)

          // if Registro no encontrado, lo
          this.cargarEstrategias(this.getLibroSelected.id)
          this.spinner = false
        })
      })
    },

    msjActualizar() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Registro actualizado 👍',
          icon: 'CheckIcon',
          text: `Las estrategias de trabajo con la familia y con la comunidad han sido actualizadas con éxito!`,
          variant: 'success',
        },
      },
      {
        position: 'bottom-right',
        timeout: 3000,
      })
    },

    deleteEstrategiaDetalle(index, id_estrategia_detalle) {
      this.$swal({
        title: 'Eliminar estrategia!',
        text: `Estás seguro que deseas eliminar la estrategia?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, elimínala!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        this.spinner = true
        if (result.value) {
          const data = {
            id_curso: this.getLibroSelected.id,
            id_estrategia_detalle,
          }
          this.removeEstrategiaDetalle(data).then(() => {
            this.items.splice(index, 1)
            this.trTrimHeight(this.$refs.row[0].offsetHeight)
            this.$swal({
              icon: 'success',
              title: 'Eliminada con éxito!',
              text: `La estrategia ha sido eliminada!`,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            this.spinner = false
          })
        } else {
          this.spinner = false
        }
      })
    },
    resetForms() {
      this.estrategia = []
    },
    resetItems() {
      this.items = []
      this.items = [
        {
          id: 1,
          participacion: 'En la planificacion',
          descripcion: '',
          seguimiento: '',
          evaluacion: '',
        },
        {
          id: 2,
          participacion: 'En el proceso de aprendizaje',
          descripcion: '',
          seguimiento: '',
          evaluacion: '',
        },
        {
          id: 3,
          participacion: 'En la evaluacion',
          descripcion: '',
          seguimiento: '',
          evaluacion: '',
        },
        {
          id: 4,
          participacion: 'Otra acción',
          descripcion: '',
          seguimiento: '',
          evaluacion: '',
        },
      ]
    },

    // REPEATER
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
        participacion: 'Otra acción',
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },

  },
  setup() {
    return { v$: useVuelidate() }
  },

  // REPEATER
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
}
</script>
