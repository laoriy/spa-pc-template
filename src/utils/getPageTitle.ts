import settings from '@/layout/layout';

const title = settings.title || 'Aqara Admin';

export default function getPageTitle(pageTitle: string | unknown) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}
