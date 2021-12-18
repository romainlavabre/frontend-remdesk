<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Voulez vous vraiment supprimer ce fichier ?
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="6" class="text-right">
                        <v-btn color="warning" @click="deleteFile()" class="pa-5">
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
    name: "DeleteFile",
    data() {
        return {
            open: false,
            clearSub: false,
            file: null
        }
    },
    methods: {
        deleteFile() {
            this.open = false;

            this.$http
                .delete(process.env.VUE_APP_BACKEND_URL + "/guest/files/" + this.file.id)
                .then(response => {
                    this.$root.$emit(this.$event.FILE_DELETED);
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Fichier supprimé",
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
        this.$root.$on(this.$event.ACTION_REMOVE_FILE, (file) => {
            this.file = file;
            this.open = true;
        });
    }
}
</script>

<style scoped>

</style>
