"use client"

import React from "react"
import { cx } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "./button"
import { cn } from "../../lib/utils"

interface OrbProps {
  dimension?: string
  className?: string
  tones?: {
    base?: string
    accent1?: string
    accent2?: string
    accent3?: string
  }
  spinDuration?: number
}

const ColorOrb: React.FC<OrbProps> = ({
  dimension = "192px",
  className,
  tones,
  spinDuration = 20,
}) => {
  const fallbackTones = {
    base: "oklch(95% 0.02 264.695)",
    accent1: "oklch(75% 0.15 350)",
    accent2: "oklch(80% 0.12 200)",
    accent3: "oklch(78% 0.14 280)",
  }

  const palette = { ...fallbackTones, ...tones }

  const dimValue = parseInt(dimension.replace("px", ""), 10)

  const blurStrength =
    dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4)

  const contrastStrength =
    dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5)

  const pixelDot = dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1)

  const shadowRange = dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2)

  const maskRadius =
    dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%"

  const adjustedContrast =
    dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength

  return (
    <div
      className={cn("color-orb", className)}
      style={{
        width: dimension,
        height: dimension,
        "--base": palette.base,
        "--accent1": palette.accent1,
        "--accent2": palette.accent2,
        "--accent3": palette.accent3,
        "--spin-duration": `${spinDuration}s`,
        "--blur": `${blurStrength}px`,
        "--contrast": adjustedContrast,
        "--dot": `${pixelDot}px`,
        "--shadow": `${shadowRange}px`,
        "--mask": maskRadius,
      } as React.CSSProperties}
    >
      <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
        }

        .color-orb::before,
        .color-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }

        .color-orb::before {
          background:
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--accent2),
              transparent 30% 60%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--accent1),
              transparent 40% 60%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--accent2),
              transparent 10% 90%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--accent1),
              transparent 10% 90%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            );
          box-shadow: inset var(--base) 0 0 var(--shadow) calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: spin var(--spin-duration) linear infinite;
        }

        .color-orb::after {
          background-image: radial-gradient(
            circle at center,
            var(--base) var(--dot),
            transparent var(--dot)
          );
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2)) contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
        }

        .color-orb[style*="--mask: 0%"]::after {
          mask-image: none;
        }

        .color-orb:not([style*="--mask: 0%"])::after {
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }

        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .color-orb::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

const SPEED_FACTOR = 1

interface ContextShape {
  showForm: boolean
  successFlag: boolean
  triggerOpen: () => void
  triggerClose: () => void
}

const FormContext = React.createContext({} as ContextShape)
const useFormContext = () => React.useContext(FormContext)

export function MorphPanel() {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

  const [showForm, setShowForm] = React.useState(false)
  const [successFlag, setSuccessFlag] = React.useState(false)
  const [responseText, setResponseText] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const triggerClose = React.useCallback(() => {
    setShowForm(false)
    textareaRef.current?.blur()
    setResponseText("") // Reset response when closed
  }, [])

  const triggerOpen = React.useCallback(() => {
    setShowForm(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }, [])

  const handleSuccess = React.useCallback(async (promptVal: string) => {
    setIsLoading(true)
    setResponseText("")

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptVal })
      });
      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      setResponseText(data.reply);
    } catch (err) {
      setResponseText("Oops, the AI is having trouble right now.");
    } finally {
      setIsLoading(false);
    }

    setSuccessFlag(true)
    setTimeout(() => setSuccessFlag(false), 1500)
  }, [])

  React.useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && showForm) {
        triggerClose()
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler)
    return () => document.removeEventListener("mousedown", clickOutsideHandler)
  }, [showForm, triggerClose])

  const ctx = React.useMemo(
    () => ({ showForm, successFlag, triggerOpen, triggerClose }),
    [showForm, successFlag, triggerOpen, triggerClose]
  )

  const dynamicHeight = responseText ? "auto" : FORM_HEIGHT;
  const CLOSED_HEIGHT = 60; // Matching the exact height of the resume button

  return (
    <div className="flex items-center justify-center relative !z-50 group">
      {/* Glow Hover Effect from old prompt box */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <motion.div
        ref={wrapperRef}
        data-panel
        className={cx(
          "glass-card border border-border/50 relative z-50 flex flex-col items-center overflow-hidden shadow-2xl"
        )}
        style={{
          transformOrigin: "top center"
        }}
        initial={false}
        animate={{
          width: showForm ? FORM_WIDTH : "auto",
          height: showForm ? dynamicHeight : CLOSED_HEIGHT,
          borderRadius: showForm ? 24 : 9999, // Pill for button, rounded rect when open
        }}
        transition={{
          type: "spring",
          stiffness: 550 / SPEED_FACTOR,
          damping: 45,
          mass: 0.7,
          delay: showForm ? 0 : 0.08,
        }}
      >
        <FormContext.Provider value={ctx}>
          <DockBar />
          <InputForm ref={textareaRef} onSuccess={handleSuccess} isLoading={isLoading} responseText={responseText} />
        </FormContext.Provider>
      </motion.div>
    </div>
  )
}

