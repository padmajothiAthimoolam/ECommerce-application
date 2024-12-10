import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useUserStore = create((set, get)=> ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({name, email, password, confirmPassword}) => {
        set ({ loading : true });

        if(password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");   
        }
        try {
            const res = await axios.post("auth/signup", {name, email, password});
            console.log("res", res);
            set({ user: res.data, loading: false });
            toast.success("Signed up Successfullt");
        } catch (error) {
            set({ loading: false});
            toast.error(error.response.data.message || "An error occured");
        }

    },
    login: async (email, password) => {
        set ({ loading : true });

        try {
            const res = await axios.post("auth/login", {email, password});
            console.log("res", res);
            set({ user: res.data, loading: false });
            toast.success("Logged in successfully")
        } catch (error) {
            set({ loading: false});
            toast.error(error.response.data.message || "An error occured");
        }

    },
    logout: async () => {
       try {
        await axios.post("auth/logout");
        set({ user: null});
        toast.success("Logged out successfully")
       } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred during logout");
       }
    },
    checkAuth: async() => {
        set({ checkingAuth: true })
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false});
        } catch(error) {
            set({checkingAuth: false, user: null });
        }
    },
}));