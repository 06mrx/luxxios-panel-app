import Link from "next/link"
export default function SubmitButtonModal({id}) {
    return (
        <div className="flex w-full justify-end gap-3 mt-3">
            <label htmlFor={id} className="btn btn-md btn-success btn-outline">Kembali</label>
            <button type="submit" className="btn btn-md btn-success">
                Kirim
            </button>
        </div>
    )
}