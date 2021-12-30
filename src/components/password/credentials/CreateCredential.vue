<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Nouvel accès dans la carte {{ card.name }}
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="send()">
                    <v-row>
                        <v-col lg="6" md="12" sm="12" xs="12">
                            <v-text-field v-model="form.name" label="Nom" autofocus></v-text-field>
                            <v-text-field v-model="form.link" label="Lien"></v-text-field>
                        </v-col>
                        <v-col lg="6" md="12">
                            <v-text-field type="password" v-model="form.username" label="Identifiant"></v-text-field>
                            <v-text-field type="password" v-model="form.password" label="Secret"></v-text-field>
                        </v-col>
                    </v-row>

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
    name: "CreateCredential",
    data() {
        return {
            open: false,
            card: null,
            form: {
                name: null,
                link: null,
                username: null,
                password: null,
                card_id: null
            }
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

                    this.form = {
                        name: null,
                        link: null,
                        username: null,
                        password: null,
                        card_id: null
                    };
                    this.open = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                    this.open = true;
                });
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_CREATE_CREDENTIAL, (card) => {
            this.card = card;
            this.form.card_id = card.id;
            this.open = true;
        });
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_CREATE_CREDENTIAL);
    }
}
</script>

<style scoped>

</style>
