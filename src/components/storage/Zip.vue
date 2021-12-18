<template>

</template>

<script>
export default {
    name: "Zip",
    methods: {
        download(folder) {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/folders/" + folder.id + "/to_zip", {
                    responseType: "arraybuffer"
                })
                .then(response => {
                    let blob = new Blob([response.data], {type: "application/zip"});
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = folder.name;
                    link.click();
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de télécharger l'archive",
                        type: 'error'
                    })
                });
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_ZIP_FOLDER, (folder) => {
            this.download(folder);
        })
    }
}
</script>

<style scoped>

</style>
