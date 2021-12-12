<template>
    <v-card>
        <v-card-title>
            Nouvel accès
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="send()">
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="form.name" label="Nom"></v-text-field>
                        <v-text-field v-model="form.link" label="Lien"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field type="password" v-model="form.username" label="Identifiant"></v-text-field>
                        <v-text-field type="password" v-model="form.password" label="Secret"></v-text-field>
                        <v-autocomplete label="Carte"
                                        :items="cardsAutocomplete"
                                        item-text="text"
                                        item-value="value"
                                        v-model="form.card_id"
                                        :loading="cardsAutocompleteLoading"
                                        :readonly="cardsAutocompleteLoading"></v-autocomplete>
                    </v-col>
                </v-row>

                <v-btn type="submit" color="green">
                    Créer
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "CreateCredential",
    data() {
        return {
            form: {
                name: null,
                link: null,
                username: null,
                password: null,
                card_id: null
            },
            cardsAutocomplete: [],
            cardsAutocompleteLoading: true
        }
    },
    methods: {
        send() {
            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/credentials", {
                    credential: this.form
                })
                .then(response => {
                    this.$root.$emit(this.$event.CREDENTIAL_CREATED);
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Accès créé",
                        type: 'success'
                    });
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                });
        },
        getAllCard() {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/cards")
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        let card = response.data[i];
                        this.cardsAutocomplete.push({text: card.name, value: card.id});
                    }
                    this.cardsAutocompleteLoading = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger les cartes",
                        type: 'error'
                    });
                });
        }
    },
    mounted() {
        this.getAllCard();
    }
}
</script>

<style scoped>

</style>
