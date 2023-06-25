import NewPageLayout from "@/components/NewPageLayout";
import Table from "@/components/Table";
import ShowButton from "@/components/Button/ShowButton";
import DeleteButton from "@/components/Button/DeleteButton";
import { useState } from "react";
import AddButton from "@/components/Button/AddButton";
import Modal from "@/components/Modal";
import Select from "@/components/Input/Select";
import Text from "@/components/Input/Text";
import SubmitButtonModal from "@/components/Button/SubmitButtonModal";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { formService } from "@/services/form.service";
import { storageService } from "@/services/storage.service";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Numbering from "@/components/Numbering";
import Paginator from "@/components/Paginator";
import Date from "@/components/Input/Date";

export default function Index() {
    const TOKEN = storageService.getToken();
    const ROUTER = useRouter();
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: legalizes, mutate, isLoading: legalizesLoading } = useSWR('/api/public/legalize/index?page=' + (ROUTER.query.page ? ROUTER.query.page : ''), fetcher);
    const { data: diplomaTypes, isLoading: diplomaTypesLoading } = useSWR('/api/reference/diploma-type/index', fetcher);

    const [selected, setSelected] = useState()
    const [loading, setLoading] = useState(false)
    const options = [
        {
            id: 1,
            name: 'Legalisir Ijazah SD / SMP'
        },
        {
            id: 2,
            name: 'Legalisir Ijazah Paket A, B dan C'
        },
        {
            id: 2,
            name: 'Legalisir Ijazah Sekolah Luar Kota / Kabupaten'
        },
    ]
    const [errors, setErrors] = useState([])
    const [fileDiploma, setFileDiploma] = useState()
    const [fileTranscript, setFileTranscript] = useState()
    const fileDiplomaHandler = (e) => {
        setFileDiploma(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    const fileTranscriptHandler = (e) => {
        setFileTranscript(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    const handlePagination = index => {
        if (index.includes('Next')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) + 1 : 2;
        } else if (index.includes('Previous')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) - 1 : 1;
        }
        index = parseInt(index)

        if (index > legalizes.data?.last_page || index < 1) return
        ROUTER.push({
            pathname: '/public/legalize',
            query: { ...ROUTER.query, page: parseInt(index) }
        },
            undefined,
            {}
        )
    }

    const postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('reference_diploma_type_id', formService.getText('reference_diploma_type_id'));
        postData.append('date', formService.getText('date'));
        if(fileDiploma) 
            postData.append('file_diploma', fileDiploma);
        if(fileTranscript) 
            postData.append('file_transcript', fileTranscript);
        fetch(process.env.API + '/api/public/legalize/store', {
            method: 'POST',
            headers: {
                'authorization' : TOKEN
            },
            body : postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false)
            if(data.success) {
                setErrors([])
                toast.success('Berhasil menambah data', {
                    position : 'bottom-right'
                })
                document.getElementById('add-modal').checked = false;
                mutate([''])
            } else {
                setErrors(data.data)
                toast.error(data?.data?.error, {
                    position : 'bottom-right'
                })
                toast.error('Periksa kembali form inputan', {
                    position : 'bottom-right'
                })
            }
        })
    }

    return <>
        <Loader isLoading={legalizesLoading || diplomaTypesLoading || loading} />
        <ToastContainer />
        <NewPageLayout title={'Pelayanan Legalisir Ijazah'} hasBackURL={true} backURL="/public">
            <div className="mt-5">
                <AddButton id={'add-modal'} />
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
                                Jenis Layanan
                            </th>
                            <th>
                                Tanggal
                            </th>
                            {/* <th>
                                Feedback
                            </th> */}
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            legalizes?.data?.data?.map((legalize, index) => {
                                return (
                                    <tr className="hover text-center" key={index}>
                                        <th>
                                            <Numbering datas={legalizes} index={index} />
                                        </th>
                                        <td>
                                            {legalize.service_number}
                                        </td>
                                        <td>
                                            Legalisir {legalize.reference_diploma_type?.name}
                                        </td>
                                        <td>
                                            {legalize.created_at}
                                        </td>
                                        {/* <td>
                                            <div className={legalize.feedback ? 'rating' : 'hidden'}>
                                                {
                                                    [1, 2, 3, 4, 5].map((index) => {
                                                        if (legalize.feedback && legalize.feedback >= index) {
                                                            return <input key={index} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked disabled />
                                                        } else {
                                                            return <input key={index} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-200" disabled />
                                                        }
                                                    })
                                                }
                                            </div>
                                        </td> */}
                                        <td>
                                            <ShowButton url={'/public/legalize/' + legalize.id} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <Paginator data={legalizes} handlePagination={handlePagination}/>
        </NewPageLayout>
        <input type="checkbox" id="delete-modal" className="modal-toggle" />
        <label htmlFor="delete-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold">Konfirmasi</h3>
                <p className="py-4">Apakah anda yakin ingin menghapus <span className="font-bold">{selected}</span> ? </p>
                <div className="modal-action">
                    <label htmlFor="delete-modal" className="btn btn-outline">Tidak</label>
                    <button onClick={() => handleDelete()} className="btn">Ya</button>
                </div>
            </label>
        </label>
        <Modal id={'add-modal'} title={'Tambah Data'}>
            <form onSubmit={handleSubmit}>
                <Select options={diplomaTypes?.data} isRequired placeholder={'Pilih Jenis Layanan'} errors={errors} label={'Jenis Layanan'} id={'reference_diploma_type_id'}></Select>
                <Date isRequired placeholder={'Tanggal Membawa Berkas Fisik'} errors={errors} label={'Tanggal Membawa Berkas Fisik'} id={'date'}></Date>
                <div className="form-control w-full">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">File Ijazah</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_diploma" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileDiplomaHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_diploma")) ? errors.file_diploma[0] : ''}</span>
                        </label>
                    </label>
                </div>
                <div className="form-control w-full">
                    <label className="block">
                        <label className="label">
                            <span className="label-text font-semibold">File SKHUN / DKHUN / Transkrip</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input id="file_transcript" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileTranscriptHandler} />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.jpg, *.png Dengan Maksimal Size 2MB</span>
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file_transcript")) ? errors.file_transcript[0] : ''}</span>
                        </label>
                    </label>
                </div>
                <SubmitButtonModal id={'add-modal'} />
            </form>
        </Modal>
    </>
}
