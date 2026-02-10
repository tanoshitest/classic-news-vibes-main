import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticlesByCategory } from "@/data/mockData";
import { useEffect } from "react";

const LongformPage = () => {
    const articles = getArticlesByCategory("Longform");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* 2. Hero Section (Header) */}
                <div className="relative w-full h-[350px] overflow-hidden">
                    {/* Background Image */}
                    <img
                        src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80" // Reliable Generic Vietnam/Hanoi Image
                        alt="Longform Cover"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"; // Fallback to Halong Bay
                            target.onerror = null;
                        }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Title */}
                    <div className="relative h-full flex items-center justify-center">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white uppercase tracking-widest text-center shadow-lg">
                            LONGFORM
                        </h1>
                    </div>
                </div>

                {/* 3. Content Grid (The Articles) */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {articles.map((article) => (
                            <Link key={article.id} to={`/article/${article.id}`} className="group block">
                                {/* 4. Article Card Component */}
                                <div className="flex flex-col">
                                    {/* Image */}
                                    <div className="aspect-[3/2] w-full overflow-hidden rounded-sm bg-gray-100">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                                                target.onerror = null;
                                            }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h2 className="mt-4 text-xl font-serif font-bold text-gray-900 leading-relaxed group-hover:underline decoration-1 underline-offset-4">
                                        {article.title}
                                    </h2>

                                    {/* Summary (Optional - keeping minimalist as per specific design, but adding small summary if it looks too empty) 
                                        Request said: "Image on top, Title strictly below." - adhering to that strictness.
                                    */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LongformPage;
