import NewPageLayout from "@/components/NewPageLayout"
import Text from "@/components/Input/Text"
import SelectForm from "@/components/Input/Select";
import SubmitButton from "@/components/Button/SubmitButton";
import { useState } from "react"
import Select from 'react-select'
export default function Index() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const optionss = ['Africa', 'America', 'Asia', 'Europe'];

    const [errors, setErrors] = useState();
    const datas = [
        {
            id: '1',
            name: 'satu'
        },
        {
            id: '2',
            name: 'dua'
        }
    ]
    return <>
        <NewPageLayout title={'Form template test'} hasBackURL={true} backURL="/public">
            <div className=" w-full  mx-auto">
                <form action="">
                    <Text placeholder={'masukkan text'} id={'text'} label={'Test form'} errors={errors} isRequired />
                    <Text placeholder={'masukkan text'} id={'text2'} label={'Test form'} errors={errors} isRequired />
                    <SelectForm placeholder={'masukkan text'} id={'text'} label={'Test form'} errors={errors} isRequired datas={datas} />
                    <div className="md-input-main">
                        <div className="md-input-box mt-8">
                            <Select className="" options={options}></Select>
                        </div>
                    </div>
                    <SubmitButton backUrl={'/public'} />
                </form>

            </div>
        </NewPageLayout>
    </>
}