<template>
  <b-button-group>
    <b-button
      variant="secondary"
      class="btn-sm btn-icon mr-1 rounded"
      title="Ver PDF"
      @click="$emit('processGoToRead', data.item)"
    >
      <feather-icon
        icon="ArrowUpCircleIcon"
      />
    </b-button>

    <b-button
      variant="secondary"
      class="btn-sm btn-icon mr-1 rounded"
      title="Descargar PDF"
      @click="$emit('processGoToDownload', data.item)"
    >
      <feather-icon
        icon="DownloadIcon"
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
