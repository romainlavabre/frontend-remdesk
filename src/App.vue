<template>
    <v-app>
        <v-main style="background: #333333" class="text-center" v-if="!contextLoaded">
            <img src="@/assets/logo.png" style="margin-top: 1px; height: 50%"/>
            <Loading color="red"/>
        </v-main>
        <v-main v-if="contextLoaded">
            <v-app-bar
                color="blue-grey darken-3">
                <v-col cols="1">
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
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import Alert from "@/components/util/Alert";
import Loading from "@/components/util/Loading";

export default {
    name: 'App',
    components: {Loading, Alert},
    data: () => ({
        contextLoaded: false
    }),
    methods: {
        redirect(zone) {
            if (zone === 'file') {
                if (this.$storage.access.fileSet === false) {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.FILE_ACCESS_NOT_ALLOWED + " pour accéder à cet onglet",
                        type: "warning",
                    });
                    return;
                }
            }

            if (zone === 'password') {
                if (this.$storage.access.databaseSet === false) {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.DATABASE_ACCESS_NOT_ALLOWED + " pour accéder à cet onglet",
                        type: "warning",
                    });
                    return;
                }
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

            this.$root.$emit(this.$event.SYSTEM_ALERT, {
                text: "Système démarré avec succès",
                type: 'green'
            });

            this.contextLoaded = true;
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    mounted() {
        this.ping();
    }
}
</script>
