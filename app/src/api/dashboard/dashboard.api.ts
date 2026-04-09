import type { DashboardData } from "@/types/dashboard.types";

export const getDashboard = async (): Promise<DashboardData> => {
  const res = await fetch('/api/admin/getDashboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const result = await res.json();

  console.log(result);
  

  return result.value ?? result;
};