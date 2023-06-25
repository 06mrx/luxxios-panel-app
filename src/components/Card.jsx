import { Children } from "react"

function Card({ body, title, background = "bg-base-100", width = "w-full", height = "h-full", children }) {
    return (
        <div className={`card  ${width} ${background} ${height} shadow-xl`}>
            <div className="card-body -m-4">
               <main>{children}</main>
            </div>
        </div>
    )
}

export default Card