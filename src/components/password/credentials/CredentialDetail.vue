<template>
    <div>
        <v-dialog v-model="open" width="2000" v-if="credential != null">
            <v-card>
                <v-card-title>
                    <v-row>
                        <v-col cols="11">
                            {{ credential.name }}
                        </v-col>
                        <v-col cols="1">
                            <v-card-actions class="text-center">
                                <v-btn color="secondary" @click="credential = null;">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="10">
                                        <v-form @submit.prevent="update('name')">
                                            <v-text-field v-model="credential.name" label="Lien"
                                                          @dblclick="updateName = true"
                                                          :readonly="!updateName"></v-text-field>
                                        </v-form>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="10">
                                        <v-form @submit.prevent="update('link')">
                                            <v-text-field v-model="credential.link" label="Lien"
                                                          @dblclick="updateLink = true"
                                                          :readonly="!updateLink"></v-text-field>
                                        </v-form>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn color="info" @click="copy(credential.link)">
                                            <v-icon>mdi-content-copy</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="10">
                                        <v-form @submit.prevent="update('username')">
                                            <v-text-field v-model="credential.username" label="Identifiant"
                                                          @dblclick="updateUsername = true"
                                                          :readonly="!updateUsername"></v-text-field>
                                        </v-form>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn color="info" @click="copy(credential.username)">
                                            <v-icon>mdi-content-copy</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="10">
                                        <v-form @submit.prevent="update('password')">
                                            <v-text-field v-model="credential.password" label="Secret"
                                                          @dblclick="updatePassword = true"
                                                          :readonly="!updatePassword"></v-text-field>
                                        </v-form>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn color="info" @click="copy(credential.password)">
                                            <v-icon>mdi-content-copy</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "CredentialDetail",
    data() {
        return {
            credential: null,
            open: this.credential != null,
            updateLink: false,
            updateName: false,
            updateUsername: false,
            updatePassword: false
        }
    },
    methods: {
        update(property) {
            this.$http
                .patch(process.env.VUE_APP_BACKEND_URL + "/guest/credentials/" + this.credential.id + "/" + property, {
                    credential: this.credential
                })
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Accès mis à jour",
                        type: 'success'
                    });

                    switch (property) {
                        case 'name':
                            this.updateName = false;
                            break;
                        case 'link':
                            this.updateLink = false;
                            break;
                        case 'username':
                            this.updateUsername = false;
                            break;
                        case 'password':
                            this.updatePassword = false;
                            break;
                    }
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                })
        },
        copy(content) {
            navigator.clipboard.writeText(content);
            this.$root.$emit(this.$event.SYSTEM_ALERT, {
                text: "Copié dans votre press-papier",
                type: 'success'
            });
        }
    },
    mounted() {
        this.$root.$on(this.$event.OPEN_CREDENTIAL, (credential) => {
            console.log(credential)
            this.credential = credential;
            this.open = true;
        });
    },
    watch: {
        open: function () {
            if (!this.open) {
                this.credential = null;

                this.$root.$emit(this.$event.RELOAD_CREDENTIALS);
            }
        }
    }
}
</script>

<style scoped>

</style>
