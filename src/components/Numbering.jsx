export default function Numbering({datas, index}) {
    return <>
        {(datas?.data?.current_page * datas?.data?.per_page) - (datas?.data?.per_page - index) + 1}
    </>
}