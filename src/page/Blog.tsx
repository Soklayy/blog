import { useTranslation } from "react-i18next"
import BlogCard from "../components/blog/BlogCard"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { axiosInstance } from "../api/axios.instance"
import { setBlogs } from "../redux/feature/blog.slide"

const Blog = () => {
    const { t } = useTranslation()
    const blogs = useAppSelector(state => state.blogs.data)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (blogs.length == 0) {
            axiosInstance.get('/blog')
                .then((res) => {
                    console.log(res.data)
                    dispatch(setBlogs(res?.data))
                })
                .catch((erro) => {
                    console.log(erro?.response?.data)
                })
        }

    }, [])
    return (
        <section className="flex flex-col min-h-[calc(100%-13.25rem)] py-5 px-10">
            <div className="relative flex justify-center py-5">
                <div className="bg-green-500 absolute h-[2px] w-full -translate-y-1/2 top-1/2 -z-10" />
                <h2 className="text-center py-1 text-xl text-white font-bayon bg-green-500 px-8 rounded w-fit">
                    {t('articles', { ns: 'button' })}
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {blogs.map((blog, index) => (
                    <BlogCard key={index} {...blog} />
                ))}
            </div>
        </section>
    )
}

export default Blog