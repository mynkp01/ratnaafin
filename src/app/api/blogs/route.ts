import { ROUTES } from "@/utils/Constant";
import { exec } from "child_process";
import { revalidatePath } from "next/cache";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
  try {
    revalidatePath(ROUTES.client.blogs);

    // Regenerate sitemap
    await execAsync("npx next-sitemap");
    console.log("Sitemap regenerated successfully");
  } catch (err) {
    console.log(err?.message);
  }
  return Response.json({ revalidated: true, message: "Blogs revalidated and sitemap regenerated" });
}
