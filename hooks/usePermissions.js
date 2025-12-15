"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function usePermissions() {
  const [loading, setLoading] = useState(true);
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  useEffect(() => {
    const loadPermissions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowedRoutes([]);
        setLoading(false);
        return;
      }

      // find team member
      const { data: member } = await supabase
        .from("team_members")
        .select("id")
        .eq("email", user.email)
        .maybeSingle();

      if (!member) {
        setAllowedRoutes([]);
        setLoading(false);
        return;
      }

      // get user permissions
      const { data: access } = await supabase
        .from("team_access")
        .select("route_id")
        .eq("member_id", member.id);

      const routes = access?.map((a) => a.route_id.toLowerCase()) || [];

      setAllowedRoutes(routes);
      setLoading(false);
    };

    loadPermissions();
  }, []);

  return { allowedRoutes, loading };
}
