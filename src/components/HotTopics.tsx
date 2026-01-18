import { hotTopics } from "@/data/mockData";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HotTopics = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-secondary border-y border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 text-foreground shrink-0">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('hot_topics')}:</span>
          </div>
          <div className="flex items-center gap-2">
            {hotTopics.map((topic) => (
              <span
                key={topic}
                className="newspaper-tag shrink-0"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotTopics;
