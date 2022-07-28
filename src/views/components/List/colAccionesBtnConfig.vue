<template>
  <b-button-group>
    <b-button
      variant="secondary"
      class="btn-sm btn-icon mr-1 rounded"
      title="Configuraciones"
      @click="$emit('processGoToConfig', data.item)"
    >
      <feather-icon
        icon="SettingsIcon"
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
  },
}
</script>
