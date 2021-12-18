<template>
    <v-breadcrumbs :items="parts" large>
        <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
        </template>
        <template v-slot:item="{item}">
            <span class="pa-2 blue--text selectable text-h6 text-capitalize" @click="selectFolder(item.folder)">
                {{ item.text }}
            </span>
        </template>
    </v-breadcrumbs>
</template>

<script>
export default {
    name: "FolderPath",
    data() {
        return {
            folder: null,
            parts: []
        }
    },
    methods: {
        getPath() {
            this.parts = [{
                text: "Racine",
                folder: null
            }];

            if (this.folder === null) {
                return;
            }

            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/folders/parents/" + this.folder.id)
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.parts.push({
                            text: response.data[i].name,
                            folder: response.data[i]
                        })
                    }
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de charger le chemin",
                        type: "warning"
                    });
                })
        },
        selectFolder(folder) {
            this.$root.$emit(this.$event.FOLDER_SELECTED, folder);
        }
    },
    mounted() {
        this.getPath();

        this.$root.$on(this.$event.FOLDER_SELECTED, (folder) => {
            this.folder = folder;
            this.getPath();
        });
    },
    beforeDestroy() {
        this.$root.$off(this.$event.FOLDER_SELECTED);
    }
}
</script>

<style scoped>

</style>
