<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Base de données
                </v-card-title>
                <v-card-actions class="red--text" v-if="!configured">
                    <v-icon color="red">mdi-alert</v-icon>
                    {{ $message.DATABASE_ACCESS_NOT_ALLOWED }}
                </v-card-actions>
                <v-card-actions class="green--text" v-if="configured">
                    <v-icon color="green">mdi-check-circle</v-icon>
                    {{ $message.ACCESS_ALLOWED }}
                </v-card-actions>
                <v-card-text>
                    <Loading v-if="formLoading"/>
                    <v-form @submit.prevent="send()" v-if="!formLoading">
                        <v-row>
                            <v-col cols="6">
                                <v-select label="Serveur"
                                          :items="[{text: 'MYSQL', value: 'mysql', selected: true},{text: 'POSTGRESQL', value: 'postgresql'}]"
                                          v-model="form.software"></v-select>
                                <v-text-field v-model="form.host"
                                              label="IP du serveur de base de donnée"></v-text-field>
                                <v-text-field v-model="form.port" label="Port"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="form.username" type="password"
                                              label="Nom d'utilisateur"></v-text-field>
                                <v-text-field v-model="form.password" type="password"
                                              label="Mot de passe"></v-text-field>
                            </v-col>
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
import Loading from "@/components/util/Loading";

export default {
    name: "DatabaseConfiguration",
    components: {Loading},
    data() {
        return {
            configured: this.$storage.access.databaseSet,
            formLoading: false,
            form: {
                software: null,
                host: null,
                port: null,
                username: null,
                password: null
            }
        }
    },
    methods: {
        send() {
            this.formLoading = true;

            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/configuration/database", {
                    database: this.form
                })
                .then((response) => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Base de données configurée",
                        type: 'success'
                    });

                    this.rebootBackend();
                })
                .catch((error) => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'warning'
                    });
                    this.formLoading = false;
                });
        },
        async rebootBackend() {
            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/system/reboot")
                .then((response) => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Veuillez patienter, nous redémarrons le système ...",
                        type: 'info',
                        duration: 5000
                    });
                })
                .catch((error) => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Une erreur s'est produite lors du redémarrage du système, nous vous conseillons de redémarrer Remdesk",
                        type: 'error'
                    });
                });

            let rebooted = false;

            while (!rebooted) {
                await this.sleep(1000);

                this.$http
                    .get(process.env.VUE_APP_BACKEND_URL + "/guest/system/ping")
                    .then((response) => {
                        rebooted = true;
                    })
                    .catch((error) => {
                    });
            }

            this.$root.$emit(this.$event.SYSTEM_ALERT, {
                text: "Système redémarré",
                type: 'green'
            });
            this.formLoading = false;

        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    mounted() {
        this.$root.$on(this.$event.INITIAL_DATA_CHANGED, () => {
            this.configured = this.$storage.access.databaseSet;
        });
    }
}
</script>

<style scoped>

</style>
