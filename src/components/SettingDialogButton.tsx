"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DiamondMinus,
  Laptop,
  Moon,
  RotateCcw,
  Settings,
  Sparkles,
  SunMoon,
  Wind,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSettings } from "@/lib/store/settings";
import { useTheme } from "next-themes";

export const SettingDialogButton = () => {
  const { motion, setMotion, minimalMode, toggleMinimalMode } = useSettings();
  const { theme, setTheme } = useTheme();
  const handleReset = () => {
    setMotion("system");
    setTheme("system");
    if (minimalMode) toggleMinimalMode();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group ml-auto"
          aria-label="Open settings"
        >
          <Settings className="!h-5 !w-5 duration-200 group-hover:rotate-90 group-hover:transform motion-reduce:transition-none" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-medium">
            <Settings className="h-5 w-5" /> Settings
          </DialogTitle>
          <DialogDescription>
            Here is where you can shape the look and feel. Turn on dark mode,
            toggle the hero background, or reduce motion if you prefer calm.
          </DialogDescription>
        </DialogHeader>

        <div className="divide-border flex flex-col divide-y">
          <div className="flex items-center justify-between gap-2 py-4">
            <span className="flex items-center gap-2 font-medium">
              <SunMoon className="h-5 w-5" /> Theme
            </span>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">
                  <Laptop className="h-5 w-5" /> System
                </SelectItem>
                <SelectItem value="light">
                  <SunMoon className="h-5 w-5" /> Light
                </SelectItem>
                <SelectItem value="dark">
                  <Moon className="h-5 w-5" /> Dark
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-2 py-4">
            <span className="flex items-center gap-2 font-medium">
              <Wind className="h-5 w-5" /> Motion reduce
            </span>
            <Select value={motion} onValueChange={setMotion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Motion reduce" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">
                  <Laptop className="h-5 w-5" /> System
                </SelectItem>
                <SelectItem value="no-preference">
                  <Sparkles className="h-5 w-5" /> No preference
                </SelectItem>
                <SelectItem value="reduce">
                  <DiamondMinus className="h-5 w-5" /> Reduce
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-2 py-4">
            <span className="flex items-center gap-2 font-medium">
              <Sparkles className="h-5 w-5" /> Minimal mode
            </span>
            <Switch checked={minimalMode} onCheckedChange={toggleMinimalMode} />
          </div>
        </div>

        <DialogFooter>
          <Button className="group" onClick={handleReset}>
            <RotateCcw className="duration-500 group-hover:-rotate-360" />
            Reset to defaults
          </Button>
          <DialogClose asChild>
            <Button type="submit" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
