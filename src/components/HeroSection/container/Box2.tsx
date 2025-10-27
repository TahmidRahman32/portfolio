import Image from "next/image";
import a from "../../../../public/SkillsIcon/pngegg (1).png"
import b from "../../../../public/SkillsIcon/pngegg (2).png"
import c from "../../../../public/SkillsIcon/pngegg (3).png"
import d from "../../../../public/SkillsIcon/pngegg (4).png"
import e from "../../../../public/SkillsIcon/pngegg (5).png"
import f from "../../../../public/SkillsIcon/pngegg (6).png"
import g from "../../../../public/SkillsIcon/pngegg (7).png"
import h from "../../../../public/SkillsIcon/Postgresql_elephant.svg";
import i from "../../../../public/SkillsIcon/pngegg (9).png"
import k from "../../../../public/SkillsIcon/f6e60edb-ee79-4dee-914c-841e14638aa9.webp"
import l from "../../../../public/SkillsIcon/pngegg.png"
import m from "../../../../public/SkillsIcon/pngwing.com (1).png"
import n from "../../../../public/SkillsIcon/pngwing.com.png"
import o from "../../../../public/SkillsIcon/vecteezy_tailwind-css-logo-rounded_67565433.png"
import p from "../../../../public/SkillsIcon/pngwing.com (2).png"


const Box2 = () => {
   return (
      <div className="text-center ">
         <h2 className="text-xl">Skills</h2>
         <div className="border-t border-2 border-gray-300 my-1 w-24 mx-auto"></div>
         <div className="grid grid-cols-6 justify-center items-center gap-3 space-y-4">
            <Image title="React" src={a} width={44} height={24} alt="icon"></Image>
            <Image title="HTML" src={b} width={44} height={24} alt="icon"></Image>
            <Image title="Node.is" src={c} width={44} height={24} alt="icon"></Image>
            <Image title="Express" src={d} width={44} height={24} alt="icon"></Image>
            <Image title="Typescript" src={e} width={44} height={24} alt="icon"></Image>
            <Image title="Redux" src={f} width={44} height={24} alt="icon"></Image>
            <Image title="Bootstrap" src={g} width={44} height={24} alt="icon"></Image>
            <Image title="Postgres" src={h} width={44} height={24} alt="icon"></Image>
            <Image title="CSS" src={i} width={44} height={24} alt="icon"></Image>
            <Image title="ShadCN" src={k} width={44} height={24} alt="icon"></Image>
            <Image title="javascript" src={l} width={44} height={24} alt="icon"></Image>
            <Image title="Next-js" src={m} width={44} height={24} alt="icon"></Image>
            <Image title="Prisma" src={n} width={44} height={24} alt="icon"></Image>
            <Image title="Tailwind" src={o} width={44} height={24} alt="icon" className="mb-4"></Image>
            <Image title="MongoDB" src={p} width={44} height={24} alt="icon" className="mb-4"></Image>
         </div>
      </div>
   );
};

export default Box2;