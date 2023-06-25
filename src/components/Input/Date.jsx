import { useState } from "react";
export default function Date({ label, placeholder, id, isRequired = false, errors = [] }) {
    const [warn, setWarn] = useState(false)


    return <>
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-semibold">{label}</span>
                <span className={isRequired ? 'label-text-alt text-red-500 font-semibold' : 'hidden'}>* Wajib</span>
            </label>
            <input type="date" placeholder={placeholder} id={id} required={isRequired} className="input x-date input-md w-full input-bordered" />
            <label className="label">
                
                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty({ id })) ? errors[{ id }][0] : ''}</span>
            </label>
        </div>
        {/* <div className="md-input-main">
            <div className="md-input-box mt-8">
                <input
                    id={id}
                    name="fullName"
                    type="text"
                    className="md-input"
                    placeholder=" "
                />
                <label htmlFor="fullName" className="md-label">{label}</label>
                <label htmlFor="fullName" className="md-label-optional text-red-500 text-sm">wajib</label>

                <div className="md-input-underline" />
            </div>
            <span className={warn && isRequired ? 'text-xs italic text-red-500' : 'hidden'}>Form Tidak Boleh Kosong</span>
            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty({ id })) ? errors[{ id }][0] : ''}</span>
        </div> */}


    </>
}