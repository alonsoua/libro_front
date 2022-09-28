<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-row
      class="mb-3"
    >
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
        class="my-50"
      >

        <!-- modulo="Estrategia" -->
        <!-- CREAR y EDITAR -->
        <estrategiasCreate
          submitTitle="Guardar Estrategia"
          title="Registrar estrategia diversificada"
          :idCurso.sync="getLibroSelected.id"
        />

        <!-- BOTON CREAR -->
        <btn-crear-modal
          accion="Registrar"
          texto="Estrategia"
          modal="modal-create"
        />

      </b-col>

      <b-col cols="12" style="min-height: 490px !important; margin-top: -12px;">
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

          <!-- col ACCIONES -->
          <template #cell(acciones)="data">
            <!-- modulo="reunionesCoordinaciones" -->
            <estrategias-update
              :modal="'modal-update-'+data.item.id"
              :data="data"
              :idCurso="getLibroSelected.id"
            />
            <col-acciones-btnes
              :modal="'modal-update-'+data.item.id"
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
            <span>No existen estrategias registradas.</span>
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
import btnMostrar from '../../../../../../components/List/btnMostrar.vue'
import btnCrearModal from '../../../../../../components/List/btnCrearModal.vue'
import colAccionesBtnes from '../../../../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../../components/List/colEstado.vue'
import spinner from '../../../../../../components/spinner.vue'
import colNombreImg from '../../../../../../components/List/colNombreImg.vue'

// HIJOS
import estrategiasCreate from './Estrategias/EstrategiasCreate.vue'
import estrategiasUpdate from './Estrategias/EstrategiasUpdate.vue'


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

    // COMPONENTES
    colAccionesBtnes,
    // inputFiltro,
    btnMostrar,
    btnCrearModal,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // HIJOS
    estrategiasCreate,
    estrategiasUpdate,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      cargando: false,
      spinner: false,
      items: [],

      // MODAL
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },

      // TABLE
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      pageOptions: [10, 25, 50],
      fields: [
        {
          key: 'estrategia',
          label: 'Estrategia',
          sortable: true,
          thStyle: {
            'text-align': 'center',
            width: '330px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'nombre',
          label: 'Ámbito o asignatura donde se aplicará',
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
          key: 'periodo',
          label: 'Período de tiempo en que se aplicará',
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
          key: 'criterios',
          label: 'Criterios para la evaluación de la estrategia',
          sortable: true,
          thStyle: {
            'text-align': 'center',
            width: '200px !important',
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
      getEstrategias: 'II_1_b_estrategias/getEstrategias',
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
    getEstrategias(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getEstrategias
    },
    getLibroSelected(val) {
      this.cargarEstrategias(this.getLibroSelected.id)
    },
  },
  mounted() {
    this.cargarEstrategias(this.getLibroSelected.id)
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchEstrategias: 'II_1_b_estrategias/fetchEstrategias',
      removeEstrategia: 'II_1_b_estrategias/removeEstrategia',
    }),
    setTableList() {
      this.fields.push(this.fieldAcciones)
      // if (this.$can('update', 'II_1_b_estrategias')
      //   || this.$can('delete', 'II_1_b_estrategias')
      // ) {
      // }
    },
    cargarEstrategias(idCurso) {
      this.fetchEstrategias(idCurso).then(() => {
        this.cargando = false
      })
    },
    remove(estrategia) {
      this.$swal({
        title: 'Eliminar estrategia!',
        text: `Estás seguro que deseas eliminar el estrategia:
          "${estrategia.estrategia}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminala!',
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
            id: estrategia.id,
            id_curso: estrategia.id_curso,
          }
          this.removeEstrategia(data).then(() => {
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
