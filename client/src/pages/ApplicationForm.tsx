// Application Form Page
// Design: Institutional Elegance - Clean, professional form with validation
// Features: Form validation, Firestore integration, success message, text inputs for state/LGA

import { useState } from "react";
import { useLocation } from "wouter";
import { submitApplication } from "@/lib/firebase";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  currentSchool: string;
  yearsToGraduation: string;
  age: string;
  gradeClass: string;
  stateOfOrigin: string;
  lga: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ApplicationForm() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    currentSchool: "",
    yearsToGraduation: "",
    age: "",
    gradeClass: "",
    stateOfOrigin: "",
    lga: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.emailAddress.trim()) newErrors.emailAddress = "Email is required";
    if (!validateEmail(formData.emailAddress)) newErrors.emailAddress = "Invalid email format";
    if (!formData.currentSchool.trim()) newErrors.currentSchool = "Current school is required";
    if (!formData.yearsToGraduation.trim()) newErrors.yearsToGraduation = "Years to graduation is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (formData.age && isNaN(Number(formData.age))) newErrors.age = "Age must be a number";
    if (!formData.gradeClass.trim()) newErrors.gradeClass = "Grade/Class is required";
    if (!formData.stateOfOrigin.trim()) newErrors.stateOfOrigin = "State of origin is required";
    if (!formData.lga.trim()) newErrors.lga = "LGA is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await submitApplication({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        currentSchool: formData.currentSchool,
        yearsToGraduation: formData.yearsToGraduation,
        age: Number(formData.age),
        gradeClass: formData.gradeClass,
        stateOfOrigin: formData.stateOfOrigin,
        lga: formData.lga
      });

      if (result.success) {
        setSubmitStatus("success");
        setSubmitMessage("Your application has been submitted successfully! We will review it and contact you soon.");
        setFormData({
          fullName: "",
          phoneNumber: "",
          emailAddress: "",
          currentSchool: "",
          yearsToGraduation: "",
          age: "",
          gradeClass: "",
          stateOfOrigin: "",
          lga: ""
        });
        // Redirect after 3 seconds
        setTimeout(() => navigate("/"), 3000);
      } else {
        setSubmitStatus("error");
        setSubmitMessage("Failed to submit application. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl">
            {/* Page Header */}
            <div className="mb-12">
              <h1 className="text-primary mb-4">Scholarship Application Form</h1>
              <p className="text-foreground/70 text-lg">
                Complete this form to apply for our fully funded UK scholarship program. All fields are required.
              </p>
            </div>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Application Submitted</h3>
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Submission Error</h3>
                  <p className="text-red-800">{submitMessage}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.fullName ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="emailAddress" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.emailAddress ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.emailAddress && <p className="text-red-600 text-sm mt-1">{errors.emailAddress}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.phoneNumber ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="+234 (0) 123 456 7890"
                />
                {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Current School */}
              <div>
                <label htmlFor="currentSchool" className="block text-sm font-semibold text-foreground mb-2">
                  Current School *
                </label>
                <input
                  type="text"
                  id="currentSchool"
                  name="currentSchool"
                  value={formData.currentSchool}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.currentSchool ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="Name of your school/institution"
                />
                {errors.currentSchool && <p className="text-red-600 text-sm mt-1">{errors.currentSchool}</p>}
              </div>

              {/* Years to Graduation */}
              <div>
                <label htmlFor="yearsToGraduation" className="block text-sm font-semibold text-foreground mb-2">
                  Years to Graduation *
                </label>
                <input
                  type="text"
                  id="yearsToGraduation"
                  name="yearsToGraduation"
                  value={formData.yearsToGraduation}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.yearsToGraduation ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="e.g., 2 years"
                />
                {errors.yearsToGraduation && <p className="text-red-600 text-sm mt-1">{errors.yearsToGraduation}</p>}
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-foreground mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.age ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="Enter your age"
                />
                {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Grade/Class */}
              <div>
                <label htmlFor="gradeClass" className="block text-sm font-semibold text-foreground mb-2">
                  Grade / Class *
                </label>
                <input
                  type="text"
                  id="gradeClass"
                  name="gradeClass"
                  value={formData.gradeClass}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.gradeClass ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="e.g., SS3, Year 12"
                />
                {errors.gradeClass && <p className="text-red-600 text-sm mt-1">{errors.gradeClass}</p>}
              </div>

              {/* State of Origin */}
              <div>
                <label htmlFor="stateOfOrigin" className="block text-sm font-semibold text-foreground mb-2">
                  State of Origin *
                </label>
                <input
                  type="text"
                  id="stateOfOrigin"
                  name="stateOfOrigin"
                  value={formData.stateOfOrigin}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.stateOfOrigin ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="e.g., Lagos, Abuja"
                />
                {errors.stateOfOrigin && <p className="text-red-600 text-sm mt-1">{errors.stateOfOrigin}</p>}
              </div>

              {/* LGA */}
              <div>
                <label htmlFor="lga" className="block text-sm font-semibold text-foreground mb-2">
                  LGA (Local Government Area) *
                </label>
                <input
                  type="text"
                  id="lga"
                  name="lga"
                  value={formData.lga}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.lga ? "border-red-500 focus:ring-red-500" : "border-border focus:border-accent"
                  }`}
                  placeholder="Enter your LGA"
                />
                {errors.lga && <p className="text-red-600 text-sm mt-1">{errors.lga}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-foreground/60 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
