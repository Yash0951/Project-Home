import { useEffect } from 'react';

/**
 * Locks body + html scroll when active = true.
 * Restores scroll when active = false or component unmounts.
 * Uses a counter for multiple simultaneous overlays.
 * 
 * Note: Only locks html/body overflow. Overlays with their own overflow-y-auto 
 * can still scroll internally because they're fixed-positioned with their own scroll context.
 */

let activeLocks = 0;
let savedHtmlOverflow: string = '';
let savedHtmlOverscroll: string = '';
let savedBodyOverflow: string = '';

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (active) {
      if (activeLocks === 0) {
        // Save current values
        savedHtmlOverflow = document.documentElement.style.overflow || '';
        savedHtmlOverscroll = document.documentElement.style.overscrollBehavior || '';
        savedBodyOverflow = document.body.style.overflow || '';
        
        // Lock scroll on both html and body
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.overscrollBehavior = 'none';
        document.body.style.overflow = 'hidden';
      }
      activeLocks++;
    }

    return () => {
      if (active) {
        activeLocks--;
        if (activeLocks <= 0) {
          activeLocks = 0;
          // Restore original values
          document.documentElement.style.overflow = savedHtmlOverflow;
          document.documentElement.style.overscrollBehavior = savedHtmlOverscroll;
          document.body.style.overflow = savedBodyOverflow;
        }
      }
    };
  }, [active]);
}
