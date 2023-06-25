import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import { useRouter } from "next/router";
import Table from "@/components/Table";
import DownloadButton from "@/components/Button/DownloadButton";
import Image from "next/image";
import Link from "next/link";
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

    const { data: detail, isLoading: dataLoading } = useSWR('/api/public/cultural-heritage/show/' + id, id ? fetcher : null)
    return <>
        <Loader isLoading={loading || dataLoading} />
        <NewPageLayout title={'Detail Cagar Budaya'} hasBackURL backURL="/public/cultural-heritage">
            <div className="mt-3">
                <Table isCompact>
                    <tbody>
                        <tr>
                            <th>
                                Kode Pelayanan
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.service_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama Cagar Budaya
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama Lokal Cagar Budaya
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.local_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Alamat
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.address}, {detail?.data?.village}, {detail?.data?.district}, {detail?.data?.city}, PROPINSI. {detail?.data?.province}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Lokasi
                            </th>
                            <td className="whitespace-normal">
                                <Link className="text-indigo-500" href={'https://maps.google.com/?q=' + detail?.data.latitude + ',' + detail?.data.longitude} target="_blank"> Klik untuk lihat di peta
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Abad
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.reference_cultural_heritage_century?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Fungsi Masa Lalu
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.past_function}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Fungsi Sekarang
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.present_function}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Milik Negara
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.is_state_property.toString() == 'false' ? 'Tidak' : 'Ya'}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama Pemilik
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.owner_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nomor Telepon Pemilik
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.owner_phone}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Pengelola Situs
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.is_site_manager.toString() == 'false' ? 'Tidak' : 'Ya'}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama Pengelola Situs
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.site_manager_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nomor Telepon Pengelola Situs
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.site_manager_phone}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Alamat Telepon Pengelola Situs
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.site_manager_address}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Deskripsi
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.description}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Latar Belakang Sejarah
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.history_background}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Luas Bangunan
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.building_area} m <sup>2</sup>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Luas Tanah
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.land_area} m <sup>2</sup>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Luas Kawasan
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.area} m <sup>2</sup>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Bentuk Cagar Budaya
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.cultural_heritage_form}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Bahan Cagar Budaya
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.cultural_heritage_material}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Dimensi
                            </th>
                            <td className="whitespace-normal">
                                Tinggi :{detail?.data?.cultural_heritage_height} <br />
                                Lebar :{detail?.data?.cultural_heritage_width} <br />
                                Panjang :{detail?.data?.cultural_heritage_long} <br />
                                Diameter :{detail?.data?.cultural_heritage_diameter} <br />
                                Ketebalan :{detail?.data?.cultural_heritage_thick}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Surat Keterangan Terdaftar
                            </th>
                            <td className="whitespace-normal">
                                <DownloadButton url={process.env.API + '/' + detail?.data?.file_result} hidden={detail?.data?.file_result ? false : true} />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <h1 className="text-xl mt-5 font-bold">Foto</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        detail?.data?.cultural_heritage_images?.map((image, indx) => {
                            return <Image src={process.env.API + '/' + image.file} width={500} height={100} alt="poto" />
                        })
                    }
                  
                </div>
            </div>
        </NewPageLayout>
    </>
}