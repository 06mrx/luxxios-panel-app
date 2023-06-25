import AddButton from "@/components/Button/AddButton";
import { formService } from "@/services/form.service";
import ShowButton from "@/components/Button/ShowButton";
import Modal from "@/components/Modal";
import NewPageLayout from "@/components/NewPageLayout";
import Table from "@/components/Table";
import Text from "@/components/Input/Text";
import { useState } from "react";
import Date from "@/components/Input/Date";
import Select from "@/components/Input/Select";
import SubmitButtonModal from "@/components/Button/SubmitButtonModal";
import Loader from "@/components/Loader";
import useSWR from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storageService } from "@/services/storage.service";
import { useRouter } from "next/router";
import Numbering from "@/components/Numbering";
import Paginator from "@/components/Paginator";
import { error } from "daisyui/src/colors";
import DownloadButton from "@/components/Button/DownloadButton";
export default function Index() {
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState();
    const [feedback, setFeedback] = useState(1)
    const [selected, setSelected] = useState(1)
    const TOKEN = storageService.getToken();
    const ROUTER = useRouter();
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: datas, mutate, isLoading: datasLoading } = useSWR('/api/public/diploma-replacement/index?page=' + (ROUTER.query.page ? ROUTER.query.page : ''), fetcher)
    const { data: workUnits, isLoading: workUnitLoading } = useSWR('/api/reference/work_unit/list?exclude=1', fetcher)
    const { data: diplomaReplacementTypes, isLoading: diplomaReplacementTypesLoading } = useSWR('/api/reference/diploma-replacement-type/index', fetcher);

    const handlePagination = index => {
        if (index.includes('Next')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) + 1 : 2;
        } else if (index.includes('Previous')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) - 1 : 1;
        }
        index = parseInt(index)

        if (index > datas.data?.last_page || index < 1) return
        ROUTER.push({
            pathname: '/public/diploma-replacement',
            query: { ...ROUTER.query, page: parseInt(index) }
        },
            undefined,
            {}
        )
    }

    const [fileLostLetter, setFileLostLetter] = useState();
    const [fileFormWitness, setFileFormWitness] = useState();
    const [fileAbsluteLiability, setFileAbsluteLiability] = useState();
    const fileLostLetterHandler = (e) => {
        setFileLostLetter(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    const fileFormWitnessHandler = (e) => {
        setFileFormWitness(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    const fileAbsluteLiabilityHandler = (e) => {
        setFileAbsluteLiability(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    let postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('name', formService.getText('name'))
        postData.append('reference_diploma_replacement_type_id', formService.getText('reference_diploma_replacement_type_id'))
        postData.append('id_number', formService.getText('id_number'))
        postData.append('birth_place', formService.getText('birth_place'))
        postData.append('birth_date', formService.getText('birth_date'))
        postData.append('parent_name', formService.getText('parent_name'))
        postData.append('lost_letter_number', formService.getText('lost_letter_number'))
        postData.append('lost_letter_issuer', formService.getText('lost_letter_issuer'))
        postData.append('lost_letter_reason', formService.getText('lost_letter_reason'))
        postData.append('school', formService.getText('school'))
        postData.append('study_year', formService.getText('study_year'))
        if (formService.getText('reference_work_unit_id')) {
            postData.append('reference_work_unit_id', formService.getText('reference_work_unit_id'))
        }
        postData.append('student_registration_number', formService.getText('student_registration_number'))
        if (fileLostLetter) postData.append('file_lost_letter', fileLostLetter)
        if (fileFormWitness) postData.append('file_form_witness', fileFormWitness)
        if (fileAbsluteLiability) postData.append('file_absolute_liability', fileAbsluteLiability)




        fetch(process.env.API + '/api/public/diploma-replacement/store', {
            method: 'POST',
            headers: {
                'authorization': TOKEN
            },
            body: postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                formService.resetText('name');
                formService.resetText('reference_diploma_replacement_type_id');
                formService.resetText('id_number');
                formService.resetText('birth_place');
                formService.resetText('birth_date');
                formService.resetText('parent_name');
                formService.resetText('lost_letter_number');
                formService.resetText('lost_letter_issuer');
                formService.resetText('lost_letter_reason');
                formService.resetText('study_year');
                formService.resetText('reference_work_unit_id');
                formService.resetText('student_registration_number');
                formService.resetText('file_lost_letter');
                formService.resetText('file_form_witness');
                formService.resetText('file_absolute_liability');
                setErrors([])
                toast.success('Berhasil Menambah Data', {
                    position: 'bottom-right'
                })
                formService.resetText('name');
                document.getElementById('add-modal').checked = false;
                mutate([''])
                ROUTER.push('/public/diploma-replacement/' + data.data)
            } else {
                toast.error('Gagal menambahkan data', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }
    const handleChangeFeedback = (val) => {
        fetch(process.env.API + '/api/public/diploma-replacement/feedback/' + selected?.id, {
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
    const handleFeedback = event => {
        event.preventDefault();
    }
    return <>
        <ToastContainer />
        <Loader isLoading={loading || datasLoading || workUnitLoading || diplomaReplacementTypesLoading} />
        <NewPageLayout title={'Penggantian Ijazah'} hasBackURL backURL="/public">
            <AddButton id="add-modal" />
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
                                        <ShowButton url={'/public/diploma-replacement/' + data.id} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr className={datas?.data?.data?.length <= 0 ? 'hover text-center' : 'hidden'}>
                        <td colSpan={6}>
                            Tidak ada data
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Paginator data={datas} handlePagination={handlePagination} />
        </NewPageLayout>
        <Modal title={'Tambah Data'} id={'add-modal'}>
            <form onSubmit={handleSubmit}>
                <Select id={'reference_diploma_replacement_type_id'} label={'Jenis Penggantian Ijazah'} placeholder={'Pilih Jenis Penggatian Ijazah'} isRequired errors={errors} options={diplomaReplacementTypes?.data} />

                <Text id={'name'} label={'Nama Siswa'} placeholder={'Masukkan Nama Siswa'} isRequired errors={errors} />

                <Text id={'id_number'} label={'NIK'} placeholder={'Masukkan 16 Digit NIK'} isRequired errors={errors} />

                <Text id={'birth_place'} label={'Tempat Lahir'} placeholder={'Masukkan Tempat Lahir'} isRequired errors={errors} />

                <Date id={'birth_date'} label={'Tanggal Lahir'} placeholder={'Masukkan Tanggal Lahir'} isRequired errors={errors} />

                <Text id={'parent_name'} label={'Nama Orangtua'} placeholder={'Masukkan Nama Orang Tua'} isRequired errors={errors} />

                <div className="flex flex-col md:flex-row lg:flex-row md:gap-2 lg:gap-2">
                    <Text id={'lost_letter_number'} label={'Nomor Surat Ket. Hilang'} placeholder={'Masukkan Nomor Surat'} isRequired errors={errors} />
                    <Text id={'lost_letter_issuer'} label={'Penerbit Surat'} placeholder={'Masukkan Nama Penerbit Surat'} isRequired errors={errors} />
                </div>
                <Text id={'lost_letter_reason'} label={'Alasan Kehilangan (Sesuai Yang Tertera Pada Surat)'} placeholder={'Masukkan Alasan'} isRequired errors={errors} />

                <Select id={'reference_work_unit_id'} label={'Sekolah'} placeholder={'Pilih Sekolah'} errors={errors} options={workUnits?.data} />

                <Text id={'school'} label={'Sekolah (Jika tidak ada pada pilihan)'} placeholder={'Masukkan Nama Sekolah Asal'} errors={errors} />

                <Text id={'study_year'} label={'Tahun ajaran (Pada Ijazah)'} placeholder={'Masukkan Tahun AJaran'}
                    isRequired errors={errors} />

                <Text id={'student_registration_number'} label={'Nomor Induk Siswa'} placeholder={'Masukkan Nomor Induk Siswa'} isRequired errors={errors} />

                <div className="form-control w-full">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">Surat Kehilangan</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_lost_letter" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileLostLetterHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_lost_letter")) ? errors.file_lost_letter[0] : ''}</span>
                        </label>
                    </label>
                </div>

                <div className="form-control w-full">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">Formulir Saksi</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_form_witness" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileFormWitnessHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_form_witness")) ? errors.file_form_witness[0] : ''}</span>
                        </label>
                    </label>
                </div>

                <div className="form-control w-full">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">Berkas Penanggung Jawab Mutlak</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_absolute_liability" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileAbsluteLiabilityHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_absolute_liability")) ? errors.file_absolute_liability[0] : ''}</span>
                        </label>
                    </label>
                </div>

                <SubmitButtonModal id={'add-modal'} />

            </form>
        </Modal>
        <Modal id={'show-modal'} title={'Unduh File Pengganti Ijazah'}>
            <div className={selected?.feedback ? 'hidden' : ''}>
                <p>Beri feedback sebelum mendonwload file, pilih 1 - 5</p>
                <form onSubmit={handleFeedback}>
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
                </form>
            </div>
            <div className={selected?.feedback ? 'flex justify-center w-full mt-4' : 'hidden'}>
                <DownloadButton url={process.env.API + '/' + selected?.file_result} />
            </div>
        </Modal>
    </>
}