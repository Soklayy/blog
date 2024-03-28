import { useTranslation } from "react-i18next";
import { allSkill } from "../../constants/AllSkill";
import SkillCard from "./SkillCard";

const Skill = () => {
    const { t } = useTranslation()
    return (
        <section className="py-10 px-4 lg:px-40 relative w-full space-y-3 bg-slate-100" id="skill">
            <h2 className="text-center font-bold font-bayon text-3xl text-green-500">
                {t('skill',{ns:'button'})}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {
                    allSkill.map((skill, key) => (
                        <SkillCard Icon={skill.icon} key={key} name={skill.name} expert={skill.expert}/>
                    ))
                }
            </div>
        </section>
    )
}

export default Skill