import LoginForm from './loginForm';
import RegisterForm from './registerForm';

const Home = () => {
    return <>{1 ? <LoginForm /> : <RegisterForm />}</>;
};

export default Home;
