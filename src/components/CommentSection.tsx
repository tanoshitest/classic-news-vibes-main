import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
}

interface CommentSectionProps {
    articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
    const { user, login } = useAuth();
    const { t, language } = useLanguage();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Load comments for this article from localStorage
        const storedComments = localStorage.getItem(`comments_${articleId}`);
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, [articleId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            userId: user.role, // Simple way to track ID
            userName: user.name,
            content: newComment,
            timestamp: new Date().toISOString(),
        };

        const updatedComments = [comment, ...comments];
        setComments(updatedComments);
        localStorage.setItem(`comments_${articleId}`, JSON.stringify(updatedComments));
        setNewComment('');
    };

    return (
        <div className="border-t pt-4">
            <h3 className="text-lg font-bold mb-4 font-serif">
                {t("opinions")} ({comments.length})
            </h3>

            {/* Comment Form */}
            <div className="mb-6">
                {user ? (
                    <form onSubmit={handleSubmit} className="p-4 bg-muted/20 rounded-sm border border-gray-100/50">
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={t("share_opinion")}
                                    className="bg-background min-h-[60px]"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e as any);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="bg-white border rounded-sm p-6 w-full shadow-sm">
                        <div className="text-center mb-6">
                            <h4 className="font-bold text-lg mb-4">{t("login_title")}</h4>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("email_label")}</label>
                                <input
                                    type="email"
                                    placeholder={t("email_placeholder")}
                                    className="w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <Button
                                className="w-full bg-[#9f224e] hover:bg-[#8a1d43] text-white"
                                onClick={() => login('user')}
                            >
                                {t("continue")}
                            </Button>

                            <div className="relative text-center my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200"></span>
                                </div>
                                <span className="relative z-10 bg-white px-2 text-xs text-gray-500 uppercase">{t("or")}</span>
                            </div>

                            <div className="flex gap-3 justify-center">
                                {/* Simulated Social Logins */}
                                <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => login('user')}>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => login('user')}>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.68.75 3.37 1.48-3.01 1.79-2.5 5.92.51 7.15-.36.93-.84 1.85-1.47 4.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                                    Apple
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center leading-relaxed px-4">
                                {t("login_terms")}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar>
                            <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{comment.userName}</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-foreground/90">{comment.content}</p>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default CommentSection;
