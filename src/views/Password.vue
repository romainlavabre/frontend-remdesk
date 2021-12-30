<template>
    <v-container fluid @contextmenu.prevent="rightClick($event)" style="min-height: 1000px;">
        <v-row>
            <v-col cols="12">
                <ListCards/>
            </v-col>
        </v-row>

        <CreateCard/>
        <RenameCard/>
        <DeleteCard/>
        <CreateCredential/>
        <DeleteCredential/>
    </v-container>
</template>
<script>
import CreateCard from "@/components/password/CreateCard";
import ListCards from "@/components/password/ListCards";
import CreateCredential from "@/components/password/credentials/CreateCredential";
import RenameCard from "@/components/password/RenameCard";
import DeleteCredential from "@/components/password/credentials/DeleteCredential";
import DeleteCard from "@/components/password/DeleteCard";

export default {
    components: {DeleteCard, DeleteCredential, RenameCard, CreateCredential, ListCards, CreateCard},
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
