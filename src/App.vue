<template>
    <v-app>
        <v-main style="background: #333333" class="text-center" v-if="!contextLoaded">
            <img src="@/assets/logo.png" style="margin-top: 1px; height: 50%"/>
            <Loading color="red"/>
        </v-main>
        <v-main v-if="contextLoaded">
            <v-app-bar
                color="blue-grey darken-3">
                <v-col cols="1" @click="redirect('home')">
                    <v-btn icon title="Accueil">
                        <v-icon>mdi-home</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="1" @click="redirect('file')">
                    <v-btn icon>
                        <v-icon>mdi-file</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="1" @click="redirect('password')">
                    <v-btn icon>
                        <v-icon>mdi-lock</v-icon>
                    </v-btn>
                </v-col>
            </v-app-bar>
            <Alert/>
            <RightClick/>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import Alert from "@/components/util/Alert";
import Loading from "@/components/util/Loading";
import RightClick from "@/components/util/RightClick";

export default {
    name: 'App',
    components: {RightClick, Loading, Alert},
    data: () => ({
        booted: false,
        contextLoaded: false
    }),
    methods: {
        redirect(zone) {
            if (zone === 'home') {
                this.$router.push("Home");
                return;
            }

            if (zone === 'file') {
                if (this.$storage.access.fileSet === false) {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.FILE_ACCESS_NOT_ALLOWED + " pour accéder à cet onglet",
                        type: "warning",
                    });

                    if (this.$storage.access.databaseSet === false) {
                        this.$root.$emit(this.$event.SYSTEM_ALERT, {
                            text: this.$message.DATABASE_ACCESS_NOT_ALLOWED + " pour accéder à cet onglet",
                            type: "warning",
                        });
                    }
                    return;
                }

                this.$router.push("Storage");
                return;
            }

            if (zone === 'password') {
                if (this.$storage.access.databaseSet === false) {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.DATABASE_ACCESS_NOT_ALLOWED + " pour accéder à cet onglet",
                        type: "warning",
                    });
                    return;
                }

                this.$router.push("Password");
                return;
            }
        },
        async ping() {
            let rebooted = false;

            while (!rebooted) {
                this.$http
                    .get(process.env.VUE_APP_BACKEND_URL + "/guest/system/ping")
                    .then((response) => {
                        rebooted = true;
                    })
                    .catch((error) => {
                    });

                if (!rebooted) {
                    await this.sleep(1000);
                }
            }

            this.booted = true;
        },
        loadInitialData() {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/configuration/loaded")
                .then(response => {
                    this.$storage.access.databaseSet = response.data.database;
                    this.$storage.access.fileSet = response.data.storage;

                    this.$root.$emit(this.$event.INITIAL_DATA_CHANGED);
                    this.contextLoaded = true;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger les données initiale",
                        type: 'error'
                    });
                });
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    mounted() {
        this.ping();
    },
    watch: {
        booted: function () {
            this.loadInitialData();
        }
    }
}
</script>
