export default function Modal({id, title, children}) {
    return <>
        <input type="checkbox" id={id} className="modal-toggle" />
        <div className="modal z-40">
            <div className="modal-box relative max-w-2xl w-full">
                <label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold">{title}</h3>
                {children}
            </div>
        </div>
    </>
}