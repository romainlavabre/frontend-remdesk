<template>
    <v-container fluid>
        <v-row>
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

export default {
    name: 'Home',

    components: {
        FileStorageConfiguration,
        DatabaseConfiguration,
        Presentation,
    },
};
</script>
