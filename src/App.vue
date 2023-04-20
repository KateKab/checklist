<script>
import Task from './components/Task.vue'
import AddTask from './components/AddTask.vue'

export default {
  components: {
    Task,
    AddTask,
  },

  data() {
    return {
      tasks: [
        {
          id: self.crypto.randomUUID(),
          done: false,
          description: "first task",
          deadline: new Date(2024, 8, 15),
        },
      ]
    }
  },
  methods: {
    checkItem(id) {
      let index = this.tasks.indexOf(this.tasks.find(task => task.id === id));
      this.tasks[index].done = this.tasks[index].done ? false : true;
    },
    updateDesc(desc, id) {
      let index = this.tasks.indexOf(this.tasks.find(task => task.id === id));
      this.tasks[index].description = desc;
    },
    updateDate(date, id) {
      let index = this.tasks.indexOf(this.tasks.find(task => task.id === id));
      this.tasks[index].deadline = date;
    },
    delItem(id) {
      let index = this.tasks.indexOf(this.tasks.find(task => task.id === id));
      this.tasks.splice(index, 1);
    },
    addTask(desc, date) {
      let task = {
        id: self.crypto.randomUUID(),
        done: false,
        description: desc,
        deadline: date
      }
      this.tasks.push(task);
    }
  }
}
</script>

<template>
  <header>
    <p>CHECKLIST</p>
  </header>
  <main>
    <Task v-for="task in tasks" :="task" :key="task.id" @update:check-item="checkItem" @update-desc="updateDesc"
      @update-date="updateDate" @del-item="delItem" :class="{ checked: done }">
    </Task>
    <AddTask @save-new-task="addTask"></AddTask>
  </main>
</template>

