import React, { useState } from 'react';
import { Command, Sparkles } from 'lucide-react';
import CommandPaletteModal from './CommandPaletteModal';

const FloatingFrap = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#101111] hover:bg-[#121212] px-3.5 py-2 text-xs font-semibold text-[#f4f4f6] border border-[#242728] shadow-2xl transition active:scale-95 group"
          title="Open Raycast Command Palette (⌘ K)"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[#18191a] text-[#ff6161]">
            <Command className="h-3.5 w-3.5" />
          </div>
          <span className="hidden sm:inline">Commands</span>
          <span className="mc-keycap text-[10px]">⌘ K</span>
        </button>
      </div>

      <CommandPaletteModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default FloatingFrap;
