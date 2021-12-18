<template>
    <v-container fluid @contextmenu.prevent="rightClick($event)" style="min-height: 1000px;">
        <FolderPath/>
        <ListFolder/>
        <CreateFolder :open="action.createDirectory === true"/>
        <DeleteFolder/>
        <CreateFile/>
    </v-container>
</template>

<script>
import ListFolder from "@/components/storage/ListFolder";
import CreateFolder from "@/components/storage/CreateFolder";
import FolderPath from "@/components/storage/FolderPath"
import DeleteFolder from "@/components/storage/DeleteFolder";
import CreateFile from "@/components/storage/file/CreateFile";

export default {
    name: "Storage",
    components: {CreateFile, DeleteFolder, FolderPath, CreateFolder, ListFolder},
    data() {
        return {
            action: {
                createDirectory: false
            }
        }
    },
    methods: {
        rightClick(event) {
            this.$root.$emit(this.$event.RIGHT_CLICK, {
                event: event,
                items: [
                    {
                        name: "Créer un dossier",
                        icon: "mdi-folder",
                        executable: () => {
                            this.action.createDirectory = true;
                        }
                    },
                    {
                        name: "Créer un fichier",
                        icon: "mdi-file",
                        executable: () => {
                            this.$root.$emit(this.$event.ACTION_CREATE_FILE);
                        }
                    }
                ]
            });
        }
    },
    mounted() {
        this.$root.$on(this.$event.FOLDER_CREATED, () => {
            this.action.createDirectory = false;
        });

        this.$root.$on(this.$event.FOLDER_CREATION_ABORTED, () => {
            this.action.createDirectory = false;
        });
    }
}
</script>

<style scoped>

</style>
