<template>
    <v-container fluid @contextmenu.prevent="rightClick($event)">
        <ListFolder/>
        <CreateFolder v-if="action.createDirectory"/>
    </v-container>
</template>

<script>
import ListFolder from "@/components/storage/ListFolder";
import CreateFolder from "@/components/storage/CreateFolder";

export default {
    name: "Storage",
    components: {CreateFolder, ListFolder},
    data() {
        return {
            action: {
                createDirectory: false
            }
        }
    },
    methods: {
        rightClick(event) {
            this.$root.$emit(this.$event.RIGHT_CLICK, {
                event: event,
                items: [
                    {
                        name: "Créer un dossier",
                        icon: "mdi-plus",
                        executable: () => {
                            this.action.createDirectory = true;
                        }
                    }
                ]
            });
        }
    },
    mounted() {
        this.$root.$on(this.$event.FOLDER_CREATED, () => {
            this.action.createDirectory = false;
        });

        this.$root.$on(this.$event.FOLDER_CREATION_ABORTED, () => {
            this.action.createDirectory = false;
        });
    }
}
</script>

<style scoped>

</style>
