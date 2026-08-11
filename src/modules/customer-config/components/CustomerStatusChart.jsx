import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

// Placeholder chart with mock data, added to demonstrate real bundle-size
// impact for the module-optimization spike (Customer Config was an empty
// stub before this, so it couldn't show a meaningful size difference).
// Swap the data source for a real API call when this module is built out.
const mockData = [
  { status: 'Active', count: 128 },
  { status: 'Pending setup', count: 34 },
  { status: 'Suspended', count: 9 },
  { status: 'Archived', count: 52 },
]

export function CustomerStatusChart() {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#0f4c66" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
