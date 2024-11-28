"use client";
import React, { useState, FormEvent, useEffect } from "react";

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [universityName, setUniversityName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSignup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your signup logic here
        console.log({
            firstName,
            lastName,
            email,
            phone,
            universityName,
            password,
            confirmPassword,
        });
    };

    // Ensure that the initial state is consistent
    useEffect(() => {
        // This will run only on the client
    }, []);

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    Register
                </h2>
                <form className="space-y-4" onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className=" block text-sm font-medium text-gray-700">
                            Official University Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="john.doe@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number (11 digits)
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="01234567890"
                            maxLength={11}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
                            University Name
                        </label>
                        <input
                            type="text"
                            id="universityName"
                            name="universityName"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your University Name"
                            value={universityName}
                            onChange={(e) => setUniversityName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Create Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="showPassword"
                            className="mr-2"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-700">
                            Show Password
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                    >
                        Sign Up
                    </button>
                    <p className="text-sm text-gray-700 text-center">
                        Already have an account?{" "}
                        <a href="/admin" className="text-blue-600 hover:underline">
                            Login Here
                        </a>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Register;