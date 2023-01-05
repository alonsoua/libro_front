<template>
  <b-button-group>

    <!-- v-if="$can('update', modulo)" -->
    <b-button
      variant="success"
      class="btn-sm btn-icon"
      title="Editar"
      @click="$emit('processGoToUpdate', data.item)"
    >
      <feather-icon
        icon="Edit2Icon"
      />
    </b-button>

    <!-- v-if="$can('delete', modulo)" -->
    <b-button
      variant="danger"
      class="btn-sm btn-icon"
      @click="!estado ? '' : $emit('processRemove', data.item.id)"
      :title="!estado ? moduloCreado + ': ' + cantidad : 'Eliminar' "
      :disabled="!estado"
    >
      <feather-icon
        icon="TrashIcon"
      />
    </b-button>

  </b-button-group>
</template>

<script>
import {
  BButton, BButtonGroup,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BButtonGroup,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    modulo: {
      type: String,
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    cantidad: {
      type: Number,
      default: 0,
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
