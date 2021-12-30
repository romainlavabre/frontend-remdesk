<template>
    <v-container fluid>
        <v-row v-if="credentialsLoading">
            <Loading/>
        </v-row>

        <v-list style="max-height: 260px" class="overflow-y-auto" v-if="!credentialsLoading">
            <template v-for="credential in credentials">
                <v-list-item :key="credential.id" avatar @click="openCredential(credential)">
                    <v-list-item-icon>
                        <v-icon>mdi-key</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="credential.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>

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
