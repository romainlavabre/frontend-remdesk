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
                <v-card-title>
                    Cache
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="sendPreserveLevel()">
                        <v-row>
                            <v-col class="text-right">
                                <v-select :items="cacheLevel" v-model="form.preserve_network_level"
                                          label="Niveau du cache"></v-select>
                                <v-btn color="green" type="submit">
                                    Enregistrer
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                    Utilisation de {{ sizeToString() }} du disque
                    <v-btn color="orange" class="ml-15" @click="purgeCache()">
                        Purger
                    </v-btn>
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
                client_secret: null,
                preserve_network_level: null
            },
            cacheLevel: [
                {
                    text: "J'ai la fibre ou ADSL et/ou peu d'espace disque",
                    value: 0
                },
                {
                    text: "J'ai un espace disque correct (>=100GO) et/ou la ADSL",
                    value: 1
                },
                {
                    text: "J'ai la 4G et/ou beaucoup d'espace disque et/ou je suis ecolo",
                    value: 2
                }
            ],
            cacheSize: 0
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
        },
        sendPreserveLevel() {
            this.$http
                .patch(process.env.VUE_APP_BACKEND_URL + "/guest/configuration/preserve_network_level", {
                    storage: this.form
                })
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Niveau du cache mis à jour",
                        type: "success"
                    })
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: "error"
                    })
                })
        },
        getCacheLevel() {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/configuration/preserve_network_level")
                .then(response => {
                    this.form.preserve_network_level = response.data.preserve_network_level;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger le niveau de cache",
                        type: "error"
                    })
                });
        },
        getCacheSize() {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/files/cache/metric")
                .then(response => {
                    this.cacheSize = response.data.size;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger l'utilisation disque par le cache",
                        type: "error"
                    })
                });
        },
        purgeCache() {
            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/files/cache/clear")
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Cache purgé",
                        type: "success"
                    });

                    this.getCacheSize();
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: "error"
                    })
                });
        },
        sizeToString() {
            if (this.cacheSize < 1000) {
                return this.cacheSize + " Octets";
            }

            if (this.cacheSize > 1000 && this.cacheSize < 1000000) {
                return Math.round((this.cacheSize / 1000) * 100) / 100 + " Ko";
            }

            if (this.cacheSize > 1000000 && this.cacheSize < 1000000000) {
                return Math.round((this.cacheSize / 1000000) * 100) / 100 + " Mo";
            }

            if (this.cacheSize > 1000000000 && this.cacheSize < 1000000000000) {
                return Math.round((this.cacheSize / 1000000000) * 100) / 100 + " Go";
            }

            if (this.cacheSize > 1000000000000) {
                return Math.round((this.cacheSize / 1000000000000) * 100) / 100 + " To";
            }
        }
    },
    mounted() {
        this.getCacheLevel();
        this.getCacheSize();

        this.$root.$on(this.$event.INITIAL_DATA_CHANGED, () => {
            this.configured = this.$storage.access.fileSet;
        });
    }
}
</script>

<style scoped>

</style>
