import PostList from "@/components/features/blog/PostList";
import SectionContent from "@/components/ui/SectionContent";
import SectionTitle from "@/components/ui/SectionTitle";
import { posts } from "@/data/blog";
import { baseMetadata } from "@/lib/metadata-config";

export const metadata = {
  ...baseMetadata,
  title: "Blog sobre Envases PET, Sostenibilidad e Innovación ",
  description:
    "Explora nuestro blog para descubrir artículos sobre innovación en envases PET, sostenibilidad y tendencias en la industria de empaques. Mantente informado con contenido relevante y actualizado.",
  keywords: [
    ...baseMetadata.keywords,
    "blog envases PET",
    "innovación en envases",
    "sostenibilidad en empaques",
    "tendencias en envases PET",
    "artículos sobre envases",
    "noticias de envases PET",
    "diseño de envases",
    "fabricación de envases",
    "tecnología en envases PET",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Blog sobre Envases PET, Sostenibilidad e Innovación | Envases BH",
    description:
      "Explora nuestro blog para descubrir artículos sobre innovación en envases PET, sostenibilidad y tendencias en la industria de empaques. Mantente informado con contenido relevante y actualizado.",
    url: "https://envasesbh.mx/blog",
    type: "website",
  },
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
