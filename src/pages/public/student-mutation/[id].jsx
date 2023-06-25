import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState } from "react";
import { useRouter } from "next/router";
import Table from "@/components/Table";
import DownloadButton from "@/components/Button/DownloadButton";
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

    const { data: detail, isLoading: dataLoading } = useSWR('/api/public/student-mutation/show/' + id, id ? fetcher : null)
    return <>
        <Loader isLoading={loading || dataLoading} />
        <NewPageLayout title={'Detail Data Mutasi'} hasBackURL backURL="/public/student-mutation">
            <div className="mt-3">
                <Table isCompact>
                    <tbody>
                        <tr>
                            <th>
                                Nama
                            </th>
                            <td>
                                {detail?.data?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Jenis Mutasi
                            </th>
                            <td>
                                {detail?.data?.reference_student_mutation_type?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                NISN
                            </th>
                            <td>
                                {detail?.data?.national_student_registration_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                NIS
                            </th>
                            <td>
                                {detail?.data?.student_registration_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Peringkat Kelas
                            </th>
                            <td>
                                {detail?.data?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Alasan Mutasi
                            </th>
                            <td>
                                {detail?.data?.reason}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                NIK
                            </th>
                            <td>
                                {detail?.data?.id_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Tempat, Tanggal Lahir
                            </th>
                            <td>
                                {detail?.data?.birth_place}, {detail?.data?.birth_date}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Jenis Kelamin
                            </th>
                            <td>
                                {detail?.data?.gender}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Agama
                            </th>
                            <td>
                                {detail?.data?.reference_religion?.name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Sekolah Asal
                            </th>
                            <td>
                                {detail?.data?.school_origin}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Sekolah Tujuan
                            </th>
                            <td>
                                {detail?.data?.school_target}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                File Surat Mutasi
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + detail?.data?.file_transfer_letter} hidden={detail?.data?.file_transfer_letter ? false : true} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Rapor
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + detail?.data?.file_report} hidden={detail?.data?.file_report ? false : true} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                File Surat Permohonan
                            </th>
                            <td>
                                <DownloadButton url={process.env.API + '/' + detail?.data?.file_application} hidden={detail?.data?.file_application ? false : true} />
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
                                        } else if (!detail?.data?.is_principal_approve) {
                                            return <span className="badge badge-warning">
                                                Menunggu Persetujuan Kepala Sekolah
                                            </span>
                                        } else if (!detail?.data?.is_head_section_approve) {
                                            return <span className="badge badge-warning">
                                                Menunggu Persetujuan Kepala Bidang
                                            </span>
                                        } else if (!detail?.data?.is_head_office_approve) {
                                            return <span className="badge badge-warning">
                                                Menunggu Persetujuan Kepala Dinas
                                            </span>
                                        } else if (detail?.data?.is_principal_approve && detail?.data?.is_head_section_approve && detail?.data?.is_head_office_approve) {
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