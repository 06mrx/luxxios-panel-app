export default function Paginator({data, handlePagination}) {
    return <>
        <div className={`${data?.data?.first_page_url == data?.data?.last_page_url ? '' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
                <nav>
                    <ul className="flex">
                        {
                            data?.data?.links?.map((link, index) => {
                                return <span className=" cursor-pointer" key={index}>
                                    <label onClick={() => {
                                        handlePagination((link.label))
                                    }} className={`${data?.data?.current_page == link.label ? 'bg-emerald-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-md border border-blue-gray-100  p-0 text-sm cursor-pointer text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                                        <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                                    </label>
                                </span>
                            })
                        }
                    </ul>
                </nav>
            </div>
    </>
}