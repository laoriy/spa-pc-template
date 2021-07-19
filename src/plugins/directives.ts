import { App } from 'vue';
import directives from '../directives';

export default function initDirectives(app: App) {
    directives.forEach((directive) => {
        app.directive(directive.name, directive.handler);
    });
}
