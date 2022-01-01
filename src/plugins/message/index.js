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
        STORAGE_CONFIGURATION_PRESERVE_NETWORK_LEVEL_REQUIRED: "Niveau de cache requis",
        STORAGE_CONFIGURATION_PRESERVE_NETWORK_LEVEL_INVALID: "Niveau de cache invalide",
        CARD_NAME_REQUIRED: "Nom requis",
        CARD_NAME_TOO_LONG: "Nom trop long (255 caractère maximum)",
        CREDENTIAL_NAME_REQUIRED: "Nom requis",
        CREDENTIAL_NAME_TOO_LONG: "Nom trop long (255 caractère maximum)",
        CREDENTIAL_USERNAME_REQUIRED: "Nom d'utilisateur / identifiant requis",
        CREDENTIAL_USERNAME_TOO_LONG: "Nom d'utilisateur / identifiant trop long",
        CREDENTIAL_PASSWORD_REQUIRED: "Mot de passe / secret requis",
        CREDENTIAL_CARD_REQUIRED: "Carte requise",
        FILE_NAME_REQUIRED: "Nom requis",
        FILE_NAME_TOO_LONG: "Nom trop long",
        FILE_FILE_REQUIRED: "Fichier requis",
        FILE_UNABLE_TO_MOVE: "Impossible de déplacer le fichier",
        FILE_UNABLE_TO_REMOVE: "Impossible de supprimer le fichier",
        FILE_UNABLE_TO_UPLOAD: "Impossible de créer votre fichier",
        FILE_ALREADY_EXISTS: "Ce fichier exists déjà",
        FILE_ENCRYPTED_REQUIRED: "Le fichier doit être crypté coté chez le fournisseur ?"
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
