<template>
  <div>
    <b-badge
      v-if="data.item.stock <= data.item.tramoDesdeRojo"
      variant="danger"
    >
      {{ data.item.stock }}
    </b-badge>
    <b-badge
      v-if="
        data.item.stock <= data.item.tramoDesdeAmarillo &&
        data.item.stock > data.item.tramoDesdeRojo
      "
      variant="warning"
    >
      {{ data.item.stock }}
    </b-badge>
    <b-badge
      v-if="
        data.item.stock <= data.item.tramoDesdeVerde &&
        data.item.stock > data.item.tramoDesdeAmarillo
      "
      variant="success"
    >
      {{ data.item.stock }}
    </b-badge>
    <b-badge
      v-if="data.item.stock > data.item.tramoDesdeVerde"
      variant="secondary"
    >
      {{ data.item.stock }}
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
  data() {
    return {
      variant: null,
    }
  },
}
</script>
