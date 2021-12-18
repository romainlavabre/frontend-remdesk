<template>
    <video controls>

        <source :src="content"
                :type="file.content_type">

        Sorry, your browser doesn't support embedded videos.
    </video>
</template>

<script>
export default {
    name: "VideoReader",
    props: ['content', 'file']
}
</script>

<style scoped>

</style>
