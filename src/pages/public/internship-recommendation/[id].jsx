import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import { useRouter } from "next/router";
import DownloadButton from "@/components/Button/DownloadButton";
import Table from "@/components/Table";
import AddButton from "@/components/Button/AddButton";
import Modal from "@/components/Modal";
import Text from "@/components/Input/Text";
import Date from "@/components/Input/Date";
import AsyncSelect from "react-select/async"
import { useRef } from "react";
import SubmitButtonModal from "@/components/Button/SubmitButtonModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formService } from "@/services/form.service";

export default function Index() {
    const TOKEN = storageService.getToken();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const ROUTER = useRouter();
    let id = ROUTER.query.id ? ROUTER.query.id : '';
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: detail, mutate, isLoading: dataLoading } = useSWR('/api/public/internship-recommendation/show/' + id, id ? fetcher : null)

    const village_id = useRef()
    const handleVillageChange = (e) => {
        village_id.current = e;
    }

    const getVillageOptions = (searchTerm, callback) => {
        fetch(process.env.API + '/api/reference/village/search?terms=' + searchTerm, {
            method: 'GET',
            headers: {
                'Authorization': TOKEN
            }
        }).then((res) => res.json()).then((data) => callback(data.data))
    }

    let postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('name', formService.getText('name'))
        postData.append('id_number', formService.getText('id_number'))
        postData.append('birth_place', formService.getText('birth_place'))
        postData.append('birth_date', formService.getText('birth_date'))
        postData.append('address', formService.getText('address'))
        postData.append('zip_code', formService.getText('zip_code'))
        postData.append('phone_number', formService.getText('phone_number'))
        postData.append('village_id', village_id.current?.value)

        fetch(process.env.API + '/api/public/internship-recommendation/participant/store/' + id, {
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
                formService.resetText('id_number');
                formService.resetText('birth_place');
                formService.resetText('birth_date');
                formService.resetText('address');
                formService.resetText('zip_code');
                formService.resetText('phone_number');
                village_id.current = '';
                document.getElementById('add-modal').checked = false;
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                toast.error('Mohon periksa kembali form isian', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    const handleLock = () => {
        setLoading(true);
        fetch(process.env.API + '/api/public/internship-recommendation/lock/' + id, {
            method: 'POST',
            headers: {
                'authorization' : TOKEN
            }
        }).then((res) => res.json()).then((data) => {
            if(data.success) {
                ROUTER.push('/public/internship-recommendation')
            } else {
                toast.error(data.data.error, {
                    position: 'bottom-right'
                })
                setLoading(false)
            }
        })
    }

    return <>
        <ToastContainer />
        <Loader isLoading={loading || dataLoading} />
        <NewPageLayout title={'Detail Pengajuan'} hasBackURL backURL="/public/internship-recommendation">
            <div className="mt-3">
                <Table>
                    <tbody>
                        <tr>
                            <th>
                                Kode Pelayanan
                            </th>
                            <td>
                                {detail?.data?.service_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Instansi Tujuan
                            </th>
                            <td>
                                {detail?.data?.reference_work_unit?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Permohonan
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + detail?.data?.file_application} hidden={detail?.data?.file_application ? false : true} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Tanggal Mulai
                            </th>
                            <td>
                                {detail?.data?.start_date}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Tanggal Selesai
                            </th>
                            <td>
                                {detail?.data?.end_date}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama Penanggung Jawab
                            </th>
                            <td>
                                {detail?.data?.pic_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                No. Telepon Penanggung Jawab
                            </th>
                            <td>
                                {detail?.data?.pic_phone_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Jabatan Penanggung Jawab
                            </th>
                            <td>
                                {detail?.data?.pic_position}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Status
                            </th>
                            <td>
                                {
                                    (() => {
                                        if (!detail?.data?.is_locked) {
                                            return <span className="badge badge-warning">
                                                Belum Dikunci
                                            </span>
                                        } else {
                                            if (detail?.data?.is_rejected) {
                                                return <>
                                                    <span className="badge badge-error mb-2">
                                                        Pengajuan Ditolak
                                                    </span> <br />
                                                    <p><span className="font-semibold">Alasan :</span> {detail?.data?.rejected_reason}</p>
                                                </>
                                            } else if (!detail?.data?.is_institution_head_approve) {
                                                return <span className="badge badge-warning">
                                                    Menunggu Persetujuan Kepala Institusi
                                                </span>
                                            } else if (!detail?.data?.is_head_office_approve) {
                                                return <span className="badge badge-warning">
                                                    Menunggu Persetujuan Kepala Dinas
                                                </span>
                                            } else if (detail?.data?.is_institution_head_approve && detail?.data?.is_head_office_approve) {
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
                        </tr>
                        <tr>
                            <th>
                                File Persetujuan
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + detail?.data?.file_result} hidden={detail?.data?.file_result ? false : true} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <h1 className="text-2xl font-bold mt-10">Peserta Magang / Penelitian</h1>
                <div className={detail?.data?.is_locked ? 'hidden' : 'flex w-full justify-end gap-2 mb-3'}>
                    <label htmlFor="lock-modal" className="btn btn-warning">
                        Kunci
                    </label>
                    <label htmlFor="add-modal" className="btn btn-success">
                        Tambah 
                    </label>
                </div>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>
                                No
                            </th>
                            <th>
                                NIK
                            </th>
                            <th>
                                TTL
                            </th>
                            <th className="text-left">
                                Alamat
                            </th>
                            <th>
                                No. Telepon
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detail?.data?.internship_recommendation_participant_list?.map((participant, index) => {
                                return (
                                    <tr className="hover text-center" key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {participant.id_number}
                                        </td>
                                        <td>
                                            {participant.birth_place}, {participant.birth_date}
                                        </td>
                                        <td className=" whitespace-normal text-left">
                                            {participant.address}, {participant.village}, {participant.district}, {participant.city}, PROPINSI {participant.province}
                                        </td>
                                        <td>
                                            {participant.phone_number}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className={detail?.data?.internship_recommendation_participant_list?.length <= 0 ? 'hover text-center' : 'hidden'}>
                            <td colSpan={5}>
                                <p className="border-red-500 p-2 border text-lg">
                                    Tidak ada data, Silahkan <span className="font-semibold">tambahkan peserta</span> sebelum melanjutkan
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </NewPageLayout>
        <Modal id={'add-modal'} title={'Tambah Peserta Magang / Penelitian'}>
            <form onSubmit={handleSubmit}>
                <Text id={'name'} label={'Nama Lengkap'} placeholder={'Masukkan nama lengkap'} isRequired errors={errors} />
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Kelurahan / Desa</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <AsyncSelect
                        cacheOptions
                        onChange={handleVillageChange}
                        loadOptions={getVillageOptions}
                        placeholder={"Pilih Kecamatan (Cari Kecamatan)"}
                        defaultOptions
                    />
                    <label className="label">
                        <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("village_id")) ? errors.village_id[0] : ''}</span>
                    </label>
                </div>
                <Text isNumber id={'id_number'} label={'NIK'} placeholder={'Masukkan NIK'} isRequired errors={errors} />
                <Text id={'birth_place'} label={'Tempat Lahir'} placeholder={'Masukkan tempat kelahiran'} isRequired errors={errors} />
                <Date id={'birth_date'} label={'Tanggal Lahir'} placeholder={'Masukkan tempat kelahiran'} isRequired errors={errors} />
                <Text id={'address'} label={'Alamat (Nama Jalan)'} placeholder={'Masukkan alamat'} isRequired errors={errors} />
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3">
                    <Text isNumber id={'zip_code'} label={'Kode Pos'} placeholder={'Masukkan kode pos'} isRequired errors={errors} />
                    <Text id={'phone_number'} label={'Nomor Telepon'} placeholder={'Masukkan nomor telepon'} isRequired errors={errors} />
                </div>
                <SubmitButtonModal id={'add-modal'} />
            </form>
        </Modal>
        <Modal id={'lock-modal'} title={'Kunci Pengajuan'}>
            <div className="border border-warning p-2 rounded-xl mt-5">
                <span className="font-bold">Pastikan Data Anda Sudah Benar.</span> Apabila Telah Dikunci, Maka Data Tidak Dapat Diubah Lagi
            </div>
            <button onClick={ () => handleLock()} className="btn btn-success w-full mt-3">
                Kunci
            </button>
        </Modal>
    </>
}