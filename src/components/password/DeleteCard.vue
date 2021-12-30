<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Voulez vous vraiment supprimer la carte {{ card.name }} ? Vous allez perde tous les accès associés
            </v-card-title>
            <v-card-actions class="justify-space-around">
                <v-btn color="orange" @click="deleteCard()">
                    OUI
                </v-btn>
                <v-btn color="secondary" @click="open = false">
                    NON
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DeleteCard",
    data() {
        return {
            open: false,
            card: null
        }
    },
    methods: {
        deleteCard() {
            this.open = false;

            this.$http
                .delete(process.env.VUE_APP_BACKEND_URL + "/guest/cards/" + this.card.id)
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Carte supprimé",
                        type: "success"
                    });

                    this.$root.$emit(this.$event.CARD_DELETED);
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: "error"
                    });
                })
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_DELETE_CARD, (card) => {
            this.card = card;
            this.open = true;
        });
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_DELETE_CARD);
    }
}
</script>

<style scoped>

</style>
