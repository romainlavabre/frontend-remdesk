<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Base de données
                </v-card-title>
                <v-card-actions class="red--text" v-if="$storage.access.databaseSet === false">
                    <v-icon color="red">mdi-alert</v-icon>
                    {{ $message.DATABASE_ACCESS_NOT_ALLOWED }}
                </v-card-actions>
                <v-card-actions class="green--text" v-if="$storage.access.databaseSet === true">
                    <v-icon color="green">mdi-check-circle</v-icon>
                    {{ $message.ACCESS_ALLOWED }}
                </v-card-actions>
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field label="IP du serveur de base de donnée"></v-text-field>
                                <v-text-field label="Port"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field type="password" label="Nom d'utilisateur"></v-text-field>
                                <v-text-field type="password" label="Mot de passe"></v-text-field>
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
    name: "DatabaseConfiguration"
}
</script>

<style scoped>

</style>
