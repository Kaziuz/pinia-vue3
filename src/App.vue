<template>
  <main>

    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>{{ name }}</h1>
    </header>

    <!-- New task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="loading">
      Loading tasks ...
    </div>

    <div v-else>
      <!-- Task list -->
      <div class="task-list" v-if="filter === 'all'">
        <p>You have: {{ totalCount }} tasks left to do.</p>
        <div
          v-for="task in tasks"
          :key="task.id"
        >
          <!-- <p>{{ task.title }}</p> -->
          <TaskDetails :task="task"/>
        </div>
      </div>
  
      <!-- Favorite Task list -->
      <div class="task-list" v-if="filter === 'favs'">
        <p>You have: {{ favCount }} tasks in your favs list.</p>
        <div
          v-for="task in favs"
          :key="task.id"
        >
          <TaskDetails :task="task"/>
        </div>
      </div>
    </div>

    <button @click="taskStore.$reset">
      Reset
    </button>

  </main>
</template>

<script setup>
import TaskDetails from '@/components/TaskDetails.vue'
import TaskForm from '@/components/TaskForm.vue'

import { useTaskStore } from '@/stores/TaskStore'
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const taskStore = useTaskStore()

// Create a refs from store, no reactive properties, only read
const { tasks, name, loading, favs, favCount, totalCount } = storeToRefs(taskStore)

//  Fetch tasks
taskStore.getTasks()

const filter = ref('all')
</script>