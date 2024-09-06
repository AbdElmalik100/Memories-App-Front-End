import { useGoogleOneTapLogin } from "@react-oauth/google";
import Header from "../components/Header"
import { useDispatch } from "react-redux";
import { googleAuth } from "../store/slices/usersSlice";
import { useNavigate } from "react-router-dom";


function Layout({ children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("UTK")

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            dispatch(googleAuth({ access_token: "", credentials: credentialResponse.credential, navigate }))
        },
        onError: () => {
            console.log('Login Failed');
        },
        disabled: isLoggedIn,
        use_fedcm_for_prompt: true
    });
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
        </>
    )
}

export default Layout