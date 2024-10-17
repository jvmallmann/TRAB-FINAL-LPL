<!-- src/components/EventCalendar.vue -->
<template>
    <q-card flat bordered class="calendar">
      <q-card-section class="calendar-header">
        <div class="text-h5">{{ monthName }}</div>
        <div class="text-body1">{{ year }}</div>
      </q-card-section>
      <q-card-section class="calendar-content">
        <div class="calendar-grid">
          <div class="calendar-day" v-for="(day, index) in daysOfWeek" :key="index">
            {{ day }}
          </div>
          <div
            v-for="(date, index) in monthDays"
            :key="index"
            class="calendar-date"
            :class="{ 'has-event': hasEvent(date) }"
            @click="selectDate(date)"
          >
            <div>{{ date.getDate() }}</div>
            <ul v-if="hasEvent(date)">
              <li v-for="event in getEvents(date)" :key="event.id">{{ event.description }}</li>
            </ul>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script>
  export default {
    name: 'EventCalendar', // Nome alterado para seguir a regra ESLint
    props: {
      events: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentDate: new Date(),
        daysOfWeek: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      };
    },
    computed: {
      monthName() {
        const months = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[this.currentDate.getMonth()];
      },
      year() {
        return this.currentDate.getFullYear();
      },
      monthDays() {
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const days = [];
  
        for (let i = 0; i < firstDay.getDay(); i++) {
          days.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), i - firstDay.getDay() + 1));
        }
  
        for (let i = 1; i <= lastDay.getDate(); i++) {
          days.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i));
        }
  
        const nextMonthDays = 7 - (days.length % 7);
        for (let i = 1; i <= nextMonthDays; i++) {
          days.push(new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, i));
        }
  
        return days;
      }
    },
    methods: {
      hasEvent(date) {
        return this.events.some(event => event.date.toDateString() === date.toDateString());
      },
      getEvents(date) {
        return this.events.filter(event => event.date.toDateString() === date.toDateString());
      },
      selectDate(date) {
        console.log('Data selecionada:', date);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilização do calendário */
  .calendar {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 16px;
  }
  
  .calendar-content {
    display: grid;
    grid-template-rows: auto;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    padding: 16px;
  }
  
  .calendar-day {
    text-align: center;
    font-weight: bold;
  }
  
  .calendar-date {
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }
  
  .calendar-date.has-event {
    background-color: #e0ffe0;
    border: 1px solid #0f0;
  }
  </style>
  