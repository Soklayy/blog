import { Link } from "react-router-dom"
import { IBlog } from "../../api/models/blog.interface"
import { useTranslation } from "react-i18next"

const BlogCard = (blog: IBlog) => {
    const { t } = useTranslation()
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src={blog?.thumbnail?.url}
                className="object-contain h-52 w-full" alt="" />
            <div className="p-6 flex flex-col">
                <span className="block text-slate-400 font-semibold text-sm">{(new Date(blog?.createdAt as string).toDateString())}</span>
                <h3 className="mt-3 font-bold text-base truncate">
                    {blog?.title}
                </h3>
                <hr className=" bg-slate-400 h-[1.5px] my-1" />
                <p className="text-ellipsis line-clamp-3 text-slate-500 flex-auto">
                    {blog?.description}
                </p>
                <div className="flex mt-4 items-center h-10">
                    <Link to={`./${blog?.id}`} className="bg-green-500 hover:bg-green-400 px-5 py-2 text-sm shadow-sm text-center text-white rounded-full uppercase font-bayon">
                        {t('read',{ns:'button'})}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCard