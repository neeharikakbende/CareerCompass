export default function Start() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Create a professional resume
          </h1>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Create Resume →
          </button>
          <p className="mt-6 text-gray-500">
            Already have a resume? Test its ATS readability with the{" "}
            <a href="#" className="text-blue-500 underline">
              resume parser
            </a>
          </p>
        </div>
        </div>
        </div>
  )
};