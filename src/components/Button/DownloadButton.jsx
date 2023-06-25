import Link from "next/link";

export default function DownloadButton({url, isBlank = true, hidden = false}) {
    return <>
        <Link href={url} target={isBlank ? '_blank' : ''}>
            <span className={hidden ? 'hidden' : 'btn btn-sm btn-info text-white'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 24 24"><path fill="#fff" d="M6.5 20q-2.275 0-3.887-1.575Q1 16.85 1 14.575q0-1.95 1.175-3.475Q3.35 9.575 5.25 9.15q.575-2.025 2.138-3.4Q8.95 4.375 11 4.075v8.075l-.9-.875Q9.825 11 9.413 11Q9 11 8.7 11.3q-.275.275-.275.7q0 .425.275.7l2.6 2.6q.3.3.7.3q.4 0 .7-.3l2.6-2.6q.275-.275.288-.688q.012-.412-.288-.712q-.275-.275-.687-.288q-.413-.012-.713.263l-.9.875V4.075q2.575.35 4.288 2.312Q19 8.35 19 11q1.725.2 2.863 1.487Q23 13.775 23 15.5q0 1.875-1.312 3.188Q20.375 20 18.5 20Z"></path></svg> Download
            </span>
        </Link>
    </>
}