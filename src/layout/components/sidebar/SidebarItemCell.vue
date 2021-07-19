<script>
export default {
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
    render(props) {
        const { icon, title } = props;
        const vnodes = [];

        // jsx 语法
        if (icon) {
            vnodes.push(<i class={['iconfont', 'menu-icon', icon]}></i>);
        }

        if (title) {
            vnodes.push(
                <span slot="title" class={icon ? '' : 'single-txt'}>
                    {title}
                </span>
            );
        }

        return vnodes;
    },
};
</script>
