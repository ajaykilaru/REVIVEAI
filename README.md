# ReviveAI — Agentic Revenue Recovery OS

> **Turn failed payments into recovered revenue.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ReviveAI-8B5CF6?style=for-the-badge)](https://reviveai-fijrjjick-epics-project.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Test%20Mode-3395FF?style=flat-square&logo=razorpay)](https://razorpay.com/)

## 🚀 Live Demo

**[Open ReviveAI →](https://reviveai-fijrjjick-epics-project.vercel.app)**

---

## 📌 Overview

**ReviveAI** is an AI-powered revenue recovery platform designed to help merchants recover revenue lost due to failed, abandoned, or interrupted payments.

Instead of treating every failed payment the same way, ReviveAI analyzes the transaction context, identifies the likely failure reason, determines whether the payment is recoverable, and recommends the most appropriate next action.

The system follows an agentic recovery loop:

**Detect → Diagnose → Decide → Approve → Act → Measure → Audit**

The goal is simple:

> **Recover more revenue while reducing unnecessary retries, customer friction, and operational overhead.**

---

## 🎯 Problem Statement

Failed payments are a major source of lost revenue for digital businesses.

A payment may fail because of:

- Insufficient funds
- Expired cards
- Bank or network issues
- Authentication failures
- Payment abandonment
- Temporary payment-service degradation
- Repeated payment failures

Traditional recovery systems often rely on fixed retry schedules or generic reminders. This can lead to:

- Lost revenue
- Excessive payment retries
- Poor customer experience
- Unnecessary discounts
- Manual intervention
- Lack of visibility into recovery performance

Merchants need a system that can determine **what happened, what should happen next, and whether the action actually recovered revenue.**

---

## 💡 Our Solution

ReviveAI acts as an intelligent revenue recovery layer for merchants.

For every failed transaction, the system can:

1. **Detect** a failed or at-risk payment.
2. **Diagnose** the probable reason for failure.
3. **Evaluate** recovery eligibility.
4. **Choose** the next-best recovery action.
5. **Request human approval** when required.
6. **Execute** the approved recovery action.
7. **Measure** the resulting recovery.
8. **Record** the complete decision and action in an audit trail.

This turns payment recovery from a reactive manual process into an intelligent, measurable workflow.

---

# ✨ Key Features

## 1. Revenue Recovery Command Center

A centralized dashboard provides merchants with visibility into:

- Total transactions
- Failed payments
- Recoverable revenue
- Recovered revenue
- Recovery rate
- At-risk revenue
- Agent activity
- Recent recovery actions

The dashboard is designed to answer one important question:

> **How much revenue can we recover, and what is the agent doing about it?**

---

## 2. AI Failure Diagnosis

ReviveAI categorizes payment failures and determines the likely reason behind each failure.

Example:

```text
Transaction
₹4,999
Payment Failed

Diagnosis:
Insufficient Funds

Recovery Potential:
High

Recommended Action:
Send payment link + retry reminder
