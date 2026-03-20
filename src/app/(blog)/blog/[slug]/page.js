import { redirect } from "next/navigation";

export default function BlogPostPage() {
  // Por ahora, si alguien intenta entrar a un post específico,
  // lo mandamos a la página principal del blog que dice "en construcción"
  redirect("/blog");
}
