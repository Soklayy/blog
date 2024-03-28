import { Link } from "react-router-dom"
import { FaGithub, FaFacebook, FaYoutube, FaLinkedin, FaTelegram } from "react-icons/fa6";
import SocialMediaIconCube from "./SocialMediaIconCube";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer className="gap-3 bg-gray-900 grid grid-cols-1 lg:grid-cols-2 lg:px-8 px-2 py-10">
            <div className="flex items-center gap-10 justify-center">
                <Link to={'/'} className="text-sm lg:text-3xl font-bayon text-white font-bold uppercase flex items-center border-r h-full px-4">ឡា<span className="text-green-500 font-bayon flex items-center">យ.</span></Link>
                <div className="space-y-3 flex flex-col justify-center items-start">
                    <div className="flex gap-4 text-sm lg:text-base text-slate-300">
                        {
                            (t('menu', { ns: 'button' }) as unknown as Array<any>)?.map((menu,key)=>(
                                <Link to={menu.url} key={key} className="hover:text-green-500 font-semibold duration-300 capitalize">{menu.title}</Link>
                            ))
                        }
                    </div>
                    <p className="text-slate-400 text-sm font-sans">&#169;Copyright 2024 By <span className="font-bold text-green-500 font-sans">Yorn Soklay</span>. All Rights Reserved.</p>
                </div>
            </div>
            <div className="space-y-3 flex flex-col justify-center items-center">
                <h2 className="text-slate-500 font-bold text-center text-sm font-bayon capitalize">{t('social_media',{ns:'button'})}</h2>
                <div className="flex gap-4 text-xl">
                    <SocialMediaIconCube href="https://www.youtube.com/@soklay34" Icon={FaYoutube} />
                    <SocialMediaIconCube href="https://web.facebook.com/itsoklay" Icon={FaFacebook}/>
                    <SocialMediaIconCube href="https://github.com/Soklayy" Icon={FaGithub} />
                    <SocialMediaIconCube  href="https://www.linkedin.com/in/soklay-yorn-a2b728288/" Icon={FaLinkedin}/>
                    <SocialMediaIconCube href="https://t.me/soklayy" Icon={FaTelegram}/>
                </div>
            </div>
        </footer>
    )
}

export default Footer