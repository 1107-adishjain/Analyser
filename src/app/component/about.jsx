const About = () => {
  return (
    <div className="max-w-auto mx-auto px-6 py-12 bg-gray-800">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white"> About Accessibility Analyzer</h1>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Welcome to <strong className="text-gray-300">Accessibility Analyzer</strong> — your companion in building web
          experiences that are inclusive, user-friendly, and compliant with global accessibility standards.
        </p>
      </div>

      {/* Why Accessibility Matters */}
      <section className="mb-12 bg-gray-700 rounded-2xl p-8 shadow-sm transition-all ease-in-out hover:scale-101 delay-100">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-50 flex items-center gap-3">
          Why Accessibility Matters
        </h2>
        <p className="text-gray-200 text-lg leading-relaxed">
          Over <strong className="text-gray-300">1 billion people</strong> worldwide live with some form of disability.
          Web accessibility ensures that <strong className="text-gray-300">everyone</strong> — regardless of ability —
          can perceive, understand, navigate, and interact with the web. It's not just about compliance, it's about
          <strong className="text-gray-300"> inclusion</strong>, <strong className="text-gray-300">equity</strong>, and{" "}
          <strong className="text-gray-300">empowerment</strong>.
        </p>
      </section>

      {/* What We Do */}
      <section className="mb-12 bg-gray-700 rounded-2xl p-8 shadow-sm hover:scale-101 transition-all ease-in-out delay-100">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-50 flex items-center gap-3"> What We Do</h2>
        <p className="text-gray-200 text-lg mb-4 leading-relaxed">
          Accessibility Analyzer helps developers and designers identify and fix{" "}
          <strong className="text-gray-300">accessibility issues</strong>
          in their HTML or websites. We provide:
        </p>
        <ul className="space-y-3">
          {[
            "✅ WCAG 2.1 compliance reports",
            "🛠 Fix suggestions for screen readers and keyboard navigation",
            "📊 Issue breakdown by type and severity",
            "🔗 Support for both HTML and live URL testing",
          ].map((item, index) => (
            <li key={index} className="text-gray-100 text-lg flex items-center gap-3 p-3 rounded-lg bg-gray-500 hover:bg-gray-600 transition-colors">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Key Features */}
      {/* <section className="mb-12 bg-gray-50 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 flex items-center gap-3">
          🧩 Key Features
        </h2>
        <ul className="space-y-3">
          {[
            { title: "Instant HTML Analysis:", desc: "Paste your code, get results instantly" },
            { title: "Live URL Checker:", desc: "Scan actual websites for issues" },
            { title: "Developer-Friendly Reports:", desc: "Categorized, descriptive, and WCAG-linked" },
            { title: "Open Source & Transparent:", desc: "Built using Next.js, Tailwind CSS, and axe-core" },
          ].map((feature, index) => (
            <li key={index} className="text-gray-600 text-lg p-4 rounded-lg bg-white">
              <strong className="text-gray-800">{feature.title}</strong> {feature.desc}
            </li>
          ))}
        </ul>
      </section> */}

      {/* Who Should Use It */}
      {/* <section className="mb-12 bg-gray-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 flex items-center gap-3">
          👥 Who Should Use It?
        </h2>
        <p className="text-gray-600 text-lg mb-4 leading-relaxed">Whether you're a:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {["Web Developer", "UI/UX Designer", "QA Tester", "Accessibility Advocate"].map((role, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl mb-2">
                {index === 0 && "💻"}
                {index === 1 && "🎨"}
                {index === 2 && "🧪"}
                {index === 3 && "♿"}
              </div>
              <div className="text-gray-600 font-medium">{role}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          This tool streamlines your accessibility testing workflow.
        </p>
      </section> */}

      {/* Our Mission */}
      <section className="bg-gray-800 rounded-2xl p-8 shadow-sm text-center transition-all ease-in-out hover:scale-101 delay-100">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-50 flex items-center justify-center gap-3">
           Our Mission
        </h2>
        <p className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto">
          To make the web a more inclusive space by giving creators the tools they need to
          <strong className="text-gray-300"> build with empathy</strong> and{" "}
          <strong className="text-gray-300">ship with confidence</strong>.
        </p>
      </section>
    </div>
  )
}

export default About
