import mock from '@/@fake-db/mock'

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
// prettier-ignore
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
// prettier-ignore
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

const data = {
  events: [
    {
      id: 1,
      url: '',
      title: 'Ciencias Naturales',
      start: '2022-08-22 10:15',
      end: '2022-08-22 11:45',
      allDay: false,
      editable: true,
      slotEventOverlap: false,
      selectable: true,
      eventDurationEditable: false,
      eventBackgroundColor: '#378006',
      extendedProps: {
        calendar: 'Mis Bloques',
      },

    },
    {
      id: 2,
      url: '',
      eventDisplay: false,
      title: 'Lenguaje',
      start: '2022-08-22 08:45',
      end: '2022-08-22 10:15',
      allDay: false,
      editable: false,
      extendedProps: {
        calendar: 'Otros Bloques',
      },
    },
    {
      id: 3,
      url: '',
      title: "Ed. Física",
      allDay: false,
      start: '2022-08-23 10:15',
      end: '2022-08-23 11:45',
      editable: false,
      extendedProps: {
        calendar: 'Otros Bloques',
      },
    },
    {
      id: 4,
      url: '',
      title: "Ed. Física",
      start: '2022-08-25 15:30',
      end: '2022-08-25 16:15',
      allDay: false,
      editable: false,
      extendedProps: {
        calendar: 'Otros Bloques',
      },
    },
    {
      id: 5,
      url: '',
      title: 'Ciencias Naturales',
      start: '2022-08-25 12:30',
      end: '2022-08-25 14:45',
      allDay: false,
      editable: true,
      slotEventOverlap: false,
      selectable: true,
      eventDurationEditable: false,
      extendedProps: {
        calendar: 'Mis Bloques',
      },
    },
    {
      id: 6,
      url: '',
      title: 'Ciencias Naturales',
      start: '2022-08-24 12:30',
      end: '2022-08-24 13:15',
      allDay: false,
      editable: false,
      extendedProps: {
        calendar: 'Otros Bloques',
      },
    },
    {
      id: 7,
      url: '',
      title: 'Ciencias Naturales',
      start: '2022-08-24 11:45',
      end: '2022-08-24 12:30',
      allDay: false,
      editable: false,
      extendedProps: {
        calendar: 'Otros Bloques',
      },
    },
    {
      id: 8,
      url: '',
      title: 'Lenguaje',
      start: '2022-08-23 11:45',
      end: '2022-08-23 12:30',
      allDay: false,
      editable: false,
      extendedProps: {
        calendar: 'Otros Bloques',
      },
    },
    {
      id: 9,
      url: '',
      title: 'Lenguaje',
      start: '2022-08-23 12:30',
      end: '2022-08-23 13:15',
      allDay: false,
      extendedProps: {
        calendar: 'Business',
      },
    },
    {
      id: 10,
      url: '',
      title: 'Matemáticas',
      start: '2022-08-22 11:45',
      end: '2022-08-22 12:30',
      allDay: false,
      editable: false,
      extendedProps: {
        calendar: 'Otros Bloques',
      },
    },
  ],
}

// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
mock.onGet('/apps/calendar/events').reply(config => {
  // Get requested calendars as Array
  const calendars = config.params.calendars.split(',')

  return [200, data.events.filter(event => calendars.includes(event.extendedProps.calendar))]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
mock.onPost('/apps/calendar/events').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data)

  const { length } = data.events
  let lastIndex = 0
  if (length) {
    lastIndex = data.events[length - 1].id
  }
  event.id = lastIndex + 1

  data.events.push(event)

  return [201, { event }]
})

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
mock.onPost(/\/apps\/calendar\/events\/\d+/).reply(config => {
  const { event: eventData } = JSON.parse(config.data)

  // Convert Id to number
  eventData.id = Number(eventData.id)

  const event = data.events.find(e => e.id === Number(eventData.id))
  Object.assign(event, eventData)

  return [200, { event }]
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete(/\/apps\/calendar\/events\/\d+/).reply(config => {
  // Get event id from URL
  let eventId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  eventId = Number(eventId)

  const eventIndex = data.events.findIndex(e => e.id === eventId)
  data.events.splice(eventIndex, 1)
  return [200]
})
