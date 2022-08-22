<template>
  <b-overlay
    :show="spinner"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-card>
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
          <inputFiltro
            :filter.sync="filter"
          />
        </b-col>
        <b-col
          md="4"
          sm="4"
          class="my-1"
        >
          <!-- BOTON CREAR -->
          <btnCrear
            texto="Periodo"
            modulo="periodos"
            @processAdd="addPeriodo"
          />
        </b-col>

        <b-col cols="12">
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

            <!-- Column: Periodo -->
            <template #cell(nombre)="data">
              <colNombreImg
                :mostrarImg="true"
                :imagen="data.item.insignia"
                :nombre="data.item.nombre"
                :txtMuted="data.item.abreviatura"
                :nombreModal="null"
              />
            </template>

            <!-- COLUMNA PERIODO -->
            <template #cell(nombrePeriodo)="data">
              <colPeriodo
                modulo="periodos"
                :data="data.item"
                @processUpdatePeriodo="updatePeriodo"
              />
            </template>

            <!-- COLUMNA ESTADO -->
            <template #cell(estado)="data">
              <colEstado
                :data="data"
                modulo="periodos"
                @processUpdateEstado="updateEstado"
              />
            </template>

            <!-- Column: Action -->
            <template #cell(acciones)="data">
              <colAccionesBtnes
                modulo="periodos"
                :modal="`modal-lg-${data.item.id}`"
                :data="data"
                @processGoToConfig="goToConfig"
                @processGoToUpdate="goToUpdate"
                @processGoToClone="goToClone"
                @processRemove="remove(data.item)"
              />
            </template>
          </b-table>
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
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BTable, BRow, BCol, BPagination, BFormCheckbox, BOverlay, BCard,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

import btnCrear from '../../../components/List/btnCrear.vue'
import inputFiltro from '../../../components/List/inputFiltro.vue'
import btnMostrar from '../../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../../components/List/colPeriodo.vue'
import colEstado from '../../../components/List/colEstado.vue'
import spinner from '../../../components/spinner.vue'
import colNombreImg from '../../../components/List/colNombreImg.vue'

export default {
  components: {
    BTable,
    BRow,
    BCol,
    BPagination,
    BFormCheckbox,
    BOverlay,
    BCard,

    colAccionesBtnes,
    btnCrear,
    inputFiltro,
    btnMostrar,
    colPeriodo,
    colEstado,
    spinner,
    colNombreImg,
  },
  data() {
    return {
      cargando: false,
      spinner: false,
      // chk
      items: [{
        periodo: '2022',
        estado: 'Activo',
      }],

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
          key: 'periodo',
          label: 'Periodo',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'estado',
          label: 'Estado',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            'text-align': 'center',
            width: '100px !important',
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
    // ...mapGetters({ getPeriodos: 'periodos/getPeriodos' }),
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
    getPeriodos(val) {
      this.totalRows = val.length
      // this.items = []
      // this.items = this.getPeriodos
    },
  },
  mounted() {
    this.cargarPeriodos()
    this.setTableList()
  },
  methods: {
    // ...mapActions({
    //   fetchPeriodos: 'periodos/fetchPeriodos',
    //   updatePeriodoPeriodo: 'periodos/updatePeriodoPeriodo',
    //   removePeriodos: 'periodos/removePeriodos',
    // }),
    // ...mapMutations('periodos', ['setPeriodo']),
    setTableList() {
      if (this.$can('update', 'periodos')
        || this.$can('delete', 'periodos')
      ) {
        this.fields.push(this.fieldAcciones)
      }
    },
    cargarPeriodos() {
      // this.fetchPeriodos().then(() => {
      //   this.cargando = false
      // })
    },
    addPeriodo() {
      this.$router.replace({
        name: 'periodos-create',
      })
    },
    updatePeriodo(periodo) {
      this.$swal({
        title: 'Actualizar periodo!',
        html: 'Estás seguro que deseas actualizar el periodo activo del'
          + ' periodo<br><span class="font-weight-bolder">'
          + `${periodo.nombre}</span>?`,
        footer: '<div class="text-center text-primary">Al actualizar el'
          + ' periodo activo, se creará un nuevo marco de trabajo para el'
          + ' periodo. No se puede devolver al periodo anterior.</div>',
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
          // this.updatePeriodoPeriodo(periodo).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Periodo activo actualizado!',
          //     html:
          //       'El periodo activo del periodo<br>'
          //       + ' <span class="font-weight-bolder">'
          //       + `${periodo.nombre}</span>`
          //       + '<br>ha sido actualizado con éxito!',
          //     customClass: {
          //       confirmButton: 'btn btn-primary',
          //     },
          //   })
          //   this.spinner = false
          //   this.cargarPeriodos()
          // })
        } else {
          this.spinner = false
          this.cargarPeriodos()
        }
      })
    },
    updateEstado() {
      // console.log('update')
    },
    goToConfig(periodo) {
      this.setPeriodo(periodo)
      this.$router.push({
        name: 'periodos-config',
      })
    },
    goToUpdate(periodo) {
      this.setPeriodo(periodo)
      this.$router.push({
        name: 'periodos-update',
      })
    },
    goToClone(periodo) {
      this.setPeriodo(periodo)
      this.$router.push({
        name: 'periodos-clone',
      })
    },
    remove(periodo) {
      this.$swal({
        title: 'Eliminar periodo!',
        text: `Estás seguro que deseas eliminar el periodo
          "${periodo.nombre}"?`,
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
          // this.removePeriodos(periodo.id).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Eliminada con éxito!',
          //     text: `"${periodo.nombre}" ha sido eliminada!`,
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
