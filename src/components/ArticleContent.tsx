import { ArticleContent as ArticleContentType } from "@/data/articleContent";
import { Camera } from "lucide-react";

interface ArticleContentProps {
  content: ArticleContentType[];
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <div className="article-body space-y-6">
      {content.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p
              key={index}
              className="text-lg leading-relaxed text-foreground"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={index} className="my-8">
              <div className="overflow-hidden">
                <img
                  src={block.src}
                  alt={block.caption || ""}
                  className="w-full h-auto"
                />
              </div>
              {block.caption && (
                <figcaption className="mt-3 flex items-start gap-2 px-4 py-3 bg-muted/30">
                  <Camera className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm italic text-muted-foreground">
                    {block.caption}
                  </span>
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-foreground pl-6 py-2 my-8"
            >
              <p className="font-serif text-xl italic text-foreground">
                {block.text}
              </p>
            </blockquote>
          );
        }

        return null;
      })}
    </div>
  );
};

export default ArticleContent;
