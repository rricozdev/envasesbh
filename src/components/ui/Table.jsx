export function SimpleTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto mb-8 border border-slate-200 rounded-lg">
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3 font-primary text-[#181c1c] text-md">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="p-3 text-secondary text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
