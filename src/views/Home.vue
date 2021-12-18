<template>
    <v-container fluid>
        <v-row>
            <v-col cols="6">
                <Presentation/>
                <FileSoftwareUsageConfiguration/>
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
import FileSoftwareUsageConfiguration from "@/components/home/FileSoftwareUsageConfiguration";

export default {
    name: 'Home',
    components: {
        FileSoftwareUsageConfiguration,
        FileStorageConfiguration,
        DatabaseConfiguration,
        Presentation,
    }
};
</script>
