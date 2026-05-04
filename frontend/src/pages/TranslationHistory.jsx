// // import React, { useState, useEffect } from "react";
// // import HeaderSection from "../components/translation_history_components/HeaderSection";
// // import StatsCards from "../components/translation_history_components/StatsCards";
// // import SearchFilter from "../components/translation_history_components/SearchFilter";
// // import TranslationTable from "../components/translation_history_components/TranslationTable";
// // import Pagination from "../components/translation_history_components/Pagination";
// // import TranslationLog from "../components/translation_history_components/TranslationLog";
// // import { FaChartLine, FaChartBar, FaCalendarAlt, FaClock } from "react-icons/fa";

// // const languages = ["English", "Urdu", "Arabic", "Persian"];

// // const TranslationHistory = () => {
// //   const [searchText, setSearchText] = useState("");
// //   const [language, setLanguage] = useState("all");
// //   const [allTranslations, setAllTranslations] = useState([]);
// //   const [data, setData] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 4;

// //   // ✅ Dynamic statsData
// //   const now = new Date();
// //   const statsData = [
// //     { icon: <FaChartLine size={24} />, bgColor: "bg-blue-500", caption: "Total Translations", filter: "all",
// //       number: allTranslations.length },
// //     { icon: <FaChartBar size={24} />, bgColor: "bg-indigo-500", caption: "Last Week", filter: "week",
// //       number: allTranslations.filter(i => (now - new Date(i.date)) <= 7 * 24 * 60 * 60 * 1000).length },
// //     { icon: <FaCalendarAlt size={24} />, bgColor: "bg-purple-500", caption: "Last Month", filter: "month",
// //       number: allTranslations.filter(i => (now - new Date(i.date)) <= 30 * 24 * 60 * 60 * 1000).length },
// //     { icon: <FaClock size={24} />, bgColor: "bg-orange-500", caption: "Last Year", filter: "year",
// //       number: allTranslations.filter(i => (now - new Date(i.date)) <= 365 * 24 * 60 * 60 * 1000).length },
// //   ];

// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const res = await fetch("http://localhost:8000/translations/history", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const json = await res.json();
// //         const formatted = json.history.map((item) => ({
// //           detected: item.detected_text,
// //           translated: item.translated_text,
// //           language: item.language,
// //           date: item.created_at?.slice(0, 10),
// //         }));
// //         setAllTranslations(formatted);
// //         setData(formatted);
// //       } catch (err) {
// //         console.error("History fetch error:", err);
// //       }
// //     };
// //     fetchHistory();
// //   }, []);

// //   const handleStatsFilter = (filterType) => {
// //     let filtered = allTranslations;
// //     if (filterType !== "all") {
// //       if (filterType === "week") filtered = allTranslations.slice(-2);
// //       else if (filterType === "month") filtered = allTranslations.slice(-5);
// //       else if (filterType === "year") filtered = allTranslations;
// //     }
// //     setData(filtered);
// //     setCurrentPage(1);
// //   };

// //   useEffect(() => {
// //     let filtered = allTranslations.filter(
// //       (item) =>
// //         item.detected.toLowerCase().includes(searchText.toLowerCase()) ||
// //         item.translated.toLowerCase().includes(searchText.toLowerCase()),
// //     );
// //     if (language !== "all") {
// //       filtered = filtered.filter((item) => item.language === language);
// //     }
// //     setData(filtered);
// //     setCurrentPage(1);
// //   }, [searchText, language, allTranslations]);

// //   return (
// //     <div className=" bg-gray-50 ">
// //       <div className="p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto">
// //         <HeaderSection />
// //         <StatsCards stats={statsData} onFilterClick={handleStatsFilter} />
// //         <div className="w-full mt-6 flex flex-col space-y-4 bg-white pt-4 rounded-2xl shadow">
// //           <div className="w-full">
// //             <SearchFilter
// //               onSearchChange={setSearchText}
// //               onLanguageChange={setLanguage}
// //               languages={languages}
// //             />
// //           </div>
// //           <div className="w-full overflow-x-auto">
// //             <TranslationTable
// //               data={data}
// //               currentPage={currentPage}
// //               rowsPerPage={rowsPerPage}
// //             />
// //           </div>
// //           <Pagination
// //             totalRows={data.length}
// //             rowsPerPage={rowsPerPage}
// //             currentPage={currentPage}
// //             setCurrentPage={setCurrentPage}
// //           />
// //         </div>
// //         <TranslationLog />
// //       </div>
// //     </div>
// //   );
// // };

