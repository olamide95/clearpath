// Admin Dashboard Page
// Design: Institutional Elegance - Professional admin interface

import { useState, useEffect } from "react";
import { Loader2, Search, Trash2, Download, Eye, EyeOff } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Firebase configuration
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

interface Application {
  id?: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  school: string;
  graduationYear: string;
  age: number;
  cgpa: string;
  stateOfOrigin: string;
  lga: string;
  motivation: string;
  createdAt: Timestamp;
}

interface ContactMessage {
  id?: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"applications" | "messages">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch applications
        const applicationsSnapshot = await getDocs(collection(db, "applications"));
        const applicationsData = applicationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Application[];
        setApplications(applicationsData);
        setFilteredApplications(applicationsData);

        // Fetch contact messages
        const messagesSnapshot = await getDocs(collection(db, "contact_messages"));
        const messagesData = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactMessage[];
        setContactMessages(messagesData);
        setFilteredMessages(messagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter applications
  useEffect(() => {
    const filtered = applications.filter(app =>
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phoneNumber.includes(searchTerm) ||
      app.stateOfOrigin.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  }, [searchTerm, applications]);

  // Filter contact messages
  useEffect(() => {
    const filtered = contactMessages.filter(msg =>
      msg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.phoneNumber.includes(searchTerm) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchTerm, contactMessages]);

  const handleDelete = async (id: string, collection: string) => {
    try {
      await deleteDoc(doc(db, collection, id));
      
      if (collection === "applications") {
        setApplications(applications.filter(app => app.id !== id));
      } else {
        setContactMessages(contactMessages.filter(msg => msg.id !== id));
      }
      
      toast.success("Deleted successfully");
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete");
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = Object.keys(data[0]).filter(key => key !== "id");
    const csvContent = [
      headers.join(","),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          if (value instanceof Timestamp) {
            return formatDate(value);
          }
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`;
          }
          return value || "";
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Exported successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="container py-12 md:py-16">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl font-bold text-primary mb-4">
              Admin Dashboard
            </h1>
            <p className="text-foreground/70 text-lg">
              Manage scholarship applications and contact messages
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === "applications"
                  ? "border-accent text-primary"
                  : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              Scholarship Applications ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === "messages"
                  ? "border-accent text-primary"
                  : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              Contact Messages ({contactMessages.length})
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <>
              {/* Search Bar */}
              <div className="mb-8 flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    placeholder={activeTab === "applications" ? "Search by name, email, phone, or state..." : "Search by name, email, phone, or subject..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <button
                  onClick={() => exportToCSV(
                    activeTab === "applications" ? filteredApplications : filteredMessages,
                    `${activeTab === "applications" ? "applications" : "contact_messages"}_${new Date().toISOString().split('T')[0]}.csv`
                  )}
                  className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-primary/5 rounded-lg p-6">
                  <p className="text-foreground/70 text-sm mb-2">Total {activeTab === "applications" ? "Applications" : "Messages"}</p>
                  <p className="text-3xl font-bold text-primary">
                    {activeTab === "applications" ? applications.length : contactMessages.length}
                  </p>
                </div>
                <div className="bg-accent/5 rounded-lg p-6">
                  <p className="text-foreground/70 text-sm mb-2">Filtered Results</p>
                  <p className="text-3xl font-bold text-accent">
                    {activeTab === "applications" ? filteredApplications.length : filteredMessages.length}
                  </p>
                </div>
                <div className="bg-primary/5 rounded-lg p-6">
                  <p className="text-foreground/70 text-sm mb-2">Last Updated</p>
                  <p className="text-lg font-semibold text-primary">
                    {activeTab === "applications" && applications.length > 0
                      ? formatDate(applications[0].createdAt)
                      : activeTab === "messages" && contactMessages.length > 0
                      ? formatDate(contactMessages[0].createdAt)
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Applications Table */}
              {activeTab === "applications" && (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full">
                    <thead className="bg-primary/5 border-b border-border">
                      <tr>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Full Name</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Email</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Phone</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">School</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">CGPA</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">State</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Submitted</th>
                        <th className="py-4 px-4 text-center text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 px-4 text-center text-foreground/60">
                            No applications found
                          </td>
                        </tr>
                      ) : (
                        filteredApplications.map((app) => (
                          <tr key={app.id} className="border-b border-border hover:bg-primary/2 transition-colors">
                            <td className="py-4 px-4 text-foreground font-semibold">{app.fullName}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{app.emailAddress}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{app.phoneNumber}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{app.school}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{app.cgpa}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{app.stateOfOrigin}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{formatDate(app.createdAt)}</td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => setExpandedId(expandedId === app.id ? null : (app.id || null))}
                                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                  title="View details"
                                >
                                  {expandedId === app.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(app.id || null)}
                                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                  title="Delete application"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Contact Messages Table */}
              {activeTab === "messages" && (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full">
                    <thead className="bg-primary/5 border-b border-border">
                      <tr>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Full Name</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Email</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Phone</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Subject</th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-foreground">Submitted</th>
                        <th className="py-4 px-4 text-center text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMessages.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 px-4 text-center text-foreground/60">
                            No contact messages found
                          </td>
                        </tr>
                      ) : (
                        filteredMessages.map((msg) => (
                          <tr key={msg.id} className="border-b border-border hover:bg-primary/2 transition-colors">
                            <td className="py-4 px-4 text-foreground font-semibold">{msg.fullName}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{msg.emailAddress}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{msg.phoneNumber}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{msg.subject}</td>
                            <td className="py-4 px-4 text-foreground/70 text-sm">{formatDate(msg.createdAt)}</td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => setExpandedId(expandedId === msg.id ? null : (msg.id || null))}
                                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                  title="View message"
                                >
                                  {expandedId === msg.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(msg.id || null)}
                                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                  title="Delete message"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Expanded Details Modal */}
              {expandedId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-8">
                    {activeTab === "applications" && filteredApplications.find(a => a.id === expandedId) && (
                      <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-bold text-primary mb-6">Application Details</h3>
                        {(() => {
                          const app = filteredApplications.find(a => a.id === expandedId)!;
                          return (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-foreground/60">Full Name</p>
                                  <p className="font-semibold">{app.fullName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Email</p>
                                  <p className="font-semibold">{app.emailAddress}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Phone</p>
                                  <p className="font-semibold">{app.phoneNumber}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">School</p>
                                  <p className="font-semibold">{app.school}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Graduation Year</p>
                                  <p className="font-semibold">{app.graduationYear}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">CGPA</p>
                                  <p className="font-semibold">{app.cgpa}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Age</p>
                                  <p className="font-semibold">{app.age}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">State</p>
                                  <p className="font-semibold">{app.stateOfOrigin}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">LGA</p>
                                  <p className="font-semibold">{app.lga}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Submitted</p>
                                  <p className="font-semibold">{formatDate(app.createdAt)}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-foreground/60 mb-2">Motivation</p>
                                <p className="bg-primary/5 p-4 rounded-lg text-sm leading-relaxed">{app.motivation}</p>
                              </div>
                            </>
                          );
                        })()}
                        <button
                          onClick={() => setExpandedId(null)}
                          className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    )}
                    {activeTab === "messages" && filteredMessages.find(m => m.id === expandedId) && (
                      <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-bold text-primary mb-6">Message Details</h3>
                        {(() => {
                          const msg = filteredMessages.find(m => m.id === expandedId)!;
                          return (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-foreground/60">Full Name</p>
                                  <p className="font-semibold">{msg.fullName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Email</p>
                                  <p className="font-semibold">{msg.emailAddress}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Phone</p>
                                  <p className="font-semibold">{msg.phoneNumber}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-foreground/60">Subject</p>
                                  <p className="font-semibold">{msg.subject}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-foreground/60">Submitted</p>
                                  <p className="font-semibold">{formatDate(msg.createdAt)}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-foreground/60 mb-2">Message</p>
                                <p className="bg-primary/5 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                              </div>
                            </>
                          );
                        })()}
                        <button
                          onClick={() => setExpandedId(null)}
                          className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-sm w-full p-8">
                    <h3 className="font-serif text-xl font-bold text-primary mb-4">
                      Confirm Delete
                    </h3>
                    <p className="text-foreground/70 mb-6">
                      Are you sure you want to delete this {activeTab === "applications" ? "application" : "message"}? This action cannot be undone.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1 px-4 py-2 border border-border rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(deleteConfirm, activeTab === "applications" ? "applications" : "contact_messages")}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
