export default function DivCard({children}) {
    return<>
        <div className="bg-base-100 py-2 px-1.5 rounded-xl shadow-xl">
            {children}
        </div>
    </>
}