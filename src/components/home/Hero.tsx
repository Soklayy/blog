import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa6"
import hero from "../../assets/hero.png"
import Lottie from "lottie-react"
import bgHerro from "../../assets/lotties/bg-herro.json"
import SocialMediaIconCube from "../common/SocialMediaIconCube"
import { useTranslation } from "react-i18next"
const Hero = () => {
    const { t } = useTranslation()
    
    return (
        <section className="lg:px-10 flex flex-col-reverse gap-3 lg:flex-row bg-gray-900 lg:h-[calc(100%-4rem)]" >
            <div className="flex justify-center items-center h-1/2 lg:h-full lg:w-1/2 relative overflow-x-hidden">
                <img src={hero} className="z-10 h-full object-contain drop-shadow-[0.7rem_0]"
                />
                <Lottie animationData={bgHerro} className='absolute h-full w-full' />
            </div>

            <div className="lg:text-3xl text-xl flex justify-center px-1 md:px-32 h-full lg:px-0 items-center gap-5 lg:w-1/2 text-white flex-col text-justify">
                <h2 className="text-white font-popin text-2xl lg:text-4xl font-extrabold uppercase pt-10 lg:pt-0"
                    style={{
                        backgroundImage: 'linear-gradient(90deg, rgba(24,52,253,1) 0%, rgba(0,255,3,1) 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% auto'
                    }}
                >Hello, I'm Soklay,</h2>
                <p className='text-center leading-relaxed'>
                    {/*  */}
                    {t('hero')}
                </p>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-5">
                        <SocialMediaIconCube href="https://www.youtube.com/@soklay34" Icon={FaYoutube} />
                        <SocialMediaIconCube href="https://web.facebook.com/itsoklay" Icon={FaFacebook} />
                        <SocialMediaIconCube href="https://github.com/Soklayy" Icon={FaGithub} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:gap-5">
                        <a href="#contact" className="primary-button font-medium font-bayon">
                            {t('contact',{ns:'button'})}
                        </a>
                        <a href="#skill" className="primary-button font-medium font-bayon">
                        {t('skill',{ns:'button'})}
                        </a>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Hero
