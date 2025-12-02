import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../elements/Input/Index";
import { Button } from "../elements/Button";
import { registerUser, selectAuth } from "../../redux/slice/loginSlice";

// Form registrasi user baru, kirim ke backend via Redux thunk
export const FormRegister = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const addressRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors, registerSuccess, isAuthenticated } = useSelector(selectAuth);

    // Submit data daftar ke thunk registerUser
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            address: addressRef.current?.value || "",
            role: "user"
        };
        dispatch(registerUser(payload)); // trigger request register ke backend
    };

    // Jika sudah login, atau register sukses, arahkan ke login
    useEffect(() => {
        if (registerSuccess && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [registerSuccess, isAuthenticated, navigate]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputForm label="Nama" type="text" placeholder="Nama lengkap" name="name" ref={nameRef}/>
            <InputForm label="Email" type="email" placeholder="Enter your email" name="email" ref={emailRef}/>
            <InputForm label="Password" type="password" placeholder="Enter your password" name="password" ref={passwordRef}/>
            <InputForm label="Alamat" type="text" placeholder="Alamat lengkap" name="address" ref={addressRef}/>
            {errors && <p className="text-red-500 text-sm">{errors}</p>}
            <Button variant ="bg-blue-500 w-full" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Register"}
            </Button>
        </form>
    )
}
