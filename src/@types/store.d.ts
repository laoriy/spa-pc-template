export declare namespace StoreLib {
    type deviceType = 'desktop' | 'mobile';

    interface Sidebar {
        opened: boolean;
        withoutAnimation: boolean;
    }

    interface AppState {
        sidebar: Sidebar;
        device: deviceType;
    }

    interface SettingsState {
        [key: string]: any;
        title: string;
        fixedHeader: boolean;
        showSidebarLogo: boolean;
        sidebarLogoURL: string;
        isRedirectToHome: boolean;
        clickableBreadcrumb: boolean;
        isSetHomeBreadcrumb: boolean;
    }

    interface UserState {
        token: string;
        name: string;
        avatar: string;
        menus: any[];
        operatorList: any[];
    }
    interface Path {
        path: string;
    }
    interface AccessState {
        routes: Path[];
        addRoutes: Path[];
    }

    interface CountState {
        count: number;
    }

    interface AppGetters {
        // getters
        app: AppState;
        settings: SettingsState;
        user: UserState;
        permission: AccessState;
    }
    interface State {
        // state
        app: AppState;
        settings: SettingsState;
        user: UserState;
        permission: AccessState;
    }
}
