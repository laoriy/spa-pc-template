<template>
    <div style="padding:30px;">
        <h3>m-1-2-2</h3>
        This is part two of Module One-Two！
        <h2 style="padding:30px 0 10px">
            This is a eventBus example for brother component communication with mitt！
        </h2>
        <mitt1 />
        <mitt2 />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import mitt1 from './Mitt1.vue';
import mitt2 from './Mitt2.vue';

export default defineComponent({
    components: { mitt1, mitt2 },
});
</script>