// // export default TranslationHistory;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import HeaderSection from "../components/translation_history_components/HeaderSection";
// import StatsCards from "../components/translation_history_components/StatsCards";
// import SearchFilter from "../components/translation_history_components/SearchFilter";
// import TranslationTable from "../components/translation_history_components/TranslationTable";
// import Pagination from "../components/translation_history_components/Pagination";
// import TranslationLog from "../components/translation_history_components/TranslationLog";
// import { FaChartLine, FaChartBar, FaCalendarAlt, FaClock } from "react-icons/fa";

// const languages = ["English", "Urdu", "Arabic", "Persian"];

// const TranslationHistory = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <div className="text-center mb-8">
//           <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">HISTORY</span>
//           <h1 className="text-4xl font-bold mt-4 mb-2">Your Translation History</h1>
//           <p className="text-gray-500">
//             Review all your past sign language translations.<br />
//             Track your progress and revisit previous sessions.
//           </p>
//         </div>
//         <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center gap-4">
//           <p className="font-semibold text-gray-700">Please login to view your history.</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const [searchText, setSearchText] = useState("");
//   const [language, setLanguage] = useState("all");
//   const [allTranslations, setAllTranslations] = useState([]);
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 4;

//   const now = new Date();
//   const statsData = [
//     { icon: <FaChartLine size={24} />, bgColor: "bg-blue-500", caption: "Total Translations", filter: "all",
//       number: allTranslations.length },
//     { icon: <FaChartBar size={24} />, bgColor: "bg-indigo-500", caption: "Last Week", filter: "week",
//       number: allTranslations.filter(i => (now - new Date(i.date)) <= 7 * 24 * 60 * 60 * 1000).length },
//     { icon: <FaCalendarAlt size={24} />, bgColor: "bg-purple-500", caption: "Last Month", filter: "month",
//       number: allTranslations.filter(i => (now - new Date(i.date)) <= 30 * 24 * 60 * 60 * 1000).length },
//     { icon: <FaClock size={24} />, bgColor: "bg-orange-500", caption: "Last Year", filter: "year",
//       number: allTranslations.filter(i => (now - new Date(i.date)) <= 365 * 24 * 60 * 60 * 1000).length },
//   ];

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/translations/history", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const json = await res.json();
//         const formatted = json.history.map((item) => ({
//           detected: item.detected_text,
//           translated: item.translated_text,
//           language: item.language,
//           date: item.created_at?.slice(0, 10),
//         }));
//         setAllTranslations(formatted);
//         setData(formatted);
//       } catch (err) {
//         console.error("History fetch error:", err);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleStatsFilter = (filterType) => {
//     let filtered = allTranslations;
//     if (filterType !== "all") {
//       if (filterType === "week") filtered = allTranslations.slice(-2);
//       else if (filterType === "month") filtered = allTranslations.slice(-5);
//       else if (filterType === "year") filtered = allTranslations;
//     }
//     setData(filtered);
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     let filtered = allTranslations.filter(
//       (item) =>
//         item.detected.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.translated.toLowerCase().includes(searchText.toLowerCase()),
//     );
//     if (language !== "all") {
//       filtered = filtered.filter((item) => item.language === language);
//     }
//     setData(filtered);
//     setCurrentPage(1);
//   }, [searchText, language, allTranslations]);

//   return (
//     <div className="bg-gray-50">
//       <div className="p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto">
//         <HeaderSection />
//         <StatsCards stats={statsData} onFilterClick={handleStatsFilter} />
//         <div className="w-full mt-6 flex flex-col space-y-4 bg-white pt-4 rounded-2xl shadow">
//           <div className="w-full">
//             <SearchFilter
//               onSearchChange={setSearchText}
//               onLanguageChange={setLanguage}
//               languages={languages}
//             />
//           </div>
//           <div className="w-full overflow-x-auto">
//             <TranslationTable
//               data={data}
//               currentPage={currentPage}
//               rowsPerPage={rowsPerPage}
//             />
//           </div>
//           <Pagination
//             totalRows={data.length}
//             rowsPerPage={rowsPerPage}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//           />
//         </div>
//         <TranslationLog />
//       </div>
//     </div>
//   );
// };

// export default TranslationHistory;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSection from "../components/translation_history_components/HeaderSection";
import StatsCards from "../components/translation_history_components/StatsCards";
import SearchFilter from "../components/translation_history_components/SearchFilter";
import TranslationTable from "../components/translation_history_components/TranslationTable";
import Pagination from "../components/translation_history_components/Pagination";
import TranslationLog from "../components/translation_history_components/TranslationLog";
import { FaChartLine, FaChartBar, FaCalendarAlt, FaClock } from "react-icons/fa";

const languages = ["English", "Urdu", "Arabic", "Persian"];

const TranslationHistory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">HISTORY</span>
          <h1 className="text-4xl font-bold mt-4 mb-2">Your Translation History</h1>
          <p className="text-gray-500">
            Review all your past sign language translations.<br />
            Track your progress and revisit previous sessions.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center gap-4">
          <p className="font-semibold text-gray-700">Please login to view your history.</p>
          <button
            onClick={() => navigate("/login")}  // ✅ feedback jesa same /login
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState("all");
  const [allTranslations, setAllTranslations] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const now = new Date();
  const statsData = [
    { icon: <FaChartLine size={24} />, bgColor: "bg-blue-500", caption: "Total Translations", filter: "all",
      number: allTranslations.length },
    { icon: <FaChartBar size={24} />, bgColor: "bg-indigo-500", caption: "Last Week", filter: "week",
      number: allTranslations.filter(i => (now - new Date(i.date)) <= 7 * 24 * 60 * 60 * 1000).length },
    { icon: <FaCalendarAlt size={24} />, bgColor: "bg-purple-500", caption: "Last Month", filter: "month",
      number: allTranslations.filter(i => (now - new Date(i.date)) <= 30 * 24 * 60 * 60 * 1000).length },
    { icon: <FaClock size={24} />, bgColor: "bg-orange-500", caption: "Last Year", filter: "year",
      number: allTranslations.filter(i => (now - new Date(i.date)) <= 365 * 24 * 60 * 60 * 1000).length },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:8000/translations/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        const formatted = json.history.map((item) => ({
          detected: item.detected_text,
          translated: item.translated_text,
          language: item.language,
          date: item.created_at?.slice(0, 10),
        }));
        setAllTranslations(formatted);
        setData(formatted);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };
    fetchHistory();
  }, []);

  const handleStatsFilter = (filterType) => {
    let filtered = allTranslations;
    if (filterType !== "all") {
      if (filterType === "week") filtered = allTranslations.slice(-2);
      else if (filterType === "month") filtered = allTranslations.slice(-5);
      else if (filterType === "year") filtered = allTranslations;
    }
    setData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    let filtered = allTranslations.filter(
      (item) =>
        item.detected.toLowerCase().includes(searchText.toLowerCase()) ||
        item.translated.toLowerCase().includes(searchText.toLowerCase()),
    );
    if (language !== "all") {
      filtered = filtered.filter((item) => item.language === language);
    }
    setData(filtered);
    setCurrentPage(1);
  }, [searchText, language, allTranslations]);

  return (
    <div className="bg-gray-50">
      <div className="p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto">
        <HeaderSection />
        <StatsCards stats={statsData} onFilterClick={handleStatsFilter} />
        <div className="w-full mt-6 flex flex-col space-y-4 bg-white pt-4 rounded-2xl shadow">
          <div className="w-full">
            <SearchFilter
              onSearchChange={setSearchText}
              onLanguageChange={setLanguage}
              languages={languages}
            />
          </div>
          <div className="w-full overflow-x-auto">
            <TranslationTable
              data={data}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
            />
          </div>
          <Pagination
            totalRows={data.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <TranslationLog />
      </div>
    </div>
  );
};

export default TranslationHistory;