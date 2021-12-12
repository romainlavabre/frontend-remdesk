<template>
    <div>
        <ul id="right-click-menu" tabindex="-1" v-if="viewMenu" ref="right" v-on:blur="closeMenu()"
            :style="'top: ' + top + '; left: ' + left + ';'">
            <li v-for="item in items" class="selectable" @click="item.executable(); closeMenu()">
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script>
// Component source : https://vuejsexamples.com/vue-js-right-click-menu/
export default {
    name: "RightClick",
    data() {
        return {
            viewMenu: false,
            top: '0px',
            left: '0px',
            items: []
        }
    },
    methods: {
        setMenu: function (top, left) {
            let largestHeight = window.innerHeight - this.$refs.right.offsetHeight - 25;
            let largestWidth = window.innerWidth - this.$refs.right.offsetWidth - 25;

            if (top > largestHeight) top = largestHeight;

            if (left > largestWidth) left = largestWidth;

            this.top = top + 'px';
            this.left = left + 'px';
        },
        closeMenu: function () {
            this.viewMenu = false;
            this.items = [];
        },
        openMenu: function (e) {
            this.viewMenu = true;
            process.nextTick(function () {
                this.$refs.right.focus();
                this.setMenu(e.y, e.x)
            }.bind(this));
            e.preventDefault();
        }
    },
    mounted() {
        this.$root.$on(this.$event.RIGHT_CLICK, (data) => {
            for (let i = 0; i < data.items.length; i++) {
                this.items.push(data.items[i]);
            }

            this.openMenu(data.event);
        })
    }
}
</script>

<style scoped>
#right-click-menu {
    background: #333333;
    border: 1px solid #333333;
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
}

#right-click-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
}

#right-click-menu li:last-child {
    border-bottom: none;
}

#right-click-menu li:hover {
    background: #424345;
    color: #dfd8d8;
}
</style>
