import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';
import { Article } from '@/data/mockData';
import { ArticleContent as ArticleContentType } from '@/data/articleContent';
import Header from './Header';
import Footer from './Footer';

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
                        Special Report
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-lg max-w-5xl mx-auto">
                        {article.title}
                    </h1>
                    <p className="text-lg md:text-2xl font-light text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
                        {article.summary}
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm md:text-base text-gray-300">
                        <span className="font-medium text-white">{article.author}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>{article.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                        </span>
                    </div>
                </div>

                <button
                    onClick={scrollToContent}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100 transition-opacity animate-bounce"
                >
                    <span className="text-xs uppercase tracking-widest">Cuộn để khám phá</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </header>

            {/* Content Body */}
            <article className="py-20 px-6">
                <div className="max-w-[800px] mx-auto">
                    <div className="prose prose-lg md:prose-xl prose-gray mx-auto prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-800 prose-p:leading-relaxed prose-img:rounded-sm group-first:first-letter:text-7xl group-first:first-letter:font-serif group-first:first-letter:mr-3 group-first:first-letter:float-left">
                        {content.map((block, index) => {
                            if (block.type === 'paragraph') {
                                return (
                                    <p key={index} className="mb-8 text-[1.15rem] md:text-[1.25rem] text-gray-800 leading-[1.8]">
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

                    {/* Back to Home Button */}
                    <div className="mt-16 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#4d0078] text-white hover:bg-[#3a005a] transition-colors rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Về trang chủ
                        </Link>
                    </div>

                </div>
            </article>

            {/* Share Section (Optional to keep or integrate) - Keeping as Content End */}
            <div className="bg-gray-50 py-16 text-center">
                <div className="container mx-auto px-6">
                    <Share2 className="w-10 h-10 mx-auto text-gray-400 mb-4" />
                    <h3 className="font-serif text-2xl mb-6">Chia sẻ câu chuyện này</h3>
                    <div className="flex justify-center gap-4">
                        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white text-gray-500 transition-all">
                            <Facebook className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white text-gray-500 transition-all">
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white text-gray-500 transition-all">
                            <Linkedin className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LongformArticle;
