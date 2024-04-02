import { Link } from "react-router-dom"
import { IBlog } from "../../api/models/blog.interface"
import { useTranslation } from "react-i18next"
import moment from "moment"

const BlogCard = (blog: IBlog) => {
    const { t } = useTranslation()
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
            <img
                src={blog?.thumbnail?.url}
                className="object-cover h-36 sm:h-52 w-full bg-green-100" alt=""
            />
            <div className="p-6 flex flex-col flex-auto">
                <span className="block text-slate-400 font-semibold text-sm">{(moment(blog?.createdAt)).format('DD MMMM YYYY')}</span>
                <h3 className="font-bold text-sm text-ellipsis line-clamp-3 sm:line-clamp-1">
                    {blog?.title}
                </h3>
                <hr className=" bg-slate-400 h-[1.5px] my-1" />
                <p className="text-slate-500 text-sm text-ellipsis line-clamp-3">
                    {blog?.description}
                </p>
                <Link to={`./${blog?.id}`} className="bg-green-500 hover:bg-green-400 px-5 py-2 text-sm shadow-sm text-center text-white rounded-full uppercase font-bayon w-fit mt-3">
                    {t('read', { ns: 'button' })}
                </Link>
            </div>
        </div>
    )
}

export default BlogCard