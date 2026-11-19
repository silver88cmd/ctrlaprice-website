import { Suspense } from "react";
import InquiryForm from "@/components/inquiry-form";
import UiIcon from "@/components/ui-icon";

type Props = {
  searchParams: Promise<{ item?: string }>;
};

export default function InquiriesPage({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <section className="section container">
          <div className="inquiry-layout">
            <div className="inquiry-intro">
              <p className="eyebrow">WERE HERE TO HELP</p>
              <h1>Product Inquiries</h1>
              <p className="muted inquiry-description">Loading inquiry form…</p>
            </div>
          </div>
        </section>
      }
    >
      <InquiriesPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function InquiriesPageContent({ searchParams }: Props) {
  const { item = "" } = await searchParams;

  return (
    <section className="section container">
      <div className="inquiry-layout">
        <div className="inquiry-intro">
          <span className="inquiry-intro-icon">
            <UiIcon name="mail" size={23} />
          </span>
          <p className="eyebrow">WERE HERE TO HELP</p>
          <h1>Product Inquiries</h1>
          <p className="muted inquiry-description">
            Have questions about a product, pricing, or availability?
            Send us a message and our team can assist you.
          </p>
          <div className="inquiry-assurance">
            <span className="inquiry-assurance-icon">
              <UiIcon name="box" size={17} />
            </span>
            <p>
              Include one or more item numbers and our team can help with
              product details, pricing, and availability.
            </p>
          </div>
        </div>

        <InquiryForm key={item} productItem={item} />
      </div>
    </section>
  );
}