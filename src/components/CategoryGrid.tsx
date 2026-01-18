import { categoryData, categories } from "@/data/mockData";
import CategoryBlock from "./CategoryBlock";

const CategoryGrid = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryBlock
              key={category}
              title={category}
              articles={categoryData[category]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
