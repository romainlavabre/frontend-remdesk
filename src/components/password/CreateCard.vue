<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Nouvel carte
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="send()">
                    <v-text-field v-model="form.name" label="Nom" autofocus></v-text-field>

                    <v-btn type="submit" color="green">
                        Créer
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "CreateCard",
    data() {
        return {
            open: false,
            form: {
                name: null
            }
        }
    },
    methods: {
        send() {
            this.open = false;

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
                    this.form.name = null;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });

                    this.open = true;
                })
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_CREATE_CARD, () => this.open = true);
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_CREATE_CARD);
    }
}
</script>

<style scoped>

</style>
