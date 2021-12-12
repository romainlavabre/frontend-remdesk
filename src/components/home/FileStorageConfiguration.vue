<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Stockage de fichier
                </v-card-title>
                <v-card-actions class="red--text" v-if="!configured">
                    <v-icon color="red">mdi-alert</v-icon>
                    {{ $message.FILE_ACCESS_NOT_ALLOWED }}
                </v-card-actions>
                <v-card-actions class="green--text" v-if="configured">
                    <v-icon color="green">mdi-check-circle</v-icon>
                    {{ $message.ACCESS_ALLOWED }}
                </v-card-actions>
                <v-card-text>
                    <v-form>
                        <v-select v-model="form.provider" label="Fournisseur"
                                  :items="[{text: 'AWS', value: 'aws'},{text: 'OVH', value: 'ovh'}]"></v-select>
                        <!-- AWS FORM -->
                        <v-row v-if="form.provider === 'aws'">
                            <v-col cols="6">
                                <v-text-field label="Compartiment"></v-text-field>
                                <v-text-field label="Zone"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field type="password" label="Identifiant (client id)"></v-text-field>
                                <v-text-field type="password" label="Secret (client secret)"></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- OVH FORM-->
                        <v-row v-if="form.provider === 'ovh'">
                            <v-col cols="6">
                                <v-text-field label="TENANT ID"></v-text-field>
                                <v-text-field label="ZONE"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field type="password" label="Nom d'utilisateur (username)"></v-text-field>
                                <v-text-field type="password" label="Mot de passe (password)"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "FileStorageConfiguration",
    data() {
        return {
            configured: this.$storage.access.fileSet,
            form: {
                provider: null
            },
            message: {
                fileAccessNotAllowed: "Configurez les accès aux stockage de fichier"
            }
        }
    },
    mounted() {
        this.$root.$on(this.$event.INITIAL_DATA_CHANGED, () => {
            this.configured = this.$storage.access.fileSet;
        });
    }
}
</script>

<style scoped>

</style>
