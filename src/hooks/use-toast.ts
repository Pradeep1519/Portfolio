"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
// Increased duration slightly for better visibility of success/error messages
const TOAST_REMOVE_DELAY = 5000 // Changed from 1000000 to 5 seconds

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, duration?: number) => {
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId)); // Clear existing timeout if any
  }

  const timeoutDuration = duration !== undefined ? duration : TOAST_REMOVE_DELAY;

  // Only set timeout if duration is positive
  if(timeoutDuration > 0) {
      const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId)
        dispatch({
          type: "REMOVE_TOAST",
          toastId: toastId,
        })
      }, timeoutDuration); // Use provided duration or default

      toastTimeouts.set(toastId, timeout)
  } else {
     // If duration is 0 or negative, remove immediately (or handle as needed)
      dispatch({
          type: "REMOVE_TOAST",
          toastId: toastId,
        });
  }

}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Add new toast and schedule its removal based on its duration property
      addToRemoveQueue(action.toast.id, action.toast.duration);
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      // If duration changes, update the removal timeout
      if (action.toast.duration !== undefined) {
        addToRemoveQueue(action.toast.id!, action.toast.duration);
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action;
       const toastToDismiss = state.toasts.find(t => t.id === toastId);

      // Clear the timeout associated with the toast being dismissed prematurely
      if (toastId && toastTimeouts.has(toastId)) {
         clearTimeout(toastTimeouts.get(toastId));
         toastTimeouts.delete(toastId);
      } else if (!toastId) {
         // Clear all timeouts if dismissing all
         toastTimeouts.forEach(timeout => clearTimeout(timeout));
         toastTimeouts.clear();
      }


      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Mark as closed
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      // Remove toast from state, timeout should already be cleared or handled
       if (toastId && toastTimeouts.has(toastId)) {
           clearTimeout(toastTimeouts.get(toastId));
           toastTimeouts.delete(toastId);
       }
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
           // Trigger removal directly when closed via UI (e.g., close button)
           dispatch({ type: "REMOVE_TOAST", toastId: id });
        }
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    const listener = (newState: State) => setState(newState);
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    toasts: state.toasts,
    addToast: (toast: Toast) => dispatch({ type: "ADD_TOAST", toast }),
    removeToast: (toastId: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
  };
}

export { toast }
