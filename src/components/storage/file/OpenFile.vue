<template>
    <div></div>
</template>

<script>
export default {
    name: "OpenFile",
    methods: {
        open(file) {
            this.$http
                .post(process.env.VUE_APP_BACKEND_URL + "/guest/files/" + file.id + "/open")
                .then(response => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Le fichier va s'ouvrir ...",
                        type: "success",
                        duration: 5000
                    })
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible d'ouvrir le fichier",
                        type: 'error'
                    })
                });
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_OPEN_FILE, (file) => {
            this.open(file);
        })
    },
    beforeDestroy() {
        this.$root.$off(this.$event.ACTION_OPEN_FILE)
    }
}
</script>
