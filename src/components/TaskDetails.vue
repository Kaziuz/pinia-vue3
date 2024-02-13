<template>
   <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i
        class="material-icons"
        @click="store.deleteTask(task.id)"
      >
        delete
      </i>
      <i
        class="material-icons"
        :class="{active: task.isFav}"
        @click="store.toogleFav(task.id)"
      >
        favorite
      </i>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/TaskStore'

const store = useTaskStore()

defineProps({
  task: Object
})
</script>