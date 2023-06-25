export default function Checkbox({ id, label, onChange }) {
    return <>
        <div className="form-control my-2">
            <label className="cursor-pointer flex items-center gap-3">
                <span className="label-text font-semibold">{label}</span>
                <input id={id} type="checkbox"  className="checkbox checkbox-success" onChange={onChange} />
            </label>
        </div>
    </>
}