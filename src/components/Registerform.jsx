import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrations, setRegistrations] = useState([]);

  useEffect(()=>{
    const fechguest = async()=>{
      const data = await axios.get("https://form-production-93e5.up.railway.app/api/guest/All") ;
      console.log(data.data.guest)
    }
    fechguest();
  })

  const handleSubmit = async (element) => {
    element.preventDefault();
    if (registrations.length >= 20) {
      alert("Sorry, the registration is full. Please stay updated for future events.");
      return;
    } else {
      alert("Please fill in all fields.");
    }
  
      // Registration 
      setRegistrations([...registrations, { name, gender, phoneNumber }]);
      setName("");
      setGender("");
      setPhoneNumber("");
      alert("You have successfully registered!");
   
}

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
            value={name}
            onChange={(element) => setName(element.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">Gender</label>
          <select
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gender}
            onChange={(element) => setGender(element.target.value)}
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
            value={phoneNumber}
            onChange={(element) => setPhoneNumber(element.target.value)}
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