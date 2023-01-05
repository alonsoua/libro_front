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

          <!-- CREAR y EDITAR -->
          <aplicacion-create
            :idCurso="getLibroSelected.id"
          />

          <!-- BOTON CREAR -->
          <btn-crear-modal
            accion="Registrar"
            texto="Acción"
            modal="modal-create"
            :modulo="nombre_permiso"
          />

        </div>

      </b-col>

      <b-col cols="12" style="min-height: 366px !important;">
        <b-table
          striped
          small
          hover
          noCollapse
          responsive
          bordered
          class="mt-1 rounded"
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


          <!-- Column: Action -->
          <template #cell(actions)="data">
            <aplicacion-update
              :modal="'modal-update-'+data.item.id"
              :data="data"
              :idCurso="getLibroSelected.id"
            />
            <colAccionesBtnes
              :modal="'modal-update-'+data.item.id"
              :data="data"
              :modulo="nombre_permiso"
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
            <span>No existen acciones registradas.</span>
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
import Ripple from 'vue-ripple-directive'

// VUEX
import { mapGetters, mapActions, mapMutations } from 'vuex'

// COMPONENTES RECICLADOS
// import inputFiltro from '../../../../../../components/List/inputFiltro.vue'
import btnCrearModal from '../../../../../../components/List/btnCrearModal.vue'
import btnMostrar from '../../../../../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../../../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../../components/List/colEstado.vue'
import spinner from '../../../../../../components/spinner.vue'
import colNombreImg from '../../../../../../components/List/colNombreImg.vue'

// COMPONENTES HIJOS
import aplicacionCreate from './Aplicacion/AplicacionCreate.vue'
import aplicacionUpdate from './Aplicacion/AplicacionUpdate.vue'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

export default {
  components: {
    // ETIQUETAS
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
    btnCrearModal,
    colAccionesBtnes,
    // inputFiltro,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // COMPONENTES HIJOS
    aplicacionCreate,
    aplicacionUpdate,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  data() {
    return {
      nombre_permiso: 'pieIII1A',
      cargando: false,
      spinner: false,
      items: [
        // {
        //   accionesDesarrolladas: 'DIVISIÓN DEL CURSO',
        //   evaluacion: 'MEJOR APRECIACIÓN DE LAS NECESIDAD DE CADA UNO DE LOS Y LAS NIÑAS.',
        //   periodo: '1er Semestre',
        // },
        // {
        //   accionesDesarrolladas: 'USO DE PLATAFORMA ZOOM PARA ENTREGA DE CLASES VIRTUALES',
        //   evaluacion: 'BUEN USO DE LA PLATAFORMA, SIMPLE Y AMIGABLE PARA APODERADOS, NIÑOS(AS) Y PROFESIONALES.',
        //   periodo: '1er Semestre',
        // },
        // {
        //   accionesDesarrolladas: 'USO DE ESTRATEGIAS LÚDICAS Y PARTICIPATIVAS PARA LOS Y LAS NIÑAS.',
        //   evaluacion: 'ADQUISICIÓN DE HABILIDADES DEL NIVEL 1 DE LA PRIORIZACIÓN.',
        //   periodo: '1er Semestre',
        // },
        // {
        //   accionesDesarrolladas: 'ARTICULACIÓN Y TRABAJO COLABORATIVO ENTRE LOS PROFESIONALES.',
        //   evaluacion: 'MEJOR APRECIACIÓN DE CADA ALUMNO(A) Y NECESIDADES DE APOYO.',
        //   periodo: '1er Semestre',
        // },
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
        {
          key: 'estrategia',
          label: 'Periodo (estrategia)',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'acciones',
          label: 'Acciones Desarrolladas',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'evaluacion',
          label: 'Evaluación (resultados) de las estrategias aplicadas',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        // {
        //   key: 'fecha_creacion',
        //   label: 'Fecha Creación',
        //   sortable: true,
        //   tdClass: 'text-center',
        //   thStyle: {
        //     width: '100px !important',
        //     'text-align': 'center',
        //     display: 'table-cell',
        //     'vertical-align': 'middle',
        //   },
        // },
      ],
      fieldAcciones: [
        {
          key: 'actions',
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
      getAplicaciones: 'III_1_a_acciones_de_aplicacion/getAplicaciones',
      getLibroSelected: 'libros/getLibroSelected',
    }),
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
    getAplicaciones(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getAplicaciones
    },
    getLibroSelected(val) {
      this.cargarAplicaciones(this.getLibroSelected.id)
    },
    chkTodo() {
      this.chkAll()
    },
  },
  mounted() {
    this.cargarAplicaciones(this.getLibroSelected.id)
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchAplicaciones: 'III_1_a_acciones_de_aplicacion/fetchAplicaciones',
      removeAplicacion: 'III_1_a_acciones_de_aplicacion/removeAplicacion',
    }),
    setTableList() {
      if (this.$can('update', this.nombre_permiso)
        || this.$can('delete', this.nombre_permiso)
      ) {
        this.fields.push(this.fieldAcciones)
      }
    },
    cargarAplicaciones(idCurso) {
      this.fetchAplicaciones(idCurso).then(() => {
        this.cargando = false
      })
    },
    remove(aplicacion) {
      const html = this.formatHTMLSweetEliminar('la acción', aplicacion.acciones)
      this.$swal({
        title: 'Eliminar acción!',
        html,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, elimínala!',
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
            id: aplicacion.id,
            id_curso: this.getLibroSelected.id,
          }
          this.removeAplicacion(data).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Eliminado con éxito!',
              text: `La acción ha sido eliminada!`,
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
