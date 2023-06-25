export default function Select({ label, placeholder, id, isRequired = false, errors = [], options = [] }) {
    return <>
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-semibold">{label}</span>
                <span className={isRequired ? 'label-text-alt text-red-500 font-semibold' : 'hidden'}>* Wajib</span>
            </label>
            <select className="select select-md w-full select-bordered font-normal" required={isRequired} id={id} defaultValue={''}>
                <option disabled value={''}>{placeholder}</option>
                {
                    options?.map((data, index) => {
                        return (
                            <option key={index} value={data.id}>{data.name}</option>
                        )
                    })
                }
            </select>
            <label className="label">
                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty(id)) ? errors[id][0] : ''}</span>
            </label>
        </div>

       
    </>
}