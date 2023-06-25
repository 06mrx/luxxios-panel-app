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
import { useMemo } from "react";
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
    ssr: false,
});


// import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
export default function Index() {
    const TOKEN = storageService.getToken();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const ROUTER = useRouter();
    const [isSiteManager, setIsSiteManager] = useState(false);
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        headers: {
            'authorization': TOKEN
        }
    }).then((res) => res.json())

    const { data: centuries, isLoading: centuriesLoading } = useSWR('/api/reference/cultural-heritage-century/index', fetcher)

    const village_id = useRef()
    const handleVillageChange = (e) => {
        village_id.current = e;
    }

    // var is_site_manager = document.getElementById('is_site_manager');
    // setTimeout(() => {
    //     is_site_manager = document.getElementById('is_site_manager');
    //     if(is_site_manager) {
    //         is_site_manager.addEventListener("click", (event) => {
    //             console.log('change');
    //             setIsSiteManager(!isSiteManager)
    //         })
    //     }
    // }, 1000);

    const handleSiteManagerChange = () => {
        setIsSiteManager(!isSiteManager)
    }

    const getVillageOptions = (searchTerm, callback) => {
        fetch(process.env.API + '/api/reference/village/search?terms=' + searchTerm, {
            method: 'GET',
            headers: {
                'Authorization': TOKEN
            }
        }).then((res) => res.json()).then((data) => callback(data.data))
    }

    const [image0, setImage0] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();

    const image0Handler = (e) => {
        setImage0(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }
    const image1Handler = (e) => {
        setImage1(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }
    const image2Handler = (e) => {
        setImage2(e.target.files[0]);
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
        postData.append('name', formService.getText('name'))
        postData.append('local_name', formService.getText('local_name'))
        postData.append('address', formService.getText('address'))
        postData.append('village_id', village_id.current?.value)
        postData.append('zip_code', formService.getText('zip_code'))
        postData.append('longitude', formService.getText('lng'))
        postData.append('latitude', formService.getText('lat'))
        postData.append('reference_cultural_heritage_century_id', formService.getText('reference_cultural_heritage_century_id'))
        postData.append('past_function', formService.getText('past_function'))
        postData.append('present_function', formService.getText('present_function'))
        postData.append('is_state_property', formService.getText('is_state_property'))
        postData.append('owner_name', formService.getText('owner_name'))
        postData.append('owner_phone', formService.getText('owner_phone'))
        postData.append('owner_address', formService.getText('owner_address'))
        postData.append('is_site_manager', formService.getText('is_site_manager'))
        if(formService.getText('is_site_manager')) {
            postData.append('site_manager_name', formService.getText('site_manager_name'))
            postData.append('site_manager_phone', formService.getText('site_manager_phone'))
            postData.append('site_manager_address', formService.getText('site_manager_address'))
        }
        postData.append('description', formService.getText('description'))
        postData.append('history_background', formService.getText('history_background'))
        postData.append('building_area', formService.getText('building_area'))
        postData.append('land_area', formService.getText('land_area'))
        postData.append('area', formService.getText('area'))
        postData.append('cultural_heritage_form', formService.getText('cultural_heritage_form'))
        postData.append('cultural_heritage_material', formService.getText('cultural_heritage_material'))
        postData.append('cultural_heritage_height', formService.getText('cultural_heritage_height'))
        postData.append('cultural_heritage_width', formService.getText('cultural_heritage_width'))

        if (image0) postData.append('images[0]', image0)
        if (image1) postData.append('images[1]', image1)
        if (image2) postData.append('images[2]', image2)

        fetch(process.env.API + '/api/public/cultural-heritage/store', {
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
                ROUTER.push('/public/cultural-heritage/' + data.data)
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                toast.error('Harap Perthatikan Kembali Form Isian', {
                    position: 'bottom-right'
                })
                
                setErrors(data.data)
            }
        })
    }

    return <>
        <ToastContainer />
        <Loader isLoading={loading || centuriesLoading} />
        <NewPageLayout title={'Tambah Cagar Budaya'} hasBackURL backURL="/head-office">
            <div className="mt-3">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3">
                        <Text id={'name'} label={'Nama Cagar Budaya'} placeholder={'Masukkan Nama Cagar Budaya'} isRequired errors={errors} />
                        <Text id={'local_name'} label={'Nama Lokal Cagar Budaya'} placeholder={'Masukkan Nama Lokal Cagar Budaya'} isRequired errors={errors} />
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
                    <Select id={'reference_cultural_heritage_century_id'} label={'Masa Cagar Budaya'} placeholder={'Pilih masa'} isRequired errors={errors} options={centuries?.data} />
                    <Text id={'past_function'} label={'Fungsi Masa Lampau'} placeholder={'Masukkan fungsi'} isRequired errors={errors} />
                    <Text id={'present_function'} label={'Fungsi Sekarang'} placeholder={'Masukkan fungsi'} isRequired errors={errors} />
                    <Checkbox id={'is_state_property'} label={'Milik Negara'} />
                    <Text id={'owner_name'} label={'Nama Pemilik'} placeholder={'Masukkan nama pemilik'} errors=
                        {errors} isRequired />
                    <Text id={'owner_phone'} label={'No. Telepon Pemilik'} placeholder={'Masukkan nomor telepon'} errors={errors} isRequired />
                    <Text id={'owner_address'} label={'Alamat Pemilik'} placeholder={'Masukkan alamat'} isRequired
                        errors={errors} />
                    <Checkbox id={'is_site_manager'} label={'Pengelola Situs'} onChange={handleSiteManagerChange} />
                    
                    <div className={isSiteManager ? '' : 'hidden'}>
                        <Text id={'site_manager_name'} label={'Nama Pengelola Situs'} placeholder={'Masukkan nama Pengelola Situs'} errors=
                            {errors}  />
                        <Text id={'site_manager_phone'} label={'No. Telepon Pengelola Situs'} placeholder={'Masukkan nomor telepon'} errors={errors}  />
                        <Text id={'site_manager_address'} label={'Alamat Pengelola Situs'} placeholder={'Masukkan alamat'}  errors={errors} />
                    </div>

                    <Textarea id={'description'} label={'Deskripsi'} placeholder={'Deskripsi situs'} errors={errors} isRequired />
                    <Textarea id={'history_background'} label={'Latar Belakang Sejarah'} placeholder={'Latar Belakang Sejarah'} errors={errors} isRequired />
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 mb-2 items-center">
                        <div className="flex gap-2 items-center w-full md:w-50 lg:w-50">
                            <Text isNumber id={'building_area'} label={'Luas Bangunan'} placeholder={'meter kuadrat'} isRequired errors={errors} /> <span className="mt-4 w-10">M <sup>2</sup></span>
                        </div>
                        <div className="flex gap-2 items-center w-full md:w-50 lg:w-50">
                            <Text isNumber id={'land_area'} label={'Luas Tanah'} placeholder={'meter kuadrat'} isRequired errors={errors} /> <span className="mt-4 w-10">M <sup>2</sup></span>
                        </div>
                        <div className="flex gap-2 items-center w-full md:w-50 lg:w-50">
                            <Text isNumber id={'area'} label={'Luas Kawasan'} placeholder={'meter kuadrat'} isRequired errors={errors} /> <span className="mt-4 w-10">M <sup>2</sup></span>
                        </div>
                    </div>
                    <Text id={'cultural_heritage_form'} label={'Bentuk Cagar Budaya'} placeholder={'Masukkan bentuk cagar'} isRequired errors={errors} />
                    <Text id={'cultural_heritage_material'} label={'Bahan / Material'} placeholder={'Masukkan bahan / material'} isRequired errors={errors} />
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 mb-2 items-center">
                        <div className="flex gap-2 items-center w-full md:w-50 lg:w-50">
                            <Text isNumber id={'cultural_heritage_height'} label={'Tinggi'} placeholder={'meter'} isRequired errors={errors} /> <span className="mt-4 w-10">M</span>
                        </div>
                        <div className="flex gap-2 items-center w-full md:w-50 lg:w-50">
                            <Text isNumber id={'cultural_heritage_width'} label={'Lebar'} placeholder={'meter'} isRequired errors={errors} /> <span className="mt-4 w-10">M</span>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="block">
                            <label className="label">
                                <span className="label-text font-semibold">Foto </span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input id="image[0]" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={image0Handler} />
                            <input id="image[1]" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={image1Handler} />
                            <input id="image[2]" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={image2Handler} />
                            <label className="label">
                                <span className="label-text-alt">File Berekstensi *.jpg, *.png Dengan Maksimal Size 2MB</span>
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("images")) ? errors['images'][0] : ''}</span>
                            </label>
                        </label>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold">Lokasi </span>
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