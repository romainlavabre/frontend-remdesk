<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Voulez vous vraiment supprimer l'accès {{ credential.name }} ?
            </v-card-title>
            <v-card-actions class="justify-space-around">
                <v-btn color="orange" @click="deleteCredential()">
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
    name: "DeleteCredential",
    data() {
        return {
            open: false,
            credential: null
        }
    },
    methods: {
        deleteCredential() {
            this.open = false;

            this.$http
                .delete(process.env.VUE_APP_BACKEND_URL + "/guest/credentials/" + this.credential.id)
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Accès supprimé",
                        type: "success"
                    });

                    this.$root.$emit(this.$event.CREDENTIAL_DELETED);
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
        this.$root.$on(this.$event.ACTION_DELETE_CREDENTIAL, (credential) => {
            this.credential = credential;
            this.open = true;
        });
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_DELETE_CREDENTIAL);
    }
}
</script>

<style scoped>

</style>
