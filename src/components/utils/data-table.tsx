import React from "react";

export interface Column {
  key: string;
  label: string;
  className?: string;
}

export interface DataTableProps {
  columns: Column[];
  children: React.ReactNode; // Rows provided from parent
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, children, className }) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-600">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              
              {/* ---- TABLE HEADER ---- */}
              <thead className="bg-gray-50 dark:bg-[#171717]">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`px-4 py-3 text-sm font-medium text-left rtl:text-right text-gray-700 dark:text-gray-200 ${column.className ?? ""}`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ---- TABLE BODY ---- */}
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {children}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
