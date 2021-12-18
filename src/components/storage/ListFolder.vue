<template>
    <v-row>
        <Loading v-if="foldersLoading"/>
        <v-col cols="2" v-for="folder in folders" v-if="!foldersLoading">
            <Folder :folder="folder"/>
        </v-col>
    </v-row>
</template>

<script>
import Folder from "@/components/storage/Folder";
import Loading from "@/components/util/Loading";

export default {
    name: "ListFolder",
    components: {Loading, Folder},
    data() {
        return {
            parent: null,
            folders: [],
            foldersLoading: true
        }
    },
    methods: {
        getAllDirectoryByParent() {
            let path = process.env.VUE_APP_BACKEND_URL + "/guest/folders/by/" + (this.parent === null ? 'root' : 'parent/' + this.parent.id);

            this.$http
                .get(path)
                .then(response => {
                    this.folders = response.data;
                    this.foldersLoading = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger les dossiers",
                        type: 'error'
                    });
                })
        }
    },
    mounted() {
        this.getAllDirectoryByParent();

        this.$root.$on(this.$event.FOLDER_CREATED, () => this.getAllDirectoryByParent());
        this.$root.$on(this.$event.FOLDER_SELECTED, (folder) => {
            this.parent = folder;
            this.getAllDirectoryByParent();
        });
    }
}
</script>

<style scoped>

</style>
