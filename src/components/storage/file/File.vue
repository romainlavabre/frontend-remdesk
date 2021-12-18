<template>
    <v-card class="mx-auto my-12 text-center selectable pa-0 mt-0" max-width="300"
            @contextmenu.prevent="rightClick($event)">
        <span>
        <v-card-text class="text-h5 text-capitalize" v-if="!action.rename">
            <table>
                <td style="vertical-align: middle">
                    <v-icon size="50" :color="getIcon().color" class="mb-2 mr-2">{{ getIcon().icon }}</v-icon>
                </td>
                <td style="vertical-align: middle">
                    {{ file.name }}
                </td>
            </table>
        </v-card-text>
        </span>
        <v-card-text class="text-h6 text-capitalize" v-if="action.rename">
            <v-form @submit.prevent="updateName()">
                <v-text-field label="Nom" v-model="file.name" autofocus></v-text-field>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import Loading from "@/components/util/Loading";

export default {
    name: "File",
    components: {Loading},
    props: ['file'],
    data() {
        return {
            action: {
                rename: false
            },
            icons: [
                {
                    icon: "mdi-file-pdf-box",
                    contentTypes: [
                        "application/pdf"
                    ],
                    color: "red"
                },
                {
                    icon: "mdi-file-word-box",
                    regex: "^text/",
                    color: "info"
                },
                {
                    icon: "mdi-image",
                    regex: "^image/",
                    color: "red"
                },
                {
                    icon: "mdi-database-search",
                    contentTypes: [
                        "application/sql",
                        "text/sql",
                        "text/x-sql"
                    ],
                    color: "green"
                },
                {
                    icon: "mdi-code-tags",
                    contentTypes: [
                        'text/css',
                        'text/html',
                        'text/javascript',
                        'text/markdown',
                        'text/xml',
                        'text/xml-external-parsed-entity',
                        'application/x-php',
                        'text/x-java',
                        'x-csharp',
                        'text/x-clojure',
                        'text/x-dockerfile',
                        'text/x-erlang',
                        'text/x-feature',
                        'text/x-go',
                        'text/x-groovy',
                        'text/x-haskell',
                        'message/http',
                        'text/x-kotlin',
                        'text/x-objectivec',
                        'text/x-python',
                        'text/x-ruby',
                        'text/x-scala',
                        'text/x-swift',
                    ],
                    color: "green"
                },
                {
                    icon: "mdi-zip-box",
                    contentTypes: [
                        'application/zip',
                        'application/x-tar',
                        'application/x-rar',
                        'application/x-rar-compressed',
                        'application/x-zip-compressed',
                        "application/octet-stream"
                    ],
                    color: "yellow"
                },
                {
                    icon: "mdi-video-box",
                    regex: "^video/",
                    color: "orange"
                },
                {
                    icon: "mdi-volume-high",
                    regex: "^audio/",
                    color: "secondary"
                },
                {
                    icon: "mdi-application-brackets",
                    regex: "^application/",
                    color: "secondary"
                }
            ]
        }
    },
    methods: {
        updateName() {
            this.action.rename = false;
            this.$http
                .patch(process.env.VUE_APP_BACKEND_URL + "/guest/files/" + this.file.id + "/name", {
                    file: this.file
                })
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Fichier renommé",
                        type: 'success'
                    });
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: this.$message.select(error.response.data.message),
                        type: 'error'
                    });
                    this.action.rename = true;
                })
        },
        getIcon() {

            for (let i = 0; i < this.icons.length; i++) {
                if (this.icons[i].contentTypes === undefined) {
                    continue;
                }

                for (let j = 0; j < this.icons[i].contentTypes.length; j++) {
                    if (this.file.content_type === this.icons[i].contentTypes[j]) {
                        return this.icons[i];
                    }
                }
            }

            for (let i = 0; i < this.icons.length; i++) {
                if (this.icons[i].regex !== undefined) {
                    if (this.file.content_type.match(this.icons[i].regex)) {
                        return this.icons[i];
                    }
                }
            }

            return {
                icon: "mdi-file",
                contentTypes: [],
                color: "#333333"
            };
        },
        rightClick(event) {
            this.$root.$emit(this.$event.RIGHT_CLICK, {
                event: event,
                items: [
                    {
                        name: "Renommer le fichier",
                        icon: "mdi-pencil",
                        executable: () => {
                            this.action.rename = true;
                        }
                    },
                    {
                        name: "Supprimer le fichier",
                        icon: "mdi-delete",
                        executable: () => {
                            this.$root.$emit(this.$event.ACTION_REMOVE_FILE, this.file);
                        }
                    }
                ]
            });
        }
    }
}
</script>

<style scoped>

</style>
