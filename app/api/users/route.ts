import { connectToDB } from "@/lib/mongodb";
import { AppUser } from "@/model/AppUser";

export async function POST(req: Request) {
  try {
    await connectToDB();
    let newUser = await req.json();
    newUser = new AppUser(newUser);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.log(err);
  }
}
