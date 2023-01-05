<template>
  <b-modal
    id="asistencia_dias"
    :title="'Asistencias '+ diaSelected.label"
    centered
    size="xl"
    cancel-title="Cancelar"
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    @close="closeModal()"
    @show="openModal()"
  >

    <!-- :ok-disabled="this.v$.actividad.$errors.length > 0"
    @ok.prevent="submitOption" -->
    <b-overlay
      :show="cargando"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
      v-if="$can('read', 'notas')"
    >
      <b-table
        striped
        small
        hover
        noCollapse
        bordered
        class="mt-0 rounded"

        :fields="fields"
        :items="items"
        foot-clone
      >
        <!-- caption-html="aaa" -->
        <!-- @head-clicked="" -->
        <!-- Cargando -->
        <template #table-busy>
          <div class="text-center text-danger my-1">
            <spinner />
          </div>
        </template>

        <!-- <template #cell(nombre_completo)="data">
          <div class="text-center text-danger my-1">
            aaaaaaaaa
          </div>
        </template> -->

        <template
          #cell()="data"
        >
          <div
            v-if="data.field.key == 'num_lista'"
          >
            {{ data.item.id }}
          </div>

          <div
            v-else-if="data.field.key == 'rut'"
          >
            {{ data.item.rut }}-{{data.item.dv}}
          </div>

          <div
            v-else-if="data.field.key == 'nombre_completo'"
          >
            {{ data.item.nombre }} {{ data.item.primer_apellido }} {{ data.item.segundo_apellido }}

          </div>

          <asistencia-alumno-bloque
            v-else-if="data.field.bloque"
            :item.sync="data.item"
            :field.sync="data.field"
            :tipoAsistencia.sync="tipoAsistencia"
            :asistenciasBloques.sync="asistenciasBloques"
          />

        </template>

        <!-- <template #foot(num_lista)="data">
          <span class="">#</span>
        </template>

        <template #foot(rut)="data">
          <span class=""></span>
        </template>

        <template #foot(nombre_completo)="data">
          <span class="text-right">Firma</span>
        </template> -->

        <template #foot(bloque_1)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[0]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(1)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="1"
            :can="hiddenBloques[0]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(1)"
          />
            <!-- @processBtn="addAsistenciasBloqueFirma(1)" -->
        </template>

        <template #foot(bloque_2)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[1]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(2)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="2"
            :can="hiddenBloques[1]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(2)"
          />
        </template>

        <template #foot(bloque_3)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[2]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(3)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="3"
            :can="hiddenBloques[2]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(3)"
          />
        </template>

        <template #foot(bloque_4)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[3]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(4)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="4"
            :can="hiddenBloques[3]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(4)"
          />
        </template>

        <template #foot(bloque_5)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[4]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(5)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="5"
            :can="hiddenBloques[4]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(5)"
          />
        </template>

        <template #foot(bloque_6)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[5]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(6)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="6"
            :can="hiddenBloques[5]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(6)"
          />
        </template>

        <template #foot(bloque_7)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[6]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(7)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="7"
            :can="hiddenBloques[6]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(7)"
          />
        </template>

        <template #foot(bloque_8)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[7]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(8)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="8"
            :can="hiddenBloques[7]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(8)"
          />
        </template>

        <template #foot(bloque_9)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[8]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(9)"
          />
          <btn-guardar-firmar
            class="mt-50"
            :idModal="9"
            :can="hiddenBloques[8]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Firmar y guardar'"
            :text="'Ingrese su firma digital'"
            @processBtn="addAsistenciasBloque(9)"
          />
        </template>

        <template #foot(bloque_10)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[9]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(10)"
          />
        </template>

        <template #foot(bloque_11)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[10]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(11)"
          />
        </template>

        <template #foot(bloque_12)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[11]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(12)"
          />
        </template>

        <template #foot(bloque_13)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[12]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(13)"
          />
        </template>

        <template #foot(bloque_14)="data">
          <btn-guardar-sin-firmar
            :can="hiddenBloques[13]['nombre_asignatura'] !== 'undefined'"
            :btnText="'Guardar sin firmar'"
            @processBtn="addAsistenciasBloque(14)"
          />
        </template>
      </b-table>
    </b-overlay>
  </b-modal>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BButtonGroup, BAvatar, BOverlay, BCard, BTab, BTabs,
  BFormRadioGroup, BTable, BCardText, BModal, VBModal,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import store from '@/store/index'

import { mapGetters, mapActions } from 'vuex'

// COMPONENTES RECICLADOS
import spinner from '../../../../components/spinner.vue'

