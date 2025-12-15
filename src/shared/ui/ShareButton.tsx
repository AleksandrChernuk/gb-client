'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Share2, Copy, Send, MessageCircle, Facebook, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

type Props = {
  title?: string;
  shareUrl: string;
};

export const ShareButton = ({ title, shareUrl }: Props) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const text = useMemo(() => encodeURIComponent(title ?? ''), [title]);
  const url = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      window.prompt(`${t('copy_link_label')}:`, shareUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" aria-label="Поделиться" size={'icon'}>
          <Share2 className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <a
            href={`https://t.me/share/url?url=${url}&text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Telegram
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://wa.me/?text=${text}%20${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />X (Twitter)
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={copyLink} className="flex items-center gap-2">
          <Copy className="h-4 w-4" />
          {copied ? t('copied') : t('copy_link')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
