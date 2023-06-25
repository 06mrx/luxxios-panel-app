import DownloadButton from "@/components/Button/DownloadButton";
import NewPageLayout from "@/components/NewPageLayout";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import useSWR from 'swr';
import Loader from "@/components/Loader";
import { useState } from "react";
import { storageService } from "@/services/storage.service";
import DivCard from "@/components/DivCard";
import AddButton from "@/components/Button/AddButton";
import Modal from "@/components/Modal";
import Select from "@/components/Input/Select";
import SubmitButtonModal from "@/components/Button/SubmitButtonModal";
import { formService } from "@/services/form.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteButton from "@/components/Button/DeleteButton";
export default function Detail() {
    const ROUTER = useRouter();
    let id = ROUTER.query.id ? ROUTER.query.id : '';
    const TOKEN = storageService.getToken();
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())
    const [errors, setErrors] = useState();
    const { data: diplomaReplacement, mutate, isLoading: dataLoading } = useSWR('/api/public/diploma-replacement/show/' + id, id ? fetcher : null);
    const { data: subjects, isLoading: subectLoading } = useSWR('/api/reference/subject/index', fetcher)
    const [loading, setLoading] = useState(false);

    const options = [
        {
            id: 'Satu',
            name: 1
        },
        {
            id: 'Dua',
            name: 2
        },
        {
            id: 'Tiga',
            name: 3
        },
        {
            id: 'Empat',
            name: 4
        },
        {
            id: 'Lima',
            name: 5
        },
        {
            id: 'Enam',
            name: 6
        },
        {
            id: 'Tujuh',
            name: 7
        },
        {
            id: 'Delapam',
            name: 8
        },
        {
            id: 'Sembilan',
            name: 9
        },
        {
            id: 'Sepuluh',
            name: 10
        },
    ]

    const getScore = id => {
        let score = '';
        switch (id) {
            case 'Satu':
                score = 1;
                break;
            case 'Dua':
                score = 2;
                break;
            case 'Tiga':
                score = 3;
                break;
            case 'Empat':
                score = 4;
                break;
            case 'Lima':
                score = 5;
                break;
            case 'Enam':
                score = 6;
                break;
            case 'Tujuh':
                score = 7;
                break;
            case 'Delapan':
                score = 8;
                break
            case 'Sembilan':
                score = 9;
                break;
            case 'Sepuluh':
                score = 10;
                break;
        }
        return score;
    }

    let postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('diploma_replacement_id', id)
        postData.append('reference_subject_id', formService.getText('reference_subject_id'))
        postData.append('score_letter', formService.getText('score_letter'))
        postData.append('score_number', getScore(formService.getText('score_letter')))

        fetch(process.env.API + '/api/public/diploma-replacement/score/store/' + id, {
            method: 'POST',
            headers: {
                'authorization': TOKEN
            },
            body: postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data?.success) {
                setErrors([])
                formService.resetText()
                toast.success('Berhasil Menambah Data', {
                    position: 'bottom-right'
                })
                formService.resetText('reference_subject_id');
                formService.resetText('score_letter');
                formService.resetText('score_number');
                document.getElementById('add-modal').checked = false;
                mutate([''])
            } else {
                toast.error(data?.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data?.data)
            }
        })
    }

    const handleLock = () => {
        setLoading(true);
        fetch(process.env.API + '/api/public/diploma-replacement/lock/' + id, {
            method: 'POST',
            headers: {
                'authorization' : TOKEN
            }
        }).then((res) => res.json()).then((data) => {
            if(data.success) {
                ROUTER.push('/public/diploma-replacement')
            }
        })
    }
    return <>
        <Loader isLoading={dataLoading || loading || subectLoading} />
        <ToastContainer/>
        <NewPageLayout title={'Detail Penggantian Ijazah'} hasBackURL backURL="/public/diploma-replacement">
            <div className="mt-3">
                <Table isCompact>
                    <tbody>
                        <tr>
                            <th>
                                No Pelayanan
                            </th>
                            <td>
                                {diplomaReplacement?.data?.service_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama
                            </th>
                            <td>
                                {diplomaReplacement?.data?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                NIK
                            </th>
                            <td>
                                {diplomaReplacement?.data?.id_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Tempat Tanggal Lahir
                            </th>
                            <td>
                                {diplomaReplacement?.data?.birth_place}, {diplomaReplacement?.data?.birth_date}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama Orangtua
                            </th>
                            <td>
                                {diplomaReplacement?.data?.parent_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                No Surat Hilang
                            </th>
                            <td>
                                {diplomaReplacement?.data?.lost_letter_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Penerbit Surat Hilang
                            </th>
                            <td>
                                {diplomaReplacement?.data?.lost_letter_issuer}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Status
                            </th>
                            <td>
                                {
                                    (() => {
                                        if (!diplomaReplacement?.data?.is_locked) {
                                            return <span className="badge badge-warning">
                                                Belum Dikunci
                                            </span>
                                        } else {
                                            if (diplomaReplacement?.data?.is_rejected) {
                                                return <span className="badge badge-error">
                                                    Pengajuan Ditolak
                                                </span>
                                            } else if (!diplomaReplacement?.data?.is_principal_approve) {
                                                return <span className="badge badge-warning">
                                                    Menunggu Persetujuan Kepala Sekolah
                                                </span>
                                            } else if (!diplomaReplacement?.data?.is_head_section_approve) {
                                                return <span className="badge badge-warning">
                                                    Menunggu Persetujuan Kepala Bidang
                                                </span>
                                            } else if (!diplomaReplacement?.data?.is_head_office_approve) {
                                                return <span className="badge badge-warning">
                                                    Menunggu Persetujuan Kepala Dinas
                                                </span>
                                            } else if (diplomaReplacement?.data?.is_principal_approve && diplomaReplacement?.data?.is_head_section_approve && diplomaReplacement?.data?.is_head_office_approve) {
                                                return <span className="badge badge-success">
                                                    Pengajuan Diterima
                                                </span>
                                            }
                                        }
                                    })()
                                }
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Surat Keterangan Hilang
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + diplomaReplacement?.data?.file_lost_letter} hidden={diplomaReplacement?.data?.file_lost_letter ? false : true} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Formulir Saksi
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + diplomaReplacement?.data?.file_form_witness} hidden={diplomaReplacement?.data?.file_form_witness ? false : true} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Penanggung Jawab Mutlak
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + diplomaReplacement?.data?.file_absolute_liability} hidden={diplomaReplacement?.data?.file_absolute_liability ? false : true} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="mt-5">
                <DivCard>
                    <div className="flex justify-between w-full items-center">
                        <h1 className="font-semibold text-xl w-full">Transkrip Nilai</h1>
                        <label htmlFor="lock-modal" className={diplomaReplacement?.data?.diploma_replacement_score_evaluation_list?.length <= 0 || diplomaReplacement?.data?.is_locked ? 'hidden' : 'btn btn-warning'}>
                            Kunci
                        </label>
                        <div className={diplomaReplacement?.data?.is_locked ? 'hidden' : 'w-full'}>
                            <AddButton id="add-modal" />
                        </div>
                    </div>
                    <Table isCompact>
                        <thead>
                            <tr>
                                <th>
                                    No
                                </th>
                                <th>
                                    Nama Mapel
                                </th>
                                <th>
                                    Nilai Angka
                                </th>
                                <th>
                                    Nilai Huruf
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                diplomaReplacement?.data?.diploma_replacement_score_evaluation_list?.map((score, index) => {
                                    return (
                                        <tr className="hover" key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {score.reference_subject?.name}
                                            </td>
                                            <td>
                                                {score.score_number}
                                            </td>
                                            <td>
                                                {score.score_letter}
                                            </td>
                                            <td>
                                                <div className={diplomaReplacement?.data?.is_locked ? 'hidden' : ''}>
                                                    <DeleteButton id="delete-modal" />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className={diplomaReplacement?.data?.diploma_replacement_score_evaluation_list?.length <= 0 ? 'hover text-center' : 'hidden'}>
                                <td colSpan={6}>
                                    <div className="border border-error p-3 text-xl">
                                        Belum ada data transkrip, Silahkan tambah data terlebih dahulu
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </DivCard>
            </div>
        </NewPageLayout>
        <Modal id={'add-modal'} title={'Tambah  Nilai Mata Pelajaran'}>
            <form onSubmit={handleSubmit}>
                <Select id={'reference_subject_id'} options={subjects?.data} label={'Mata Pelajaran'} placeholder={'Pilih Mata Pelajaran'} isRequired errors={errors} />

                <Select id={'score_letter'} options={options} label={'Nilai'} placeholder={'Pilih Nilai'} isRequired errors={errors} />

                <SubmitButtonModal id={'add-modal'} />
            </form>
        </Modal>
        <Modal id={'lock-modal'} title={'Kunci Transkrip'}>
            <div className="border border-warning p-2 rounded-xl mt-5">
                <span className="font-bold">Pastikan Data Anda Sudah Benar.</span> Apabila Transkrip Telah Dikunci, Maka Transkrip Tidak Dapat Diubah Lagi
            </div>
            <button onClick={ () => handleLock()} className="btn btn-success w-full mt-3">
                Kunci
            </button>
        </Modal>
    </>
}