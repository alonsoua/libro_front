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
        <btnMostrar
          :pageOptions.sync="pageOptions"
          :perPage.sync="perPage"
          :total.sync="items.length"
        />
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
        <apoyos-estudiantes-create
          submitTitle="Guardar Apoyos"
          title="Registrar apoyos para cada estudiante o grupo de estudiantes"
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
            Registrar Apoyos
          </b-button>
        </div>
      </b-col>

      <b-col cols="12" style="min-height: 403px !important;">
        <b-table
          striped
          small
          hover
          noCollapse
          class="mt-1"
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :busy="cargando"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >

          <template #table-busy>
            <div class="text-center text-danger my-2">
              <spinner />
            </div>
          </template>

          <!-- Cargando -->
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <spinner />
            </div>
          </template>

          <!-- Header: Check -->
          <!-- <template #head(colCheck)="data">

            <b-form-checkbox
              :id="data.label"
              v-model="chkTodo"
            />

          </template>

          <!-- Column: Check
          <template #cell(colCheck)="data">

            <b-form-checkbox
              :id="`chk-${data.item.id}`"
              v-model="data.item.chkSelected"
            />

          </template> -->

          <!-- Column: alumnos -->
          <template #cell(planApoyo)="data">
            <div
              v-for="(alumno, key) in data.item.planApoyo"
              :key="key"
            >
              - {{alumno.nombre }}
            </div>
          </template>

          <!-- Column: totalFirmas -->
          <template #cell(totalFirmas)="data">
            <div
              v-for="(asistente, key) in data.item.asistentes"
              :key="key"
            >
              - {{ asistente.nombre }}
            </div>
          </template>

          <!-- COLUMNA ESTADO -->
          <template #cell(estado)="data">
            <colEstado
              :data="data"
              modulo="reunionesCoordinaciones"
              @processUpdateEstado="updateEstado"
            />
          </template>

          <!-- Column: Action -->
          <template #cell(acciones)="data">
            <colAccionesBtnes
              modulo="reunionesCoordinaciones"
              :modal="`modal-lg-${data.item.id}`"
              :data="data"
              @processGoToConfig="goToConfig"
              @processGoToUpdate="goToUpdate"
              @processGoToClone="goToClone"
              @processRemove="remove(data.item)"
            />
          </template>
        </b-table>
        <b-alert
          v-if="items.length === 0"
          variant="primary"
          show
          class="text-center pt-25 pb-25"
        >
          <div class="alert-body">
            <span>No existen apoyos registrados.</span>
          </div>
        </b-alert>
      </b-col>

      <b-col
        cols="12"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          size="sm"
          class="my-0"
        />
      </b-col>

    </b-row>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BTable, BRow, BCol, BPagination, BFormCheckbox, BOverlay, BCardText,
  BButton, VBModal, BAlert,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Ripple from 'vue-ripple-directive'

// COMPONENTES RECICLADOS
// import inputFiltro from '../../../../../../components/List/inputFiltro.vue'
// import btnCrear from '../../../../../components/List/btnCrear.vue'
import btnMostrar from '../../../../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../components/List/colEstado.vue'
import spinner from '../../../../../components/spinner.vue'
import colNombreImg from '../../../../../components/List/colNombreImg.vue'

// COMPONENTES HIJOS
import apoyosEstudiantesCreate from './ApoyosEstudiantes/ApoyosEstudiantesCreate.vue'

export default {
  components: {
    BTable,
    BRow,
    BCol,
    BPagination,
    BFormCheckbox,
    BOverlay,
    BCardText,
    BButton,
    VBModal,
    BAlert,

    // COMPONENTES RECICLADOS
    colAccionesBtnes,
    // btnCrear,
    // inputFiltro,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // COMPONENTES HIJOS
    apoyosEstudiantesCreate,
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

      ],
      selectedchk: [],
      chkTodo: null,
      checked: null,

      perPage: 25,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      pageOptions: [25, 50, 100],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {
          key: 'planApoyo',
          label: 'Plan de apoyo',
          sortable: true,
          thStyle: {
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'objetivos',
          label: 'Objetivos de aprendizaje',
          sortable: true,
          thStyle: {
            width: '150px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'totalApoyos',
          label: 'Nº Apoyos',
          sortable: true,
          thStyle: {
            width: '60px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'totalFirmados',
          label: 'Nº Firmas',
          sortable: true,
          thStyle: {
            width: '60px !important',
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
      fieldAcciones: [
        {
          key: 'acciones',
          label: 'acciones',
          tdClass: 'text-center',
          thStyle: {
            width: '80px !important',
            'text-align': 'center',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
      ],
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
    this.setTableList()
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
