<template>
  <form-wizard
    color="#26a5ea"
    :title="null"
    :subtitle="null"
    class="mb-3"
    shape="square"
    step-size="xs"
    next-button-text="Siguiente"
    back-button-text="Anterior"
    finish-button-text="Finalizar"
    @on-complete="formSubmitted"
  >

    <!-- CURSOS tab -->
    <tab-content
      title="Cursos"
      :before-change="siguienteCursos"
      class="mb-3"
    >
      <b-row>
        <!-- TITULO Y SUBTITULO -->
        <b-col cols="12" class="mb-3">
          <h5 class="mb-0">
            Cursos
          </h5>
          <small>
            Selecciona el o los cursos donde cargarás tus horas pedagógicas.
          </small>
        </b-col>
        <b-col cols="3">
        </b-col>
        <!-- CURSOS v-select -->
        <b-col cols="6">
          <b-form-group
            label="Curso(s) *"
            label-for="cursos"
          >
            <v-select
              v-model="id_cursos"
              :placeholder="optionsCursos.length === 0
                ? 'No existen cursos disponibles...'
                : 'Selecciona el/los cursos...'"
              multiple
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :reduce="option => option.id_cursos"
              :options="optionsCursos"
              :class="v$.id_cursos.$error === true
                ? 'border-danger rounded select-size-lg mt-25'
                : 'select-size-lg mt-25'"
              :disabled="optionsCursos.length === 0"
            />
              <!-- @input="changeCursos()" -->
            <b-alert
              v-if="alert_cursos"
              class="pl-50 pt-25 pb-25 pr-50 mt-50 mb-25"
              variant="primary"
              show
            >
              El establecimiento {{ id_establecimiento }}, no tienen cursos ni asignaturas ingresadas para ingresar la carga horaria.

            </b-alert>
            <div
              v-if="v$.id_cursos.$error"
              id="asistentesInfo"
              class="text-danger text-right"
              style="font-size: 0.857rem;"
            >
              <p v-for="error of v$.id_cursos.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="3">
        </b-col>
      </b-row>
    </tab-content>

    <!-- ASIGNATURAS tab -->
    <tab-content
      title="Asignaturas"
      :before-change="finalizarAsignaturas"
      class="mb-3"
    >
      <b-row>
        <!-- TITULO Y SUBTITULO -->
        <b-col cols="12" class="mb-3">
          <h5 class="mb-0">
            Asignaturas
          </h5>
          <small class="text-muted">
            Ingresa las asignaturas de cada curso.
          </small>
        </b-col>
        <b-col cols="3">
        </b-col>
        <!-- ASIGNATURAS table -->
        <b-col cols="6">
          <b-table
            striped
            small
            hover
            noCollapse
            bordered
            class="mt-1 rounded"
            responsive
            :items="itemsAsignatura"
            :fields="fieldsAsignatura"
            :busy="cargandoAsignatura"
          >
            <!-- :sort-by.sync="sortBy"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection" -->
            <!-- :filter="filter"
            :filter-included-fields="filterOn" -->
            <!-- @filtered="onFiltered" -->

          </b-table>
        </b-col>
        <b-col cols="3">
        </b-col>
      </b-row>
    </tab-content>

    <!-- HORARIO tab -->
    <tab-content
      title="Horario"
      :before-change="finalizarHorarios"
      class="mb-3"
    >
      <b-row>
        <b-col
          cols="12"
          class="mb-3"
        >
          <h5 class="mb-0">
            Horario
          </h5>
          <small class="text-muted">Ingresa los horarios de las asignaturas por curso.</small>
        </b-col>
      </b-row>
    </tab-content>
  </form-wizard>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BCard,
  BAlert,
  BTable,
} from 'bootstrap-vue'
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import store from '@/store/index'
import { mapGetters, mapActions, mapMutations } from 'vuex'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    BFormInvalidFeedback,
    BCard,
    BAlert,
    BTable,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      id_persona_rol: null,
      id_establecimiento: null,
      // CURSOS
      alert_cursos: false,
      id_cursos: [],
      optionsCursos: [],

      // ASIGNATURAS
      cargandoAsignatura: false,
      itemsAsignatura: [],
      fieldsAsignatura: [
        {
          key: 'cursos',
          label: 'Cursos',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            'text-align': 'center',
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'asignaturas',
          label: 'Asignaturas',
          sortable: false,
          tdClass: 'text-center',
          thStyle: {
            'text-align': 'center',
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
      ],
    }
  },
  validations() {
    return {

        id_cursos: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },

    }
  },
  computed: {
    ...mapGetters({
      getCursos: 'cursos/getCursos',
      getCursosPersonaRol: 'cursos/getCursosPersonaRol',
      user: 'auth/user',
    }),
  },
  watch: {
    getCursosPersonaRol(val) {
    //   // this.totalRows = val.length
    //   // this.items = []
    //   // this.items = this.getHorarios
    },
    user (val) {
      this.id_persona_rol = null
      this.id_persona_rol = val.id_persona_rol
      this.id_establecimiento = null
      this.id_establecimiento = val.id_establecimiento
      this.cargando_cursos = true
      this.cargarCursosOptions(this.id_establecimiento)
    }
  },
  mounted() {
    this.cargarUsuario(this.user)
  },
  methods: {
    ...mapActions({
      fetchCursosEstablecimiento: 'cursos/fetchCursosEstablecimiento',
      fetchCursosPersonaRol: 'cursos/fetchCursosPersonaRol',
      addCursoPersona: 'cursos/addCursoPersona',
      attempt: 'auth/attempt',
      removeCursoPersona: 'cursos/removeCursoPersona',
    }),
    cargarUsuario() {
      if (!this.user) {
        this.attempt().then(() => {})
      }
    },
    cargarCursosOptions(id_establecimiento) {
      this.fetchCursosEstablecimiento(id_establecimiento).then(() => {
        if (this.getCursos.length !== 0) {
          this.optionsCursos = []
          this.getCursos.forEach(curso => {
            const nombre = curso.nombre+' '+curso.letra
            this.optionsCursos.push({
              id_cursos: curso.id,
              title: nombre,
            })
          })
          this.cargarCursosUsuario(this.id_persona_rol)
        } else {
          this.alert_cursos = true
        }
      })
    },
    cargarCursosUsuario(id_persona_rol) {
      this.fetchCursosPersonaRol(id_persona_rol).then(() => {
        this.getCursosPersonaRol.forEach(curso => {
          this.id_cursos.push(curso.id)
        })
      })
    },

    // SieguienteCurso
    siguienteCursos() {
      return new Promise((resolve, reject) => {
        this.v$.id_cursos.$touch()
        let comparar = []
        this.getCursosPersonaRol.forEach(curso => {
          comparar.push(curso.id)
        })

        const id_cursos_eliminar = comparar.filter(x => this.id_cursos.indexOf(x) === -1);

        if (!this.v$.id_cursos.$invalid) {
          if (id_cursos_eliminar.length > 0) {
            this.$swal({
              title: 'Eliminar curso!',
              text: `Acabas de quitar uno o más cursos, si das en "Siguiente"
              se perderán todas las asignaturas asignadas a ellos.
              Estás seguro en seguir?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Siguiente',
              cancelButtonText: 'Cancelar',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(result => {
              this.spinner = true
              if (result.value) {
                id_cursos_eliminar.forEach(curso => {
                  this.eliminarCursos(curso)
                })

                if (this.id_cursos.length > 0) {
                  this.id_cursos.forEach(curso => {
                    this.agregarCursoPersona(curso)
                  })
                }
                this.setItemsAsignaturas()
                resolve(true)
              } else {
                reject()
              }
            })

          } else {
            if (this.id_cursos.length > 0) {
              this.id_cursos.forEach(curso => {
                this.agregarCursoPersona(curso)
              })
              this.setItemsAsignaturas()

            }
            resolve(true)
          }
        } else {
          console.log('ERRRORRRR :')
          // MENSAJE DE VALIDACIÓN
          reject()
        }
      })
    },
    agregarCursoPersona(curso) {
      const data = {
        id_persona_rol: this.id_persona_rol,
        id_cursos: curso,
        pie: 0,
      }
      this.addCursoPersona(data).then(() => {
        const ultimoIngresado = this.optionsCursos.find(c => c.id_cursos === curso)
        const stateCursos = store.state.cursos
        if (stateCursos.status === 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              icon: 'success',
              title: 'Curso creado 👍',
              text: `El curso "${ultimoIngresado.title}" fue creado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 5000,
          })
        } else {
          // console.log('Error!', stateCursos.message)
        }
      })
    },
    eliminarCursos(curso) {
      const cursoPersonaRol = this.getCursosPersonaRol.find(c => c.id === curso)
      this.removeCursoPersona(cursoPersonaRol.id_cursos_rol).then(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            icon: 'success',
            title: 'Curso eliminado 👍',
            text: `El curso "${cursoPersonaRol.nombre}" fue eliminado con éxito!`,
            variant: 'success',
          },
        },
        {
          position: 'bottom-right',
          timeout: 5000,
        })
        this.spinner = false
      })
    },
    // FIN SieguienteCurso

    // Asignaturas
    setItemsAsignaturas() {
      console.log('this.cursos :', this.getCursosPersonaRol)
    },
    finalizarAsignaturas() {
      return new Promise((resolve, reject) => {
        resolve(true)
        // this.$refs.accountRules.validate().then(success => {
        //   if (success) {
        //   } else {
        //     reject()
        //   }
        // })
      })
    },
    finalizarHorarios() {
      return new Promise((resolve, reject) => {
        resolve(true)
        // this.$refs.infoRules.validate().then(success => {
        //   if (success) {
        //   } else {
        //     reject()
        //   }
        // })
      })
    },
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
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
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>