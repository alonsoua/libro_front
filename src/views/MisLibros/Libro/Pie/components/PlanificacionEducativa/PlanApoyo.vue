<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-row>
      <b-col
        lg="2"
        md="3"
        sm="3"
        class="my-1"
      >
        <!-- BOTON MOSTRAR -->
        <!-- <btnMostrar
          :pageOptions.sync="pageOptions"
          :perPage.sync="perPage"
          :total.sync="items.length"
        /> -->
        <!-- {{ items }} -->
      </b-col>
      <b-col
        lg="6"
        md="5"
        sm="5"
        class="my-1"
      >
        <!-- FILTRO -->
        <!-- <inputFiltro
          :filter.sync="filter"
        /> -->


        <!-- editar debe enviar id y si cambia  -->

      </b-col>
      <b-col
        md="4"
        sm="4"
        class="my-1"
      >
        <!-- BOTON CREAR -->
        <div
          class="d-flex align-items-center justify-content-end"
        >
          <!-- CREAR -->
          <plan-apoyo-create
            submitTitle="Guardar Plan de Apoyo"
            title="Registrar plan de apoyo individual"
          />

          <!-- BOTON CREAR -->
          <btn-crear-modal
            :modulo="nombre_permiso"
            accion="Registrar"
            texto="Plan de Apoyo"
            modal="modal-create"
          />
        </div>
      </b-col>
      <b-col cols="12" style="min-height: 490px !important;">
        <b-table-simple
          striped
          small
          hover
          noCollapse
          responsive
          bordered
          class="mt-1 rounded"
          :busy="cargando"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <b-thead head-variant="light">

            <!-- FILAS -->

            <b-tr>
              <b-th
                v-for="(field, key) in fields"
                :key="key"
                :class="field.class"
                :style="field.style"
              >
                {{ field.label }}
              </b-th>
            </b-tr>
          </b-thead>

          <b-tbody
            v-for="(item, key) in items"
            :key="key"
          >
            <!-- DESCRIPCIÓN -->
            <b-tr>
              <b-td
                :class="key%2 === 0 ? 'bg-light' : 'bg-light-primary'"
                class="text-center"
                colspan="5"
              >
                <div class="text-center">
                  <b>{{ item.descripcion }}</b>
                </div>
              </b-td>

              <!-- ACCIONES -->
              <b-td
                class="pl-25 pr-25 text-center"
                :rowspan="item.apoyoEspecializado.length + 3"
                :class="key%2 === 0 ? 'bg-light' : 'bg-light-primary'"
              >

                <!-- HORARIOS -->
                <b-modal
                  :id="'horarios-'+item.id"
                  title="Horarios del plan de apoyo individual"
                  centered
                  size="xl"
                  :hide-footer="true"
                >
                  <b-row class="text-center mt-50 mb-25">
                    <b-col>
                      <b>Descripción:</b> {{ item.descripcion }}
                    </b-col>
                  </b-row>
                  <b-row class="text-center mb-1">
                    <b-col>
                      <b>Alumno:</b> {{ item.alumno.title }}
                    </b-col>
                  </b-row>

                  <calendario-horarios
                    :idModal="'horarios-'+item.id"
                    :apoyoEspecializado.sync="item.apoyoEspecializado"
                    :idPlanApoyo="item.id"
                    title="Horarios del plan de apoyo individual"
                    :planApoyo="item"
                  />
                </b-modal>
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="primary"
                  class="btn-sm mb-25 pl-75 pr-75"
                  @click="goHorario('horarios-'+item.id, item)"
                >
                <!-- v-b-modal="" -->
                  <feather-icon
                    icon="CalendarIcon"
                  />
                  Horarios
                </b-button>

                <!-- UPDATE -->
                <plan-apoyo-update
                  :modal="'modal-update-'+item.id"
                  :data="item"
                  :idCurso="getLibroSelected.id"
                />

                <plan-apoyo-clone
                  :modal="'modal-clone-'+item.id"
                  :planApoyo="item"
                  submitTitle="Guardar Plan de Apoyo"
                  title="Registrar plan de apoyo individual"
                />

                <col-acciones-btnes
                  :data="item"
                  :modal="'modal-update-'+item.id"
                  :modulo="nombre_permiso"
                  clone="true"
                  :modalClone="'modal-clone-'+item.id"
                  @processRemove="remove(item)"
                />
              </b-td>
            </b-tr>

            <b-tr>
              <!-- ALUMNOS -->
              <b-td
                :rowspan="item.apoyoEspecializado.length + 1"
                class="text-center"
              >
                {{ item.alumno.title }}
              </b-td>
              <b-td class="pl-0 pr-0 pt-0 pb-0"></b-td>
              <b-td class="pl-0 pr-0 pt-0 pb-0"></b-td>

              <!-- FECHA INICIO -->
              <b-td
                class="pl-25 pr-25 text-center"
                :rowspan="item.apoyoEspecializado.length + 1"
              >
                {{ formatFechaVer(item.fecha_inicio) }}
              </b-td>

              <!-- FECHA TERMINO -->
              <b-td
                class="pl-25 pr-25 text-center"
                :rowspan="item.apoyoEspecializado.length + 1"
              >
                {{ formatFechaVer(item.fecha_termino) }}
              </b-td>


            </b-tr>

            <template
              v-for="(apoyo, key2) in item.apoyoEspecializado"
            >

              <b-tr>
                <b-td>
                  <b>{{ apoyo.cargo}}:</b><br>
                  {{ apoyo.nombre}}
                </b-td>
                <b-td v-if="apoyo.horarios.length !== 0">
                  <b-row
                    v-for="(horario, key) in apoyo.horarios"
                    :key="key"
                  >
                    <b-col class="text-right pr-25">{{ horario.dia }}</b-col>
                    <b-col class="text-left pl-25">{{ horario.hora }} hrs.</b-col>
                  </b-row>
                </b-td>
                <b-td v-else class="text-center">
                  Sin horario
                </b-td>
              </b-tr>

            </template>

            <!-- OBSERVACIONES -->
            <b-tr>
              <b-td

                class="text-left pb-1 pt-1"
                colspan="5"
              >
                <b>Observaciones:</b> {{ item.observaciones }}
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        <b-alert
          v-if="items.length === 0"
          variant="primary"
          show
          class="text-center pt-25 pb-25"
        >
          <div class="alert-body">
            <span>No existen planes de apoyo registrados.</span>
          </div>
        </b-alert>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BTableSimple, BRow, BCol, BPagination, BFormCheckbox, BOverlay, BCardText,
  BButton, VBModal, BListGroup, BListGroupItem, BTd, BTr, BTfoot, BTh, BTbody,
  BThead, BAlert,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Ripple from 'vue-ripple-directive'

