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
          md="9"
          sm="9"
          class="my-1"
        >
          <!-- FILTRO -->
          <inputFiltro
            :filter.sync="filter"
          />
        </b-col>
        <!--
        <b-col
          md="4"
          sm="4"
          class="my-1"
        >
          <!-- BOTON CREAR -->
          <!-- <btnCrear
            texto="Libro"
            modulo="libros"
            @processAdd="addLibro"
          />
        </b-col>
        -->
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

            <!-- Column: Libro -->
            <!-- <template #cell(tipoEnseñanza)="data">
              <colNombreImg
                :mostrarImg="false"
                :imagen="data.item.insignia"
                :nombre="'1ero Básico '+data.item.letra"
                :txtMuted="'1ero Básico '+data.item.letra"
                :nombreModal="null"
              />
            </template>-->

            <!-- COLUMNA PERIODO -->
            <template #cell(grado)="data">
              1ero Básico {{ data.item.letra }}
              <!-- <colLibro
                modulo="libros"
                :data="data.item"
                @processUpdateLibro="updateLibro"
              /> -->
            </template>

            <!-- COLUMNA ESTADO -->
            <!-- <template #cell(estado)="data">
              <colEstado
                :data="data"
                modulo="libros"
                @processUpdateEstado="updateEstado"
              />
            </template> -->

            <!-- Column: Action -->
            <template #cell(acciones)="data">
              <col-acciones-libro
                modulo="libros"
                :modal="`modal-lg-${data.item.id}`"
                :data="data"
                @processGoToOpen="goToOpen"
              />
              <!--
                @processGoToConfig="goToConfig"
                @processRemove="remove(data.item)"
                @processGoToClone="goToClone"
              -->
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

// ETIQUETAS
import {
  BTable, BRow, BCol, BPagination, BFormCheckbox, BOverlay, BCard,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

// COMPONENTES RECICLADOS
// import colLibro from '../components/List/colLibro.vue'
import btnMostrar from '../components/List/btnMostrar.vue'
import inputFiltro from '../components/List/inputFiltro.vue'
import btnCrear from '../components/List/btnCrear.vue'
import spinner from '../components/spinner.vue'
import colNombreImg from '../components/List/colNombreImg.vue'
import colEstado from '../components/List/colEstado.vue'
import colAccionesLibro from '../components/List/colAccionesLibro.vue'

export default {
  components: {
    BTable,
    BRow,
    BCol,
    BPagination,
    BFormCheckbox,
    BOverlay,
    BCard,

    colAccionesLibro,
    btnCrear,
    inputFiltro,
    btnMostrar,
    // colLibro,
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
      //   tipoEnseñanza: 'Educación Básica',
      //   grado: '1ero Básico A',
      //   estado: 'Activo',
      // }
      ],

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
          key: 'tipoEnseñanza',
          label: 'Tipo Enseñanza',
          sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'grado',
          label: 'Grado',
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
    ...mapState('auth', ['user']),
    ...mapGetters({ getLibros: 'libros/getLibros' }),
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
    getLibros(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getLibros
    },
  },
  mounted() {
    this.cargarLibros()
    this.setTableList()
  },
  methods: {
    ...mapActions({
      fetchLibros: 'libros/fetchLibros',
      updateLibroLibro: 'libros/updateLibro',
      removeLibros: 'libros/removeLibros',
    }),
    ...mapMutations('libros', ['setLibro']),
    setTableList() {
      this.fields.push(this.fieldAcciones)
      // if (this.$can('update', 'libros')
      //   || this.$can('delete', 'libros')
      // ) {
      // }
    },
    cargarLibros() {
      // console.log('this.user :', this.user)
      this.fetchLibros().then(() => {
        this.cargando = false
      })
    },
    addLibro() {
      this.$router.replace({
        name: 'libro',
      })
    },
    goToOpen(libro) {
      this.setLibro(libro)
      this.$router.push({
        name: 'libro',
        params: { id: libro.id },
      })
    },
    updateLibro(libro) {
      this.$swal({
        title: 'Actualizar libro!',
        html: 'Estás seguro que deseas actualizar el libro activo del'
          + ' libro<br><span class="font-weight-bolder">'
          + `${libro.nombre}</span>?`,
        footer: '<div class="text-center text-primary">Al actualizar el'
          + ' libro activo, se creará un nuevo marco de trabajo para el'
          + ' libro. No se puede devolver al libro anterior.</div>',
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
          // this.updateLibroLibro(libro).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Libro activo actualizado!',
          //     html:
          //       'El libro activo del libro<br>'
          //       + ' <span class="font-weight-bolder">'
          //       + `${libro.nombre}</span>`
          //       + '<br>ha sido actualizado con éxito!',
          //     customClass: {
          //       confirmButton: 'btn btn-primary',
          //     },
          //   })
          //   this.spinner = false
          //   this.cargarLibros()
          // })
        } else {
          this.spinner = false
          this.cargarLibros()
        }
      })
    },
    remove(libro) {
      this.$swal({
        title: 'Eliminar libro!',
        text: `Estás seguro que deseas eliminar el libro
          "${libro.nombre}"?`,
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
          // this.removeLibros(libro.id).then(() => {
          //   this.$swal({
          //     icon: 'success',
          //     title: 'Eliminada con éxito!',
          //     text: `"${libro.nombre}" ha sido eliminada!`,
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
