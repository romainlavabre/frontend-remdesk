<template>
    <v-dialog v-model="open" width="600px">
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="10">
                        Métadonnées
                    </v-col>
                    <v-col cols="2">
                        <v-card-actions>
                            <v-btn color="secondary" @click="open = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-treeview :items="items">
                    <template v-slot:append="{item}">
                        <span v-if="item.id === 1">
                            {{ file.name }}
                        </span>
                        <span v-if="item.id === 2">
                            {{ file.content_type }}
                        </span>
                        <span v-if="item.id === 3">
                            {{ sizeToString() }}
                        </span>
                    </template>
                </v-treeview>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "Metadata",
    data() {
        return {
            file: null,
            open: false,
            items: [
                {
                    id: 1,
                    name: 'Nom'
                },
                {
                    id: 2,
                    name: 'MIME'
                },
                {
                    id: 3,
                    name: 'Taille'
                }
            ]
        }
    },
    methods: {
        sizeToString() {
            if (this.file.size < 1000) {
                return this.file.size + " Octets";
            }

            if (this.file.size > 1000 && this.file.size < 1000000) {
                return Math.round((this.file.size / 1000) * 100) / 100 + " Ko";
            }

            if (this.file.size > 1000000 && this.file.size < 1000000000) {
                return Math.round((this.file.size / 1000000) * 100) / 100 + " Mo";
            }

            if (this.file.size > 1000000000 && this.file.size < 1000000000000) {
                return Math.round((this.file.size / 1000000000) * 100) / 100 + " Go";
            }

            if (this.file.size > 1000000000000) {
                return Math.round((this.file.size / 1000000000000) * 100) / 100 + " To";
            }
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_METADATA_FILE, (file) => {
            this.file = file;
            this.open = true;
        });
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_METADATA_FILE)
    }
}
</script>

<style scoped>

</style>
