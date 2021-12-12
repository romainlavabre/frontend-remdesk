<template>
    <v-card>
        <v-card-title>
            Nouvel carte
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="send()">
                <v-text-field v-model="form.name" label="Nom"></v-text-field>

                <v-btn type="submit" color="green">
                    Créer
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "CreateCard",
    data: () => ({
        form: {
            name: null
        }
    }),
    methods: {
        send() {
            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/cards", {
                    card: this.form
                })
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Carte créé",
                        type: 'success'
                    });

                    this.$root.$emit(this.$event.CARD_CREATED);
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                })
        }
    }
}
</script>

<style scoped>

</style>
