<template>
    <v-row>
        <v-col cols="4" v-for="card in cards">
            <v-card>
                <v-card-title>
                    {{ card.name }}
                </v-card-title>
                <v-card-text>

                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "ListCards",
    data: () => ({
        cards: [],
        cardsLoading: true,
    }),
    methods: {
        getAllCard() {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/cards")
                .then(response => {
                    this.cards = response.data;
                    this.cardsLoading = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger les cartes",
                        type: 'error'
                    })
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
