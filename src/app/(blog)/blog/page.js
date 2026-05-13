import SectionContent from "@/components/ui/SectionContent";
import SectionTitle from "@/components/ui/SectionTitle";
import PostList from "@/components/features/blog/PostList";
import { posts } from "@/data/blog";

export const metadata = {
  title: "Blog | Envases BH",
  description:
    "Artículos sobre envases PET, sostenibilidad, innovación y soluciones de empaque.",
};

export default function BlogPage() {
  return (
    <main className="bg-surface-soft py-12">
      <SectionContent>
        <div className="max-w-3xl mb-16">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Blog
          </p>

          <SectionTitle>
            Contenido sobre{" "}
            <span className="text-primary">innovación en envases PET</span>
          </SectionTitle>

          <p className="mt-8 text-muted text-lg leading-relaxed">
            Explora artículos sobre procesos industriales, sostenibilidad y
            tendencias en empaques.
          </p>
        </div>

        <PostList posts={posts} />
      </SectionContent>
    </main>
  );
}
