import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RoleButtons({ selectedRole, setSelectedRole, roles }) {
  return (
    <Tabs 
      value={selectedRole} 
      onValueChange={setSelectedRole} 
      className="w-full mb-4"
    >
      <TabsList className="w-full justify-between bg-transparent p-0 h-auto">
        {roles.map((role) => (
          <TabsTrigger
            key={role}
            value={role}
            className="
              flex-1 
              capitalize 
              rounded-md 
              py-2.5
              text-slate-500 
              data-[state=active]:bg-indigo-50 
              data-[state=active]:text-indigo-700 
              data-[state=active]:shadow-none
            "
          >
            {role}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}