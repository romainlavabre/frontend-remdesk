<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                Nouveau fichier
            </v-card-title>
            <v-card-text>
                <Loading v-if="loading"/>
                <v-form v-if="!loading" @submit.prevent="createFile()">
                    <v-row>
                        <v-col cols="12">
                            <v-switch label="Cryptage chez le fournisseur" v-model="form.encrypted"></v-switch>
                            <v-text-field v-model="form.name" label="Nom"></v-text-field>
                            <v-file-input v-model="file" label="Fichier" autofocus></v-file-input>
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
import Loading from "@/components/util/Loading";

export default {
    name: "CreateFile",
    components: {Loading},
    data() {
        return {
            file: null,
            form: {
                name: null,
                encrypted: true,
                folder_id: null
            },
            open: false,
            loading: false
        }
    },
    methods: {
        createFile() {
            this.loading = true;
            let reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = () => {
                let contentType = this.file.type;
                let content = reader.result.replace("data:" + contentType + ";base64,", "");

                this.$http
                    .post(process.env.VUE_APP_BACKEND_URL + "/guest/files", {
                        file: this.form,
                        uploaded_file: {
                            file_file: {
                                "content-type": contentType,
                                content: content
                            }
                        }
                    })
                    .then(response => {
                        this.$root.$emit(this.$event.FILE_CREATED);
                        this.$root.$emit(this.$event.SYSTEM_ALERT, {
                            text: "Fichier créé",
                            type: 'success'
                        });
                        this.loading = false;
                        this.open = false;
                    })
                    .catch(error => {
                        this.$root.$emit(this.$event.SYSTEM_ALERT, {
                            text: this.$message.select(error.response.data.message),
                            type: 'error'
                        });

                        this.loading = false;
                    });
            }
        }
    },
    mounted() {
        this.$root.$on(this.$event.FOLDER_SELECTED, (folder) => {
            this.form.folder_id = folder != null ? folder.id : null;
        });

        this.$root.$on(this.$event.ACTION_CREATE_FILE, () => this.open = true);
    },
    watch: {
        'open': function () {
            this.form.name = null;
            this.file = null;
        },
        file: function () {
            if (this.file !== null && this.form.name === null) {
                this.form.name = this.file.name.split(".")[0];
            }

            if (this.file === null) {
                this.form.name = null;
            }
        }
    },
    beforeDestroy() {
        this.$root.$off(this.$event.FOLDER_SELECTED);
        this.$root.$off(this.$event.ACTION_CREATE_FILE);
    }
}
</script>

<style scoped>

</style>
