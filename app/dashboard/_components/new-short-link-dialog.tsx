import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import NewShortLinkForm from '@/app/dashboard/_components/new-short-link-form';
import { useState } from 'react';

type LinkDialogProps = {
  refetchLinks: () => void;
};

export function NewShortLinkDialog({ refetchLinks }: LinkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Shorten new link</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-900 font-bold text-xl sm:text-2xl">
            Create new short link
          </DialogTitle>
          <DialogDescription>
            Create a new short link to share online
          </DialogDescription>
        </DialogHeader>
        <NewShortLinkForm closeForm={closeDialog} refetchLinks={refetchLinks} />
      </DialogContent>
    </Dialog>
  );
}
