import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import EditShortLinkForm from '@/app/dashboard/_components/edit-short-link-form';

type LinkType = {
  title: string;
  created_at: string;
  id: string;
  original_url: string;
  short_url: string;
  user_id: string;
};

type LinkDialogProps = {
  link: LinkType;
  refetchLinks: () => void;
};

export function EditShortLinkDialog({ link, refetchLinks }: LinkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(link);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="submit"
          size="sm"
          className="flex items-center justify-center h-10 text-slate-500 hover:text-slate-900"
        >
          <span className="sr-only">Edit</span>
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-900 font-bold text-xl sm:text-2xl">
            Edit short link
          </DialogTitle>
          <DialogDescription>
            Edit your short link to your taste
          </DialogDescription>
        </DialogHeader>
        <EditShortLinkForm
          link={link}
          closeForm={closeDialog}
          refetchLinks={refetchLinks}
        />
      </DialogContent>
    </Dialog>
  );
}
