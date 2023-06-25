
// pagination

const handlePagination = (index) => {
    // setPageIndex(index)
    // alert(index.includes('Next'))
    if (index.includes('Next')) {
        index = router.query.page ? parseInt(router.query.page) + 1 : 2;
    }
    index = parseInt(index)

    if (index > students.data?.last_page || index < 1) return
    router.push({
        pathname: '/administrator/students',
        query: { ...router.query, page: parseInt(index), search: router.query.search ? router.query.search : '', unit_id: router.query.unit_id ? router.query.unit_id : '' }
    },
        undefined,
        {}
    )
}

<div className={`${students?.data?.first_page_url == students?.data?.last_page_url ? 'hidden' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
    <nav>
        <ul className="flex">
            {
                students?.data?.links?.map((link, index) => {
                    return <span className=" cursor-pointer" key={index}>
                        <label onClick={() => {
                            handlePagination((link.label))
                        }} className={`${students?.data?.current_page == link.label ? 'bg-sky-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100  p-0 text-sm cursor-pointer text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                            <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                        </label>
                    </span>
                })
            }
        </ul>
    </nav>
</div>

// list numbering
{(users?.data?.current_page * users?.data?.per_page) - (users?.data?.per_page - index) + 1}