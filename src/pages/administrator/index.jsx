import NewPageLayout from "@/components/NewPageLayout";
import { useState } from "react";
import Link from "next/link";
export default function Index() {
    const [feature, setFeature] = useState()
    return <>
        <NewPageLayout title={'Dasbor Admin'} hasBackURL={false}>
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <Link href={'/administrator/users'} >
                                        <div className="flex gap-1 items-center text-sm">
                                            <p className="mb-0 font-sans font-semibold leading-normal text-xl">Pengguna</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 rotate-180" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </div>
                                        <h5 className="mb-3">
                                            Daftar Pengguna
                                        </h5>
                                    </Link>

                                  
                                </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 shadow-soft-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-1 text-white" viewBox="0 0 32 32"><path fill="currentColor" d="M26 18h-6v-3.102a7.494 7.494 0 0 1 1.159-3.854a5.975 5.975 0 0 0-1.374-7.7a5.997 5.997 0 0 0-9.683 3.54a5.91 5.91 0 0 0 .748 4.174A7.257 7.257 0 0 1 12 14.794V18H6a2.002 2.002 0 0 0-2 2v4a2.002 2.002 0 0 0 2 2v2a2.002 2.002 0 0 0 2 2h16a2.002 2.002 0 0 0 2-2v-2a2.002 2.002 0 0 0 2-2v-4a2.002 2.002 0 0 0-2-2ZM12.07 7.244a4 4 0 1 1 7.373 2.773A9.76 9.76 0 0 0 18.066 14H13.94a9.543 9.543 0 0 0-1.376-3.974a3.937 3.937 0 0 1-.494-2.782ZM18 16v2h-4v-2Zm6 12H8v-2h16ZM6 24v-4h20v4Z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <Link href={'/administrator/legalize'} >
                                        <div className="flex gap-1 items-center text-sm">
                                            <p className="mb-0 font-sans font-semibold leading-normal text-xl">PLAZA</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 rotate-180" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </div>
                                        <h5 className="mb-3">
                                            Pelayanan Legalisir Ijazah
                                        </h5>
                                    </Link>

                                  
                                </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 shadow-soft-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-1 text-white" viewBox="0 0 32 32"><path fill="currentColor" d="M26 18h-6v-3.102a7.494 7.494 0 0 1 1.159-3.854a5.975 5.975 0 0 0-1.374-7.7a5.997 5.997 0 0 0-9.683 3.54a5.91 5.91 0 0 0 .748 4.174A7.257 7.257 0 0 1 12 14.794V18H6a2.002 2.002 0 0 0-2 2v4a2.002 2.002 0 0 0 2 2v2a2.002 2.002 0 0 0 2 2h16a2.002 2.002 0 0 0 2-2v-2a2.002 2.002 0 0 0 2-2v-4a2.002 2.002 0 0 0-2-2ZM12.07 7.244a4 4 0 1 1 7.373 2.773A9.76 9.76 0 0 0 18.066 14H13.94a9.543 9.543 0 0 0-1.376-3.974a3.937 3.937 0 0 1-.494-2.782ZM18 16v2h-4v-2Zm6 12H8v-2h16ZM6 24v-4h20v4Z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3 ">
                                <div>
                                    <Link href={'/administrator/student-mutation'} >
                                        <div className="flex gap-1 items-center text-sm">
                                            <p className="mb-0 font-sans font-semibold leading-normal text-xl">PMS</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 rotate-180" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </div>
                                        <h5 className="mb-3">
                                            Pelayanan Administrasi Mutasi Siswa
                                        </h5>
                                    </Link>
                                    {/* <div className="flex gap-2 absolute right-3 bottom-1">
                                        <span className="flex gap-1 items-center badge badge-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M9 3V1h6v2H9Zm2 11h2V8h-2v6Zm1 8q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.85.713-3.488T5.65 6.65q1.225-1.225 2.863-1.938T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35q-1.225 1.225-2.863 1.938T12 22Zm0-2q2.9 0 4.95-2.05T19 13q0-2.9-2.05-4.95T12 6Q9.1 6 7.05 8.05T5 13q0 2.9 2.05 4.95T12 20Zm0-7Z"></path></svg>
                                            10 Menit
                                        </span>
                                        <span className="flex gap-1 items-center badge badge-success">
                                            Biaya Gratis
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 shadow-soft-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-1 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M15 14v-3h3V9l4 3.5l-4 3.5v-2h-3m-1-6.3V9H2V7.7L8 4l6 3.7M7 10h2v5H7v-5m-4 0h2v5H3v-5m10 0v2.5l-2 1.8V10h2m-3.9 6l-.6.5l1.7 1.5H2v-2h7.1m7.9-1v3h-3v2l-4-3.5l4-3.5v2h3Z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <Link href={'/administrator/diploma-replacement'} >
                                        <div className="flex gap-1 items-center text-sm">
                                            <p className="mb-0 font-sans font-semibold leading-normal text-xl">PAPI</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 rotate-180" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </div>
                                        <h5 className="mb-3">
                                            Pelayanan Administrasi Penggantian Ijazah
                                        </h5>
                                    </Link>
                                    <div className="flex gap-2 absolute right-3 bottom-1">
                                        {/* <span className="flex gap-1 items-center badge badge-success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M9 3V1h6v2H9Zm2 11h2V8h-2v6Zm1 8q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.85.713-3.488T5.65 6.65q1.225-1.225 2.863-1.938T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35q-1.225 1.225-2.863 1.938T12 22Zm0-2q2.9 0 4.95-2.05T19 13q0-2.9-2.05-4.95T12 6Q9.1 6 7.05 8.05T5 13q0 2.9 2.05 4.95T12 20Zm0-7Z"></path></svg>
                                            1 Hari
                                        </span>
                                        <span className="flex gap-1 items-center badge badge-success">
                                            Biaya Gratis
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 shadow-soft-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-1 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05A6.976 6.976 0 0 0 11 4c-3.53 0-6.43 2.61-6.92 6H6.1A5 5 0 0 1 11 6zm5.64 9.14A6.89 6.89 0 0 0 17.92 12H15.9a5 5 0 0 1-4.9 4c-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05A6.976 6.976 0 0 0 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49L21.49 20l-4.85-4.86z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <Link href={'/administrator/cultural-heritage'} >
                                        <div className="flex gap-1 items-center text-sm">
                                            <p className="mb-0 font-sans font-semibold leading-normal text-xl">PACU</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 rotate-180" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </div>
                                        <h5 className="mb-3">
                                            Pendaftaran Cagar Budaya
                                        </h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 shadow-soft-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-1 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20q-.825 0-1.413-.588T4 18q0-.825.588-1.413T6 16q.825 0 1.413.588T8 18q0 .825-.588 1.413T6 20Zm0-6q-.825 0-1.413-.588T4 12q0-.825.588-1.413T6 10q.825 0 1.413.588T8 12q0 .825-.588 1.413T6 14Zm0-6q-.825 0-1.413-.588T4 6q0-.825.588-1.413T6 4q.825 0 1.413.588T8 6q0 .825-.588 1.413T6 8Zm6 6q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12l-2 2Zm0-6q-.825 0-1.413-.588T10 6q0-.825.588-1.413T12 4q.825 0 1.413.588T14 6q0 .825-.588 1.413T12 8Zm-1 12v-2.125l5.3-5.3l2.125 2.125l-5.3 5.3H11Zm7-12q-.825 0-1.413-.588T16 6q0-.825.588-1.413T18 4q.825 0 1.413.588T20 6q0 .825-.588 1.413T18 8Zm1.125 6L17 11.875l.725-.725q.3-.3.713-.3t.687.3l.725.725q.3.275.3.688t-.3.712l-.725.725Z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <Link href={'/administrator/studio'} >
                                        <div className="flex gap-1 items-center text-sm">
                                            <p className="mb-0 font-sans font-semibold leading-normal text-xl">PASAR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 rotate-180" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </div>
                                        <h5 className="mb-3">
                                            Pendaftaran Sanggar
                                        </h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 shadow-soft-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-1 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20q-.825 0-1.413-.588T4 18q0-.825.588-1.413T6 16q.825 0 1.413.588T8 18q0 .825-.588 1.413T6 20Zm0-6q-.825 0-1.413-.588T4 12q0-.825.588-1.413T6 10q.825 0 1.413.588T8 12q0 .825-.588 1.413T6 14Zm0-6q-.825 0-1.413-.588T4 6q0-.825.588-1.413T6 4q.825 0 1.413.588T8 6q0 .825-.588 1.413T6 8Zm6 6q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12l-2 2Zm0-6q-.825 0-1.413-.588T10 6q0-.825.588-1.413T12 4q.825 0 1.413.588T14 6q0 .825-.588 1.413T12 8Zm-1 12v-2.125l5.3-5.3l2.125 2.125l-5.3 5.3H11Zm7-12q-.825 0-1.413-.588T16 6q0-.825.588-1.413T18 4q.825 0 1.413.588T20 6q0 .825-.588 1.413T18 8Zm1.125 6L17 11.875l.725-.725q.3-.3.713-.3t.687.3l.725.725q.3.275.3.688t-.3.712l-.725.725Z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <Link href={'/administrator/internship-recommendation'} >
                                        <div className="flex gap-1 items-center text-sm">
                                            <p className="mb-0 font-sans font-semibold leading-normal text-xl">RPM</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 rotate-180" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </div>
                                        <h5 className="mb-3">
                                            Rekomendasi Penelitian / Magang
                                        </h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-500 to-pink-500 shadow-soft-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-1 text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20q-.825 0-1.413-.588T4 18q0-.825.588-1.413T6 16q.825 0 1.413.588T8 18q0 .825-.588 1.413T6 20Zm0-6q-.825 0-1.413-.588T4 12q0-.825.588-1.413T6 10q.825 0 1.413.588T8 12q0 .825-.588 1.413T6 14Zm0-6q-.825 0-1.413-.588T4 6q0-.825.588-1.413T6 4q.825 0 1.413.588T8 6q0 .825-.588 1.413T6 8Zm6 6q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12l-2 2Zm0-6q-.825 0-1.413-.588T10 6q0-.825.588-1.413T12 4q.825 0 1.413.588T14 6q0 .825-.588 1.413T12 8Zm-1 12v-2.125l5.3-5.3l2.125 2.125l-5.3 5.3H11Zm7-12q-.825 0-1.413-.588T16 6q0-.825.588-1.413T18 4q.825 0 1.413.588T20 6q0 .825-.588 1.413T18 8Zm1.125 6L17 11.875l.725-.725q.3-.3.713-.3t.687.3l.725.725q.3.275.3.688t-.3.712l-.725.725Z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </NewPageLayout>

        <input type="checkbox" id="requirement-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box relative w-11/12 max-w-xl">
                <label htmlFor="requirement-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div className={feature == 1 ? '' : 'hidden'}>
                    <h3 className="text-lg font-bold">Syarat Legalisir Ijazah</h3>
                    <ol>
                        <li className="-ml-4">
                            <span className="font-semibold">Legalisir Ijazah Sekolah SD / SMP</span>
                            <ul>
                                <li className="-ml-7">
                                    Melampirkan ijazah dan SKHUN Asli.
                                </li>
                                <li className="-ml-7">
                                    Fotokopi Ijazah Yang Telah Dilegalisir Kepala Sekolah
                                </li>
                            </ul>
                        </li>
                        <li className="-ml-4">
                            <span className="font-semibold">Legalisir Ijazah Paket A, B dan C</span>
                            <ul>
                                <li className="-ml-7">
                                    Melampirkan ijazah dan SKHUN Asli.
                                </li>
                                <li className="-ml-7">
                                    Fotokopi DKHUN Dilegalisir oleh Lembaga / PKBM Terkait.
                                </li>
                            </ul>
                        </li>
                        <li className="-ml-4">
                            <span className="font-semibold">Legalisir Ijazah Luar Kota / Kabupaten</span>
                            <ul>
                                <li className="-ml-7">
                                    Melampirkan ijazah dan SKHUN Asli.
                                </li>
                                <li className="-ml-7">
                                    Fotokopi KTP (Domisili Kota Malang).
                                </li>
                            </ul>
                        </li>
                        <li className="-ml-4">
                            Membawa Dokumen Ijazah Asli, Transkrip Nilai Asli, Salinan Transkrip Nilai dan Ijazah Yang Telah Dilegalisir Oleh Lembaga Ke Loket Pembayaran.
                        </li>
                        <li className="-ml-4">
                            Melakukan Pengecekan Persyaratan, Jika Lengkap Maka Berkas Diberikan Stempel Legalisir.
                        </li>
                        <li className="-ml-4">
                            Berkas Yang Sudah Di Paraf Kemudian Di Tandatangani
                        </li>
                        <li className="-ml-4">
                            Penyerahan Rekomendasi Dan Menandatangani Tanda Terima.
                        </li>
                    </ol>
                </div>

            </div>
        </div>
    </>
}