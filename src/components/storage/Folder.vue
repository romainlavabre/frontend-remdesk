<template>
    <v-card class="mx-auto my-12 text-center selectable" max-width="200" @contextmenu.prevent="rightClick($event)"
            @click="selectedFolder()">
        <v-icon size="150" color="info">mdi-folder</v-icon>
        <v-card-text class="text-h6 text-capitalize" v-if="!action.rename">
            {{ folder.name }}
        </v-card-text>
        <v-card-text class="text-h6 text-capitalize" v-if="action.rename">
            <v-form @submit.prevent="updateName()">
                <v-text-field label="Nom" v-model="folder.name"></v-text-field>
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
                        name: "Renommer",
                        icon: "mdi-pencil",
                        executable: () => {
                            this.action.rename = true;
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
