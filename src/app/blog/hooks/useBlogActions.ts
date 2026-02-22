"use client";

import { useState } from "react";
import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import { ApiResponse } from "@/interface/error.interface";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import { useModal } from "@/core/context/ModalContext";

export const useBlogActions = (
  slug: string,
  isLoggedIn: boolean,
  isLiked: boolean,
  onLikeToggle: () => void
) => {
  const { openModal } = useModal();
  const [postAction] = usePostDataMutation();
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLikeAction = async () => {
    if (!isLoggedIn) {
      openModal("login");
      showErrorMessage("Please login to like this post.");
      return;
    }

    const previousLikeState = isLiked;

    // optimistic update
    onLikeToggle();

    try {
      const response = (await postAction({
        url: `${endpoints.BLOG.LIST}/${slug}/like`,
        data: {},
      })) as ApiResponse;

      if (response?.error) {
        // rollback
        onLikeToggle();
        showErrorMessage(
          response.error.data.message || "Failed to update like status."
        );
        return;
      }

      if (previousLikeState) {
        showSuccessMessage("You unliked this post.");
      } else {
        showSuccessMessage("You liked this post.");
      }
    } catch (error) {
      // rollback UI
      onLikeToggle();
      console.error("Like error:", error);
      showErrorMessage("Something went wrong while updating like.");
    }
  };

  const trackShare = async () => {
    try {
      await postAction({
        url: `${endpoints.BLOG.LIST}/${slug}/share`,
        data: {},
      });
    } catch (error) {
      console.error("Share tracking error:", error);
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackShare();
      showSuccessMessage("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      showErrorMessage("Failed to copy link.");
    }
  };

  return {
    copied,
    showShareMenu,
    setShowShareMenu,
    handleLikeAction,
    trackShare,
    handleCopyLink,
  };
};