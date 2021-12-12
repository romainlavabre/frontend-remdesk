<template>
    <v-card>
        <v-card-title class="text-capitalize selectable" @dblclick="showForm = true" v-if="!showForm">
            {{ card.name }}
        </v-card-title>
        <v-card-title class="text-capitalize" v-if="showForm">
            <v-row @submit.prevent="updateName()">
                <v-col cols="10">
                    <v-form style="width: 100%">
                        <v-text-field v-model="form.name"></v-text-field>
                    </v-form>
                </v-col>
                <v-col cols="2">
                    <v-btn @click="showForm = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-subtitle>
            <hr>
        </v-card-subtitle>
        <v-card-text>
            <ListCredentials :card="card"/>
        </v-card-text>
    </v-card>
</template>

<script>

import ListCredentials from "@/components/password/credentials/ListCredentials";

export default {
    name: "Card",
    components: {ListCredentials},
    props: ['card'],
    data() {
        return {
            showForm: false,
            form: {
                name: this.card.name
            }
        }
    },
    methods: {
        updateName() {
            this.$http
                .patch(process.env.VUE_APP_BACKEND_URL + "/guest/cards/" + this.card.id + "/name", {
                    card: this.form
                })
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Nom mis à jour",
                        type: 'success'
                    });
                    this.card.name = this.form.name;
                    this.showForm = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                    this.showForm = true;
                })
        }
    }
}
</script>

<style scoped>

</style>
