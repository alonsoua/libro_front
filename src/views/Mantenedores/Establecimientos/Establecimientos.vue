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
            texto="Establecimiento"
            modulo="establecimientos"
            @processAdd="addEstablecimiento"
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

            <!-- Header: Check -->
            <template #head(colCheck)="data">

              <b-form-checkbox
                :id="data.label"
                v-model="chkTodo"
              />

            </template>

            <!-- Column: Check -->
            <template #cell(colCheck)="data">

              <b-form-checkbox
                :id="`chk-${data.item.id}`"
                v-model="data.item.chkSelected"
              />

            </template>

            <!-- Column: Establecimiento -->
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
                modulo="establecimientos"
                :data="data.item"
                @processUpdatePeriodo="updatePeriodo"
              />
            </template>

            <!-- COLUMNA ESTADO -->
            <template #cell(estado)="data">
              <colEstado
                :data="data"
                modulo="establecimientos"
                @processUpdateEstado="updateEstado"
              />
            </template>

            <!-- Column: Action -->
            <template #cell(acciones)="data">
              <colAccionesBtnes
                modulo="establecimientos"
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
            class="my-0 mt-1"
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

import btnCrear from '../../components/List/btnCrear.vue'
import inputFiltro from '../../components/List/inputFiltro.vue'
import btnMostrar from '../../components/List/btnMostrar.vue'
import colAccionesBtnes from '../../components/List/colAccionesBtnes.vue'
import colPeriodo from '../../components/List/colPeriodo.vue'
import colEstado from '../../components/List/colEstado.vue'
import spinner from '../../components/spinner.vue'
import colNombreImg from '../../components/List/colNombreImg.vue'

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
      items: [
        // {
      //   nombre: 'Complejo Educacional Sargento Aldea',
      //   rbd: '1864',
      //   abreviatura: 'CESA',
      //   director: 'Cristian Vergara Guerra',
      //   correo: 'cesa@gmail.com',
      //   dependencia: 'Municipal',
      //   tipoEvaluacion: 'Semestral',
      //   estado: 'Activo',
      // }
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
          key: 'nombre',
          label: 'Nombre',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'rbd',
          label: 'RBD',
          sortable: true,
          thStyle: {
            width: '60px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'director',
          label: 'Director',
          sortable: false,
          thStyle: {
            width: '250px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'tipoEvaluacion',
          label: 'Tipo Evaluación',
          sortable: false,
          thStyle: {
            width: '250px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'dependencia',
          label: 'Dependencia',
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
          key: 'nombrePeriodo',
          label: 'Periodo Activo',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            'text-align': 'center',
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
    ...mapGetters({ getEstablecimientos: 'establecimientos/getEstablecimientos' }),
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
    getEstablecimientos(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getEstablecimientos
    },
    chkTodo() {
      this.chkAll()
    },
  },
  mounted() {
    this.cargarEstablecimientos()
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchEstablecimientos: 'establecimientos/fetchEstablecimientos',
      updateEstablecimientoPeriodo: 'establecimientos/updateEstablecimientoPeriodo',
      removeEstablecimientos: 'establecimientos/removeEstablecimientos',
    }),
    ...mapMutations('establecimientos', ['setEstablecimiento']),
    setTableList() {
      this.fields.push(this.fieldAcciones)
      // if (this.$can('update', 'establecimientos')
      //   || this.$can('delete', 'establecimientos')
      // ) {
      // }
    },
    cargarEstablecimientos() {
      this.cargando = true
      this.fetchEstablecimientos().then(() => {
        this.cargando = false
      })
    },
    addEstablecimiento() {
      this.$router.replace({
        name: 'establecimientos-create',
      })
    },
    updatePeriodo(establecimiento) {
      this.$swal({
        title: 'Actualizar periodo!',
        html: 'Estás seguro que deseas actualizar el periodo activo del'
          + ' establecimiento<br><span class="font-weight-bolder">'
          + `${establecimiento.nombre}</span>?`,
        footer: '<div class="text-center text-primary">Al actualizar el'
          + ' periodo activo, se creará un nuevo marco de trabajo para el'
          + ' establecimiento. No se puede devolver al periodo anterior.</div>',
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
          // this.updateEstablecimientoPeriodo(establecimiento).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Periodo activo actualizado!',
          //     html:
          //       'El periodo activo del establecimiento<br>'
          //       + ' <span class="font-weight-bolder">'
          //       + `${establecimiento.nombre}</span>`
          //       + '<br>ha sido actualizado con éxito!',
          //     customClass: {
          //       confirmButton: 'btn btn-primary',
          //     },
          //   })
          //   this.spinner = false
          //   this.cargarEstablecimientos()
          // })
        } else {
          this.spinner = false
          this.cargarEstablecimientos()
        }
      })
    },
    updateEstado() {
      // console.log('update')
    },
    goToConfig(establecimiento) {
      this.setEstablecimiento(establecimiento)
      this.$router.push({
        name: 'establecimientos-config',
      })
    },
    goToUpdate(establecimiento) {
      this.setEstablecimiento(establecimiento)
      this.$router.push({
        name: 'establecimientos-update',
      })
    },
    goToClone(establecimiento) {
      this.setEstablecimiento(establecimiento)
      this.$router.push({
        name: 'establecimientos-clone',
      })
    },
    remove(establecimiento) {
      this.$swal({
        title: 'Eliminar establecimiento!',
        text: `Estás seguro que deseas eliminar el establecimiento
          "${establecimiento.nombre}"?`,
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
          // this.removeEstablecimientos(establecimiento.id).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Eliminada con éxito!',
          //     text: `"${establecimiento.nombre}" ha sido eliminada!`,
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
