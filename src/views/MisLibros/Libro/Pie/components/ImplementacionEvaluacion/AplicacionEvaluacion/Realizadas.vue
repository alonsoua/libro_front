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
          <realizadas-create
            :idCurso="getLibroSelected.id"
          />

          <!-- BOTON CREAR -->
          <btn-crear-modal
            accion="Registrar"
            texto="Acciones"
            modal="modal-create"
            :modulo="nombre_permiso"
          />
        </div>
      </b-col>

      <b-col cols="12" style="min-height: 345px !important;">
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

          <!-- Column: Descripcion -->
          <template #cell(descripcion)="data">
            {{ data.item.title }}
          </template>

          <!-- Column: Action -->
          <template #cell(acciones)="data">
            <realizadas-update
              :modal="'modal-update-'+data.item.id"
              :data.sync="data"
              :idCurso="getLibroSelected.id"
            />
            <colAccionesBtnes
              v-if="data.item.id_persona_rol === user.id_persona_rol"
              :modulo="nombre_permiso"
              :modal="`modal-update-${data.item.id}`"
              :data="data"
              @processRemove="remove(data.item)"
            />
            <b-alert
              v-else
              class="mt-25 mb-25"
              variant="primary"
              show
            >
              Apoyo creado por otro usuario
            </b-alert>
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
  BButton, VBModal, BFormGroup, BFormTextarea, BAlert,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Ripple from 'vue-ripple-directive'

// COMPONENTES RECICLADOS
// import inputFiltro from '../../../../../../components/List/inputFiltro.vue'
import btnCrearModal from '../../../../../../components/List/btnCrearModal.vue'
import btnMostrar from '../../../../../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../../../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../../components/List/colEstado.vue'
import spinner from '../../../../../../components/spinner.vue'
import colNombreImg from '../../../../../../components/List/colNombreImg.vue'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

// COMPONENTES HIJOS
import realizadasCreate from './Realizadas/RealizadasCreate.vue'
import realizadasUpdate from './Realizadas/RealizadasUpdate.vue'


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
    BFormGroup,
    BFormTextarea,
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
    realizadasCreate,
    realizadasUpdate,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  data() {
    return {
      nombre_permiso: 'pieIII1B',
      cargando: false,
      spinner: false,
      observaciones: '',

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
          key: 'descripcion',
          label: 'Plan de apoyo',
          sortable: true,
          thStyle: {
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'observaciones',
          label: 'Observaciones',
          sortable: true,
          thStyle: {
            width: '150px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'totalAcciones',
          label: 'Nº Acciones',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            width: '60px !important',
            'text-align': 'center',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        // {
        //   key: 'totalFirmados',
        //   label: 'Nº Firmas',
        //   sortable: true,
        //   thStyle: {
        //     width: '60px !important',
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
      getRealizadas: 'III_1_b_acciones_realizadas/getRealizadas',
      getLibroSelected: 'libros/getLibroSelected',
      user: 'auth/user',
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
    getRealizadas(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getRealizadas
    },
    getLibroSelected(val) {
      this.cargarRealizadas(this.getLibroSelected.id)
    },
  },
  mounted() {
    this.cargarRealizadas(this.getLibroSelected.id)
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchRealizadas: 'III_1_b_acciones_realizadas/fetchRealizadas',
      removeRealizada: 'III_1_b_acciones_realizadas/removeRealizada',
    }),
    setTableList() {
      if (this.$can('update', this.nombre_permiso)
        || this.$can('delete', this.nombre_permiso)
      ) {
        this.fields.push(this.fieldAcciones)
      }
    },
    cargarRealizadas(idCurso) {
      const data = {
        idCurso,
        tipo: 1, // Tipo ProfesorAula
      }
      this.fetchRealizadas(data).then(() => {
        this.cargando = false
      })
    },
    remove(realizada) {
      const html = this.formatHTMLSweetEliminar('el registro de acciones realizadas', realizada.observaciones)
      this.$swal({
        title: 'Eliminar registro de acciones realizadas!',
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
          const data = {
            id: realizada.id,
            id_curso: this.getLibroSelected.id,
          }

          this.removeRealizada(data).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Eliminado con éxito!',
              text: `El registro de acciones realizadas ha sido eliminado!`,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })

            this.cargarRealizadas(this.getLibroSelected.id)
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
