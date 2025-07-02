'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './ui/button';

export function EventStatementDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">活動聲明</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>📢 活動聲明</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              本活動由【範例商店】主辦，活動內容僅限於指定商品與活動期間內參與。活動時間與優惠內容以本頁公告為準，如有異動恕不另行通知。
            </p>
            <p>
              參與本活動即視同同意相關條款與規定，若有違反或不當行為，主辦單位保留取消訂單與終止參與資格之權利。
            </p>
            <p>
              如有任何疑問，請洽客服信箱：miasu713@gmail.com，我們將竭誠為您服務。
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
