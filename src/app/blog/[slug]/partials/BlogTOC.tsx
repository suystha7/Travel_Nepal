const BlogTOC = ({ items }: { items: string[] }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-8 border-2 border-primary-500/10 rounded-xl bg-white">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-8 flex items-center gap-3">
        <div className="w-8 h-px bg-primary-500" />
        Table of Contents
      </h4>
      <nav>
        <ul className="space-y-6">
          {items.map((text, i) => (
            <li
              key={i}
              onClick={() => scrollToSection(`section-${i}`)}
              className="flex items-start gap-4 group cursor-pointer"
            >
              <span className="text-primary-300 font-mono text-xs mt-1 group-hover:text-primary-500 transition-colors">
                0{i + 1}
              </span>
              <span className="text-sm font-bold text-slate-600 group-hover:text-primary-500 transition-colors leading-6 capitalize">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BlogTOC;
