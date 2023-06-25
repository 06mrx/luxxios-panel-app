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

    const { data: detail, isLoading: dataLoading } = useSWR('/api/public/studio/show/' + id, id ? fetcher : null)
    return <>
        <Loader isLoading={loading || dataLoading} />
        <NewPageLayout title={'Detail Cagar Budaya'} hasBackURL backURL="/administrator/studio">
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
                                Nama Sanggar
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Kategori
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.reference_art_category?.name}
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
                                Nama Ketua
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.chairman_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                NIK Nama Ketua
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.chairman_id_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                No Telepon Nama Ketua
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.chairman_phone_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Alamat Ketua
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.chairman_address}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Foto Ketua
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.chairman_photo}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Daerah Asal Sanggar
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.origin}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Deskripsi
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.art_name_description}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                No.Telepon
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.phone_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Email
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.email}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Channel Youtube
                            </th>
                            <td className="whitespace-normal">
                                <Link className="text-indigo-500" href={detail?.data?.youtube_channel ? detail?.data?.youtube_channel : ''} target="_blank">{detail?.data?.youtube_channel}</Link>
                                {/* {detail?.data?.youtube_channel} */}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Anggota
                            </th>
                            <td className="whitespace-normal">
                                {detail?.data?.male_artist + detail?.data?.female_artist} Orang ({detail?.data?.male_artist} Laki-laki {detail?.data?.female_artist} Permepuan)
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
                                Aturan
                            </th>
                            <td className="whitespace-normal">
                                <DownloadButton url={process.env.API + '/' + detail?.data?.file_rules} hidden={detail?.data?.file_rules ? false : true} />
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
                        <tr>
                            <th>
                                Status
                            </th>
                            <td>
                                {
                                    (() => {
                                        if (detail?.data?.is_rejected) {
                                            return <>
                                                <span className="badge badge-error mb-2">
                                                    Pengajuan Ditolak
                                                </span> <br />
                                                <p><span className="font-semibold">Alasan :</span> {detail?.data?.rejected_reason}</p>
                                            </>
                                        } else if (!detail?.data?.is_head_section_approve) {
                                            return <span className="badge badge-warning">
                                                Menunggu Persetujuan Kepala Bidang
                                            </span>
                                        } else if (!detail?.data?.is_head_office_approve) {
                                            return <span className="badge badge-warning">
                                                Menunggu Persetujuan Kepala Dinas
                                            </span>
                                        } else if (detail?.data?.is_head_section_approve && detail?.data?.is_head_office_approve) {
                                            return <>
                                                <span className="badge badge-success">
                                                    Pengajuan Diterima
                                                </span>
                                            </>
                                        }
                                    })()
                                }
                            </td>
                            </tr>
                    </tbody>
                </Table>
            </div>
        </NewPageLayout>
    </>
}