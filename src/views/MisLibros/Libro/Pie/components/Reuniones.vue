<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-row class="mr-25 ml-25 mb-3">

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
      </b-col>
      <b-col
        md="4"
        sm="4"
        class="my-1"
      >
        <div
          class="d-flex align-items-center justify-content-end"
        >
          <!-- CREAR -->
          <reunion-create
            :idCurso="getLibroSelected.id"
          />

          <!-- BOTON CREAR -->
          <btn-crear-modal
            accion="Registrar"
            texto="Reunión"
            modal="modal-create"
            :modulo="nombre_permiso"
          />
        </div>
      </b-col>

      <b-col cols="12" style="min-height: 403px !important;">
        <b-table
          striped
          small
          hover
          noCollapse
          bordered
          class="mt-1 rounded"
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

          <!-- Cargando -->
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <spinner />
            </div>
          </template>

          <!-- FECHA -->
          <template #cell(fecha)="data">
            <div class="mb-25 mt-75">
              {{ formatFechaVer(data.item.fecha) }}
            </div>
          </template>

          <!-- Column: alumnos -->
          <template #cell(participantes)="data">
            <div
              v-for="(participante, key) in data.item.participantes"
              :key="key"
            >
              <b>{{ participante.nombre_rol }}</b><br>

              {{ participante.nombre }} {{ participante.primer_apellido }} {{ participante.segundo_apellido }}
              <hr
                v-if="key + 1 !== data.item.participantes.length"
                style="margin-top: 1px; margin-bottom: 5px;"
              >
            </div>
          </template>

          <!-- Column: Action -->
          <template #cell(acciones)="data">
            <reunion-update
              :modal="'modal-update-'+data.item.id"
              :data="data"
              :idCurso="getLibroSelected.id"
            />

            <colAccionesBtnes
              :modulo="nombre_permiso"
              :modal="`modal-update-${data.item.id}`"
              :data="data"
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
            <span>No existen trabajos registrados.</span>
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
  BButton, VBModal, BAlert, BCardTitle,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Ripple from 'vue-ripple-directive'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES
// import inputFiltro from '../../../../../../components/List/inputFiltro.vue'
import btnCrearModal from '../../../../components/List/btnCrearModal.vue'
import btnMostrar from '../../../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../components/List/colEstado.vue'
import spinner from '../../../../components/spinner.vue'
import colNombreImg from '../../../../components/List/colNombreImg.vue'

// HIJOS
import ReunionCreate from './Reuniones/ReunionCreate.vue'
import ReunionUpdate from './Reuniones/ReunionUpdate.vue'

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
    BCardTitle,

    // COMPONENTES
    btnCrearModal,
    colAccionesBtnes,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // HIJOS
    ReunionCreate,
    ReunionUpdate,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  data() {
    return {
      nombre_permiso: 'pieV',
      cargando: false,
      spinner: false,
      // chk
      items: [],
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
          key: 'fecha',
          label: 'Fecha',
          sortable: true,
          thStyle: {
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'participantes',
          label: 'Participantes',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'objetivo',
          label: 'Motivo(s)',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'actividad',
          label: 'Acuerdo(s)',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'acuerdo',
          label: 'Compromiso(s)',
          sortable: true,
          thStyle: {
            width: '200px !important',
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
    ...mapGetters({
      getActividades: 'IV_actividades/getActividades',
      getLibroSelected: 'libros/getLibroSelected',
    }),
    // Vuexy
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  watch: {
    getActividades(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getActividades
    },
    getLibroSelected(val) {
      this.cargarActividades(this.getLibroSelected.id)
    },
  },
  mounted() {
    this.cargarActividades(this.getLibroSelected.id)
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchActividades: 'IV_actividades/fetchActividades',
      removeActividad: 'IV_actividades/removeActividad',
      // updateReunionesCoordinacionPeriodo: 'reunionesCoordinaciones/updateReunionesCoordinacionPeriodo',
    }),
    setTableList() {
      if (this.$can('update', this.nombre_permiso)
        || this.$can('delete', this.nombre_permiso)
      ) {
        this.fields.push(this.fieldAcciones)
      }
    },
    cargarActividades(idCurso) {
      const data = {
        idCurso,
        tipo: 3, // Tipo Reunión
      }
      this.fetchActividades(data).then(() => {
        this.cargando = false
      })
    },
    remove(actividad) {
      const fecha = `${this.formatFechaVerCompleto(actividad.fecha)}`
      const html = this.formatHTMLSweetEliminar('la reunión', fecha)
      this.$swal({
        title: 'Eliminar reunión!',
        html,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, elimínala!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        this.spinner = true
        if (result.value) {
          this.removeActividad(actividad.id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Eliminado con éxito!',
              text: `La reunión ha sido eliminada!`,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })

            this.cargarActividades(this.getLibroSelected.id)
            this.spinner = false
          })
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
