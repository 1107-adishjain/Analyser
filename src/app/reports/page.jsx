"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import supabase from "@/lib/supabase"

export default function ReportsPage() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("created_at")
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("violations")
        .select("*")

      if (error) setError(error)
      else setData(data)
    console.log('Fetched data:', data)
    }
    fetchData()
  }, [])

  
  const filteredData = data
    .filter((item) =>
      item.url?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score
      if (sortBy === "violations") return b.violations_count - a.violations_count
      return new Date(b.created_at) - new Date(a.created_at)
    })

  return (
    <div className="p-6">
      <h1 className="font-bold text-center text-3xl mb-8">Reports</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        >
          <option value="created_at">Sort by Date</option>
          <option value="score">Sort by Score</option>
          <option value="violations">Sort by Violations</option>
        </select>
      </div>

   
      {error && <p className="text-red-500">Error: {error.message}</p>}


      {filteredData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
           
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3">
                <h2 className="text-lg font-semibold truncate">{item.url}</h2>
              </div>

              
              <div className="p-4 space-y-2">
                <p>
                  <span className="font-semibold">ID:</span> {item.id}
                </p>
                {item.created_at && (
                  <p className="text-sm text-gray-400">
                    Created: {new Date(item.created_at).toLocaleString()}
                  </p>
                )}
                {item.score && (
                  <p>
                    <span className="font-semibold">Score:</span> {item.score}
                  </p>
                )}
                {item.violations_count && (
                  <p>
                    <span className="font-semibold">Violations:</span>{" "}
                    {item.violations_count}
                  </p>
                )}

                {/* Expandable Details */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                  className="mt-3 px-3 py-1 text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  {expandedId === item.id ? "Hide Details" : "View Details"}
                </button>

                {expandedId === item.id && (
                  <pre className="mt-3 p-3 bg-gray-900 text-xs rounded-lg overflow-x-auto max-h-60">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No reports found</div>
      )}
    </div>
  )
}
