import { resolveProjectKey } from "@/lib/project-key";
import AdminLandingClient from "./AdminLandingClient";

export default function AdminLandingPage({
  searchParams,
}: {
  searchParams?: { project_key?: string; projectId?: string };
}) {
  const projectKey = resolveProjectKey(searchParams);
  return <AdminLandingClient projectKey={projectKey} />;
}
