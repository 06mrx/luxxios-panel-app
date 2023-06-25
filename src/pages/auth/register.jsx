import PageLayout from "@/components/PageLayout";
import DivCard from "@/components/DivCard";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] })
import { useRouter } from "next/router";
import Text from "@/components/Input/Text";
import Date from "@/components/Input/Date";
import Select from "@/components/Input/Select";
import { useState } from "react";
import SubmitButton from "@/components/Button/SubmitButton";
import { formService } from "@/services/form.service";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Index() {
    const router = useRouter();
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState();

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

    let postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('name', formService.getText('name'))
        postData.append('id_number', formService.getText('id_number'))
        postData.append('birth_place', formService.getText('birth_place'))
        postData.append('birth_date', formService.getText('birth_date'))
        postData.append('gender', formService.getText('gender'))
        postData.append('phone_number', formService.getText('phone_number'))
        postData.append('email', formService.getText('email'))
        postData.append('password', formService.getText('password'))
        postData.append('password_verification', formService.getText('password_verification'))


        fetch(process.env.API + '/api/auth/register', {
            method: 'POST',
            body: postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success('Berhasil Menambah Data', {
                    position: 'bottom-right'
                })
                router.push('/auth/login');
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                toast.error('Periksa kembali form isian', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }
    return <>
        <Loader isLoading={loading} />
        <ToastContainer/>
        <main className={montserrat.className}>
            <div className="bg-base-200 h-screen">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 w-full h-64">
                    <div className="max-w-7xl mx-auto w-full flex justify-between relative p-2 md:p-2 lg:p-0">
                        <div className="absolute top-10 w-full">
                            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold w-2/3 md:2-1/2 lg:w-full">
                                Form Registrasi {process.env.APP_NAME}
                            </h1>
                            <p className="text-white">{process.env.APP_DESC}</p>
                        </div>

                        {/* <div className="max-w-7xl mx-auto w-full absolute top-10  bg-base-100">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis placeat ipsa repellat dolorem, illo ullam ducimus dolorum vel aperiam suscipit sapiente corrupti voluptatem debitis aliquid distinctio deleniti, ea nisi perspiciatis!
                    </div> */}
                    </div>

                </div>
                <div className={'bg-base-100 rounded-xl shadow-xl px-3 py-2 absolute max-w-7xl w-full top-40  left-1/2 transform -translate-x-1/2'}>


                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="mt-3">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                                    <Text id={'name'} label={'Nama'} placeholder={'Masukkan nama'} isRequired errors={errors} />
                                    <Text id={'id_number'} label={'NIK'} placeholder={'Masukkan 16 digit NIK'} isRequired errors={errors} />
                                </div>
                                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                                    <Text id={'birth_place'} label={'Tempat Lahir'} placeholder={'Masukkan tempat lahir'} isRequired errors={errors} />
                                    <Date id={'birth_date'} label={'Tanggal Lahir'} isRequired errors={errors} />
                                </div>
                                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                                    <Select id={'gender'} label={'Jenis Kelamin'} placeholder={'Pilih jenis kelamin'} options={genders} isRequired errors={errors} />
                                    <Text id={'phone_number'} label={'No. Telepon'} placeholder={'Masukkan nomor telepon'} isRequired errors={errors} />
                                </div>
                                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                                    <Text isEmail id={'email'} label={'Email'} placeholder={'Masukkan email'} isRequired errors={errors} />
                                    <Text isPassword id={'password'} label={'Password'} placeholder={'Masukkan password'} isRequired errors={errors} />
                                    <Text isPassword id={'password_verification'} label={'Verifikasi Password'} placeholder={'Masukkan password'} isRequired errors={errors} />
                                </div>
                                <SubmitButton backUrl={'/'} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </>
}