<template>
    <div></div>
</template>

<script>
export default {
    name: "Download",
    methods: {
        download(file) {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/files/" + file.id + "/content", {
                    responseType: "arraybuffer"
                })
                .then(response => {
                    let blob = new Blob([response.data], {type: file.content_type});
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = file.name;
                    link.click();
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de télécharger le fichier",
                        type: 'error'
                    })
                });
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_DOWNLOAD_FILE, (file) => {
            this.download(file);
        })
    }
}
</script>

<style scoped>

</style>
