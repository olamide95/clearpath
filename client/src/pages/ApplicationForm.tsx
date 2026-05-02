// pages/ApplicationForm.tsx
// Scholarship Application Form
// EmailJS: sends confirmation email to applicant after successful Firestore submission

import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2, ArrowLeft } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Firebase Configuration ───────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDGtwrqcgRNPySWGVNX4PInWCOYJ8Y2Qak",
  authDomain: "clearpath-f099c.firebaseapp.com",
  projectId: "clearpath-f099c",
  storageBucket: "clearpath-f099c.firebasestorage.app",
  messagingSenderId: "1049801546802",
  appId: "1:1049801546802:web:aea2c07295e878120db02b",
  measurementId: "G-4BB4E2VCNS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── EmailJS Configuration ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  school: string;
  graduationYear: string;
  age: string;
  cgpa: string;
  stateOfOrigin: string;
  lga: string;
  motivation: string;
}

interface FormErrors {
  [key: string]: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ApplicationForm() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    school: "",
    graduationYear: "",
    age: "",
    cgpa: "",
    stateOfOrigin: "",
    lga: "",
    motivation: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // ─── Validation ─────────────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.school.trim()) {
      newErrors.school = "School name is required";
    }

    if (!formData.graduationYear.trim()) {
      newErrors.graduationYear = "Graduation year is required";
    } else if (!/^\d{4}$/.test(formData.graduationYear)) {
      newErrors.graduationYear = "Please enter a valid year (e.g., 2026)";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 16 || Number(formData.age) > 100) {
      newErrors.age = "Please enter a valid age (16–100)";
    }

    if (!formData.cgpa) {
      newErrors.cgpa = "CGPA is required";
    }

    if (!formData.stateOfOrigin.trim()) {
      newErrors.stateOfOrigin = "State of origin is required";
    }

    if (!formData.lga.trim()) {
      newErrors.lga = "LGA is required";
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = "Motivation essay is required";
    } else if (formData.motivation.trim().split(/\s+/).filter(w => w.length > 0).length < 200) {
      newErrors.motivation = "Motivation must be at least 200 words";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Input Handler ──────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // ─── Send Confirmation Email ────────────────────────────────────────────────
  const sendApplicantConfirmationEmail = async () => {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: formData.emailAddress,
        to_name: formData.fullName,
        subject: "Application Received Successfully",
        message: `Dear ${formData.fullName},

Thank you for submitting your scholarship application.

We have received your application successfully. Our team will review your details and contact you if further information is required.

Application Summary:
Full Name: ${formData.fullName}
Email: ${formData.emailAddress}
Phone Number: ${formData.phoneNumber}
School: ${formData.school}
Graduation Year: ${formData.graduationYear}
CGPA Classification: ${formData.cgpa}
State of Origin: ${formData.stateOfOrigin}
LGA: ${formData.lga}

Best regards,
The ClearPath Team`
      },
      EMAILJS_PUBLIC_KEY
    );
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "applications"), {
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        school: formData.school,
        graduationYear: formData.graduationYear,
        age: Number(formData.age),
        cgpa: formData.cgpa,
        stateOfOrigin: formData.stateOfOrigin,
        lga: formData.lga,
        motivation: formData.motivation,
        createdAt: serverTimestamp()
      });

      try {
        await sendApplicantConfirmationEmail();
        toast.success("Application submitted successfully! A confirmation email has been sent to you.");
      } catch (emailError) {
        console.error("Application saved, but confirmation email failed:", emailError);
        toast.success("Application submitted successfully! However, confirmation email could not be sent.");
      }

      setFormData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        school: "",
        graduationYear: "",
        age: "",
        cgpa: "",
        stateOfOrigin: "",
        lga: "",
        motivation: ""
      });

      setTimeout(() => setLocation("/"), 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Word count for motivation ───────────────────────────────────────────────
  const wordCount = formData.motivation
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0).length;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="container py-12 md:py-16">

          {/* Back Button */}
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Form Header */}
          <div className="max-w-2xl mx-auto mb-12">
            <h1 className="font-serif text-4xl font-bold text-primary mb-4">
              Scholarship Application
            </h1>
            <p className="text-foreground/70 text-lg">
              Complete this form to apply for our fully funded UK scholarship opportunity.
              All fields are required.
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg border border-border p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.emailAddress && (
                  <p className="text-red-600 text-sm mt-1">{errors.emailAddress}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+234 (0) 123 456 7890"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              {/* School */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  School (Current or Graduated From) *
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="e.g., University of Lagos"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.school && (
                  <p className="text-red-600 text-sm mt-1">{errors.school}</p>
                )}
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Graduation Year *
                </label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="e.g., 2026"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.graduationYear && (
                  <p className="text-red-600 text-sm mt-1">{errors.graduationYear}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min={16}
                  max={100}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.age && (
                  <p className="text-red-600 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              {/* CGPA */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  CGPA Classification *
                </label>
                <select
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all bg-white"
                >
                  <option value="">Select your CGPA classification</option>
                  <option value="First Class">First Class</option>
                  <option value="Second Class Upper">Second Class Upper</option>
                  <option value="Second Class Lower">Second Class Lower</option>
                  <option value="Third Class">Third Class</option>
                </select>
                {errors.cgpa && (
                  <p className="text-red-600 text-sm mt-1">{errors.cgpa}</p>
                )}
              </div>

              {/* State of Origin */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  State of Origin *
                </label>
                <input
                  type="text"
                  name="stateOfOrigin"
                  value={formData.stateOfOrigin}
                  onChange={handleChange}
                  placeholder="e.g., Lagos"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.stateOfOrigin && (
                  <p className="text-red-600 text-sm mt-1">{errors.stateOfOrigin}</p>
                )}
              </div>

              {/* LGA */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Local Government Area (LGA) *
                </label>
                <input
                  type="text"
                  name="lga"
                  value={formData.lga}
                  onChange={handleChange}
                  placeholder="e.g., Ikeja"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
                {errors.lga && (
                  <p className="text-red-600 text-sm mt-1">{errors.lga}</p>
                )}
              </div>

              {/* Motivation Essay */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="block text-sm font-semibold text-foreground">
                    Why do you want this scholarship? *
                  </label>
                  <span
                    className={`text-xs font-medium ${
                      wordCount >= 200 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {wordCount} / 200 words minimum
                  </span>
                </div>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Write at least 200 words explaining why you want this scholarship, your academic goals, and how this opportunity will help you achieve them."
                  rows={8}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                />
                {errors.motivation && (
                  <p className="text-red-600 text-sm mt-1">{errors.motivation}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-foreground/60 text-center pt-2">
                By submitting this form, you agree to our privacy policy and terms of service.
                A confirmation email will be sent to the address you provided.
              </p>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}