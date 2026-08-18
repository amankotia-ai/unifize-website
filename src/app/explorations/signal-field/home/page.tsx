import type { Metadata } from "next";
import { SiteFooter } from "../../_shared/site-footer";
import { SignalHeader } from "../signal-header";
import {
  HeroLink,
  HomeClose,
  HomeEntryRouter,
  HomeIndustryDirectory,
  HomeMechanism,
  HomeProducts,
  HomeProof,
  HomeRecognition,
  HomeTrustStrip,
  ThreadPreview,
} from "../signal-field";
import "../signal-field.css";

export const metadata: Metadata = {
  title: "One thread across every team",
  description: "A minimal homepage hero exploration for Unifize.",
};

export default function SignalFieldHomePage() {
  return (
    <main className="sf-page sf-page--dark">
      <SignalHeader theme="dark" />

      <section className="sf-dark-hero" aria-labelledby="sf-home-title">
        <div className="sf-dark-hero__field" aria-hidden="true" />
        <div className="sf-shell sf-dark-hero__inner">
          <div className="sf-dark-hero__copy">
            <h1 id="sf-home-title">
              <span>Work that crosses teams{" "}</span>
              <span>
                falls {""}
                <span className="sf-scan" data-text="between systems.">
                  between systems.
                </span>
              </span>
            </h1>
            <p>One governed thread keeps the decision, owner, and proof together.</p>
            <div className="sf-hero-actions">
              <HeroLink href="/explorations/platform">See the platform</HeroLink>
              <HeroLink href="/chat-anatomy" muted>Talk to us</HeroLink>
            </div>
          </div>

          <div className="sf-dark-hero__preview">
            <ThreadPreview />
          </div>
        </div>
      </section>

      <HomeTrustStrip />
      <HomeEntryRouter />
      <HomeRecognition />
      <HomeMechanism />
      <HomeProducts />
      <HomeIndustryDirectory />
      <HomeProof />
      <HomeClose />
      <SiteFooter
        tagline="One governed thread across every team."
        note="Event · Decision · Approval · Proof"
      />
    </main>
  );
}
