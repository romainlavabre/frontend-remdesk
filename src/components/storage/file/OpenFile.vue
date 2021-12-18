<template>
    <v-dialog v-model="open" v-if="file !== null">
        <v-card>
            <v-card-text v-if="content === null">
                <Loading color="green"/>
            </v-card-text>
            <v-card-text v-if="content !== null" class="text-center">
                <PdfReader :file="file" :content="content" v-if="file.content_type === 'application/pdf'"/>
                <ImageReader :content="content" v-if="file.content_type.match('^image/')"/>
                <VideoReader :content="content" :file="file" v-if="file.content_type.match('^video/')"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import PdfReader from "@/components/storage/file/reader/PdfReader";
import Loading from "@/components/util/Loading";
import ImageReader from "@/components/storage/file/reader/ImageReader";
import VideoReader from "@/components/storage/file/reader/VideoReader";

export default {
    name: "OpenFile",
    components: {VideoReader, ImageReader, Loading, PdfReader},
    data() {
        return {
            open: false,
            file: null,
            content: null,
        }
    },
    methods: {
        getBase64() {
            this.$http
                .get(process.env.VUE_APP_BACKEND_URL + "/guest/files/" + this.file.id + "/base_64")
                .then(response => {
                    this.content = "data:" + this.file.content_type + ";base64," + response.data;
                })
                .catch(error => {
                    this.$root.$emit(this.$event.SYSTEM_ALERT, {
                        text: "Impossible de lire le fichier",
                        type: 'error'
                    })
                });
        }
    },
    mounted() {
        this.$root.$on(this.$event.ACTION_OPEN_FILE, (file) => {
            return;
            this.file = file;
            this.open = true;
        })
    },
    watch: {
        file: function () {
            if (this.file !== null) {
                this.getBase64();
            } else {
                this.content = null;
            }
        },
        open: function () {
            if (!this.open) {
                this.file = null;
            }
        }
    }
}
</script>

<style scoped>

</style>
