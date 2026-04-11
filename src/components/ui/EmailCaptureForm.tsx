"use client";
import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

type Props = {
  id: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  tag?: string;
  accent?: "sky" | "orange" | "purple" | "blue";
};

const accentClasses = {
  sky: "bg-gradient-to-r from-sky-500 to-orange-500 hover:opacity-90",
  orange: "bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90",
  purple: "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90",
  blue: "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90",
};

export default function EmailCaptureForm({
  id,
  placeholder = "Enter your email",
  buttonText = "Get Access",
  successMessage = "You're in! Check your inbox.",
  tag = "general",
  accent = "blue",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      // ConvertKit integration placeholder
      // Replace CONVERTKIT_FORM_ID with actual form ID when ready
      // await fetch(`https://api.convertkit.com/v3/forms/FORM_ID/subscribe`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
      //     email,
      //     tags: [tag],
      //   }),
      // });

      // Simulating success for now
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        <p className="text-green-700 font-medium">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" id={`email-form-${id}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-900 placeholder:text-slate-400 bg-white"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all disabled:opacity-50 ${accentClasses[accent]}`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {buttonText}
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}
