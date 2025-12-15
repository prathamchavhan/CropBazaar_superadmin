"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function WithdrawRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("withdraw_requests")
      .select(`
        id,
        amount,
        upi_id,
        status,
        created_at,
        users ( full_name, email )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load withdraw requests");
      return;
    }

    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    setLoading(true);

    const { error } = await supabase
      .from("withdraw_requests")
      .update({ status })
      .eq("id", id);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Status updated to ${status}`);
    fetchRequests();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Withdraw Requests</h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">UPI</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t">
                <td className="p-3">
                  <div className="font-medium">{req.users?.full_name}</div>
                  <div className="text-sm text-gray-500">
                    {req.users?.email}
                  </div>
                </td>

                <td className="p-3 font-semibold">₹{req.amount}</td>
                <td className="p-3">{req.upi_id}</td>

                <td className="p-3 capitalize">{req.status}</td>

                <td className="p-3">
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(req.id, "approved")}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(req.id, "failed")}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                    Refund
                      </button>

                 
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No withdraw requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
