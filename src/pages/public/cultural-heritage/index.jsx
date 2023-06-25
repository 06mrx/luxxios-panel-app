import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import AddButton from "@/components/Button/AddButton";
import Table from "@/components/Table";
import Numbering from "@/components/Numbering";
import ShowButton from "@/components/Button/ShowButton";
import Modal from "@/components/Modal";
import DownloadButton from "@/components/Button/DownloadButton";
export default function Index() {
    const TOKEN = storageService.getToken();
    const ROUTER = useRouter();
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState()
    const [feedback, setFeedback] = useState(1)
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())
    const { data: datas, mutate, isLoading: datasLoading } = useSWR('/api/public/cultural-heritage/index?page=' + (ROUTER.query.page ? ROUTER.query.page : ''), fetcher)

    const handleChangeFeedback = (val) => {
        fetch(process.env.API + '/api/public/cultural-heritage/feedback/' + selected?.id, {
            method: 'POST',
            headers: {
                'authorization': TOKEN,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                feedback: val
            })
        }).then((res) => res.json()).then((data) => {
            if (data.success) {
                setFeedback(val)
            }
        })
    }
    return <>
        <Loader isLoading={loading || datasLoading} />
        <NewPageLayout title={'Pendaftaran Cagar Budaya'} hasBackURL backURL="/public">
            <div className="mt-3">
                <AddButton hasUrl url="/public/cultural-heritage/create" />
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>
                                No
                            </th>
                            <th>
                                Kode
                            </th>
                            <th>
                                Nama
                            </th>
                            <th>
                                Owner
                            </th>
                            <th className=" whitespace-normal">
                                Status
                            </th>
                            <th>
                                File Ket. Terdaftar
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas?.data?.data?.map((data, index) => {
                                return (
                                    <tr key={index} className="hover text-center">
                                        <th>
                                            <Numbering datas={datas} index={index} />
                                        </th>
                                        <td>
                                            {data.service_number}
                                        </td>
                                        <td>
                                            {data.name}
                                        </td>
                                        <td>
                                            {data.owner_name}
                                        </td>
                                        <td className=" whitespace-normal">
                                            {
                                                (() => {
                                                    if (data.is_rejected) {
                                                        return <>
                                                            <span className="badge badge-error mb-2">
                                                                Pengajuan Ditolak
                                                            </span> <br />
                                                            <p><span className="font-semibold">Alasan :</span> {data.rejected_reason}</p>
                                                        </>
                                                    } else if (!data.is_head_section_approve) {
                                                        return <span className="badge badge-warning">
                                                            Menunggu Persetujuan Kepala Bidang
                                                        </span>
                                                    } else if (!data.is_head_office_approve) {
                                                        return <span className="badge badge-warning">
                                                            Menunggu Persetujuan Kepala Dinas
                                                        </span>
                                                    } else if (data.is_head_section_approve && data.is_head_office_approve) {
                                                        return <>
                                                            <span className="badge badge-success">
                                                                Pengajuan Diterima
                                                            </span>
                                                        </>
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
                                                    Belum disetujui
                                                </label>
                                            </div>

                                        </td>
                                        <td>
                                            <ShowButton url={'/public/cultural-heritage/' + data.id} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </NewPageLayout>
        <Modal id={'show-modal'} title={'Unduh File Keterangan Terdaftar'}>
            <div className={selected?.feedback ? 'hidden' : ''}>
                <p>Beri feedback sebelum mendonwload file, pilih 1 - 5</p>
                <div className="mx-auto flex justify-center">
                    <div className="rating rating-lg">
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" defaultChecked={true} onClick={() => handleChangeFeedback(1)} />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={() => handleChangeFeedback(2)} />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={() => handleChangeFeedback(3)} />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={() => handleChangeFeedback(4)} />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" onClick={() => handleChangeFeedback(5)} />
                    </div>
                </div>
                <div className={feedback == 1 ? 'hidden' : 'flex justify-center w-full mt-4'}>
                    <DownloadButton url={process.env.API + '/' + selected?.file_result} />
                </div>
            </div>
            <div className={selected?.feedback ? 'flex justify-center w-full mt-4' : 'hidden'}>
                <DownloadButton url={process.env.API + '/' + selected?.file_result} />
            </div>
        </Modal>
    </>
}