import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Play, Pause, SkipForward, SkipBack, X } from 'lucide-react';
import { renewSteps, landbankingSteps } from '../data/demoSteps';
import type { DemoStep, DemoAction } from '../data/demoSteps';

function executeAction(action: DemoAction) {
  switch (action.type) {
    case 'click-tab': {
      const tabs = document.querySelectorAll('button[role="tab"]');
      for (const tab of tabs) {
        if (tab.textContent?.trim() === action.target) {
          (tab as HTMLElement).click();
          break;
        }
      }
      break;
    }
    case 'click-button': {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent?.includes(action.target || '')) {
          (btn as HTMLElement).click();
          btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
      break;
    }
    case 'scroll-top': {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    }
  }
}

const CLIENT_LABELS: Record<string, string> = {
  renew: 'Renew / RePlanet',
  landbanking: 'Landbanking Group',
};

export function DemoRunner() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const actionsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startRef = useRef(0);

  const steps: DemoStep[] =
    client === 'renew' ? renewSteps : client === 'landbanking' ? landbankingSteps : [];
  const currentStep = steps[stepIndex];

  // Start demo from URL param
  useEffect(() => {
    const demo = searchParams.get('demo');
    if (demo && (demo === 'renew' || demo === 'landbanking') && !client) {
      setClient(demo);
      setStepIndex(0);
      setVisible(true);
      setPaused(false);
      // Remove param from URL
      const next = new URLSearchParams(searchParams);
      next.delete('demo');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, client, setSearchParams]);

  // Navigate + execute actions when step changes
  useEffect(() => {
    if (!visible || !currentStep) return;

    // Navigate
    navigate(currentStep.route, { replace: true });

    // Schedule actions
    actionsRef.current.forEach(clearTimeout);
    actionsRef.current = [];
    currentStep.actions?.forEach((action) => {
      const t = setTimeout(() => executeAction(action), action.delay);
      actionsRef.current.push(t);
    });

    return () => {
      actionsRef.current.forEach(clearTimeout);
      actionsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, stepIndex, client]);

  // Progress timer
  useEffect(() => {
    if (!visible || !currentStep || paused) {
      clearInterval(timerRef.current);
      return;
    }

    startRef.current = Date.now() - progress * currentStep.duration;
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / currentStep.duration, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(timerRef.current);
        // Auto-advance
        if (stepIndex < steps.length - 1) {
          setStepIndex((i) => i + 1);
          setProgress(0);
        } else {
          setPaused(true);
        }
      }
    }, 50);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, stepIndex, paused, currentStep?.duration]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!visible) return;
    function handler(e: KeyboardEvent) {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        setPaused((p) => !p);
      } else if (e.key === 'ArrowRight' || e.key === 'l') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'h') {
        goPrev();
      } else if (e.key === 'Escape') {
        close();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, stepIndex, steps.length]);

  const goNext = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setProgress(0);
      setPaused(false);
    }
  }, [stepIndex, steps.length]);

  const goPrev = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setProgress(0);
      setPaused(false);
    }
  }, [stepIndex]);

  const close = useCallback(() => {
    setVisible(false);
    setClient(null);
    setStepIndex(0);
    setProgress(0);
    setPaused(false);
    clearInterval(timerRef.current);
    actionsRef.current.forEach(clearTimeout);
    navigate('/', { replace: true });
  }, [navigate]);

  // Public start method exposed via custom event
  useEffect(() => {
    function onStart(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail === 'renew' || detail === 'landbanking') {
        setClient(detail);
        setStepIndex(0);
        setVisible(true);
        setPaused(false);
        setProgress(0);
      }
    }
    window.addEventListener('start-demo', onStart);
    return () => window.removeEventListener('start-demo', onStart);
  }, []);

  if (!visible || !currentStep) return null;

  const remaining = Math.max(0, Math.ceil((currentStep.duration * (1 - progress)) / 1000));

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-regen-dark/95 text-white shadow-2xl backdrop-blur-xl">
        {/* Progress bar */}
        <div className="h-1 overflow-hidden rounded-t-2xl bg-white/10">
          <div
            className="h-full bg-green-400 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="px-5 py-4">
          {/* Header row */}
          <div className="mb-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 font-semibold text-green-400">
                {currentStep.act}
              </span>
              <span className="font-medium text-white/90">
                {CLIENT_LABELS[client || ''] || 'Demo'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="tabular-nums text-white/50">
                {stepIndex + 1} / {steps.length}
              </span>
              {!paused && (
                <span className="tabular-nums text-white/40">{remaining}s</span>
              )}
              <button
                onClick={close}
                className="rounded-lg p-1 text-white/40 hover:bg-white/10 hover:text-white"
                title="Exit demo (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-sm font-bold">{currentStep.title}</h3>

          {/* Presenter notes */}
          <p className="mb-4 text-sm leading-relaxed text-white/75">
            &ldquo;{currentStep.notes}&rdquo;
          </p>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={goPrev}
                disabled={stepIndex === 0}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                title="Previous (←)"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPaused((p) => !p)}
                className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
                title={paused ? 'Play (Space)' : 'Pause (Space)'}
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                onClick={goNext}
                disabled={stepIndex === steps.length - 1}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                title="Next (→)"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
            <span className="text-[10px] text-white/30">
              ←/→ navigate &middot; space pause &middot; esc exit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Helper to start a demo programmatically from any component. */
export function startDemo(client: 'renew' | 'landbanking') {
  window.dispatchEvent(new CustomEvent('start-demo', { detail: client }));
}
