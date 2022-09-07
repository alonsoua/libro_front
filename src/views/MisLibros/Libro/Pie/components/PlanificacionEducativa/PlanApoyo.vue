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

        <!-- CREAR -->
        <plan-apoyo-create
          submitTitle="Guardar Plan"
          title="Registrar plan de apoyo individual"
        />

        <!-- editar debe enviar id y si cambia  -->

      </b-col>
      <b-col
        md="4"
        sm="4"
        class="my-1"
      >
        <!-- BOTON CREAR -->
        <!-- <btnCrear
          accion="Coordinar"
          texto="Reunión"
          modulo="reuniones_coordinacion"
          @processAdd="addReunionesCoordinacion"
        /> -->
        <div
          class="d-flex align-items-center justify-content-end"
        >
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            v-b-modal.modal-create
            variant="primary"
            class="btn-md"
          >
            Registrar Plan
          </b-button>
        </div>
      </b-col>

      <b-col cols="12" style="min-height: 490px !important;">
        <b-table-simple
          bordered
          striped
          hover
          small
          caption-top
          responsive
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
            <b-tr>

              <!-- ALUMNOS -->
              <b-td
                :rowspan="item.apoyos.length + 1"
                :class="key%2 === 0 ? 'bg-light-secondary' : 'bg-light-primary'"
              >
                <div
                  v-for="(alumno, key) in item.alumnos"
                  :key="key"
                  class=""
                >
                  {{ alumno.nombre }}
                </div>
              </b-td>
              <b-td class="pl-0 pr-0 pt-0 pb-0"></b-td>
              <b-td class="pl-0 pr-0 pt-0 pb-0"></b-td>

              <!-- FECHA INICIO -->
              <b-td
                class="pl-25 pr-25 text-center"

                :rowspan="item.apoyos.length + 1"
              >
                {{ item.fechaInicio }}
              </b-td>

              <!-- FECHA TERMINO -->
              <b-td
                class="pl-25 pr-25 text-center"
                :rowspan="item.apoyos.length + 1"
              >
                {{ item.fechaTermino }}
              </b-td>

              <!-- ACCIONES -->
              <b-td
                class="pl-25 pr-25 text-center"
                :rowspan="item.apoyos.length + 2"
                :class="key%2 === 0 ? 'bg-light-secondary' : 'bg-light-primary'"
              >
                <colAccionesBtnes
                  modulo="test"
                  :data="item"
                />
                <!-- :modal="`modal-lg-${data.item.id}`" -->
                    <!-- @processGoToConfig="goToConfig"
                    @processGoToUpdate="goToUpdate"
                    @processGoToClone="goToClone"
                    @processRemove="remove(data.item)" -->
              </b-td>
            </b-tr>

            <template
              v-for="(apoyo, key2) in item.apoyos"
            >

              <!-- EDUC. DIFERENCIAL -->
              <b-tr
                v-if="apoyo.cargo === 'Educ. Diferencial'"
              >
                <b-td>
                  <b>Educ. Diferencial:</b><br>
                  {{ apoyo.cargo === 'Educ. Diferencial' ? apoyo.nombre : '' }}
                </b-td>
                <b-td>
                  <b-row
                    v-for="(horario, key) in apoyo.horarios"
                    :key="key"
                  >
                    <b-col class="text-right pr-25">{{ horario.dia }}</b-col>
                    <b-col class="text-left pl-25">{{ horario.hora }} hrs.</b-col>
                  </b-row>
                </b-td>
              </b-tr>

              <!-- PSICOPEDAGOGO -->
              <b-tr
                v-if="apoyo.cargo === 'Psicopedagogo/a'"
              >
                <b-td>
                  <b>Psicopedagogo/a</b><br>
                  {{ apoyo.cargo === 'Psicopedagogo/a' ? apoyo.nombre : '' }}
                </b-td>
                <b-td>
                  <b-row
                    v-for="(horario, key) in apoyo.horarios"
                    :key="key"
                  >
                    <b-col class="text-right pr-25">{{ horario.dia }}</b-col>
                    <b-col class="text-left pl-25">{{ horario.hora }} hrs.</b-col>
                  </b-row>
                </b-td>
              </b-tr>

              <!-- FONOAUDIOLOGO -->
              <b-tr
                v-if="apoyo.cargo === 'Fonoaudiólogo/a'"
              >
                <b-td>
                  <b>Fonoaudiólogo/a</b><br>
                  {{ apoyo.cargo === 'Fonoaudiólogo/a' ? apoyo.nombre : '' }}
                </b-td>
                <b-td>
                  <b-row
                    v-for="(horario, key) in apoyo.horarios"
                    :key="key"
                  >
                    <b-col class="text-right pr-25">{{ horario.dia }}</b-col>
                    <b-col class="text-left pl-25">{{ horario.hora }} hrs.</b-col>
                  </b-row>
                </b-td>
              </b-tr>

              <!-- PSICOLOGO -->
              <b-tr
                v-if="apoyo.cargo === 'Psicólogo/a'"
              >
                <b-td>
                  <b>Psicólogo/a</b><br>
                  {{ apoyo.cargo === 'Psicólogo/a' ? apoyo.nombre : '' }}
                </b-td>
                <b-td>
                  <b-row
                    v-for="(horario, key) in apoyo.horarios"
                    :key="key"
                  >
                    <b-col class="text-right pr-25">{{ horario.dia }}</b-col>
                    <b-col class="text-left pl-25">{{ horario.hora }} hrs.</b-col>
                  </b-row>
                </b-td>
              </b-tr>

              <!-- OTRO -->
              <b-tr
                v-if="apoyo.cargo === 'Otro'"
              >
                <b-td>
                  <b>Otro</b><br>
                  {{ apoyo.cargo === 'Otro' ? apoyo.nombre : '' }}
                </b-td>
                <b-td>
                  <b-row
                    v-for="(horario, key) in apoyo.horarios"
                    :key="key"
                  >
                    <b-col class="text-right pr-25">{{ horario.dia }}</b-col>
                    <b-col class="text-left pl-25">{{ horario.hora }} hrs.</b-col>
                  </b-row>
                </b-td>
              </b-tr>
            </template>

            <!-- OBSERVACIONES -->
            <b-tr>
              <b-td
                :class="key%2 === 0 ? 'bg-light-secondary' : 'bg-light-primary'"
                class="text-left pb-1 pt-1"
                colspan="5"
              >
                <b>Observaciones</b>
                <div class="text-justify pt-25 pr-3">
                  {{ item.observaciones }}
                </div>
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
            <span>No existen planes registrados.</span>
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

