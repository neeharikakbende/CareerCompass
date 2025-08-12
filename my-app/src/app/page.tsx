import Link from "next/dist/client/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-blue-600 text-white py-20 justify-center items-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CareerCompass</h1>
          <p className="max-w-2xl mx-auto text-lg mb-6">
            Personalized counseling, resume reviews, and interview prep to help
            you land your dream career.
          </p>
          <a
            href="#services"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 font-semibold"
          >
            Get Started
          </a>
        </div>
      </section>

      <section id="services" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">Career Counseling</h3>
              <p>
                Get personalized advice to identify your strengths and choose
                the right path.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">Resume Building</h3>
              <p>
                Stand out to employers with a professionally crafted resume
                tailored to your goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">
                Interview Preparation
              </h3>
              <p>
                Boost your confidence with mock interviews and targeted feedback
                from experts.
              </p>
            </div>
          </div>
        </div>
        </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="mb-6">With free efficient career builder</p>
        <Link href={"/pages/start"} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow font-semibold">Start now</Link>
      </section>
    </main>
  );
}
