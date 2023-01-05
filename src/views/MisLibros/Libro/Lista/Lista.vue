<template>
  <b-overlay
    :show="mostrarCargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
    v-if="$can('read', 'lista')"
  >
    <b-row>
      <b-col
        lg="6"
        md="6"
        sm="6"
        class="my-1"
      >
        <!-- BOTON Titulo -->
        <h6 class="text-primary mb-1 mt-3 ">
        Arrastre un alumno para ordenar la lista.
        </h6>
      </b-col>
      <b-col
        md="6"
        sm="6"
        class="my-1"
      >
        <!-- BOTON Actualizar -->
        <btnSubmit
          class=""
          variant="primary"
          :btnText="btnSubmit"
          @processBtn="submitOption"
        />
      </b-col>
    </b-row>
    <!-- draggable -->
    <draggable
      v-model="list"
      class="list-group list-group-flush cursor-move"
      tag="ul"
    >
      <transition-group
        type="transition"
        name="flip-list"
      >
        <b-list-group-item
          v-for="listItem in list"
          :key="listItem.email"
          tag="li"
        >
            <!-- <b-avatar :text="listItem.name.slice(0,2)" /> -->
          <div class="d-flex">
            <div class="ml-25">
              <b-card-text class="font-weight-bold mb-0">
                {{ listItem.numList }} - {{ listItem.name }}
              </b-card-text>
              <small>{{ listItem.email }}</small>
            </div>
          </div>
        </b-list-group-item>
      </transition-group>
    </draggable>

    <colLinea />

      <!-- v-if="mostrarCargando" -->
    <btnSubmit
      variant="primary"
      :btnText="btnSubmit"
      :modulo="nombre_permiso"
      @processBtn="submitOption"
    />

  </b-overlay>
</template>

<script>
import { BOverlay, BListGroupItem, BCardText, BRow, BCol } from 'bootstrap-vue'
import draggable from 'vuedraggable'

import btnSubmit from '../../../components/Form/btnSubmit.vue'
import colLinea from '../../../components/Form/colLinea.vue'

export default {
  components: {
    BCardText,
    BOverlay,
    draggable,
    BListGroupItem,
    BRow,
    BCol,
    btnSubmit,
    colLinea,
  },
  data() {
    return {
      nombre_permiso: 'lista',
      mostrarCargando: false,
      btnSubmit: 'Actualizar orden de Lista',
      list: [{
          numList: 1,
          name: 'Paz Armijo',
          email: 'girliness@spotlike.co.uk',
        },
        {
          numList: 2,
          name: 'Sunshine Cose',
          email: 'executrixship@equisized.edu',
        },
        {
          numList: 3,
          name: 'Alba Dobbin',
          email: 'bidding@demibob.or',
        },
        {
          numList: 4,
          name: 'Marlin Hinchee',
          email: 'preholding@scuffly.co.uk',
        },
        {
          numList: 5,
          name: 'Leia Atienza',
          email: 'unmeasurableness@interlamellar.co.uk',
        },
        {
          numList: 6,
          name: 'Lashawna Vaudrainm',
          email: 'soaking@khubber.com',
        },
        {
          numList: 7,
          name: 'Liliana Henscheid',
          email: 'lecideine@turndown.org',
        },
        {
          numList: 8,
          name: 'Keven Kolter',
          email: 'nontenure@anglicanum.co.uk',
        },
      ],
    }
  },
  methods: {
    submitOption () {
      console.log('1 :', 1)
    }
  },
}

</script>

<style>
.list-group-item {
  transition: all 1s
}
</style>