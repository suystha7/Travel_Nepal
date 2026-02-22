import Image from "next/image";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RichText from "@/utils/richText";

interface ReviewModalProps {
  name: string;
  image?: string;
  message: string;
  rating?: number;
  trigger: React.ReactNode;
}

export function ReviewModal({
  name,
  image,
  message,
  rating = 0,
  trigger,
}: ReviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] sm:max-h-[500px] p-8 rounded-xl">
        <DialogHeader className="flex flex-row items-center gap-5 space-y-0 text-left">
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src={image || "/placeholder-user.png"}
              alt={name}
              fill
              className="object-cover rounded-full border border-gray-100 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {name}
            </DialogTitle>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating
                      ? "text-tertiary-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogHeader>

        <div className="text-gray-600 text-lg leading-relaxed border-t border-gray-100 pt-4">
          <RichText
            content={message || ""}
            className="prose prose-gray max-w-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
