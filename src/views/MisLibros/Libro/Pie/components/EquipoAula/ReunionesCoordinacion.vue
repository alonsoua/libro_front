<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-row>
      <b-col cols="12" class="mb-50 mt-50">
        <b-card-text
          style="margin-top: 8px; "
          class="h5"
        >
          Calendarización de reuniones de coordinación
        </b-card-text>
      </b-col>
      <b-col
        lg="2"
        md="3"
        sm="3"
        class="my-2"
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
          class="mt-50"
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
          <reuniones-create
            :idCurso="getLibroSelected.id"
          />

          <!-- BOTON CREAR -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            v-b-modal.modal-create
            variant="primary"
            class="btn-md"
          >
            Coordinar Reunión
          </b-button>

        </div>
      </b-col>

      <b-col cols="12" style="min-height: 490px !important; margin-top: -16px;">

        <b-table
          striped
          small
          hover
          noCollapse
          bordered
          responsive
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

          <!-- cargando tabla SPINNER -->
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <spinner />
            </div>
          </template>

          <!-- COLUMNAS -->

          <!-- FECHA -->
          <template #cell(fecha)="data">
            <div class="mb-25 mt-75">
              {{ formatFechaVer(data.item.fecha) }}
            </div>
            <div class="mb-50">
              {{ formatHoraVer(data.item.horario) }}
            </div>
          </template>

          <!-- ASISTENTES -->
          <template #cell(asistentes)="data">
            <div
              v-for="(asistente, key) in data.item.asistentes"
              :key="key"
            >
              - {{ asistente.nombre }}
            </div>
          </template>


          <!-- ESTADO -->
          <!-- <template #cell(estado)="data">
            <colEstado
              :data="data"
              modulo="reunionesCoordinaciones"
              @processUpdateEstado="updateEstado"
            />
          </template> -->

          <!-- ACCIONES -->
          <template #cell(acciones)="data">

            <!-- modulo="reuniones" -->
            <reuniones-update-vue
              :modal="'modal-update-'+data.item.id"
              :data="data"
              :idCurso="getLibroSelected.id"
            />
            <colAccionesBtnes
              :modal="'modal-update-'+data.item.id"
              :data="data"
              @processGoToUpdate="goToUpdate"
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
            <span>No existen reuniones registradas.</span>
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
  BTable, BRow, BCol, BPagination, BFormCheckbox, BOverlay, BCardTitle,
  BButton, VBModal, BAlert, BCardText,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Ripple from 'vue-ripple-directive'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'


// COMPONENTES
import inputFiltro from '../../../../../components/List/inputFiltro.vue'
import btnMostrar from '../../../../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../../../components/List/colPeriodo.vue'
import colEstado from '../../../../../components/List/colEstado.vue'
import spinner from '../../../../../components/spinner.vue'
import colNombreImg from '../../../../../components/List/colNombreImg.vue'

// HIJOS
import reunionesCreate from './ReunionesCoordinacion/ReunionesCreate.vue'
import ReunionesUpdateVue from './ReunionesCoordinacion/ReunionesUpdate.vue'

export default {
  components: {
    // ETIQUETAS
    BTable,
    BRow,
    BCol,
    BPagination,
    BFormCheckbox,
    BOverlay,
    BCardTitle,
    BButton,
    VBModal,
    BAlert,
    BCardText,

    // COMPONENTES
    inputFiltro,
    colAccionesBtnes,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,

    // HIJOS
    reunionesCreate,
    ReunionesUpdateVue,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  data() {
    return {
      cargando: false,
      spinner: false,
      items: [],

      // Filtros
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      pageOptions: [10, 25, 50],
      // Info
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      // Filas
      fields: [

        {
          key: 'fecha',
          label: 'Fecha/horario',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            'text-align': 'center',
            width: '60px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'asistentes',
          label: 'Asistentes',
          sortable: false,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'acuerdos',
          label: 'Acuerdos',
          sortable: false,
          thStyle: {
            width: '300px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
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
      getReuniones: 'I_2_reuniones/getReuniones',
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
    getReuniones(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getReuniones
    },
    getLibroSelected(val) {
      this.cargarReuniones(this.getLibroSelected.id)
    },
  },
  mounted() {
    this.cargarReuniones(this.getLibroSelected.id)
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchReuniones: 'I_2_reuniones/fetchReuniones',
      updateReuniones: 'I_2_reuniones/updateReuniones',
      removeReunion: 'I_2_reuniones/removeReunion',
    }),
    // ...mapMutations('reunionesCoordinaciones', ['setReunionesCoordinacion']),
    setTableList() {
      this.fields.push(this.fieldAcciones)
      // if (this.$can('update', 'reunionesCoordinaciones')
      //   || this.$can('delete', 'reunionesCoordinaciones')
      // ) {
      // }
    },
    cargarReuniones(idCurso) {
      this.fetchReuniones(idCurso).then(() => {
        this.cargando = false
      })
    },
    goToUpdate(reunion) {
      this.setReunionesCoordinacion(reunion)
      this.$router.push({
        name: 'reuniones-update',
      })
    },
    remove(reunion) {
      this.$swal({
        title: 'Eliminar reunión!',
        text: `Estás seguro que deseas eliminar la reunión del día
        ${this.formatFechaVer(reunion.fecha)} a las
        ${this.formatHoraVer(reunion.horario)}?`,
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
          this.removeReunion(reunion.id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Eliminada con éxito!',
              text: `La reunión ha sido eliminada!`,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })

            this.cargarReuniones(this.getLibroSelected.id)
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
