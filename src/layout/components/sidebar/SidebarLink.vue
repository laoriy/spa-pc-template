<template>
    <a v-if="isExternalUrl" :href="to" target="_blank" ref="noopener"><slot /></a>
    <router-link v-else :to="to"><slot /></router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isExternal } from '@/utils/validate';

export default defineComponent({
    computed: {
        isExternalUrl(): boolean {
            return isExternal(this.to);
        },
    },
    name: 'SiderbarLink',
    props: {
        to: {
            type: String,
            required: true,
        },
    },
    methods: {
        linkProps(url: string) {
            if (isExternal(url)) {
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener',
                };
            }
            return {
                is: 'router-link',
                to: url,
            };
        },
    },
});
</script>
