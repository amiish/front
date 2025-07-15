import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

export default function RegisterForm() {
  const [registrations, setRegistrations] = useState([]);
  const [formData , setFormData] = useState({
   guestname : "",
   phoneguest : "",
   gender :""
  })


  const handleChange = (e)=>{
     setFormData({...formData, [e.target.name]: e.target.value})
  }

 useEffect(() => {
  const fetchGuest = async () => {
    try {
      const data = await axios.get("https://form-production-93e5.up.railway.app/api/guest/All");
      console.log(data.data.guest);
      setRegistrations(data.data.guest); // optional
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  fetchGuest();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (registrations.length >= 20) {
    alert("Sorry, the registration is full. Please stay updated for future events.");
    return;
  }

  if (!formData.guestname || !formData.gender || !formData.phoneguest) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await axios.post(
      "https://form-production-93e5.up.railway.app/api/guest/new",
      formData
    );

    alert("Guest successfully registered!");
    setRegistrations([...registrations, res.data.guest]); // update list
    setFormData({ guestname: "", gender: "" , phoneguest: "" }); // reset form
  } catch (error) {
    console.error("Error posting new guest:", error);
    alert("Error submitting the form.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-start pt-12 px-4">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-2">TK</h1>
      <p className="text-center text-gray-700 text-lg mb-8 max-w-md">
        If you ready to join our upcoming meeting, please fill out the form below.
      </p>
    
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-blue-200">
        <div className="mb-5">
          <div className="flex justify-between flex-row-reverse">
            <h2 className="">{registrations.length}</h2>
            <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
          </div>
          <input
            type="text"
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.guestname}
            name="guestname"
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">Gender</label>
          <select
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.gender}
            name="gender"
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
          <input
            type="text"
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phoneguest}
            name="phoneguest"
            onChange={handleChange}
            placeholder="Enter your phone number"
            maxLength={9}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
          Submit
        </button>
      </form>

      <p className="mt-6 text-gray-700 text-sm">
        Your participation is very important to us.{" "}
        <span className="text-blue-700 text-lg font-bold">TK</span>
      </p>
    </div>
  );

}