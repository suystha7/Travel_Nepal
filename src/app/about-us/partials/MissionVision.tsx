import { Compass, Target, Mountain } from "lucide-react";
import { IAboutUsMissionVision } from "../interface/IAboutUs";
import RichText from "@/utils/richText";

const MissionVision = ({
  missionVisionData,
}: {
  missionVisionData: IAboutUsMissionVision;
}) => {
  const words = missionVisionData?.heading?.split(" ") || [];

  return (
    <section className="p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <Mountain size={16} />
              <span>Explore Further</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary-500 leading-tight mb-8">
              {words[0]} <span className="text-secondary-500">{words[1]}</span>{" "}
              <br />
              {words.slice(2).join(" ")}
            </h2>
            <p className="text-gray-400 text-lg">
              {missionVisionData?.sub_text}
            </p>
          </div>

          <div className="lg:w-2/3 relative grid md:grid-cols-2 gap-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/20 blur-[120px] pointer-events-none" />

            <div className="relative group p-1 bg-linear-to-b from-primary-500/50 to-transparent rounded-2xl ">
              <div className="p-10 h-full transition-transform duration-500 group-hover:rotate-1 ">
                <div className="mb-8 flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white text-primary-500">
                    <Target size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                </div>
                <RichText
                  content={missionVisionData?.mission}
                  className="text-gray-900 leading-relaxed"
                />
              </div>
            </div>

            <div className="relative group p-1 bg-linear-to-b from-secondary-500/50 to-transparent rounded-2xl md:mt-12">
              <div className=" p-10 rounded-[1.9rem] h-full transition-transform duration-500 group-hover:-rotate-1">
                <div className="mb-8 flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white text-secondary-500">
                    <Compass size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                </div>

                <RichText
                  content={missionVisionData?.vision}
                  className="text-gray-900 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
