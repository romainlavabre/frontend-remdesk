<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Nouveau dossier
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="createDirectory()">
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="form.name" label="Nom" autofocus></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-btn type="submit" color="green">
                                Créer
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "CreateDirectory",
    props: ['open'],
    data() {
        return {
            form: {
                name: null,
                parent_id: null
            },
        }
    },
    methods: {
        createDirectory() {
            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/folders", {
                    folder: this.form
                })
                .then(response => {
                    this.$root.$emit(this.$event.FOLDER_CREATED);
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Dossier créé",
                        type: 'success'
                    });
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                });
        }
    },
    mounted() {
        this.$root.$on(this.$event.FOLDER_SELECTED, (folder) => {
            this.form.parent_id = folder != null ? folder.id : null;
        });
    },
    watch: {
        'open': function (open) {
            this.form.name = null;

            if (!open) {
                this.$root.$emit(this.$event.FOLDER_CREATION_ABORTED);
            }
        }
    },
    beforeDestroy() {
        this.$root.$off(this.$event.FOLDER_SELECTED);
    }
}
</script>

<style scoped>

</style>
