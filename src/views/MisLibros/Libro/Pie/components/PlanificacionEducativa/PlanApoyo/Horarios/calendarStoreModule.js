import axios from 'axios'
// import axios from '@axios'

export default {
  namespaced: true,
  state: {
    calendarOptions: [
      {
        color: 'success',
        label: 'Todo',
      },
    ],
    selectedCalendars: ['Todo'],
    id_plan_apoyo: null,
    id_persona_rol: null,
  },
  getters: {},
  mutations: {
    SET_SELECTED_EVENTS(state, val) {
      state.selectedCalendars = val
    },
  },
  actions: {
    async fetchEvents({ctx}, id_plan_apoyo) {
      const data = await axios({
        method: 'GET',
        url: `/planapoyohorario/${id_plan_apoyo.id_plan_apoyo}/1`,
      })

      console.log('/planapoyohorario horario GET exito...', data)
      return data
    },
    async addEvent({dispatch}, event) {
      return await axios({
        method: 'POST',
        url: 'planapoyohorario',
        data: {
          dia: event.event.dia,
          hora_inicio: event.event.hora_inicio,
          hora_termino: event.event.hora_termino,
          id_plan_apoyo_persona: event.event.id_plan_apoyo_persona,
        },
      })
    },
    async updateEvent(ctx, { event }) {
      return await axios({
        method: 'PUT',
        url: `planapoyohorario/${event.id}`,
        data: {
          dia: event.dia,
          hora_inicio: event.hora_inicio,
          hora_termino: event.hora_termino,
          id_plan_apoyo_persona: event.id_plan_apoyo_persona,
        },
      })
    },
    async removeEvent(ctx, { id }) {
      const idHorario = parseInt(id)
      return await axios({
        method: 'DELETE',
        url: `/planapoyohorario/${idHorario}`,
      })
    },
  },
}