// COMPONENTES RECICLADOS
// import inputFiltro from '../../../../../../components/List/inputFiltro.vue'
// import btnCrear from '../../../../../components/List/btnCrear.vue'
import btnMostrar from '../../../../../components/List/btnMostrar.vue'
import colPeriodo from '../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../components/List/colEstado.vue'
import spinner from '../../../../../components/spinner.vue'
import colNombreImg from '../../../../../components/List/colNombreImg.vue'
import { length } from '@validations';
import colAccionesBtnes from '../components/colAccionesBtnes.vue'

// COMPONENTES HIJOS
import planApoyoCreate from './PlanApoyo/PlanApoyoCreate.vue'

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
    // btnCrear,
    // inputFiltro,
    colAccionesBtnes,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // COMPONENTES HIJOS
    planApoyoCreate,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      cargando: false,
      spinner: false,
      // chk
      items: [
        {
          alumnos: [
            {
              nombre: 'Catalina Andrea Gaete Jeria',
            },
            {
              nombre: 'Martín Alejandro Lopez Perez',
            }
          ],
          apoyos: [
            {
              nombre: 'Paula Mercedes Leiva Alvarez',
              cargo: 'Fonoaudiólogo/a',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
              ],
            },
            {
              nombre: 'Daniela Carmen Jeria Cisternas',
              cargo: 'Psicopedagogo/a',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
                {
                  dia: 'Martes',
                  hora: '18:00',
                },
              ],
            },
            {
              nombre: 'Daniela Ignacia Vega Oyanedel',
              cargo: 'Educ. Diferencial',
              horarios: [
                {
                  dia: 'Miércoles',
                  hora: '14:00',
                },
                {
                  dia: 'Viernes',
                  hora: '11:00',
                },
              ],
            },
            {
              nombre: 'Polet Macarena Rodriguez Gonzalez',
              cargo: 'Psicólogo/a',
              horarios: [
                {
                  dia: 'Martes',
                  hora: '11:00',
                },
                {
                  dia: 'Viernes',
                  hora: '14:00',
                },
              ],
            },
          ],
          observaciones: 'Priorización de evaluaciones alumnos PIE Calendarizada reunión con COSAM debido a los alumnos Thomás T. y Emilia M. Alumnos con derivación psicosocial (Gustavo, León, Thomás, Emilia) Angelina M. EDI se asigna a Amaro G. para trabajar con él. grupos de trabajo y diagnóstico asociado a cada niño y niña.',
          fechaInicio: '22-04-2022',
          fechaTermino: '22-07-2022',
          estado: 'Desarrollada',
        },
        {
          alumnos: [
            {
              nombre: 'Gabriel Andres Cortez Acevedo',
            },
          ],
          apoyos: [
            {
              nombre: 'Polet Rodriguez',
              cargo: 'Psicólogo/a',
              horarios: [
                {
                  dia: 'Martes',
                  hora: '11:00',
                },
                {
                  dia: 'Viernes',
                  hora: '14:00',
                },
              ],
            },
          ],
          observaciones: 'Priorización de evaluaciones alumnos PIE Calendarizada reunión con COSAM debido a los alumnos Thomás T. y Emilia M. Alumnos con derivación psicosocial (Gustavo, León, Thomás, Emilia) Angelina M. EDI se asigna a Amaro G. para trabajar con él. grupos de trabajo y diagnóstico asociado a cada niño y niña.',
          estado: 'Desarrollada',
        },
        {
          alumnos: [
            {
              nombre: 'Gabriel Andres Cortez Acevedo',
            },
            {
              nombre: 'Rodrigo Luis Centeno Marino',
            },
            {
              nombre: 'Manuel Lindorgo Diaz Riquelme',
            }
          ],
          apoyos: [
            {
              nombre: 'Kineciologo - Paul Bastian Paredes Ramirez',
              cargo: 'Otro',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
              ],
            },
            {
              nombre: 'Paula Mercedes Leiva Alvarez',
              cargo: 'Fonoaudiólogo/a',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
              ],
            },
            {
              nombre: 'Psicologo - Pedro Ismael Fernandez Oyarzun',
              cargo: 'Otro',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
              ],
            },
            {
              nombre: 'Kine - Paulo Pedro Perez Londra',
              cargo: 'Otro',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
              ],
            },
            {
              nombre: 'Daniela Vega',
              cargo: 'Educ. Diferencial',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '14:00',
                },
                {
                  dia: 'Viernes',
                  hora: '11:00',
                },
              ],
            },
            {
              nombre: 'Polet Rodriguez',
              cargo: 'Psicólogo/a',
              horarios: [
                {
                  dia: 'Martes',
                  hora: '11:00',
                },
                {
                  dia: 'Viernes',
                  hora: '14:00',
                },
              ],
            },
          ],
          observaciones: 'Priorización de evaluaciones alumnos PIE Calendarizada reunión con COSAM debido a los alumnos Thomás T. y Emilia M. Alumnos con derivación psicosocial (Gustavo, León, Thomás, Emilia) Angelina M. EDI se asigna a Amaro G. para trabajar con él. grupos de trabajo y diagnóstico asociado a cada niño y niña.',
          fechaInicio: '22-04-2022',
          fechaTermino: '22-07-2022',
          estado: 'Desarrollada',
        },
        {
          alumnos: [
            {
              nombre: 'Catalina Andrea Gaete Jeria',
            },
            {
              nombre: 'Martín Alejandro Lopez Perez',
            }
          ],
          apoyos: [
            {
              nombre: 'Paula Mercedes Leiva Alvarez',
              cargo: 'Fonoaudiólogo/a',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
              ],
            },
            {
              nombre: 'Daniela Vega',
              cargo: 'Educ. Diferencial',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '14:00',
                },
                {
                  dia: 'Viernes',
                  hora: '11:00',
                },
              ],
            },
            {
              nombre: 'Polet Rodriguez',
              cargo: 'Psicólogo/a',
              horarios: [
                {
                  dia: 'Martes',
                  hora: '11:00',
                },
                {
                  dia: 'Viernes',
                  hora: '14:00',
                },
              ],
            },
          ],
          observaciones: 'Priorización de evaluaciones alumnos PIE Calendarizada reunión con COSAM debido a los alumnos Thomás T. y Emilia M. Alumnos con derivación psicosocial (Gustavo, León, Thomás, Emilia) Angelina M. EDI se asigna a Amaro G. para trabajar con él. grupos de trabajo y diagnóstico asociado a cada niño y niña.',
          fechaInicio: '22-04-2022',
          fechaTermino: '22-07-2022',
          estado: 'Desarrollada',
        },
        {
          alumnos: [
            {
              nombre: 'Catalina Andrea Gaete Jeria',
            },
            {
              nombre: 'Martín Alejandro Lopez Perez',
            }
          ],
          apoyos: [
            {
              nombre: 'Paula Mercedes Leiva Alvarez',
              cargo: 'Fonoaudiólogo/a',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '12:00',
                },
                {
                  dia: 'Martes',
                  hora: '14:00',
                },
              ],
            },
            {
              nombre: 'Daniela Vega',
              cargo: 'Educ. Diferencial',
              horarios: [
                {
                  dia: 'Lunes',
                  hora: '14:00',
                },
                {
                  dia: 'Viernes',
                  hora: '11:00',
                },
              ],
            },
            {
              nombre: 'Polet Rodriguez',
              cargo: 'Psicólogo/a',
              horarios: [
                {
                  dia: 'Martes',
                  hora: '11:00',
                },
                {
                  dia: 'Viernes',
                  hora: '14:00',
                },
              ],
            },
          ],
          observaciones: 'Priorización de evaluaciones alumnos PIE Calendarizada reunión con COSAM debido a los alumnos Thomás T. y Emilia M. Alumnos con derivación psicosocial (Gustavo, León, Thomás, Emilia) Angelina M. EDI se asigna a Amaro G. para trabajar con él. grupos de trabajo y diagnóstico asociado a cada niño y niña.',
          fechaInicio: '22-04-2022',
          fechaTermino: '22-07-2022',
          estado: 'Desarrollada',
        },
      ],
      selectedchk: [],
      chkTodo: null,
      checked: null,

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
        // {
        //   key: 'colCheck',
        //   label: 'chkHeader',
        //   sortable: false,
        //   thStyle: {
        //     width: '0px !important',
        //     display: 'table-cell',
        //     'vertical-align': 'middle',
        //   },
        // },
        {
          key: 'alumnos',
          label: 'Nombre del/los estudiante(s)',
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
          key: 'fechaInicio',
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
          key: 'fechaTermino',
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
        {
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
      // fieldAcciones: [
      //   {
      //     key: 'acciones',
      //     label: 'acciones',
      //     class: 'text-center',
      //     thStyle: {
      //       width: '80px !important',
      //       'text-align': 'center',
      //       display: 'table-cell',
      //       'vertical-align': 'middle',
      //     },
      //   },
      // ],
    }
  },
  computed: {
    // ...mapGetters({ getReunionesCoordinacions: 'reunionesCoordinaciones/getReunionesCoordinacions' }),
    // Vuexy
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    disabledExport() {
      return this.chkCount()
    },
  },
  watch: {
    getReunionesCoordinacions(val) {
      this.totalRows = val.length
      // this.items = []
      // this.items = this.getReunionesCoordinacions
    },
    chkTodo() {
      this.chkAll()
    },
  },
  mounted() {
    this.cargarReunionesCoordinacions()
    // this.setTableList()
  },
  methods: {
    // ...mapActions({
    //   fetchReunionesCoordinacions: 'reunionesCoordinaciones/fetchReunionesCoordinacions',
    //   updateReunionesCoordinacionPeriodo: 'reunionesCoordinaciones/updateReunionesCoordinacionPeriodo',
    //   removeReunionesCoordinacions: 'reunionesCoordinaciones/removeReunionesCoordinacions',
    // }),
    // ...mapMutations('reunionesCoordinaciones', ['setReunionesCoordinacion']),
    setTableList() {
      if (this.$can('update', 'reunionesCoordinaciones')
        || this.$can('delete', 'reunionesCoordinaciones')
      ) {
        this.fields.push(this.fieldAcciones)
      }
    },
    cargarReunionesCoordinacions() {
      // this.fetchReunionesCoordinacions().then(() => {
      //   this.cargando = false
      // })
    },
    addReunionesCoordinacion() {
      // this.$router.replace({
      //   name: 'reunionesCoordinaciones-create',
      // })
    },
    updatePeriodo(reunionesCoordinacion) {
      this.$swal({
        title: 'Actualizar periodo!',
        html: 'Estás seguro que deseas actualizar el periodo activo del'
          + ' reunionesCoordinacion<br><span class="font-weight-bolder">'
          + `${reunionesCoordinacion.nombre}</span>?`,
        footer: '<div class="text-center text-primary">Al actualizar el'
          + ' periodo activo, se creará un nuevo marco de trabajo para el'
          + ' reunionesCoordinacion. No se puede devolver al periodo anterior.</div>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, actualízalo!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        this.spinner = true
        if (result.value) {
          // this.updateReunionesCoordinacionPeriodo(reunionesCoordinacion).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Periodo activo actualizado!',
          //     html:
          //       'El periodo activo del reunionesCoordinacion<br>'
          //       + ' <span class="font-weight-bolder">'
          //       + `${reunionesCoordinacion.nombre}</span>`
          //       + '<br>ha sido actualizado con éxito!',
          //     customClass: {
          //       confirmButton: 'btn btn-primary',
          //     },
          //   })
          //   this.spinner = false
          //   this.cargarReunionesCoordinacions()
          // })
        } else {
          this.spinner = false
          this.cargarReunionesCoordinacions()
        }
      })
    },
    updateEstado() {
      // console.log('update')
    },
    goToConfig(reunionesCoordinacion) {
      this.setReunionesCoordinacion(reunionesCoordinacion)
      this.$router.push({
        name: 'reunionesCoordinaciones-config',
      })
    },
    goToUpdate(reunionesCoordinacion) {
      this.setReunionesCoordinacion(reunionesCoordinacion)
      this.$router.push({
        name: 'reunionesCoordinaciones-update',
      })
    },
    goToClone(reunionesCoordinacion) {
      this.setReunionesCoordinacion(reunionesCoordinacion)
      this.$router.push({
        name: 'reunionesCoordinaciones-clone',
      })
    },
    remove(reunionesCoordinacion) {
      this.$swal({
        title: 'Eliminar reunionesCoordinacion!',
        text: `Estás seguro que deseas eliminar el reunionesCoordinacion
          "${reunionesCoordinacion.nombre}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo!',
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
          //     title: 'Eliminada con éxito!',
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

    // Checkbox select item Table
    chkAll() {
      this.items.forEach(item => {
        const cliente = this.items.find(i => i.id === item.id)
        cliente.chkSelected = this.chkTodo
      })
    },
    chkCount() {
      let chkCount = 0
      this.items.forEach(item => {
        chkCount = item.chkSelected
          ? chkCount + 1
          : chkCount
      })
      return chkCount === 0
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
