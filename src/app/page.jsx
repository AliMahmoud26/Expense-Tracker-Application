import Image from "next/image";
import Logo from "../../public/logo_5.png";
import HeaderImage from "../../public/header_3.webp";
import Link from "next/link";
// import "./globals.css";

export default function Home() {
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
              <form className="flex flex-col mt-[1.5rem] text-[#222]">
                <div className="email-input">
                  <label htmlFor="UserEmail" className="text-cyan-800 text-[0.875rem] font-bold">Email Address</label><br />
                  <input type="email" name="Email" id="UserEmail" placeholder="Enter Your Email Address" className="flex mt-[0.25rem] border-1 border-gray-400 py-[0.5rem] pl-[0.75rem] outline-[0] rounded-sm text-[0.875rem] w-100" />
                </div>
                <div className="password-input my-[0.875rem]">
                  <label htmlFor="UserPassword" className="text-cyan-800 text-[0.875rem] font-bold">Password</label><br />
                  <input type="password" name="Password" id="UserPassword" placeholder="Enter Your Password" className="text-left mt-[0.25rem] border-1 border-gray-400 py-[0.75rem] pl-[0.75rem] outline-[0] rounded-sm text-[0.875rem] w-100" />
                </div>
                <div className="remember-me flex items-center gap-[0.25rem]">
                  <input type="checkbox" name="remember-me" id="remember-me" />
                  <label htmlFor="remember-me" className="text-[.875rem]">Remember Me</label>
                </div>
              </form>
                <button className="mt-[1rem] bg-cyan-800 text-white py-[0.5rem] px-[6rem] w-100 duration-500 ease-in-out hover:bg-cyan-600 cursor-pointer"><Link href="/dashboard">Login</Link></button>
                <p className="mt-[1rem] text-[0.875rem]">Don't have an account? <Link href="/signup"><span className="text-cyan-600 underline">SignUp</span></Link></p>
            </div>
          </nav>
        </section>
        <section className="section-2 w-[50%] mt-[5rem] ml-[4rem]">
          <Image src={HeaderImage} width={600} height={800}></Image>
        </section>
      </main>
    </>
  );
}
