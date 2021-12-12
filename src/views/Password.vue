<template>
    <v-container fluid>
        <v-row>
            <v-col cols="6">
                <CreateCard/>
            </v-col>
            <v-col cols="6">
                <CreateCredential/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <ListCards/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import CreateCard from "@/components/password/CreateCard";
import ListCards from "@/components/password/ListCards";
import CreateCredential from "@/components/password/credentials/CreateCredential";

export default {
    components: {CreateCredential, ListCards, CreateCard}
}
</script>
