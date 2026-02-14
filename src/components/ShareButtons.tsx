import React from 'react';
import { Facebook, Instagram, Link as LinkIcon, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonsProps {
    url: string;
    title: string;
    label?: string | null;
}

const ShareButtons = ({ url, title, label }: ShareButtonsProps) => {
    const handleShare = (platform: string) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        let shareLink = '';

        switch (platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                shareLink = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'threads':
                shareLink = `https://threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`;
                break;
            case 'instagram':
                // Instagram doesn't support direct web sharing url effectively for posts
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard (Instagram does not support web share)');
                return;
            default:
                return;
        }

        if (shareLink) {
            window.open(shareLink, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="flex items-center gap-2 my-4">
            {label !== null && (
                <span className="text-sm font-medium text-muted-foreground mr-2">
                    {label || "Share:"}
                </span>
            )}

            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => handleShare('facebook')}
                title="Share on Facebook"
            >
                <Facebook className="h-4 w-4" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full text-black hover:bg-gray-100 flex items-center justify-center"
                onClick={() => handleShare('twitter')}
                title="Share on X"
            >
                <span className="font-black text-xs">X</span>
            </Button>

            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full text-black hover:bg-gray-100"
                onClick={() => handleShare('threads')}
                title="Share on Threads"
            >
                {/* Lucid doesn't have Threads icon yet, using a placeholder or generic */}
                <span className="font-bold font-sans text-xs">@</span>
            </Button>

            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                onClick={() => handleShare('instagram')}
                title="Share on Instagram (Copy Link)"
            >
                <Instagram className="h-4 w-4" />
            </Button>

            <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>

            <Button
                variant="outline"
                className="h-8 px-3 rounded-full text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                onClick={() => toast.success('Đã lưu bài viết')}
            >
                <span className="text-xs font-bold uppercase">Lưu</span>
            </Button>
        </div>
    );
};

export default ShareButtons;
