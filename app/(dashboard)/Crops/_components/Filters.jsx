export default function Filters({ cropTypes, filters, setFilters }) {
  return (
    <div className="p-4 bg-gray-100 border rounded-lg mb-6 space-y-3">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        {/* Crop Type Dropdown */}
        <select
          value={filters.cropType}
          onChange={(e) =>
            setFilters((f) => ({ ...f, cropType: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">Select Crop Type</option>
          {cropTypes?.map((c) => (
            <option key={c.crop_name} value={c.crop_name}>
              {c.crop_name}
            </option>
          ))}
        </select>

        {/* Seller Role */}
        <select
          value={filters.role}
          onChange={(e) =>
            setFilters((f) => ({ ...f, role: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">Seller Role</option>
          <option value="farmer">Farmer</option>
          <option value="retailer">Retailer</option>
          <option value="distributor">Distributor</option>
        </select>

        {/* Quality */}
        <input
          type="text"
          placeholder="Quality"
          value={filters.quality}
          onChange={(e) =>
            setFilters((f) => ({ ...f, quality: e.target.value }))
          }
          className="border p-2 rounded"
        />

        {/* Price */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((f) => ({ ...f, minPrice: e.target.value }))
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxPrice: e.target.value }))
            }
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <button
        onClick={() =>
          setFilters({
            cropType: "",
            role: "",
            quality: "",
            minPrice: "",
            maxPrice: "",
          })
        }
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Reset Filters
      </button>
    </div>
  );
}
