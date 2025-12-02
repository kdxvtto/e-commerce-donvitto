import { useRef, useEffect } from "react";
import { InputForm } from "../elements/Input/Index";
import { Button } from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { loginUser, selectAuth } from "../../redux/slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";

// Form login yang mengirim kredensial ke Redux thunk
export const FormLogin = () => {
  // Ref untuk akses nilai input tanpa controlled component
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated , errors } = useSelector(selectAuth);
  const redirectPath = "/";

  // Submit login ke redux thunk
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(loginUser({email, password})) // kirim kredensial ke API via thunk
  };

  // Jika sudah login, arahkan ke halaman home
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, redirectPath, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        ref={emailRef}
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="Enter your password"
        name="password"
        ref={passwordRef}
      />
      {errors && <p className="text-red-500 text-sm mb-2">{errors}</p>}
      <Button variant="bg-blue-500 w-full" type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};
