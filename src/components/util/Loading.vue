<template>
    <v-container class="text-center">
        <v-progress-circular :value="40" :color="color != null ? color : 'orange'" indeterminate></v-progress-circular>
    </v-container>
</template>

<script>
export default {
    name: "Loading",
    props: ["color"]
}
</script>

<style scoped>

</style>
