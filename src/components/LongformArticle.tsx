import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';
import { Article } from '@/data/mockData';
import { ArticleContent as ArticleContentType } from '@/data/articleContent';
import Header from './Header';
import Footer from './Footer';
import ShareButtons from './ShareButtons';
import { getArticlesByCategory, getCategorySlug, categories } from '@/data/mockData';

interface LongformArticleProps {
    article: Article;
    content: ArticleContentType[];
}

const LongformArticle = ({ article, content }: LongformArticleProps) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));

            if (totalScroll > window.innerHeight * 0.8) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-red-900 selection:text-white">

            {/* Header */}
            <Header />

            {/* Hero Section */}
            <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <div className="inline-block mb-6 px-4 py-1.5 border border-white/30 backdrop-blur-sm rounded-full bg-black/20 text-sm font-medium tracking-wider uppercase">
                        Longform
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-lg max-w-5xl mx-auto">
                        {article.title}
                    </h1>
                </div>
            </header>

            {/* Content Body */}
            <article className="py-20 px-6">
                <div className="max-w-[800px] mx-auto">
                    <div className="prose prose-lg md:prose-xl prose-gray mx-auto prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-800 prose-p:leading-relaxed prose-img:rounded-sm">
                        {content.map((block, index) => {
                            if (block.type === 'paragraph') {
                                return (
                                    <p
                                        key={index}
                                        className={`mb-8 text-[1.15rem] md:text-[1.25rem] text-gray-800 leading-[1.8] ${index === 0 ? "first-letter:text-[6.75rem] first-letter:leading-[1] first-letter:font-bold first-letter:text-[#7c3aed] first-letter:float-left first-letter:mr-3 first-letter:font-serif" : ""
                                            }`}
                                    >
                                        {block.text}
                                    </p>
                                );
                            }
                            if (block.type === 'heading') {
                                return (
                                    <h2 key={index} className="text-3xl md:text-4xl mt-16 mb-8 text-gray-900 border-l-4 border-red-800 pl-6">
                                        {block.text}
                                    </h2>
                                );
                            }
                            if (block.type === 'quote') {
                                return (
                                    <blockquote key={index} className="my-12 relative p-8 md:p-12 bg-gray-50 rounded-sm">
                                        <span className="absolute top-0 left-4 text-8xl text-red-100 font-serif leading-none select-none">“</span>
                                        <p className="relative z-10 font-serif text-2xl md:text-3xl italic text-gray-800 text-center leading-relaxed">
                                            {block.text}
                                        </p>
                                    </blockquote>
                                );
                            }
                            if (block.type === 'image') {
                                return (
                                    <figure key={index} className="full-bleed my-12 -mx-6 md:-mx-[20vw] relative group">
                                        <img
                                            src={block.src}
                                            alt={block.caption}
                                            className="w-full h-[60vh] md:h-[80vh] object-cover"
                                        />
                                        {block.caption && (
                                            <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-center italic text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Data Visualization Placeholder */}
                    <div className="my-16 p-8 bg-navy-900 text-white rounded-sm bg-[#1a202c]">
                        <h3 className="font-serif text-2xl mb-8 text-center border-b border-gray-700 pb-4">
                            Thống kê FDI Nhật Bản tại Việt Nam (2020-2025)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-6 rounded text-center">
                                <div className="text-4xl font-bold text-red-500 mb-2 counter">70+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">Tỷ USD Vốn Đăng Ký</div>
                                <div className="w-full bg-gray-700 h-1.5 mt-4 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-[85%]"></div>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2 counter">5,000+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">Dự Án Hoạt Động</div>
                                <div className="w-full bg-gray-700 h-1.5 mt-4 rounded-full overflow-hidden">
                                    <div className="bg-blue-400 h-full w-[70%]"></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-6 italic">
                            Nguồn: Bộ Kế hoạch và Đầu tư (Số liệu ước tính)
                        </p>
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center">
                        <h3 className="text-lg font-serif font-bold mb-4">Chia sẻ câu chuyện này</h3>
                        <ShareButtons url={window.location.href} title={article.title} />
                    </div>

                    {/* Section 1: Bạn có thể quan tâm (Longform articles) */}
                    <section className="mt-20 pt-16 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-10">
                            <span
                                className="inline-block w-2.5 h-7 rounded-sm"
                                style={{
                                    background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                                    transform: "skewX(-12deg)",
                                }}
                            />
                            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight text-[#7c3aed]">BẠN CÓ THỂ QUAN TÂM</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {getArticlesByCategory("Longform")
                                .filter(a => a.id !== article.id)
                                .slice(0, 6)
                                .map((item) => (
                                    <Link key={item.id} to={`/article/${item.id}`} className="group flex flex-col gap-4">
                                        <div className="aspect-[3/2] overflow-hidden rounded-sm">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80";
                                                    target.onerror = null;
                                                }}
                                            />
                                        </div>
                                        <h4 className="font-serif text-lg font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2 text-center md:text-left">
                                            {item.title}
                                        </h4>
                                    </Link>
                                ))}
                        </div>
                    </section>

                    {/* Section 2: Các chuyên mục khác */}
                    <section className="mt-20 pt-16 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-10">
                            <span className="w-8 h-[2px] bg-red-600"></span>
                            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">CÁC CHUYÊN MỤC KHÁC</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {categories
                                .filter(cat => cat !== "Longform" && cat !== "Mới nhất" && cat !== "Đọc nhiều")
                                .slice(0, 5)
                                .map((cat) => {
                                    const catArticles = getArticlesByCategory(cat);
                                    const latest = catArticles[0];
                                    const others = catArticles.slice(1, 4);

                                    return (
                                        <div key={cat} className="space-y-4">
                                            <Link to={`/category/${getCategorySlug(cat)}`} className="block group">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4 hover:text-primary transition-colors">{cat}</h3>
                                                {latest && (
                                                    <div className="space-y-3">
                                                        <div className="aspect-[3/2] overflow-hidden rounded-sm">
                                                            <img
                                                                src={latest.image}
                                                                alt={latest.title}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.src = "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80";
                                                                    target.onerror = null;
                                                                }}
                                                            />
                                                        </div>
                                                        <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                                                            {latest.title}
                                                        </h4>
                                                    </div>
                                                )}
                                            </Link>
                                            <div className="space-y-3 pt-2 border-t border-gray-100">
                                                {others.map((art) => (
                                                    <Link key={art.id} to={`/article/${art.id}`} className="block group">
                                                        <h4 className="text-xs font-medium text-gray-600 hover:text-primary transition-colors leading-normal line-clamp-2">
                                                            {art.title}
                                                        </h4>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
                </div>
            </article>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LongformArticle;
