<template>
    <v-container fluid @contextmenu.prevent="handler($event)">
        text
    </v-container>
</template>

<script>
export default {
    name: "ListDirectory",
    methods: {
        handler(event) {
            this.$root.$emit(this.$event.RIGHT_CLICK, {
                event: event,
                items: [
                    {
                        name: "Renommer",
                        icon: "mdi-lock",
                        executable: () => {
                            console.log("executed");
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
