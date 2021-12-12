export default {
    FILE_ACCESS_NOT_ALLOWED: "Configurez les accès au stockage de fichier",
    DATABASE_ACCESS_NOT_ALLOWED: "Configurez les accès à la base de données",
    ACCESS_ALLOWED: "Accès configurés",
    backendMessages: {
        DATABASE_CONFIGURATION_NO_CONNECTION_ESTABLISHED: "Impossible d'établir une connexion à la base de données",
        DATABASE_CONFIGURATION_SOFTWARE_REQUIRED: "Serveur requis",
        DATABASE_CONFIGURATION_HOST_REQUIRED: "IP requise",
        DATABASE_CONFIGURATION_USERNAME_REQUIRED: "Nom d'utilisateur requis",
        DATABASE_CONFIGURATION_PORT_REQUIRED: "Port requis"
    },
    select: function (error) {
        for (const key in this.backendMessages) {
            console.log(key)
            console.log(error)
            if (key === error) {
                return this.backendMessages[key];
            }
        }

        return "Erreur inconnue";
    }
}
