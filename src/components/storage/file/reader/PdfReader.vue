<template>
    <div>
        <iframe :src="content" :type="file.content_type" height="920px" width="1000px"
                style="border: none !important"/>
    </div>
</template>

<script>
export default {
    name: "PdfReader",
    props: ["file", "content"],
    mounted() {
    }
}
</script>

<style scoped>

</style>
