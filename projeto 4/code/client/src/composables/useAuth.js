import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia'

export const useAuth = () => {
    const router = useRouter();
    const authStore = useAuthStore();

    // Use storeToRefs para manter a reatividade
    const { user, isLoggedIn } = storeToRefs(authStore);

    const updateUser = (userData) => {
        authStore.updateUser(userData);
    };

    const login = (userData) => {
        authStore.login(userData);
        router.push('/profile');
    };

    const logout = () => {
        authStore.logout();
        router.push('/');
    };

    const savedLocalStorage = () => {
        authStore.checkAuth();
    };

    return {
        user,
        isLoggedIn,
        logout,
        savedLocalStorage,
        login,
        updateUser
    };
};