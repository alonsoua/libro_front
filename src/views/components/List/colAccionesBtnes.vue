<template>
  <b-button-group>

    <!-- v-if="$can('create', modulo)" -->
    <template
      v-if="clone && $can('create', modulo)"
    >
      <b-button
        v-if="modalClone"
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-modal="modalClone"
        variant="primary"
        class="btn-sm btn-icon mr-25"
        title="Duplicar"
      >
        <feather-icon
          icon="CopyIcon"
        />
      </b-button>
      <b-button
        v-else
        variant="primary"
        class="btn-sm btn-icon mr-25"
        title="Duplicar"
        @click="$emit('processGoToClone', data.item)"
      >
        <feather-icon
          icon="Edit3Icon"
        />
      </b-button>
    </template>

    <!-- EDITAR en MODAL -->
    <!-- v-if="$can('update', modulo)" -->
    <template
      v-if="$can('update', modulo)"
    >
      <b-button
        v-if="modal !== 'false'"
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-modal="modal"
        variant="success"
        class="btn-sm btn-icon mr-25"
        :title="'Editar'"
      >
        <feather-icon
          icon="Edit3Icon"
        />
      </b-button>

      <b-button
        v-else
        variant="success"
        class="btn-sm btn-icon mr-25"
        :title="'Editar'"
        @click="$emit('processGoToUpdate', data.item)"
      >
        <feather-icon
          icon="Edit3Icon"
        />
      </b-button>
    </template>

    <!-- ELIMINAR -->
    <b-button
      v-if="$can('delete', modulo)"
      variant="danger"
      class="btn-sm btn-icon"
      @click="!estado ? '' : $emit('processRemove', data.item.id)"
      :title="!estado ? moduloCreado + ': ' + cantidad : 'Eliminar' "
      :disabled="!estado"
    >
      <feather-icon
        icon="Trash2Icon"
      />
    </b-button>

  </b-button-group>
</template>

<script>
import {
  BButton, BButtonGroup, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BButtonGroup,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    modulo: {
      type: String,
      required: false,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    cantidad: {
      type: Number,
      default: 0,
    },
    modal: {
      type: String,
      default: 'false',
    },
    clone: {
      type: String,
      default: '',
    },
    modalClone: {
      type: String,
      default: 'false',
    },
  },
  data() {
    return {
      moduloCreado: '',
    }
  },
  mounted() {
    // switch (this.modulo) {
    //   case 'ubicaciones':
    //     this.moduloCreado = 'producto(s)'
    //     break

    //   case 'categorias':
    //     this.moduloCreado = 'producto(s)'
    //     break

    //   case 'clientes':
    //     this.moduloCreado = 'salidas'
    //     break

    //   default:
    //     break
    // }
  },
}
</script>
