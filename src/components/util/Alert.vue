<template>
    <div id="alert-container">
        <div v-for="alert in queue">
            <v-alert text :type="alert.type">
                {{ alert.text }}
                <v-btn style="background: none; border: none; box-shadow: none;" @click="close(alert)">
                    <v-icon :color="alert.color">mdi-close</v-icon>
                </v-btn>
            </v-alert>
        </div>
    </div>
</template>

<script>
export default {
    name: "Alert",
    data() {
        return {
            queue: [],
            interval: null
        }
    },
    methods: {
        throwAlert(alert) {
            if (alert.duration === undefined) {
                alert['duration'] = 3000;
            }

            switch (alert.type) {
                case 'success':
                    alert['color'] = 'green';
                    break;
                case 'warning':
                    alert['color'] = 'orange';
                    break;
                case 'error':
                    alert['color'] = 'red';
                    break;
                case 'info':
                    alert['color'] = 'blue';
                    break;
            }

            alert['startAt'] = new Date().getTime();
            alert['id'] = this.generateId(10);

            this.queue.push(alert);
        },
        close(alert) {
            for (let i = 0; i < this.queue.length; i++) {
                if (this.queue[i].id == alert.id) {
                    this.queue.splice(i, 1);
                    break;
                }
            }
        },
        generateId(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }
    },
    mounted() {
        this.$root.$on('SYSTEM_ALERT', (data) => {
            this.throwAlert(data)
        });

        this.interval = window.setInterval(() => {
            let currentTime = new Date().getTime();
            for (let i = 0; i < this.queue.length; i++) {
                if (this.queue[i].startAt + this.queue[i].duration < currentTime) {
                    this.queue.splice(i, 1);
                }
            }
        }, 1001);
    },
    destroyed() {
        window.clearInterval(this.interval);
    }
}
</script>

<style scoped>
#alert-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000 !important;
}
</style>
