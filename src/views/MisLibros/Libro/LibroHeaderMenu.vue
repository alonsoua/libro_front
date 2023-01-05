<template>
  <div>

    <b-card
      aria-hidden="true"
      style="margin-bottom: 12px; "

    >
      <!-- Menu Info: Input Fields -->
        <!-- v-for="itemsTabs" -->
      <b-tabs
        style="margin: -10px -10px -26px -10px!important;"
        v-model="tabIndex"
        justified
        pills
        class="success"
      >
        <!-- Tab: Lista -->
        <!-- <b-tab lazy :disabled="true"> -->
        <b-tab
          lazy
          v-for="i in itemsTabs"
          :key="'tab-' + i.id"
          :title="i.title"
          :active="i.active"
          v-if="$can('read', i.modulo)"
        >
          <!-- :disabled="" -->
            <!-- v-if="!$can('read', i.modulo)" -->
          <template
            #title
          >
            <feather-icon
              :icon="i.icon"
              size="18"
              class="mr-0 mr-sm-50"
            />
            <span
              class="d-none d-sm-inline"
            >
              {{i.title}}
            </span
            >
          </template>

        </b-tab>
      </b-tabs>
    </b-card>

    <template
      v-for="(item, index) in itemsTabs"
    >
      <div v-show="item.modulo === 'lista' && item.can">
        <b-card
          v-if="tabIndex === index"
          aria-hidden="false"
        >
          <lista/>
        </b-card>
      </div>
      <div v-show="item.modulo === 'notas' && item.can">
        <b-card
          v-if="tabIndex === index"
          aria-hidden="false"
        >
          <notas/>
        </b-card>
      </div>
      <div v-show="item.modulo === 'asistencias' && item.can">
        <b-card
          v-if="tabIndex === index"
          aria-hidden="false"
        >
          <asistencias/>
        </b-card>
      </div>
      <div v-show="item.modulo === 'pie' && item.can">
        <b-card
          v-if="tabIndex === index"
          aria-hidden="false"
        >
          <pie/>
        </b-card>
      </div>
      <div v-show="item.modulo === 'anotaciones' && item.can">
        <b-card
          v-if="tabIndex === index"
          aria-hidden="false"
        >
          <anotaciones/>
        </b-card>
      </div>
    </template>

  </div>
</template>
<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BTab, BTabs,
  BCard
} from 'bootstrap-vue'

// Componentes //
import colLinea from '../../components/Form/colLinea.vue'
import lista from './Lista/Lista.vue'
import notas from './Notas/Notas.vue'
import pie from './Pie/Pie.vue'
import asistencias from './Asistencias/Asistencias.vue'
import anotaciones from './Anotaciones/Anotaciones.vue'

// import libroMenuAsistencia from './LibroMenuAsistencia.vue'

export default {
  components: {
    // Etiquetas
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    BCard,
    BTab,
    BTabs,

    // Components
    colLinea,
    lista,
    notas,
    pie,
    asistencias,
    anotaciones,
  },
  data() {
    return {
      tabIndex: null,
      itemsTabs: [],
      items: [
        {
          id: 1,
          title: 'Lista',
          icon: 'ListIcon',
          active: false,
          modulo: 'lista',
          can: this.$can('read', 'lista')
          // can: true,
        },
        {
          id: 2,
          title: 'Notas',
          icon: 'EditIcon',
          active: false,
          modulo: 'notas',
          can: this.$can('read', 'notas')
          // can: true,
        },
        {
          id: 3,
          title: 'PIE',
          icon: 'FileTextIcon',
          active: false,
          modulo: 'pie',
          can: this.$can('read', 'pie')
          // can: true,
        },
        {
          id: 4,
          title: 'Asistencias',
          icon: 'CheckSquareIcon',
          active: true,
          modulo: 'asistencias',
          can: this.$can('read', 'asistencias')
        },
        {
          id: 5,
          title: 'Anotaciones',
          icon: 'ClipboardIcon',
          active: false,
          modulo: 'anotaciones',
          can: this.$can('read', 'anotaciones')
          // can: true,
        },
      ]
      // required,
    }
  },
  mounted() {
    this.setItemsTabs()
  },
  methods: {
    setItemsTabs() {
      let id = 0
      console.log('this.items :', this.items)
      this.items.forEach(item => {
        if (item.can) {
          this.itemsTabs.push({
            id,
            title: item.title,
            icon: item.icon,
            active: item.active,
            modulo: item.modulo,
            can: item.can,
          })
          id++
        }
      });
    }
  },
}
</script>
