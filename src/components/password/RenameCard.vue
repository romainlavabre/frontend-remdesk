<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Renommer
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="updateName()">
                    <v-text-field v-model="form.name" autofocus></v-text-field>
                    <v-btn type="submit" color="green">
                        Renommer
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "RenameCard",
    data() {
        return {
            open: false,
            card: null,
            form: {
                name: null
            }
        }
    },
    methods: {
        updateName() {
            this.open = false;

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
                    this.form.name = false;
                    this.card = null;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                    this.open = true;
                })
        },
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_RENAME_CARD, (card) => {
            this.card = card;
            this.form.name = card.name;
            this.open = true;
        });
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_RENAME_CARD);
    }
}
</script>

<style scoped>

</style>
