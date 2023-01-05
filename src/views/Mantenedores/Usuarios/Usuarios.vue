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
            texto="Usuario"
            modulo="usuarios"
            @processAdd="addUsuario"
          />
        </b-col>

        <b-col cols="12">
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

            <!-- Header: Check -->
            <!-- <template #head(colCheck)="data">

              <b-form-checkbox
                :id="data.label"
                v-model="chkTodo"
              />

            </template> -->

            <!-- Column: Check -->
            <!-- <template #cell(colCheck)="data">

              <b-form-checkbox
                :id="`chk-${data.item.id}`"
                v-model="data.item.chkSelected"
              />

            </template> -->
            <!-- Col: RUT -->
            <template #cell(rut)="data">
              {{ formatRut(data.item.rut+''+data.item.dv) }}
            </template>

            <!-- Col: NOMBRE COMPLETO -->
            <template #cell(nombreCompleto)="data">
              {{ data.item.nombre+' '+data.item.primer_apellido+' '+data.item.segundo_apellido }}
              <!-- <col-nombre-img
                :mostrarImg="true"
                :imagen="data.item.imagen"
                :nombre="data.item.nombre+' '+data.item.primer_apellido+' '+data.item.segundo_apellido"
                :txtMuted="formatRut(data.item.rut+''+data.item.dv)"
                :nombreModal="null"
              /> -->
            </template>

            <!-- COLUMNA PERIODO
            <template #cell(nombrePeriodo)="data">
              <colPeriodo
                modulo="usuarios"
                :data="data.item"
                @processUpdatePeriodo="updatePeriodo"
              />
            </template> -->

            <!-- Column: Usuario -->
            <template #cell(establecimiento)="data">
              {{ data.item.nombre_establecimiento }}
            </template>

            <!-- COLUMNA ESTADO --> -->
            <template #cell(estado)="data">
              <colEstado
                :data="data"
                modulo="usuarios"
                @processUpdateEstado="updateEstado"
              />
            </template>

            <!-- Column: Action -->
            <template #cell(acciones)="data">
              <col-acciones-btnes
                modulo="usuarios"
                :data="data"
                @processGoToUpdate="goToUpdate"
                @processRemove="remove(data.item)"
              />
                <!-- @processGoToConfig="goToConfig"
                @processGoToClone="goToClone" -->
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

// MIXINS
import { rut } from '@core/mixins/ui/rut'

// COMPONENTES RECICLADOS
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
  mixins: [rut],
  data() {
    return {
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
          key: 'rut',
          label: 'Rut',
          sortable: true,
          thStyle: {
            width: '80px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'nombreCompleto',
          label: 'Nombre Completo',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },

        {
          key: 'nombre_rol',
          label: 'Cargo',
          sortable: true,
          tdClass: 'text-center',
          thStyle: {
            'text-align': 'center',
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        // {
        //   key: 'ultimaConexion',
        //   label: 'Última Conexión',
        //   sortable: false,
        //   thStyle: {
        //     width: '100px !important',
        //     display: 'table-cell',
        //     'vertical-align': 'middle',
        //   },
        // },

      ],
      fieldAcciones: [
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

      fieldsAdmin: [
        {
          key: 'establecimiento',
          label: 'Establecimiento',
          tdClass: 'text-center',
          thStyle: {
            width: '200px !important',
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
      user: 'auth/user',
      getDirectivos: 'personas/getDirectivos',
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
    // chkTodo() {
    //   this.chkAll()
    // },
  },
  mounted() {
    this.cargarDatosUser()

  },
  methods: {
    ...mapActions({
      fetchDirectivos: 'personas/fetchDirectivos',
      attempt: 'auth/attempt',
    }),
    ...mapMutations('personas', ['setPersona']),
    cargarDatosUser() {
      this.attempt().then(() => {
        if (   this.user.id_rol === 1
            || this.user.id_rol === 5
            || this.user.id_rol === 14
        ) {
          this.fields.push(this.fieldsAdmin)
        }
        this.setTableList()
        this.cargarUsuarios(this.user.id_establecimiento)
      })
    },
    setTableList() {
      if (this.$can('update', 'usuarios')
        || this.$can('delete', 'usuarios')
      ) {
        this.fieldAcciones.forEach(field => {
          this.fields.push(field)
        })
      }
    },
    cargarUsuarios(id_establecimiento) {
      this.fetchDirectivos(id_establecimiento).then(() => {
        this.items = []
        this.items = this.getDirectivos
      })
    },
    addUsuario() {
      this.$router.replace({
        name: 'usuarios-create',
      })
    },
    updatePeriodo(usuario) {
      this.$swal({
        title: 'Actualizar periodo!',
        html: 'Estás seguro que deseas actualizar el periodo activo del'
          + ' usuario<br><span class="font-weight-bolder">'
          + `${usuario.nombre}</span>?`,
        footer: '<div class="text-center text-primary">Al actualizar el'
          + ' periodo activo, se creará un nuevo marco de trabajo para el'
          + ' usuario. No se puede devolver al periodo anterior.</div>',
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
          // this.updateUsuarioPeriodo(usuario).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Periodo activo actualizado!',
          //     html:
          //       'El periodo activo del usuario<br>'
          //       + ' <span class="font-weight-bolder">'
          //       + `${usuario.nombre}</span>`
          //       + '<br>ha sido actualizado con éxito!',
          //     customClass: {
          //       confirmButton: 'btn btn-primary',
          //     },
          //   })
          //   this.spinner = false
          //   this.cargarUsuarios()
          // })
        } else {
          this.spinner = false
          this.cargarUsuarios()
        }
      })
    },
    updateEstado() {
      // console.log('update')
    },
    goToConfig(usuario) {
      this.setPersona(usuario)
      this.$router.push({
        name: 'usuarios-config',
      })
    },
    goToUpdate(usuario) {
      console.log('usuario :', usuario)
      this.setPersona(usuario)
      this.$router.push({
        name: 'usuarios-update',
      })
    },
    remove(usuario) {
      this.$swal({
        title: 'Eliminar usuario!',
        text: `Estás seguro que deseas eliminar el usuario
          "${usuario.nombre}"?`,
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
          // this.removeUsuarios(usuario.id).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Eliminada con éxito!',
          //     text: `"${usuario.nombre}" ha sido eliminada!`,
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
