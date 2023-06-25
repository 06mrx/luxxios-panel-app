import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
function SidebarCorp() {
  const [open, setOpen] = useState(true)
  const [state, setState] = useState({
    pranalaCorp: true
  })

  const handleClick = (name, status) => {

    setState({
      ...state, [name]: status
    });
    console.log(name);
  }
  const router = useRouter();
  return (
    <div className={`${open ? "w-52" : "w-16"} h-screen trantition duration-200 bg-base-300 fixed left-0 lg:relative md:relative z-50  md:flex lg:flex`}>

      <svg width="1em" height="1em" viewBox="0 0 24 24" className={`absolute bg-base-200 z-50 cursor-pointer w-8 h-8 -right-4 top-3 rounded-lg ${!open ? "rotate-180 -right-6" : ""}`} onClick={() => setOpen(!open)}><path fill="currentColor" d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"></path><path fill="currentColor" d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path></svg>
      <div className=' h-screen hover:overflow-auto'>
        <div className='flex gap-x-4 items-center p-4  rounded'>
          <img src={`${!open ? "/assets/images/pwid-ic.png" : "/assets/images/pranalaworks.png"}`} alt="" className={`${!open ? "w-8 h-8" : " h-16"}`} />
        </div>
        {/* https://pranalaworks.id/images/pranalaworks.png */}
        <ul className={`${!open ? 'w-16' : 'w-52'} menu py-2 px-1 trantition duration-200`}>
        <label className=' text-gray-500 my-2 ml-5'>{!open ? '' : 'Menu Utama'}</label>
          <li className={`${router.pathname == '/dashboard' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" stroke={`${router.pathname == '/dashboard' ? "#fff" : "#000"}`} fill='none' viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Dashboard</span>
            </Link>
          </li>
        
          <li onClick={() => handleClick("pranalaCorp", !state.pranalaCorp)} className={`${router.pathname == '/pranala-corp' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} my-2`}>
            <a >
              <svg className='h-5 w-5' viewBox="0 0 24 24"><path fill="currentColor" d="M12 7V3H2v18h20V7H12zm-2 12H4v-2h6v2zm0-4H4v-2h6v2zm0-4H4V9h6v2zm0-4H4V5h6v2zm10 12h-8V9h8v10zm-2-8h-4v2h4v-2zm0 4h-4v2h4v-2z"></path></svg>

              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>PranalaCorp</span>
              <svg viewBox="0 0 24 24" className={`h-6 w-6 ${state.pranalaCorp ? '' : 'rotate-90'} ${!open ? 'hidden' : 'block'}`} ><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
            </a>
          </li>
          <div className={`${state.pranalaCorp ? '' : ' h-0 scale-0'} ${!open ? 'hidden' : 'block'} ml-4 -mt-2 transform transition-all duration-150  origin-top`}>
            <li className={`${router.pathname == '/admin/corp' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} my-1 `}>
              <Link href="/admin/corp">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24"><path fill={`${router.pathname == '/admin/corp' ? "#fff" : "#000"}`} d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></svg>
                <span className={`${!open && "hidden"} origin-left trantition duration-200`}>UMKM</span>
              </Link>
            </li>
            <li className={`${router.pathname == '/admin/corp/accompaniment' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} my-1 `}>
              <Link href="/admin/corp/accompaniment">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 512 512"><path d="M349.1 334.7c-11.2-4-29.5-4.2-37.6-7.3-5.6-2.2-14.5-4.6-17.4-8.1-2.9-3.5-2.9-28.5-2.9-28.5s7-6.6 9.9-14c2.9-7.3 4.8-27.5 4.8-27.5s6.6 2.8 9.2-10.4c2.2-11.4 6.4-17.4 5.3-25.8-1.2-8.4-5.8-6.4-5.8-6.4s5.8-8.5 5.8-37.4c0-29.8-22.5-59.1-64.6-59.1-42 0-64.7 29.4-64.7 59.1 0 28.9 5.7 37.4 5.7 37.4s-4.7-2-5.8 6.4c-1.2 8.4 3 14.4 5.3 25.8 2.6 13.3 9.2 10.4 9.2 10.4s1.9 20.1 4.8 27.5c2.9 7.4 9.9 14 9.9 14s0 25-2.9 28.5-11.8 5.9-17.4 8c-8 3.1-26.3 3.5-37.6 7.5-11.2 4-45.8 22.2-45.8 67.2h278.3c.1-45.1-34.5-63.3-45.7-67.3z" fill={`${router.pathname == '/admin/corp/accompaniment' ? "#fff" : "#000"}`}></path><path d="M140 286s23.9-.8 33.4-9.3c-15.5-23.5-7.1-50.9-10.3-76.5-3.2-25.5-17.7-40.8-46.7-40.8h-.4c-28 0-43.1 15.2-46.3 40.8-3.2 25.5 5.7 56-10.2 76.5C69 285.3 93 285 93 285s1 14.4-1 16.8c-2 2.4-7.9 4.7-12 5.5-8.8 1.9-18.1 4.5-25.9 7.2-7.8 2.7-22.6 17.2-22.6 37.2h80.3c2.2-8 17.3-22.3 32-29.8 9-4.6 17.9-4.3 24.7-5.2 0 0 3.8-6-8.7-8.3 0 0-17.2-4.3-19.2-6.7-1.9-2.2-.6-15.7-.6-15.7z" fill="currentColor"></path><path d="M372 286s-23.9-.8-33.4-9.3c15.5-23.5 7.1-50.9 10.3-76.5 3.2-25.5 17.7-40.8 46.7-40.8h.4c28 0 43.1 15.2 46.3 40.8 3.2 25.5-5.7 56 10.2 76.5-9.5 8.6-33.5 8.3-33.5 8.3s-1 14.4 1 16.8c2 2.4 7.9 4.7 12 5.5 8.8 1.9 18.1 4.5 25.9 7.2 7.8 2.7 22.6 17.2 22.6 37.2h-80.3c-2.2-8-17.3-22.3-32-29.8-9-4.6-17.9-4.3-24.7-5.2 0 0-3.8-6 8.7-8.3 0 0 17.2-4.3 19.2-6.7 1.9-2.2.6-15.7.6-15.7z" fill="currentColor"></path></svg>
                <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Pendampingan</span>
              </Link>
            </li>
            {/* <li className={`${router.pathname == '/admin/invest' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} my-1 `}>
              <Link href="/admin/invest">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 48 48"><path fill="none" stroke={`${router.pathname == '/admin/invest'}`} strokeLinecap="round" strokeLinejoin="round" d="M5.504 41.251H42.5V28.153M7.434 37.688L22.424 22.7l5.108 5.108L42.5 12.84v11.056M31.359 12.839H42.5"></path><rect width="13.13" height="11.358" x="5.5" y="12.402" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" rx="2.181"></rect><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.562 16.188h10.067M5.5 19.974h10.067"></path><circle cx="12.056" cy="8.589" r="1.84" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Invest</span>
              </Link>
            </li> */}
            
          </div>
          <label className=' text-gray-500 my-2 ml-5'>{!open ? '' : 'Referensi'}</label>
          <li className={`${router.pathname == '/admin/corp/capital' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/admin/corp/capital">
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24"><path fill="none" stroke={`${router.pathname == '/corp/capital' ? "#fff" : "#000"}`} strokeLinejoin="round" strokeWidth="2" d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 4.52 10 5.08 10 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 10 7.92 10 6.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 8.48 3 7.92 3 6.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 3 16.08 3 17.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 10 18.92 10 17.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 8.48 14 7.92 14 6.8v-.6zm-11 11c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 14 5.08 14 6.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 15.52 10 16.08 10 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 21 7.92 21 6.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 14 16.08 14 17.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 15.52 21 16.08 21 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 19.48 14 18.92 14 17.8v-.6z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Permodalan</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarCorp