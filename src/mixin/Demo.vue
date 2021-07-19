<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    created() {
        this.hello();
    },
    methods: {
        hello() {
            console.log('hello from mixin!');
        },
        ok(): boolean {
            console.log('mixin ok call!');
            return true;
        },
    },
});
</script>
