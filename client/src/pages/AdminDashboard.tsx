// Admin Dashboard Page
// Design: Institutional Elegance - Clean dashboard with data table
// Features: View submissions, search, filter, delete, CSV export, stats

import { useEffect, useState } from "react";
import { getAllApplications, deleteApplication, searchApplications, ApplicationSubmission } from "@/lib/firebase";
import { Trash2, Download, Search, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load applications on mount
  useEffect(() => {
    loadApplications();
  }, []);

  // Update filtered results when search term changes
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = applications.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phoneNumber.includes(searchTerm) ||
        app.stateOfOrigin.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  }, [searchTerm, applications]);

  const loadApplications = async () => {
    setIsLoading(true);
    try {
      const data = await getAllApplications();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteApplication(id);
    if (result.success) {
      setApplications(applications.filter(app => app.id !== id));
      setDeleteConfirm(null);
    }
  };

  const exportToCSV = () => {
    if (filteredApplications.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "School",
      "Years to Graduation",
      "Age",
      "Grade/Class",
      "State",
      "LGA",
      "Submission Date"
    ];

    const rows = filteredApplications.map(app => [
      app.fullName,
      app.emailAddress,
      app.phoneNumber,
      app.currentSchool,
      app.yearsToGraduation,
      app.age,
      app.gradeClass,
      app.stateOfOrigin,
      app.lga,
      new Date(app.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scholarship-applications-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container">
            {/* Page Header */}
            <div className="mb-12">
              <h1 className="text-primary mb-4">Admin Dashboard</h1>
              <p className="text-foreground/70 text-lg">
                View and manage all scholarship applications.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="card-embossed p-6">
                <p className="text-foreground/60 text-sm font-semibold mb-2">Total Applications</p>
                <p className="font-serif text-4xl font-bold text-primary">{applications.length}</p>
              </div>
              <div className="card-embossed p-6">
                <p className="text-foreground/60 text-sm font-semibold mb-2">Showing</p>
                <p className="font-serif text-4xl font-bold text-accent">{filteredApplications.length}</p>
              </div>
              <div className="card-embossed p-6">
                <p className="text-foreground/60 text-sm font-semibold mb-2">Last Updated</p>
                <p className="text-foreground font-semibold">
                  {applications.length > 0
                    ? formatDate(applications[0].createdAt)
                    : "No data"}
                </p>
              </div>
            </div>

            {/* Search and Export */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
              <button
                onClick={exportToCSV}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Table */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">Loading applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="card-embossed p-12 text-center">
                <AlertCircle className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No Applications Found</h3>
                <p className="text-foreground/60">
                  {searchTerm ? "Try adjusting your search criteria." : "No applications submitted yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-semibold text-foreground/80">Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground/80">Email</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground/80">Phone</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground/80">State</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground/80">School</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground/80">Submitted</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground/80">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                        <td className="py-4 px-4 text-foreground font-medium">{app.fullName}</td>
                        <td className="py-4 px-4 text-foreground/70 text-sm">{app.emailAddress}</td>
                        <td className="py-4 px-4 text-foreground/70 text-sm">{app.phoneNumber}</td>
                        <td className="py-4 px-4 text-foreground/70 text-sm">{app.stateOfOrigin}</td>
                        <td className="py-4 px-4 text-foreground/70 text-sm">{app.currentSchool}</td>
                        <td className="py-4 px-4 text-foreground/70 text-sm">{formatDate(app.createdAt)}</td>
                        <td className="py-4 px-4">
                          <div className="flex justify-center gap-2">
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-sm mx-4">
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Confirm Delete</h3>
                  <p className="text-foreground/70 mb-6">
                    Are you sure you want to delete this application? This action cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(deleteConfirm)}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
