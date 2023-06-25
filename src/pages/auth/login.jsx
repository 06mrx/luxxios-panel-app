import Head from 'next/head'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { storageService } from '@/services/storage.service'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from 'react'
import Image from 'next/image'
import img1 from '../../../public/assets/images/landing1.png'
import icon from '../../../public/favicon/ms-icon-310x310.png'
export default function Home() {
  const router = useRouter();
  const formData = {
    password: useRef(),
    email: useRef()
  }
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState();
  let userString = storageService.get('user')

  if (userString) {
    let user = JSON.parse(userString)
    if (storageService.checkRole(user.role_id) == 'Administrator') {
      router.push('/administrator')
    } else if (storageService.checkRole(user.role_id) === 'Guru') {
      router.push('/teacher');
    } else if (storageService.checkRole(user.role_id) === 'Kepala Sekolah') {
      router.push('/principal');
    } else if (storageService.checkRole(user.role_id) === 'Kepala Bidang') {
      router.push('/headsection');
    } else if (storageService.checkRole(user.role_id) === 'Publik') {
      router.push('/public');
    } else if (storageService.checkRole(user.role_id) === 'Kepala DInas') {
      router.push('/headoffice');
    } else if (storageService.checkRole(user.role_id) === 'Operator Tiket') {
      router.push('/ticketoperator');
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.API + '/sanctum/csrf-cookie', {
      method: 'get'
    }).then((res) => res).then((data) => {
      fetch(process.env.API + '/api/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.current.value,
          password: formData.password.current.value
        })
      }).then((res) => res.json()).then((data) => {
        if (data.success) {
          storageService.add('user', JSON.stringify(data.data))
          let role = storageService.checkRole(data.data?.role_id)
          if (role == 'Administrator') {
            router.push('/administrator');
          } else if (role === 'Guru') {
            router.push('/teacher');
          } else if (role === 'Kepala Sekolah') {
            router.push('/principal');
          } else if (role === 'Kepala Bidang') {
            router.push('/head-section');
          } else if (role === 'Publik') {
            router.push('/public');
          } else if (role === 'Kepala Dinas') {
            router.push('/head-office');
          } else if (role === 'Operator Tiket') {
            router.push('/ticketoperator');
          }
        } else {
          setErrors(data.data);
          console.log(data.data);
          toast.error('Login Failed', {
            position: 'top-center'
          })
        }
      })
    })

  }
  return (
    <>
      <Head>
        <title>{process.env.APP_NAME}</title>
        <meta name="description" content={process.env.APP_DESC} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/android-icon-36x36.png" />
      </Head>
      <main>
        <ToastContainer />
        <div className="relative min-h-screen flex ">
          <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
            <div
              className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)"
              }}
            >
              <div className="absolute bg-gradient-to-b from-yellow-600 to-yellow-300 opacity-75 inset-0 z-0" />
              <div className="w-full  max-w-3xl z-10 text-center">
                <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                  {process.env.APP_NAME}
                </div>
                <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                  {" "}
                  {process.env.APP_DESC}
                </div>
                <Image src={img1} alt='landing image'></Image>
              </div>
              <ul className="circles">
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
            <div className="md:flex md:items-center md:justify-center w-full md:h-full lg:w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
              <div className=" w-full space-y-8">
                <div className="text-center">
                  <div className='flex justify-center w-full'>
                    <Image src={icon} height={150} alt='icon'></Image>
                  </div>
                  <h2 className="text-3xl mt-6 font-semibold text-gray-900">
                    Welcome!
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Please login...
                  </p>
                </div>


                <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="relative">
                    {/* <div className="absolute right-3 mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div> */}
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-yellow-300"
                      required
                      id='email'
                      placeholder="mail@gmail.com"
                      ref={formData.email}
                    />
                  </div>
                  <div className="mt-8 content-center">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-yellow-300"
                      type="password"
                      placeholder="Enter password"
                      ref={formData.password}
                    />
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 bg-green-500 focus:ring-green-400 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember_me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-emerald-400 hover:text-green-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div> */}
                  <div>
                    <button className="w-full flex justify-center bg-gradient-to-r from-yellow-300 to-yellow-600  hover:bg-gradient-to-l hover:from-yellow-500 hover:to-yellow-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" >
                      Login
                    </button>
                  </div>
                  {/* <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Belum punya akun?</span>
                    <Link
                      href="/auth/register"
                      className="text-emerald-400 hover:text-green-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    >
                      Daftar
                    </Link>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
