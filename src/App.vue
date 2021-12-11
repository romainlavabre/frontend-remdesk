<template>
    <v-app>
        <v-main>
            <v-app-bar
                color="blue-grey darken-3">
                <v-col cols="1">
                    <v-btn icon color="green" title="Acceuil">
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

export default {
    name: 'App',
    components: {Alert},
    data: () => ({
        //
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
        }
    }
}
</script>
