// Firebase Configuration
// Design: Institutional Elegance - Clean, organized Firebase setup
// This module handles all Firebase initialization and Firestore operations

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDGtwrqcgRNPySWGVNX4PInWCOYJ8Y2Qak",
  authDomain: "clearpath-f099c.firebaseapp.com",
  projectId: "clearpath-f099c",
  storageBucket: "clearpath-f099c.firebasestorage.app",
  messagingSenderId: "1049801546802",
  appId: "1:1049801546802:web:aea2c07295e878120db02b",
  measurementId: "G-4BB4E2VCNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Firestore collection names
export const COLLECTIONS = {
  APPLICATIONS: "applications"
};

// Application form data interface
export interface ApplicationSubmission {
  id?: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  currentSchool: string;
  yearsToGraduation: string;
  age: number;
  gradeClass: string;
  stateOfOrigin: string;
  lga: string;
  createdAt: Date;
}

// Submit application form
export async function submitApplication(data: Omit<ApplicationSubmission, "id" | "createdAt">) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), {
      ...data,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, error };
  }
}

// Get all applications
export async function getAllApplications() {
  try {
    const q = query(
      collection(db, COLLECTIONS.APPLICATIONS),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const applications: ApplicationSubmission[] = [];
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      } as ApplicationSubmission);
    });
    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

// Search applications by name, email, or phone
export async function searchApplications(searchTerm: string) {
  try {
    const allApps = await getAllApplications();
    const lowerSearch = searchTerm.toLowerCase();
    return allApps.filter(app =>
      app.fullName.toLowerCase().includes(lowerSearch) ||
      app.emailAddress.toLowerCase().includes(lowerSearch) ||
      app.phoneNumber.includes(searchTerm) ||
      app.stateOfOrigin.toLowerCase().includes(lowerSearch)
    );
  } catch (error) {
    console.error("Error searching applications:", error);
    return [];
  }
}

// Delete application
export async function deleteApplication(id: string) {
  try {
    await deleteDoc(doc(db, COLLECTIONS.APPLICATIONS, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting application:", error);
    return { success: false, error };
  }
}

export { db, app, analytics };
