<template>
  <aside style="white-space: nowrap;" class="ml-0">
    <b-button
      v-if="direccion === 'top'"
      :id="`popover-button-info-${id}`"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="flat-primary"
      class="btn-icon rounded-circle"
      v-b-popover.hover.top="texto"
      :title="titulo"
    >
      <feather-icon
        :icon="icono"
      />
    </b-button>

    <b-button
      v-if="direccion === 'bottom'"
      :id="`popover-button-info-${id}`"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="flat-primary"
      class="btn-icon rounded-circle"
      v-b-popover.hover.bottom="texto"
      :title="titulo"
    >
      <feather-icon
        :icon="icono"
      />
    </b-button>

    <b-button
      v-if="direccion === 'left'"
      :id="`popover-button-info-${id}`"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="flat-primary"
      class="btn-icon rounded-circle"
      v-b-popover.hover.left="texto"
      :title="titulo"
    >
      <feather-icon
        :icon="icono"
      />
    </b-button>

    <b-button
      v-if="direccion === 'right'"
      :id="`popover-button-info-${id}`"
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="flat-primary"
      class="btn-icon rounded-circle"
      v-b-popover.hover.right="texto"
      :title="titulo"
    >
      <feather-icon
        :icon="icono"
      />
    </b-button>

  </aside>
</template>

<script>
import {
  BButton, VBPopover,
  // BPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    // BPopover,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  props: {
    id: {
      type: String,
      default: '0',
    },
    btnVariant: {
      type: String,
      default: 'flat-secundary',
    },
    icono: {
      type: String,
      default: 'InfoIcon',
    },
    popVariant: {
      type: String,
      default: 'info',
    },
    direccion:{
      type: String,
      default: 'top',
    },
    titulo: {
      type: String,
      default: 'Información!',
    },
    texto: {
      type: String,
      required: true,
    },
  },
}
</script>
