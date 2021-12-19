<template>
    <v-row>
        <Loading v-if="filesLoading"/>
        <v-col cols="2" class="pa-0" v-for="file in files" :key="file.id" v-if="!filesLoading">
            <File :file="file"/>
        </v-col>
    </v-row>
</template>

<script>
import File from "@/components/storage/file/File";
import Loading from "@/components/util/Loading";

export default {
    name: "ListFile",
    components: {Loading, File},
    data() {
        return {
            folder: null,
            files: [],
            filesLoading: true
        }
    },
    methods: {
        getAllFileByFolder() {
            let path = process.env.VUE_APP_BACKEND_URL + "/guest/files/by/" + (this.folder === null ? 'root' : 'folder/' + this.folder.id);

            this.$http
                .get(path)
                .then(response => {
                    this.files = response.data;
                    this.filesLoading = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger les fichiers",
                        type: 'error'
                    });
                })
        }
    },
    mounted() {
        this.getAllFileByFolder();

        this.$root.$on(this.$event.FILE_CREATED, () => this.getAllFileByFolder());
        this.$root.$on(this.$event.FILE_DELETED, () => this.getAllFileByFolder());
        this.$root.$on(this.$event.FOLDER_SELECTED, (folder) => {
            this.folder = folder;
            this.getAllFileByFolder();
        });
    },
    beforeDestroy() {
        this.$root.$off(this.$event.FILE_CREATED);
        this.$root.$off(this.$event.FILE_DELETED);
        this.$root.$off(this.$event.FOLDER_SELECTED);
    }
}
</script>

<style scoped>

</style>
