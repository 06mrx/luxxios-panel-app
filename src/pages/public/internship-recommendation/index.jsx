import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import AddButton from "@/components/Button/AddButton";
import Table from "@/components/Table";
import { formService } from "@/services/form.service";
import { useRouter } from "next/router";
import Numbering from "@/components/Numbering";
import ShowButton from "@/components/Button/ShowButton";
import Modal from "@/components/Modal";
import Text from "@/components/Input/Text";
import Select from "@/components/Input/Select";
import Date from "@/components/Input/Date";
import SubmitButtonModal from "@/components/Button/SubmitButtonModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadButton from "@/components/Button/DownloadButton";
export default function Index() {
    const TOKEN = storageService.getToken();
    const ROUTER = useRouter();
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [feedback, setFeedback] = useState(1)
    const [errors, setErrors] = useState(false)
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: datas, mutate, isLoading: datasLoading } = useSWR('/api/public/internship-recommendation/index?page=' + (ROUTER.query.page ? ROUTER.query.page : ''), fetcher)

    const { data: workUnits, isLoading: workUnitLoading } = useSWR('/api/reference/work_unit/list', fetcher)

    const [fileApplication, setFileApplication] = useState();
    const fileApplicationHandler = (e) => {
        setFileApplication(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    let postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('reference_work_unit_id', formService.getText('reference_work_unit_id'))
        postData.append('applican_institution', formService.getText('applican_institution'))
        postData.append('reason', formService.getText('reason'))
        postData.append('pic_name', formService.getText('pic_name'))
        postData.append('pic_phone_number', formService.getText('pic_phone_number'))
        postData.append('pic_position', formService.getText('pic_position'))
        postData.append('start_date', formService.getText('start_date'))
        postData.append('end_date', formService.getText('end_date'))
        if (fileApplication) postData.append('file_application', fileApplication)

        fetch(process.env.API + '/api/public/internship-recommendation/store', {
            method: 'POST',
            headers: {
                'authorization': TOKEN
            },
            body: postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success('Berhasil Menambah Data', {
                    position: 'bottom-right'
                })
                formService.resetText('name');
                document.getElementById('add-modal').checked = false;
                ROUTER.push('/public/internship-recommendation/' + data.data)
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                toast.error('Mohon periksa kembali form isian!', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    const handleChangeFeedback = (val) => {
        fetch(process.env.API + '/api/public/internship-recommendation/feedback/' + selected?.id, {
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
        <ToastContainer />
        <Loader isLoading={loading || datasLoading || workUnitLoading} />
        <NewPageLayout title={'Rekomendasi Penelitian / Magang'} hasBackURL backURL="/public">
            <div className="mt-3">
                <AddButton id="add-modal" />
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
                                Jangka Waktu
                            </th>
                            <th>
                                Status
                            </th>
                            <th>File Persetujuan</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas?.data?.data?.map((data, index) => {
                                return (
                                    <tr className="hover text-center" key={index}>
                                        <th>
                                            <Numbering datas={datas} index={index} />
                                        </th>
                                        <td>
                                            {data.service_number}
                                        </td>
                                        <td>
                                            {data.start_date} - {data.end_date}
                                        </td>
                                        <td>
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
                                                        } else if (!data.is_institution_head_approve) {
                                                            return <span className="badge badge-warning">
                                                                Menunggu Persetujuan Kepala Institusi
                                                            </span>
                                                        } else if (!data.is_head_office_approve) {
                                                            return <span className="badge badge-warning">
                                                                Menunggu Persetujuan Kepala Dinas
                                                            </span>
                                                        } else if (data.is_institution_head_approve && data.is_head_office_approve) {
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
                                            <ShowButton url={'/public/internship-recommendation/' + data.id} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </NewPageLayout>
        <Modal id={'add-modal'} title={'Tambah Data'}>
            <form onSubmit={handleSubmit}>
                <Select id={'reference_work_unit_id'} placeholder={'Pilih Instansi Tujuan'} label={'Instansi Tujuan'} isRequired errors={errors} options={workUnits?.data} />

                <Text id={'applican_institution'} label={'Institusi Asal'} placeholder={'Masukkan nama institusi anda'} isRequired errors={errors} />

                <Text id={'reason'} label={'Alasan / Tujuan'} placeholder={'Masukkan alasan'} isRequired errors={errors} />

                <Text id={'pic_name'} label={'Nama Penanggung Jawab'} placeholder={'Masukkan nama penanggung jawab'} isRequired errors={errors} />

                <Text id={'pic_phone_number'} label={'No. Telepon Penanggung Jawab'} placeholder={'Masukkan nomor telepon'} isRequired errors={errors} />

                <Text id={'pic_position'} label={'Jabatan Penanggung Jawab'} placeholder={'Masukkan jabatan'} isRequired errors={errors} />

                <Date id={'start_date'} label={'Tanggal Mulai Masuk'} isRequired errors={errors} />

                <Date id={'end_date'} label={'Tanggal Berakhir'} isRequired errors={errors} />

                <div className="form-control w-full">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">Surat Permohonan</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_application" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileApplicationHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_application")) ? errors.file_application[0] : ''}</span>
                        </label>
                    </label>
                </div>

                <SubmitButtonModal id={'add-modal'} />
            </form>
        </Modal>
        <Modal id={'show-modal'} title={'Unduh File Persetujuan'}>
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