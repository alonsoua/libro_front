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
          <!-- CREAR -->
          <logros-aprendizaje-create
            :idCurso="getLibroSelected.id"
          />

          <!-- BOTON CREAR -->
          <btn-crear-modal
            accion="Registrar"
            texto="Logros"
            modal="modal-create"
            :modulo="nombre_permiso"
          />
        </div>
      </b-col>

      <b-col cols="12" style="min-height: 424px !important;">
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

          <!-- Column: alumnos -->
          <template #cell(alumnos)="data">
            <div>
              {{ data.item.nombre }} {{ data.item.primer_apellido }} {{ data.item.segundo_apellido }}
            </div>
          </template>


          <!-- Column: Action -->
          <template #cell(acciones)="data">

            <logros-aprendizaje-update
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
            <span>No existen logros registrados.</span>
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
  BButton, BAlert,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Ripple from 'vue-ripple-directive'

// COMPONENTES RECICLADOS
// import inputFiltro from '../../../../../../components/List/inputFiltro.vue'
import btnCrearModal from '../../../../../components/List/btnCrearModal.vue'
import btnMostrar from '../../../../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../components/List/colEstado.vue'
import spinner from '../../../../../components/spinner.vue'
import colNombreImg from '../../../../../components/List/colNombreImg.vue'

// COMPONENTES HIJOS
import LogrosAprendizajeCreate from './LogrosAprendizaje/LogrosAprendizajeCreate.vue'
import LogrosAprendizajeUpdate from './LogrosAprendizaje/LogrosAprendizajeUpdate.vue'
import { formatos } from '@core/mixins/ui/formatos';

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
    BAlert,

    // COMPONENTES RECICLADOS
    btnCrearModal,
    // inputFiltro,
    colAccionesBtnes,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // COMPONENTES HIJOS
    LogrosAprendizajeCreate,
    LogrosAprendizajeUpdate,
  },
  directives: {
    Ripple,
  },
  mixins: [formatos],
  data() {
    return {
      nombre_permiso: 'pieIII3',
      cargando: false,
      spinner: false,
      items: [],

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
          key: 'alumnos',
          label: 'Estudiante',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'logros',
          label: 'Logros más relevantes',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            width: '100px !important',
            'text-align': 'center',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'comentarios',
          label: 'Comentarios y sugerencias',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            width: '100px !important',
            'text-align': 'center',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
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
      getLogros: 'III_3_logros/getLogros',
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
    getLogros(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getLogros
    },
    getLibroSelected(val) {
      this.cargarLogros(this.getLibroSelected.id)
    },
  },
  mounted() {
    this.cargarLogros(this.getLibroSelected.id)
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchLogros: 'III_3_logros/fetchLogros',
      removeLogro: 'III_3_logros/removeLogro',
    }),
    setTableList() {
      if (this.$can('update', this.nombre_permiso)
        || this.$can('delete', this.nombre_permiso)
      ) {
        this.fields.push(this.fieldAcciones)
      }
    },
    cargarLogros(idCurso) {
      this.fetchLogros(idCurso).then((response) => {})
    },
    remove(logro) {
      const html = this.formatHTMLSweetEliminar('el logro', logro.logros)
      this.$swal({
        title: 'Eliminar logro!',
        html,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, elimínalo!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        this.spinner = true
        if (result.value) {
          this.removeLogro(logro.id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Eliminado con éxito!',
              text: `El logro ha sido eliminado!`,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            this.cargarLogros(this.getLibroSelected.id)
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
