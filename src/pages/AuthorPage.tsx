import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAuthorByName } from '@/data/authorData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, MapPin, Calendar } from 'lucide-react';
// Since mockData splits articles, we might need a helper to gather them or just import specific lists.
// For now, let's create a helper to get articles by author name from the existing big lists.
import {
    heroArticle, subHeroArticles, latestNews, recommendedArticles,
    editorsPick, longformArticle, categoryData
} from '@/data/mockData';
import CategoryArticleItem from '@/components/CategoryArticleItem';

const AuthorPage = () => {
    const { name } = useParams<{ name: string }>();
    const decodedName = decodeURIComponent(name || '');
    const author = getAuthorByName(decodedName);

    // Aggregate all articles to find ones by this author
    // This is a bit expensive but fine for mock data
    const getAllArticles = () => {
        let articles = [
            heroArticle,
            ...subHeroArticles,
            ...latestNews,
            ...recommendedArticles,
            ...editorsPick,
            longformArticle,
        ];

        // Add articles from categories
        Object.values(categoryData).forEach(catArticles => {
            articles = [...articles, ...catArticles];
        });

        // Filter by author and remove duplicates based on ID
        const seen = new Set();
        return articles.filter(article => {
            const match = article.author === decodedName;
            if (match && !seen.has(article.id)) {
                seen.add(article.id);
                return true;
            }
            return false;
        });
    };

    const authorArticles = getAllArticles();

    if (!author) {
        return <div>Author not found</div>;
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Author Profile Header */}
                <div className="max-w-4xl mx-auto mb-12">
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <Avatar className="w-32 h-32 border-4 border-background shadow-md">
                                    <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
                                    <AvatarFallback className="text-2xl">{author.name.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="text-center md:text-left flex-1">
                                    <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
                                        {author.name}
                                    </h1>
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
                                        {author.role}
                                    </span>
                                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                        {author.bio}
                                    </p>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            <span>contact@classicnews.com</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>Hanoi, Vietnam</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Joined Jan 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Separator className="mb-12" />

                {/* Articles List */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                        Bài viết của {author.name}
                        <span className="text-sm font-sans font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {authorArticles.length}
                        </span>
                    </h2>

                    <div className="space-y-8">
                        {authorArticles.length > 0 ? (
                            authorArticles.map(article => (
                                <div key={article.id} className="block group">
                                    <CategoryArticleItem
                                        article={article}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground italic">Tác giả này chưa có bài viết nào.</p>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AuthorPage;
