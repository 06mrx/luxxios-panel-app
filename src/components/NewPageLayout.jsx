import PageLayout from "@/components/PageLayout";
import DivCard from "@/components/DivCard";
import { Montserrat } from "@next/font/google";
import Image from "next/image";
const montserrat = Montserrat({ subsets: ['latin'] })
import Link from "next/link";
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
export default function NewPageLayout({ children, title, backURL = '#', hasBackURL, isFullWidth = false }) {
    const router = useRouter();
    const handleLogout = async () => {
        storageService.remove("user")
        router.push('/');
    }
    return <>
        <main className={montserrat.className}>
            <div className="bg-base-200 h-screen">
                <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 w-full h-64">
                    <div className="max-w-7xl mx-auto w-full flex justify-between relative p-2 md:p-2 lg:p-0">
                        <div className="absolute top-10 w-full">
                            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold w-2/3 md:2-1/2 lg:w-full">
                                Selamat Datang DI {process.env.APP_NAME}
                            </h1>
                            <p className="text-white">{process.env.APP_DESC}</p>
                        </div>
                        <div className="absolute top-10 right-0 flex items-center gap-2">
                            <p className="font-semibold text-white">{storageService.getName()}</p>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <Image src={`/assets/images/avatar.png`} alt="photo" width={100} height={100} referrerPolicy="no-referrer" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                                    <li onClick={() => handleLogout()}><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="max-w-7xl mx-auto w-full absolute top-10  bg-base-100">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis placeat ipsa repellat dolorem, illo ullam ducimus dolorum vel aperiam suscipit sapiente corrupti voluptatem debitis aliquid distinctio deleniti, ea nisi perspiciatis!
                    </div> */}
                    </div>

                </div>
                <div className={isFullWidth ? 'bg-base-100 rounded-xl shadow-xl px-3 py-2 absolute w-full top-40  left-1/2 transform -translate-x-1/2' : 'bg-base-100 rounded-xl shadow-xl px-3 py-2 absolute max-w-7xl w-full top-40  left-1/2 transform -translate-x-1/2 '}>
                    <div className="flex w-full justify-end">
                        <Link href={backURL} className={hasBackURL ? 'md:hidden lg:hidden' : 'hidden'}>
                            <div className="flex gap-1 items-center text-sm hover:bg-gray-300  px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg> Kembali
                            </div>
                        </Link>
                    </div>
                    <div className="flex gap-3 justify-between items-center mt-3">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">{title}</h1>
                        <Link href={backURL} className={hasBackURL ? 'hidden md:block lg:block' : 'hidden'}>
                            <div className="flex gap-1 items-center text-sm hover:bg-gray-300  px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg> Kembali
                            </div>
                        </Link>
                    </div>
                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                        {children}
                    </div>
                </div>
            </div>

        </main>
    </>
}