<template>
    <v-container fluid>
        <v-row>
            <v-col lg="6" md="6" sm="12" xs="12">
                <CreateCard/>
            </v-col>
            <v-col lg="6" md="6" sm="12" xs="12">
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
