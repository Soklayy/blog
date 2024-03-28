import Lottie from "lottie-react"
import { BsTelegram, BsTelephoneFill } from "react-icons/bs"
import contactAnimation from "../../assets/lotties/contact.json"
import SocialMediaIconCube from "../common/SocialMediaIconCube"
import { useTranslation } from "react-i18next"



const Contact = () => {
  const { t } = useTranslation()
  return (
    <section id="contact" className="p-8 w-full flex justify-center " >
      <div className="max-w-2xl w-full space-y-5">
        <h2 className="text-center font-bold text-3xl text-green-500 font-bayon underline">{t('contact',{ns:'button'})}</h2>
        <Lottie animationData={contactAnimation} className="w-full" />

        <div className="flex gap-4 text-xl w-full justify-center">
          <SocialMediaIconCube href="tel:066866677" Icon={BsTelephoneFill} />
          <SocialMediaIconCube href="https://t.me/soklayy" Icon={BsTelegram} />
        </div>
        <p className="text-center text-4xl leading-normal">
          {t('contact')}
        </p>

      </div>
    </section>
  )
}

export default Contact