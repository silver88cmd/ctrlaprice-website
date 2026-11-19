"use client";

import { useState } from "react";
import UiIcon from "@/components/ui-icon";

export default function InquiryForm({
  productItem = "",
}: {
  productItem?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [item, setItem] = useState(productItem);
  const [message, setMessage] = useState("");

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const recipient = process.env.NEXT_PUBLIC_INQUIRY_EMAIL;

    if (!recipient) {
      alert("The inquiry email has not been configured yet.");
      return;
    }

    const subject = encodeURIComponent(`CTRLA Product Inquiry - ${item}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nItem Number: ${item}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submitInquiry} className="inquiry-form">
      <label>
        Your Name
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </label>

      <label>
        Email Address
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>

      <label>
        Item Number / Product
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter product item number"
        />
      </label>

      <label>
        Your Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help you?"
        />
      </label>

      <button type="submit" className="button button-dark">
        <UiIcon name="mail" size={16} />
        Send Inquiry
      </button>

      <p className="muted form-note">
        Your email application will open with your inquiry prepared.
      </p>
    </form>
  );
}