export default {
    FILE_ACCESS_NOT_ALLOWED: "Configurez les accès au stockage de fichier",
    DATABASE_ACCESS_NOT_ALLOWED: "Configurez les accès à la base de données",
    ACCESS_ALLOWED: "Accès configurés",
    backendMessages: {
        DATABASE_CONFIGURATION_NO_CONNECTION_ESTABLISHED: "Impossible d'établir une connexion à la base de données",
        DATABASE_CONFIGURATION_SOFTWARE_REQUIRED: "Serveur requis",
        DATABASE_CONFIGURATION_HOST_REQUIRED: "IP requise",
        DATABASE_CONFIGURATION_USERNAME_REQUIRED: "Nom d'utilisateur requis",
        DATABASE_CONFIGURATION_PORT_REQUIRED: "Port requis",
        STORAGE_CONFIGURATION_ZONE_REQUIRED: "Zone requise",
        STORAGE_CONFIGURATION_COMPARTMENT_REQUIRED: "Compartiment requis",
        STORAGE_CONFIGURATION_CLIENT_SECRET_REQUIRED: "Secret requis",
        STORAGE_CONFIGURATION_CLIENT_ID_REQUIRED: "Identifiant requis",
        CARD_NAME_REQUIRED: "Nom requis",
        CARD_NAME_TOO_LONG: "Nom trop long (255 caractère maximum)",
        CREDENTIAL_NAME_REQUIRED: "Nom requis",
        CREDENTIAL_NAME_TOO_LONG: "Nom trop long (255 caractère maximum)",
        CREDENTIAL_USERNAME_REQUIRED: "Nom d'utilisateur / identifiant requis",
        CREDENTIAL_USERNAME_TOO_LONG: "Nom d'utilisateur / identifiant trop long",
        CREDENTIAL_PASSWORD_REQUIRED: "Mot de passe / secret requis",
        CREDENTIAL_CARD_REQUIRED: "Carte requise"
    },
    select: function (error) {
        for (const key in this.backendMessages) {
            if (key === error) {
                return this.backendMessages[key];
            }
        }

        return "Erreur inconnue";
    }
}