// COMPONENTES HIJOS
import AsistenciaAlumnoBloque from './components/AsistenciaAlumnoBloque.vue'
import btnGuardarSinFirmar from './components/btnGuardarSinFirmar.vue'
import btnGuardarFirmar from './components/btnGuardarFirmar.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BButtonGroup,
    BFormRadioGroup,
    BAvatar,
    BOverlay,
    BCard,
    BTab,
    BTabs,
    BTable,
    BCardText,
    BModal,
    VBModal,

    // COMPONENTES RECICLADOS
    spinner,
    AsistenciaAlumnoBloque,
    btnGuardarSinFirmar,
    btnGuardarFirmar,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      cargando: false,

      items: [],

      tipoAsistencia: [],

      asistenciasBloques: [],

      hiddenBloques: [],
      fields: [],

      fieldsTabla: [
        {
          key: 'num_lista',
          label: '#',
          // sortable: true,
          variant: 'primary',
          thStyle: {
            width: '5px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'rut',
          label: 'Rut',
          // sortable: true,
          thStyle: {
            width: '50px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
        {
          key: 'nombre_completo',
          label: 'Nombre',
          // sortable: true,
          thStyle: {
            width: '200px !important',
            display: 'table-cell',
            'vertical-align': 'middle',
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getAsistencias: 'asistencias/getAsistencias',
      getTipoAsistencia: 'asistencias/getTipoAsistencia',
      getLibroSelected: 'libros/getLibroSelected',
    }),
  },
  watch: {
    getAsistencias(val) {
      this.items = []
      this.items = val
      // this.cargarAsistenciasBloques(val)
      this.asistenciasBloques = []
      this.asistenciasBloques = val

      this.hiddenBloques = []
      this.hiddenBloques = val[0]['bloques']

      this.cargarFieldsBloques(val[0]['bloques'])
    },
    diaSelected(val) {
      console.log('1 :', 1)
      this.cargarAsistencias(this.getLibroSelected.id)
    },
    getTipoAsistencia(val) {
      this.tipoAsistencia = val
    },
  },
  props: {
    diaSelected: {
      type: Object,
      required: false,
      default: null,
    },
    mesSelected: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    // this.cargarAsistencias(this.getLibroSelected.id)
    // this.pushFirmas(this.getLibroSelected.id)
    // this.cargarFieldsBloques(this.getLibroSelected.id)
    this.cargarTipoAsistencia()
  },
  methods: {
    ...mapActions({
      fetchBloques: 'bloques/fetchBloques',
      fetchAsistencias: 'asistencias/fetchAsistencias',
      fetchTipoAsistencia: 'asistencias/fetchTipoAsistencia',

      addAsistencia: 'asistencias/addAsistencia',
    }),
    cargarTipoAsistencia() {
      this.fetchTipoAsistencia().then(() => {})
    },
    pushFirmas(bloques) {
      let bloquesFirma = []
      bloques.forEach(bloque => {
        bloquesFirma.push({
          firma: true,
          id: 0,
        })
      })
      this.items.push({
        id: null,
        nombre: null,
        primer_apellido: null,
        segundo_apellido: null,
        bloques: bloquesFirma,
      })
    },
    cargarFieldsBloques(bloques) {
      this.fields = []
      this.fieldsTabla.forEach(field => {
        this.fields.push(field)
      })

      bloques.forEach((bloque, index) => {
        const num = index + 1
        const nombreBloque = 'Bloque '+bloque.Bloque
        const horaBloque = bloque.hora_inicio+' - '+bloque.hora_termino
        this.fields.push(
          {
            key: 'bloque_'+num,
            label: nombreBloque+' '+horaBloque,
            tdClass: 'text-center',
            // variant: bloque.isWeek ? 'secondary' : '',
            bloque: true,
            nombreBloque: nombreBloque,
            horaBloque: horaBloque,
            id_bloque: bloque.id,
            tipoAsistencia: bloque.id_tipo_asistencia,
            tipo: bloque.tipo,
            thStyle: {
              'text-align': 'center',
              width: '5px !important',
              display: 'table-cell',
              'vertical-align': 'middle',
            },
          },
        )
      })
    },
    cargarAsistencias(id_curso) {
      // const fecha = this.fechaActual()
      const fecha = '2022-'+ this.mesSelected +'-'+ this.diaSelected.numeroDia

      const data = {
        id_curso,
        fecha
      }

      this.fetchAsistencias(data).then(() => {})
    },
    fechaActual() {
      const hoy = new Date()
      const dia = hoy.getDate()
      let mes = hoy.getMonth()
      mes = mes + 1
      const year = hoy.getFullYear()

      return year+'-'+mes+'-'+dia
    },
    addAsistenciasBloque(numBloque) {
      const num = numBloque - 1

      let asistenciasBloque = []
      this.asistenciasBloques.forEach(alumno => {
        asistenciasBloque.push({
          id_alumno: alumno.id_persona_rol,
          id_bloque: alumno.bloques[num].id,
          tipo_asistencia: alumno.bloques[num].tipoAsistencia
        })
      });
      const fecha = '2022-'+ this.mesSelected +'-'+ this.diaSelected.numeroDia
      const data = {
        fecha,
        id_curso: this.getLibroSelected.id,
        alumnos: asistenciasBloque
      }

      this.addAsistencia(data).then(() => {
        const statusAsistencia = store.state.asistencias.status
        if (statusAsistencia === 200) {
          // this.fetchActividades(data)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Asistencia guardada 👍',
              icon: 'CheckIcon',
              text: 'La asistencia fue ingresada con éxito!',
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
        }
        else {
          this.$swal({
            title: 'Error!',
            text: store.state.asistencias.message,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
    closeModal() {
      this.initialState()
    },
    openModal() {
      // if (typeof this.diaSelected.dia !== 'undefined') {
      //   this.cargarAsistencias(this.getLibroSelected.id)
      // }
    },
    initialState() {
      this.items = []
      // this.tipoAsistencia = []
      // this.asistenciasBloques = []
      // this.hiddenBloques = []
      // this.fields = []
    },
  },
}
</script>
