import type { Metadata } from "next";
import { SignalHeader } from "../signal-header";
import { DocumentPreview, HeroLink } from "../signal-field";
import "../signal-field.css";

export const metadata: Metadata = {
  title: "One current document version",
  description: "A minimal document management hero exploration for Unifize.",
};

export default function SignalFieldDmsPage() {
  return (
    <main className="sf-page sf-page--light">
      <SignalHeader theme="light" />

      <section className="sf-light-hero" aria-labelledby="sf-dms-title">
        <div className="sf-light-hero__field" aria-hidden="true" />
        <div className="sf-shell sf-light-hero__inner">
          <div className="sf-light-hero__copy">
            <p className="sf-light-hero__eyebrow">Document management system</p>
            <h1 id="sf-dms-title">
              One current version.{" "}
              <br />
              Everywhere you look<span aria-hidden="true">.</span>
            </h1>
            <p className="sf-light-hero__lede">
              Document control, change, and training on one governed record.
            </p>
            <div className="sf-hero-actions">
              <HeroLink href="/explorations/products/dms">Explore DMS</HeroLink>
              <HeroLink href="/chat-anatomy" muted>Talk to us</HeroLink>
            </div>
          </div>

          <div className="sf-light-hero__preview">
            <DocumentPreview />
          </div>
        </div>
      </section>
    </main>
  );
}
