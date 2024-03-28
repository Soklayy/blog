import { useTranslation } from "react-i18next"
import { IBlog } from "../api/models/blog.interface"
import BlogCard from "../components/blog/BlogCard"
import { useGet } from "../hook/useFetch"

const Blog = () => {
    const { t } = useTranslation()
    const [data] = useGet<IBlog[]>(`blog`)
    return (
        <section className="flex flex-col min-h-[calc(100%-13.25rem)] py-5 px-10">
            <div className="relative flex justify-center py-5">
                <div className="bg-green-500 absolute h-[2px] w-full -translate-y-1/2 top-1/2 -z-10" />
                <h2 className="text-center py-1 text-xl text-white font-bayon bg-green-500 px-8 rounded w-fit">
                    {t('articles', { ns: 'button' })}
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {data?.map((blog, index) => (
                    <BlogCard key={index} {...blog} />
                ))}
            </div>
        </section>
    )
}

export default Blog