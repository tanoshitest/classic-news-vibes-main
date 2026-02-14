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
    const { language } = useLanguage();
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
        <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold mb-4 font-serif">
                {language === 'VN' ? 'Ý kiến' : 'Opinions'} ({comments.length})
            </h3>

            {/* Comment Form */}
            <div className="mb-8 p-6 bg-muted/30 rounded-lg">
                {user ? (
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={language === 'VN' ? 'Chia sẻ ý kiến của bạn...' : 'Share your opinion...'}
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
                    <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">
                            {language === 'VN' ? 'Vui lòng đăng nhập để bình luận' : 'Please log in to leave a comment'}
                        </p>
                        <div className="flex justify-center gap-3">
                            <Button variant="outline" onClick={() => login('user')}>
                                {language === 'VN' ? 'Đăng nhập là Người đọc' : 'Login as User'}
                            </Button>
                            <Button variant="outline" onClick={() => login('admin')}>
                                {language === 'VN' ? 'Đăng nhập là Admin' : 'Login as Admin'}
                            </Button>
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
