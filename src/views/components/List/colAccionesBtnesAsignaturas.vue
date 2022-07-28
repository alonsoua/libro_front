<template>
  <b-button-group>
    <b-button
      :variant="variantBtn"
      class="btn-sm btn-icon mr-1 rounded"
      title="Relacionar Ejes"
      @click="$emit('processGoToEjes', data.item)"
    >
      Asignar Ejes
      <!-- <feather-icon
        icon="Edit2Icon"
      /> -->
    </b-button>
<!--
    <b-button
      v-if="$can('delete', modulo)"
      variant="secondary"
      class="btn-sm btn-icon rounded"
      @click="!estado ? '' : $emit('processRemove', data.item.id)"
      :title="!estado ? moduloCreado + ': ' + cantidad : 'Eliminar' "
      :disabled="!estado"
    >
      <feather-icon
        icon="TrashIcon"
      />
    </b-button> -->
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
  computed: {
    variantBtn() {
      return this.data.item.tieneEjes
        ? 'primary'
        : 'success'
    },
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
    }
  },
  mounted() {
  },
}
</script>
