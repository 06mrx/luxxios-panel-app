import Nav from './Nav'
import Footer from './Footer'
import SidebarCorp from './SidebarCorp'
import SidebarAdmin from './SidebarAdmin'
import SidebarPartner from './SidebarPartner'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { storageService } from '../services/storage.service'
import Head from 'next/head'
import Image from 'next/image'
export default function PageLayout({ children, title, backUrl = '/', hasBackUrl = true, isNativeBack = false }) {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
    console.log(open)
  }
  
  var userString = '';
  if (router.isReady) {
    userString = storageService.get("user")
  }
  var user = {}
  if(userString) {
      user = JSON.parse(userString)
  }


  const handleLogout = async () => {
      storageService.remove("user")
    router.push('/');
  }
  return (
    <>
      
      <Head>
        <title>{process.env.APP_NAME}</title>
        <link rel="shortcut icon" href="/favicon/favicon-16x16.png" />
        
      </Head>
      <main>
        <div className='flex overflow-hidden bg-base-100 min-h'>

          <div className={`${!open ? 'hidden md:block lg:block' : 'block'}`}>

            {/* { user.role_id == 'a579f4ae-7cc9-4144-a32d-ffe766ccdf0a' ?  <SidebarCorp /> : ''}
            { user.role_id == 'f5263df0-325f-43b3-bef4-bc96fc4d1cb8' ?  <SidebarAdmin /> : ''}
            { user.role_id == '6638cb8b-456e-4c1d-bb11-ac7fe02a69c7' ?  <SidebarPartner /> : ''} */}
            {
              storageService.checkRole(user.role_id) == 'Administrator' ? <SidebarAdmin /> : null
            }
            
          </div>
          <div className='text-base flex-1 h-screen overflow-auto'>

            <div className='flex w-full justify-between p-2 sticky top-0 z-40 bg-base-100 shadow-lg'>
              <div className='ml-4 flex mt-2'>
                <div className={`${hasBackUrl && !isNativeBack ? 'md:hidden lg:hidden' : 'hidden'}`}>
                  <Link href={backUrl}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 hover:bg-gray-300  rounded-lg" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                  </Link>
                </div>
                <div className={`${isNativeBack ? 'md:hidden lg:hidden' : 'hidden'}`}>
                  <button onClick={router.back}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 hover:bg-gray-300  rounded-lg" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                  </button>
                </div>
                <h1 className='text-xl md:text-3xl lg:text-3xl ml-3 font-semibold'>{process.env.APP_NAME}</h1>
              </div>
              <div>
                <div className="dropdown dropdown-end">

                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      {/* <img src="/assets/images/people.jpeg" /> */}
                      <Image src={`/assets/images/people.jpeg`} alt="photo" width={100} height={100} referrerPolicy="no-referrer" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                    <li><a onClick={handleLogout}>Logout</a></li>
                  </ul>
                </div>


                <div className="dropdown dropdown-end md:hidden lg:hidden">
                  <label onClick={handleClick} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <svg className={`${!open ? 'flex' : 'hidden'}`} fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z"></path></svg>
                      <svg className={`${!open ? 'hidden' : 'flex'}`} viewBox="0 0 24 24"><path fill="#000000" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"></path></svg>
                      {/* <svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z"></path></svg> */}
                    </div>
                  </label>
                  <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                    <li className={`${router.pathname == '/' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} `}>
                      <Link href="/" className="justify-between">
                        Dashboard
                      </Link>
                    </li>
                    <li className={`${router.pathname == '/post' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} `}>
                      <Link href="/post">Post</Link>
                    </li>
                    <li><a>Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='p-3 min-h-[calc(100vh-65px)] bg-base-200' style={{ backgroundImage: "url('/assets/images/bgg.svg')", }}>
              <div className="">
                <div className={`${hasBackUrl && !isNativeBack ? 'hidden md:flex lg:flex' : 'hidden'} `}>
                  <Link href={backUrl}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 hover:bg-gray-300 px-4 rounded-lg" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                  </Link>
                </div>
                <div className={`${isNativeBack ? 'hidden md:flex lg:flex' : 'hidden'} `}>
                  <button onClick={router.back}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 hover:bg-gray-300 px-4 rounded-lg" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                  </button>
                </div>
              </div>
              <h1 className='text-xl text-center md:text-3xl lg:text-3xl ml-3 font-semibold'>{title}</h1>
              
              {children}
            </div>

            {/* <Footer /> */}
          </div>


        </div>

      </main>

    </>
  )
}