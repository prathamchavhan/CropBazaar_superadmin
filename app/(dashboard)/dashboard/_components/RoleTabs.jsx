// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase/client";

// export default function RoleTabs() {
//   const roles = ["farmer", "distributor", "retailer", "customer"];
//   const [selected, setSelected] = useState("farmer");
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async (role) => {
//     const { data, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("role", role);

//     if (error) console.error(error);
//     else setUsers(data);
//   };

//   useEffect(() => {
//     fetchUsers(selected);
//   }, [selected]);

//   return (
//     <div className="w-full max-w-xl mx-auto">
//       <div className="flex gap-2 mb-4">
//         {roles.map((role) => (
//           <button
//             key={role}
//             onClick={() => setSelected(role)}
//             className={`px-4 py-2 rounded-lg border capitalize ${
//               selected === role ? "bg-black text-white" : "bg-gray-100"
//             }`}
//           >
//             {role}
//           </button>
//         ))}
//       </div>

//       <div className="p-4 border rounded-lg bg-gray-50">
//         <h2 className="font-semibold mb-3 capitalize">
//           {selected} Users
//         </h2>

//         {users.length === 0 ? (
//           <p>No users found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {users.map((user) => (
//               <li key={user.id} className="p-3 bg-white shadow rounded-lg">
//                 <p><strong>Name:</strong> {user.full_name || "N/A"}</p>
//                 <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
//                 <p><strong>Email:</strong> {user.email || "N/A"}</p>
//                 <p><strong>Location:</strong> {user.location || "N/A"}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase/client";

// import RoleButtons from "./RoleButtons";
// import UserList from "./UserList";

// const ALLOWED_ROLES = ["farmer", "distributor", "retailer", "customer"];

// export default function RoleTabs() {
//   const [selectedRole, setSelectedRole] = useState("farmer");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchUsers = async (role) => {
//     if (!ALLOWED_ROLES.includes(role)) return; 

//     setLoading(true);

//     const { data, error } = await supabase
//       .from("users")
//       .select("id, full_name, phone, email, location")
//       .eq("role", role);

//     if (error) console.error("Error loading users:", error);
//     else setUsers(data);

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers(selectedRole);
//   }, [selectedRole]);

//   return (
//     <div className="w-full max-w-xl mx-auto">


//       <RoleButtons
//         selectedRole={selectedRole}
//         setSelectedRole={setSelectedRole}
//         roles={ALLOWED_ROLES}
//       />

    
//       <UserList loading={loading} users={users} selectedRole={selectedRole} />
      
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserList from "./UserList";

const ALLOWED_ROLES = ["farmer", "distributor", "retailer", "customer"];

export default function RoleTabs() {
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (role) => {
    if (!ALLOWED_ROLES.includes(role)) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, phone, email, location")
      .eq("role", role);

    if (error) console.error("Error loading users:", error);
    else setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(selectedRole);
  }, [selectedRole]);

  return (
 
    <div className="w-full max-w-6xl mx-auto py-8 flex flex-col items-center gap-8">
      
      <Tabs 
        defaultValue="farmer" 
        value={selectedRole} 
        onValueChange={setSelectedRole} 
        className="w-full"
      >
        <TabsList className="flex w-full justify-between h-auto bg-white p-2">
          {ALLOWED_ROLES.map((role) => (
            <TabsTrigger
              key={role}
              value={role}
              className="flex-1 rounded-md px-6 py-2 capitalize text-slate-500 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-800 data-[state=active]:shadow-none"
            >
              {role}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="w-full">
        <UserList loading={loading} users={users} selectedRole={selectedRole} />
      </div>
      
    </div>
  );
}