<script lang="tsx">
import { defineComponent, VNode } from 'vue';

export default defineComponent({
    name: 'SidebarItemCell',
    props: {
        icon: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const vnodes: VNode[] = [];
        if (props.icon) {
            vnodes.push(<i class={['iconfont', 'menu-icon', props.icon]}></i>);
        }
        if (props.title) {
            vnodes.push(<span class={props.icon ? '' : 'single-txt'}>{props.title}</span>);
        }
        return () => <>{...vnodes}</>;
    },
});
</script>
