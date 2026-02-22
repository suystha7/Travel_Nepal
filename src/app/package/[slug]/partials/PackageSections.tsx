import React from "react";

interface Section {
  id: string;
  component: React.ReactNode;
}

const PackageSections: React.FC<{ sections: Section[] }> = ({ sections }) => {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="bg-white rounded-xl p-8 border border-gray-200 scroll-mt-32"
        >
          {section.component}
        </section>
      ))}
    </div>
  );
};

export default PackageSections;
