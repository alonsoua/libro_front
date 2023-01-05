<template>
  <!-- <b-modal
    :id="idModal"
    :title="title"
    centered
    size="xl"
    :hide-footer="true"
  > -->
    <div class="app-calendar overflow-hidden border">
      <div class="row no-gutters">
        <!-- Sidebar -->
        <div
          class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
          :class="{'show': isCalendarOverlaySidebarActive}"
        >
          <calendar-sidebar
            :is-event-handler-sidebar-active.sync="isEventHandlerSidebarActive"
          />
        </div>

        <!-- Calendar -->
        <div class="col position-relative">
          <div class="card shadow-none border-0 mb-0 rounded-0">
            <div class="card-body pb-0">
              <full-calendar
                ref="refCalendar"
                :options="calendarOptions"
                class="full-calendar"
                initialDate="2022-10-10"
              />
            </div>
          </div>
        </div>

        <!-- Sidebar Overlay -->
        <div
          class="body-content-overlay"
          :class="{'show': isCalendarOverlaySidebarActive}"
          @click="isCalendarOverlaySidebarActive = false"
        />
        <calendar-event-handler
          v-model="isEventHandlerSidebarActive"
          :apoyoEspecializado.sync="apoyoEspecializado"
          :event.sync="event"
          :clear-event-data="clearEventData"
          :idPlanApoyo="idPlanApoyo"
          @remove-event="remove"
          @add-event="addEvent"
          @update-event="updateEvent"
        />
      </div>
    </div>
   <!-- </b-modal> -->
</template>

<script>
// ETIQUETAS
import { BModal, VBModal } from 'bootstrap-vue'

import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

import FullCalendar from '@fullcalendar/vue'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import calendarStoreModule from './calendarStoreModule'
import CalendarSidebar from './calendar-sidebar/CalendarSidebar.vue'
import CalendarEventHandler from './calendar-event-handler/CalendarEventHandler.vue'
import useCalendar from './useCalendar'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    CalendarSidebar,
    CalendarEventHandler,
    VBModal,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [formatos],
  setup() {
    const CALENDAR_APP_STORE_MODULE_NAME = 'calendar'

    // Register module
    if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.unregisterModule(CALENDAR_APP_STORE_MODULE_NAME)
    })

    const {
      refCalendar,
      isCalendarOverlaySidebarActive,
      event,
      clearEventData,
      addEvent,
      updateEvent,
      removeEvent,
      fetchEvents,
      refetchEvents,
      calendarOptions,

      // ----- UI ----- //
      isEventHandlerSidebarActive,
    } = useCalendar()

    fetchEvents()

    return {
      refCalendar,
      isCalendarOverlaySidebarActive,
      event,
      clearEventData,
      addEvent,
      updateEvent,
      removeEvent,
      refetchEvents,
      calendarOptions,

      // ----- UI ----- //
      isEventHandlerSidebarActive,
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    idPlanApoyo: {
      type: Number,
      default: null,
    },
    apoyoEspecializado: {
      type: Array,
      default: Array,
    },
    idModal: {
      type: String,
      required: true,
    },
    planApoyo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    remove(event) {
      const html = this.formatHTMLSweetEliminar('el horario', '')
      this.$swal({
        title: 'Eliminar horario!',
        html,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, elimínalo!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        this.spinner = true
        if (result.value) {
          this.removeEvent(event.id)
        } else {
          this.spinner = false
        }
      })

    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>
