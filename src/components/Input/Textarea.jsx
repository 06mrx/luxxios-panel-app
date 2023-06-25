import { useState } from "react";
export default function Textarea({label, placeholder, id, isRequired = false, errors = []}) {
    const [warn, setWarn] = useState(false)
    var el = document.getElementById(id);
    setTimeout(() => {
        el = document.getElementById(id);
        el?.addEventListener('keyup', function (e) {
            if (el.value == '') {
                setWarn(true);
            } else {
                setWarn(false)
            }
            // old_salary.value = formatRupiah(this.value, 'Rp. ');
        });
    }, 2)

    return <>
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-semibold">{label}</span>
                <span className={isRequired ? 'label-text-alt text-red-500 font-semibold' : 'hidden'}>* Wajib</span>
            </label>
            <textarea className=" textarea textarea-bordered" id={id} placeholder={placeholder}>

            </textarea>
            <label className="label">
                <span className={warn && isRequired ? 'text-xs italic text-red-500' : 'hidden'}>Form {label} Tidak Boleh Kosong</span>
                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty({ id })) ? errors[{ id }][0] : ''}</span>
            </label>
        </div>
    </>
}