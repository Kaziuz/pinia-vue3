import { defineStore } from 'pinia' // this function allows us create a store

// This first argument is an id for the store y that using for view in devtools
// The second argument define things as state, actions, etc
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    // tasks: [
      // { id: 1, title: 'buy some milk', isFav: false },
      // { id: 2, title: 'play Gloomhaven', isFav: true }
    // ],
    tasks: [],
    name: 'Task store from Alex',
    loading: false
  }),
  getters: {
    favs() {
      return this.tasks.filter(t => t.isFav)
    },
    favCount() {
      return this.tasks.reduce((totalTasksFav, task) => {
        return task.isFav ? totalTasksFav + 1 : totalTasksFav
      }, 0)
    },
    // In row function do not can use words this
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    async getTasks() {
      this.loading = true

      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()

      this.tasks = data
      this.loading = false
    },
    async addTask (task) {
      this.tasks.push(task)

      // Save changes at db
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      })

      if (res.error) {
        console.error('Error when save the task', res.error)
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)

      // Save changes (delete) at db
      const res = await fetch('http://localhost:3000/tasks/' + id.toString(), {
        method: 'DELETE',
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    async toogleFav (id) {
      const task = this.tasks.find(t => t.id === id)
      task.isFav = !task.isFav

      // Save changes (update) at db
      const res = await fetch('http://localhost:3000/tasks/' + id.toString(), {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav }),
        headers: {'Content-Type': 'application/json'}
      })

      if (res.error) {
        console.error('Error when save the task', res.error)
      }
    }
  }
})