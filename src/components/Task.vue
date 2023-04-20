<script>
export default {

    props: {
        id: String,
        done: Boolean,
        description: String,
        deadline: Date,
    },
    emits: ["update:checkItem", "updateDesc", "updateDate", "delItem"],
    data() {
        return {
            editDateMode: false,
            editDescMode: false,
            newDescription: this.description,
            nowDate: 0,
            nowMonth: 0,
            newDate: this.deadline.getDate(),
            newMonth: this.deadline.getMonth() + 1,
            newYear: this.deadline.getFullYear(),
            years: [],
        }
    },
    methods: {

    },
    computed: {
        newDeadline() {
            return new Date(this.newYear, this.newMonth - 1, this.newDate);
        },
        formattedDeadline() {
            let date = this.deadline.getDate();
            let month = this.deadline.getMonth();
            let year = this.deadline.getFullYear();
            if (date < 10) {
                date = `0${date}`
            }
            if (month < 10) {
                month = `0${month + 1}`
            }
            return `${date}.${month}.${year}`;
        }
    },
    created() {
        let date = new Date();
        for (let i = 0; i <= 6; i++) {
            this.years.push(date.getFullYear() + i)
        }
        this.nowDate = date.getDate();
        this.nowMonth = date.getMonth() + 1;
    },
}

</script>

<template>
    <div class="checklist">
        <input type="checkbox" @click="$emit('update:check-item', this.id)">
        <div class="checklist__description" :class="{ checked: done }">
            <input v-if="editDescMode" v-model.trim="newDescription">
            <p v-else>{{ description }}</p>
            <button v-if="!editDescMode" @click="editDescMode = true" :disabled="done"><font-awesome-icon
                    icon="fa-solid fa-pen-to-square" /></button>
            <button v-else
                @click="$emit('update-desc', this.newDescription, this.id), editDescMode = false"><font-awesome-icon
                    icon="fa-solid fa-floppy-disk" /></button>
        </div>
        <div class="checklist__date" :class="{ checked: done, edit: editDateMode }">
            <template v-if="editDateMode">
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
            <p v-else>{{ formattedDeadline }}</p>
            <button v-if="!editDateMode" @click="editDateMode = true" :disabled="done"><font-awesome-icon
                    icon="fa-solid fa-pen-to-square" /></button>
            <button v-else @click="$emit('update-date', newDeadline, this.id), editDateMode = false"><font-awesome-icon
                    icon="fa-solid fa-floppy-disk" /></button>
        </div>
        <button @click="$emit('delItem', this.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
    </div>
</template>

<style scoped>
.checked {
    color: grey;
    text-decoration: line-through;
}
</style>