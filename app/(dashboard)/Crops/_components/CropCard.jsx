import CropImages from "./CropImages";
import { supabase } from "@/utils/supabase/client";

export default function CropCard({ crop, setEditingCrop, fetchCrops }) {
  const deleteCrop = async () => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("crops").delete().eq("id", crop.id);
    fetchCrops();
  };

  return (
    <div className="p-4 bg-white shadow border rounded-lg">

      <p><strong>Seller:</strong> {crop.seller?.full_name || "Unknown"}</p>
      <p><strong>Role:</strong> {crop.seller_role}</p>
      <p><strong>Phone:</strong> {crop.seller?.phone}</p>
      <p><strong>Location:</strong> {crop.seller?.location}</p>

      <hr className="my-3" />

      <p><strong>Crop:</strong> {crop.name}</p>
      <p><strong>Quality:</strong> {crop.quality}</p>
      <p><strong>Price:</strong> ₹{crop.price_per_kg}</p>
      <p><strong>Available:</strong> {crop.available_quantity}</p>

      <CropImages images={crop.image_urls} />

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setEditingCrop(crop)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit
        </button>

        <button
          onClick={deleteCrop}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>

    </div>
  );
}
