<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Voulez vous vraiment supprimer ce dossier ?
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-checkbox label="Supprimer tous les fichiers et dossier enfant" prepend-icon="mdi-alert"
                                color="warning" v-model="clearSub"></v-checkbox>
                </v-row>
                <v-row>
                    <v-col cols="6" class="text-right">
                        <v-btn color="warning" @click="deleteDirectory()" class="pa-5">
                            Supprimer
                        </v-btn>
                    </v-col>
                    <v-col cols="6" class="text-left">
                        <v-btn color="secondary" @click="open = false" class="pa-5">
                            Annuler
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DeleteFolder",
    data() {
        return {
            open: false,
            clearSub: false
        }
    },
    methods: {
        deleteDirectory() {
            this.open = false;

            this.$http
                .delete(process.env.VUE_APP_BACKEND_URL + "/guest/folders/" + this.folder.id)
                .then(response => {
                    this.$root.$emit(this.$event.FOLDER_DELETED);
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Dossier supprimé",
                        type: 'success'
                    });
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                    this.open = true;
                });
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_REMOVE_FOLDER, (folder) => {
            this.folder = folder;
            this.open = true;
        });
    },
    watch: {
        open: function () {
            this.clearSub = false;
        }
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_REMOVE_FOLDER);
    }
}
</script>

<style scoped>

</style>
