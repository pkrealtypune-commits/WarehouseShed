"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode; 
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  
  const variants = {
    // Uses the --primary-rgb defined in your globals.css for clean shadows
    primary: "bg-primary text-white shadow-[0_10px_20px_-10px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_15px_25px_-10px_rgba(var(--primary-rgb),0.6)]",
    
    secondary: "bg-slate-950 text-white shadow-[0_10px_20px_-10px_rgba(15,23,42,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(15,23,42,0.6)]",
    
    outline: "bg-transparent text-slate-900 border border-slate-200 hover:border-primary hover:bg-primary/[0.02]",
    
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-none shadow-none",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[10px] font-bold tracking-widest",
    md: "px-8 py-4 text-[11px] font-black tracking-[0.15em]",
    lg: "px-10 py-5 text-xs font-black tracking-[0.2em]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={props.type || "button"}
      disabled={isLoading || disabled}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center uppercase transition-all duration-300 ease-out rounded-xl group",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        "hover:-translate-y-0.5 active:translate-y-0",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* GLOSS SHIMMER EFFECT 
         Uses 'group-hover:animate-shimmer' defined in globals.css @theme block
      */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="opacity-80">Processing...</span>
        </div>
      ) : (
        <>
          {leftIcon && (
            <span 
              className="mr-2.5 shrink-0 transition-transform group-hover:-translate-x-0.5"
            >
              {leftIcon}
            </span>
          )}
          
          <span className="relative z-10 truncate font-display italic">
            {children}
          </span>
          
          {rightIcon && (
            <span 
              className="ml-2.5 shrink-0 transition-transform group-hover:translate-x-0.5"
            >
              {rightIcon}
            </span>
          )}
        </>
      )}
    </motion.button>
  );
}