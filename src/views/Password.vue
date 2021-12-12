<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <CreateCard/>
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

export default {
    components: {ListCards, CreateCard}
}
</script>
