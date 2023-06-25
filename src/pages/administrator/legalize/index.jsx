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
    const { data: datas, mutate, isLoading: datasLoading } = useSWR('/api/administrator/legalize/index?page=' + (ROUTER.query.page ? ROUTER.query.page : ''), fetcher)

    const handlePagination = index => {
        if (index.includes('Next')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) + 1 : 2;
        } else if (index.includes('Previous')) {
            index = ROUTER.query.page ? parseInt(ROUTER.query.page) - 1 : 1;
        }
        index = parseInt(index)

        if (index > datas.data?.last_page || index < 1) return
        ROUTER.push({
            pathname: '/administrator/legalize',
            query: { ...ROUTER.query, page: parseInt(index) }
        },
            undefined,
            {}
        )
    }
    const handleDelete = () => {
        setLoading(true);
        fetch(process.env.API + '/api/administrator/legalize/destroy/' + selected?.id, {
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
        <ToastContainer/>
        <NewPageLayout title={'Daftar Legalisir Ijazah'} hasBackURL backURL="/administrator">
            <div className="mt-3">
                <Table isCompact>
                    <thead>
                        <tr className="text-center">
                            <th>
                                No
                            </th>
                            <th>
                                Nama
                            </th>
                            <th>
                                No Pelayanan
                            </th>
                            <th>
                                Jenis Pelayanan
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas?.data?.data?.map((data, index) => {
                                return <>
                                    <tr className="text-center">
                                        <td>
                                            <Numbering datas={datas} index={index} />
                                        </td>
                                        <td>
                                            {data?.user?.personal_data?.name}
                                        </td>
                                        <td>
                                            {data?.service_number}
                                        </td>
                                        <td>
                                            {data?.reference_diploma_type?.name}
                                        </td>
                                        <td>
                                            <div className="flex w-full justify-end gap-3">
                                            <DeleteButton id="delete-modal" onclick={() => setSelected(data)} />
                                            <ShowButton url={'/administrator/legalize/' + data.id} />
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </Table>
                <Paginator handlePagination={handlePagination} data={datas} />

            </div>
        </NewPageLayout>
        <Modal id={'delete-modal'} title={'Hapus Data'}>
            <p className="py-3">Apakah anda yakin ingin menghapus <span className="font-semibold">{selected?.service_number}</span></p>
            <div className="flex w-full justify-end gap-3">
                <label htmlFor="delete-modal" className="btn">Tidak</label>
                <button onClick={() => handleDelete()} className="btn btn-success">Ya</button>
            </div>
        </Modal>
    </>
}