// Programs Section Component
// Design: Institutional Elegance - Asymmetric layout with program cards
// Features: Four program types with descriptions

export default function ProgramsSection() {
  const programs = [
    {
      title: "Undergraduate",
      description: "Three-year bachelor's degree programs at top-tier UK universities. Perfect for high school graduates seeking quality education.",
      level: "Entry Level"
    },
    {
      title: "Postgraduate",
      description: "Master's degree programs designed for career advancement and specialization. Ideal for professionals seeking advanced qualifications.",
      level: "Advanced"
    },
    {
      title: "Professional Programs",
      description: "Specialized professional certifications and diplomas in high-demand fields. Recognized globally for career excellence.",
      level: "Professional"
    },
    {
      title: "Professional Courses",
      description: "Short-term intensive courses and certifications for skill development. Flexible options for working professionals.",
      level: "Short-term"
    }
  ];

  return (
    <section className="section-spacing bg-secondary/5">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="inline-block text-accent font-semibold text-sm mb-3 uppercase tracking-wider">
            Program Options
          </span>
          <h2 className="text-primary mb-6 max-w-2xl">Programs Available</h2>
          <p className="text-foreground/70 max-w-2xl text-lg">
            Choose from a variety of scholarship programs tailored to your academic level and career aspirations.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="card-embossed p-8 border-l-4 border-accent hover:shadow-lg transition-all duration-300 group"
            >
              {/* Level Badge */}
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4">
                {program.level}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/70 leading-relaxed">
                {program.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-semibold">Learn more</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
