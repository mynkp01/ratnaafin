import { ROUTES } from "@/utils/Constant";
import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    revalidatePath(ROUTES.client.branchLocator);
  } catch (err) {
    console.log(err?.message);
  }
  return Response.json({ revalidated: true, message: "Branch locator revalidated" });
}
