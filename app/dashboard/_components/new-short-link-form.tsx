'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Please enter a link title' }),
  link: z
    .string()
    .regex(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/, {
      message: 'Please enter a valid link',
    }),
  shortLink: z
    .string()
    .min(3, { message: 'Short link has to be at least 3 characters' })
    .optional()
    .or(z.literal('')),
});

type IFormInput = z.infer<typeof FormSchema>;

type CreateShortLinkProps = {
  title: string;
  originalUrl: string;
  shortUrl: string | null | undefined;
};

type Props = {
  closeForm: () => void;
  refetchLinks: () => void;
};

export default function NewShortLinkForm({ closeForm, refetchLinks }: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const createShortLink = async ({
    title,
    originalUrl,
    shortUrl,
  }: CreateShortLinkProps): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, originalUrl, shortUrl }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          const errorData = await response.json();
          toast({
            variant: 'error',
            title: errorData.message,
            description: 'Please input another short link',
          });
          return;
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      refetchLinks();
      formRef.current?.reset();
      toast({
        variant: 'success',
        title: 'Your short link has been created successfully',
      });
      closeForm();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: IFormInput) => {
    const originalUrl = data.link;
    const shortUrl = data.shortLink;
    const title = data.title;
    createShortLink({ title, originalUrl, shortUrl });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label
            className="text-sm text-slate-900 font-semibold"
            htmlFor="title"
          >
            Title of your link
          </Label>
          <Input
            {...register('title')}
            id="title"
            name="title"
            type="text"
            className="placeholder:font-medium"
            placeholder="Sales campaign"
          />
          {errors?.title?.message && (
            <p className="text-red-700 text-sm mb-4">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label
            className="text-sm text-slate-900 font-semibold"
            htmlFor="link"
          >
            Enter link to be trimmed
          </Label>
          <Input
            {...register('link')}
            id="link"
            name="link"
            type="text"
            className="placeholder:font-medium"
            placeholder="campaign.com"
          />
          {errors?.link?.message && (
            <p className="text-red-700 text-sm mb-4">{errors.link.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label
            className="text-sm text-slate-900 font-semibold"
            htmlFor="shortLink"
          >
            Customise your link (optional)
          </Label>
          <div className="relative flex items-center">
            <span className="absolute pl-3 text-sm text-slate-900 font-semibold">
              https://scissors-phi.vercel.app/
            </span>
            <Input
              className="pl-[13.55rem] pe-3 py-2 placeholder:font-medium"
              {...register('shortLink')}
              id="shortLink"
              name="shortLink"
              type="text"
              placeholder="launchParty"
            />
          </div>
          {errors?.shortLink?.message && (
            <p className="text-red-700 text-sm mb-4">
              {errors.shortLink.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Button disabled={loading} type="submit">
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-2 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {loading ? 'Trimming...' : 'Trim it'}
        </Button>
      </div>
    </form>
  );
}
