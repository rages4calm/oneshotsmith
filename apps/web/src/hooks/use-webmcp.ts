"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { buildOneShotTools, type OneShotToolController } from "../lib/oneshot-tools";
import { registerModelContextTools, type WebMcpSurface } from "../lib/webmcp";

export interface WebMcpStatus {
  /** null until detection has run on the client. */
  available: boolean | null;
  surface: WebMcpSurface;
  toolCount: number;
}

/**
 * Register the page's agent tools once, for the lifetime of the component.
 *
 * The controller lives behind a ref that the page refreshes every render, so
 * tools always act on current state without re-registering (the spec rejects
 * duplicate tool names with InvalidStateError). Cleanup aborts the signal,
 * which is the spec's mechanism for unregistering.
 */
export function useWebMcp(
  controllerRef: MutableRefObject<OneShotToolController>
): WebMcpStatus {
  const [status, setStatus] = useState<WebMcpStatus>({
    available: null,
    surface: null,
    toolCount: 0,
  });
  const registeredRef = useRef(false);

  useEffect(() => {
    const abort = new AbortController();
    let cancelled = false;

    // Indirection: the closure captures the ref, never a state snapshot.
    const stable: OneShotToolController = {
      getState: () => controllerRef.current.getState(),
      generate: (patch) => controllerRef.current.generate(patch),
      print: () => controllerRef.current.print(),
      announce: (message) => controllerRef.current.announce(message),
      shareUrl: (input) => controllerRef.current.shareUrl(input),
      newSeed: () => controllerRef.current.newSeed(),
    };

    const tools = buildOneShotTools(stable);

    // Testing handle: the exact same tool objects that get registered, so the
    // surface can be exercised from the console (or by an e2e test) on browsers
    // without a WebMCP implementation. It grants nothing the page's own buttons
    // don't — it is the same array, not a second API.
    (window as unknown as { __oneshotsmithAgentTools?: typeof tools }).__oneshotsmithAgentTools =
      tools;

    registerModelContextTools(tools, abort.signal)
      .then((result) => {
        if (cancelled) return;
        registeredRef.current = result.registered.length > 0;
        setStatus({
          available: result.surface !== null,
          surface: result.surface,
          toolCount: result.registered.length,
        });
      })
      .catch(() => {
        if (!cancelled) setStatus({ available: false, surface: null, toolCount: 0 });
      });

    return () => {
      cancelled = true;
      abort.abort();
      delete (window as unknown as { __oneshotsmithAgentTools?: unknown })
        .__oneshotsmithAgentTools;
    };
  }, [controllerRef]);

  return status;
}
