"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState, type ReactNode } from "react";

const VIDEO_TITLE =
  "Unifize Document Management System — document control, trainings, and approvals";
const VIDEO_URL =
  "https://fast.wistia.net/embed/iframe/qvahwuqk2g?seo=true&videoFoam=true&autoPlay=true";

export function DmsHeroVideo({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="dms-hero-video">
        {children}
        <Dialog.Trigger className="dms-hero-video__trigger">
          <span className="dms-hero-video__label">
            <span className="dms-hero-video__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" />
              </svg>
            </span>
            Play product video
          </span>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Backdrop className="dms-video-modal__backdrop" />
        <Dialog.Viewport className="dms-video-modal__viewport">
          <Dialog.Popup className="dms-video-modal__popup">
            <div className="dms-video-modal__header">
              <Dialog.Title className="dms-video-modal__title">See Unifize DMS in action</Dialog.Title>
              <Dialog.Close className="dms-video-modal__close" aria-label="Close video" autoFocus>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </Dialog.Close>
            </div>
            <div className="dms-video-modal__video">
              {isOpen ? (
                <iframe
                  src={VIDEO_URL}
                  title={VIDEO_TITLE}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : null}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
