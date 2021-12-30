<template>
    <v-container fluid @contextmenu.prevent="rightClick($event)" style="min-height: 1000px;">
        <v-row>
            <v-col lg="6" md="6" sm="12" xs="12">
                <CreateCredential/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <ListCards/>
            </v-col>
        </v-row>

        <CreateCard/>
        <RenameCard/>
    </v-container>
</template>
<script>
import CreateCard from "@/components/password/CreateCard";
import ListCards from "@/components/password/ListCards";
import CreateCredential from "@/components/password/credentials/CreateCredential";
import RenameCard from "@/components/password/RenameCard";

export default {
    components: {RenameCard, CreateCredential, ListCards, CreateCard},
    methods: {
        rightClick(event) {
            this.$root.$emit(this.$event.RIGHT_CLICK, {
                event: event,
                items: [
                    {
                        name: "Créer une carte",
                        icon: "mdi-format-list-bulleted",
                        executable: () => {
                            this.$root.$emit(this.$event.ACTION_CREATE_CARD);
                        }
                    }
                ]
            });
        }
    }
}
</script>