function DockBar() {
  const { showForm, triggerOpen } = useFormContext()
  const CLOSED_HEIGHT = 60;

  return (
    <footer className={cx("w-full items-center justify-center whitespace-nowrap select-none transition-opacity duration-200", showForm ? "absolute inset-0 z-0 opacity-0 pointer-events-none" : "relative mt-auto flex opacity-100 z-10")} style={{ height: CLOSED_HEIGHT }}>
      <div className="flex items-center justify-center px-4 md:px-6 w-full h-full gap-3 cursor-pointer" onClick={triggerOpen}>
        <div className="flex w-fit items-center">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="h-7 w-7 absolute"
              />
            ) : (
              <motion.div
                key="orb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <ColorOrb dimension="28px" tones={{ base: "oklch(60% 0.15 250)" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          className={cx("flex items-center justify-center bg-transparent border-none outline-none font-display font-semibold text-lg text-foreground hover:text-primary transition-colors cursor-pointer", showForm && "hidden")}
        >
          Ask Hong Zhe's Trained AI Model
        </button>
      </div>
    </footer>
  )
}

const FORM_WIDTH = 380
const FORM_HEIGHT = 200

function InputForm({ ref, onSuccess, isLoading, responseText }: { ref: React.Ref<HTMLTextAreaElement>; onSuccess: (val: string) => void, isLoading: boolean, responseText: string }) {
  const { triggerClose, showForm } = useFormContext()
  const btnRef = React.useRef<HTMLButtonElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget;
    const formData = new FormData(form)
    const val = formData.get("message") as string;
    if (val.trim()) {
      onSuccess(val)
      form.reset()
    }
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") triggerClose()
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      btnRef.current?.click()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cx("w-full transition-opacity duration-200", showForm ? "relative opacity-100 pointer-events-auto z-20" : "absolute inset-0 opacity-0 pointer-events-none z-0")}
      style={{ minHeight: showForm ? FORM_HEIGHT : 0 }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
            className="flex h-full flex-col p-2"
          >
            <div className="flex justify-between py-1 mb-2">
              <p className="text-foreground z-2 ml-[38px] flex items-center gap-[6px] select-none text-sm font-semibold">
                Ask Hong Zhe's Trained AI Model
              </p>
              <button
                type="submit"
                ref={btnRef}
                disabled={isLoading}
                className="text-foreground right-4 mt-1 flex cursor-pointer items-center justify-center gap-1 rounded-[12px] bg-transparent pr-1 text-center select-none hover:text-primary transition-colors disabled:opacity-50"
              >
                <KeyHint>Enter</KeyHint>
              </button>
            </div>

            {responseText && (
              <div className="w-full h-auto min-h-[60px] rounded-md p-4 bg-secondary/30 text-sm overflow-y-auto max-h-[180px] mb-2 font-body text-foreground/90">
                {responseText}
              </div>
            )}

            <textarea
              ref={ref}
              placeholder={isLoading ? "AI is thinking..." : "Ask another question..."}
              name="message"
              disabled={isLoading}
              className={cx("w-full resize-none scroll-py-2 rounded-md p-4 outline-none bg-background/50 border border-border text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50", responseText ? "h-[60px]" : "h-[120px]")}
              required
              onKeyDown={handleKeys}
              spellCheck={false}
            />

            <div className="text-[10px] text-muted-foreground/60 text-center mt-2 pb-1 font-sans">
              AI can make mistakes. Please double-check responses.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 left-3"
          >
            <ColorOrb dimension="20px" tones={{ base: "oklch(60% 0.15 250)" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

function KeyHint({ children, className }: { children: string; className?: string }) {
  return (
    <kbd
      className={cx(
        "text-foreground flex h-[22px] w-fit items-center justify-center rounded-[6px] border border-border bg-muted/50 px-2 text-[11px] font-sans font-medium uppercase shadow-sm",
        className
      )}
    >
      {children}
    </kbd>
  )
}

export default MorphPanel
