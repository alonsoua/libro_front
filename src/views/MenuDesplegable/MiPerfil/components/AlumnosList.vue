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
          lg="10"
          md="10"
          sm="5"
          class="my-1"
        >
          <!-- FILTRO -->
          <inputFiltro
            :filter.sync="filter"
          />
        </b-col>
        <!-- <b-col
          md="4"
          sm="4"
          class="my-1"
        >
          BOTON CREAR
          <btnCrear
            texto="Alumno"
            modulo="alumnos"
            @processAdd="addAlumno"
          />
        </b-col> -->

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

            <!-- Column: Alumno -->
            <template #cell(nombre)="data">
              <colNombreImg
                :mostrarImg="true"
                :imagen="data.item.insignia"
                :nombre="data.item.nombre"
                :txtMuted="data.item.rbd"
                :nombreModal="null"
              />
            </template>

            <!-- COLUMNA PERIODO -->
            <template #cell(nombrePeriodo)="data">
              <colPeriodo
                modulo="alumnos"
                :data="data.item"
                @processUpdatePeriodo="updatePeriodo"
              />
            </template>

            <!-- COLUMNA ESTADO -->
            <template #cell(estado)="data">
              <colEstado
                :data="data"
                modulo="alumnos"
                @processUpdateEstado="updateEstado"
              />
            </template>

            <!-- Column: Action -->
            <template #cell(acciones)="data">
              <colAccionesBtnes
                modulo="alumnos"
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
      items: [
        {
          numLista: 1,
          nombreCompleto: 'Valentina Victoria Dominguez Rivera',
          rut: '20.289.574-3',
          correo: 'valentina@gmail.com',
          grado: '8vo Básico',
          letra: 'A',
          apoderado: 'Aline Díaz',
          estado: 'Activo',
        }
      ],
      selectedchk: [],
      chkTodo: null,
      checked: null,

      perPage: 100,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      pageOptions: [100, 250, 500],
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
          key: 'numLista',
          label: 'Nº',
          sortable: true,
          thStyle: {
            width: '60px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'nombreCompleto',
          label: 'Nombre Completo',
          sortable: true,
          thStyle: {
            width: '300px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        // {
        //   key: 'rbd',
        //   label: 'RBD',
        //   sortable: true,
        //   thStyle: {
        //     width: '100px !important',
        //     display: 'table-cell',
        //     'vertical-align': 'middle',
        //   },
        // },
        {
          key: 'rut',
          label: 'Rut',
          sortable: false,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'correo',
          label: 'Correo',
          sortable: false,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'grado',
          label: 'Grado',
          sortable: false,
          thStyle: {
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'letra',
          label: 'Letra',
          sortable: false,
          thStyle: {
            width: '100px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'apoderado',
          label: 'Apoderado',
          sortable: false,
          thStyle: {
            width: '250px !important',
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
    // ...mapGetters({ getAlumnos: 'alumnos/getAlumnos' }),
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
    getAlumnos(val) {
      this.totalRows = val.length
      // this.items = []
      // this.items = this.getAlumnos
    },
    chkTodo() {
      this.chkAll()
    },
  },
  mounted() {
    this.cargarAlumnos()
    this.setTableList()
  },
  methods: {
    // ...mapActions({
    //   fetchAlumnos: 'alumnos/fetchAlumnos',
    //   updateAlumnoPeriodo: 'alumnos/updateAlumnoPeriodo',
    //   removeAlumnos: 'alumnos/removeAlumnos',
    // }),
    // ...mapMutations('alumnos', ['setAlumno']),
    setTableList() {
      if (this.$can('update', 'alumnos')
        || this.$can('delete', 'alumnos')
      ) {
        this.fields.push(this.fieldAcciones)
      }
    },
    cargarAlumnos() {
      // this.fetchAlumnos().then(() => {
      //   this.cargando = false
      // })
    },
    addAlumno() {
      this.$router.replace({
        name: 'alumnos-create',
      })
    },
    updatePeriodo(alumno) {
      this.$swal({
        title: 'Actualizar periodo!',
        html: 'Estás seguro que deseas actualizar el periodo activo del'
          + ' alumno<br><span class="font-weight-bolder">'
          + `${alumno.nombre}</span>?`,
        footer: '<div class="text-center text-primary">Al actualizar el'
          + ' periodo activo, se creará un nuevo marco de trabajo para el'
          + ' alumno. No se puede devolver al periodo anterior.</div>',
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
          // this.updateAlumnoPeriodo(alumno).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Periodo activo actualizado!',
          //     html:
          //       'El periodo activo del alumno<br>'
          //       + ' <span class="font-weight-bolder">'
          //       + `${alumno.nombre}</span>`
          //       + '<br>ha sido actualizado con éxito!',
          //     customClass: {
          //       confirmButton: 'btn btn-primary',
          //     },
          //   })
          //   this.spinner = false
          //   this.cargarAlumnos()
          // })
        } else {
          this.spinner = false
          this.cargarAlumnos()
        }
      })
    },
    updateEstado() {
      // console.log('update')
    },
    goToConfig(alumno) {
      this.setAlumno(alumno)
      this.$router.push({
        name: 'alumnos-config',
      })
    },
    goToUpdate(alumno) {
      this.setAlumno(alumno)
      this.$router.push({
        name: 'alumnos-update',
      })
    },
    goToClone(alumno) {
      this.setAlumno(alumno)
      this.$router.push({
        name: 'alumnos-clone',
      })
    },
    remove(alumno) {
      this.$swal({
        title: 'Eliminar alumno!',
        text: `Estás seguro que deseas eliminar el alumno
          "${alumno.nombre}"?`,
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
          // this.removeAlumnos(alumno.id).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Eliminada con éxito!',
          //     text: `"${alumno.nombre}" ha sido eliminada!`,
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
