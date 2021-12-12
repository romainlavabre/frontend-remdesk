<template>
    <v-container fluid>
        <v-row v-if="credentialsLoading">
            <Loading/>
        </v-row>

        <v-row v-for="credential in credentials" v-if="!credentialsLoading">
            <v-col cols="12" class="text-capitalize selectable" @click="openCredential(credential)">
                {{ credential.name }}
                <hr>
            </v-col>

        </v-row>

        <v-row v-if="!credentialsLoading && credentials.length === 0">
            Aucune donnée
        </v-row>
    </v-container>
</template>

<script>
import Loading from "@/components/util/Loading";
import CredentialDetail from "@/components/password/credentials/CredentialDetail";

export default {
    name: "ListCredentials",
    components: {CredentialDetail, Loading},
    props: ['card'],
    data() {
        return {
            credentialsLoading: true,
            credentials: [],
            detailCredential: null
        }
    },
    methods: {
        getAllCredentialsByCard() {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/credentials/by/card/" + this.card.id)
                .then(response => {
                    this.credentials = response.data;
                    this.credentialsLoading = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger les accès",
                        type: 'error'
                    });
                })
        },
        openCredential(credential) {
            this.$root.$emit(this.$event.OPEN_CREDENTIAL, credential);
        }
    },
    mounted() {
        this.getAllCredentialsByCard();

        this.$root.$on(this.$event.RELOAD_CREDENTIALS, () => this.getAllCredentialsByCard());
        this.$root.$on(this.$event.CREDENTIAL_CREATED, () => this.getAllCredentialsByCard());
    }
}
</script>

<style scoped>

</style>
