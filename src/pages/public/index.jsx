import NewPageLayout from "@/components/NewPageLayout";
import { useState } from "react";
import Link from "next/link";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import Text from "@/components/Input/Text";
import SubmitButton from "@/components/Button/SubmitButton";
import SubmitButtonModal from "@/components/Button/SubmitButtonModal";
import AddButton from "@/components/Button/AddButton";
import { storageService } from "@/services/storage.service";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formService } from "@/services/form.service";
import useSWR from 'swr'
import { useRouter } from "next/router";
import Numbering from "@/components/Numbering";
import Paginator from "@/components/Paginator";
export default function Index() {
    const TOKEN = storageService.getToken();
    const ROUTER = useRouter();
    const [feature, setFeature] = useState()
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState()
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: datas, mutate, isLoading: datasLoading } = useSWR('/api/public/index?page=' + (ROUTER.query.page ? ROUTER.query.page : '') + '&search=' + (ROUTER.query.search ? ROUTER.query.search : ''), fetcher)

    const { data: totalData } = useSWR('/api/public/dashboard', fetcher)

    

    const handlePagination = index => {
        if (index.includes('Next')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) + 1 : 2;
        } else if (index.includes('Previous')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) - 1 : 1;
        }
        index = parseInt(index)

        if (index > datas.data?.last_page || index < 1) return
        ROUTER.push({
            pathname: '/public',
            query: { ...ROUTER.query, page: parseInt(index) }
        },
            undefined,
            {}
        )
    }

    let filterTimeout;
    const handleSearch = event => {
        clearTimeout(filterTimeout)
        filterTimeout = setTimeout(() => {
            ROUTER.push({
                pathname: '/public',
                query: { ...ROUTER.query, page: ROUTER.query.page ? ROUTER.query.page : '', search: event }
            },
                undefined,
                {}
            )
        }, 1000)
    }

    const handleDelete = () => {
        setLoading(true);
        fetch(process.env.API + '/api/public/delete/' + selected?.id, {
            method: 'DELETE',
            headers: {
                'authorization': TOKEN
            },
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success(data.message, {
                    position: 'bottom-right'
                })
                document.getElementById('delete_modal').checked = false;
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    const handleReset = () => {
        fetch(process.env.API + '/api/public/reset/' + selected?.id, {
            method: 'GET',
            headers: {
                'authorization': TOKEN
            },
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success(data.message, {
                    position: 'bottom-right'
                })
                // document.getElementById('add_modal').checked = false;
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    const handleResetAll = () => {
        setLoading(true);
        fetch(process.env.API + '/api/public/reset-all', {
            method: 'GET',
            headers: {
                'authorization': TOKEN
            },
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success(data.message, {
                    position: 'bottom-right'
                })
                // document.getElementById('add_modal').checked = false;
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    let postData = new FormData();
    const handleSubmit = event => {

        event.preventDefault();
        setLoading(true);
        postData.append('key', formService.getText('key'))
        postData.append('duration', formService.getText('duration'))

        fetch(process.env.API + '/api/public/store', {
            method: 'POST',
            headers: {
                'authorization': TOKEN
            },
            body: postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success(data.message, {
                    position: 'bottom-right'
                })
                formService.resetText('key');
                formService.resetText('duration');
                document.getElementById('add_modal').checked = false;
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    let postDataUpdate = new FormData();
    const handleUpdate = event => {

        event.preventDefault();
        setLoading(true);
        // postData.append('key', formService.getText('key'))
        postData.append('duration', formService.getText('duration_edit'))

        fetch(process.env.API + '/api/public/update/' + selected.id, {
            method: 'POST',
            headers: {
                'authorization': TOKEN
            },
            body: postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success(data.message, {
                    position: 'bottom-right'
                })
                // formService.resetText('key');
                formService.resetText('duration_edit');
                document.getElementById('edit_modal').checked = false;
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    const getDiffDay = (d0, d1) => {
        var msPerDay = 8.64e7;

        // Copy dates so don't mess them up
        var x0 = new Date(d0);
        var x1 = new Date(d1);

        // Set to noon - avoid DST errors
        x0.setHours(12, 0, 0);
        x1.setHours(12, 0, 0);

        // Round to remove daylight saving errors
        return Math.round((x1 - x0) / msPerDay);
    }
    return <>
        <Loader isLoading={loading || datasLoading} />
        <ToastContainer />
        <NewPageLayout title={'Dasbor'} hasBackURL={false}>

            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    <div className="flex-auto p-4 bg-base-300 rounded-lg relative">
                        <div className="flex flex-col items-center w-full justify-center">
                            <h1 className="text-2xl">Total Key</h1>
                            <p className="text-4xl font-semibold">{totalData?.data}</p>
                        </div>
                    </div>


                </div>
                <br />
                <div className="flex w-full justify-end ">
                    <button className="btn btn-info" onClick={() => handleResetAll()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"><path d="M3.578 6.487A8 8 0 1 1 2.5 10.5"></path><path d="M7.5 6.5h-4v-4"></path></g></svg>
                        <span className="hidden md:block lg:block">Reset All</span>
                        </button>
                    <AddButton id="add_modal" />
                </div>
                <input type="text" className="w-full input input-sm bg-gray-300 border border-green-100 mb-2" placeholder="Cari" defaultValue={ROUTER.query.search ? ROUTER.query.search : ''} onChange={(event) => handleSearch(event.target.value)} />
                <Table isCompact>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Key</th>
                            <th>Device ID</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas?.data?.data?.map((userData, index) => {
                                return <>
                                    <tr key={index}>
                                        <th>
                                            <Numbering datas={datas} index={index} />
                                        </th>
                                        <th>
                                            {userData.key}
                                        </th>
                                        <td>
                                            {userData.device_id}
                                        </td>
                                        <td>
                                            <div className={userData.start_date == null ? 'hidden' : ''}>
                                                <span>Tanggal Mulai : {userData.start_date}</span> <br />
                                                <span>Tanggal Expire : {userData.end_date}</span> <br />
                                                <span className={getDiffDay(new Date(), userData.end_date) < 0 ? 'badge badge-error' : 'badge badge-success'}>{getDiffDay(new Date(), userData.end_date) < 0 ? 'Expire' : 'Aktif'}</span>
                                            </div>

                                        </td>
                                        <td>
                                            <div className="flex justify-end gap-1">
                                                <label onClick={() => { setSelected(userData); formService.resetText('duration_edit') }} htmlFor="edit_modal" className="btn btn-warning btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Zm-3.525-.725l-.7-.7l1.4 1.4l-.7-.7Z"></path></svg>
                                                    <span className="hidden md:block lg:block">Edit</span>
                                                </label>
                                                <button onClick={() => { setSelected(userData); handleReset() }} className="btn btn-info btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"><path d="M3.578 6.487A8 8 0 1 1 2.5 10.5"></path><path d="M7.5 6.5h-4v-4"></path></g></svg>
                                                    <span className="hidden md:block lg:block">Reset</span>
                                                </button>
                                                <label onClick={() => setSelected(userData)} htmlFor="delete_modal" className="btn btn-error btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000000" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"></path></svg>
                                                <span className="hidden md:block lg:block">Hapus</span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            })
                        }


                    </tbody>
                </Table>
                <Paginator data={datas} handlePagination={handlePagination} />
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
        <Modal id={'edit_modal'} title={'Edit Data'}>
            <form onSubmit={handleUpdate}>
                {/* <Text placeholder={'Masukkan Key'} id={'key_edit'} isRequired label={'Key'} errors={errors}></Text> */}
                <Text placeholder={'Tambahan Durasi (Hari)'} id={'duration_edit'} isNumber isRequired label={'Tambah Durasi'} errors={errors}></Text>
                <SubmitButtonModal id={'edit_modal'} />
            </form>
        </Modal>
        <Modal id={'add_modal'} title={'Tambah Data'}>
            <form onSubmit={handleSubmit}>
                <Text placeholder={'Masukkan Key'} id={'key'} isRequired label={'Key'} errors={errors}></Text>
                <Text placeholder={'Durasi (Hari)'} id={'duration'} isNumber isRequired label={'Durasi'} errors={errors}></Text>
                <SubmitButtonModal id={'add_modal'} />
            </form>
        </Modal>
        <Modal id={'delete_modal'} title={'Hapus Data'}>
            <p className="py-3">Apakah anda yakin ingin menghapus <span className="font-semibold">"sd"</span></p>
            <div className="flex w-full justify-end gap-3">
                <label htmlFor="delete_modal" className="btn">Tidak</label>
                <button onClick={() => handleDelete()} className="btn btn-success">Ya</button>
            </div>
        </Modal>
    </>
}