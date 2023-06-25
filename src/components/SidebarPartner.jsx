import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
function SidebarCorp() {
  const [open, setOpen] = useState(true)
  const [state, setState] = useState({
    pranalaCorp: false
  })

  const handleClick = (name, status) => {

    setState({
      ...state, [name]: status
    });
    console.log(name);
  }
  const router = useRouter();
  return (
    <div className={`${open ? "w-52" : "w-16"} h-screen trantition duration-200 bg-base-100 fixed left-0 lg:relative md:relative z-50  md:flex lg:flex`}>

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
          <li className={`${router.pathname == '/partner/corp' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1 `}>
            <Link href="/partner/corp">
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24"><path fill={`${router.pathname == '/partner/corp' ? "#fff" : "#000"}`} d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>UMKM</span>
            </Link>
          </li>
          <li className={`${router.pathname == '/partner/corp/products' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1 `}>
            <Link href="/partner/corp/products">
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 20 20"><path fill="none" stroke={`${router.pathname == '/partner/corp/products' ? "#fff" : "#000"}`} d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.94 4.94 0 0 1 12 1c2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Produk</span>
            </Link>
          </li>
          <li className={`${router.pathname == '/partner/financial-statements' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/partner/financial-statements">
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 512 512"><path fill={`${router.pathname == '/partner/financial-statements' ? "#fff" : "#000"}`} d="M0 64c0-17.7 14.3-32 32-32h80c79.5 0 144 64.5 144 144c0 58.8-35.2 109.3-85.7 131.7l51.4 128.4c6.6 16.4-1.4 35-17.8 41.6s-35-1.4-41.6-17.8l-56-139.9H64v128c0 17.7-14.3 32-32 32S0 465.7 0 448V64zm64 192h48c44.2 0 80-35.8 80-80s-35.8-80-80-80H64v160zm256-96h80c61.9 0 112 50.1 112 112s-50.1 112-112 112h-48v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32zm80 160c26.5 0 48-21.5 48-48s-21.5-48-48-48h-48v96h48z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Lap. Keuangan</span>
            </Link>
          </li>
          <label className=' text-gray-500 my-2 ml-5'>{!open ? '' : 'Fitur Pranala Corp'}</label>
          <li onClick={() => handleClick("pranalaCorp", !state.pranalaCorp)} className={`${router.pathname == '/pranala-corp' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} my-2`}>
            <a >
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24"><path fill="none" stroke={`${router.pathname == '/corp/capital' ? "#fff" : "#000"}`} strokeLinejoin="round" strokeWidth="2" d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 4.52 10 5.08 10 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 10 7.92 10 6.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 8.48 3 7.92 3 6.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 3 16.08 3 17.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 10 18.92 10 17.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 8.48 14 7.92 14 6.8v-.6zm-11 11c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 14 5.08 14 6.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 15.52 10 16.08 10 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 21 7.92 21 6.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 14 16.08 14 17.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 15.52 21 16.08 21 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 19.48 14 18.92 14 17.8v-.6z"></path></svg>

              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Permodalan</span>
              <svg viewBox="0 0 24 24" className={`h-6 w-6 ${state.pranalaCorp ? '' : 'rotate-90'} ${!open ? 'hidden' : 'block'}`} ><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
            </a>
          </li>
          <div className={`${state.pranalaCorp ? '' : ' h-0 scale-0'} ${!open ? 'hidden' : 'block'} ml-4 -mt-2 transform transition-all duration-150  origin-top`}>
            <li className={`${router.pathname == '/partner/capital' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} my-1 `}>
              <Link href="/partner/capital">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24"><path fill="none" stroke={`${router.pathname == '/partner/capital' ? "#fff" : "#000"}`} strokeLinejoin="round" strokeWidth="2" d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 4.52 10 5.08 10 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 10 7.92 10 6.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 8.48 3 7.92 3 6.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 3 16.08 3 17.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 10 18.92 10 17.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 8.48 14 7.92 14 6.8v-.6zm-11 11c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 14 5.08 14 6.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 15.52 10 16.08 10 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 21 7.92 21 6.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 14 16.08 14 17.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 15.52 21 16.08 21 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 19.48 14 18.92 14 17.8v-.6z"></path></svg>
                <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Riwayat Permodalan</span>
              </Link>
            </li>
            <li className={`${router.pathname == '/admin/corp/accompaniment' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} my-1 `}>
              <Link href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 512 512"><path d="M124 80v322c0 7.7-6.3 14-14 14s-14-6.3-14-14V112H80c-17.7 0-32 14.3-32 32v288c0 17.7 14.3 32 32 32h353.1c17 0 30.9-13.8 30.9-30.9V80c0-17.7-14.3-32-32-32l-278 2c-17.7 0-30 12.3-30 30zm66 32h84c7.7 0 14 6.3 14 14s-6.3 14-14 14h-84c-7.7 0-14-6.3-14-14s6.3-14 14-14zm0 160h148c7.7 0 14 6.3 14 14s-6.3 14-14 14H190c-7.7 0-14-6.3-14-14s6.3-14 14-14zm196 108H190c-7.7 0-14-6.3-14-14s6.3-14 14-14h196c7.7 0 14 6.3 14 14s-6.3 14-14 14zm0-160H190c-7.7 0-14-6.3-14-14s6.3-14 14-14h196c7.7 0 14 6.3 14 14s-6.3 14-14 14z" fill="#000000"></path></svg>
                <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Riwayat Prop. Usaha</span>
              </Link>
            </li>
            {/* <li className={`${router.pathname == '/admin/invest' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} my-1 `}>
              <Link href="/admin/invest">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 48 48"><path fill="none" stroke={`${router.pathname == '/admin/invest'}`} strokeLinecap="round" strokeLinejoin="round" d="M5.504 41.251H42.5V28.153M7.434 37.688L22.424 22.7l5.108 5.108L42.5 12.84v11.056M31.359 12.839H42.5"></path><rect width="13.13" height="11.358" x="5.5" y="12.402" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" rx="2.181"></rect><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.562 16.188h10.067M5.5 19.974h10.067"></path><circle cx="12.056" cy="8.589" r="1.84" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Invest</span>
              </Link>
            </li> */}
            
          </div>
          {/* <li className={`${router.pathname == '/dashboard-two' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 16 16"><g fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><circle cx="5" cy="9" r="2.25"></circle><circle cx="11" cy="4" r="2.25"></circle><path d="M7.75 9.25c0-1 .75-3 3.25-3s3.25 2 3.25 3m-12.5 5c0-1 .75-3 3.25-3s3.25 2 3.25 3"></path></g></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Pendampingan</span>
            </Link>
          </li> */}
          {/* <label className=' text-gray-500 my-2 ml-5'>{!open ? '' : 'Referensi'}</label>
          <li className={`${router.pathname == '/corp/members' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-red-600' viewBox="0 0 16 16"><path fill="#000000" d="M3 3a2 2 0 1 1 4 0a2 2 0 0 1-4 0Zm2-1a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm4.779 2.584a2 2 0 1 1 2.442-3.168A2 2 0 0 1 9.78 4.584ZM11 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2ZM2.5 6h2.67c-.11.313-.17.65-.17 1H2.5a.5.5 0 0 0-.5.5c0 .817.325 1.423.838 1.835c.236.19.519.343.839.455a2.5 2.5 0 0 0-.532.868a3.733 3.733 0 0 1-.933-.543C1.46 9.51 1 8.616 1 7.5A1.5 1.5 0 0 1 2.5 6Zm3.768 0a2 2 0 1 0 3.466 2a2 2 0 0 0-3.466-2Zm1.508.025A1.003 1.003 0 0 1 9 7a1 1 0 1 1-1.224-.975Zm5.386 3.31c-.236.19-.519.343-.839.455a2.5 2.5 0 0 1 .531.868c.34-.139.655-.32.934-.543C14.54 9.51 15 8.616 15 7.5A1.5 1.5 0 0 0 13.5 6h-2.67c.11.313.17.65.17 1h2.5a.5.5 0 0 1 .5.5c0 .817-.325 1.423-.838 1.835ZM10.5 10a1.5 1.5 0 0 1 1.5 1.5c0 1.116-.459 2.01-1.212 2.615C10.047 14.71 9.053 15 8 15c-1.053 0-2.047-.29-2.788-.885C4.46 13.51 4 12.616 4 11.5A1.496 1.496 0 0 1 5.5 10h5Zm0 1h-5a.5.5 0 0 0-.5.5c0 .817.325 1.423.838 1.835C6.364 13.757 7.12 14 8 14c.88 0 1.636-.243 2.162-.665c.513-.412.838-1.018.838-1.835a.5.5 0 0 0-.5-.5Z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Anggota</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default SidebarCorp