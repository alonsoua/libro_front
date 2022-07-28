<template>
  <div>
    <b-badge
      button
      :variant="data.item.estado == 'Activo'
        ? 'light-success'
        : 'light-secondary'"
      @click="$emit('processUpdateEstado', data.item)"
    >
      {{ data.item.estado }}
    </b-badge>

  </div>
</template>

<script>
import { BBadge } from 'bootstrap-vue'

export default {
  components: {
    BBadge,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
