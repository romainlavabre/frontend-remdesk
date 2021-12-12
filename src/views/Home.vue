<template>
    <v-container fluid>
        <Loading v-if="!contextLoaded"></Loading>
        <v-row v-if="contextLoaded">
            <v-col cols="6">
                <Presentation/>
            </v-col>
            <v-col cols="6">
                <DatabaseConfiguration/>
                <FileStorageConfiguration/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Presentation from '../components/home/Presentation.vue';
import DatabaseConfiguration from "@/components/home/DatabaseConfiguration";
import FileStorageConfiguration from "@/components/home/FileStorageConfiguration";
import Loading from "@/components/util/Loading";

export default {
    name: 'Home',
    data() {
        return {
            contextLoaded: false
        }
    },
    components: {
        Loading,
        FileStorageConfiguration,
        DatabaseConfiguration,
        Presentation,
    },
    methods: {
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
        }
    },
    mounted() {
        this.loadInitialData();
    }
};
</script>
