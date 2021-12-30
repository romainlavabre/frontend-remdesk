<template>
    <v-card @contextmenu.prevent="rightClick($event)">
        <v-card-title class="text-capitalize">
            <v-icon class="mr-5">mdi-format-list-bulleted</v-icon>
            {{ card.name }}
        </v-card-title>
        <v-card-subtitle>
            <hr>
        </v-card-subtitle>
        <v-card-text>
            <ListCredentials :card="card"/>
        </v-card-text>
    </v-card>
</template>

<script>

import ListCredentials from "@/components/password/credentials/ListCredentials";

export default {
    name: "Card",
    components: {ListCredentials},
    props: ['card'],
    methods: {
        rightClick(event) {
            this.$root.$emit(this.$event.RIGHT_CLICK, {
                event: event,
                items: [
                    {
                        name: "Renommer la carte",
                        icon: "mdi-pencil",
                        executable: () => {
                            this.$root.$emit(this.$event.ACTION_RENAME_CARD, this.card);
                        }
                    },
                    {
                        name: "Supprimer la carte",
                        icon: "mdi-delete",
                        executable: () => {
                            this.$root.$emit(this.$event.ACTION_DELETE_CARD, this.card);
                        }
                    },
                    {
                        name: "Nouvel accès",
                        icon: "mdi-key",
                        executable: () => {
                            this.$root.$emit(this.$event.ACTION_CREATE_CREDENTIAL, this.card);
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
