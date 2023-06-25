import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Numbering from "@/components/Numbering";
import Paginator from "@/components/Paginator";
import DeleteButton from "@/components/Button/DeleteButton";
import Modal from "@/components/Modal";
import ShowButton from "@/components/Button/ShowButton";
export default function Index() {
    const TOKEN = storageService.getToken();
    const ROUTER = useRouter();
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState()
    const [errors, setErrors] = useState([])
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())
    const { data: datas, mutate, isLoading: datasLoading } = useSWR('/api/administrator/diploma-replacement/index?page=' + (ROUTER.query.page ? ROUTER.query.page : ''), fetcher)

    const handlePagination = index => {
        if (index.includes('Next')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) + 1 : 2;
        } else if (index.includes('Previous')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) - 1 : 1;
        }
        index = parseInt(index)

        if (index > datas.data?.last_page || index < 1) return
        ROUTER.push({
            pathname: '/administrator/diploma-replacement',
            query: { ...ROUTER.query, page: parseInt(index) }
        },
            undefined,
            {}
        )
    }
    const handleDelete = () => {
        setLoading(true);
        fetch(process.env.API + '/api/administrator/diploma-replacement/destroy/' + selected?.id, {
            method: 'DELETE',
            headers: {
                'authorization': TOKEN
            },
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success('Berhasil Menghapus Data', {
                    position: 'bottom-right'
                })
                document.getElementById('delete-modal').checked = false;
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }
    return <>
        <Loader isLoading={loading || datasLoading} />
        <ToastContainer />
        <NewPageLayout title={'Daftar Penggantian Ijazah'} hasBackURL backURL="/administrator">
            <div className="mt-3">
                <Table isCompact>
                    <thead>
                        <tr className="text-center">
                            <th>
                                No
                            </th>
                            <th className="text-center">
                                Nama Siswa
                            </th>
                            <th className="text-center">
                                NIK
                            </th>
                            <th className="text-center">
                                Sekolah
                            </th>
                            <th className="text-center">
                                Status
                            </th>
                            <th>File Pengganti Ijazah</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        datas?.data?.data?.map((data, index) => {
                            return (
                                <tr className="hover" key={index}>
                                    <th>
                                        <Numbering datas={datas} index={index} />
                                    </th>
                                    <td className="text-center">
                                        {data.name}
                                    </td>
                                    <td className="text-center">
                                        {data.id_number}
                                    </td>
                                    <td className="text-center">
                                        {
                                            (() => {
                                                if (data.reference_work_unit_id && data.school) {
                                                    return data.reference_work_unit?.name
                                                } else if (data.reference_work_unit_id) {
                                                    return data.reference_work_unit?.name
                                                } else {
                                                    return data.school
                                                }
                                            })()
                                        }
                                    </td>
                                    <td className="text-center">
                                        {
                                            (() => {
                                                if (!data.is_locked) {
                                                    return <span className="badge badge-warning">
                                                        Belum Dikunci
                                                    </span>
                                                } else {
                                                    if (data.is_rejected) {
                                                        return <>
                                                            <span className="badge badge-error mb-2">
                                                                Pengajuan Ditolak
                                                            </span> <br />
                                                            <p><span className="font-semibold">Alasan :</span> {data.rejected_reason}</p>
                                                        </>
                                                    } else if (!data.is_principal_approve) {
                                                        return <span className="badge badge-warning">
                                                            Menunggu Persetujuan Kepala Sekolah
                                                        </span>
                                                    } else if (!data.is_head_section_approve) {
                                                        return <span className="badge badge-warning">
                                                            Menunggu Persetujuan Kepala Bidang
                                                        </span>
                                                    } else if (!data.is_head_office_approve) {
                                                        return <span className="badge badge-warning">
                                                            Menunggu Persetujuan Kepala Dinas
                                                        </span>
                                                    } else if (data.is_principal_approve && data.is_head_section_approve && data.is_head_office_approve) {
                                                        return <>
                                                            <span className="badge badge-success">
                                                                Pengajuan Diterima
                                                            </span>
                                                        </>
                                                    }
                                                }
                                            })()
                                        }
                                    </td>
                                    <td>
                                        <div className="flex w-full justify-center">
                                            <label htmlFor="show-modal" className={data.file_result ? 'btn btn-success btn-sm capitalize' : 'hidden'} onClick={() => setSelected(data)}>
                                                Lihat File
                                            </label>
                                            <label className={data.file_result ? 'hidden' : ' capitalize'}>
                                                Menunggu Persetujuan
                                            </label>
                                        </div>

                                    </td>
                                    <td>
                                        <DeleteButton id="delete-modal" onclick={() => setSelected(data)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <Paginator handlePagination={handlePagination} data={datas} />

            </div>
        </NewPageLayout>
        <Modal id={'delete-modal'} title={'Hapus Data'}>
            <p className="py-3">Apakah anda yakin ingin menghapus <span className="font-semibold">{selected?.name}</span></p>
            <div className="flex w-full justify-end gap-3">
                <label htmlFor="delete-modal" className="btn">Tidak</label>
                <button onClick={() => handleDelete()} className="btn btn-success">Ya</button>
            </div>
        </Modal>
    </>
}