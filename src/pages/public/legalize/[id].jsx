import NewPageLayout from "@/components/NewPageLayout";
import Table from "@/components/Table";
import DownloadButton from "@/components/Button/DownloadButton";
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import Loader from "@/components/Loader";
import useSWR from 'swr';
export default function Detail() {
    const router = useRouter();
    let id = router.query.id;
    if (router.isReady) id = router.query.id;
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': storageService.getToken()
        }
    }).then((res) => res.json())

    const { data: legalize, isLoading } = useSWR('/api/public/legalize/show/' + id, id ? fetcher : null)
    return <>
        <Loader isLoading={isLoading} />
        <NewPageLayout title={'Detail Layanan'} hasBackURL={true} backURL="/public/legalize">
            <div className="mt-5">
                <Table isCompact>
                    <tbody>
                        {/*<tr>
                             <th>
                                Nama
                            </th>
                            <td>
                                Ilham
                            </td>
                        </tr>
                        <tr>
                            <th>
                                NIK
                            </th>
                            <td>
                                12345678
                            </td>
                        </tr> */}
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
                        <tr>
                            <th>
                                Feedback
                            </th>
                            <td>
                                <div className={legalize?.data?.feedback ? 'rating' : 'hidden'}>
                                    {
                                        [1, 2, 3, 4, 5].map((index) => {
                                            if (legalize?.data?.feedback && legalize?.data?.feedback >= index) {
                                                return <input key={index} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked disabled />
                                            } else {
                                                return <input key={index} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-200" disabled />
                                            }
                                        })
                                    }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        </NewPageLayout>
    </>
}