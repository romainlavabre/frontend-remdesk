<template>
    <v-row class="d-flex justify-space-between">
        <v-col lg="4" sm="6" xs="12" v-for="card in cards" :key="card.id">
            <Card :card="card"></Card>
        </v-col>

        <CredentialDetail/>
    </v-row>
</template>

<script>
import Card from "@/components/password/Card";
import CredentialDetail from "@/components/password/credentials/CredentialDetail";

export default {
    name: "ListCards",
    components: {CredentialDetail, Card},
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
                    });
                });
        }
    },
    mounted() {
        this.getAllCard();

        this.$root.$on(this.$event.CARD_CREATED, () => {
            this.getAllCard();
        });
    }
}
</script>

<style scoped>

</style>
