import Link from "next/link";

export default function ShowButton({ url }) {
    return <>
        <Link href={url}>
            <span className="btn btn-ghost btn-xs tooltip tooltip-success mt-1" data-tip='Lihat'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8   rounded-lg rotate-180" viewBox="0 -4 24 24"><path fill="none" stroke="#00ff00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
            </span>
        </Link>
    </>
}