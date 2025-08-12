import React from "react"
const page=()=>{
  return (
    <div className="min-h-screen bg-white flex">
      <section className="w-1/2 flex flex-col justify-center items-start p-16 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Create a professional resume easily
        </h1>
        <p className="text-gray-600 mb-6">
          With this free, open-source, and powerful resume builder
        </p>
        <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow hover:opacity-90">
          Create Resume →
        </button>
      </section>

      <section className="w-1/2 p-10 bg-gray-50 flex justify-center items-start">
        <div className="bg-white shadow-lg rounded-lg w-[400px] p-6 border-t-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-600">Rajendra.K.Bende</h2>
          <p className="text-gray-600 text-sm">
            Software engineer obsessed with building exceptional products that people love
          </p>
          <div className="mt-4 text-sm text-gray-800">
            <p>EmailId:rajendra@gmail.com</p>
            <p>Phone number:9876543210</p>
            <p>Country:India</p>
            <p>🔗linkedin.com/in/rajendra</p>
          </div>

          <h3 className="mt-6 font-bold border-b pb-1">WORK EXPERIENCE</h3>
          <div className="mt-2">
            <p className="font-semibold">ABC Company</p>
            <p className="text-xs text-gray-500">Software Engineer | May 2023 - Present</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
              <li>Lead a cross-functional team of 5 engineers...</li>
              <li>Create stunning home page product demo animations...</li>
              <li>Write clean code that is modular...</li>
            </ul>
          </div>
        </div>
      </section>
        </div>
  
  )
};
export default page

