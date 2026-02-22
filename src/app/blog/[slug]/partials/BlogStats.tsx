"use client";

import React from "react";
import { Heart, Eye, Share2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "next-share";
import { useBlogActions } from "../../hooks/useBlogActions";

interface BlogStatsProps {
  id: string;
  likes: number;
  views: number;
  isLiked?: boolean;
  isLoggedIn: boolean;
  onLikeToggle: () => void;
  title: string;
}

const BlogStats = ({
  id: slug,
  likes,
  views,
  isLiked = false,
  isLoggedIn,
  onLikeToggle,
  title,
}: BlogStatsProps) => {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const {
    copied,
    showShareMenu,
    setShowShareMenu,
    handleLikeAction,
    trackShare,
    handleCopyLink,
  } = useBlogActions(slug, isLoggedIn, isLiked, onLikeToggle);

  const handleMainShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        trackShare();
      } catch {
        console.log("Share cancelled");
      }
    } else {
      setShowShareMenu((prev) => !prev);
    }
  };

  return (
    <div className="relative grid grid-cols-3 p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLikeAction}
        className="flex flex-col items-center gap-1 border-r border-slate-100 outline-none group"
      >
        <Heart
          className={`transition-all duration-300 ${
            isLiked
              ? "text-red-500 fill-red-500"
              : "text-slate-400 group-hover:text-red-400"
          }`}
          size={22}
        />
        <span
          className={`text-xs font-bold ${
            isLiked ? "text-red-600" : "text-slate-600"
          }`}
        >
          {likes}
        </span>
      </motion.button>

      <div className="flex flex-col items-center gap-1 border-r border-slate-100">
        <Eye className="text-slate-400" size={22} />
        <span className="text-xs font-bold text-slate-600">{views}</span>
      </div>

      <div className="flex flex-col items-center justify-center relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMainShareClick}
          className="flex flex-col items-center gap-1 outline-none group w-full"
        >
          <Share2
            className="text-slate-400 group-hover:text-primary-600 transition-colors"
            size={22}
          />
          <span className="text-xs font-bold text-slate-600">Share</span>
        </motion.button>

        <AnimatePresence>
          {showShareMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowShareMenu(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full mb-4 right-0 z-50 bg-white border border-slate-200 p-4 rounded-2xl shadow-2xl min-w-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Share this post
                  </span>
                  <X
                    size={14}
                    className="text-slate-400 cursor-pointer"
                    onClick={() => setShowShareMenu(false)}
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <FacebookShareButton
                    url={url}
                    quote={title}
                    onShareWindowClose={trackShare}
                  >
                    <FacebookIcon size={36} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={url}
                    title={title}
                    onShareWindowClose={trackShare}
                  >
                    <TwitterIcon size={36} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={url}
                    title={title}
                    onShareWindowClose={trackShare}
                  >
                    <WhatsappIcon size={36} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton
                    url={url}
                    onShareWindowClose={trackShare}
                  >
                    <LinkedinIcon size={36} round />
                  </LinkedinShareButton>
                </div>

                <button
                  onClick={() => handleCopyLink(url)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-2 border border-slate-100 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      <span className="text-xs font-bold text-green-600">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Share2 size={14} className="text-slate-600" />
                      <span className="text-xs font-bold text-slate-600">
                        Copy Link
                      </span>
                    </>
                  )}
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogStats;