"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LogOut, Eye, Archive, Trash2, Mail, Building2, DollarSign, MessageSquare, Clock, ChevronDown, ChevronUp } from "lucide-react";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SubmissionCard({ submission }: { submission: any }) {
  const [expanded, setExpanded] = useState(false);
  const markAsRead = useMutation(api.contactSubmissions.markAsRead);
  const archive = useMutation(api.contactSubmissions.archive);
  const remove = useMutation(api.contactSubmissions.remove);

  const handleExpand = () => {
    setExpanded(!expanded);
    if (!expanded && submission.status === "new") {
      markAsRead({ id: submission._id });
    }
  };

  return (
    <div
      className={`border rounded-xl transition-all duration-300 ${
        submission.status === "new"
          ? "border-[rgba(198,166,107,0.15)] bg-[#151310]"
          : "border-[rgba(198,166,107,0.06)] bg-[#0F0E0C]"
      }`}
    >
      {/* Header */}
      <button
        onClick={handleExpand}
        className="w-full p-5 flex items-center gap-4 text-left cursor-pointer"
      >
        {submission.status === "new" && (
          <span className="w-2 h-2 rounded-full bg-[#C6A66B] shrink-0 animate-pulse" />
        )}
        {submission.status !== "new" && <span className="w-2 shrink-0" />}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-heading font-semibold text-[15px] text-[#F3EFE6] truncate">
              {submission.name}
            </h3>
            {submission.company && (
              <span className="text-[11px] text-[#8A8478] hidden sm:inline">
                @ {submission.company}
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#BEB8AC] mt-0.5 truncate">
            {submission.email} &middot; {submission.services.split(", ").slice(0, 2).join(", ")}
            {submission.services.split(", ").length > 2 && ` +${submission.services.split(", ").length - 2}`}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {submission.budget && (
            <span className="text-[11px] text-[#C6A66B]/70 hidden md:inline">
              {submission.budget}
            </span>
          )}
          <span className="text-[11px] text-[#5a5650] hidden md:inline">
            {formatDate(submission.createdAt)}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-[#8A8478]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8A8478]" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-[rgba(198,166,107,0.06)]">
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#8A8478] mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A8478]">Email</p>
                <a href={`mailto:${submission.email}`} className="text-[13px] text-[#C6A66B] hover:underline">
                  {submission.email}
                </a>
              </div>
            </div>

            {submission.company && (
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-[#8A8478] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A8478]">Company</p>
                  <p className="text-[13px] text-[#F3EFE6]">{submission.company}</p>
                </div>
              </div>
            )}

            {submission.budget && (
              <div className="flex items-start gap-3">
                <DollarSign className="w-4 h-4 text-[#8A8478] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A8478]">Budget</p>
                  <p className="text-[13px] text-[#F3EFE6]">{submission.budget}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#8A8478] mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A8478]">Submitted</p>
                <p className="text-[13px] text-[#F3EFE6]">{formatDate(submission.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A8478] mb-2">Services Requested</p>
            <div className="flex flex-wrap gap-1.5">
              {submission.services.split(", ").map((s: string) => (
                <span key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-[rgba(198,166,107,0.1)] text-[#D8C49A]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A8478] mb-2 flex items-center gap-2">
              <MessageSquare className="w-3 h-3" />
              Project Details
            </p>
            <div className="bg-[#0B0A09] border border-[rgba(198,166,107,0.06)] rounded-lg p-4">
              <p className="text-[13px] leading-[1.7] text-[#D8C49A] whitespace-pre-wrap">
                {submission.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[rgba(198,166,107,0.06)]">
            <a
              href={`mailto:${submission.email}?subject=Re: Your project request — Hades Digital`}
              className="hades-btn hades-btn-primary text-[12px] px-4 py-2"
            >
              <Mail className="w-3.5 h-3.5" />
              Reply via Email
            </a>
            <button
              onClick={() => archive({ id: submission._id })}
              className="flex items-center gap-1.5 text-[12px] text-[#8A8478] hover:text-[#D8C49A] px-3 py-2 border border-[rgba(198,166,107,0.06)] rounded-lg transition-colors cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              Archive
            </button>
            <button
              onClick={() => {
                if (confirm("Delete this submission permanently?")) {
                  remove({ id: submission._id });
                }
              }}
              className="flex items-center gap-1.5 text-[12px] text-[#8A8478] hover:text-red-400 px-3 py-2 border border-[rgba(198,166,107,0.06)] rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("hades_admin_token");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthed(true);
    }
  }, [navigate]);

  const submissions = useQuery(api.contactSubmissions.list);
  const unreadCount = useQuery(api.contactSubmissions.unreadCount);

  const handleLogout = () => {
    sessionStorage.removeItem("hades_admin_token");
    navigate("/admin/login");
  };

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-[#0B0A09]">
      {/* Header */}
      <header className="border-b border-[rgba(198,166,107,0.06)] bg-[#0B0A09]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-heading font-bold text-[16px] tracking-[-0.02em] text-[#F3EFE6]">
              HADES <span className="text-[#C6A66B] font-light">DIGITAL</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] border-l border-[rgba(198,166,107,0.08)] pl-4">
              Admin Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            {unreadCount !== undefined && unreadCount > 0 && (
              <span className="text-[12px] text-[#C6A66B]">
                {unreadCount} new
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[12px] text-[#8A8478] hover:text-[#F3EFE6] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-[clamp(1.5rem,3vw,2.2rem)] tracking-[-0.03em] text-[#F3EFE6]">
            Project Requests
          </h1>
          <p className="mt-2 text-[14px] text-[#BEB8AC]">
            {submissions === undefined
              ? "Loading..."
              : `${submissions.length} total submission${submissions.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {submissions === undefined ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[rgba(198,166,107,0.15)] border-t-[#C6A66B]/50 animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20">
            <Eye className="w-10 h-10 text-[#2E2A24] mx-auto mb-4" />
            <p className="text-[14px] text-[#8A8478]">
              No project requests yet.
            </p>
            <p className="text-[12px] text-[#5a5650] mt-1">
              Submissions from the contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((submission) => (
              <SubmissionCard key={submission._id} submission={submission} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
