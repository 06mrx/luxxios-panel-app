export default function Table({isCompact = false, children}) {
    return <>
        <div className="overflow-x-auto w-full">
            <table className={isCompact ? 'table table-compact w-full' : 'table w-full'}>
                {children}
            </table>
        </div>
    </>
}