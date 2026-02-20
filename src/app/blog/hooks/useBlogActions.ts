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

    onLikeToggle();

    try {
      const response = (await postAction({
        url: `${endpoints.BLOG.LIST}/${slug}/like`,
        data: {},
      })) as ApiResponse;

      if (response.error) {
        onLikeToggle();
        showErrorMessage(response.error.data.message || "Failed to sync like.");
      }
    } catch (error) {
      onLikeToggle();
      console.error("Like error:", error);
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
