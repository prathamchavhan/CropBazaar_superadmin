import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserList({ loading, users, selectedRole }) {
  return (
    <div className="p-4 border rounded-lg bg-slate-50/50">
      <h2 className="font-semibold mb-4 capitalize text-lg tracking-tight">
        {selectedRole} Users
      </h2>

      {loading ? (
     
        <div className="space-y-3">
          <Skeleton className="h-28 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-lg" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-sm text-slate-500">No users found.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id}>
    
              <Card className="shadow-sm">
                <CardContent className="p-4 text-sm space-y-1">
                  <p>
                    <span className="font-medium">Name:</span> {user.full_name || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {user.phone || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {user.location || "N/A"}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}