"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Trash2, Plus, Loader2 } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("id, email")
      .order("id", { ascending: true });

    if (error) {
      toast.error("Error loading team members");
      return;
    }

    setTeams(data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const addTeamUser = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("teams").insert([{ email }]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Team member added successfully");
    setEmail("");
    fetchTeams();
  };

  const deleteTeamUser = async (id) => {
    const { error } = await supabase.from("teams").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Deleted successfully");
    fetchTeams();
  };

  return (
  
    <div className="p-0 w-full max-w-7xl mx-auto space-y-6">
     
      <Card>
        <CardHeader>
          <CardTitle>Add New Team User</CardTitle>
          <CardDescription>Invite a new member by email.</CardDescription>
        </CardHeader>
        <CardContent>
     
          <div className="flex w-full items-center gap-4">
            <Input
              className="flex-1" 
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={addTeamUser} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

   
      <Card>
        <CardHeader>
          <CardTitle>Team List</CardTitle>
          <CardDescription>Current members of your team.</CardDescription>
        </CardHeader>
        <CardContent>
          {teams.length === 0 ? (
            <div className="flex h-24 items-center justify-center rounded-md border border-dashed bg-slate-50 text-sm text-muted-foreground">
              No team members yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.email}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTeamUser(t.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase/client";
// import { toast } from "sonner";

// const ROUTES = ["dashboard", "crops", "database", "teams"]; // LOWERCASE FIX

// export default function PermissionsManager() {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchMembers = async () => {
//     const { data, error } = await supabase
//       .from("team_members")
//       .select("id, name, email, team_access(route_id)");

//     if (error) {
//       toast.error("Failed to load members");
//       return;
//     }

//     setMembers(
//       data.map((m) => ({
//         ...m,
//         team_access: m.team_access?.map((a) => a.route_id.toLowerCase()) || [],
//       }))
//     );

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const toggleAccess = async (memberId, route) => {
//     const member = members.find((m) => m.id === memberId);
//     const hasAccess = member.team_access.includes(route);

//     if (hasAccess) {
//       // DELETE access
//       await supabase
//         .from("team_access")
//         .delete()
//         .eq("member_id", memberId)
//         .eq("route_id", route);

//       toast("Removed access");

//       setMembers((prev) =>
//         prev.map((m) =>
//           m.id === memberId
//             ? { ...m, team_access: m.team_access.filter((r) => r !== route) }
//             : m
//         )
//       );
//     } else {
//       // INSERT access
//       await supabase
//         .from("team_access")
//         .insert([{ member_id: memberId, route_id: route }]);

//       toast("Added access");

//       setMembers((prev) =>
//         prev.map((m) =>
//           m.id === memberId
//             ? { ...m, team_access: [...m.team_access, route] }
//             : m
//         )
//       );
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Team Access Manager</h1>

//       {members.map((member) => (
//         <div key={member.id} className="border p-4 rounded space-y-3">
//           <div>
//             <p className="font-semibold">{member.name}</p>
//             <p className="text-sm text-gray-500">{member.email}</p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {ROUTES.map((route) => (
//               <button
//                 key={route}
//                 onClick={() => toggleAccess(member.id, route)}
//                 className={`px-3 py-2 rounded border ${
//                   member.team_access.includes(route)
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {route}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
