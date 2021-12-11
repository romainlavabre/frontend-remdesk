<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Base de donnée
                </v-card-title>
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