import store from '@/store'

import calendarStoreModule from './PlanApoyo/Horarios/calendarStoreModule'

// COMPONENTES RECICLADOS
// import inputFiltro from '../../../../../../components/List/inputFiltro.vue'
import btnCrearModal from '../../../../../components/List/btnCrearModal.vue'
import btnMostrar from '../../../../../components/List/btnMostrar.vue'
import colPeriodo from '../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../components/List/colEstado.vue'
import spinner from '../../../../../components/spinner.vue'
import colNombreImg from '../../../../../components/List/colNombreImg.vue'
import { length } from '@validations';
import colAccionesBtnes from '../../../../../components/List/colAccionesBtnes.vue'
// import colAccionesBtnes from '../components/colAccionesBtnes.vue'

// COMPONENTES HIJOS
import planApoyoCreate from './PlanApoyo/PlanApoyoCreate.vue'
import planApoyoUpdate from './PlanApoyo/PlanApoyoUpdate.vue'
import planApoyoClone from './PlanApoyo/PlanApoyoClone.vue'

import calendarioHorarios from './PlanApoyo/Horarios/CalendarioHorarios.vue'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos';

export default {
  components: {
    // ETIQUETAS
    BTableSimple,
    BRow,
    BCol,
    BPagination,
    BFormCheckbox,
    BOverlay,
    BCardText,
    BButton,
    VBModal,
    BListGroup,
    BListGroupItem,
    BAlert,
    BTd,
    BTr,
    BTfoot,
    BTh,
    BTbody,
    BThead,

    // COMPONENTES RECICLADOS
    // inputFiltro,
    btnCrearModal,
    colAccionesBtnes,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // COMPONENTES HIJOS
    planApoyoCreate,
    planApoyoUpdate,
    planApoyoClone,
    calendarioHorarios,
    calendarStoreModule,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  data() {
    return {
      nombre_permiso: 'pieII4',
      cargando: false,
      spinner: false,
      items: [],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      pageOptions: [10, 25, 50],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {
          key: 'alumno',
          label: 'Nombre del estudiante',
          sortable: true,

          style: 'display: table-cell; vertical-align: middle; width: 24%;',
          thStyle: {
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'apoyos',
          label: 'Apoyo especializado requerido',
          sortable: true,
          style: 'display: table-cell; vertical-align: middle; width: 35%;',
          thStyle: {
            width: '150px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'horarios',
          label: 'Horario día/hora',
          style: 'width: 160px !important',
          class: 'text-center',
          sortable: true,
          style: 'display: table-cell; vertical-align: middle; width: 16%;',
          thStyle: {
            width: '60px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'fecha_inicio',
          label: 'Fecha inicio',
          sortable: true,
          class: 'text-center',
          style: 'display: table-cell; vertical-align: middle; width: 10%;',
          thStyle: {
            width: '60px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'fecha_termino',
          label: 'Fecha término',
          sortable: true,
          class: 'text-center',
          style: 'display: table-cell; vertical-align: middle; width: 10%;',
          thStyle: {
            width: '60px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        // {
        //   key: 'acciones',
        //   label: 'acciones',
        //   class: 'text-center',
        //   style: 'display: table-cell; vertical-align: middle; width: 2% !important;',
        //   thStyle: {
        //     width: '80px !important',
        //     'text-align': 'center',
        //     display: 'table-cell',
        //     'vertical-align': 'middle',
        //   },
        // },
        // {
        //   key: 'estado',
        //   label: 'Estado',
        //   sortable: true,
        //   tdClass: 'text-center',
        //   thStyle: {
        //     'text-align': 'center',
        //     width: '100px !important',
        //     display: 'table-cell',
        //     'vertical-align': 'middle',
        //   },
        // },
      ],
      fieldAcciones: {
        key: 'acciones',
        label: 'acciones',
        class: 'text-center',
        style: 'display: table-cell; vertical-align: middle; width: 2% !important;',
        thStyle: {
          width: '80px !important',
          'text-align': 'center',
          display: 'table-cell',
          'vertical-align': 'middle',
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      getPlanApoyos: 'II_4_plan_apoyo/getPlanApoyos',
      getLibroSelected: 'libros/getLibroSelected',
    }),
  },
  watch: {
    getLibroSelected(val) {
      this.setPlanApoyos(this.getLibroSelected.id)
    },
    getPlanApoyos(val) {
      this.cargaPlanApoyos(this.getPlanApoyos)
    },
  },
  mounted() {
    this.setPlanApoyos(this.getLibroSelected.id)
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchPlanApoyos: 'II_4_plan_apoyo/fetchPlanApoyos',
      removePlanApoyo: 'II_4_plan_apoyo/removePlanApoyo',
    }),
    setTableList() {
      // if (this.$can('update', 'reunionesCoordinaciones')
      //   || this.$can('delete', 'reunionesCoordinaciones')
      // ) {
        this.fields.push(this.fieldAcciones)
      // }
    },
    setPlanApoyos(idCurso) {
      this.fetchPlanApoyos(idCurso).then(() => {
        this.cargaPlanApoyos(this.getPlanApoyos)
      })
    },
    cargaPlanApoyos(planApoyos) {
      this.items = []
      if (planApoyos.status !== 'error') {
        planApoyos.forEach(plan => {
          const alumno = plan.personas.find(p => p.id_rol === 10) // ROL ALUMNO
          const nombreAlumno = alumno.nombre+' '+alumno.primer_apellido+' '+alumno.segundo_apellido

          let apoyoEspecializado = []
          const apoyosEspecializados = plan.personas.filter(p => p.id_rol === 7) // ROL ESPECIALISTA

          apoyosEspecializados.forEach(apoyo => {
            const nombreApoyo = apoyo.nombre+' '+apoyo.primer_apellido+' '+apoyo.segundo_apellido
            const cargo = apoyo.nombre_rol
            const titleApoyo = apoyo.nombre+' '+apoyo.primer_apellido+' - '+cargo
            apoyoEspecializado.push({
              value: apoyo.id_persona_rol,
              id_plan_apoyo_persona: apoyo.id,
              title: titleApoyo,
              nombre: nombreApoyo,
              cargo,
              horarios: [
                // {
                //   dia: 'Lunes',
                //   hora: '12:00',
                // },
              ]
            })
          })

          this.items.push(
            {
              id: plan.id,
              descripcion: plan.descripcion,
              fecha_creacion: plan.fecha_creacion,
              fecha_inicio: plan.fecha_inicio,
              fecha_termino: plan.fecha_termino,
              observaciones: plan.observaciones,
              alumno: {
                value: alumno.id_persona_rol,
                title: nombreAlumno,
              },
              apoyoEspecializado,
            }
          )
        })
        this.cargando = false
      }
    },

    // HORARIO
    goHorario(nombreModal, planApoyo) {
      this.cargaIdPlanApoyo(planApoyo.id)
      this.cargaIdPersonaRol(1)
      this.$bvModal.show(nombreModal)
    },
    cargaIdPlanApoyo(id_plan_apoyo) {
      calendarStoreModule.state.id_plan_apoyo = id_plan_apoyo
    },
    cargaIdPersonaRol(id_persona_rol) {
      calendarStoreModule.state.id_persona_rol = id_persona_rol
    },
    remove(reunionesCoordinacion) {
      this.$swal({
        title: 'Eliminar reunionesCoordinacion!',
        text: `Estás seguro que deseas eliminar el reunionesCoordinacion
          "${reunionesCoordinacion.nombre}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminalo!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        this.spinner = true
        if (result.value) {
          // this.removeReunionesCoordinacions(reunionesCoordinacion.id).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Eliminado con éxito!',
          //     text: `"${reunionesCoordinacion.nombre}" ha sido eliminada!`,
          //     customClass: {
          //       confirmButton: 'btn btn-success',
          //     },
          //   })
          //   this.spinner = false
          // })
        } else {
          this.spinner = false
        }
      })
    },

    // Vuexy
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of
      // buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="css">
  .text-center {
    text-align: center;
  }
</style>
