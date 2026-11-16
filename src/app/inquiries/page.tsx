import { Suspense } from "react";
import InquiryForm from "@/components/inquiry-form";

type Props = {
  searchParams: Promise<{ item?: string }>;
};

export default function InquiriesPage({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <section className="section container">
          <div className="inquiry-layout">
            <div>
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
        <div>
          <p className="eyebrow">WERE HERE TO HELP</p>
          <h1>Product Inquiries</h1>
          <p className="muted inquiry-description">
            Have questions about a product, pricing, or availability?
            Send us a message and our team can assist you.
          </p>
        </div>

        <InquiryForm productItem={item} />
      </div>
    </section>
  );
}