import NewPageLayout from "@/components/NewPageLayout";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import Numbering from "@/components/Numbering";
import { storageService } from "@/services/storage.service";
import AddButton from "@/components/Button/AddButton";
import Modal from "@/components/Modal";
import Select from "@/components/Input/Select";
import Text from "@/components/Input/Text";
import Date from "@/components/Input/Date";
import SubmitButtonModal from "@/components/Button/SubmitButtonModal";
import { formService } from "@/services/form.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowButton from "@/components/Button/ShowButton";
import DownloadButton from "@/components/Button/DownloadButton";
export default function Index() {
    const TOKEN = storageService.getToken();
    const ROUTER = useRouter();
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState()
    const [feedback, setFeedback] = useState(1)
    const [errors, setErrors] = useState([])
    const [type, setType] = useState(0)
    const genders = [
        {
            id: 'Laki-laki',
            name: 'Laki-laki'
        },
        {
            id: 'Perempuan',
            name: 'Perempuan'
        }
    ]
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())
    const { data: datas, mutate, isLoading: datasLoading } = useSWR('/api/public/student-mutation/index?page=' + (ROUTER.query.page ? ROUTER.query.page : ''), fetcher)

    const { data: mutationTypes, isLoading: mutationTypesLoading } = useSWR('/api/reference/student-mutation/index', fetcher)

    const { data: religions, isLoading: religionsLoading } = useSWR('/api/reference/religion/index', fetcher)

    const { data: workUnits, isLoading: workUnitLoading } = useSWR('/api/reference/work_unit/list?exclude=1', fetcher)

    var reference_student_mutation_type = document.getElementById('reference_student_mutation_type_id');
    setTimeout(() => {
        reference_student_mutation_type = document.getElementById('reference_student_mutation_type_id');
        if(reference_student_mutation_type) {
            reference_student_mutation_type.addEventListener("change", (event) => {
                console.log('change');
                setType(event.target.value)
            })
        }
    }, 1000);


    const [fileTransferLetter, setFileTransferLetter] = useState();
    const [fileReport, setFileReport] = useState();
    const [fileApplication, setFileApplication] = useState();
    const fileTransferLetterHandler = (e) => {
        setFileTransferLetter(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    const fileReportHandler = (e) => {
        setFileReport(e.target.files[0]);
        if (e.target.files[0].size > 5097152) {
            alert("File tidak boleh lebih dari 5 MB!");
            e.target.value = "";
        };
    }

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
        postData.append('reference_student_mutation_type_id', formService.getText('reference_student_mutation_type_id'))
        postData.append('name', formService.getText('name'))
        postData.append('national_student_registration_number', formService.getText('national_student_registration_number'))
        postData.append('student_registration_number', formService.getText('student_registration_number'))
        postData.append('rank', formService.getText('rank'))
        postData.append('reason', formService.getText('reason'))
        postData.append('id_number', formService.getText('id_number'))
        postData.append('birth_place', formService.getText('birth_place'))
        postData.append('birth_date', formService.getText('birth_date'))
        postData.append('gender', formService.getText('gender'))
        postData.append('reference_religion_id', formService.getText('reference_religion_id'))
        postData.append('school_origin', formService.getText('school_origin'))
        postData.append('school_target', formService.getText('school_target'))

        if (fileTransferLetter) postData.append('file_transfer_letter', fileTransferLetter)
        if (fileReport) postData.append('file_report', fileReport)
        if (fileApplication) postData.append('file_application', fileApplication)

        fetch(process.env.API + '/api/public/student-mutation/store', {
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
                mutate([''])
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                toast.error('Gagal menambah data, periksa kembali form inputan', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }
    const handleChangeFeedback = (val) => {
        fetch(process.env.API + '/api/public/student-mutation/feedback/' + selected?.id, {
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
        <Loader isLoading={loading || mutationTypesLoading || datasLoading || religionsLoading || workUnitLoading} />
        <NewPageLayout title={'Layanan Mutasi Siswa'} hasBackURL backURL="/public" isFullWidth>
            <div className="mt-3">
                <AddButton id="add-modal" />
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>
                                No
                            </th>
                            <th>
                                Nama
                            </th>
                            <th>
                                Kode
                            </th>
                            <th>
                                Jenis Mutasi
                            </th>
                            <th>
                                Sekolah Tujuan
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                File Ket.
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
                                        <th>
                                            {data.name}
                                        </th>
                                        <td>
                                            {data.service_number}
                                        </td>
                                        <td>
                                            {data.reference_student_mutation_type?.name}
                                        </td>
                                        <td>
                                            {data.school_target}
                                        </td>
                                        <td>
                                            {
                                                (() => {
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
                                                            </span> <br />
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
                                                    Proses
                                                </label>
                                            </div>

                                        </td>
                                        <td>
                                            <ShowButton url={'/public/student-mutation/' + data.id} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </NewPageLayout>
        <Modal id={'add-modal'} title={'Tambah Data Mutasi Siswa'}>
            <form onSubmit={handleSubmit}>
                <Select options={mutationTypes?.data} isRequired placeholder={'Pilih Jenis Mutasi'} errors={errors} label={'Jenis Mutasi'} id={'reference_student_mutation_type_id'}></Select>

                <Text id={'name'} label={'Nama siswa'} placeholder={'Masukkan nama siswa'} isRequired errors={errors} />

                <Text id={'national_student_registration_number'} label={'Nomor Induk Siswa Nasional'} placeholder={'Masukkan NISN'} isRequired errors={errors} />

                <Text id={'student_registration_number'} label={'Nomor Induk Siswa'} placeholder={'Masukkan NIS'} isRequired errors={errors} />

                <Text id={'rank'} label={'Jenjang Kelas'} placeholder={'Kelas XX'} isRequired errors={errors} />

                <Text id={'reason'} label={'Alasan Pindah'} placeholder={'Masukkan alasan'} isRequired errors={errors} />

                <Text isNumber id={'id_number'} label={'NIK'} placeholder={'Masukkan 16 digit NIK'} isRequired errors={errors} />

                <Text id={'birth_place'} label={'Tempat Lahir'} placeholder={'Masukkan Tempat Lahir'} isRequired errors={errors} />

                <Date id={'birth_date'} label={'Tanggal Lahir'} placeholder={'Masukkan Tanggal Lahir'} isRequired errors={errors} />

                <Select options={genders} isRequired placeholder={'Pilih Jenis Kelamin'} errors={errors} label={'Jenis Kelamin'} id={'gender'}></Select>

                <Select options={religions?.data} isRequired placeholder={'Pilih Agama'} errors={errors} label={'Agama'} id={'reference_religion_id'}></Select>
                
                <Select options={workUnits?.data} isRequired placeholder={type == 2 ? 'Pilih Sekolah Asal' : 'Pilih Sekolah Tujuan'} errors={errors} label={type == 2 ? 'Sekolah Asal' : 'Sekolah Tujuan'} id={type == 2 ? 'school_origin' : 'school_target'}></Select>

                <Text id={type != 2 ? 'school_origin' : 'school_target'} label={type != 2 ? 'Sekolah Asal' : 'Sekolah Tujuan'} placeholder={type != 2 ? 'Masukkan Sekolah Asal' : 'Masukkan Sekolah Tujuan'} isRequired errors={errors} />

                <div className="form-control w-full border border-gray-300 mb-4">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">Surat Mutasi (Husus Mutasi Masuk)</span>
                            {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                        </label>
                        <input id="file_transfer_letter" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileTransferLetterHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_transfer_letter")) ? errors.file_transfer_letter[0] : ''}</span>
                        </label>
                    </label>
                </div>

                <div className="form-control w-full border border-gray-300 mb-4">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">Raport</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_report" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileReportHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 5MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_report")) ? errors.file_report[0] : ''}</span>
                        </label>
                    </label>
                </div>

                <div className="form-control w-full border border-gray-300">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">Surat Permohonan</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_application" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileApplicationHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_application")) ? errors.file_application[0] : ''}</span>
                        </label>
                    </label>
                </div>

                <SubmitButtonModal id={'add-modal'} />
            </form>
        </Modal>
        <Modal id={'show-modal'} title={'Unduh File Surat Mutasi'}>
            <div className={selected?.feedback != null ? 'hidden' : ''}>
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