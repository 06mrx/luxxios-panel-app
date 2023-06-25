import Image from "next/image"
function Loader({isLoading = false}) {
    return <>
        <div className={`${!isLoading && 'hidden'} fixed h-screen w-screen z-[100] backdrop-blur-xl`}>
            <div className="flex flex-col justify-center items-center h-screen gap-0">
                {/* <span className="text-primary text-5xl">Pranalaw</span>
                <span className="text-transparent text-5xl">oo</span> */}
                <Image src={'/favicon/ms-icon-310x310.png'} width={200} height={200}  alt="loadig logo"/>
                <span className="loader"></span>
                {/* <span className="text-primary text-5xl ml-[65px]">rks</span>
                <span className="text-white text-4xl bg-gradient-to-r from-secondary to-primary rounded-xl ml-1 mt-2 px-2">.id</span> */}
                {/* <span>rks</span> */}
            </div>
        </div>
    </>
}

export default Loader