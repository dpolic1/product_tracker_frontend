

export default function RecentlyFlaggedProductsTable() {

    return <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <form className="flex gap-12 items-center w-full">
        <input
          type="text"
          name="gtin"
          placeholder="Enter new product by GTIN"
          className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
        />
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-4/5`}
        >
          Submit
        </button>
      </form>
      <div>

      </div>
    </div>
}