<script>
export default {
    emits: ["saveNewTask"],
    data() {
        return {
            addMode: false,
            newDescription: '',
            newDate: new Date().getDate(),
            newMonth: new Date().getMonth() + 1,
            newYear: new Date().getFullYear(),
            years: [],
            wholeDate: 0,
        }
    },
    computed: {

    },
    methods: {
        getWholeDate() {
            this.wholeDate = new Date(this.newYear, this.newMonth - 1, this.newDate);
        }
    },
    created() {
        let date = new Date();
        for (let i = 0; i <= 6; i++) {
            this.years.push(date.getFullYear() + i)
        }
    }
}
</script>

<template>
    <div class="checklist__add-item">
        <input v-if="addMode" v-model="newDescription">
        <template v-if="addMode">
            <select v-model="newDate">
                <option v-for="date in 31">{{ date }}</option>
            </select>
            <select v-model="newMonth">
                <option v-for="month in 12">{{ month }}</option>
            </select>
            <select v-model="newYear">
                <option v-for="year in years">{{ year }}</option>
            </select>
        </template>
        <div class="add-buttons">
            <button v-if="!addMode" @click="addMode = true"><font-awesome-icon icon="fa-solid fa-plus" /></button>
            <button v-else
                @click="getWholeDate(), $emit('save-new-task', newDescription, wholeDate), addMode = false"><font-awesome-icon
                    icon="fa-solid fa-floppy-disk" /></button>
        </div>
    </div>
</template>
