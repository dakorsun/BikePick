import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';
import MyAccountPage from './pages/MyAccountPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EmailConfirmationPage from './pages/EmailConfirmationPage';
import {ROLE_USER, ROLE_ADMINISTRATOR} from '../shared/constants/userRoles';
import {setDefaultStaticContent} from "./actions/staticContent";

const loadCommonData = [
    // redux actions
];

const common = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        loadData: [
            ...loadCommonData,
        ],
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
    },
    {
        path: '/registration',
        exact: true,
        component: RegistrationPage,
    },
    {
        path: '/reset_password/:token',
        exact: true,
        component: ResetPasswordPage,
    },
    {
        path: '/confirmation/',
        exact: true,
        component: EmailConfirmationPage,
    },
]

const user = [
    {
        path: '/profile/my-account',
        exact: true,
        component: MyAccountPage,
    },

    {
        component: NotFoundPage,
    },
]
    .map(route => {
        if (!route.loadData) {
            route.loadData = [];
        }
        route.loadData.push(setDefaultStaticContent);
        route.auth = [ROLE_USER];
        return route;
    });

export default [
    ...common,
    ...user
];
