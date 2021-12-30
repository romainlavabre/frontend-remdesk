<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Stockage de fichier
                </v-card-title>
                <v-card-actions class="red--text" v-if="!configured">
                    <v-icon color="red">mdi-alert</v-icon>
                    {{ $message.FILE_ACCESS_NOT_ALLOWED }}
                </v-card-actions>
                <v-card-actions class="green--text" v-if="configured">
                    <v-icon color="green">mdi-check-circle</v-icon>
                    {{ $message.ACCESS_ALLOWED }}
                </v-card-actions>
                <v-card-text>
                    <v-form @submit.prevent="send()">
                        <v-select v-model="form.provider" label="Fournisseur"
                                  :items="[{text: 'AWS', value: 'aws'},{text: 'OVH', value: 'ovh'}]"></v-select>
                        <!-- AWS FORM -->
                        <v-row v-if="form.provider === 'aws'">
                            <v-col cols="6">
                                <v-text-field v-model="form.compartment" label="Compartiment"></v-text-field>
                                <v-text-field v-model="form.zone" label="Zone"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="form.client_id" type="password"
                                              label="Identifiant (client id)"></v-text-field>
                                <v-text-field v-model="form.client_secret" type="password"
                                              label="Secret (client secret)"></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- OVH FORM-->
                        <v-row v-if="form.provider === 'ovh'" class="orange--text">
                            <v-icon color="orange">mdi-alert</v-icon>
                            Nous sommes en train de développer le driver pour ce fournisseur
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="text-right">
                                <v-btn type="submit" color="green" v-if="!configured">
                                    Configurer
                                </v-btn>
                                <v-btn type="submit" color="orange" v-if="configured">
                                    Mettre à jour
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "FileStorageConfiguration",
    data() {
        return {
            configured: this.$storage.access.fileSet,
            form: {
                provider: null,
                compartment: null,
                zone: null,
                client_id: null,
                client_secret: null
            }
        }
    },
    methods: {
        send() {
            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/configuration/storage", {
                    storage: this.form
                })
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Stockage configuré",
                        type: 'success'
                    });

                    this.$storage.access.fileSet = true;
                    this.configured = true;
                    this.form = {
                        provider: null,
                        compartment: null,
                        zone: null,
                        client_id: null,
                        client_secret: null
                    };
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                })
        }
    },
    mounted() {
        this.$root.$on(this.$event.INITIAL_DATA_CHANGED, () => {
            this.configured = this.$storage.access.fileSet;
        });
    }
}
</script>

<style scoped>

</style>
