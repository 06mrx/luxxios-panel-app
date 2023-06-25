import Link from "next/link";

export default function AddButton({ hasUrl = false, url = '#', id = '' }) {
    return <>
        <div className={hasUrl ? 'flex w-full justify-end my-3' : 'hidden'}>
            <Link href={url}>
                <span className="btn btn-success">
                    + <span className="hidden md:block lg:block">Tambah</span>
                </span>
            </Link>
        </div>
        <div className={hasUrl ? 'hidden' : 'flex w-full justify-end my-3'}>
            <label htmlFor={id} className="btn btn-success">
                + <span className="hidden md:block lg:block">Tambah</span>
            </label>
        </div>

    </>
}