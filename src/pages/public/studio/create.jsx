import NewPageLayout from "@/components/NewPageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr'
import Loader from "@/components/Loader";
import { useState, useRef } from "react";
import Text from "@/components/Input/Text";
import AsyncSelect from "react-select/async"
import 'leaflet-geosearch/dist/geosearch.css'
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import Select from "@/components/Input/Select";
import Checkbox from "@/components/Input/Checkbox";
import Textarea from "@/components/Input/Textarea";
import SubmitButton from "@/components/Button/SubmitButton";
import { formService } from "@/services/form.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
    ssr: false,
});


// import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
export default function Index() {
    const TOKEN = storageService.getToken();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const ROUTER = useRouter();
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: categories, isLoading: categoriesLoading } = useSWR('/api/reference/art-category/index', fetcher)

    const village_id = useRef()
    const handleVillageChange = (e) => {
        village_id.current = e;
    }

    const getVillageOptions = (searchTerm, callback) => {
        fetch(process.env.API + '/api/reference/village/search?terms=' + searchTerm, {
            method: 'GET',
            headers: {
                'Authorization': TOKEN
            }
        }).then((res) => res.json()).then((data) => callback(data.data))
    }

    const [fileRules, setfileRules] = useState();
    const [chairmanPhoto, setchairmanPhoto] = useState();


    const fileRulesHandler = (e) => {
        setfileRules(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }
    const chairmanPhotoHandler = (e) => {
        setchairmanPhoto(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }

    // map.addControl(search);
    let postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('reference_art_category_id', formService.getText('reference_art_category_id'))
        postData.append('name', formService.getText('name'))
        postData.append('address', formService.getText('address'))
        postData.append('village_id', village_id.current?.value)
        postData.append('zip_code', formService.getText('zip_code'))
        postData.append('longitude', formService.getText('lng'))
        postData.append('latitude', formService.getText('lat'))
        postData.append('chairman_name', formService.getText('chairman_name'))
        postData.append('chairman_address', formService.getText('chairman_address'))
        postData.append('chairman_id_number', formService.getText('chairman_id_number'))
        postData.append('chairman_phone_number', formService.getText('chairman_phone_number'))
        postData.append('origin', formService.getText('origin'))
        postData.append('art_name_description', formService.getText('art_name_description'))
        postData.append('phone_number', formService.getText('phone_number'))
        postData.append('email', formService.getText('email'))
        postData.append('youtube_channel', formService.getText('youtube_channel'))
        postData.append('male_artist', formService.getText('male_artist'))
        postData.append('female_artist', formService.getText('female_artist'))


        if (fileRules) postData.append('file_rules', fileRules)
        if (chairmanPhoto) postData.append('chairman_photo', chairmanPhoto)

        fetch(process.env.API + '/api/public/studio/store', {
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
                ROUTER.push('/public/studio/' + data.data)
            } else {
                toast.error('Gagal menambah data, perhatiakan kembali form isian', {
                    position: 'bottom-right'
                })
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }

    return <>
        <ToastContainer />
        <Loader isLoading={loading || categoriesLoading} />
        <NewPageLayout title={'Tambah Sanggar'} hasBackURL backURL="/head-office">
            <div className="mt-3">
                <form onSubmit={handleSubmit}>
                    <Select label={'Kategori'} id={'reference_art_category_id'} placeholder={'Pilih Kategori'} isRequired errors={errors} options={categories?.data} />
                    <Text id={'name'} label={'Nama Sanggar'} placeholder={'Masukkan Nama Sanggar'} isRequired errors={errors} />
                    <Text id={'origin'} label={'Daerah Asal'} placeholder={'Masukkan Daerah Asal'} isRequired errors={errors} />
                    <Textarea id={'art_name_description'} label={'Deskripsi'} placeholder={'Deskripsi sanggar'} errors={errors} isRequired />
                    <Text id={'phone_number'} label={'No. Telepon Sanggar'} placeholder={'Masukkan No. Telepon'} isRequired errors={errors} />
                    <Text id={'email'} label={'Email Sanggar'} placeholder={'Masukkan email'} isRequired errors={errors} />
                    <Text id={'youtube_channel'} label={'Link Youtube'} placeholder={'Masukkan link youtube'} errors={errors} />
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 mb-2 items-center">
                        <Text isNumber id={'male_artist'} label={'Anggota Laki-laki'} placeholder={'Masukkan jumlah'} errors={errors} />
                        <Text isNumber id={'female_artist'} label={'Anggota Perempuan'} placeholder={'Masukkan jumlah'} errors={errors} />
                    </div>
                    <Text id={'address'} label={'Alamat'} placeholder={'Masukkan Alamat'} isRequired errors={errors} />
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Kelurahan / Desa</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <AsyncSelect
                            cacheOptions
                            onChange={handleVillageChange}
                            loadOptions={getVillageOptions}
                            placeholder={"Pilih Kecamatan (Cari Kecamatan)"}
                            defaultOptions
                        />
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("village_id")) ? errors.village_id[0] : ''}</span>
                        </label>
                    </div>
                    <Text id={'zip_code'} label={'Kode Pos'} placeholder={'Masukkan Kode Pos'} isRequired errors={errors} />

                    <div className="form-control w-full">
                        <label className="block">
                            <label className="label">
                                <span className="label-text font-semibold">File ADRT </span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input id="image[0]" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={fileRulesHandler} />
                            <label className="label">
                                <span className="label-text-alt">File Berekstensi *.pdf Dengan Maksimal Size 2MB</span>
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("image")) ? errors.image[0] : ''}</span>
                            </label>
                        </label>
                    </div>
                    <Text id={'chairman_name'} label={'Nama Ketua Sanggar'} placeholder={'Masukkan Nama Ketua Sanggar'} isRequired errors={errors} />
                    <Text isNumber id={'chairman_id_number'} label={'NIK Ketua Sanggar'} placeholder={'Masukkan NIK Ketua Sanggar'} isRequired errors={errors} />
                    <Text id={'chairman_phone_number'} label={'No. Telepon Ketua Sanggar'} placeholder={'Masukkan No. Telepon Ketua Sanggar'} isRequired errors={errors} />
                    <Text id={'chairman_address'} label={'Alamat Ketua Sanggar'} placeholder={'Masukkan Alamat Ketua Sanggar'} isRequired errors={errors} />
                    <div className="form-control w-full">
                        <label className="block">
                            <label className="label">
                                <span className="label-text font-semibold">Foto Ketua</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input id="chairman_photo" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={chairmanPhotoHandler} />
                            <label className="label">
                                <span className="label-text-alt">File Berekstensi *.jpg, *.png Dengan Maksimal Size 2MB</span>
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("chairman_photo")) ? errors.chairman_photo[0] : ''}</span>
                            </label>
                        </label>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold">Lokasi</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <div className="flex gap-3 mb-2">
                        <input id="lng" type="text" placeholder="Longitude" disabled className="input input-md w-full input-bordered" />
                        <input id="lat" type="text" placeholder="Latitude" disabled className="input input-md w-full input-bordered" />
                    </div>
                    <MapWithNoSSR lat_id={'lat'} lng_id={'lng'} />
                    <SubmitButton backUrl={'/public/cultural-heritage'} />
                </form>
            </div>
        </NewPageLayout>
    </>
}