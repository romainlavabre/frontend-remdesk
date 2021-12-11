<template>
    <v-app>
        <v-main>
            <v-app-bar
                color="#333345">
                <v-col cols="1">
                    <v-btn icon>
                        <v-icon>mdi-home</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn icon>
                        <v-icon>mdi-file</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn icon>
                        <v-icon>mdi-lock</v-icon>
                    </v-btn>
                </v-col>
            </v-app-bar>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',

    data: () => ({
        //
    }),
}
</script>
