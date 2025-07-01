import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  try {
    const docRef = doc(db, "produk", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
    }

    const produk = { id: docSnap.id, ...docSnap.data() };
    return new Response(JSON.stringify(produk), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "server error" }), { status: 500 });
  }
}
