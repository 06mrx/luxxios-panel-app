import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import { useRouter } from "next/router";
import Table from "@/components/Table";
import DownloadButton from "@/components/Button/DownloadButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Index() {
    const TOKEN = storageService.getToken();
    const [loading, setLoading] = useState(false)
    const ROUTER = useRouter();
    let id = ROUTER.query.id ? ROUTER.query.id : '';
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: legalize, isLoading: dataLoading } = useSWR('/api/administrator/legalize/show/' + id, id ? fetcher : null)

    
    return <>
        <Loader isLoading={loading || dataLoading} />
        <ToastContainer />
        <NewPageLayout title={'Detail Data'} hasBackURL backURL="/administrator/legalize">
            <div className="mt-3">
                <Table isCompact>
                    <tbody>
                        <tr>
                            <th>
                                Kode Pelayanan
                            </th>
                            <td>
                                {legalize?.data?.service_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Jenis Layanan
                            </th>
                            <td>
                                Legalisir {legalize?.data?.reference_diploma_type?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Ijazah
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + legalize?.data?.file_diploma} hidden={legalize?.data?.file_diploma ? false : true} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Transkrip / SKHUN / DKHUN
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + legalize?.data?.file_transcript} hidden={legalize?.data?.file_transcript ? false : true} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </NewPageLayout>
    </>
}