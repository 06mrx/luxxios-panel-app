import Link from "next/link"
export default function SubmitButton({backUrl}) {
    return (
        <div className="flex w-full justify-end gap-3 mt-3">
            <Link href={backUrl}>
                <span className="btn btn-md btn-success btn-outline">Kembali</span>
            </Link>
            <button type="submit" className="btn btn-md btn-success">
                Kirim
            </button>
        </div>
    )
}