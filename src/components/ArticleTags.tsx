import { Link } from "react-router-dom";

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags = ({ tags }: ArticleTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tag/${tag.toLowerCase()}`}
          className="px-3 py-1.5 text-sm border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};

export default ArticleTags;
