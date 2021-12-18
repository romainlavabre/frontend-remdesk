<template>
    <v-card class="mx-auto my-12 text-center selectable pa-0 mt-0" max-width="300"
            @contextmenu.prevent="rightClick($event)">
        <span @click="selectedFolder()">
        <v-card-text class="text-h5 text-capitalize" v-if="!action.rename">
            <table>
                <td style="vertical-align: middle">
                    <v-icon size="50" color="grey" class="mb-2 mr-2">mdi-folder</v-icon>
                </td>
                <td style="vertical-align: middle">
                    {{ folder.name }}
                </td>
            </table>
        </v-card-text>
        </span>
        <v-card-text class="text-h6 text-capitalize" v-if="action.rename">
            <v-form @submit.prevent="updateName()">
                <v-text-field label="Nom" v-model="folder.name" autofocus></v-text-field>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Folder",
    props: ['folder'],
    data() {
        return {
            action: {
                rename: false
            }
        }
    },
    methods: {
        updateName() {
            this.$http
                .patch(process.env.VUE_APP_BACKEND_URL + "/guest/folders/" + this.folder.id + "/name", {
                    folder: this.folder
                })
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Dossier renommé",
                        type: 'success'
                    });
                    this.action.rename = false;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                })
        },
        rightClick(event) {
            this.$root.$emit(this.$event.RIGHT_CLICK, {
                event: event,
                items: [
                    {
                        name: "Renommer le dossier",
                        icon: "mdi-pencil",
                        executable: () => {
                            this.action.rename = true;
                        }
                    },
                    {
                        name: "Supprimer le dossier",
                        icon: "mdi-delete",
                        executable: () => {
                            this.$root.$emit(this.$event.ACTION_REMOVE_FOLDER, this.folder);
                        }
                    }
                ]
            });
        },
        selectedFolder() {
            this.$root.$emit(this.$event.FOLDER_SELECTED, this.folder);
        }
    }
}
</script>

<style scoped>

</style>
