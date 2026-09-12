import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const userInfo = ref<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  const login = async (email: string, _password: string) => {
    isLoggedIn.value = true;
    userInfo.value = {
      name: email.split('@')[0],
      email,
      avatar: ''
    };
  };

  const logout = () => {
    isLoggedIn.value = false;
    userInfo.value = null;
  };

  return {
    isLoggedIn,
    userInfo,
    login,
    logout
  };
});