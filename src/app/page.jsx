'use client';
import Image from "next/image";
import Logo from "../../public/logo_5.png";
import HeaderImage from "../../public/header_3.webp";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie('authToken');
      const savedEmail = localStorage.getItem('authEmail');
      const savedPassword = localStorage.getItem('authPassword');
  
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }

      if (token) {
        router.push('/dashboard');
      } else if (savedEmail && savedPassword) {
        handleAutoLogin(savedEmail, savedPassword);
      } else {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [router])

  // useEffect(() => {
  //   let timeoutId;
  //   if (isLoading) {
  //     timeoutId = setTimeout(() => {
  //       setShowLoading(true);
  //     }, 3000);
  //   } else {
  //     setShowLoading(false);
  //   }

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const validEmail = 'alihelal.eng@yahoo.com';
      const validPassword = 'alihelal123';

      if (rememberMe) {
        localStorage.setItem('authEmail', email);
        localStorage.setItem('authPassword', password);
      } else {
        localStorage.removeItem('authEmail');
        localStorage.removeItem('authPassword');
      }

      if (email === validEmail && password === validPassword) {
        const token = 'sample-token-12345';
        setCookie('authToken', token, { maxAge: 60 * 60 * 24 });
        
        // Wait for both auth and minimum loading time
        await minLoadingTime;
        router.push('/dashboard');
      } else {
        await minLoadingTime;
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      await minLoadingTime;
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Optional: Auto-login function
  const handleAutoLogin = async (savedEmail, savedPassword) => {
    try {
      // Replace with your actual validation logic
      const validEmail = 'alihelal.eng@yahoo.com';
      const validPassword = 'alihelal123';

      if (savedEmail === validEmail && savedPassword === validPassword) {
        const token = 'auto-login-token-' + Date.now();
        setCookie('authToken', token, { maxAge: 60 * 60 * 24 });
        router.push('/dashboard');
      } else {
        // Clear invalid saved credentials
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Auto-login failed:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-800"></div>
      </div>
    );
  }

  return (
    <>
      <main className="flex mx-[6rem]">
        <section className="section-1 w-[50%]">
          <div className="logo flex items-center gap-[0.5rem] mt-[2.25rem]">
            <Image src={Logo} alt="Logo" width={40} height={40} />
            <h2 className="font-bold text-xl text-cyan-800">Expense Tracker</h2>
          </div>
          <nav className="nav flex flex-col justify-center items-center mt-[6rem]">
            <div className="login">
              <h1 className="font-bold text-2xl text-cyan-800">Welcome Back Again!</h1>
              <p className="mt-[0.5rem] text-[#777] text-sm leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam corrupti praesentium ipsum nam recusandae, quo, iste distinctio quibusdam reprehenderit molestiae vitae voluptas perferendis molestias eligendi pariatur nisi labore architecto quae.</p>
              <form onSubmit={handleSubmit} className="flex flex-col mt-[1.5rem] text-[#222]">
                <div className="email-input">
                  <label 
                  htmlFor="UserEmail" 
                  className="text-cyan-800 text-[0.875rem] font-bold">Email Address</label><br />
                  <input 
                  type="email" 
                  name="Email" 
                  id="UserEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter Your Email Address" 
                  className="flex mt-[0.25rem] border-1 border-gray-400 py-[0.5rem] pl-[0.75rem] outline-[0] rounded-sm text-[0.875rem] w-100"
                  required />
                </div>
                <div className="password-input my-[0.875rem]">
                  <label 
                  htmlFor="UserPassword" 
                  className="text-cyan-800 text-[0.875rem] font-bold">Password</label><br />
                  <input 
                  type="password" 
                  name="Password" 
                  id="UserPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter Your Password" 
                  className="text-left mt-[0.25rem] border-1 border-gray-400 py-[0.75rem] pl-[0.75rem] outline-[0] rounded-sm text-[0.875rem] w-100"
                  required />
                </div>
                <div className="remember-me flex items-center gap-[0.25rem]">
                  <input 
                  type="checkbox" 
                  name="remember-me" 
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} />
                  <label htmlFor="remember-me" className="text-[.875rem]">Remember Me</label>
                </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button type="submit" className="mt-[1rem] bg-cyan-800 text-white py-[0.5rem] px-[6rem] rounded-sm w-100 duration-500 ease-in-out hover:bg-cyan-600 cursor-pointer">Login</button>
              </form>
              <p className="mt-[1rem] text-[0.875rem]">Don't have an account? <Link href="/signup"><span className="text-cyan-600 underline">SignUp</span></Link></p>
            </div>
          </nav>
        </section>
        <section className="section-2 w-[50%] mt-[5rem] ml-[4rem]">
          <Image src={HeaderImage} width={600} height={800} />
        </section>
      </main>
    </>
  );
}
