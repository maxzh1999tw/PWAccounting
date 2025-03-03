import {
    MenuIcon,
    CircleIcon,
    CircleOffIcon,
    BrandChromeIcon,
    MoodSmileIcon,
    StarIcon,
    AwardIcon,
    WalletIcon,
    ReportMoneyIcon,
    CategoryIcon,
    Settings2Icon,
    SettingsIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: '主要功能' },
    {
        title: '紀錄',
        icon: ReportMoneyIcon,
        to: '/'
    },
    {
        title: '帳戶管理',
        icon: WalletIcon,
        to: '/account'
    },
    {
        title: '記帳類別管理',
        icon: CategoryIcon,
        to: '/recordCategory'
    },
    {
        title: '設定',
        icon: SettingsIcon,
        to: '/setting'
    }
];

export default sidebarItem;
