import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { api } from "../../lib/api";


// Ambil token dari localStorage jika ada (agar sesi tetap hidup saat refresh)
const tokenFromStorage = localStorage.getItem("token") || null;
if(tokenFromStorage){
    api.defaults.headers.common["Authorization"] = `Bearer ${tokenFromStorage}`;
}

// Thunk untuk login user dan menyimpan token ke state + localStorage
export const loginUser = createAsyncThunk(
    "auth/login",
    async({email, password}, { rejectWithValue }) => {
        try{
            const res = await api.post("/auth/login", {email, password});
            const token = res.data?.token; // ini yang akan menjadi payload
            if(!token){
                return rejectWithValue("Token not found");
            }
            return {token};
        }catch(err){
            const msg = err.response?.data?.message || "Login gagal, periksa email/password";
            return rejectWithValue(msg);
        }
    }
)

// Thunk untuk register user baru (default role: user) tanpa auto-login
export const registerUser = createAsyncThunk(
    "auth/register",
    async({name, email, password, address, role = "user"}, { rejectWithValue }) => {
        try{
            const res = await api.post("/auth/register", {name, email, password, address, role}); // kirim data daftar
            return res.data?.data; // kembalikan data user baru (tanpa token)
        }catch(err){
            const msg = err.response?.data?.message || "Register gagal, periksa data Anda";
            return rejectWithValue(msg);
        }
    }
)

// State awal auth
const initialState = {
    token : tokenFromStorage,           // JWT aktif (jika ada)
    isAuthenticated : !!tokenFromStorage, // boolean status login
    loading : false,                    // indikator request in-flight
    errors : null,                      // pesan error login/register
    registerSuccess : false // flag sukses daftar (untuk redirect)
}

// Slice auth: handle login/logout
const authSlice = createSlice({
    name : "auth", // perbaikan typo nama slice
    initialState,
    reducers :{
        // Keluar dari sesi dan bersihkan token
        logout(state){
            state.token = null;
            state.loading = false;
            state.errors = null;
            state.isAuthenticated = false;
            state.registerSuccess = false;
        
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"]
        }
    },
    // Handle state untuk siklus hidup login
    extraReducers : (builder) => {
        builder
        .addCase(loginUser.pending, (state) =>{
            state.loading = true;
            state.errors = null;
            state.isAuthenticated = false;
            state.registerSuccess = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token; //ambil dari loginUser
            state.isAuthenticated = true;
            state.errors = null;
            state.registerSuccess = false;

            localStorage.setItem("token", action.payload.token); // simpan token
            api.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`; // set header default
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.errors = action.payload || "Login gagal, periksa email/password";
            state.registerSuccess = false;
        })
        .addCase(registerUser.pending, (state) =>{
            state.loading = true; // mulai request register
            state.errors = null; // bersihkan error lama
            state.registerSuccess = false;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false; // register sukses
            // Register tidak otomatis login; biarkan isAuthenticated sesuai token
            state.errors = null;
            state.registerSuccess = true; // dipakai untuk redirect ke login
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false; // selesai request
            state.registerSuccess = false;
            state.errors = action.payload || "Register gagal, periksa data Anda"; // simpan error
        })
    }
})

export const {logout} = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
