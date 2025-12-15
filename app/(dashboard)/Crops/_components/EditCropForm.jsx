import { supabase } from "@/utils/supabase/client";
import { useState } from "react";

export default function EditCropForm({ crop, setEditingCrop, fetchCrops }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    await supabase
      .from("crops")
      .update({
        name: crop.name,
        price_per_kg: crop.price_per_kg,
        available_quantity: crop.available_quantity,
        quality: crop.quality,
      })
      .eq("id", crop.id);

    setLoading(false);
    setEditingCrop(null);
    fetchCrops();
  };

  return (
    <div className="space-y-3 p-4 bg-white border rounded-lg">
      <input
        type="text"
        value={crop.name}
        onChange={(e) => setEditingCrop({ ...crop, name: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <input
        type="number"
        value={crop.price_per_kg}
        onChange={(e) =>
          setEditingCrop({
            ...crop,
            price_per_kg: Number(e.target.value),
          })
        }
        className="border p-2 w-full rounded"
      />

      <input
        type="number"
        value={crop.available_quantity}
        onChange={(e) =>
          setEditingCrop({
            ...crop,
            available_quantity: Number(e.target.value),
          })
        }
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        value={crop.quality}
        onChange={(e) =>
          setEditingCrop({ ...crop, quality: e.target.value })
        }
        className="border p-2 w-full rounded"
      />

      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={() => setEditingCrop(null)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
